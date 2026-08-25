import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Sparkles, Calendar, ArrowRight, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

function TimelineItem({
  year,
  title,
  subtitle,
  description,
  index,
}: {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative mb-16 md:mb-24 flex flex-col md:flex-row items-center md:justify-between w-full">
      {/* Date Marker Center Line dot */}
      <div className="absolute left-4 md:left-1/2 top-6 md:top-8 w-6 h-6 rounded-full border-4 border-white bg-[#D92B27] shadow-md z-10 -translate-x-1/2" />

      {/* Left block (if index is even, render content. if odd, render spacer on desktop) */}
      <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${isEven ? 'md:text-right' : 'md:order-2 md:text-left'}`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
          animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 hover:shadow-[0_20px_50px_rgba(10,17,40,0.05)] hover:border-slate-300 transition-all duration-300 relative overflow-hidden"
        >
          {/* Accent corner line */}
          <div className={`absolute top-0 w-2 h-full bg-[#D92B27] ${isEven ? 'right-0' : 'left-0'}`} />

          <div className={`flex items-center gap-2 mb-3 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
            <span className="text-[#D92B27] font-black text-xs uppercase tracking-widest bg-[#D92B27]/5 px-3 py-1 rounded-full">
              {year}
            </span>
            <span className="text-slate-400 font-extrabold uppercase text-[10px] tracking-wider">{subtitle}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-[#0A1128] uppercase tracking-tight">
            {title}
          </h3>

          <p className="text-slate-500 text-sm sm:text-base mt-4 leading-relaxed font-medium">
            {description}
          </p>
        </motion.div>
      </div>

      {/* Spacer block for desktop */}
      <div className="hidden md:block w-[45%]" />
    </div>
  );
}

export default function History() {
  const timelineData = [
    {
      year: "1940",
      subtitle: "The Beginning",
      title: "Ministry Starts in Dharavi Slums",
      description: "Our ministry began its journey in the heart of the Dharavi slums, reaching out to the marginalized and down-trodden, providing spiritual guidance and social care.",
    },
    {
      year: "1960s",
      subtitle: "Home Worship",
      title: "Salvationists Gather at Home",
      description: "During the 1960s, worship transitioned into home gatherings. In private homes, salvationists came together, building a deep sense of family, fellowship, and resilience in faith.",
    },
    {
      year: "1970s",
      subtitle: "Leadership Expansion",
      title: "Establishment of Corps Officer",
      description: "The ministry's structure was formally strengthened with the assignment of official corps officers, organizing the congregation under active pastoral care and structure.",
    },
    {
      year: "1980s",
      subtitle: "Church Foundation",
      title: "TSA Sion Corps Established",
      description: "The 1980s saw the official establishment of the TSA Sion Corps church at its current location, expanding spiritual programs and laying down roots for generations.",
    },
    {
      year: "Present",
      subtitle: "Continuing The Legacy",
      title: "Expanding Our Mission",
      description: "Today, we continue to grow and expand our outreach services. Under the leadership of our officers, we strive to be a lighthouse of hope, faith, and practical help in Mumbai.",
    }
  ];

  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen text-[#0A1128] noise pb-24">
      {/* Header Banner */}
      <section className="relative bg-white pt-24 pb-16 px-4 md:px-10 border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#D92B27]/5 via-transparent to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-[1600px] mx-auto w-full relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Shield size={14} className="text-[#D92B27]" />
            <span className="text-[#D92B27] font-black uppercase tracking-[0.3em] text-xs">Our Journey</span>
          </motion.div>

          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#0A1128] uppercase leading-none font-black"
              style={{ fontSize: 'clamp(36px, 8vw, 100px)', letterSpacing: '-0.02em' }}
            >
              Our History
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-500 text-base sm:text-lg md:text-xl font-medium max-w-xl mx-auto mt-6 leading-relaxed"
          >
            Tracing the faithful legacy of The Salvation Army Tamil Church Sion from our humble beginnings in 1940 to our active ministry today.
          </motion.p>
        </div>
      </section>

      {/* Timeline List */}
      <section className="py-20 px-4 md:px-10 relative">
        <div className="max-w-[1200px] mx-auto relative">
          {/* Center Line for timeline */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-1 bg-slate-200 -translate-x-1/2" />

          {/* Timeline Items */}
          <div className="relative">
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

      {/* Call to action at bottom */}
      <section className="px-4 md:px-10">
        <div className="max-w-[1200px] mx-auto bg-[#0A1128] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl text-center">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.02]" />
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight mb-4">
            Be Part of Our Next Chapter
          </h2>
          <p className="text-white/60 text-sm sm:text-base max-w-lg mx-auto mb-8 font-medium leading-relaxed">
            We are continuing the mission of faith, hope, and love. Join us this Saturday at our youth fellowship or Sunday at our holiness service.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D92B27] text-white hover:bg-white hover:text-[#0A1128] font-black uppercase text-xs tracking-widest transition-all duration-300 shadow-md"
            >
              <span>Get in Touch</span>
              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/ministries"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:border-white text-white font-black uppercase text-xs tracking-widest transition-all duration-300"
            >
              <span>Our Ministries</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
