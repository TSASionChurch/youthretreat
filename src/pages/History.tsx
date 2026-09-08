import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function TimelineItem({
  year, title, subtitle, description, index,
}: {
  year: string; title: string; subtitle: string;
  description: string; index: number; key?: React.Key;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-12 gap-4 md:gap-8 py-8 border-b border-slate-200 group"
    >
      {/* Year */}
      <div className="col-span-3 md:col-span-2 pt-0.5">
        <span className="font-tech font-bold text-[10px] text-[#D92B27] uppercase tracking-widest block mb-1">
          [{String(index + 1).padStart(2, '0')}]
        </span>
        <span
          className="font-khand font-bold text-[#222d61] leading-none block uppercase"
          style={{ fontSize: 'clamp(24px, 3vw, 42px)', letterSpacing: '0.01em' }}
        >
          {year}
        </span>
        <span className="font-tech text-[10px] text-slate-400 block mt-1 uppercase tracking-wider">{subtitle}</span>
      </div>

      {/* Dot + line */}
      <div className="col-span-1 flex flex-col items-center pt-2">
        <div className="w-2.5 h-2.5 rounded-full bg-[#D92B27] shrink-0" />
        <div className="w-px flex-1 bg-slate-200 mt-2" />
      </div>

      {/* Content */}
      <div className="col-span-8 md:col-span-9 pb-1">
        <h3
          className="font-khand font-semibold text-[#222d61] mb-2 group-hover:text-[#D92B27] transition-colors duration-300 uppercase"
          style={{ fontSize: 'clamp(20px, 2.2vw, 30px)', letterSpacing: '0.01em' }}
        >
          {title}
        </h3>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed font-normal max-w-3xl">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export default function History() {
  const timelineData = [
    {
      year: '1940',
      subtitle: 'The beginning',
      title: 'MINISTRY COMMENCES IN DHARAVI',
      description:
        'Our ministry began its faithful journey in Dharavi, reaching out to local families, providing spiritual guidance, healthcare assistance, and compassionate community care.',
    },
    {
      year: '1960s',
      subtitle: 'Home worship',
      title: 'SALVATIONISTS GATHER AT HOME',
      description:
        'During the 1960s, worship transitioned into home gatherings. In private homes, salvationists came together, building a deep sense of family, fellowship, and resilience in faith.',
    },
    {
      year: '1970s',
      subtitle: 'Leadership',
      title: 'ESTABLISHMENT OF CORPS OFFICER',
      description:
        "The ministry's structure was formally strengthened with the assignment of official corps officers, organising the congregation under active pastoral care and structure.",
    },
    {
      year: '1980s',
      subtitle: 'Foundation',
      title: 'TSA SION CORPS ESTABLISHED',
      description:
        'The 1980s saw the official establishment of the TSA Sion Corps church at its current location in Sion East, expanding spiritual programmes and laying down roots for generations.',
    },
    {
      year: 'Today',
      subtitle: 'Continuing legacy',
      title: 'EXPANDING OUR MISSION',
      description:
        'We continue to grow and expand our outreach services. Under the leadership of our officers, we strive to be a lighthouse of hope, faith, and practical help in Mumbai.',
    },
  ];

  return (
    <div className="w-full bg-white min-h-screen text-[#222d61]">

      {/* ── Compact Top Header ───────────────────────────────────── */}
      <section className="pt-16 pb-8 px-6 md:px-12 border-b border-slate-200 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center gap-3 mb-4 font-tech text-xs font-bold text-[#D92B27] uppercase tracking-[0.25em]">
            <span className="w-6 h-px bg-[#D92B27]" />
            <span>OUR JOURNEY • 1940 TO PRESENT</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-7">
              <h1
                className="font-khand font-bold text-[#222d61] leading-none uppercase"
                style={{ fontSize: 'clamp(44px, 6.5vw, 96px)', letterSpacing: '0.01em' }}
              >
                OUR <span className="font-serif-italic font-normal text-[#D92B27] lowercase">history</span>
              </h1>
            </div>
            <div className="lg:col-span-5">
              <p className="text-slate-500 text-base md:text-lg leading-relaxed font-normal">
                Tracing the faithful legacy of The Salvation Army Tamil Church Sion — from Dharavi in 1940 to an active corps ministry today.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline (Starts Immediately) ───────────────────────── */}
      <section className="py-12 px-6 md:px-12 bg-[#F8F9FA]">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center gap-3 font-tech text-xs font-bold text-slate-400 uppercase tracking-widest pb-4 mb-4 border-b border-slate-200">
            <span className="text-[#D92B27] font-mono">//</span>
            <span>CHRONOLOGICAL TIMELINE</span>
          </div>
          
          <div className="divide-y divide-slate-100">
            {timelineData.map((item, idx) => (
              <TimelineItem
                key={idx}
                index={idx}
                year={item.year}
                subtitle={item.subtitle}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-16 px-6 md:px-12 bg-[#222d61] text-white">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="font-tech text-xs font-bold text-[#FFE600] uppercase tracking-widest block mb-2">
              // BE PART OF OUR NEXT CHAPTER
            </span>
            <h2
              className="font-khand font-semibold text-white leading-none uppercase"
              style={{ fontSize: 'clamp(28px, 4vw, 54px)', letterSpacing: '0.01em' }}
            >
              JOIN US <span className="font-serif-italic font-normal text-[#FFE600] lowercase">this Sunday</span>
            </h2>
            <p className="text-white/60 text-sm mt-2 max-w-xl font-normal">
              Sunday Holiness Meeting — 10:15 AM at Sion East.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-7 py-3 bg-[#D92B27] hover:bg-[#FFE600] text-white hover:text-[#222d61] font-tech font-bold text-xs uppercase tracking-widest transition-all duration-300"
            >
              <span>GET IN TOUCH</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/ministries"
              className="inline-flex items-center gap-2 px-7 py-3 border border-white/20 hover:border-white text-white font-tech font-bold text-xs uppercase tracking-widest transition-all"
            >
              <span>OUR MINISTRIES</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
