// All site content lives here. Edit this file to update the portfolio.

export const profile = {
  name: "Arnav Kasturia",
  handle: "arnav@kasturia",
  role: "Senior Software Engineer",
  company: "Intuit Credit Karma",
  location: "Charlotte, NC",
  pitch:
    "I build credit-data systems (bureau integrations, cloud migrations) and the agents that help engineers run them. On weekends I make weird apps for iPhones.",
  email: "kasturiaarnav@gmail.com",
  links: {
    github: "https://github.com/arnav149",
    linkedin: "https://www.linkedin.com/in/arnav-kasturia/",
    instagram: "https://www.instagram.com/kasturiaarnav/"
  }
};

export const sections = [
  { id: "top", label: "~/whoami" },
  { id: "projects", label: "~/projects" },
  { id: "log", label: "~/git-log" },
  { id: "stack", label: "~/stack" },
  { id: "contact", label: "~/contact" }
];

export const categories = [
  { id: "work", label: "~/work" },
  { id: "personal", label: "~/personal" }
];

export const projects = [
  {
    id: "ext-pulls",
    cat: "work",
    cmd: "ext-pulls",
    name: "External Report Pulls",
    when: "SWE IV",
    kind: "Platform",
    where: "Intuit Credit Karma",
    color: "#C2410C",
    bio: "Credit Karma’s first asynchronous report pull path, so AI assistants like ChatGPT and Claude can serve fresh credit data to members who aren’t logged in.",
    highlight: "Restored offer eligibility for 25%+ of matched members on those surfaces.",
    tags: ["Scala", "GCP Pub/Sub", "Envelope encryption", "Job locks"]
  },
  {
    id: "experian",
    cat: "work",
    cmd: "experian",
    name: "Experian Integration",
    when: "SWE IV",
    kind: "Bureau integration",
    where: "Intuit Credit Karma",
    color: "#7D5503",
    bio: "Credit Karma’s first new online bureau integration in years, from design to ramp across 9+ repos, over OAuth2-over-mTLS.",
    highlight: "+28% offer impressions and +7% revenue per user for new members.",
    tags: ["Scala", "mTLS", "OAuth2", "GCP"]
  },
  {
    id: "onetru",
    cat: "work",
    cmd: "onetru",
    name: "TransUnion Cloud Migration",
    when: "Senior",
    kind: "Cloud migration",
    where: "Intuit Credit Karma",
    color: "#0369A1",
    bio: "Designed the move of TransUnion report pulls from on-prem to TransUnion’s cloud platform across 6 downstream services, then handed execution to a senior peer.",
    highlight:
      "A validation-first dual pull caught vendor data gaps, like a tradeline ID missing on every tradeline, before any member saw them.",
    tags: ["Scala", "BigQuery", "Dual pull", "Feature toggles"]
  },
  {
    id: "team-agent",
    cat: "work",
    cmd: "slack-agent",
    name: "Team Agent",
    when: "Senior",
    kind: "Agentic tooling",
    where: "Intuit Credit Karma",
    color: "#0E7490",
    bio: "A shared Claude Agent SDK agent teammates tag in Slack to run on-call investigations and data validations.",
    highlight: "Spanner-backed memory, Langfuse tracing and BigQuery evals.",
    tags: ["Claude Agent SDK", "Spanner", "Langfuse", "BigQuery"]
  },
  {
    id: "doc-drift",
    cat: "work",
    cmd: "doc-drift",
    name: "Doc Drift Bot",
    when: "Senior",
    kind: "CI agent",
    where: "Intuit Credit Karma",
    color: "#238636",
    bio: "A human-gated CI agent that opens fix PRs when docs drift from code. Shipped as a CircleCI orb.",
    highlight: "Adopted by 30+ repos in its first week.",
    tags: ["CircleCI", "Agents", "Developer experience"]
  },
  {
    id: "pdlc",
    cat: "work",
    cmd: "pdlc",
    name: "Agentic Dev Framework",
    when: "Senior",
    kind: "Agentic tooling",
    where: "Intuit",
    color: "#6D28D9",
    bio: "Extended Intuit’s cross-org agentic development framework with a planning skill and dev agents, and helped teams across Credit Karma adopt it.",
    highlight:
      "Published 8 reusable skills to the company plugin marketplace and gave the first live demo to all of Credit Karma engineering.",
    tags: ["Claude Code", "Skills", "Agents", "MCP"]
  },
  {
    id: "bnpl",
    cat: "work",
    cmd: "bnpl",
    name: "BNPL Tradelines",
    when: "SWE IV",
    kind: "Credit data",
    where: "Intuit Credit Karma",
    color: "#9F1239",
    bio: "Built experiment-gated tradeline suppression that unblocked the rollout of buy-now-pay-later accounts onto members’ credit reports.",
    highlight: "73.4M BNPL tradelines for ~21.5M members; alerts built on that data added 25K monthly active users.",
    tags: ["Scala", "Experimentation", "Credit data"]
  },
  {
    id: "w2",
    cat: "work",
    cmd: "w2",
    name: "W2 Income Contract",
    when: "SWE IV",
    kind: "API contract",
    where: "Intuit Credit Karma × TurboTax",
    color: "#4D7C0F",
    bio: "Designed the W2 income contract between Credit Karma and TurboTax, with an explicit tax-year parameter so future tax years need no new contract.",
    highlight: "Delivers W2 data to TurboTax for 5M+ filers.",
    tags: ["API design", "RPC", "Scala"]
  },
  {
    id: "mock-svc",
    cat: "work",
    cmd: "mock-svc",
    name: "Bureau Mock Service",
    when: "SWE III",
    kind: "Internal platform",
    where: "Intuit Credit Karma",
    color: "#475569",
    bio: "Consolidated 3 legacy PHP bureau mock services into one Scala service, owning design, security review and the US/UK rollout.",
    highlight: "Automated test-data publishing with CircleCI, cutting time to production by 75%.",
    tags: ["Scala", "GCS", "CircleCI"]
  },
  {
    id: "wingo",
    cat: "personal",
    cmd: "wingo",
    name: "Wingo",
    when: "Fall 2026",
    kind: "iOS app",
    where: "side project",
    color: "#1F6FEB",
    bio: "Back Tap a screenshot of a dating chat and get an AI-suggested reply, served through an App Attest-secured Cloudflare Worker.",
    highlight: "Screenshots captured with iOS Back Tap; every request verified with App Attest.",
    tags: ["Swift", "Expo", "TypeScript", "Cloudflare Workers", "Claude API"]
  },
  {
    id: "fold-war",
    cat: "personal",
    cmd: "fold-war",
    name: "Fold War",
    when: "Fall 2026",
    kind: "Game",
    where: "side project",
    color: "#8957E5",
    bio: "A local two-player ink war game built for foldable iPhones, with the game rules written in pure TypeScript.",
    highlight: "The fold is the controller: closing the phone fires a shot.",
    tags: ["Expo", "React Native", "Skia", "Reanimated", "Zustand"]
  },
  {
    id: "wealthwise",
    cat: "personal",
    cmd: "wealthwise",
    name: "WealthWise",
    when: "Spring 2026",
    kind: "Chrome extension",
    where: "internal hackathon",
    color: "#BF4B8A",
    bio: "Recommends the best card in your wallet while you shop. I owned technical design, limited-scope auth and backend integration.",
    highlight: "Won the Leadership Award at an internal hackathon.",
    tags: ["JavaScript", "GraphQL", "Chrome"]
  }
];

// Shown, in order, every time someone tries to swipe left.
export const leftSwipeMessages = [
  "Spread love, not hate.",
  "Swipe left? In this economy?",
  "This project has feelings, you know.",
  "Error 403: rejection forbidden.",
  "Left swipes are deprecated. Please upgrade to right.",
  "Have you tried turning your opinion off and on again?",
  "Bold move. Wrong, but bold.",
  "Segmentation fault (core feelings dumped).",
  "Rejection not found. Did you mean ♥?",
  "sudo swipe --left → Permission denied.",
  "That swipe got caught in the try/catch of love.",
  "Somewhere a unit test just failed. Because of you.",
  "My mom says this one is her favorite.",
  "Merge conflict: your thumb vs. good taste.",
  "Let’s pretend that never happened."
];

export const commits = [
  {
    hash: "a7f3c21",
    ref: "(HEAD -> senior)",
    head: true,
    period: "Aug 2026 — present",
    title: "Senior Software Engineer · Intuit Credit Karma",
    bullets: [
      "Shipped a Claude Agent SDK team agent in Slack and a doc-drift CI agent adopted in 30+ repos in week one.",
      "Published 8 reusable skills to the company plugin marketplace and gave the agentic framework’s first live demo to all of Credit Karma engineering.",
      "Architected the TransUnion on-prem-to-cloud migration across 6 downstream services."
    ]
  },
  {
    hash: "5e19b04",
    ref: "(tag: swe-iv)",
    period: "Sep 2024 — Jul 2026",
    title: "Software Engineer IV",
    bullets: [
      "Led the Experian integration across 9+ repos: +28% offer impressions, +7% revenue per user.",
      "Built the first async report pull path so ChatGPT and Claude can serve fresh credit data.",
      "Unblocked 73.4M+ BNPL tradelines for ~21.5M members; defined the W2 contract for 5M+ TurboTax filers."
    ]
  },
  {
    hash: "c04d8e2",
    ref: "(tag: swe-iii)",
    period: "Dec 2022 — Aug 2024",
    title: "Software Engineer III",
    bullets: [
      "Drove the dual-pull migration to a new TransUnion report format.",
      "Merged 3 legacy PHP mock services into one Scala service; cut time to production by 75%."
    ]
  },
  {
    hash: "91aa6f7",
    ref: "(tag: swe-ii)",
    period: "Jan 2022 — Nov 2022",
    title: "Software Engineer II",
    bullets: ["Remediated enrollment compliance issues across all three bureau gateways."]
  },
  {
    hash: "0000001",
    ref: "(root commit)",
    root: true,
    period: "May 2021 — Aug 2021",
    title: "Software Engineering Intern",
    bullets: ["Two Scala ingestion components and a MySQL client at 2,500+ ops/sec."]
  }
];

export const skills = {
  languages: ["Scala", "Python", "Java", "TypeScript", "Swift", "C/C++", "SQL"],
  backend: ["GCP Pub/Sub", "Dataflow", "BigQuery", "Spanner", "Kafka", "Kubernetes", "CircleCI"],
  ai: ["Claude Agent SDK", "MCP", "Langfuse", "Claude Code", "Cursor"],
  mobile: ["React Native", "Expo", "SwiftUI", "React", "Cloudflare Workers"],
  education: "B.S.E. Computer Systems Eng., Arizona State, 4.0 GPA, Moeur Award"
};
