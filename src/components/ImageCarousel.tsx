import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface Slide {
  imgSrc: string;
  bgClass: string; // Tailwind bg color class
  titleColor: string; // Tailwind text color class for title
  btnClass: string; // Tailwind bg/hover class for button
  eyebrow: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

const SLIDES: Slide[] = [
  {
    imgSrc: '/DSC_0001.webp',
    bgClass: 'bg-[#FCEAE8]', // Soft Rose
    titleColor: 'text-[#3b1715]',
    btnClass: 'bg-[#D92B27] hover:bg-[#0A1128] text-white',
    eyebrow: 'Sion Tamil Church',
    title: 'Welcome to\nour church',
    description: 'A community focused on spiritual growth, dedicated to loving God and serving Sion & Dharavi since 1940.',
    ctaText: 'Learn More',
    ctaLink: '/history'
  },
  {
    imgSrc: '/choir.png',
    bgClass: 'bg-[#E3F2FD]', // Soft Blue
    titleColor: 'text-[#0D47A1]',
    btnClass: 'bg-[#0D47A1] hover:bg-[#D92B27] text-white',
    eyebrow: 'Choir Fellowship',
    title: 'Praise &\nWorship',
    description: 'The Sion Choir leads the congregation in harmonious, spirit-filled worship every Sunday service.',
    ctaText: 'Our Ministries',
    ctaLink: '/ministries'
  },
  {
    imgSrc: '/yr.jpg',
    bgClass: 'bg-[#FFFDE7]', // Soft Yellow/Gold
    titleColor: 'text-[#5D4037]',
    btnClass: 'bg-[#D92B27] hover:bg-[#0A1128] text-white',
    eyebrow: 'SAY Youth Group',
    title: 'Youth Retreat\n2026',
    description: 'Empowering the next generation of Christian leaders. Register now for our annual youth retreat!',
    ctaText: 'View Retreat',
    ctaLink: '/retreat'
  },
  {
    imgSrc: '/grp1.png',
    bgClass: 'bg-[#F5F5F5]', // Soft Slate/Grey
    titleColor: 'text-[#212121]',
    btnClass: 'bg-[#0A1128] hover:bg-[#D92B27] text-white',
    eyebrow: 'Mumbai Outreach',
    title: 'United In\nFellowship',
    description: 'We believe in sharing the love of God through active spiritual leadership and local community actions.',
    ctaText: 'Contact Us',
    ctaLink: '/contact'
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
    <div className={`w-full py-16 md:py-24 px-6 sm:px-10 md:px-16 border-b border-slate-200 transition-colors duration-1000 ${slide.bgClass}`}>
      
      {/* Centered Cursive Scriptural Quote at the Top */}
      <div className="w-full text-center mb-10 md:mb-14">
        <p className="text-slate-600 italic font-medium text-xs sm:text-sm tracking-wide">
          I was glad when they said to me, “Let us go into the house of the Lord.” Psalm 122:1
        </p>
      </div>

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
        
        {/* Left Column - Dynamic Text Block */}
        <div className="lg:col-span-5 flex flex-col justify-center min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-2.5 mb-5">
                <span className="w-6 h-[1.5px] bg-[#D92B27]" />
                <span className="text-[#D92B27] font-black uppercase text-[10px] sm:text-xs tracking-[0.25em]">
                  {slide.eyebrow}
                </span>
              </div>

              <h1 
                className={`font-bold  uppercase leading-[0.9] tracking-tighter mb-6 ${slide.titleColor}`}
                style={{ fontSize: 'clamp(38px, 6vw, 72px)' ,fontFamily:"Unbounded"}}
              >
                {slide.title.split('\n').map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line}
                    {idx < slide.title.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h1>

              <p className="text-slate-600 text-sm sm:text-base font-semibold max-w-md leading-relaxed mb-8">
                {slide.description}
              </p>

              <div className="flex items-center gap-4 flex-wrap">
                <Link
                  to={slide.ctaLink}
                  className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs font-black uppercase tracking-widest transition-colors duration-300 shadow-md hover:shadow-lg ${slide.btnClass}`}
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight size={13} className="stroke-[2.5]" />
                </Link>

                {/* Manual slide controllers */}
                <div className="flex items-center gap-2 ml-2">
                  <button
                    onClick={prevSlide}
                    aria-label="Previous slide"
                    className="w-9 h-9 rounded-full border border-slate-300 hover:border-slate-400 bg-white/70 hover:bg-white text-slate-600 flex items-center justify-center transition-colors"
                  >
                    <ArrowLeft size={14} className="stroke-[2.5]" />
                  </button>
                  <button
                    onClick={nextSlide}
                    aria-label="Next slide"
                    className="w-9 h-9 rounded-full border border-slate-300 hover:border-slate-400 bg-white/70 hover:bg-white text-slate-600 flex items-center justify-center transition-colors"
                  >
                    <ArrowRight size={14} className="stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column - Slanted Image Frame */}
        <div className="lg:col-span-7 w-full flex items-center justify-center">
          <div className="w-full h-[240px] sm:h-[320px] md:h-[440px] bg-[#D92B27] transform -skew-x-12 overflow-hidden rounded-none border-4 border-white shadow-xl relative">
            <div className="w-full h-full transform skew-x-12 relative flex items-center justify-center bg-slate-50">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 flex items-center justify-center p-4 bg-slate-50"
                >
                  {/* Blurred ambient backdrop */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center filter blur-xl opacity-[0.04] pointer-events-none scale-110"
                    style={{ backgroundImage: `url(${slide.imgSrc})` }}
                  />
                  
                  {/* Uncropped image element */}
                  <img
                    src={slide.imgSrc}
                    alt={slide.title}
                    draggable={false}
                    className="max-w-full max-h-full object-contain relative z-10 rounded-none"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Yellow highlight edge decoration */}
              <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-[#FFE600] z-20" />
            </div>
          </div>
        </div>

      </div>

      {/* Pagination indicators at the bottom */}
      <div className="max-w-[1600px] mx-auto mt-8 flex justify-center gap-2">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === active ? 'w-8 bg-[#D92B27]' : 'w-2 bg-slate-300'
            }`}
          />
        ))}
      </div>

    </div>
  );
}
