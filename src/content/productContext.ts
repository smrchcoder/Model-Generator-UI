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
    shortLabel: "Orient",
    summary: "A fast, high-signal synopsis of what the system is and why it matters.",
    emphasis: "Narrative clarity",
  },
  {
    id: "key_concepts",
    title: "Key Concepts",
    shortLabel: "Vocabulary",
    summary: "The ideas, primitives, and terms a reader needs before the details click.",
    emphasis: "Concept mapping",
  },
  {
    id: "problem_statement",
    title: "Problem Statement",
    shortLabel: "Tension",
    summary: "The underlying challenge, constraints, and stakes driving the design.",
    emphasis: "Problem framing",
  },
  {
    id: "architecture",
    title: "Architecture",
    shortLabel: "Structure",
    summary: "How services, boundaries, and responsibilities fit together.",
    emphasis: "Diagram-first understanding",
  },
  {
    id: "flow",
    title: "Flow",
    shortLabel: "Sequence",
    summary: "How the system moves from input to outcome, step by step.",
    emphasis: "End-to-end movement",
  },
  {
    id: "tradeoffs",
    title: "Tradeoffs",
    shortLabel: "Decisions",
    summary: "What the design optimized for, what it gave up, and why.",
    emphasis: "Decision quality",
  },
];

export const experiencePillars = [
  {
    title: "Structured, not chatty",
    description:
      "The interface should read like a carefully assembled technical brief, not a conversational AI transcript.",
  },
  {
    title: "Visual where systems need it",
    description:
      "Architecture and flow should feel inspectable and spatial, so complex articles become easier to reason about.",
  },
  {
    title: "Calm under density",
    description:
      "The product should carry heavy technical information without becoming visually noisy or hard to scan.",
  },
];

export const productContext = {
  productName: "Mental Model Generator",
  productLabel: "Technical reading, made structured",
  heroEyebrow: "Paste an article or technical write-up.",
  heroTitle: "Build a mental model before the details blur together.",
  heroDescription:
    "Turn dense engineering writing into six connected views that make the system, architecture, flow, and tradeoffs easier to understand.",
  inputNote:
    "Best for engineering blogs, architecture deep-dives, and technical explainers where system behavior matters.",
  promise:
    "This is not a generic summary. It is a reading interface for understanding how a system works.",
} as const;
