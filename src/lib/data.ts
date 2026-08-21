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
    "I finished my M.S. in Computer Science at Indiana University Bloomington in May 2026. Most of my time goes into AI agents: the kind that don’t just answer a question but work through one, calling a few tools, checking real data, deciding what to do next, and keeping a record of why. I like building both halves of that, the reasoning underneath and the actual product on top, so it’s something a person can open and use, not a script that only makes sense in a notebook.",
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
      "I map out where work actually gets stuck across 5 business processes: the bottlenecks, what depends on what, and which integrations are worth the trade-off. That turns into a technical roadmap for automation and data integration instead of a wishlist.",
      "Before anyone commits engineering time, I prototype the automation and reporting in Python and SQL to see whether the idea holds up. It has saved a lot of rework and scope churn that would have surfaced much later otherwise.",
      "I run requirements gathering and solution design across teams and set the documentation standards, so delivery priorities line up with what the business actually needs and the system is still maintainable a year out.",
    ],
  },
  {
    org: "Indiana University Dining",
    role: "Inventory Data Analyst",
    location: "Bloomington, IN",
    period: "Aug 2025 – May 2026",
    points: [
      "I noticed dining halls were over-ordering because nobody had a clear read on demand, so I built automated inventory and demand-trend pipelines across 5+ locations that turned raw operational data into near-real-time insight. Restocking stopped being a guessing game, and overstock dropped with it.",
      "I found every team was tracking things a little differently, so the numbers never quite lined up. I rebuilt the underlying ETL pipeline and put real documentation, data validation, and logging standards in place across 3+ workflows, so a report meant the same thing no matter who pulled it.",
      "The people reading these reports weren't technical, so I designed the SQL behind them for clarity and reliability over analytical cleverness. Nobody needed training to use them, which is the only reason they got used.",
      "Scheduled reporting surfaced demand patterns that kept recurring, and those started driving purchasing and replenishment decisions. It replaced a stream of one-off spreadsheet requests with a cycle people could count on.",
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
      "I owned 20+ modules of a CRM platform that a real client team used every day: everything from the database schema up to the REST APIs that ran their lead and sales workflows. Each endpoint went out end to end, from the data model and API contract through unit tests and deployment.",
      "I automated a lot of what used to be manual inside that CRM, things like rule-based processing, multi-step approvals, notifications, and validation, so the same steps ran the same way across the whole sales lifecycle instead of being coordinated by hand between stages.",
      "I built role-based, stage-aware access control that held consistently across the frontend and backend, not just in one place, so someone's permissions matched where they actually sat in the pipeline.",
      "Shipped on an Agile team through sprint planning, peer review, and Git, including fixing production bugs that client users reported mid-sprint.",
    ],
  },
  {
    org: "AICTE-EduSkills",
    role: "Robotic Process Automation Intern",
    location: "Hyderabad, India",
    period: "Jan 2022 – May 2022",
    points: [
      "I replaced manual copying from invoices and web forms with Python pipelines that pulled and validated the data automatically. That cut processing time by about 25%.",
      "I built four automation tools that were actually meant to be reused, not one-off scripts, which meant thinking about the architecture (mostly OOP patterns) instead of hacking something together.",
      "I wired in REST-based email notification and report generation so outcomes, validation results, and exception cases reached stakeholders on their own, without anyone chasing them down.",
      "Before anything went live, I worked through the workflow logic and edge cases with the people who actually owned those processes, so the exception paths matched reality rather than my assumptions.",
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
      "You hand it a source (a web page, a PDF, your own notes) and NoteKit turns it into a proper study module with a quiz, where every fact links back to exactly where it came from. So you’re never studying something the AI quietly made up. Under the hood it’s a RAG pipeline: it searches with both semantic similarity and plain keyword matching, blends the two rankings together, then runs a reranker over the top results before anything makes it into the final answer. Ingestion, chunking, embedding, and retrieval are each their own testable service, which is what made it possible to actually measure whether a change to retrieval helped or hurt.",
    tags: ["Python", "FastAPI", "PostgreSQL", "pgvector", "Next.js"],
    metrics: [
      { value: "95.3%", label: "of claims checked out against the source" },
      { value: "16/16", label: "times it said \"I don’t know\" instead of guessing" },
      { value: "65%", label: "faster first draft (52s → 18s)" },
      { value: "48%", label: "cheaper per course generated" },
    ],
    href: "https://github.com/sssahoo-lang/notekit",
  },
  {
    slug: "ratepilot",
    name: "RatePilot",
    period: "May 2026",
    tagline: "An AI that haggles your bills down so you don’t have to",
    narrative:
      "RatePilot is the call you keep putting off, the one where you haggle down whatever bill has quietly crept up: internet, phone, insurance, streaming, doesn’t matter which. Except an agent makes it for you. It looks up what competitors are actually charging right now, works out an angle, and emails the provider. When they reply, it reads the response on its own and decides whether to accept, push back, or hand it off to a human, keeping a full log of why it made each call so nothing happens silently. You upload a bill, it parses the PDF and pulls the structure out, and everything after that shows up on a dashboard that tracks what each negotiation saved you and what that adds up to per month.",
    tags: ["Python", "LLM APIs", "Tool Use", "Gmail API", "FastAPI + React/Vite"],
    metrics: [
      { value: "0", label: "times I had to step in once it started" },
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
      "This one watches a road through a camera wired into a Raspberry Pi, spots vehicles as they pass, and works out how fast they’re going, all running locally on that one small board with nothing sent to a server. It uses YOLOv8 to detect vehicles and tracks each one across frames to estimate speed, then logs anything going over the limit and fires off an alert.",
    tags: ["Python", "YOLOv8", "Raspberry Pi", "OpenCV"],
    metrics: [
      { value: "40%", label: "faster inference after optimizing the pipeline" },
      { value: "<1s", label: "to detect and log a vehicle" },
      { value: "0", label: "Zero bytes sent to the cloud" },
    ],
    href: "https://github.com/sssahoo-lang/edge-traffic-vision",
  },
  {
    slug: "graph-benchmark",
    name: "Distributed Graph Processing Engine",
    period: "Apr 2026",
    tagline: "When is a cluster worth it? I measured the exact line.",
    narrative:
      "If you throw more machines at a graph problem, does it actually get faster? I built a distributed engine on a 5-node NSF Jetstream2 cluster and ran PageRank and shortest-path (the algorithm behind GPS routing) across 5-million-edge Stanford SNAP graphs, automating 300+ runs over every combination of worker count and partitioning strategy. The answer turned out to be “it depends,” but precisely: on the large graphs the cluster won by 3.3×, while on datasets that fit in a single machine’s RAM Spark’s coordination overhead made it 25 to 400 times slower. Profiling the task scheduler showed the cost wasn’t garbage collection or shuffle waits (both under 3%), it was the orchestration itself. Tuning Spark’s data-locality settings cut deployment wall-time another 31.7%, and the real deliverable was a data-driven threshold for when going distributed is worth it at all.",
    tags: ["Apache Spark", "GraphX", "Scala", "Python", "Docker", "NSF Jetstream2"],
    metrics: [
      { value: "300+", label: "benchmark runs automated across the sweep" },
      { value: "3.3×", label: "speedup on large-graph workloads" },
      { value: "25–400×", label: "Spark overhead on datasets that fit in RAM" },
      { value: "31.7%", label: "less wall-time after tuning data locality" },
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
      "Delta is an experiment in getting an AI to improve its own instructions without just taking its word for it. One agent writes SQL from a plain-English question; a second agent watches where it fails, figures out why, and rewrites its instructions to do better. The new instructions only get kept if they actually prove better on a held-out test, checked with real statistics, not a gut feeling. Named for what it measures: the delta, with a confidence interval attached. It’s still a work in progress. The measuring and testing side is done, and I’m now running the full loop against established methods like DSPy’s MIPROv2 and GEPA to see if it holds up.",
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
