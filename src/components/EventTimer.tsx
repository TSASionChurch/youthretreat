import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Calendar, MapPin, Sparkles } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface EventTimerProps {
  compact?: boolean;
  variant?: 'default' | 'retreat';
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export default function EventTimer({ compact = false, variant = 'default' }: EventTimerProps) {
  const targetDate = new Date('2026-10-02T09:00:00');

  const calculate = (): TimeLeft => {
    const diff = +targetDate - +new Date();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [t, setT] = useState<TimeLeft>(calculate());

  useEffect(() => {
    const id = setInterval(() => setT(calculate()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: 'DAYS', value: t.days },
    { label: 'HOURS', value: t.hours },
    { label: 'MINUTES', value: t.minutes },
    { label: 'SECONDS', value: t.seconds },
  ];

  /* ── Dedicated Retreat Page Variant ── */
  if (variant === 'retreat') {
    return (
      <div className="w-full bg-[#182046] border border-white/15 p-6 md:p-8 rounded-2xl select-none relative overflow-hidden">
        {/* Background Pattern Accent */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#FFE600 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">

          {/* Left Title */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FFE600] text-[#222d61] flex items-center justify-center font-bold shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[#FFE600] font-tech text-[10px] font-bold uppercase tracking-widest mb-1">
                <Sparkles className="w-3 h-3" />
                <span>OFFICIAL COUNTDOWN</span>
              </div>
              <h3 className="font-oswald font-bold uppercase text-white text-2xl md:text-3xl leading-none">
                EVENT STARTS IN
              </h3>
            </div>
          </div>

          {/* Digits Grid */}
          <div className="grid grid-cols-4 gap-3 sm:gap-4 w-full md:w-auto">
            {units.map((u) => (
              <div key={u.label} className="flex flex-col items-center justify-center p-3 sm:p-4 min-w-[70px] sm:min-w-[85px] bg-[#222d61] border border-white/15 rounded-xl">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={pad(u.value)}
                    initial={{ y: '50%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '-50%', opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="font-oswald font-bold text-[#FFE600] text-3xl sm:text-4xl md:text-5xl leading-none block"
                  >
                    {pad(u.value)}
                  </motion.span>
                </AnimatePresence>
                <span className="font-archivo text-[9px] font-bold text-white/60 uppercase tracking-widest mt-2">
                  {u.label}
                </span>
              </div>
            ))}
          </div>

          {/* Right Date Pill */}
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FFE600] text-[#222d61] font-tech text-xs font-bold uppercase tracking-widest">
              <Calendar className="w-4 h-4" />
              <span>OCT 02, 2026</span>
            </div>
          </div>

        </div>
      </div>
    );
  }

  /* ── Compact (used inside homepage hero retreat section) ── */
  if (compact) {
    return (
      <div className="w-full select-none">
        <div className="grid grid-cols-4 gap-3 mb-5">
          {units.map((u, i) => (
            <div key={u.label} className="flex flex-col">
              <div className="relative overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={pad(u.value)}
                    initial={{ y: '60%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '-60%', opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="font-khand font-bold text-white block leading-none"
                    style={{ fontSize: 'clamp(40px, 5vw, 80px)', letterSpacing: '0.02em' }}
                  >
                    {pad(u.value)}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="font-tech text-[9px] font-medium uppercase tracking-[0.25em] text-white/40 mt-1.5">
                {u.label}
              </span>
              {i < units.length - 1 && (
                <span className="absolute top-0 right-0 font-khand text-white/20 text-3xl leading-none">:</span>
              )}
            </div>
          ))}
        </div>

        <div className="border border-white/10 px-5 py-3.5 flex flex-wrap items-center gap-4 text-white/60 font-tech text-xs">
          <div className="flex items-center gap-1.5 text-[#FFE600]">
            <Calendar size={12} />
            <span>Friday, Oct 2, 2026</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={12} />
            <span>9:00 AM – 6:00 PM</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={12} />
            <span>TSA Sion, Mumbai</span>
          </div>
        </div>
      </div>
    );
  }

  /* ── Default Block ── */
  return (
    <section className="bg-white py-14 px-6 md:px-10 border-y border-slate-200">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10 bg-[#F8F9FA] border border-slate-200 p-8 md:p-12">
          <div className="flex items-start gap-5">
            <div className="p-3.5 bg-[#D92B27] text-white shrink-0">
              <Clock className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[#D92B27] font-tech font-medium uppercase tracking-widest text-[10px] mb-2">
                <Sparkles className="w-3 h-3" />
                <span>Event countdown</span>
              </div>
              <h2 className="font-khand font-bold text-[#222d61] leading-tight text-3xl md:text-4xl">
                Event starts in
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 md:gap-6 w-full lg:w-auto">
            {units.map((u) => (
              <motion.div
                key={u.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center justify-center p-4 md:p-6 bg-white border border-slate-200"
              >
                <span
                  className="font-khand font-bold text-[#D92B27] leading-none"
                  style={{ fontSize: 'clamp(36px, 5vw, 64px)' }}
                >
                  {pad(u.value)}
                </span>
                <span className="font-tech text-[9px] font-medium uppercase tracking-wider text-slate-400 mt-2">
                  {u.label}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-2 px-5 py-3 bg-[#FFE600] text-[#222d61] font-tech text-xs font-medium tracking-wider uppercase self-start lg:self-center shrink-0">
            <Calendar className="w-4 h-4" />
            <span>Oct 02, 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
}
