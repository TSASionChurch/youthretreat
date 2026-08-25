import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, MapPin, Calendar, Clock, User, Users,
  Sparkles, Navigation, ExternalLink, ChevronRight,
  Globe, Shield, Music, Heart, Target, Mail, ArrowUpRight, Phone
} from 'lucide-react';
import EventTimer from '../components/EventTimer';

/* ── Reveal Wrapper ───────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className = '',
  direction = 'up',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'left' | 'right';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const variants = {
    up:    { hidden: { opacity: 0, y: 50 },  visible: { opacity: 1, y: 0 } },
    left:  { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 50 },  visible: { opacity: 1, x: 0 } },
  };
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants[direction]}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Pill Tag ─────────────────────────────────────── */
function PillTag({ label, variant }: { label: string; variant: 'dark' | 'red' | 'yellow' | 'outline-dark' | 'outline-red' }) {
  const styles: Record<string, string> = {
    dark:           'bg-[#0A1128] text-white',
    red:            'bg-[#D92B27] text-white',
    yellow:         'bg-[#FFE600] text-[#0A1128]',
    'outline-dark': 'bg-white border-2 border-[#0A1128] text-[#0A1128]',
    'outline-red':  'bg-white border-2 border-[#D92B27] text-[#D92B27]',
  };
  return (
    <motion.div
      whileHover={{ scale: 1.06, y: -3 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-xl md:text-2xl font-black tracking-tight cursor-default shadow-sm ${styles[variant]}`}
    >
      {label}
    </motion.div>
  );
}

export default function Retreat() {
  const mapUrl = 'https://maps.app.goo.gl/FopB2t33gXKW2yux7';
  const embedMapUrl =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4233.320311454406!2d72.8571873112368!3d19.033723482087858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c92a7019f37d%3A0xbf05632e51e35ef6!2sSalvation%20Army%20Tamil%20Church%2C%20Women%20And%20Children%20Home!5e1!3m2!1sen!2sin!4v1787584878953!5m2!1sen!2sin';
  return (
    <div className="retreat-site w-full overflow-x-hidden bg-white text-[#0A1128]">

      {/* ══════════════════════════════════════════════
          HERO — Full viewport editorial with accents
      ══════════════════════════════════════════════ */}
      <section className="relative min-h-[95svh] flex flex-col justify-center px-4 md:px-10 pt-28 pb-16 overflow-hidden bg-white">

        {/* Background geometric accents */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full border border-[#0A1128]/5" />
          <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full border border-[#0A1128]/5" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-gradient-to-tr from-[#D92B27]/5 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute top-0 left-0 w-1 h-full bg-[#D92B27]" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: 'radial-gradient(#0A1128 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        <div className="max-w-[1600px] mx-auto w-full relative z-10">

          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-3 mb-8"
          >
            <span className="p-2 rounded-full bg-[#D92B27]/10 text-[#D92B27] border border-[#D92B27]/20">
              <Sparkles size={15} />
            </span>
            <p className="text-[#D92B27] font-black text-sm sm:text-base md:text-lg tracking-wide uppercase">
              Youth Retreat 2026 &nbsp;&middot;&nbsp; Annual Gathering
            </p>
          </motion.div>

          {/* Main headline */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              className="text-[#0A1128] uppercase leading-[0.82] font-black"
              style={{ fontSize: 'clamp(48px, 10vw, 180px)', letterSpacing: '-0.02em' }}
            >
              Empowering
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8 md:mb-12">
            <motion.h1
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
              className="text-[#D92B27] uppercase leading-[0.82] font-black"
              style={{ fontSize: 'clamp(48px, 10vw, 180px)', letterSpacing: '-0.02em' }}
            >
              Generations
            </motion.h1>
          </div>

          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-[#D92B27] leading-snug max-w-2xl mb-6">
            Organized by S.A.Y Group
          </p>

          {/* Bottom bar */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-t border-[#0A1128]/10 pt-8"
          >
            <div className="lg:col-span-7">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-[#0A1128]/60 leading-snug max-w-2xl">
                A strategic one-day youth retreat designed to equip, empower, and inspire young leaders to live with purpose and strength.
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <Link
                to="/register"
                className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-[#D92B27] hover:bg-[#0A1128] text-white font-black uppercase tracking-widest text-sm transition-all duration-300 shadow-[0_8px_40px_rgba(217,43,39,0.3)] hover:shadow-[0_8px_40px_rgba(10,17,40,0.25)]"
              >
                <span>Register Now</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="flex items-center gap-2 text-xs font-bold text-[#0A1128]/40 uppercase tracking-widest">
                <Calendar size={13} className="text-[#D92B27]" />
                <span>Oct 02, 2026 &nbsp;&middot;&nbsp; Mumbai</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Year floating tag */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="absolute top-28 right-6 md:right-10 hidden lg:flex flex-col items-end gap-1"
        >
          <span className="text-[#D92B27] font-black uppercase tracking-[0.2em] text-[10px]">Annual Gathering</span>
          <span
            className="text-[#0A1128]/10 font-black leading-none select-none"
            style={{ fontSize: 'clamp(60px, 9vw, 120px)' }}
          >2026</span>
        </motion.div>
      </section>

      <EventTimer />

      {/* ══════════════════════════════════════════════
          TOPIC TICKER — Horizontal marquee strip
      ══════════════════════════════════════════════ */}
      <div className="relative overflow-hidden border-y border-[#0A1128]/10 py-4 md:py-5 bg-white">
        <div className="animate-scroll flex gap-0 whitespace-nowrap">
          {Array.from({ length: 2 }).flatMap((_, rep) =>
            [
              { label: 'Leadership Development', color: 'text-[#0A1128]' },
              { label: 'Purpose & Calling', color: 'text-[#D92B27]' },
              { label: 'Mental Health', color: 'text-[#0A1128]/50' },
              { label: 'Community Building', color: 'text-[#D92B27]/70' },
              { label: 'Apologetics', color: 'text-[#0A1128]' },
              { label: 'Global Mission', color: 'text-[#D92B27]' },
              { label: 'Worship & Prayer', color: 'text-[#0A1128]/50' },
              { label: 'Faith in Action', color: 'text-[#D92B27]/70' },
            ].map((item, i) => (
              <span key={`${rep}-${i}`} className="flex items-center mr-6 sm:mr-8">
                <span className={`font-black uppercase tracking-wide text-sm sm:text-base md:text-lg ${item.color}`}>
                  {item.label}
                </span>
                <span className="mx-4 sm:mx-6 w-1 h-1 rounded-full inline-block bg-[#D92B27]/30 shrink-0" />
              </span>
            ))
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          WHEN & WHERE — Editorial venue + live map
      ══════════════════════════════════════════════ */}
      <section id="venue" className="bg-[#F8FAFC] py-16 md:py-20 lg:py-32 px-4 md:px-10">
        <div className="max-w-[1600px] mx-auto">

          {/* Section header */}
          <Reveal className="mb-10 md:mb-14">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <p className="text-[#D92B27] font-black uppercase tracking-[0.3em] text-xs flex items-center gap-2 mb-4">
                  <span className="w-5 h-0.5 bg-[#D92B27]" />
                  When &amp; Where
                </p>
                <h2
                  className="text-[#0A1128] uppercase leading-[0.9] font-black"
                  style={{ fontSize: 'clamp(36px, 6vw, 90px)', letterSpacing: '-0.02em' }}
                >
                  Location <span className="text-[#D92B27]">&amp;</span> Map
                </h2>
              </div>
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full border-2 border-[#0A1128] text-[#0A1128] hover:bg-[#0A1128] hover:text-white font-black uppercase text-xs tracking-widest transition-all duration-300 self-start md:self-auto"
              >
                <Navigation size={14} />
                <span>Get Directions</span>
                <ExternalLink size={12} className="group-hover:rotate-12 transition-transform" />
              </a>
            </div>
          </Reveal>

          {/* Main venue card */}
          <Reveal delay={0.12}>
            <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-[0_4px_60px_rgba(10,17,40,0.06)]">
              <div className="grid grid-cols-1 lg:grid-cols-2">

                {/* LEFT — Venue info */}
                <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-between gap-8 md:gap-10 border-b lg:border-b-0 lg:border-r border-slate-100">

                  <div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D92B27]/8 border border-[#D92B27]/20 mb-6">
                      <MapPin size={12} className="text-[#D92B27]" />
                      <span className="text-[#D92B27] font-black uppercase tracking-widest text-[10px]">Official Venue</span>
                    </div>
                    <h3
                      className="text-[#0A1128] uppercase leading-[0.9] font-black mb-4"
                      style={{ fontSize: 'clamp(24px, 4vw, 56px)', letterSpacing: '-0.02em' }}
                    >
                      Salvation Army Tamil Church Sion
                    </h3>
                    <p className="text-sm sm:text-base font-semibold text-[#0A1128]/50 flex items-start gap-2 leading-relaxed">
                      <MapPin size={15} className="text-[#D92B27] mt-0.5 shrink-0" />
                     6, First Floor, Plot No, 60 Feet Road, <br />
                     Opposite Manav Seva Sangh, Sion East,<br />
                      Sion, Mumbai, Maharashtra 400022
                    </p>
                  </div>

                  {/* Date & Time cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 sm:p-6 rounded-2xl bg-[#FFE600] text-[#0A1128] relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-[#0A1128]/5 rounded-bl-3xl" />
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.25em]">Date</span>
                      </div>
                      <p className="font-black uppercase leading-tight text-lg sm:text-[22px]">
                        Friday,<br />Oct 2, 2026
                      </p>
                    </div>
                    <div className="p-5 sm:p-6 rounded-2xl bg-[#0A1128] text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 rounded-bl-3xl" />
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="w-4 h-4 text-[#D92B27]" />
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/60">Time</span>
                      </div>
                      <p className="font-black uppercase leading-tight text-white text-lg sm:text-[22px]">
                        9:00 AM &ndash;<br />6:00 PM
                      </p>
                    </div>
                  </div>

                  {/* Quick info pills */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      { icon: <User size={11} />, text: 'Open to All Youth' },
                      { icon: <Sparkles size={11} />, text: 'Free Entry' },
                      { icon: <Globe size={11} />, text: 'Mumbai, India' },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full bg-slate-100 text-[#0A1128] text-xs font-bold">
                        <span className="text-[#D92B27]">{item.icon}</span>
                        {item.text}
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT — Live embedded map */}
                <div className="relative min-h-[300px] sm:min-h-[400px] lg:min-h-[560px] flex flex-col">
                  <iframe
                    title="Salvation Army Tamil Church Sion Location"
                    src={embedMapUrl}
                    className="w-full flex-1 min-h-[300px] sm:min-h-[400px] lg:min-h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  {/* Open in Maps overlay button */}
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 right-4 z-20 group flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-slate-200 text-[#0A1128] hover:bg-[#D92B27] hover:text-white hover:border-[#D92B27] rounded-full px-3 sm:px-4 py-2 sm:py-2.5 text-[10px] font-black uppercase tracking-widest shadow-lg transition-all duration-300"
                  >
                    <ExternalLink size={12} />
                    <span>Open in Maps</span>
                  </a>
                </div>

              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SPEAKERS — Bold editorial cards
      ══════════════════════════════════════════════ */}
      <section id="speakers" className="bg-white py-16 md:py-20 lg:py-32 px-4 md:px-10">
        <div className="max-w-[1600px] mx-auto">

          <Reveal className="mb-10 md:mb-14">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <p className="text-[#D92B27] font-black uppercase tracking-[0.3em] text-xs mb-4 flex items-center gap-2">
                  <span className="w-5 h-0.5 bg-[#D92B27]" />
                  Retreat Speakers
                </p>
                <h2
                  className="text-[#0A1128] uppercase leading-[0.88] font-black"
                  style={{ fontSize: 'clamp(36px, 7vw, 100px)', letterSpacing: '-0.02em' }}
                >
                  Featured <span className="text-[#D92B27]">Speakers</span>
                </h2>
              </div>
              <p className="text-sm md:text-base lg:text-lg font-medium text-[#0A1128]/50 max-w-xs">
                Hear from inspiring leaders shaping the future of faith and youth movement.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Speaker 1 — Red card */}
            <Reveal delay={0}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="bg-[#D92B27] text-white rounded-3xl p-6 sm:p-8 md:p-12 flex flex-col justify-between min-h-[320px] sm:min-h-[420px] shadow-[0_20px_60px_rgba(217,43,39,0.22)] relative overflow-hidden"
              >
                <span
                  className="absolute top-6 right-8 font-black opacity-10 text-white select-none"
                  style={{ fontSize: '80px', lineHeight: 1 }}
                >01</span>
                <div>
                  <div className="flex items-center gap-3 mb-6 sm:mb-8">
                    <div className="p-2 sm:p-3 rounded-2xl bg-white/15 text-white border border-white/20">
                      <User className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="font-black uppercase tracking-widest text-[10px] px-3 py-1.5 bg-white/15 text-white rounded-full border border-white/20">
                      Keynote Speaker
                    </span>
                  </div>
                  <h3 className="text-white uppercase leading-[0.9] mb-4 font-black" style={{ fontSize: 'clamp(28px, 4vw, 60px)' }}>
                    Pastor Guest Speaker
                  </h3>
                  <p className="text-white/75 text-sm sm:text-base font-semibold">
                    Anointed Keynote &amp; Spiritual Message
                  </p>
                </div>
                <div className="pt-6 border-t border-white/20 flex items-center justify-between mt-6 sm:mt-0">
                  <span className="font-extrabold uppercase tracking-wider text-xs text-white/70">Special Ministry Session</span>
                  <div className="p-2 sm:p-2.5 rounded-full bg-white/15">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            </Reveal>

            {/* Speaker 2 — Navy card */}
            <Reveal delay={0.12}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="bg-[#0A1128] text-white rounded-3xl p-6 sm:p-8 md:p-12 flex flex-col justify-between min-h-[320px] sm:min-h-[420px] shadow-[0_20px_60px_rgba(10,17,40,0.15)] relative overflow-hidden"
              >
                <span
                  className="absolute top-6 right-8 font-black opacity-10 text-white select-none"
                  style={{ fontSize: '80px', lineHeight: 1 }}
                >02</span>
                <div>
                  <div className="flex items-center gap-3 mb-6 sm:mb-8">
                    <div className="p-2 sm:p-3 rounded-2xl bg-[#D92B27]/20 text-[#D92B27] border border-[#D92B27]/30">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="font-black uppercase tracking-widest text-[10px] px-3 py-1.5 bg-white/10 text-white/80 rounded-full border border-white/10">
                      Corps Officers
                    </span>
                  </div>
                  <h3 className="text-white uppercase leading-[0.9] mb-4 font-black" style={{ fontSize: 'clamp(22px, 3.5vw, 50px)' }}>
                    Capt Jeberson Paul &amp; Capt Muthuselvi Jeberson
                  </h3>
                  <p className="text-white/50 text-sm sm:text-base font-semibold">
                    Corps Officers &amp; Youth Pastoral Leadership
                  </p>
                </div>
                <div className="pt-6 border-t border-white/10 flex items-center justify-between mt-6 sm:mt-0">
                  <span className="font-extrabold uppercase tracking-wider text-xs text-white/40">Hosts &amp; Pastoral Care</span>
                  <div className="p-2 sm:p-2.5 rounded-full bg-[#D92B27]/20">
                    <ChevronRight className="w-4 h-4 text-[#D92B27]" />
                  </div>
                </div>
              </motion.div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CONTACT — Full section
      ══════════════════════════════════════════════ */}
      <section id="contact" className="bg-white py-16 md:py-20 lg:py-24 xl:py-36 px-4 md:px-10">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 lg:gap-20 items-start">

            {/* Left sticky heading */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <Reveal>
                <p className="text-[#D92B27] font-black uppercase tracking-[0.3em] text-xs mb-5 flex items-center gap-2">
                  <span className="w-5 h-0.5 bg-[#D92B27] inline-block" />
                  Get In Touch
                </p>

                <h2
                  className="text-[#0A1128] uppercase leading-[0.88] font-black mb-6"
                  style={{
                    fontSize: 'clamp(40px, 7vw, 100px)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Let&apos;s<br />
                  <span className="text-[#D92B27]">Connect</span>
                </h2>

                <p className="text-base sm:text-lg text-[#0A1128]/55 leading-relaxed font-medium max-w-md">
                  Have a question about the retreat, registration, or anything
                  else? We&apos;d love to hear from you. Reach out to us and
                  we&apos;ll be happy to help.
                </p>
              </Reveal>
            </div>

            {/* Right: Contact details */}
            <div className="lg:col-span-7">
              <Reveal delay={0.1}>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* Email */}
                  <a
                    href="mailto:your@email.com"
                    className="group bg-[#0A1128] rounded-3xl p-6 sm:p-7 md:p-8 text-white hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-8 sm:mb-12">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FFE600] flex items-center justify-center text-[#0A1128]">
                        <Mail size={18} className="sm:w-5 sm:h-5" />
                      </div>
                      <ArrowUpRight
                        size={18}
                        className="text-white/40 group-hover:text-[#FFE600] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                      />
                    </div>

                    <p className="text-white/40 font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs mb-2">
                      Email Us
                    </p>

                    <p className="text-base sm:text-lg md:text-xl font-black break-all">
                      tsasionchurch76@gmail.com
                    </p>
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+919999999999"
                    className="group bg-[#D92B27] rounded-3xl p-6 sm:p-7 md:p-8 text-white hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-8 sm:mb-12">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FFE600] flex items-center justify-center text-[#0A1128]">
                        <Phone size={18} className="sm:w-5 sm:h-5" />
                      </div>
                      <ArrowUpRight
                        size={18}
                        className="text-white/50 group-hover:text-[#FFE600] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                      />
                    </div>

                    <p className="text-white/60 font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs mb-2">
                      Call Us
                    </p>

                    <p className="text-base sm:text-lg md:text-xl font-black">
                      +91 96002 08400
                    </p>
                    <p className="text-base sm:text-lg md:text-xl font-black">
                      +91 93243 42127
                    </p>
                    <p className="text-base sm:text-lg md:text-xl font-black">
                      +91 93232 45509
                    </p>
                  </a>

                </div>

                {/* Bottom contact note */}
                <div className="mt-6 sm:mt-8 border-l-4 border-[#FFE600] pl-4 sm:pl-5">
                  <p className="text-base sm:text-lg md:text-xl text-[#0A1128]/45 leading-relaxed font-medium">
                    We&apos;re here to help. Whether you&apos;re looking for
                    information about the retreat, registration, accommodation,
                    or anything else, feel free to reach out.
                  </p>
                </div>

                {/* Optional social/contact */}
                <div className="mt-6 sm:mt-8 flex flex-wrap gap-3">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-3 rounded-full border-2 border-[#0A1128]/10 hover:border-[#0A1128] text-[#0A1128] font-black uppercase tracking-widest text-[10px] sm:text-xs transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-3 rounded-full border-2 border-[#0A1128]/10 hover:border-[#0A1128] text-[#0A1128] font-black uppercase tracking-widest text-[10px] sm:text-xs transition-colors"
                  >
                    Facebook
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-3 rounded-full border-2 border-[#0A1128]/10 hover:border-[#0A1128] text-[#0A1128] font-black uppercase tracking-widest text-[10px] sm:text-xs transition-colors"
                  >
                    WhatsApp
                  </a>
                </div>

              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          DARK TICKER — Inverted marquee
      ══════════════════════════════════════════════ */}
      <div className="relative overflow-hidden border-y border-[#0A1128]/80 py-4 md:py-5 bg-[#0A1128]">
        <div className="animate-scroll flex gap-0 whitespace-nowrap" style={{ animationDirection: 'reverse', animationDuration: '25s' }}>
          {Array.from({ length: 2 }).flatMap((_, rep) =>
            ['Leadership Development', 'Purpose & Calling', 'Mental Health', 'Community Building', 'Apologetics', 'Global Mission', 'Worship & Prayer', 'Faith in Action'].map((t, i) => (
              <span key={`${rep}-${i}`} className="flex items-center mr-6 sm:mr-8">
                <span className={`font-black uppercase tracking-wide text-sm sm:text-base md:text-lg ${i % 3 === 0 ? 'text-[#D92B27]' : i % 3 === 1 ? 'text-white/60' : 'text-[#FFE600]'}`}>
                  {t}
                </span>
                <span className="mx-4 sm:mx-6 w-1 h-1 rounded-full inline-block bg-white/20 shrink-0" />
              </span>
            ))
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          PARTICIPATING CORPS — Full-bleed navy
      ══════════════════════════════════════════════ */}
      <section className="relative bg-[#0A1128] px-4 md:px-10 py-16 md:py-20 lg:py-36 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span
            className="font-black uppercase text-center leading-none text-white opacity-[0.025]"
            style={{ fontSize: 'clamp(50px, 15vw, 200px)' }}
          >
            TOGETHER
          </span>
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto">
          <Reveal>
            <p className="text-[#D92B27] font-black uppercase tracking-[0.3em] text-xs mb-5 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-[#D92B27]" />
              Participating Corps
            </p>
            <h2
              className="text-white uppercase leading-[0.88] font-black mb-10 md:mb-14"
              style={{ fontSize: 'clamp(36px, 7vw, 100px)', letterSpacing: '-0.02em' }}
            >
              We love<br />
              <span className="text-[#FFE600]">Collaborating</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              'Sion Tamil Corps', 'Mira Road Corps', 'Sion Home', 'Ambernath Corps',
              'Badlapur Corps', 'Bhandup Corps', 'Matunga Corps', 'Wadala Corps',
            ].map((church, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className={`py-4 sm:py-5 px-4 sm:px-6 rounded-2xl text-center font-black uppercase tracking-wide text-xs sm:text-sm transition-colors duration-300 ${
                  idx % 4 === 0 ? 'bg-[#D92B27] text-white' :
                  idx % 4 === 1 ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10' :
                  idx % 4 === 2 ? 'bg-[#FFE600] text-[#0A1128]' :
                  'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                }`}
              >
                {church}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          REGISTER CTA — Yellow full-bleed
      ══════════════════════════════════════════════ */}
      <section className="bg-[#FFE600] px-4 md:px-10 py-16 md:py-20 lg:py-28 relative overflow-hidden">
        {/* Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span
            className="font-black uppercase opacity-[0.06] text-center leading-none text-[#0A1128]"
            style={{ fontSize: 'clamp(60px, 16vw, 220px)' }}
          >
            DONATE
          </span>
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto">
          {/* Heading */}
          <div className="mb-10 md:mb-12">
            <p className="text-[#D92B27] font-black uppercase tracking-[0.3em] text-xs mb-5 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-[#D92B27]" />
              Support The Mission
            </p>

            <h2
              className="text-[#0A1128] uppercase leading-[0.88] font-black"
              style={{
                fontSize: 'clamp(40px, 8vw, 120px)',
                letterSpacing: '-0.02em',
              }}
            >
              Donate <br />
            </h2>

            <p className="mt-4 sm:mt-6 text-[#0A1128]/70 font-semibold text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
              Your generous contribution helps us empower young people,
              strengthen communities, and make this ministry possible.
            </p>
          </div>

          {/* Bank Details */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            <div className="bg-[#0A1128] rounded-3xl p-6 sm:p-7 md:p-10 text-white shadow-[0_15px_60px_rgba(10,17,40,0.2)]">
              <p className="text-[#FFE600] font-black uppercase tracking-[0.25em] text-[10px] sm:text-xs mb-6 sm:mb-8">
                Bank Details
              </p>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <p className="text-white/50 text-[10px] sm:text-xs uppercase tracking-widest font-bold mb-1">
                    Account Name
                  </p>
                  <p className="text-lg sm:text-xl md:text-2xl font-black">
                    YOUR ACCOUNT NAME
                  </p>
                </div>

                <div>
                  <p className="text-white/50 text-[10px] sm:text-xs uppercase tracking-widest font-bold mb-1">
                    Account Number
                  </p>
                  <p className="text-lg sm:text-xl md:text-2xl font-black tracking-wider">
                    XXXX XXXX XXXX
                  </p>
                </div>

                <div>
                  <p className="text-white/50 text-[10px] sm:text-xs uppercase tracking-widest font-bold mb-1">
                    Bank Name
                  </p>
                  <p className="text-lg sm:text-xl md:text-2xl font-black">
                    YOUR BANK NAME
                  </p>
                </div>

                <div>
                  <p className="text-white/50 text-[10px] sm:text-xs uppercase tracking-widest font-bold mb-1">
                    IFSC Code
                  </p>
                  <p className="text-lg sm:text-xl md:text-2xl font-black tracking-wider">
                    XXXXX000000
                  </p>
                </div>

                <div>
                  <p className="text-white/50 text-[10px] sm:text-xs uppercase tracking-widest font-bold mb-1">
                    Branch
                  </p>
                  <p className="text-lg sm:text-xl md:text-2xl font-black">
                    YOUR BRANCH
                  </p>
                </div>
              </div>
            </div>

            {/* Donation Message */}
            <div className="bg-white/50 border-2 border-[#0A1128]/10 rounded-3xl p-6 sm:p-7 md:p-10 flex flex-col justify-between">
              <div>
                <p className="text-[#D92B27] font-black uppercase tracking-[0.25em] text-[10px] sm:text-xs mb-6">
                  Every Contribution Matters
                </p>

                <h3 className="text-[#0A1128] font-black uppercase text-2xl sm:text-3xl md:text-5xl leading-[0.95]">
                  Be Part Of
                  <br />
                  <span className="text-[#D92B27]">The Movement.</span>
                </h3>

                <p className="mt-4 sm:mt-6 text-[#0A1128]/65 font-semibold leading-relaxed max-w-lg text-sm sm:text-base">
                  You can support the ministry by transferring your contribution
                  directly to the bank account above. Thank you for partnering
                  with us and investing in the next generation.
                </p>
              </div>

              <div className="mt-8 sm:mt-10 pt-6 border-t border-[#0A1128]/10">
                <p className="text-[#0A1128]/50 text-[10px] sm:text-xs uppercase tracking-widest font-bold mb-2">
                  Reference
                </p>
                <p className="text-[#0A1128] font-black text-base sm:text-lg">
                  Youth Retreat 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}