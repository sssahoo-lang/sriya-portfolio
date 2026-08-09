export const profile = {
  name: "Sriya Smita Sahoo",
  role: "AI Agent Engineer & Full-Stack Developer",
  location: "Chicago, IL",
  email: "sriyasahu2003@gmail.com",
  linkedin: "https://www.linkedin.com/in/sriya-smita-sahoo",
  github: "https://github.com/sssahoo-lang",
  resumeHref: "/Sriya_Smita_Sahoo_Resume.pdf",
  tagline:
    "I build AI that does the task, not just talks about it. And the apps around it, so someone can actually use it.",
  blurb:
    "I'm finishing my MS in Computer Science at Indiana University Bloomington this May. Most of my time goes into AI agents, the kind that don't just answer a question but work through one: call a few tools, check real data, decide what to do next, and keep a record of why. I like building both halves of that. The reasoning underneath, and the actual product on top, so it's something a person can open and use, not a script that only makes sense in a notebook.",
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
      "I help figure out what to build and how, mostly on data and automation projects, and stay close enough to the delivery to make sure what ships still works once it's actually in production.",
    ],
  },
  {
    org: "Indiana University Dining",
    role: "Inventory Data Analyst",
    location: "Bloomington, IN",
    period: "Aug 2025 – May 2026",
    points: [
      "Dining halls were over-ordering because nobody had a clear read on demand, so I built automated reporting that tracked real usage trends across 5+ locations. Restocking stopped being a guessing game, and overstock dropped with it.",
      "Every team was tracking things a little differently, so the numbers never quite lined up. I rebuilt the underlying data pipeline and put real documentation and logging standards in place across 3+ workflows, so a report meant the same thing no matter who pulled it.",
    ],
  },
  {
    org: "Next Page Technologies",
    role: "Software Engineer",
    location: "Hyderabad, India",
    period: "Jul 2023 – Jul 2024",
    points: [
      "I owned a good chunk of a CRM platform that a real client team used every day: everything from the database schema up to the REST APIs that ran their lead and sales workflows.",
      "A lot of what happened inside that CRM (approvals, notifications, who could see or edit what at each stage) used to be manual, or handled a little differently depending on who touched it. I automated those workflows and built role-based access control that actually held consistently across the frontend and backend, not just in one place.",
    ],
  },
  {
    org: "AICTE Edu Skills",
    role: "Robotic Process Automation Intern",
    location: "Hyderabad, India",
    period: "Jan 2022 – May 2022",
    points: [
      "People were copying data out of invoices and web forms by hand, so I built Python pipelines that pulled and validated it automatically instead, with notifications and reports layered on top. That cut processing time by about 25%.",
      "Built four automation tools that were actually meant to be reused, not one-off scripts, which meant thinking about the architecture (mostly OOP patterns) instead of hacking something together, and working with other teams on those calls.",
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
      "You hand it a source (a web page, a PDF, your own notes) and NoteKit turns it into a proper study module with a quiz, where every fact links back to exactly where it came from. So you're never studying something the AI quietly made up. Under the hood it's a RAG pipeline: it searches with both semantic similarity and plain keyword matching, blends the two rankings together, then runs a reranker over the top results before anything makes it into the final answer.",
    tags: ["Python", "FastAPI", "PostgreSQL / pgvector", "LangGraph", "Next.js"],
    metrics: [
      { value: "95.3%", label: "of claims checked out against the source" },
      { value: "16/16", label: "times it said \"I don't know\" instead of guessing" },
      { value: "65%", label: "faster first draft (52s → 18s)" },
      { value: "48%", label: "cheaper per course generated" },
    ],
    href: "https://github.com/sssahoo-lang/notekit",
  },
  {
    slug: "ratepilot",
    name: "RatePilot",
    period: "May 2026",
    tagline: "An AI that argues with your internet provider so you don't have to",
    narrative:
      "RatePilot is the phone call you keep putting off (haggling your internet or phone bill down), except an agent makes it for you. It looks up what competitors are actually charging right now, works out an angle, and emails the provider. When they reply, it reads the response on its own and decides whether to accept, push back, or hand it off to a human, keeping a full log of why it made each call so nothing happens silently.",
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
      "This one watches a road through a camera wired into a Raspberry Pi, spots vehicles as they pass, and works out how fast they're going, all running locally on that one small board with nothing sent to a server. It uses YOLOv8 to detect vehicles and tracks each one across frames to estimate speed, then logs anything going over the limit and fires off an alert.",
    tags: ["Python", "YOLOv8", "Raspberry Pi", "OpenCV"],
    metrics: [
      { value: "40%", label: "faster inference after optimizing the pipeline" },
      { value: "<1s", label: "to detect and log a vehicle" },
      { value: "0", label: "data sent to the cloud" },
    ],
    href: "https://github.com/sssahoo-lang/edge-traffic-vision",
  },
  {
    slug: "graph-benchmark",
    name: "Distributed Graph Benchmark",
    period: "Spring 2026",
    tagline: "Spark + GraphX on a 5-node cluster: does it help?",
    narrative:
      "For a grad systems course, I tried to answer a question that sounds simple but isn't: if you throw more machines at a graph problem, does it actually get faster? I ran two classic graph algorithms (the kind behind things like PageRank and GPS route-finding) across a 5-machine cluster, sweeping every combination of dataset, algorithm, and worker count for 160 runs total, then compared it all against a single machine running plain Python. The answer surprised me: at this size, one core beat the whole cluster by 25 to 400 times over, and adding more machines sometimes made things slower. The coordination overhead of running the cluster cost more than the parallel work actually saved.",
    tags: ["Apache Spark", "GraphX", "Python", "NSF Jetstream2"],
    metrics: [
      { value: "160", label: "runs across the full sweep" },
      { value: "25–400×", label: "faster on one machine than on the cluster" },
      { value: "31.7%", label: "faster from a single config tweak" },
    ],
    href: "https://github.com/sssahoo-lang/distributed-graph-benchmark",
  },
  {
    slug: "delta",
    name: "Delta",
    period: "2026",
    status: "In progress",
    tagline: "Teaching an AI to rewrite its own instructions, carefully",
    narrative:
      "Delta is an experiment in getting an AI to improve its own instructions without just taking its word for it. One agent writes SQL from a plain-English question; a second agent watches where it fails, figures out why, and rewrites its instructions to do better. The new instructions only get kept if they actually prove better on a held-out test, checked with real statistics, not a gut feeling. Named for what it measures: the delta, with a confidence interval attached. It's still a work in progress. The measuring and testing side is done, and I'm now running the full loop against established methods like DSPy's MIPROv2 and GEPA to see if it holds up.",
    tags: ["Python", "LLM APIs", "Statistical Testing", "Spider Benchmark"],
    metrics: [
      { value: "100", label: "test questions evaluated so far" },
      { value: "3", label: "methods it's being benchmarked against" },
    ],
    href: "https://github.com/sssahoo-lang/delta",
  },
];

export const skillGroups: { title: string; items: string[] }[] = [
  {
    title: "Languages",
    items: ["Python", "Java", "JavaScript", "TypeScript", "C", "C++", "SQL", "HTML/CSS"],
  },
  {
    title: "Frameworks",
    items: [
      "React.js",
      "Vite",
      "Next.js",
      "FastAPI",
      "Flask",
      "Django",
      "REST APIs",
      "Gmail API",
      "LangChain",
      "LangGraph",
    ],
  },
  {
    title: "ML & AI",
    items: [
      "Agentic AI",
      "Tool Use",
      "LLM APIs",
      "Transformers",
      "RAG",
      "Statistical Testing",
      "YOLOv8",
      "OpenCV",
      "Raspberry Pi",
      "TensorFlow",
      "PyTorch",
      "scikit-learn",
    ],
  },
  {
    title: "Cloud & DevOps",
    items: ["AWS (EC2, S3)", "Azure", "GCP", "Docker", "Kubernetes", "GitHub", "CI/CD", "Linux/Unix"],
  },
  {
    title: "Databases & Systems",
    items: [
      "PostgreSQL",
      "MySQL",
      "SQLite",
      "Apache Spark",
      "GraphX",
      "Microservices",
      "System Design",
      "OOP",
      "DSA",
    ],
  },
];

export const education = [
  {
    school: "Indiana University Bloomington",
    degree: "M.S. in Computer Science",
    detail: "GPA 3.67 / 4.0",
    period: "Aug 2024 – May 2026",
  },
  {
    school: "KL University",
    degree: "B.Tech in Computer Science Engineering",
    detail: "GPA 8.97 / 10",
    period: "Aug 2020 – May 2024",
  },
];

export const certifications = [
  "AWS Solutions Architect – Associate",
  "AWS Cloud Practitioner (CLF-C02)",
  "Microsoft Azure Fundamentals (AZ-900)",
  "Red Hat Certified Enterprise Application Developer",
  "Google Cloud Associate Cloud Engineer",
];

export const publication = {
  title:
    "Survey of Non-English Language Compilers: Exploring the Diversity of Programming Languages",
  venue: "2023 9th ICACCS, Coimbatore, India, pp. 1187–1193",
};
