import { useState } from "react";
import { motion } from "framer-motion";
import BackgroundGrid from "../components/BackgroundGrid";
import InputSection from "../components/InputSection";
import TopBar from "../components/TopBar";
import { outputSections, productContext } from "../content/productContext";

export default function LandingPage() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (_value: string) => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 2600);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg-canvas">
      <BackgroundGrid />
      <TopBar />

      <main className="relative z-10 flex min-h-screen items-center justify-center px-6 pb-12 pt-24 md:pt-28">
        <section className="w-full max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border-default bg-bg-panel px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-secondary shadow-panel">
              <span className="h-2 w-2 rounded-full bg-accent-copper" />
              {productContext.productLabel}
            </div>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-text-tertiary">
              {productContext.heroEyebrow}
            </p>

            <h1 className="mx-auto mt-4 max-w-4xl font-display text-[2.9rem] leading-[1.04] text-text-primary md:text-[4rem]">
              {productContext.heroTitle}
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-text-secondary md:text-lg">
              {productContext.heroDescription}
            </p>
          </motion.div>

          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            <InputSection onSubmit={handleSubmit} isProcessing={isProcessing} />
          </motion.div>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16 }}
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-text-tertiary">
              The output arrives as six connected views
            </p>

            <div className="grid grid-cols-2 gap-3 text-left sm:grid-cols-3">
              {outputSections.map((section, index) => (
                <article
                  key={section.id}
                  className="rounded-[20px] border border-border-subtle bg-bg-panel px-4 py-3 shadow-panel"
                >
                  <span className="font-mono text-[11px] text-text-tertiary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-2 text-sm font-semibold text-text-primary">
                    {section.title}
                  </h2>
                </article>
              ))}
            </div>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-text-secondary">
              {productContext.promise}
            </p>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
