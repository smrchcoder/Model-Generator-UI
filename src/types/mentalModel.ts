export type MentalModelSectionId =
  | "overview"
  | "key_concepts"
  | "problem_statement"
  | "architecture"
  | "flow"
  | "tradeoffs";

export interface MentalModelOverview {
  one_line_summary: string;
  system_name: string;
  company: string;
  domain: string[];
  full_summary: string;
  why_it_exists: string;
  reading_time_min: number;
}

export interface MentalModelConcept {
  id: string;
  name: string;
  short_def: string;
  why_it_matters: string;
  category: "pattern" | "data_model" | "tool" | string;
  difficulty: "beginner" | "intermediate" | "advanced" | string;
  rank: number;
  architecture_node_refs: string[];
  evidence: string;
}

export interface MentalModelSignal {
  description: string;
  severity: "critical" | "major" | "minor" | string;
  scale_dimension: string;
  evidence: string;
  affected_entity_ids: string[];
}

export interface MentalModelProblemStatement {
  problem_narrative: string;
  signals: MentalModelSignal[];
  core_problem: string;
  why_it_hurt: string;
}

export interface MentalModelArchitectureNode {
  id: string;
  name: string;
  entity_type: string;
  description: string;
  layer: string;
  is_primary: boolean;
  connected_to: string[];
  architecture_role: string | null;
  importance: number;
  parent_id: string | null;
  evidence: string | null;
}

export interface MentalModelArchitectureEdge {
  id: string;
  source_id: string;
  target_id: string;
  interaction_type: string;
  label: string;
  is_bidirectional: boolean;
  evidence: string | null;
}

export interface MentalModelArchitectureLayer {
  name: string;
  order: number;
  description: string;
}

export interface MentalModelArchitecture {
  overview_narrative: string;
  nodes: MentalModelArchitectureNode[];
  edges: MentalModelArchitectureEdge[];
  layers: MentalModelArchitectureLayer[];
  key_relationships: string[];
}

export interface MentalModelFlowStep {
  id: string;
  order: number;
  actor: string;
  action: string;
  target: string | null;
  data: string | null;
  description: string;
  interaction_type: string;
  actor_node_id: string | null;
  target_node_id: string | null;
  evidence: string | null;
}

export interface MentalModelFlow {
  id: string;
  flow_name: string;
  entry_point: string;
  exit_point: string;
  overview: string;
  steps: MentalModelFlowStep[];
  evidence: string | null;
}

export interface MentalModelTradeoff {
  description: string;
  benefit: string;
  cost: string;
  condition: string | null;
  category: string;
  insight: string;
  evidence: string;
  affected_entities: string[];
  affected_entity_ids: string[];
}

export interface MentalModelTradeoffs {
  tradeoffs: MentalModelTradeoff[];
  constraints: string[];
  takeaways: string;
}

export interface MentalModelRun {
  run_id: string;
  status: string;
  current_step: string;
  progress_percent: number;
  article_id: string;
  section_order: MentalModelSectionId[];
  overview: MentalModelOverview;
  key_concepts: {
    concepts: MentalModelConcept[];
  };
  problem_statement: MentalModelProblemStatement;
  architecture: MentalModelArchitecture;
  flow: {
    flows: MentalModelFlow[];
  };
  tradeoffs: MentalModelTradeoffs;
  error_message: string | null;
  created_at: string;
  updated_at: string;
}
