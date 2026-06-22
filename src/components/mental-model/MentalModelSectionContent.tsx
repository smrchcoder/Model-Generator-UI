import type { OutputSection } from "../../content/productContext";
import type {
  MentalModelRun,
  MentalModelSectionId,
} from "../../types/mentalModel";
import ArchitectureSection from "./sections/ArchitectureSection";
import FlowSection from "./sections/FlowSection";
import KeyConceptsSection from "./sections/KeyConceptsSection";
import OverviewSection from "./sections/OverviewSection";
import ProblemStatementSection from "./sections/ProblemStatementSection";
import TradeoffsSection from "./sections/TradeoffsSection";

interface MentalModelSectionContentProps {
  activeSectionId: MentalModelSectionId;
  model: MentalModelRun;
  sectionMeta: OutputSection;
}

export default function MentalModelSectionContent({
  activeSectionId,
  model,
  sectionMeta,
}: MentalModelSectionContentProps) {
  switch (activeSectionId) {
    case "overview":
      return <OverviewSection overview={model.overview} />;
    case "key_concepts":
      return <KeyConceptsSection concepts={model.key_concepts.concepts} />;
    case "problem_statement":
      return (
        <ProblemStatementSection problemStatement={model.problem_statement} />
      );
    case "architecture":
      return <ArchitectureSection architecture={model.architecture} />;
    case "flow":
      return <FlowSection flows={model.flow.flows} />;
    case "tradeoffs":
      return <TradeoffsSection tradeoffs={model.tradeoffs} />;
    default:
      return (
        <div className="atlas-card p-6 text-text-secondary">
          {sectionMeta.title}
        </div>
      );
  }
}
