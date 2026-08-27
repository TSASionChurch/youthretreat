import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface StaircasePreloaderProps {
  onComplete?: () => void;
}

const WORDS = [
  { text: "FAITH",      range: [0,  25] },
  { text: "HOPE",       range: [26, 50] },
  { text: "FELLOWSHIP", range: [51, 75] },
  { text: "SION",       range: [76, 100] },
];

const COUNTER_DURATION = 3500; // ms

export default function StaircasePreloader({ onComplete }: StaircasePreloaderProps) {
  const [percent, setPercent]     = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // ── Counter animation ───────────────────────────────────────────────────
  // Images are preloaded at the HTML level via <link rel="preload"> in index.html
  // so they are already in the browser cache before this JS ever runs.
  // The counter just gives a pleasant loading experience.
  useEffect(() => {
    let start = 0;
    const end = 100;
    const stepTime = Math.abs(Math.floor(COUNTER_DURATION / end));

    const timer = setInterval(() => {
      start += 1;
      setPercent(start);
      if (start >= end) {
        clearInterval(timer);
        setTimeout(() => setIsLoading(false), 400);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  // ── Active word ─────────────────────────────────────────────────────────
  const getActiveWord = () => {
    const found = WORDS.find(w => percent >= w.range[0] && percent <= w.range[1]);
    return found ? found.text : 'SION';
  };

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isLoading && (
        <motion.div
          key="preloader-wrapper"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 1.05, ease: [0.85, 0, 0.15, 1] },
          }}
          className="fixed inset-0 z-[9999] bg-[#0A1128] text-white flex flex-col justify-between p-6 sm:p-10 md:p-16 overflow-hidden pointer-events-auto"
        >
          {/* Subtle grid backing */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.02] pointer-events-none" />

          {/* Top Info Banner */}
          <div className="relative z-10 flex items-center justify-between">
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white/50">
              TSA Sion Church Tamil
            </span>
            <span className="text-[10px] font-black tracking-[0.3em] uppercase text-[#D92B27]">
              Mumbai, India
            </span>
          </div>

          {/* Center Dynamic Word Reveal */}
          <div className="relative z-10 flex-grow flex items-center justify-center">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={getActiveWord()}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="font-bold text-center tracking-tight text-white uppercase"
                  style={{
                    fontFamily: 'Unbounded',
                    fontSize: 'clamp(36px, 8vw, 90px)',
                    letterSpacing: '-0.04em',
                  }}
                >
                  {getActiveWord()}
                </motion.h2>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Counters */}
          <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-t border-white/10 pt-6 sm:pt-10 gap-4">
            {/* Mission Statement */}
            <span className="text-white/40 text-[10px] sm:text-xs font-semibold max-w-xs leading-relaxed">
              Empowering generations through holiness, service, and fellowship.
            </span>

            {/* Awwwards-style percent counter */}
            <div className="flex items-baseline gap-1 self-end sm:self-auto">
              <span
                className="font-black text-white leading-none tabular-nums"
                style={{
                  fontFamily: 'Unbounded',
                  fontSize: 'clamp(48px, 9vw, 96px)',
                  letterSpacing: '-0.04em',
                }}
              >
                {String(percent).padStart(3, '0')}
              </span>
              <span className="text-[#FFE600] font-black text-xl sm:text-2xl leading-none">%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
