export interface ADHDStrategy {
  id: string;
  category: 'core' | 'sensory' | 'maker' | 'teen' | 'maintenance';
  title: string;
  badge: string;
  summary: string;
  whyItWorks: string;
  actionableSteps: string[];
}

export const ADHD_ORGANIZING_STRATEGIES: ADHDStrategy[] = [
  {
    id: 'doom-box',
    category: 'core',
    title: 'The "Doom Box" / "Stash Basket" Triage',
    badge: 'Executive Function Saver',
    summary: 'Prevent task freeze by sweeping non-belonging items into a single portable container instead of walking between rooms 30 times.',
    whyItWorks: 'Every time an ADHD brain carries an item to another room to put it away, working memory resets and you get distracted by what you find in that next room. Stash baskets maintain physical momentum in the current room.',
    actionableSteps: [
      'Grab an empty laundry basket or cardboard box.',
      'Walk your current room and deposit EVERYTHING that belongs elsewhere into that basket.',
      'Do NOT leave the room until the current room is finished.',
      'Place the basket by the doorway or schedule a separate 10-minute sprint to redistribute items later.'
    ]
  },
  {
    id: 'visual-storage',
    category: 'core',
    title: 'Visual Storage: "Out of Sight is Out of Existence"',
    badge: 'Cognitive Architecture',
    summary: 'Never store daily tools or craft materials in opaque solid bins or deep drawers where they become invisible.',
    whyItWorks: 'Autistic and ADHD brains rely heavily on visual cues for working memory. Solid closed containers trigger object permanence dropouts, leading to accidental duplicate purchases and clutter accumulation.',
    actionableSteps: [
      'Use translucent or clear acrylic bins on your 4-tier 40"x18" shelving units.',
      'Install open wall hooks instead of closed closet hangers for jackets and bags.',
      'Add high-contrast, large text labels on shelf edges so you can return items without guessing.'
    ]
  },
  {
    id: 'point-of-performance',
    category: 'core',
    title: 'Point of Performance (Friction Reduction)',
    badge: 'Behavioral Physics',
    summary: 'Store tools, trash bins, and cleaning wipes directly where the action happens, not in a centralized closet.',
    whyItWorks: 'If throwing away a piece of vinyl scrap or 3D print purge plastic requires walking across the room or opening a cabinet door, the friction is too high and it will end up on the table or floor.',
    actionableSteps: [
      'Mount a small trash bin or silicone scrap suction cup directly beside the vinyl cutter.',
      'Keep a canister of surface disinfectant wipes on top of the bathroom counter.',
      'Hang safety glasses directly onto the laser cutter cover via a magnetic clip.'
    ]
  },
  {
    id: 'sensory-armor',
    category: 'sensory',
    title: 'Sensory Armor: Eliminating Texture & Noise Meltdowns',
    badge: 'Autism & Sensory Comfort',
    summary: 'Protect your sensory nervous system before touching dishes, dust, or harsh chemical cleaners.',
    whyItWorks: 'Many cleaning delays aren’t due to laziness, but sensory dread (cold slimy dish residue, loud vacuum motor whines, gritty dust on dry fingertips, bright fluorescent glare).',
    actionableSteps: [
      'Wear thick lined silicone dish gloves for kitchen sinks and wet bathroom tasks.',
      'Put on over-ear noise-cancelling headphones playing brown noise or lo-fi beats.',
      'Turn off harsh overhead ceiling lights; switch on warm floor lamps or natural window light.'
    ]
  },
  {
    id: 'maker-stations',
    category: 'maker',
    title: 'The Maker Space & Craft Room 6-Station Protocol',
    badge: 'Specialized Workshop',
    summary: 'Zone your craft room into dedicated micro-stations (Laser, 3D Print, Vinyl, Design Desk, 4-Tier Shelf, Closet) with rigid boundaries.',
    whyItWorks: 'Creative flow states produce immense micro-debris (weeding bits, filament strings, burnt plywood slivers). When stations overlap, the room turns into an impenetrable barrier.',
    actionableSteps: [
      '4-Tier 40"x18" Shelf Rule: Tier 1 (Light tools/safety), Tier 2 (Daily materials/paints), Tier 3 (Filaments/vinyl), Tier 4 (Heavy wood/power).',
      'The "2-Inch Scrap Purge": If an acrylic or wood scrap is smaller than 2 inches, discard it immediately. Avoid hoarding micro-scraps.',
      'Keep a dedicated magnetic strip on the vinyl table so weeding picks and razor blades never disappear into piles.'
    ]
  },
  {
    id: 'teen-body-doubling',
    category: 'teen',
    title: 'Non-Confrontational Teen "Body Doubling"',
    badge: 'Collaborative Flow',
    summary: 'Clean in parallel with your teenager using non-verbal presence, shared upbeat audio, and low-demand milestones.',
    whyItWorks: 'Demanding "clean your whole room" triggers pathological demand avoidance (PDA) and immediate shutdown. Shared body doubling provides external executive function scaffolding without micro-managing.',
    actionableSteps: [
      'Agree on ONE target: "Let’s just get the cups and floor laundry into these two baskets while we listen to this 3-song playlist."',
      'Provide open-top hampers with zero lids so clothes take zero physical effort to drop.',
      'Celebrate when the floor walkway is visible. Allow private storage drawers to stay chaotic.'
    ]
  },
  {
    id: 'done-is-better',
    category: 'maintenance',
    title: '"Done Is Better Than Perfect" & The 15-Minute Cap',
    badge: 'Perfectionism Antidote',
    summary: 'Give yourself permission to do a "halfway" job. A half-clean counter is infinitely better than an untouched one.',
    whyItWorks: 'All-or-nothing neurodivergent thinking convinces us that if we can’t deep-clean the baseboards, organizing the sheets is pointless. 15-minute capped timers break this spell.',
    actionableSteps: [
      'Commit to just one 15-minute timer block per room.',
      'When the audio chime sounds, STOP immediately—even if you are in the middle of a task.',
      'Take your 5-minute dopamine break and acknowledge the tangible progress made today.'
    ]
  }
];
