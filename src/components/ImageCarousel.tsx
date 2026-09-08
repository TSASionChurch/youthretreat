import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { media } from '../lib/assets';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface Slide {
  imgSrc: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  yearTag: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

const SLIDES: Slide[] = [
  {
    imgSrc: media('/DSC_0001.webp'),
    eyebrow: 'SION TAMIL CHURCH',
    title: 'Welcome to our church',
    subtitle: 'A community focused on spiritual growth & dedicated service',
    yearTag: '1940 – 2026',
    description: 'Serving Sion & Dharavi with faith, fellowship, and love for over 86 years.',
    ctaText: 'Learn Our History',
    ctaLink: '/history'
  },
  {
    imgSrc: media('/yr.jpg'),
    eyebrow: 'SAY YOUTH GROUP',
    title: 'Youth Retreat 2026',
    subtitle: 'Empowering the next generation of Christian leaders',
    yearTag: 'ANNUAL EVENT',
    description: 'Join us for three transformative days of prayer, outdoor workshops, and spiritual growth.',
    ctaText: 'View Retreat Details',
    ctaLink: '/retreat'
  }
];

const DURATION = 6000;

export default function ImageCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, DURATION);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setActive((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setActive((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const slide = SLIDES[active];

  return (
    <div className="relative w-full h-[82vh] min-h-[580px] max-h-[850px] overflow-hidden bg-[#182046] text-white">
      
      {/* Background image carousel with cinematic fades */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={slide.imgSrc}
            alt={slide.title}
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle vignette & gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Far left edge vertical progress bar indicators (reference image matching) */}
      <div className="absolute left-6 sm:left-12 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-3">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className="group py-1 cursor-pointer"
          >
            <div
              className={`w-[2px] transition-all duration-500 rounded-full ${
                idx === active
                  ? 'h-10 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]'
                  : 'h-4 bg-white/30 group-hover:bg-white/60'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Content container (reference image matching) */}
      <div className="relative z-20 w-full h-full max-w-[1600px] mx-auto px-16 sm:px-24 flex flex-col justify-between py-12 md:py-16">
        
        {/* Top empty spacer */}
        <div />

        {/* Middle main content */}
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Eyebrow tag: — Sion Tamil Church */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-white/60 font-light">—</span>
                <span className="text-white/80 font-tech font-extrabold uppercase text-xs sm:text-sm tracking-[0.25em]">
                  {slide.eyebrow}
                </span>
              </div>

              {/* Main title: bold Khand uppercase style */}
              <h1 className="font-khand font-bold uppercase text-white text-[clamp(48px,8vw,110px)] leading-[0.9] tracking-tight mb-6 drop-shadow-md">
                {slide.title}
              </h1>

              {/* Subtitle description */}
              <p className="text-white/80 text-sm sm:text-base font-sans font-medium leading-relaxed max-w-lg mb-8">
                {slide.description}
              </p>

              {/* CTA action button */}
              <Link
                to={slide.ctaLink}
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#D92B27] hover:bg-[#FFE600] hover:text-[#222d61] text-white text-xs font-tech font-extrabold uppercase tracking-widest transition-all duration-300 shadow-xl group"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom metadata & controls bar (reference image matching) */}
        <div className="flex items-end justify-between pt-6 border-t border-white/10">
          
          {/* Bottom left subtitle + metadata */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-sans text-white/60 tracking-wide font-medium">
            <span className="text-white/90 font-bold">{slide.subtitle}</span>
            <span className="text-white/30">|</span>
            <span className="font-tech text-white/70">{slide.yearTag}</span>
          </div>

          {/* Bottom right floating circular navigation buttons (reference image matching) */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="w-12 h-12 rounded-full bg-black/40 hover:bg-black/70 border border-white/15 text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="w-12 h-12 rounded-full bg-white text-[#222d61] hover:bg-[#FFE600] flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}