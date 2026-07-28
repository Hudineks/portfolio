/**
 * Central content schema for the portfolio.
 * Edit this file to change project records, gallery photo log, tech stack,
 * and contact info — components only render what is defined here.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** STAR-structured engineering project shown in ProjectsSection. */
export interface Project {
  /** Drawing-style index code shown on the record (P-01 …). */
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
      'From designing the test scenarios and instrumenting sensors to a validated humidity model and operator app.',
    star: {
      situation:
        'Constant Volume Sampling (CVS) emission measurements at Škoda Auto are sensitive to humidity, affecting result validity.',
      task:
        'Quantify how humidity propagates through the CVS system and give test-cell operators a tool that flags problematic conditions.',
      action:
        'Designed the measurement scenarios, instrumented the test cell with humidity/temperature sensors, collected and analyzed the campaign data, then built the thermodynamic model in Python and wrapped it in an operator-facing GUI.',
      result:
        'Operators pre-check measurement conditions against the validated model, reducing invalid emission test runs and rework.',
    },
    tags: ['Test Design', 'Sensor Integration', 'Data Acquisition', 'Python', 'Thermodynamics', 'Operator GUI'],
    demoSummary:
      'CVS emission measurements at Škoda Auto are humidity-sensitive, so I designed the measurement campaign, instrumented the test cell, and built a validated Python thermodynamic model with an operator GUI for pre-checking run conditions. Operators now flag condensation-prone runs before they happen, cutting invalid tests and rework. The panel here is that pre-check tool rebuilt in the browser: set ambient conditions, dilution factor, and fuel, and a Magnus-formula psychrometric model computes the dilute-mixture dewpoint against the tunnel wall temperature.',
  },
  {
    id: 'P-02',
    title: 'Model-Based SCR Dosing & AdBlue Injector Control',
    role: "Master's Thesis — Control Engineer",
    tagline:
      'Advanced MPC for urea dosing on diesel generators — pure control design, validated entirely in simulation.',
    star: {
      situation:
        'Diesel generator aftertreatment requires precise AdBlue injection: too little NOx escapes, too much causes ammonia slip.',
      task:
        'Develop a model-based dosing strategy for the SCR catalyst and its injector, validated against a detailed reactor simulator — no hardware safety net.',
      action:
        'Coupled a 1D SCR catalyst model with an MPC formulation for injector control, tuned against the XMR monolith reactor simulation engine.',
      result:
        'A dosing controller that holds NOx conversion targets while keeping NH3 slip within limits across transient load profiles.',
    },
    tags: ['MPC', 'SCR / NH3 Slip', '1D Reactor Modeling', 'MATLAB/Simulink', 'Python'],
    demoSummary:
      "Diesel-generator aftertreatment needs precise AdBlue dosing: too little and NOx escapes, too much and ammonia slips through. For my master's thesis I coupled a 1D SCR catalyst model with an NMPC dosing strategy and validated it against the XMR monolith reactor simulator — no hardware safety net. The controller holds NOx conversion across a full stationary-point load cycle while keeping NH3 slip under 1 ppm, where the baseline PID peaks at 262 ppm. The panel here replays that benchmark — outlet NOx and NH3 slip for both controllers, scrubbable and playable over the 420-minute cycle.",
  },
  {
    id: 'P-03',
    title: 'Multi-Platform Water Control System',
    role: 'CTO / Lead Control Engineer',
    tagline:
      'Nonlinear MPC for a real hydraulic plant — from sensor wiring to operator GUI.',
    star: {
      situation:
        'A physical multi-tank water plant needed a modern control system spanning lab hardware and a usable operator interface.',
      task:
        'Design and lead the full control stack: plant modeling, nonlinear MPC, data acquisition, and a cross-platform GUI.',
      action:
        'Built a nonlinear MPC on a first-principles 1D model, integrated NI-DAQmx acquisition, and delivered a PySide6 operator application with live trending.',
      result:
        'Stable closed-loop control on the real rig with constraint handling, plus a maintainable multi-platform codebase used by the team.',
    },
    tags: ['Nonlinear MPC', 'CasADi', 'NI-DAQmx', 'PySide6', 'Python', '1D Modeling'],
    demoSummary:
      'A physical multi-tank water plant needed a modern control system, so I built the full stack: a first-principles plant model, a nonlinear MPC with EKF state estimation, NI-DAQmx data acquisition, and a PySide6 operator application. The result is stable closed-loop control on the real rig with constraint handling. The panel here is that operator app — replaying a precomputed closed-loop run at 6× real time.',
  },
  {
    id: 'P-04',
    title: 'Embedded & Smart Systems',
    role: 'Personal Projects — Embedded Developer',
    tagline:
      'Circadian lighting cabinet with local server control, and an ESP32 smart bottle.',
    star: {
      situation:
        'Everyday problems worth engineering: healthy lighting rhythms and hydration tracking.',
      task:
        'Design small, self-contained embedded systems that run reliably without cloud dependencies.',
      action:
        'Built an ESP32-based circadian lighting cabinet controlled by a local server, and a sensor-equipped ESP32 smart bottle.',
      result:
        'Daily-driver devices demonstrating full-stack embedded skills: firmware, electronics, enclosure, and local networking.',
    },
    tags: ['ESP32', 'C/C++', 'IoT', 'Electronics', 'Local Server'],
    demoHref: undefined,
  },
];

// ---------------------------------------------------------------------------
// Photo strip (7 frames, real photos in /public/images/gallery)
// ---------------------------------------------------------------------------

export const galleryItems: GalleryItem[] = [
  {
    id: 'water-rig',
    label: 'Water plant rig',
    story:
      'Commissioning the multi-tank water plant: helmet and hi-vis on, MPC running live on the laptop next to the rig.',
    image: '/images/gallery/water-rig.jpg',
  },
  {
    id: 'process-rig',
    label: 'Process instrumentation',
    story:
      'Working on an industrial process-control training rig — transmitters, control valves, and a wall of patch cables.',
    image: '/images/gallery/process-rig.jpg',
  },
  {
    id: 'workbench',
    label: 'Electronics bench',
    story:
      'Home electronics bench: multimeter, breadboard, LED strip drivers and a power supply — where the embedded projects get built.',
    image: '/images/gallery/workbench.jpg',
  },
  {
    id: 'cabinet',
    label: 'Circadian cabinet',
    story:
      'The circadian lighting cabinet in daily use — warm ESP32-driven light following the time of day, controlled by a local server.',
    image: '/images/gallery/cabinet.jpg',
  },
  {
    id: 'climbing',
    label: 'Lead climbing',
    story:
      'Lead climbing on granite — rope work, gear checks, and calm under exposure translate directly to high-risk field work.',
    image: '/images/gallery/climbing.jpg',
  },
  {
    id: 'canyon',
    label: 'Expedition',
    story:
      'Trekking through a Moroccan gorge — comfortable being far from the lab, with everything needed carried on my back.',
    image: '/images/gallery/canyon.jpg',
  },
  {
    id: 'defense',
    label: 'Thesis defense',
    story:
      'Presenting the SCR dosing thesis to a full lecture hall — engineering work only counts when you can defend it.',
    image: '/images/gallery/defense.jpg',
  },
];

// ---------------------------------------------------------------------------
// Tech stack
// ---------------------------------------------------------------------------

export const techStack: TechCategory[] = [
  {
    title: 'Modeling & Simulation',
    items: ['MATLAB / Simulink', '1D–3D Coupling', 'CasADi', 'do-mpc'],
  },
  {
    title: 'Control & Systems',
    items: ['MPC', 'PID', 'State-Space', 'NI-DAQmx', 'PLC', 'LabVIEW'],
  },
  {
    title: 'Development & Field',
    items: ['Python', 'PySide6', 'Linux', 'C/C++', 'ESP32', 'AI-assisted workflows'],
  },
];

// ---------------------------------------------------------------------------
// Site-wide info
// ---------------------------------------------------------------------------

export const siteInfo = {
  name: 'Šimon Hudínek',
  title: 'Control & Field Systems Engineer',
  heroSubtitle:
    'Bridging 1D System Modeling, Nonlinear MPC, and Hands-On Hardware Integration in High-Risk & Industrial Environments.',
  availability: 'Open for Field & Control Roles',
  location: 'Czech Republic',
  /** Printable PDF served from /public. */
  cvPdf: '/Project_Portfolio2601.pdf',
  bio:
    'Ing. in Sensorics and Cybernetics in Chemistry. I work at the intersection of mathematical control design and physical reality: deriving the model, writing the MPC, then wiring the sensors and climbing the rig to make it run. Equally at home in Simulink and on a ladder.',
  contact: {
    email: 'simonhudinek@gmail.com',
    linkedin: 'https://www.linkedin.com/in/simon-hudinek', // TODO: confirm handle
    github: 'https://github.com/Hudineks',
  },
};

/** Navbar anchor links — ids must match section ids in index.astro. */
export const navLinks = [
  { href: '#projects', label: 'Projects' },
  { href: '#demo', label: 'Demo' },
  { href: '#field', label: 'Field Log' },
  { href: '#stack', label: 'Stack' },
  { href: '#about', label: 'Contact' },
];
