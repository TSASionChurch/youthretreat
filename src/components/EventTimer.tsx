import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock, Calendar, Sparkles } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface EventTimerProps {
  compact?: boolean;
}

export default function EventTimer({ compact = false }: EventTimerProps) {
  const targetDate = new Date('2026-10-02T09:00:00');

  const calculateTimeLeft = (): TimeLeft => {
    const difference = +targetDate - +new Date();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins', value: timeLeft.minutes },
    { label: 'Secs', value: timeLeft.seconds },
  ];

  if (compact) {
    return (
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 p-4 sm:p-6 bg-[#0A1128]/95 backdrop-blur-md rounded-2xl border border-white/10 text-white select-none">
        
        {/* Info Left */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="p-2.5 rounded-xl bg-[#D92B27] text-white shrink-0 shadow-sm">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1 text-[#FFE600] font-black uppercase tracking-widest text-[8px]">
              <Sparkles className="w-3 h-3" />
              <span>Retreat 2026 Countdown</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold uppercase tracking-tight text-white/90">
              Starts In
            </h3>
          </div>
        </div>

        {/* Counter Center */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full md:w-auto">
          {timeUnits.map((unit, index) => (
            <div
              key={unit.label}
              className="flex flex-col items-center justify-center p-2 min-w-[55px] sm:min-w-[65px] bg-white/5 border border-white/10 rounded-xl"
            >
              <span className="text-lg sm:text-2xl font-black text-[#FFE600] leading-none">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="text-[8px] font-bold uppercase tracking-wider text-white/50 mt-1">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        {/* Date Right */}
        <div className="flex items-center justify-center w-full md:w-auto mt-2 md:mt-0">
          <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-[9px] font-black tracking-widest uppercase text-white/90">
            <Calendar className="w-3.5 h-3.5 shrink-0 text-[#FFE600]" />
            <span>Oct 02, 2026</span>
          </div>
        </div>

      </div>
    );
  }

  // Default block rendering on standalone event pages (e.g. Retreat.tsx)
  return (
    <section className="bg-white py-12 sm:py-16 px-3 sm:px-4 md:px-8 border-y border-slate-200">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 bg-[#F8FAFC] border border-slate-200 rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm">
          
          {/* Header text */}
          <div className="flex items-center gap-4 text-left w-full lg:w-auto">
            <div className="p-3.5 rounded-2xl bg-[#D92B27] text-white shrink-0 shadow-sm">
              <Clock className="w-7 h-7 sm:w-9 sm:h-9" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[#D92B27] font-black uppercase tracking-widest text-xs mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Event Countdown</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase text-[#0A1128] tracking-tight">
                Event Starts In
              </h2>
            </div>
          </div>

          {/* Time Cards */}
          <div className="grid grid-cols-4 gap-3 sm:gap-4 md:gap-6 w-full lg:w-auto">
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="flex flex-col items-center justify-center p-3 sm:p-5 md:p-6 bg-white rounded-2xl border border-slate-200 shadow-sm relative"
              >
                <span className="text-3xl sm:text-4xl md:text-6xl font-black text-[#D92B27] tracking-tighter leading-none">
                  {String(unit.value).padStart(2, '0')}
                </span>

                <span className="text-xs md:text-sm font-black uppercase tracking-wider text-slate-500 mt-2">
                  {unit.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Quick Info Badge */}
          <div className="flex items-center justify-center w-full lg:w-auto">
            <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFE600] text-[#0A1128] font-black text-xs sm:text-sm tracking-widest uppercase shadow-sm">
              <Calendar className="w-4 h-4 shrink-0" />
              <span>Oct 02, 2026</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
