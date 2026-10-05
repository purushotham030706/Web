export const PERSONAL_INFO = {
  name: "purushotham",
  fullName: "Purushotham M",
  tagline: "comp sci student | aspiring game developer",
  subTagline: "crafting tactile gameplay mechanics, interactive systems & modern web experiences.",
  location: "Mysuru, India",
  university: "JSS Science and Technology University (JSSSTU)",
  email: "purushothambm2006@gmail.com",
  github: "https://github.com/purushotham030706",
  linkedin: "https://www.linkedin.com/in/purushotham-m-61b35937a",
  instagram: "https://www.instagram.com/purushotham0307",
  status: "learning · building / maybe playing games :p",
  interests: ["game-development", "front-end", "golf", "interactive-systems"],
  currentFocus: "learning java, Unity, exploring Unreal Engine",
  currently: [
    { label: "Main Focus", value: "Unity & C# Game Development" },
    { label: "Exploring", value: "Unreal Engine & Blueprints" },
    { label: "Core Foundations", value: "Java, C++, C, Python" },
    { label: "Web", value: "Modern Frontend & Web Systems" }
  ]
};

export const PROJECTS = [
  {
    id: "netassure",
    number: "01",
    title: "NetAssure",
    category: "Security & AI Systems",
    year: "2026",
    tagline: "Automated network configuration audit engine with local RAG learning.",
    description: "An intelligent security compliance and configuration auditor for network infrastructure. Parses device configurations, extracts canonical facts, executes deterministic compliance checks, and employs a local RAG pipeline (Ollama / Llama 3.2 / ChromaDB) to interpret unfamiliar vendor syntax.",
    details: [
      "Vendor configuration parsing (Cisco IOS/IOS-XE, FortiOS, Junos)",
      "Local RAG workflow with ChromaDB vector store and Ollama inference",
      "Deterministic audit rules with trace-to-source evidence verification",
      "Comprehensive test suite with 100+ backend test validations"
    ],
    tech: ["Python", "FastAPI", "ChromaDB", "Ollama", "React", "Tailwind CSS"],
    status: "Active System",
    role: "Core Developer",
    githubUrl: "https://github.com/purushotham030706/NetAssure",
    liveUrl: null,
    featured: true
  },
  {
    id: "bovine-rush",
    number: "02",
    title: "Bovine Rush",
    category: "Game Development",
    year: "2026",
    tagline: "2D Endless runner game with an integrated analytics pipeline.",
    description: "A fast-paced 2D endless runner developed with agile software engineering principles, featuring dynamic obstacle pacing, responsive jump mechanics, and a telemetry/analytics pipeline for player session data.",
    details: [
      "Responsive 2D character physics and obstacle collision detection",
      "Procedural difficulty progression and high-score tracking",
      "Telemetry and gameplay analytics pipeline integration",
      "Engineered with modular, agile software design patterns"
    ],
    tech: ["Game Engine", "Game Design", "Physics", "Analytics Pipeline"],
    status: "Completed",
    role: "Game & Systems Developer",
    githubUrl: "https://github.com/purushotham030706/Bovine-Rush",
    liveUrl: null,
    featured: true
  },
  {
    id: "drbharathip",
    number: "03",
    title: "Dr. Bharathi P Clinic",
    category: "Full-Stack Web Application",
    year: "2026",
    tagline: "Appointment management platform for Dr. Bharathi P clinic.",
    description: "A full-featured healthcare appointment management web application allowing patients to submit booking requests and enabling clinic staff to manage schedules, clinical availability, and confirmation notifications.",
    details: [
      "Patient booking portal with slot availability checks",
      "Clinic administrative dashboard for appointment confirmation & scheduling",
      "Full-stack architecture with authenticated administration",
      "Clean, accessible UI designed for stress-free patient booking"
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "REST API"],
    status: "In Active Development",
    role: "Full-Stack Developer",
    githubUrl: "https://github.com/purushotham030706/drbharathip",
    liveUrl: null,
    featured: true
  },
  {
    id: "cafe-tracker",
    number: "04",
    title: "Café Tracker",
    category: "Web Application",
    year: "2025",
    tagline: "A lightweight web application to log and manage cafés visited with map integration.",
    description: "A specialized personal tracker allowing users to catalog visited cafés, capture spatial and location information, document visit dates and personal impressions, and visualize saved spots with Leaflet.js map markers.",
    details: [
      "Interactive map integration using Leaflet.js and OpenStreetMap",
      "Location details logging and chronological visit history",
      "Persistent browser storage with zero external dependencies",
      "Responsive layout optimized for handheld mobile logging"
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "Leaflet.js", "Geolocation API"],
    status: "Completed",
    role: "Sole Designer & Developer",
    githubUrl: "https://github.com/purushotham030706/Cafe-Tracker",
    liveUrl: null,
    featured: true
  },
  {
    id: "run-n-gun",
    number: "05",
    title: "Run n Gun",
    category: "Game Development",
    year: "2024",
    tagline: "A 2D endless run-and-gun action game.",
    description: "A fast-paced 2D arcade shooter focused on responsive player character mobility, procedural enemy hazard dispatching, collision resolution, and high-intensity score-chasing mechanics.",
    details: [
      "Fluid 2D player locomotion and projectile trajectory physics",
      "Dynamic procedural enemy wave pacing and hazard collision handling",
      "Arcade scoring and multiplier mechanics tuned for gameplay replayability",
      "Architected using Unreal Engine's visual scripting system (Blueprints)"
    ],
    tech: ["Unreal Engine", "Blueprints", "2D Mechanics", "Game Design"],
    status: "In Active Development",
    role: "Gameplay Designer & Programmer",
    githubUrl: null, // "Coming Soon"
    liveUrl: null,
    featured: true
  }
];

export const SKILL_CATEGORIES = [
  {
    category: "Game Development",
    code: "GAME_DEV",
    description: "Interactive real-time engines and gameplay design",
    skills: [
      { name: "Unity", note: "Primary engine focus, C# scripting & component systems", level: "Main Focus" },
      { name: "C#", note: "Gameplay programming & state logic", level: "Proficient" },
      { name: "Unreal Engine", note: "Gameplay Blueprints & Mechanics", level: "Exploring" },
      { name: "Game Design", note: "Player loops, collision & arcade pacing", level: "Prototyping" }
    ]
  },
  {
    category: "Programming & Core",
    code: "CORE",
    description: "Foundation languages and systems development",
    skills: [
      { name: "Java", note: "Core syntax, OOP & data structures", level: "Active Learning" },
      { name: "C++", note: "Systems & low-level concepts", level: "Intermediate" },
      { name: "C", note: "Structured programming & memory basics", level: "Foundational" },
      { name: "Python", note: "Scripting, AI tooling & backend automation", level: "Proficient" },
      { name: "JavaScript", note: "Modern ES6+ & DOM manipulation", level: "Proficient" }
    ]
  },
  {
    category: "Web Development",
    code: "WEB",
    description: "Modern client interfaces and web engineering",
    skills: [
      { name: "HTML5 & CSS3", note: "Semantic structure & responsive layouts", level: "Strong Foundation" },
      { name: "Tailwind CSS", note: "Design system utility patterns", level: "Applied" },
      { name: "React", note: "Component architecture & state", level: "Applied" },
      { name: "Node & Express", note: "REST endpoints & server systems", level: "Familiar" }
    ]
  }
];
