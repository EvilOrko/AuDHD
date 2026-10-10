import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const isProd = process.env.NODE_ENV === 'production' || (!!process.env.PORT && process.env.PORT !== '3000');
const PORT = isProd ? Number(process.env.PORT || 8080) : 3000;

app.use(express.json());

// Initialize server-side Gemini client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API endpoint for AuDHD cleaning & organizing advice
app.post('/api/gemini/ask', async (req, res) => {
  try {
    const { room, question, currentTasks } = req.body;

    if (!ai) {
      return res.status(200).json({
        fallback: true,
        answer: "Here is an AuDHD organizing tip: Try the 'Doom Box' technique! Instead of agonizing over where every single item belongs, grab one laundry basket or tote. Gather items that don't belong in this zone into the basket. Now your room feels instantly calm and breathable. You can tackle the basket tomorrow in a 10-minute sprint with a favorite podcast!",
        promptQuestions: [
          "How do I manage vinyl weeding scraps and transfer tape?",
          "How to organize 4-tier storage shelves so items stay visible?",
          "How can I motivate myself to fold the clean laundry mountain?"
        ]
      });
    }

    const systemInstruction = `You are a supportive, shame-free AuDHD (Autism + ADHD) specialized organizational coach and cleaning buddy.
Your advice prioritizes:
1. Reducing executive function overwhelm and decision fatigue.
2. Low-demand, sensory-friendly strategies (e.g. wearing rubber gloves to avoid icky textures, visual timers, music/podcast pairing, clear containers so objects aren't "out of sight, out of mind").
3. Micro-chunking tasks into 5 to 15-minute bursts. "Half-done is a victory" and "Done is better than perfect".
4. Zone-specific practical knowledge:
   - Craft room: Laser cutter safety, 3D printer supports/filament moisture care, vinyl cutter scraps/weeding tools, 4-tier 40" x 18" shelving bin placement, and cluttered closet zoning.
   - Teenager room: Non-confrontational collaboration, body doubling, low-friction laundry baskets with no lids, clearing clear floor paths first.
   - Master bedroom: The dreaded "clothes chair/mountain", bedside clutter, sensory sanctuary.
   - Kitchen: Dish sensory aversion tips, sink blitz, clearing counter "islands of sanity".
   - Bathroom: Disinfectant wipe sprints, shower glass squeegee habits, floor decluttering.
   - Living room: 5-minute floor pickup, stash basket triage.
Keep responses concise, friendly, visually formatted with bullet points or 3 micro-steps, encouraging, and totally non-judgmental.`;

    const userPrompt = `Room context: ${room || 'General Home'}.
User question / stuck point: ${question}
Current room tasks context: ${currentTasks ? JSON.stringify(currentTasks) : 'Standard cleaning routine'}

Provide 3 immediate actionable, neurodivergent-friendly micro-steps or solutions to overcome this hurdle right now without feeling overwhelmed.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const text = response.text || "You're doing great. Pick just ONE item right now, put it away, and celebrate the small win!";
    res.json({ answer: text });
  } catch (err: any) {
    console.error('Gemini API error:', err);
    // Graceful fallback with room-specific neurodivergent strategies
    const fallbacks: Record<string, string> = {
      'Craft & Maker Room': `Here is an immediate AuDHD maker strategy:
1. **The 2-Inch Rule:** Ruthlessly grab a trash bin and toss any vinyl backing sliver or wood scrap smaller than 2 inches. You do not need to save micro-scraps!
2. **Clear Acrylic Bins for 4-Tier Shelf:** Put transfer tape and vinyl rolls in open-top clear bins on eye-level shelves so they don't vanish from your working memory.
3. **Magnetic Tool Strip:** Stick your weeding tweezers, picks, and scrapers onto a magnetic bar right next to the cutter so they have a frictionless home.`,
      'Master Bedroom': `Shame-free bedroom reset:
1. **Clear Just the Bed:** Pull the comforter up over the pillows. A flat, made bed immediately cuts visual chaos by 60%.
2. **The 2-Hamper System:** Keep one open basket for definitely dirty clothes and one row of wall hooks for "in-between" clothes (worn once, too clean for wash).
3. **5-Minute Nightstand Sweep:** Grab only dirty glasses and mugs to the kitchen. Leave everything else for tomorrow.`,
      'Living Room': `Low-demand living room reset:
1. **The Stash Basket Triage:** Walk around with one laundry basket and toss in everything that belongs elsewhere. Do not leave the room until you're done!
2. **Fluff the Couch Cushions:** Karate-chop the pillows and drape the throw blanket. It tricks your brain into feeling like the whole room is staged.
3. **Coffee Table Wipe:** Stack the remotes together in one decorative tray.`,
      'Kitchen': `Sensory-friendly kitchen blitz:
1. **Put On Dish Gloves:** Eliminate sensory disgust with wet food textures instantly by wearing thick silicone gloves.
2. **Clear One Counter Island:** Wipe just one section of counter to create a clean "island of sanity".
3. **Soak Tough Pans with Hot Soap:** Don't scrub now. Let hot soapy water do the heavy lifting while you take a break.`,
      'Bathroom': `Rapid bathroom refresh:
1. **Mirror & Faucet Wipe:** A 60-second wipe on the chrome handles and mirror immediately sparkles.
2. **Close the Shower Curtain & Toilet Lid:** Hides 80% of visual clutter behind closed barriers.
3. **Fresh Towel:** Hang one fresh hand towel for an instant boutique feel.`,
      'Teenager’s Room': `Non-confrontational teen collaboration:
1. **Focus Only on Floor Carpet:** Agree to just clear the walking path so nobody trips.
2. **Open-Top Hampers (No Lids):** Eliminate the physical step of lifting a lid so clothes land in the basket.
3. **Search & Rescue for Cups:** Offer a treat or favorite song while grabbing empty cans and dishes from behind the monitors.`
    };

    const chosenFallback = fallbacks[req.body?.room] || 
      `Immediate AuDHD Strategy:
1. **Sensory Reset:** Put on noise-cancelling headphones and dim harsh overhead lighting.
2. **Micro-Burst:** Set a timer for just 5 minutes to clear ONE flat surface.
3. **Half-Done is Great:** Doing 20% of a chore is a massive victory over inertia!`;

    res.status(200).json({ answer: chosenFallback });
  }
});

// Setup Vite middleware in dev or static serving in production
async function startServer() {
  const distPath = path.resolve(process.cwd(), 'dist');

  if (isProd && fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log(`DopamineClean server running on port ${PORT} (http://localhost:${PORT} or http://127.0.0.1:${PORT}) (isProd: ${isProd})`);
  });
}

startServer();
