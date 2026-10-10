import { Room } from '../types';

export const INITIAL_ROOMS: Room[] = [
  {
    id: 'craft_room',
    name: 'Craft & Maker Room',
    subtitle: 'Laser, 3D Print, Vinyl, Desk, 4-Tier Shelf & Closet',
    iconName: 'Sparkles',
    colorTheme: {
      bg: 'bg-emerald-500',
      border: 'border-emerald-300',
      text: 'text-emerald-950',
      accent: '#10B981',
      gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
      lightBg: 'bg-emerald-50/70',
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    stations: [
      { id: 'laser', name: 'Laser Station', description: 'Laser cutter, honeycomb tray, exhaust, acrylic/wood scraps', badgeColor: 'bg-amber-100 text-amber-800 border-amber-300' },
      { id: '3d_printing', name: '3D Printing Station', description: 'Bed plate, IPA wipe, purge lines, filament dry boxes', badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300' },
      { id: 'vinyl_cutter', name: 'Vinyl Cutter Station', description: 'Cutter, weeding tools, scrap bin, transfer tape rolls', badgeColor: 'bg-purple-100 text-purple-800 border-purple-300' },
      { id: 'computer_desk', name: 'Design Computer Desk', description: 'Dual monitors, stylus/mouse pad, digital notes, cables', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300' },
      { id: 'storage_shelf', name: '4-Tier 40"x18" Shelf', description: 'Top, middle, & bottom tier clear bins & material rolls', badgeColor: 'bg-rose-100 text-rose-800 border-rose-300' },
      { id: 'closet', name: 'Cluttered Closet', description: 'Fabric/blanks storage, mystery totes, floor declutter', badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
    ],
    tasks: [
      {
        id: 'cr-laser-1',
        title: 'Laser Station: Crumb Tray & Honeycomb Purge',
        description: 'Slide out crumb tray, dump charred off-cuts into fire-safe bin, vacuum honeycomb.',
        estimatedMinutes: 15,
        station: 'laser',
        completed: false,
        sensoryTip: 'Wear safety glasses and a quick dust mask so airborne soot doesn’t irritate your nose.',
        microSteps: [
          'Power off laser cutter safely',
          'Pull out honeycomb bed & vacuum fallen debris',
          'Empty metallic crumb tray into trash',
          'Wipe exterior frame with microfiber cloth'
        ]
      },
      {
        id: 'cr-laser-2',
        title: 'Laser Station: Scrap Acrylic & Wood Triage',
        description: 'Toss scraps under 2 inches; sort larger reusable pieces by material into labeled bins.',
        estimatedMinutes: 15,
        station: 'laser',
        completed: false,
        sensoryTip: 'Ruthlessly toss micro-scraps. "You will not make miniature earrings out of that 1cm splinter!"',
        microSteps: [
          'Toss tiny charred slivers directly into trash',
          'Stack birch ply sheets by thickness',
          'Slide acrylic sheets into upright filing sorter'
        ]
      },
      {
        id: 'cr-3d-1',
        title: '3D Print Station: Build Plate IPA Reset & Debris Vacuum',
        description: 'Scrape finished prints, wash/IPA wipe build plate, vacuum purge lines and failed supports.',
        estimatedMinutes: 15,
        station: '3d_printing',
        completed: false,
        sensoryTip: 'Use a handheld mini-vac! The humming suction sensation is deeply satisfying for ADHD brains.',
        microSteps: [
          'Store finished completed prints in project tub',
          'Clean PEI sheet with 90%+ Isopropyl Alcohol',
          'Vacuum plastic purge squiggles off the table & floor',
          'Check nozzle for filament build-up'
        ]
      },
      {
        id: 'cr-3d-2',
        title: '3D Print Station: Filament Humidity & Spool Corral',
        description: 'Seal open PLA/PETG spools with desiccant into zip bags or airtight totes.',
        estimatedMinutes: 15,
        station: '3d_printing',
        completed: false,
        sensoryTip: 'Keep spools visible through clear containers so you don’t forget what colors you already have.',
        microSteps: [
          'Collect loose spools off the floor and desk',
          'Insert fresh silica gel packet into each bag',
          'Tuck filament ends into spool guide holes (no tangles!)',
          'Stack sealed spools on bottom shelf tier'
        ]
      },
      {
        id: 'cr-vinyl-1',
        title: 'Vinyl Cutter: Weeding Scraps & Backing Paper Purge',
        description: 'Empty the table scrap bucket, wipe cutting mat, stick tools back onto magnetic holder.',
        estimatedMinutes: 15,
        station: 'vinyl_cutter',
        completed: false,
        sensoryTip: 'Keep a silicone scrap collector suctioned right next to the machine for zero-effort weeding trash.',
        microSteps: [
          'Sweep sticky vinyl bits into a single pile and toss',
          'Clean cutting blade holder of paper fibers',
          'Hang tweezers and weeding picks on the magnetic caddy',
          'Snap cap on transfer paper roll'
        ]
      },
      {
        id: 'cr-vinyl-2',
        title: 'Vinyl Cutter: HTV vs Permanent Roll Categorization',
        description: 'Separate heat transfer vinyl (HTV) from adhesive craft vinyl into color sleeves.',
        estimatedMinutes: 15,
        station: 'vinyl_cutter',
        completed: false,
        sensoryTip: 'Label roll caps with a white chalk marker: "HTV" or "PERM" so you don’t have to unroll to check.',
        microSteps: [
          'Gather rogue vinyl rolls from around the room',
          'Separate heat press iron-on from permanent decals',
          'Slot into hanging roll rack or shelf bin'
        ]
      },
      {
        id: 'cr-desk-1',
        title: 'Computer Desk: Physical Surface & Tool Reset',
        description: 'Clear empty beverage mugs, wipe tablet and mousepad, gather loose flash drives.',
        estimatedMinutes: 15,
        station: 'computer_desk',
        completed: false,
        sensoryTip: 'A completely clear mousepad reduces cognitive drag by 80% before opening Illustrator or Blender.',
        microSteps: [
          'Return mugs and snack dishes to kitchen',
          'Wipe desk surface with citrus cleansing wipe',
          'Toss scribbled scrap notes that are already completed',
          'Place SD cards & USB adapters in small divided organizer'
        ]
      },
      {
        id: 'cr-shelf-1',
        title: '4-Tier 40"x18" Shelf: Top & Middle Tiers Alignment',
        description: 'Face all clear bins forward, ensure labels match contents, reset project kits.',
        estimatedMinutes: 15,
        station: 'storage_shelf',
        completed: false,
        sensoryTip: 'AuDHD golden rule: "If you can’t see it, it ceases to exist." Use clear bins only!',
        microSteps: [
          'Tier 1 (Top): Light craft blanks, safety ear muffs, and label cartridges',
          'Tier 2: Daily-use acrylic paints, glues, and rulers',
          'Tier 3: 3D printing filaments and hardware fasteners',
          'Align bin edges with the 40" front wire lip'
        ]
      },
      {
        id: 'cr-shelf-2',
        title: '4-Tier 40"x18" Shelf: Bottom Tier Bulk Storage Purge',
        description: 'Clear heavy power supplies, raw wood bundles, and scrap bins from floor creep.',
        estimatedMinutes: 15,
        station: 'storage_shelf',
        completed: false,
        sensoryTip: 'Keep heavy items on the 18" deep bottom shelf so you never have to strain your lower back.',
        microSteps: [
          'Stack flat wood planks vertically or neatly banded',
          'Coil extension cords and exhaust ducting',
          'Clear the floor perimeter around the shelf legs'
        ]
      },
      {
        id: 'cr-closet-1',
        title: 'Cluttered Closet: Floor Perimeter Excavation',
        description: 'Remove rogue boxes from closet floor to expose carpet/flooring and create standing space.',
        estimatedMinutes: 15,
        station: 'closet',
        completed: false,
        sensoryTip: 'Set a "Doom Basket": throw everything that doesn’t belong into one basket to sort later.',
        microSteps: [
          'Take out any cardboard shipping boxes to recycle',
          'Hang apparel blanks or shirts on hangers',
          'Vacuum the exposed closet floor corner',
          'Ensure closet doors slide shut without catching'
        ]
      },
    ],
    quickTidyTasks: [
      {
        id: 'qt-cr-1',
        roomId: 'craft_room',
        roomName: 'Craft & Maker Room',
        title: 'Hide sharp tools & weeding picks in desk drawer',
        minutes: 3,
        impact: 'critical',
        completed: false,
        visitorTarget: 'Safety first: visitors or kids won’t poke themselves on hobby blades.'
      },
      {
        id: 'qt-cr-2',
        roomId: 'craft_room',
        roomName: 'Craft & Maker Room',
        title: 'Sweep loose plastic/wood scraps off main pathway',
        minutes: 4,
        impact: 'high',
        completed: false,
        visitorTarget: 'Clear floor prevents tripping and looks instantly curated.'
      },
      {
        id: 'qt-cr-3',
        roomId: 'craft_room',
        roomName: 'Craft & Maker Room',
        title: 'Close the cluttered closet door & tidy 4-tier front edge',
        minutes: 3,
        impact: 'critical',
        completed: false,
        visitorTarget: 'Out of sight, out of mind! Instant 10x visual improvement.'
      }
    ],
    declutterTips: [
      'Visual Storage Only: Solid cardboard boxes become "black holes" for ADHD minds. Stick to translucent bins on your 40"x18" shelf.',
      'Point-of-Performance: Keep laser safety glasses directly hung on the laser cutter enclosure, not across the room.',
      'Trash Can at Every Station: Have a small bin right under the vinyl cutter and 3D printer so scraps never hit the desk.'
    ]
  },

  {
    id: 'master_bedroom',
    name: 'Master Bedroom',
    subtitle: 'Sleep Sanctuary, Bed, Wardrobe & Nightstands',
    iconName: 'BedDouble',
    colorTheme: {
      bg: 'bg-purple-500',
      border: 'border-purple-300',
      text: 'text-purple-950',
      accent: '#8B5CF6',
      gradient: 'from-purple-500 via-indigo-500 to-pink-500',
      lightBg: 'bg-purple-50/70',
      badgeBg: 'bg-purple-100 text-purple-800 border-purple-200',
    },
    tasks: [
      {
        id: 'mb-1',
        title: 'The Bed Reset: 5-Minute Dopamine Foundation',
        description: 'Smooth sheet, pull up comforter, arrange pillows. Creates an instant visual oasis.',
        estimatedMinutes: 10,
        completed: false,
        sensoryTip: 'Don’t worry about military hospital corners! Just flinging the comforter flat is 90% of the visual calm.',
        microSteps: [
          'Remove items resting on bed (books, laundry)',
          'Pull duvet or blanket up toward headboard',
          'Fluff 2 pillows and place upright',
          'Step back and admire the flat calm canvas'
        ]
      },
      {
        id: 'mb-2',
        title: 'The Infamous "Clothes Chair / Hamper" Triage',
        description: 'Sort the clothing pile into 2 categories: actually dirty (in hamper) or re-wearable (hook/hanger).',
        estimatedMinutes: 15,
        completed: false,
        sensoryTip: 'Put on upbeat music and use over-the-door hooks for clothes that are "too clean for laundry, too dirty for drawer".',
        microSteps: [
          'Toss socks, underwear, and gym wear straight into hamper',
          'Hang jeans/hoodies on dedicated wall hooks',
          'Fold clean clothes roughly into drawer',
          'Celebrate having a chair you can actually sit on!'
        ]
      },
      {
        id: 'mb-3',
        title: 'Nightstand Flat Surface Clearing Blitz',
        description: 'Gather old water glasses, toss receipt scraps, stow chargers and hand lotions.',
        estimatedMinutes: 15,
        completed: false,
        sensoryTip: 'Keep a small dish or velvet tray for rings, lip balm, and earplugs so they don’t scatter.',
        microSteps: [
          'Bring cups and drink tumblers to the kitchen',
          'Recycle tissues and junk wrappers',
          'Wipe wood surface with a scented wipe',
          'Neatly align bedside lamp and charging cord'
        ]
      },
      {
        id: 'mb-4',
        title: 'Floor Perimeter & Under-Bed Rescue Mission',
        description: 'Use a broom or flashlight to pull out stray slippers, lost socks, and dust bunnies.',
        estimatedMinutes: 15,
        completed: false,
        sensoryTip: 'Put on slippers so your bare feet don’t get startled by cold crumbs or dust.',
        microSteps: [
          'Sweep under bed with broom handle',
          'Return lost shoes to closet entry',
          'Quick swiffer or vacuum pass on exposed walkway'
        ]
      }
    ],
    quickTidyTasks: [
      {
        id: 'qt-mb-1',
        roomId: 'master_bedroom',
        roomName: 'Master Bedroom',
        title: 'Pull up bed comforter and straighten pillows',
        minutes: 3,
        impact: 'critical',
        completed: false,
        visitorTarget: 'Takes 90 seconds, covers 60% of the room visual space.'
      },
      {
        id: 'qt-mb-2',
        roomId: 'master_bedroom',
        roomName: 'Master Bedroom',
        title: 'Shove "chair clothes" into hamper & shut closet door',
        minutes: 4,
        impact: 'high',
        completed: false,
        visitorTarget: 'Eliminates floor clutter instantly if someone walks down the hall.'
      },
      {
        id: 'qt-mb-3',
        roomId: 'master_bedroom',
        roomName: 'Master Bedroom',
        title: 'Clear cups from nightstands to kitchen',
        minutes: 3,
        impact: 'moderate',
        completed: false,
        visitorTarget: 'Looks clean and removes stale drink odors.'
      }
    ],
    declutterTips: [
      'The "In-Between" Hook System: Install 4 hooks on your wall or behind the door for clothes you plan to wear again.',
      'No-Lid Laundry Hampers: AuDHD brains have friction with lids. An open hamper means clothes actually land inside 90% more often.',
      'One Flat Surface Rule: If you keep just the top of your nightstand clear, your nervous system resets before sleep.'
    ]
  },

  {
    id: 'living_room',
    name: 'Living Room',
    subtitle: 'Social Hub, Sofa, Coffee Table & Media Center',
    iconName: 'Tv',
    colorTheme: {
      bg: 'bg-amber-500',
      border: 'border-amber-300',
      text: 'text-amber-950',
      accent: '#F59E0B',
      gradient: 'from-amber-400 via-orange-500 to-rose-500',
      lightBg: 'bg-amber-50/70',
      badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    tasks: [
      {
        id: 'lr-1',
        title: 'Couch Reset: Cushion Karate-Chop & Throw Blanket Roll',
        description: 'Fluff squished cushions, fold throws over armrests, clear crumbs between crevices.',
        estimatedMinutes: 10,
        completed: false,
        sensoryTip: 'Giving cushions a good whack releases satisfying kinetic energy and resets the silhouette.',
        microSteps: [
          'Shake crumbs off throw blankets onto floor (vacuum later)',
          'Fold blanket into a neat square or drape over couch back',
          'Fluff throw pillows and align against corners'
        ]
      },
      {
        id: 'lr-2',
        title: 'Coffee Table "Island of Calm" Surface Sweep',
        description: 'Remove cups, stack magazines, corral TV remotes into a single tray.',
        estimatedMinutes: 15,
        completed: false,
        sensoryTip: 'Use a decorative tray! Placing 3 remotes on a wooden tray instantly turns "clutter" into "decor".',
        microSteps: [
          'Gather drink cans and glasses to kitchen sink',
          'Recycle junk mail and packaging',
          'Wipe ring marks with damp cloth',
          'Arrange remotes inside tray'
        ]
      },
      {
        id: 'lr-3',
        title: 'Floor Triage: The Stash Basket Method',
        description: 'Walk around with a laundry basket and drop everything that belongs in other rooms.',
        estimatedMinutes: 15,
        completed: false,
        sensoryTip: 'Do NOT walk to other rooms yet! That breaks focus. Just collect it all in the basket first.',
        microSteps: [
          'Toss shoes, toys, books, and cables into the basket',
          'Scan corners and under the coffee table',
          'Park the basket by the hallway for later delivery',
          'Quick 3-minute vacuum pass on high traffic rug'
        ]
      },
      {
        id: 'lr-4',
        title: 'Entertainment Center & Dust Wipe',
        description: 'Microfiber cloth wipe on TV screen, console vents, and display shelves.',
        estimatedMinutes: 15,
        completed: false,
        sensoryTip: 'Use a dry microfiber wand—no wet sprays needed, fast and static-attracting.',
        microSteps: [
          'Dust top edge of television',
          'Wipe gaming console and soundbar',
          'Straighten game controllers and charging cords'
        ]
      }
    ],
    quickTidyTasks: [
      {
        id: 'qt-lr-1',
        roomId: 'living_room',
        roomName: 'Living Room',
        title: 'Fluff couch pillows & drape blanket over armrest',
        minutes: 2,
        impact: 'critical',
        completed: false,
        visitorTarget: 'First thing visitors see when they sit down.'
      },
      {
        id: 'qt-lr-2',
        roomId: 'living_room',
        roomName: 'Living Room',
        title: 'Sweep coffee table clutter into a single catch-all basket',
        minutes: 4,
        impact: 'critical',
        completed: false,
        visitorTarget: 'A completely clear coffee table looks instantly immaculate.'
      },
      {
        id: 'qt-lr-3',
        roomId: 'living_room',
        roomName: 'Living Room',
        title: 'Run trash bag for snack wrappers & rogue cups',
        minutes: 3,
        impact: 'high',
        completed: false,
        visitorTarget: 'Banishes food odors and crumbs.'
      }
    ],
    declutterTips: [
      'The "Living Room Stash Basket": Keep a designated stylish woven basket in the corner. If unexpected guests arrive, toss toys/crafts inside in 30 seconds.',
      'Drop Zone Tray: Place a small wooden bowl near the door for keys, sunglasses, and pocket receipts.',
      'Reset Before Bed: Taking 3 minutes to align couch pillows before bed gives you an energizing morning dopamine hit.'
    ]
  },

  {
    id: 'kitchen',
    name: 'Kitchen',
    subtitle: 'Counters, Sink Triage, Dishwasher & Stovetop',
    iconName: 'UtensilsCrossed',
    colorTheme: {
      bg: 'bg-teal-500',
      border: 'border-teal-300',
      text: 'text-teal-950',
      accent: '#14B8A6',
      gradient: 'from-teal-400 via-cyan-500 to-emerald-500',
      lightBg: 'bg-teal-50/70',
      badgeBg: 'bg-teal-100 text-teal-800 border-teal-200',
    },
    tasks: [
      {
        id: 'ki-1',
        title: 'The Sensory-Shield Sink & Dishwasher Triage',
        description: 'Put on gloves, load dishwasher or soak pots. Clear the sink drain to see silver shine.',
        estimatedMinutes: 15,
        completed: false,
        sensoryTip: 'WEAR RUBBER GLOVES! Eliminates gross wet food texture aversion instantly.',
        microSteps: [
          'Put on durable dishwashing gloves & wireless headphones',
          'Empty clean dishwasher (or stack dirty plates in rack)',
          'Scrape leftovers into trash or disposal',
          'Rinse sink basin and squirt dish soap to deodorize'
        ]
      },
      {
        id: 'ki-2',
        title: 'Countertop "Island of Sanity" Wipe Down',
        description: 'Move appliances back against wall, spray counters, wipe crumbs into hand or dustpan.',
        estimatedMinutes: 15,
        completed: false,
        sensoryTip: 'Use a pleasant smelling spray (peppermint, lavender, or citrus) for aromatherapy focus.',
        microSteps: [
          'Put away bread, cereal boxes, and seasonings',
          'Spray counters with all-purpose cleaner',
          'Wipe with clean microfiber in long horizontal strokes',
          'Toss dirty sponge in dishwasher top rack'
        ]
      },
      {
        id: 'ki-3',
        title: 'Stovetop & Microwave 15-Minute Degrease',
        description: 'Wipe burner splatters and steam-clean microwave with a mug of water and lemon.',
        estimatedMinutes: 15,
        completed: false,
        sensoryTip: 'Microwave a wet paper towel for 60 seconds; the steam loosens baked sauces effortlessly.',
        microSteps: [
          'Microwave water cup for 2 minutes to create steam',
          'Wipe inside microwave ceiling and turntable',
          'Spray stovetop grate and wipe burnt grease spots'
        ]
      },
      {
        id: 'ki-4',
        title: 'Fridge Quick-Purge & Trash Can Swap',
        description: 'Toss fuzzy leftovers, tie up full trash bag, insert fresh bag with a drop of essential oil.',
        estimatedMinutes: 15,
        completed: false,
        sensoryTip: 'Don’t inspect expired food too closely—hold your breath, dump directly into bag, and seal!',
        microSteps: [
          'Scan fridge top shelf for mystery containers older than 1 week',
          'Dump food remnants into trash bag',
          'Tie up kitchen garbage and carry to outside bin',
          'Fit fresh trash bag snugly over rim'
        ]
      }
    ],
    quickTidyTasks: [
      {
        id: 'qt-ki-1',
        roomId: 'kitchen',
        roomName: 'Kitchen',
        title: 'Hide dirty dishes inside dishwasher or stack neatly in sink',
        minutes: 4,
        impact: 'critical',
        completed: false,
        visitorTarget: 'Nothing makes a house feel dirtier than chaotic dirty pans.'
      },
      {
        id: 'qt-ki-2',
        roomId: 'kitchen',
        roomName: 'Kitchen',
        title: 'Wipe center island/main counter with disinfectant spray',
        minutes: 3,
        impact: 'critical',
        completed: false,
        visitorTarget: 'Shining clean counters reflect light and look pristine.'
      },
      {
        id: 'qt-ki-3',
        roomId: 'kitchen',
        roomName: 'Kitchen',
        title: 'Tie full trash bag & replace with fresh liner',
        minutes: 2,
        impact: 'high',
        completed: false,
        visitorTarget: 'Eliminates cooking smells before visitors step through.'
      }
    ],
    declutterTips: [
      'Dish Glove Hack: A dedicated pair of lined silicone dish gloves prevents texture meltdowns.',
      'Clear the "Landing Zone": Leave one section of counter 100% empty as a staging area when you cook.',
      'The "Clean as you Wait" Game: While the microwave or kettle runs for 90 seconds, race yourself to put away 5 items.'
    ]
  },

  {
    id: 'bathroom',
    name: 'Bathroom',
    subtitle: 'Vanity Mirror, Sink, Toilet Sanitizing & Towels',
    iconName: 'Droplets',
    colorTheme: {
      bg: 'bg-sky-500',
      border: 'border-sky-300',
      text: 'text-sky-950',
      accent: '#0EA5E9',
      gradient: 'from-sky-400 via-blue-500 to-indigo-500',
      lightBg: 'bg-sky-50/70',
      badgeBg: 'bg-sky-100 text-sky-800 border-sky-200',
    },
    tasks: [
      {
        id: 'ba-1',
        title: 'Vanity Basin Scrub & Mirror Squeegee',
        description: 'Wipe toothpaste splatters, polish faucet chrome, squeegee mirror streak-free.',
        estimatedMinutes: 10,
        completed: false,
        sensoryTip: 'Keep a small squeegee hung right on the mirror—one swipe takes 5 seconds and gives instant clarity.',
        microSteps: [
          'Spray glass cleaner on mirror and wipe with microfiber',
          'Scrub sink basin with baking soda or foaming spray',
          'Buff shiny faucet handles dry',
          'Stow hairbrush and daily creams inside vanity'
        ]
      },
      {
        id: 'ba-2',
        title: 'Toilet 3-Zone Disinfectant Refresh',
        description: 'Squirt gel under rim, brush bowl, wipe seat, lid, and base with antibacterial wipes.',
        estimatedMinutes: 10,
        completed: false,
        sensoryTip: 'Use disposable wipes or paper towels here so you don’t have to wash bathroom rags.',
        microSteps: [
          'Swirl bleach or toilet gel under bowl rim and let sit',
          'Wipe flush handle, tank lid, and seat with disinfectant',
          'Vigorous bowl brush swirl and flush',
          'Close toilet lid for clean look'
        ]
      },
      {
        id: 'ba-3',
        title: 'Shower / Tub Quick Squeegee & Towel Swap',
        description: 'Spray tile walls, rinse shampoo drippings, hang fresh clean hand towel and bath sheets.',
        estimatedMinutes: 15,
        completed: false,
        sensoryTip: 'Fresh fluffy towels make the whole bathroom feel like a peaceful boutique hotel.',
        microSteps: [
          'Rinse loose hairs down drain with shower wand',
          'Straighten shampoo and body wash bottles on shelf',
          'Toss damp floor mat in washer or hang up to dry',
          'Hang clean hand towel on ring'
        ]
      },
      {
        id: 'ba-4',
        title: 'Trash Bin Empty & Floor Swiffer Sweep',
        description: 'Empty bathroom mini-bin, refill toilet paper rolls, Swiffer the floor corners.',
        estimatedMinutes: 10,
        completed: false,
        sensoryTip: 'Bathroom floors collect stray hairs easily. A dry Swiffer pad grabs them like magic in 60 seconds.',
        microSteps: [
          'Empty small trash can into master bedroom or kitchen bag',
          'Stack spare TP rolls in basket near toilet',
          'Swiffer or damp wipe floor behind door'
        ]
      }
    ],
    quickTidyTasks: [
      {
        id: 'qt-ba-1',
        roomId: 'bathroom',
        roomName: 'Bathroom',
        title: 'Wipe faucet & sink rim + spray mirror clean',
        minutes: 2,
        impact: 'critical',
        completed: false,
        visitorTarget: 'Every guest who uses the bathroom looks directly in this mirror.'
      },
      {
        id: 'qt-ba-2',
        roomId: 'bathroom',
        roomName: 'Bathroom',
        title: 'Put out fresh clean hand towel & check toilet paper roll',
        minutes: 2,
        impact: 'critical',
        completed: false,
        visitorTarget: 'Prevents awkward guest questions and feels hospitable.'
      },
      {
        id: 'qt-ba-3',
        roomId: 'bathroom',
        roomName: 'Bathroom',
        title: 'Close the toilet lid & pull shower curtain straight',
        minutes: 1,
        impact: 'critical',
        completed: false,
        visitorTarget: 'Closes off visual chaos of tubs/shampoos instantly.'
      }
    ],
    declutterTips: [
      'The "Daily Shower Spray": Spray a mist of daily cleaner right after showering; eliminates scrubbing completely.',
      'Clear Counter Policy: Keep only hand soap on the counter. Put toothbrushes in a wall mount or medicine cabinet.',
      'Scent Anchor: Keep a subtle reed diffuser or eucalyptus sprig in the shower for instant calm.'
    ]
  },

  {
    id: 'teen_room',
    name: 'Teenager’s Room',
    subtitle: 'Non-Confrontational Floor Path, Cup Rescue & Tech',
    iconName: 'Gamepad2',
    colorTheme: {
      bg: 'bg-rose-500',
      border: 'border-rose-300',
      text: 'text-rose-950',
      accent: '#F43F5E',
      gradient: 'from-rose-400 via-pink-500 to-red-500',
      lightBg: 'bg-rose-50/70',
      badgeBg: 'bg-rose-100 text-rose-800 border-rose-200',
    },
    tasks: [
      {
        id: 'tr-1',
        title: 'Non-Confrontational "Floor Path" Laundry Sprint',
        description: 'Aim for visible carpet first: grab clothes off the floor and toss into an open laundry basket.',
        estimatedMinutes: 15,
        completed: false,
        sensoryTip: 'Don’t sort colors or fold right now! Just getting clothes off the floor into a basket is a massive victory.',
        microSteps: [
          'Bring a wide laundry basket into the center of the room',
          'Scoop hoodies, shirts, and jeans off the walkway',
          'Leave shoes paired by the door or under bed',
          'Notice how much larger the room feels with carpet showing!'
        ]
      },
      {
        id: 'tr-2',
        title: 'Dish, Cup & Snack Wrapper Search-and-Rescue',
        description: 'Collect empty soda cans, water tumblers, and bowls back to the kitchen before mold appears.',
        estimatedMinutes: 10,
        completed: false,
        sensoryTip: 'Gamify it: set a 5-minute timer and award 10 dopamine points per retrieved dish!',
        microSteps: [
          'Check desk behind monitors for hidden glasses',
          'Check under bed for water bottles',
          'Carry dishes on a tray to the kitchen sink',
          'Recycle empty chip bags and drink cans'
        ]
      },
      {
        id: 'tr-3',
        title: 'Bedding Straighten & Low-Demand Pillow Fluff',
        description: 'Tug the duvet over the mattress, position gaming pillows, toss dirty blankets in wash.',
        estimatedMinutes: 10,
        completed: false,
        sensoryTip: 'Low demand: "Good enough" is great here. No hospital corners, just pull it up toward the wall.',
        microSteps: [
          'Pull sheets flat from foot to head',
          'Rest sleeping pillow at top',
          'Pick up phone charging cables from bedding'
        ]
      },
      {
        id: 'tr-4',
        title: 'Gaming Desk Visible Surface & Cable Triage',
        description: 'Clear snack crumbs off keyboard, coil headphone cords, toss crumpled school papers.',
        estimatedMinutes: 15,
        completed: false,
        sensoryTip: 'Use a soft paintbrush or keyboard putty to sweep crumbs—surprisingly therapeutic fidget activity!',
        microSteps: [
          'Shake crumbs out of desk mat into wastebasket',
          'Hang gaming headset on monitor mount or hook',
          'Stack textbooks and notebooks into one neat pile',
          'Wipe desk surface around mouse'
        ]
      }
    ],
    quickTidyTasks: [
      {
        id: 'qt-tr-1',
        roomId: 'teen_room',
        roomName: 'Teenager’s Room',
        title: 'Kick loose clothes into hamper & slide under desk/closet',
        minutes: 3,
        impact: 'critical',
        completed: false,
        visitorTarget: 'Clears the primary walking visual clutter immediately.'
      },
      {
        id: 'qt-tr-2',
        roomId: 'teen_room',
        roomName: 'Teenager’s Room',
        title: 'Collect all visible drinking cups and mugs to kitchen',
        minutes: 3,
        impact: 'critical',
        completed: false,
        visitorTarget: 'Removes foul smell and avoids awkward spills.'
      },
      {
        id: 'qt-tr-3',
        roomId: 'teen_room',
        roomName: 'Teenager’s Room',
        title: 'Straighten blanket and close bedroom door if needed',
        minutes: 1,
        impact: 'high',
        completed: false,
        visitorTarget: 'If pressed for time before guests arrive: shutting the door is 100% acceptable!'
      }
    ],
    declutterTips: [
      'Body Doubling with Music: Teens clean 4x faster when you do it together while listening to a joint playlist or podcast, without lecturing.',
      'The "Open Bin" Rule: Replace tall lidded hampers with wide open-top canvas bins. If it requires zero steps to toss, it won’t hit the floor.',
      'Autonomous Zone: Allow their closet or desk drawers to be messy as long as the floor and food dishes are cleared. Pick your battles.'
    ]
  }
];

export const FOCUS_TRACKS = [
  {
    id: 'lofi',
    name: 'Lo-Fi Chill Focus',
    description: 'Warm electric piano chords with a relaxed rhythmic heartbeat pulse.',
    tag: 'Dopamine Groove',
    icon: 'Music'
  },
  {
    id: 'brown_noise',
    name: 'Brown Noise Deep Blanket',
    description: 'Deep low-frequency rumble resembling a waterfall or airplane cabin; silences racing thoughts.',
    tag: 'Sensory Shield',
    icon: 'CloudRain'
  },
  {
    id: 'pink_noise',
    name: 'Pink Noise Flow',
    description: 'Balanced frequency spectrum like rustling leaves; enhances sustained attention.',
    tag: 'Focus Flow',
    icon: 'Waves'
  },
  {
    id: 'ambient_432',
    name: '432 Hz Healing Harmony',
    description: 'Gentle harmonic sine drone tuned to natural resonance to melt task paralysis.',
    tag: 'Calm Sanctuary',
    icon: 'Sparkles'
  },
  {
    id: 'chiptune',
    name: '8-Bit Arcade Motivator',
    description: 'Upbeat retro gaming synthesizer pulse that sparks playful cleaning momentum.',
    tag: 'High Energy',
    icon: 'Gamepad2'
  },
  {
    id: 'binaural_alpha',
    name: '10Hz Binaural Alpha Beat',
    description: 'Stereo frequency differential scientifically tuned to induce calm, alert flow states.',
    tag: 'Flow State',
    icon: 'Headphones'
  },
  {
    id: 'mute',
    name: 'Silent Timer Only',
    description: 'No background audio; gentle chime will still sound when the 15-minute block ends.',
    tag: 'Quiet',
    icon: 'VolumeX'
  }
];
