import React from 'react';
import { motion } from 'motion/react';
import { Shield, Sparkles, Calendar, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const GALLERY = [
  { src: '/yr.jpg',        alt: 'Youth Group Retreat' },
  { src: '/yg2.webp',      alt: 'Youth Retreat Worship Session' },
  { src: '/yg3.webp',      alt: 'SAY Group Fellowship' },
  { src: '/DSC_0004.webp', alt: 'SAY Group Congregation' },
];

const META = [
  { icon: <Shield size={16} />,   label: 'Name',       value: 'SAY (Salvation Army Youth)' },
  { icon: <Calendar size={16} />, label: 'Founded',     value: '2008 · Sion, Mumbai' },
  { icon: <Clock size={16} />,    label: 'Meets',       value: 'Every Saturday at 4:00 PM' },
  { icon: <MapPin size={16} />,   label: 'Venue',       value: 'TSA Sion Church Sanctuary' },
];

const SECTIONS = [
  {
    heading: 'A Legacy of Faith and Service',
    body: 'Since its formation in 2008, the SAY Group has been a vital part of the Salvation Army Church Tamil Sion, focusing on empowering youth through spiritual growth and community service. Our journey reflects a commitment to nurturing the next generation in faith, action, and fellowship.',
    large: true,
  },
  {
    heading: 'Community Service Initiatives',
    body: 'The SAY Group actively participates in community service, organising events such as medical camps that provide essential healthcare services to those in need. Our commitment to serving others reflects the core values of our faith and strengthens our community ties.',
  },
  {
    heading: 'Youth Retreats & Spiritual Growth',
    body: 'Annual retreats offer young members a chance to deepen their faith and connect with each other. These retreats provide spiritual nourishment while fostering a sense of belonging and camaraderie among participants from different corps across Mumbai.',
  },
  {
    heading: 'Saturday Prayer Gatherings',
    body: 'Every Saturday, we gather for prayer and reflection — a space for community bonding, mutual support, and seeking guidance in our faith journeys together.',
  },
  {
    heading: 'Christmas Crib Decoration',
    body: 'Each year, our youth design and construct a stunning Christmas nativity crib that becomes a cherished public attraction, drawing neighbours and visitors alike to the church.',
  },
  {
    heading: 'Looking Ahead',
    body: 'As we move forward, the SAY Group remains committed to service, fellowship, and spiritual growth. We invite all young people to join us in making a positive impact in the community.',
  },
];

export default function Youth() {
  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen text-[#0A1128] noise pb-24">

      {/* ── Page header ─────────────────────────────────── */}
      <section className="relative bg-white pt-24 pb-16 px-4 md:px-10 border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -bottom-24 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#FFE600]/5 via-transparent to-transparent rounded-full blur-3xl" />
        </div>
        <div className="max-w-[1600px] mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles size={14} className="text-[#D92B27]" />
            <span className="text-[#D92B27] font-black uppercase tracking-[0.25em] text-xs">Youth Ministry</span>
          </motion.div>

          <div className="overflow-hidden mb-1">
            <motion.h1
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#0A1128] uppercase leading-[0.9] font-black"
              style={{ fontSize: 'clamp(32px, 6vw, 80px)', letterSpacing: '-0.02em' }}
            >
              SAY Group
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#D92B27] uppercase font-black text-2xl sm:text-3xl md:text-4xl tracking-tight"
            >
              Empowering Youth Since 2008
            </motion.h2>
          </div>
        </div>
      </section>

      {/* ── Body ──────────────────────────────────────────── */}
      <section className="py-16 md:py-24 px-4 md:px-10">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left sticky meta panel */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm"
            >
              <h3 className="text-sm font-black uppercase text-[#0A1128] border-b border-slate-100 pb-4 mb-6 tracking-widest">
                Ministry Profile
              </h3>

              <div className="space-y-5">
                {META.map((m, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-[#D92B27] shrink-0">
                      {m.icon}
                    </div>
                    <div>
                      <span className="block text-[9px] font-black uppercase text-slate-400 tracking-wider">{m.label}</span>
                      <span className="text-sm font-bold text-[#0A1128]">{m.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <Link
                  to="/retreat"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#0A1128] hover:bg-[#D92B27] text-white text-[10px] font-black uppercase tracking-widest transition-colors duration-300"
                >
                  <Sparkles size={11} className="text-[#FFE600]" />
                  <span>Youth Retreat 2026 Info</span>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right content column */}
          <div className="lg:col-span-8 space-y-10">

            {/* ── Photo gallery — full images, no crop ── */}
            <div className="grid grid-cols-2 gap-4">
              {GALLERY.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.55 }}
                  className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm group flex items-center justify-center p-2"
                  style={{ aspectRatio: '4/3' }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    width="1000"
                    height="750"
                    className="max-w-full max-h-full object-contain relative z-10 group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </div>

            {/* ── Article body ── */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8">
              {SECTIONS.map((s, i) => (
                <div key={i}>
                  <h3 className="text-lg sm:text-xl font-black uppercase text-[#0A1128] tracking-tight mb-3">
                    {s.heading}
                  </h3>
                  <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-medium">
                    {s.large && (
                      <span className="float-left text-5xl font-black text-[#D92B27] mr-3 mt-1 leading-none">
                        {s.body[0]}
                      </span>
                    )}
                    {s.large ? s.body.slice(1) : s.body}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
