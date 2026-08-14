/**
 * Central content schema for the portfolio.
 * Edit this file to change project records, gallery photo log, tech stack,
 * and contact info; components only render what is defined here.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** STAR-structured engineering project shown in ProjectsSection. */
export interface Project {
  /** Internal key used for demo/gallery lookups (P-01 …), not rendered. */
  id: string;
  title: string;
  role: string;
  /** Short one-liner shown under the title. */
  tagline: string;
  star: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  /** Skill tags rendered as chips on the record. */
  tags: string[];
  /** Placeholder for a future interactive demo route (e.g. "/demo/water-mpc"). */
  demoHref?: string;
  /**
   * When set, the embedded live demo replaces the STAR grid and this short
   * summary replaces the tag chips on the record.
   */
  demoSummary?: string;
  /** Downloadable document rendered as a button on the record. */
  report?: { label: string; href: string };
  /** External source-code link rendered as a button on the record. */
  repo?: { label: string; href: string };
}

/**
 * A clickable project photo that opens an enlarged "post" with its story
 * (used by the Embedded & Smart Systems record).
 */
export interface ProjectStory {
  id: string;
  /** Short mono kicker above the title. */
  caption: string;
  title: string;
  /** Image path under /public. */
  image: string;
  story: string;
}

/** One frame of the full-bleed photo strip (7 items). */
export interface GalleryItem {
  id: string;
  /** Short mono caption shown on the tile. */
  label: string;
  /** Story shown in the log line while the frame is active. */
  story: string;
  /** Image path under /public. */
  image: string;
}

/** A titled group of technologies in the TechStack grid. */
export interface TechCategory {
  title: string;
  items: string[];
}

// ---------------------------------------------------------------------------
// Projects (STAR)
// ---------------------------------------------------------------------------

export const projects: Project[] = [
  {
    id: 'P-01',
    title: 'Škoda Auto CVS Humidity Simulation Tool',
    role: 'Test & Simulation Engineer',
    tagline:
      'One engineer, the whole loop: measurement design, sensor instrumentation, a validated model, and the application that picks the dilution ratio from it. 1st place at SVK 2025.',
    star: {
      situation:
        'Constant Volume Sampling (CVS) emission measurements are humidity-sensitive: if the exhaust condenses in the dilution tunnel the run is invalid, and the risk rises with engine power. The lever against it is the dilution ratio.',
      task:
        'Quantify how humidity propagates through the CVS system and give the laboratory a way to choose the dilution ratio for a given vehicle before the test.',
      action:
        'Designed the measurement scenarios, instrumented the 20 m dilution tunnel with humidity and temperature sensors along its length, then built the thermodynamic model in Python and validated it against that campaign. Exhaust flow came from a mass balance, composition from stoichiometry, and the temperature profile from PEMS road-test data.',
      result:
        'A Tkinter application that evaluates every available dilution ratio for a given vehicle, from its mass, road-load coefficients and driving cycle, and selects the lowest ratio that still holds a margin against condensation. Delivered to the emission laboratory; 1st place at SVK 2025.',
    },
    tags: ['Test Design', 'Sensor Integration', 'Data Acquisition', 'Python', 'Thermodynamics', 'Operator GUI'],
    report: {
      label: 'Internship Report (signed)',
      href: '/Internship_Report_Skoda.pdf',
    },
    demoSummary:
      'CVS emission benches are humidity-sensitive: condensation in the dilution tunnel invalidates a test run, and the lever against it is the dilution ratio. I designed the measurement campaign, instrumented the 20 m tunnel with humidity and temperature sensors along its length, built the thermodynamic model in Python and validated it against that campaign. The delivered tool evaluates every available dilution ratio for a given vehicle and picks the lowest one that still holds a margin against condensation. The panel is that tool rebuilt in the browser.',
  },
  {
    id: 'P-02',
    title: 'Predictive AdBlue Dosing in Diesel Aftertreatment',
    role: "Master's Thesis: Advanced Process Control",
    tagline:
      'A reaction-kinetics reactor model running inside the controller, tracking the ammonia stored on the catalyst.',
    star: {
      situation:
        'Diesel generator aftertreatment requires precise AdBlue injection: too little NOx escapes, too much causes ammonia slip. The quantity that decides the right dose, the ammonia stored on the catalyst washcoat, has no sensor.',
      task:
        'Develop a model-based dosing strategy for the SCR catalyst and its injector, validated against a detailed reactor simulator.',
      action:
        'Turned XMR, an in-house Fortran reactor simulator, into a controller component: compiled it into a callable library so the controller can run several warm-started instances per step, instead of passing intermediate results through disk. Built the cost function on top, drove it with IPOPT, and scripted the weight tuning. Average solve time 5.8 s against a 30 s control step, on the development machine.',
      result:
        'The NMPC previews load steps 8 minutes ahead and holds NH3 slip below 1 ppm, enough to remove the downstream ammonia-slip catalyst, traded against NOx conversion at partial load; urea consumption is 5.7 % lower than the PID baseline. On the specified duty cycle a conventional controller already met the emission target; the NMPC earns its cost when the ammonia-slip catalyst is deleted or the unit runs off-design.',
    },
    tags: ['Nonlinear MPC', 'SCR / NH3 Slip', '1D Reactor Modeling', 'Fortran', 'IPOPT', 'Python'],
    demoSummary:
      'Too little AdBlue and NOx escapes; too much and ammonia slips through, which is why production exhaust systems carry an extra ammonia-slip catalyst (ASC) behind the SCR. The dose depends on how much ammonia is already stored on the catalyst washcoat, which no sensor measures, so the controller carries a reaction-kinetics model of the catalyst. Getting that model into the loop meant turning XMR, an in-house Fortran reactor simulator, into a callable library the controller can run as several warm-started instances per step, rather than passing intermediate results through disk. It solves in 5.8 s on average against a 30 s control step. It previews load steps 8 minutes ahead and holds NH3 slip below 1 ppm, so the ASC can be deleted, traded against some NOx conversion at partial load. The panel shows the system and the benchmark.',
  },
  {
    id: 'P-03',
    title: 'Multi-Platform Water Control System',
    role: 'Project Manager / Control Engineer',
    tagline:
      'University semester project: coordinating an 8-person team from sensor wiring to operator GUI: linear MPC delivered on a real hydraulic plant, on schedule.',
    star: {
      situation:
        'A university semester project: a physical multi-tank water plant needed a modern control system spanning lab hardware and a usable operator interface.',
      task:
        'Project-manage the engineering side of the team (programmers, testers, frontend) while owning the control design: plant modeling, MPC, and data acquisition.',
      action:
        'Linearized a first-principles model around the operating point for a linear MPC, integrated NI-DAQmx acquisition, and coordinated delivery of a PySide6 operator application with live trending.',
      result:
        'Stable closed-loop control on the real rig with constraint handling, plus a maintainable multi-platform codebase used by the team. I later rebuilt the same plant as a distributed control system: three controller nodes in software, each exposed as an OPC UA server running its own PID loops, interlocks and watchdogs, with the MPC above them as a supervisory client that writes setpoints rather than actuator commands, plus a web HMI and a historian on the same address space.',
    },
    tags: ['Linear MPC', 'do-mpc', 'OPC UA', 'DCS Architecture', 'NI-DAQmx', 'PySide6', 'Python'],
    repo: {
      label: 'DCS / OPC UA Source',
      href: 'https://github.com/Hudineks/water_plant_DCS',
    },
    demoSummary:
      'On this semester project I was the project manager for the engineering side of an 8-person team (programmers, testers, frontend devs, and the requirements reports) and handled the DevOps work of splitting the hardware and software branches and integrating them into one system, delivered on schedule. My own specialization was the control design: a first-principles model linearized around the operating point, linear MPC with EKF state estimation, NI-DAQmx acquisition, and a PySide6 operator app for stable closed-loop control on the real rig. Afterwards I rebuilt the same plant as a distributed control system, with three controller nodes in software, each exposed as an OPC UA server running its own PID loops and interlocks, the MPC above them as a supervisory client writing setpoints instead of actuator commands, and a web HMI and historian on the same address space (on GitHub as water_plant_DCS). The panel is that operator app, replaying a closed-loop run at 6× real time.',
  },
  {
    id: 'P-04',
    title: 'Embedded & Smart Systems',
    role: 'Personal Projects: Embedded Developer',
    tagline:
      'Circadian lighting cabinet with local server control, an ESP32 smart bottle, and a LabVIEW test-rig restoration.',
    star: {
      situation:
        'Everyday problems worth engineering: healthy lighting rhythms, hydration tracking, and a lab rig left dead by a hardware failure.',
      task:
        'Design small, self-contained embedded systems that run reliably without cloud dependencies, and bring broken instrumentation back to life.',
      action:
        'Built an ESP32-based circadian lighting cabinet controlled by a local server, a sensor-equipped ESP32 smart bottle, and restored a laboratory test rig by remapping wiring and rebuilding its LabVIEW control logic.',
      result:
        'Daily-driver devices and a working rig: full-stack skills from firmware, electronics, and enclosures to instrumentation and troubleshooting.',
    },
    tags: ['ESP32', 'C/C++', 'IoT', 'Electronics', 'Local Server', 'LabVIEW'],
    demoSummary:
      'Off the clock I build the things I use: an ESP32 circadian lighting cabinet driven by a local server on the home network and running as a daily-driver, a capacitive-sensing smart bottle that logs hydration patterns, and a laboratory test rig brought back from a hardware failure by remapping its wiring and rebuilding the LabVIEW control logic. Click a photo below for the full story of each.',
  },
];

// ---------------------------------------------------------------------------
// Embedded & Smart Systems photo stories (click-to-enlarge posts)
// ---------------------------------------------------------------------------

export const embeddedStories: ProjectStory[] = [
  {
    id: 'smart-bottle',
    caption: 'The Flask',
    title: 'ESP32 Smart Bottle',
    image: '/images/projects/smart-bottle.jpg',
    story:
      'A Wemos S2 mini lives in the cap and measures the water level by capacitive sensing: no moving parts, nothing touching the water. Readings are logged to Firebase and visualized in a web dashboard that shows hydration patterns over the day. The firmware does the unglamorous work well: it manages the Wi-Fi connection, sleeps aggressively to save battery, and buffers data locally whenever the network drops, syncing once it reconnects.',
  },
  {
    id: 'circadian-cabinet',
    caption: 'The Canopy',
    title: 'Circadian Lighting Cabinet',
    image: '/images/projects/circadian-cabinet.jpg',
    story:
      'A living-room cabinet turned into a circadian light source: ESP32-driven LED strips follow the time of day, shifting from an energizing daylight white to a warm, candle-like glow in the evening. Everything is controlled by a local server on the home network: no cloud, no accounts, no outages. It has been running as a daily-driver ever since: firmware, electronics, dimming curves, and the woodwork to hide them all.',
  },
  {
    id: 'test-rig',
    caption: 'Test Rig Restoration',
    title: 'Test Rig Restoration (LabVIEW)',
    image: '/images/projects/test-rig.jpg',
    story:
      'After a measurement card failure, the laboratory testing rig became incompatible with its replacement hardware and went dark. I restored full functionality by remapping the wiring to the new card, updating the LabVIEW configuration, and reworking the control logic for stability and clarity. The repair minimized downtime and left the rig more robust than before, a lesson in reading other people\'s wiring diagrams as much as in instrumentation.',
  },
];

// ---------------------------------------------------------------------------
// Photo strip (7 frames, real photos in /public/images/gallery)
// ---------------------------------------------------------------------------

export const galleryItems: GalleryItem[] = [
  {
    id: 'water-demo',
    label: 'Water plant demo day',
    story:
      'Walking the committee through the multi-tank water plant on delivery day: linear MPC running live on the laptop beside the rig.',
    image: '/images/gallery/water-demo.jpg',
  },
  {
    id: 'nuclear-day',
    label: 'Nuclear power plant',
    story:
      'Excursion to the Dukovany nuclear power plant: Unit 1 in outage, walking the turbine hall past pipework the size of corridors.',
    image: '/images/gallery/nuclear-day.jpg',
  },
  {
    id: 'workbench',
    label: 'Electronics bench',
    story:
      'Home electronics bench: multimeter, breadboard, LED strip drivers and a power supply, where the embedded projects get built.',
    image: '/images/gallery/workbench.jpg',
  },
  {
    id: 'thesis',
    label: 'Thesis day',
    story:
      'Bachelor thesis in hand at UCT Prague: efficient 1D models of filtration in catalytic filters, fresh from the printer.',
    image: '/images/gallery/thesis.jpg',
  },
  {
    id: 'svk-award',
    label: 'SVK award',
    story:
      'Taking a prize at the SVK student research competition: the DPF filtration work holding its own in front of the faculty.',
    image: '/images/gallery/svk-award.jpg',
  },
];

// ---------------------------------------------------------------------------
// Experience timeline: a horizontal time axis in the Stack section.
// Milestones sit on the line (labels below); conferences & awards rise
// above it on stems. `pos` is % along the axis, roughly proportional to
// time over 2021–2026. Hovering/focusing a marker reveals its card.
// ---------------------------------------------------------------------------

export interface TimelineEntry {
  kind: 'milestone' | 'conference';
  /** Short label rendered at the marker. */
  label: string;
  title: string;
  org: string;
  /** When set, the org line in the card becomes an external link. */
  orgHref?: string;
  note: string;
  /** Position along the line, 0–100 (%). */
  pos: number;
  /** Placement badge shown in the card (e.g. "2nd place"). */
  badge?: string;
}

export const experienceTimeline: TimelineEntry[] = [
  {
    kind: 'milestone',
    label: '2021',
    title: 'Started the BSc',
    org: 'UCT Prague',
    note:
      'Began the BSc in Nano & Microtechnology in Chemical Engineering: top grades in process control, system identification, and numerical simulation.',
    pos: 13,
  },
  {
    kind: 'milestone',
    label: '2022',
    title: 'Joined the Monolith Research Group',
    org: 'monolith.vscht.cz',
    orgHref: 'https://monolith.vscht.cz/',
    note:
      'Researcher & data analyst on DPF/GPF filtration modeling: introduced the χ flow-heterogeneity parameter, validated against 3D CFD; later restored and automated the group\'s legacy test rig.',
    pos: 23,
  },
  {
    kind: 'conference',
    label: 'SVK ’22',
    title: 'SVK Student Conference',
    org: 'UCT Prague · November 2022',
    note:
      'First appearance at the annual November SVK student research conference, presenting the early DPF filtration work.',
    pos: 29,
  },
  {
    kind: 'conference',
    label: 'SVK ’23 · 2nd',
    title: 'SVK Student Conference',
    org: 'UCT Prague · November 2023',
    badge: '2nd place',
    note:
      'Second place with the DPF filtration modeling work: the χ flow-heterogeneity parameter validated against 3D CFD.',
    pos: 43,
  },
  {
    kind: 'milestone',
    label: '2024',
    title: 'BSc Defended → MSc Started',
    org: 'UCT Prague',
    note:
      'Defended the thesis on efficient 1D models of filtration in catalytic filters, then moved straight into the MSc in Sensorics & Cybernetics in Chemistry.',
    pos: 55,
  },
  {
    kind: 'conference',
    label: 'SVK ’24',
    title: 'SVK Student Conference',
    org: 'UCT Prague · November 2024',
    note:
      'Presented the ongoing aftertreatment modeling and control research at the annual November conference.',
    pos: 61,
  },
  {
    kind: 'milestone',
    label: '03–08/25',
    title: 'R&D Intern: Simulation & Modeling',
    org: 'Škoda Auto, Emission Laboratory (EPS/3)',
    note:
      'Built and validated the CVS humidity simulation tool against PEMS data; delivered the operator app used to pre-check emission test conditions.',
    pos: 72,
  },
  {
    kind: 'conference',
    label: 'AI Hack · 4th',
    title: 'Škoda Auto AI Hackathon',
    org: 'Škoda Auto · 2025',
    badge: '4th place',
    note:
      'Placed 4th at the Škoda Auto AI hackathon: rapid prototyping with AI tooling on automotive problems.',
    pos: 79,
  },
  {
    kind: 'milestone',
    label: '09–12/25',
    title: 'Project Manager / Control Engineer',
    org: 'StabiliTeam, Semester Team Project',
    note:
      'Three-month semester project: project-managed the engineering side of an 8-person team (programmers, testers, frontend, requirements reports) and built the linear MPC (model linearized around the operating point, do-mpc) with NI-DAQmx acquisition, PySide6 SCADA GUI, plus a parallel branch exposing the plant over OPC UA. Delivered 12/2025.',
    pos: 86,
  },
  {
    kind: 'conference',
    label: 'SVK ’25 · 1st',
    title: 'SVK Student Conference',
    org: 'UCT Prague · November 2025',
    badge: '1st place',
    note:
      'First place with the Škoda Auto CVS humidity simulation work: the validated model and operator pre-check app from the emission laboratory internship.',
    pos: 92,
  },
  {
    kind: 'milestone',
    label: '2026',
    title: "Master's Thesis: Predictive AdBlue Dosing",
    org: 'UCT Prague',
    note:
      'Model-based AdBlue dosing for diesel-generator aftertreatment: NMPC injector control built on the XMR monolith reactor simulator, compiled into a callable library the controller runs as several warm-started instances per step. Completed and defended in 2026.',
    pos: 97,
  },
];

// ---------------------------------------------------------------------------
// Tech stack
// ---------------------------------------------------------------------------

export const techStack: TechCategory[] = [
  {
    title: 'Foundations: UCT Prague',
    items: [
      'Modeling of chemical & physical processes',
      'Sensor principles & measurement theory',
      'Signal processing & system identification',
      'Control theory: MPC · state-space · PID',
      'Thermodynamics & fluid dynamics',
    ],
  },
  {
    title: 'Tools Used in Projects',
    items: [
      'Python: NumPy · SciPy · PySide6',
      'Nonlinear optimization: IPOPT',
      'Fortran',
      'MATLAB / Simulink',
      'NI-DAQmx · LabVIEW',
      'ESP32 · C/C++',
      'Linux · Git',
    ],
  },
  {
    title: 'How I Work',
    items: [
      'First-principles model before the controller',
      'Every model validated against measured data',
      'New tools picked up per project, AI-assisted',
      'Hands on the hardware, not just the simulation',
    ],
  },
];

// ---------------------------------------------------------------------------
// Site-wide info
// ---------------------------------------------------------------------------

export const siteInfo = {
  name: 'Šimon Hudínek',
  title: 'Process Control Engineer',
  heroSubtitle:
    'Model it. Control it. Wire it. Make it run. Process control engineering, from physical wiring to software UI.',
  availability: 'Available immediately',
  location: 'Prague, open to EU relocation and travel',
  /** Role titles worth an email; shown under the hero subtitle. */
  openTo: ['APC Engineer', 'Automation Specialist', 'Commissioning Engineer'],
  /** Printable project portfolio PDF served from /public. */
  cvPdf: '/Project_Portfolio2601.pdf',
  /** One-page CV served from /public. */
  cvFile: '/CV_Simon_Hudinek.pdf',
  /** Hero portrait shown next to the name. */
  portrait: '/images/hero-portrait.jpg',
  bio:
    'Ing. in Sensorics and Cybernetics in Chemistry. Control and field engineering is where I want to be: deriving the model, writing the MPC, then wiring the sensors and climbing the rig to make it run.',
  contact: {
    email: 'hudineks@icloud.com',
    linkedin: 'https://www.linkedin.com/in/hudineks/',
    github: 'https://github.com/Hudineks',
  },
};

/** Navbar anchor links; ids must match section ids in index.astro. */
export const navLinks = [
  { href: '#projects', label: 'Projects' },
  { href: '#field', label: 'Field Log' },
  { href: '#stack', label: 'Stack' },
  { href: '#about', label: 'Contact' },
];
