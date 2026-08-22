import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface StaircasePreloaderProps {
  onComplete?: () => void;
}

const BIBLE_VERSES = [
  {
    verse: "One generation shall commend your works to another, and shall declare your mighty acts.",
    reference: "Psalm 145:4"
  },
  {
    verse: "Don't let anyone look down on you because you are young, but set an example for believers in faith and love.",
    reference: "1 Timothy 4:12"
  },
  {
    verse: "Those who hope in the LORD will renew their strength. They will soar on wings like eagles.",
    reference: "Isaiah 40:31"
  }
];

export default function StaircasePreloader({ onComplete }: StaircasePreloaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentVerse] = useState(() => BIBLE_VERSES[Math.floor(Math.random() * BIBLE_VERSES.length)]);

  useEffect(() => {
    // Show preloader for 2.6 seconds then trigger staircase exit
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2600);

    return () => clearTimeout(timer);
  }, []);

  const columnCount = 5;

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isLoading && (
        <div className="fixed inset-0 z-[9999] pointer-events-auto flex items-center justify-center overflow-hidden">
          
          {/* STAIRCASE COLUMNS WITH SHADOW & STAGGERED STEP SHAPE */}
          <div className="absolute inset-0 grid grid-cols-5 w-full h-full">
            {Array.from({ length: columnCount }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ y: 0 }}
                exit={{ 
                  y: '-100%',
                  transition: { 
                    duration: 0.85, 
                    ease: [0.76, 0, 0.24, 1], 
                    delay: index * 0.12 
                  } 
                }}
                className="w-full h-full bg-[#0B0F19] border-r border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative"
              >
                {/* Staircase Step Edge Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-red/60" />
              </motion.div>
            ))}
          </div>

          {/* MINIMALIST FLOATING TYPOGRAPHY CONTENT */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ 
              opacity: 0, 
              y: -30,
              transition: { duration: 0.3 } 
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-20 max-w-4xl mx-auto px-6 text-center"
          >
            {/* Event Tag */}
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-brand-red font-black uppercase tracking-[0.3em] text-xs sm:text-sm mb-8"
            >
              Youth Retreat 2026 • Empowering Generations
            </motion.p>

            {/* Clean Floating Verse Text */}
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.2] max-w-3xl mx-auto"
            >
              "{currentVerse.verse}"
            </motion.h2>

            {/* Scripture Reference */}
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="text-brand-red font-black uppercase tracking-widest text-sm sm:text-base mt-6 sm:mt-8"
            >
              — {currentVerse.reference}
            </motion.p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
