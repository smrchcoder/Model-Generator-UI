import AppBackgroundGrid from "../components/AppBackgroundGrid";
import HomeExperiencePrinciples from "../components/home/HomeExperiencePrinciples";
import HomeHeroSection from "../components/home/HomeHeroSection";
import HomeModelSectionsOverview from "../components/home/HomeModelSectionsOverview";
import HomeValueHighlights from "../components/home/HomeValueHighlights";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-bg-canvas">
      <AppBackgroundGrid />

      <main className="relative z-10 px-4 pb-24 pt-28 sm:px-6 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <HomeHeroSection />
          <HomeValueHighlights />
          <HomeModelSectionsOverview />
          <HomeExperiencePrinciples />
        </div>
      </main>
    </div>
  );
}
