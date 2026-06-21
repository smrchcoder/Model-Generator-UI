export type OutputSection = {
  id:
    | "overview"
    | "key_concepts"
    | "problem_statement"
    | "architecture"
    | "flow"
    | "tradeoffs";
  title: string;
  shortLabel: string;
  summary: string;
  emphasis: string;
};

export const outputSections: OutputSection[] = [
  {
    id: "overview",
    title: "Overview",
    shortLabel: "Orientation",
    summary: "A fast, high-signal synopsis of what the system is and why it matters.",
    emphasis: "System summary",
  },
  {
    id: "key_concepts",
    title: "Key Concepts",
    shortLabel: "Vocabulary",
    summary: "The ideas, primitives, and terms a reader needs before the details click.",
    emphasis: "Core terms",
  },
  {
    id: "problem_statement",
    title: "Problem Statement",
    shortLabel: "Constraints",
    summary: "The underlying challenge, constraints, and stakes driving the design.",
    emphasis: "Problem framing",
  },
  {
    id: "architecture",
    title: "Architecture",
    shortLabel: "Structure",
    summary: "How services, boundaries, and responsibilities fit together.",
    emphasis: "Components and boundaries",
  },
  {
    id: "flow",
    title: "Flow",
    shortLabel: "Sequence",
    summary: "How the system moves from input to outcome, step by step.",
    emphasis: "End-to-end sequence",
  },
  {
    id: "tradeoffs",
    title: "Tradeoffs",
    shortLabel: "Tradeoffs",
    summary: "What the design optimized for, what it gave up, and why.",
    emphasis: "Decisions and consequences",
  },
];

export const experiencePillars = [
  {
    title: "Structured, not chatty",
    description:
      "Each result should read like an organized technical brief, not a chat transcript.",
  },
  {
    title: "Visual where systems need it",
    description:
      "Architecture and flow should feel inspectable, so complex systems become easier to reason about.",
  },
  {
    title: "Calm under complexity",
    description:
      "Dense material should stay readable, trustworthy, and easy to scan.",
  },
];

export const productContext = {
  productName: "Mental Model Generator",
  productLabel: "Technical reading, structured for understanding",
  heroEyebrow: "For technical articles, system deep-dives, and engineering write-ups.",
  heroTitle: "Build a six-part mental model before the details blur together.",
  heroDescription:
    "Turn dense engineering writing into a six-part mental model that makes the system, architecture, flow, and tradeoffs easier to understand.",
  inputNote:
    "Best for engineering blogs, architecture deep-dives, and technical explainers where system behavior matters.",
  promise:
    "This is not a generic summary. It is a structured reading tool for understanding how a system works.",
} as const;
