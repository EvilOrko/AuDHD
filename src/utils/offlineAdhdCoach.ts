// Offline intelligent AuDHD & ADHD organizing coach for 100% portable use
export function getOfflineAuDHDAdvice(room: string, question: string): string {
  const q = question.toLowerCase();

  // Craft Room Specific Topics
  if (q.includes('vinyl') || q.includes('weeding') || q.includes('transfer tape')) {
    return `Immediate Vinyl Station Strategy:
1. **The 2-Inch Scraps Purge:** Ruthlessly toss any vinyl cut-off or backing paper smaller than 2 inches. You will not make micro-earrings from that 1cm sliver!
2. **Magnetic Tool Strip:** Stick your weeding tweezers, squeegees, and hook picks to a magnetic strip directly on the wall or cutter edge so they never hide under rolls.
3. **Roll Labeling:** Write "HTV" or "PERM" on the core end with white chalk marker so you never unroll to check.`;
  }

  if (q.includes('3d') || q.includes('filament') || q.includes('support') || q.includes('purge') || q.includes('bed')) {
    return `3D Print Station Reset:
1. **The Handheld Vacuum Blitz:** Vacuum plastic purge lines and broken supports off the floor and desk in a 3-minute sweep. The humming sensory feedback is instantly motivating!
2. **PEI Bed IPA Wipe:** Spray 91%+ Isopropyl Alcohol on a lint-free cloth and buff the build plate. Keep the spray bottle right next to the printer (Point-of-Performance).
3. **Moisture-Proof Totes on Shelf Tier 3:** Store open spools with silica gel bags inside clear airtight bins so colors remain visible to your working memory.`;
  }

  if (q.includes('laser') || q.includes('honeycomb') || q.includes('acrylic') || q.includes('crumb') || q.includes('wood')) {
    return `Laser Cutter Station Protocol:
1. **Crumb Tray Dump (5 Min):** Slide out the metallic tray, dump charred off-cuts into your fire-safe metal can, and wipe honeycomb with a shop vac.
2. **Scrap Sheet Separation:** Stack plywood vertically by thickness. Separate acrylic by color into wire desktop file sorters.
3. **Safety Gear on Display:** Hang laser safety glasses directly onto the cutter hood with a magnetic hook so they are impossible to forget.`;
  }

  if (q.includes('shelf') || q.includes('tier') || q.includes('4-tier') || q.includes('40') || q.includes('18')) {
    return `4-Tier 40" x 18" Shelf Taxonomy:
1. **Tier 1 (Top / Eye Level):** Daily craft blanks, ear protection, and label cartridges. Keep items lightweight.
2. **Tier 2 & 3 (Middle):** Translucent clear-front bins only! Solid opaque cardboard boxes trigger object permanence drops where supplies "cease to exist".
3. **Tier 4 (Bottom 18" Depth):** Heavy filament dry boxes, bulk wood planks, and heavy power supplies so you never strain your back.`;
  }

  if (q.includes('closet') || q.includes('doom') || q.includes('avalanche') || q.includes('mystery')) {
    return `Craft Closet Excavation:
1. **The "Floor Only" Rule:** Do not touch the upper shelves today! Pull rogue boxes off the floor until you can see carpet and comfortably stand inside.
2. **The 1-Doom-Box Triage:** Grab just ONE mystery container, dump it on the floor, and sort into 3 piles: Trash, Keep in Room, Belongs Elsewhere.
3. **Close The Doors Without Guilt:** Shutting the closet door removes visual noise and lowers cognitive overload instantly.`;
  }

  // Bedroom Topics
  if (q.includes('clothes') || q.includes('chair') || q.includes('hamper') || q.includes('fold') || q.includes('laundry')) {
    return `The "Clothes Chair" Solution:
1. **The "In-Between" Wall Hooks:** Install 4 hooks behind the door for clothes that are "worn once, too clean for wash, too dirty for drawer".
2. **Open-Top Hamper (No Lid!):** ADHD brains have high friction with hamper lids. An open bin means dirty clothes actually land inside 90% of the time.
3. **Don't Fold Today:** Sort clean clothes into designated open fabric bins. Done is 100x better than perfectly folded in a drawer!`;
  }

  if (q.includes('bed') || q.includes('nightstand')) {
    return `Master Bedroom Reset:
1. **Flop & Smooth the Comforter:** Don't worry about military sheets. Pulling the blanket up toward the headboard covers 60% of the room visual field.
2. **Water Glass Search:** Take only drink glasses and cups to the kitchen.
3. **Nightstand Clear Surface:** Leave just your lamp and phone charger on the bedside table.`;
  }

  // Teenager Room Topics
  if (q.includes('teen') || q.includes('kid') || q.includes('argument') || q.includes('fight') || q.includes('collaborat')) {
    return `Non-Confrontational Teen Collaboration:
1. **Body Doubling with Music:** Clean in parallel while listening to a joint playlist. Avoid verbal instructions while they are moving.
2. **The "Visible Floor Path" Milestone:** Agree on one micro-goal: "Let's just get the cups and floor clothes into these two baskets."
3. **Protect Their Autonomy:** Let drawers or personal shelves remain messy. Prioritize hygiene (cups, food, walking path).`;
  }

  // Kitchen Topics
  if (q.includes('dish') || q.includes('sink') || q.includes('glove') || q.includes('gross') || q.includes('texture')) {
    return `Sensory-Shield Kitchen Triage:
1. **Wear Lined Rubber Gloves:** Eliminates gross slimy food residue texture aversions immediately.
2. **One "Island of Sanity":** Clear and spray just ONE section of countertop so your nervous system has a clean surface to rest its eyes on.
3. **Soak Tough Pans:** Squirt dish soap and hot water into pans and walk away. Let chemistry do the work while you take a break!`;
  }

  // Task Paralysis / Overwhelm Topics
  if (q.includes('paralyz') || q.includes('overwhelm') || q.includes('freeze') || q.includes('stuck') || q.includes('start') || q.includes('energy')) {
    return `Overcoming Task Paralysis:
1. **Reduce Sensory Input First:** Put on headphones playing Brown Noise or Lo-Fi beats, dim harsh overhead fluorescent lights, and sip cold water.
2. **The "Pick 1 Thing" Rule:** Don't think about the whole room. Stand up, pick up literally ONE object, and put it away. Congratulations, momentum has started!
3. **Set a 5-Minute Timer:** Tell yourself: "I am only doing this for 5 minutes. When the chime rings, I am allowed to stop completely."`;
  }

  // General Fallback
  return `Shame-Free AuDHD Strategy for ${room}:
1. **The Stash Basket Method:** Walk the room with a laundry basket and gather everything that belongs in other zones. Do NOT leave this room until the timer ends!
2. **Point-of-Performance:** Move trash bins and cleaning wipes directly next to where clutter accumulates.
3. **Half-Done is Great:** A 20% tidied space is a victory over inertia. Celebrate the small win!`;
}
