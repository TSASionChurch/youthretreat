import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, MapPin, Calendar, Clock, User, Users,
  Sparkles, Navigation, ExternalLink, ChevronRight,
  Shield, Heart, Mail, ArrowUpRight, Phone, CheckCircle2
} from 'lucide-react';
import EventTimer from '../components/EventTimer';

/* ── Scroll Reveal Wrapper ───────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  key?: React.Key;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Marquee Ticker Strip ───────────────────────────────── */
function RetreatMarquee() {
  const items = [
    'YOUTH RETREAT 2026',
    'OCTOBER 02, 2026',
    'EMPOWERING GENERATIONS',
    'MUMBAI DIVISION',
    'FAITH & LEADERSHIP',
    'WORSHIP & PRAISE',
  ];
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div className="overflow-hidden bg-[#FFE600] py-3.5 border-y border-[#222d61]/20 select-none">
      <motion.div
        className="flex items-center whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, repeatType: 'loop', duration: 180, ease: 'linear' }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 text-[#222d61] font-oswald font-bold uppercase text-xs sm:text-sm tracking-[0.2em] px-6">
            <span>{item}</span>
            <span className="text-[#D92B27] text-[10px]">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Retreat() {
  const mapUrl = 'https://maps.app.goo.gl/FopB2t33gXKW2yux7';
  const embedMapUrl =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4233.320311454406!2d72.8571873112368!3d19.033723482087858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c92a7019f37d%3A0xbf05632e51e35ef6!2sSalvation%20Army%20Tamil%20Church%2C%20Women%20And%20Children%20Home!5e1!3m2!1sen!2sin!4v1787584878953!5m2!1sen!2sin';

  return (
    <div className="w-full overflow-x-hidden bg-[#222d61] font-archivo text-white">

      {/* ══════════════════════════════════════════════
          1. HERO — Single Clash Display Font (No Dual Font)
      ══════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex flex-col justify-center px-6 md:px-12 pt-28 pb-20 overflow-hidden bg-[#222d61]">

        {/* Dynamic Pattern Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'radial-gradient(#FFE600 1px, transparent 1px)',
              backgroundSize: '36px 36px',
            }}
          />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 40px)',
            }}
          />
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#FFE600]/10 blur-3xl" />
          <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] rounded-full bg-[#D92B27]/15 blur-3xl" />
        </div>

        <div className="max-w-[1600px] mx-auto w-full relative z-10">

          {/* Top Tag */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-3 mb-8"
          >
            <span className="p-2 rounded-full bg-[#FFE600] text-[#222d61]">
              <Sparkles size={14} />
            </span>
            <span className="font-tech text-xs font-bold text-[#FFE600] uppercase tracking-[0.25em]">
              SAY YOUTH MINISTRY &bull; ANNUAL RETREAT 2026
            </span>
          </motion.div>

          {/* Single Clash Display Headline */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-oswald font-bold text-white uppercase leading-[0.85]"
              style={{ fontSize: 'clamp(52px, 10.5vw, 170px)', letterSpacing: '-0.02em' }}
            >
              EMPOWERING
            </motion.h1>
          </div>

          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-oswald font-bold text-[#FFE600] uppercase leading-[0.85]"
              style={{ fontSize: 'clamp(52px, 10.5vw, 170px)', letterSpacing: '-0.02em' }}
            >
              GENERATIONS 2026
            </motion.h1>
          </div>

          {/* Subtitle & Actions Bar */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-t border-white/15 pt-8"
          >
            <div className="lg:col-span-7">
              <p className="font-archivo text-white/80 text-lg sm:text-xl font-normal leading-relaxed max-w-2xl">
                A strategic one-day youth retreat bringing together young believers from corps across Mumbai for an empowering encounter with God, leadership training, and vibrant fellowship.
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                to="/register"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#FFE600] hover:bg-[#D92B27] text-[#222d61] hover:text-white font-tech font-bold uppercase tracking-widest text-xs transition-all duration-300 shadow-xl"
              >
                <span>REGISTER NOW</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="flex items-center gap-2 font-tech text-xs font-bold text-white/60 uppercase tracking-widest">
                <Calendar size={14} className="text-[#FFE600]" />
                <span>OCT 02, 2026 &bull; MUMBAI</span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── Marquee Ticker ───────────────────────────────────── */}
      <RetreatMarquee />

      {/* ══════════════════════════════════════════════
          2. DEDICATED RETREAT EVENT TIMER
      ══════════════════════════════════════════════ */}
      <section className="py-12 px-6 md:px-12 bg-[#182046]">
        <div className="max-w-[1600px] mx-auto">
          <EventTimer variant="retreat" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          3. RETREAT THEMES & FOCUS AREAS (Lighter Sub-header Weight)
      ══════════════════════════════════════════════ */}
      <section className="py-20 px-6 md:px-12 bg-[#222d61] relative">
        <div className="max-w-[1600px] mx-auto">
          
          <Reveal className="mb-14">
            <div className="flex items-center gap-3 mb-4 font-tech text-xs font-bold text-[#FFE600] uppercase tracking-[0.25em]">
              <span className="w-6 h-px bg-[#FFE600]" />
              <span>KEY RETREAT PILLARS</span>
            </div>
            <h2
              className="font-oswald font-bold uppercase text-white leading-none"
              style={{ fontSize: 'clamp(36px, 5.5vw, 84px)' }}
            >
              FOCUS THEMES
            </h2>
          </Reveal>

          {/* Patterned Grid Cards with Reduced Sub-header Font Weight */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                num: '01',
                title: 'LEADERSHIP DEVELOPMENT',
                desc: 'Equipping young people with biblical wisdom, ethical courage, and practical tools to lead in their churches and workplaces.',
              },
              {
                num: '02',
                title: 'PURPOSE & CALLING',
                desc: 'Helping youth discern God\'s purpose for their lives and step boldly into their divine calling with faith and conviction.',
              },
              {
                num: '03',
                title: 'WORSHIP & FELLOWSHIP',
                desc: 'Spirit-filled Tamil praise, intercessory prayer sessions, and building lifelong bonds of Christian unity.',
              },
              {
                num: '04',
                title: 'MENTAL HEALTH & WELLNESS',
                desc: 'Addressing emotional resilience, stress, and mental well-being from a compassionate biblical worldview.',
              },
              {
                num: '05',
                title: 'COMMUNITY IMPACT',
                desc: 'Mobilizing youth for compassionate social action, healthcare initiatives, and benevolent community outreach.',
              },
              {
                num: '06',
                title: 'APOLOGETICS & FAITH',
                desc: 'Grounding young minds in scripture to defend their faith with clarity, grace, and intellectual confidence.',
              },
            ].map((pillar, idx) => (
              <Reveal key={idx} delay={idx * 0.05}>
                <div className="bg-[#182046] border border-white/15 p-8 rounded-2xl h-full flex flex-col justify-between group hover:border-[#FFE600] transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-4 right-6 font-oswald font-bold text-white/10 text-6xl group-hover:text-[#FFE600]/20 transition-colors">
                    {pillar.num}
                  </div>
                  <div>
                    <span className="font-tech text-[10px] font-medium text-[#FFE600] uppercase tracking-widest block mb-4">
                      // PILLAR {pillar.num}
                    </span>
                    {/* Sub-header with decreased font weight (font-semibold instead of font-bold) */}
                    <h3 className="font-oswald font-semibold uppercase text-white group-hover:text-[#FFE600] text-xl leading-tight mb-3 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="font-archivo text-white/70 text-sm leading-relaxed font-normal">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════
          4. WHEN & WHERE (Venue & Map)
      ══════════════════════════════════════════════ */}
      <section id="venue" className="py-20 px-6 md:px-12 bg-[#182046] border-t border-b border-white/10">
        <div className="max-w-[1600px] mx-auto">

          <Reveal className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4 font-tech text-xs font-bold text-[#FFE600] uppercase tracking-[0.25em]">
                <span className="w-6 h-px bg-[#FFE600]" />
                <span>VENUE DETAILS</span>
              </div>
              <h2
                className="font-oswald font-bold uppercase text-white leading-none"
                style={{ fontSize: 'clamp(36px, 5.5vw, 84px)' }}
              >
                LOCATION &amp; MAP
              </h2>
            </div>
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFE600] text-[#222d61] font-tech font-bold text-xs uppercase tracking-widest hover:bg-[#D92B27] hover:text-white transition-all duration-300 self-start md:self-auto"
            >
              <Navigation size={14} />
              <span>GET DIRECTIONS</span>
              <ExternalLink size={12} className="group-hover:rotate-12 transition-transform" />
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-[#222d61] border border-white/15 overflow-hidden rounded-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-12">

                {/* Left Venue Details */}
                <div className="lg:col-span-6 p-8 md:p-12 flex flex-col justify-between gap-8 border-b lg:border-b-0 lg:border-r border-white/15">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFE600] text-[#222d61] font-tech text-[10px] font-bold uppercase tracking-widest mb-6">
                      <MapPin size={12} />
                      <span>OFFICIAL RETREAT VENUE</span>
                    </div>

                    {/* Sub-header font weight reduced */}
                    <h3
                      className="font-oswald font-semibold uppercase text-white leading-tight mb-4"
                      style={{ fontSize: 'clamp(26px, 3.5vw, 48px)' }}
                    >
                      SALVATION ARMY TAMIL CHURCH SION
                    </h3>

                    <p className="font-archivo text-white/70 text-base leading-relaxed font-normal flex items-start gap-2">
                      <MapPin size={16} className="text-[#FFE600] mt-1 shrink-0" />
                      <span>
                        6, First Floor, Plot No, 60 Feet Road, <br />
                        Opposite Manav Seva Sangh, Sion East, <br />
                        Sion, Mumbai, Maharashtra 400022
                      </span>
                    </p>
                  </div>

                  {/* Date & Time Block */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-6 bg-[#FFE600] text-[#222d61] rounded-xl">
                      <div className="flex items-center gap-2 mb-2 font-tech text-[10px] font-bold uppercase tracking-widest">
                        <Calendar size={14} />
                        <span>DATE</span>
                      </div>
                      <p className="font-oswald font-semibold text-lg uppercase leading-tight">
                        FRIDAY,<br />OCT 02, 2026
                      </p>
                    </div>

                    <div className="p-6 bg-white/10 border border-white/15 text-white rounded-xl">
                      <div className="flex items-center gap-2 mb-2 font-tech text-[10px] font-bold uppercase tracking-widest text-[#FFE600]">
                        <Clock size={14} />
                        <span>TIMINGS</span>
                      </div>
                      <p className="font-oswald font-semibold text-lg uppercase leading-tight text-white">
                        9:00 AM &ndash;<br />6:00 PM
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Interactive Embedded Map */}
                <div className="lg:col-span-6 relative min-h-[400px]">
                  <iframe
                    title="Salvation Army Tamil Church Sion Location"
                    src={embedMapUrl}
                    className="w-full h-full min-h-[400px] border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ══════════════════════════════════════════════
          5. SPEAKERS & LEADERSHIP
      ══════════════════════════════════════════════ */}
      <section id="speakers" className="py-20 px-6 md:px-12 bg-[#222d61]">
        <div className="max-w-[1600px] mx-auto">

          <Reveal className="mb-12">
            <div className="flex items-center gap-3 mb-4 font-tech text-xs font-bold text-[#FFE600] uppercase tracking-[0.25em]">
              <span className="w-6 h-px bg-[#FFE600]" />
              <span>RETREAT SPEAKERS</span>
            </div>
            <h2
              className="font-oswald font-bold uppercase text-white leading-none"
              style={{ fontSize: 'clamp(36px, 5.5vw, 84px)' }}
            >
              FEATURED SPEAKERS
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Keynote Card */}
            <Reveal delay={0}>
              <div className="bg-[#D92B27] text-white p-8 md:p-12 rounded-2xl flex flex-col justify-between min-h-[340px] shadow-xl relative overflow-hidden">
                <span className="font-oswald font-bold text-white/10 text-8xl absolute top-4 right-6 pointer-events-none select-none">
                  01
                </span>
                <div>
                  <span className="font-tech text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-white/20 text-white rounded-full inline-block mb-6">
                    KEYNOTE SPEAKER
                  </span>
                  {/* Sub-header font weight set to font-semibold */}
                  <h3 className="font-oswald font-semibold uppercase text-white text-2xl md:text-4xl leading-tight mb-3">
                    PASTOR GUEST SPEAKER
                  </h3>
                  <p className="font-archivo text-white/80 text-base font-normal">
                    Anointed Keynote &amp; Inspirational Message
                  </p>
                </div>
                <div className="pt-6 border-t border-white/20 flex items-center justify-between mt-6 font-tech text-xs uppercase tracking-wider">
                  <span>SPECIAL MINISTRY SESSION</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            </Reveal>

            {/* Corps Officers Card */}
            <Reveal delay={0.12}>
              <div className="bg-[#182046] border border-white/15 text-white p-8 md:p-12 rounded-2xl flex flex-col justify-between min-h-[340px] shadow-xl relative overflow-hidden">
                <span className="font-oswald font-bold text-white/10 text-8xl absolute top-4 right-6 pointer-events-none select-none">
                  02
                </span>
                <div>
                  <span className="font-tech text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-[#FFE600] text-[#222d61] rounded-full inline-block mb-6">
                    CORPS OFFICERS
                  </span>
                  {/* Sub-header font weight set to font-semibold */}
                  <h3 className="font-oswald font-semibold uppercase text-white text-xl md:text-3xl leading-tight mb-3">
                    CAPT JEBERSON PAUL &amp; CAPT MUTHUSELVI JEBERSON
                  </h3>
                  <p className="font-archivo text-white/70 text-base font-normal">
                    Corps Officers &amp; Youth Pastoral Leadership
                  </p>
                </div>
                <div className="pt-6 border-t border-white/15 flex items-center justify-between mt-6 font-tech text-xs uppercase tracking-wider text-white/50">
                  <span>HOSTS &amp; PASTORAL CARE</span>
                  <ChevronRight size={16} className="text-[#FFE600]" />
                </div>
              </div>
            </Reveal>

          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════
          6. PARTICIPATING CORPS (Yellow Section)
      ══════════════════════════════════════════════ */}
      <section className="py-20 px-6 md:px-12 bg-[#FFE600] text-[#222d61] relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto relative z-10">

          <Reveal className="mb-12">
            <div className="flex items-center gap-3 mb-4 font-tech text-xs font-bold uppercase tracking-[0.25em] text-[#222d61]">
              <span className="w-6 h-px bg-[#222d61]" />
              <span>PARTICIPATING CORPS</span>
            </div>
            <h2
              className="font-oswald font-bold uppercase leading-none text-[#222d61]"
              style={{ fontSize: 'clamp(36px, 6vw, 90px)' }}
            >
              CHURCH PARTNERS
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              'SION TAMIL CORPS', 'MIRA ROAD CORPS', 'SION HOME', 'AMBERNATH CORPS',
              'BADLAPUR CORPS', 'BHANDUP CORPS', 'MATUNGA CORPS', 'WADALA CORPS',
            ].map((church, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="p-5 bg-[#222d61] text-white rounded-xl text-center font-oswald font-semibold uppercase tracking-wider text-xs sm:text-sm shadow-md flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={16} className="text-[#FFE600] shrink-0" />
                <span>{church}</span>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════
          7. REGISTRATION CTA BANNER
      ══════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-12 bg-[#182046] text-white text-center relative overflow-hidden border-t border-white/10">
        <div className="max-w-4xl mx-auto relative z-10">
          <Reveal>
            <span className="font-tech text-xs font-bold uppercase tracking-[0.3em] text-[#FFE600] block mb-4">
              // JOIN US ON OCT 02, 2026
            </span>
            <h2
              className="font-oswald font-bold uppercase leading-tight text-white mb-6"
              style={{ fontSize: 'clamp(36px, 6vw, 90px)' }}
            >
              READY TO REGISTER?
            </h2>
            <p className="font-archivo text-white/70 text-base md:text-xl font-normal leading-relaxed mb-10 max-w-2xl mx-auto">
              Secure your spot for the Youth Retreat 2026. Registration is open to all youth members and young leaders across Mumbai.
            </p>
            
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link
                to="/register"
                className="group inline-flex items-center gap-3 px-10 py-5 bg-[#D92B27] hover:bg-[#FFE600] text-white hover:text-[#222d61] font-tech font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-2xl rounded-full"
              >
                <span>REGISTER ONLINE NOW</span>
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-10 py-5 border border-white/20 hover:border-white text-white font-tech font-bold text-xs uppercase tracking-widest transition-all rounded-full"
              >
                <span>CONTACT US</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}