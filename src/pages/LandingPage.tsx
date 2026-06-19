import { useState } from 'react';
import { motion } from 'framer-motion';
import TopBar from '../components/TopBar';
import BackgroundGrid from '../components/BackgroundGrid';
import InputSection from '../components/InputSection';

export default function LandingPage() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (_value: string) => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 3000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundGrid />
      <TopBar />

      <main className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-2xl">
          {/* Headline */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-text-primary mb-6">
              Engineering stories,
              <br />
              <span className="text-gradient-yellow">visually told.</span>
            </h1>

            <p className="text-lg md:text-xl text-text-secondary max-w-xl mx-auto leading-relaxed">
              Transform technical blog posts into interactive visual narratives.
              Paste a URL or article text to begin.
            </p>
          </motion.div>

          {/* Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <InputSection
              onSubmit={handleSubmit}
              isProcessing={isProcessing}
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
