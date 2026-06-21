import { Navigate, useParams } from "react-router-dom";
import BackgroundGrid from "../components/BackgroundGrid";
import MentalModelShowcase from "../components/mental-model/MentalModelShowcase";
import { getLibraryModelBySlug } from "../content/modelLibrary";

export default function ModelLibraryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const entry = slug ? getLibraryModelBySlug(slug) : undefined;

  if (!entry) {
    return <Navigate to="/library" replace />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg-canvas">
      <BackgroundGrid />

      <main className="relative z-10 px-4 pb-20 pt-28 sm:px-6 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <MentalModelShowcase
            model={entry.model}
            badgeLabel="Library Model"
            headline={entry.title}
            description={entry.summary}
            sourceLabel="Source article"
            sourceTitle={entry.sourceTitle}
            sourceSubtitle={entry.sourceDomain}
            sourceHref={entry.sourceUrl}
            extraChips={[entry.focusLabel, entry.difficulty]}
          />
        </div>
      </main>
    </div>
  );
}
