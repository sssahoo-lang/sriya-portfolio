export const profile = {
  name: "Sriya Smita Sahoo",
  role: "AI Agent Engineer & Full-Stack Developer",
  location: "Chicago, IL",
  email: "sriyasahu2003@gmail.com",
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
      "I scope and design data and automation projects, then stay embedded through delivery so what ships holds up in production.",
      "TODO: add a specific system I built or shipped here, ideally with a real number attached.",
    ],
  },
  {
    org: "Indiana University Dining",
    role: "Inventory Data Analyst",
    location: "Bloomington, IN",
    period: "Aug 2025 – May 2026",
    points: [
      "I noticed dining halls were over-ordering because nobody had a clear read on demand, so I built automated reporting that tracked real usage trends across 5 locations. Restocking stopped being a guessing game, and overstock dropped with it.",
      "I found every team was tracking things a little differently, so the numbers never quite lined up. I rebuilt the underlying data pipeline and put real documentation and logging standards in place across 3 workflows, so a report meant the same thing no matter who pulled it.",
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
      "I owned a good chunk of a CRM platform that a real client team used every day: everything from the database schema up to the REST APIs that ran their lead and sales workflows.",
      "I automated a lot of what used to be manual inside that CRM, things like approvals, notifications, and who could see or edit what at each stage, and built role-based access control that held consistently across the frontend and backend, not just in one place.",
    ],
  },
  {
    org: "AICTE-EduSkills",
    role: "Robotic Process Automation Intern",
    location: "Hyderabad, India",
    period: "Jan 2022 – May 2022",
    points: [
      "I replaced manual copying from invoices and web forms with Python pipelines that pulled and validated the data automatically, with notifications and reports layered on top. That cut processing time by about 25%.",
      "I built four automation tools that were actually meant to be reused, not one-off scripts, which meant thinking about the architecture (mostly OOP patterns) instead of hacking something together, and working with other teams on those calls.",
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
      "You hand it a source (a web page, a PDF, your own notes) and NoteKit turns it into a proper study module with a quiz, where every fact links back to exactly where it came from. So you’re never studying something the AI quietly made up. Under the hood it’s a RAG pipeline: it searches with both semantic similarity and plain keyword matching, blends the two rankings together, then runs a reranker over the top results before anything makes it into the final answer.",
    tags: ["Python", "FastAPI", "PostgreSQL / pgvector", "LangGraph", "Next.js"],
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
      "RatePilot is the call you keep putting off, the one where you haggle down whatever bill has quietly crept up: internet, phone, insurance, streaming, doesn’t matter which. Except an agent makes it for you. It looks up what competitors are actually charging right now, works out an angle, and emails the provider. When they reply, it reads the response on its own and decides whether to accept, push back, or hand it off to a human, keeping a full log of why it made each call so nothing happens silently.",
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
    // FLAGGED, not changed: period says "Spring 2026" rather than a specific
    // month because no source (README, resume, repo) gives one. The README
    // only names the academic term. Needs a real month from Sriya.
    name: "Distributed Graph Benchmark",
    period: "Spring 2026",
    tagline: "Spark + GraphX on a 5-node cluster: does it help?",
    narrative:
      // FLAGGED, not changed: says "160 runs total," matching the live GitHub
      // README's own math (2 algorithms × 2 datasets × 2 partitioners × 4 worker
      // counts × 5 trials = 160). No source found supporting "300+." See summary.
      "For a grad systems course, I tried to answer a question that sounds simple but isn’t: if you throw more machines at a graph problem, does it actually get faster? I ran two classic graph algorithms (the kind behind things like PageRank and GPS route-finding) across a 5-machine cluster, sweeping every combination of dataset, algorithm, and worker count for 160 runs total, then compared it all against a single machine running plain Python. The answer surprised me: at this size, one core beat the whole cluster by 25 to 400 times over, and adding more machines sometimes made things slower. The coordination overhead of running the cluster cost more than the parallel work actually saved.",
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
      "TensorFlow",
      "PyTorch",
      "scikit-learn",
    ],
  },
  {
    title: "Cloud & DevOps",
    items: [
      "AWS (EC2, S3, Lambda, IAM)",
      "Azure",
      "GCP",
      "Docker",
      "Kubernetes",
      "Git / GitHub",
      "CI/CD",
      "Linux/Unix",
    ],
  },
  {
    title: "Systems & Hardware",
    items: [
      "PostgreSQL",
      "MySQL",
      "SQLite",
      "Apache Spark",
      "GraphX",
      "Raspberry Pi",
      "Microservices",
      "System Design",
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
  "AWS Certified Solutions Architect – Associate",
  "AWS Certified Cloud Practitioner (CLF-C02)",
  "Microsoft Azure Fundamentals (AZ-900)",
  "Red Hat Certified Enterprise Application Developer",
  "Google Cloud Certified – Associate Cloud Engineer",
];

export const publication = {
  title:
    "Survey of Non-English Language Compilers: Exploring the Diversity of Programming Languages",
  venue:
    "9th International Conference on Advanced Computing and Communication Systems (ICACCS), Coimbatore, India, 2023, pp. 1187–1193",
};
