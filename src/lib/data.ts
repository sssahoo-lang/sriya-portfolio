export const profile = {
  name: "Sriya Smita Sahoo",
  role: "AI Agent Engineer & Full-Stack Developer",
  location: "Chicago, IL",
  email: "sriyasahu.2003@gmail.com",
  linkedin: "https://www.linkedin.com/in/sriya-smita-sahoo",
  github: "https://github.com/sssahoo-lang",
  resumeHref: "/Sriya_Smita_Sahoo_Resume.pdf",
  // Not currently rendered anywhere. Hero.tsx hardcodes its own headline/subhead
  // directly in JSX. Left here in case a section wants a reusable one-liner again.
  tagline:
    "I build AI that does the task, not just talks about it. And the apps around it, so someone can actually use it.",
  blurb:
    "I finished my M.S. in Computer Science at Indiana University Bloomington in May 2026. Most of my time goes into AI agents — the kind that work through a question rather than just answering it: calling tools, checking real data, deciding what’s next, and keeping a record of why. I build both halves, the reasoning and the product around it.",
};

export type Experience = {
  org: string;
  role: string;
  location: string;
  period: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    org: "Heartland Community Network",
    role: "Senior Consultant",
    location: "Indiana, US · Remote",
    period: "Jun 2026 – Present",
    points: [
      "I map where work actually gets stuck across 5 business processes, and turn that into a technical roadmap for automation rather than a wishlist.",
      "I prototype in Python and SQL before anyone commits engineering time, which has saved a lot of rework that would otherwise have surfaced much later.",
    ],
  },
  {
    org: "Indiana University Dining",
    role: "Inventory Data Analyst",
    location: "Bloomington, IN",
    period: "Aug 2025 – May 2026",
    points: [
      "Dining halls were over-ordering because nobody had a clear read on demand. I built automated inventory and demand-trend pipelines across 5+ locations, and overstock dropped.",
      "Every team tracked things differently, so the numbers never lined up. I rebuilt the ETL pipeline and set validation and logging standards across 3+ workflows.",
      "The people reading these reports weren't technical, so I designed the SQL for clarity over cleverness. Nobody needed training, which is why they actually got used.",
    ],
  },
  // TODO: Jul 2023 – Jul 2024 overlaps roughly 11 months with the B.Tech (Aug 2020
  // – May 2024, below). Confirm whether this was part-time/remote alongside
  // coursework or a placement-year arrangement, and add a qualifier to the role
  // line if so ("Software Engineer (Part-time)" or similar).
  {
    org: "Next Page Technologies",
    role: "Software Engineer",
    location: "Hyderabad, India",
    period: "Jul 2023 – Jul 2024",
    points: [
      "I owned 20+ modules of a CRM a client team used daily — database schema up through the REST APIs running their lead and sales workflows.",
      "Automated what used to be manual inside it: rule-based processing, multi-step approvals, notifications, validation — so the same steps ran the same way every time.",
      "Built role-based, stage-aware access control that held consistently across frontend and backend, not just in one place.",
    ],
  },
  {
    org: "AICTE-EduSkills",
    role: "Robotic Process Automation Intern",
    location: "Hyderabad, India",
    period: "Jan 2022 – May 2022",
    points: [
      "Replaced manual copying from invoices and web forms with Python extraction and validation pipelines. Cut processing time by about 25%.",
      "Built four reusable automation tools rather than one-off scripts, with REST notification and reporting so results reached stakeholders without anyone chasing them.",
    ],
  },
];

export type Metric = { value: string; label: string };

export type Project = {
  slug: "notekit" | "ratepilot" | "edge-vision" | "graph-benchmark" | "delta";
  name: string;
  period: string;
  status?: "In progress";
  tagline: string;
  narrative: string;
  tags: string[];
  metrics: Metric[];
  href: string;
};

export const projects: Project[] = [
  {
    slug: "notekit",
    name: "NoteKit",
    period: "Aug 2026",
    tagline: "Turns any article or PDF into a study guide you can actually trust",
    narrative:
      "Hand it a web page, a PDF, or your own notes and it returns a study module with a quiz, where every fact links back to where it came from — so you’re never studying something the model made up. Hybrid retrieval underneath: semantic and keyword search, fused, then reranked.",
    tags: ["Python", "FastAPI", "PostgreSQL", "pgvector", "Next.js"],
    metrics: [
      { value: "95.3%", label: "of claims traced to the source" },
      { value: "16/16", label: "times it refused instead of guessing" },
      { value: "65%", label: "faster first draft (52s → 18s)" },
      { value: "48%", label: "cheaper per course" },
    ],
    href: "https://github.com/sssahoo-lang/notekit",
  },
  {
    slug: "ratepilot",
    name: "RatePilot",
    period: "May 2026",
    tagline: "An AI that haggles your bills down so you don’t have to",
    narrative:
      "The bill-negotiation call you keep putting off, made by an agent instead. It looks up what competitors actually charge, works out an angle, and emails the provider. When they reply it decides on its own whether to accept, counter, or hand off to you — logging why, every time.",
    tags: ["Python", "LLM APIs", "Tool Use", "Gmail API", "FastAPI + React/Vite"],
    metrics: [
      { value: "0", label: "times I had to step in" },
      { value: "3", label: "moves it can make each round" },
      { value: "100%", label: "of decisions logged with a reason" },
    ],
    href: "https://github.com/sssahoo-lang/ratepilot-agent",
  },
  {
    slug: "edge-vision",
    name: "Real-Time Edge AI Vision",
    period: "Sep 2025",
    tagline: "A traffic camera that clocks your speed without touching the cloud",
    narrative:
      "A Raspberry Pi watches a road, spots vehicles, and works out how fast they’re going — entirely on the board, with nothing sent to a server. YOLOv8 detects, tracking across frames estimates speed, and anything over the limit gets logged and flagged.",
    tags: ["Python", "YOLOv8", "Raspberry Pi", "OpenCV"],
    metrics: [
      { value: "40%", label: "faster inference on-device" },
      { value: "<1s", label: "to detect and log a vehicle" },
      { value: "0", label: "bytes sent to the cloud" },
    ],
    href: "https://github.com/sssahoo-lang/edge-traffic-vision",
  },
  {
    slug: "graph-benchmark",
    name: "Distributed Graph Processing Engine",
    period: "Apr 2026",
    tagline: "When is a cluster worth it? I measured the exact line.",
    narrative:
      "Does throwing more machines at a graph problem actually make it faster? I ran PageRank and shortest-path across 5M-edge graphs on a 5-node cluster, 300+ runs over every worker and partitioning combination. On big graphs the cluster won by 3.3×. Once the data fit in one machine’s RAM, coordination overhead made it 25–400× slower.",
    tags: ["Apache Spark", "GraphX", "Scala", "Python", "Docker", "NSF Jetstream2"],
    metrics: [
      { value: "300+", label: "benchmark runs across the sweep" },
      { value: "3.3×", label: "speedup on large graphs" },
      { value: "25–400×", label: "overhead once data fits in RAM" },
      { value: "31.7%", label: "less wall-time from locality tuning" },
    ],
    href: "https://github.com/sssahoo-lang/distributed-graph-benchmark",
  },
  {
    slug: "delta",
    name: "Delta",
    // Dated from the repo's own creation activity (first commit Aug 3, 2026),
    // not a guess.
    period: "Aug 2026",
    status: "In progress",
    tagline: "Teaching an AI to rewrite its own instructions, carefully",
    narrative:
      "An experiment in letting an AI rewrite its own instructions without taking its word for it. One agent writes SQL from plain English; a second watches where it fails and rewrites the prompt. The rewrite only survives if it beats the old one on a held-out test, with a confidence interval attached.",
    tags: ["Python", "LLM APIs", "Statistical Testing", "Spider Benchmark"],
    metrics: [
      { value: "100", label: "test questions evaluated so far" },
      { value: "2", label: "methods it’s being benchmarked against" },
    ],
    href: "https://github.com/sssahoo-lang/delta",
  },
];

export const skillGroups: { title: string; items: string[] }[] = [
  {
    title: "Languages",
    items: [
      "Python",
      "TypeScript",
      "JavaScript",
      "Java",
      "SQL",
      "C",
      "C++",
      "Scala",
      "HTML/CSS",
      "Bash",
    ],
  },
  {
    title: "Backend",
    items: [
      "FastAPI",
      "Flask",
      "Django",
      "Node.js",
      "REST APIs",
      "Microservices",
      "Async/Concurrency",
      "WebSockets",
      "Pydantic",
      "SQLAlchemy",
    ],
  },
  {
    title: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "Vite",
      "Responsive Design",
      "Component Architecture",
      "State Management",
      "Server-Sent Events (SSE)",
    ],
  },
  {
    title: "AI & ML",
    items: [
      "LLM Applications",
      "Agentic AI",
      "Tool Use",
      "Prompt Engineering",
      "RAG",
      "Vector Embeddings",
      "Semantic Search",
      "LangChain",
      "LangGraph",
      "Transformers",
      "YOLOv8",
      "OpenCV",
      "PyTorch",
      "TensorFlow",
      "scikit-learn",
      "pandas",
      "NumPy",
    ],
  },
  {
    title: "Data & Databases",
    items: [
      "PostgreSQL",
      "pgvector",
      "MySQL",
      "SQLite",
      "Schema Design",
      "Query Optimization",
      "Indexing",
      "Full-Text Search",
      "ETL & Data Pipelines",
      "Apache Spark",
    ],
  },
  {
    title: "Cloud & DevOps",
    items: [
      "AWS (EC2, S3)",
      "Azure",
      "GCP",
      "Docker",
      "CI/CD",
      "Git / GitHub",
      "Linux/Unix",
      "Monitoring & Logging",
    ],
  },
  {
    title: "Practices",
    items: [
      "System Design",
      "Object-Oriented Design",
      "Data Structures & Algorithms",
      "API Integration",
      "Unit Testing (pytest)",
      "Code Review",
      "Agile/Scrum",
      "OAuth2 / JWT / RBAC",
      "Technical Documentation",
    ],
  },
];

export const education = [
  {
    school: "Indiana University Bloomington",
    degree: "M.S. in Computer Science",
    detail: "GPA 3.67 / 4.0",
    period: "Aug 2024 – May 2026",
    coursework:
      "Applied Algorithms · Machine Learning · Computer Vision · Data Mining · Computer Networks · Distributed Systems · Cloud Computing",
  },
  {
    school: "KL University",
    degree: "B.Tech in Computer Science Engineering",
    detail: "GPA 8.97 / 10",
    period: "Aug 2020 – May 2024",
    coursework:
      "Database Management Systems · Design & Analysis of Algorithms · Operating Systems · Object-Oriented Programming · Cybersecurity · Edge Computing",
  },
];

export const certifications = [
  "AWS Certified Solutions Architect – Associate",
  "AWS Certified Cloud Practitioner (CLF-C02)",
  "Microsoft Azure Fundamentals (AZ-900)",
  "Red Hat Certified Enterprise Application Developer",
  "Google Cloud Associate Cloud Engineer",
];

export const publication = {
  title:
    "Survey of Non-English Language Compilers: Exploring the Diversity of Programming Languages",
  venue:
    "9th International Conference on Advanced Computing and Communication Systems (ICACCS), Coimbatore, India, 2023, pp. 1187–1193",
};
