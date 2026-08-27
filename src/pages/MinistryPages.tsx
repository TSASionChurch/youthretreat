import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Heart, Star, Shield, BookOpen, ChevronRight } from 'lucide-react';

function Reveal({ children, delay = 0, className = '', direction = 'up' }: {
  children: React.ReactNode; delay?: number; className?: string;
  direction?: 'up' | 'left' | 'right';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const v = {
    up:    { hidden: { opacity: 0, y: 40  }, visible: { opacity: 1, y: 0 } },
    left:  { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 40  }, visible: { opacity: 1, x: 0 } },
  };
  return (
    <motion.div ref={ref} initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={v[direction]}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const LOREM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`;

const LOREM_SHORT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;

interface MinistryPageProps {
  badge: string;
  title: string;
  subtitle: string;
  heroImg: string;
  icon: React.ReactNode;
  accentColor?: string;
  pillars: { icon: React.ReactNode; title: string; desc: string }[];
  galleryImgs?: string[];
}

function MinistryPageTemplate({
  badge, title, subtitle, heroImg, icon, pillars, galleryImgs = [],
}: MinistryPageProps) {
  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen text-[#0A1128] pb-24">

      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative bg-white pt-24 pb-0 border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D92B27]/3 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="max-w-[1600px] mx-auto px-6 md:px-10 pt-10 pb-16 relative z-10">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-5"
          >
            <Link to="/ministries" className="text-slate-400 hover:text-[#D92B27] text-xs font-black uppercase tracking-widest transition-colors flex items-center gap-1">
              Ministries <ChevronRight size={11} />
            </Link>
            <span className="text-[#D92B27] font-black uppercase tracking-[0.25em] text-xs">{badge}</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <div className="overflow-hidden mb-2">
                <motion.h1
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[#0A1128] uppercase leading-none font-black"
                  style={{ fontSize: 'clamp(34px, 6vw, 88px)', letterSpacing: '-0.02em', fontFamily: 'Unbounded' }}
                >
                  {title}
                </motion.h1>
              </div>
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                className="text-slate-500 text-base sm:text-lg font-medium max-w-2xl mt-6 leading-relaxed"
              >
                {subtitle}
              </motion.p>
            </div>

            <div className="lg:col-span-5 flex justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="w-full max-w-sm aspect-square bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 shadow-sm flex items-center justify-center p-4"
              >
                <img src={heroImg} alt={title} width="1920" height="1271" loading="lazy" decoding="async" className="max-w-full max-h-full object-contain rounded-2xl" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About ───────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-10 bg-white border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <Reveal direction="left" className="lg:col-span-5">
            <p className="text-[#D92B27] font-black uppercase tracking-[0.25em] text-xs mb-4 flex items-center gap-2">
              <span className="w-5 h-[1.5px] bg-[#D92B27]" /> About This Ministry
            </p>
            <h2 className="font-bold uppercase leading-tight tracking-tighter text-[#0A1128] mb-6"
              style={{ fontSize: 'clamp(24px, 3.5vw, 48px)', fontFamily: 'Unbounded' }}>
              Who We Are
            </h2>
            <div className="w-12 h-12 rounded-2xl bg-[#D92B27]/8 border border-[#D92B27]/15 flex items-center justify-center text-[#D92B27] mb-6">
              {icon}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <p className="text-slate-600 text-base leading-relaxed font-medium mb-5">{LOREM}</p>
            <p className="text-slate-500 text-sm leading-relaxed font-medium mb-5">{LOREM}</p>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">{LOREM_SHORT}</p>
          </Reveal>
        </div>
      </section>

      {/* ── Pillars ──────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-[1600px] mx-auto">
          <Reveal className="mb-14 text-center">
            <p className="text-[#D92B27] font-black uppercase tracking-[0.25em] text-xs mb-3">What We Do</p>
            <h2 className="font-bold uppercase leading-tight tracking-tighter text-[#0A1128]"
              style={{ fontSize: 'clamp(26px, 4vw, 60px)', fontFamily: 'Unbounded' }}>
              Our Focus Areas
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="bg-white rounded-3xl border border-slate-200 p-7 hover:border-[#D92B27]/30 hover:shadow-[0_12px_40px_rgba(10,17,40,0.06)] transition-all duration-400 group">
                  <div className="w-11 h-11 rounded-xl bg-[#D92B27]/8 border border-[#D92B27]/15 flex items-center justify-center text-[#D92B27] mb-5 group-hover:bg-[#D92B27] group-hover:text-white transition-all duration-300">
                    {p.icon}
                  </div>
                  <h3 className="font-black uppercase text-sm tracking-tight text-[#0A1128] mb-3">{p.title}</h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery (if images provided) ──────────────────── */}
      {galleryImgs.length > 0 && (
        <section className="py-20 px-6 md:px-10 bg-white border-y border-slate-200">
          <div className="max-w-[1600px] mx-auto">
            <Reveal className="mb-12">
              <h2 className="font-bold uppercase tracking-tighter text-[#0A1128]"
                style={{ fontSize: 'clamp(24px, 3.5vw, 52px)', fontFamily: 'Unbounded' }}>
                Gallery
              </h2>
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImgs.map((src, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="aspect-video bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 flex items-center justify-center p-2">
                    <img src={src} alt={`Gallery ${i + 1}`} width="1920" height="1271" loading="lazy" decoding="async" className="max-w-full max-h-full object-contain rounded-xl" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Lorem content block ──────────────────────────── */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {[0, 1].map((i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="bg-white rounded-3xl border border-slate-200 p-8">
                <h3 className="font-black uppercase text-sm tracking-tight text-[#D92B27] mb-1">
                  {i === 0 ? 'Our Vision' : 'How To Join'}
                </h3>
                <h4 className="font-bold uppercase text-base tracking-tight text-[#0A1128] mb-4"
                  style={{ fontFamily: 'Unbounded' }}>
                  {i === 0 ? 'Purpose & Mission' : 'Get Involved'}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed font-medium mb-3">{LOREM}</p>
                <p className="text-slate-400 text-xs leading-relaxed font-medium">{LOREM_SHORT}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-10 bg-[#0A1128]">
        <div className="max-w-[1600px] mx-auto text-center">
          <Reveal>
            <p className="text-white/40 font-black uppercase tracking-[0.25em] text-xs mb-4">Join Us</p>
            <h2 className="text-white font-bold uppercase leading-tight tracking-tighter mb-6"
              style={{ fontSize: 'clamp(26px, 4vw, 64px)', fontFamily: 'Unbounded' }}>
              Be Part Of<br /><span className="text-[#FFE600]">This Ministry</span>
            </h2>
            <p className="text-white/50 text-base font-medium max-w-lg mx-auto mb-8">{LOREM_SHORT}</p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link to="/contact" className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#D92B27] hover:bg-white text-white hover:text-[#0A1128] font-black uppercase text-xs tracking-widest transition-all duration-300">
                Contact Us <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link to="/ministries" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 hover:border-white text-white/70 hover:text-white font-black uppercase text-xs tracking-widest transition-all duration-300">
                All Ministries
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}

/* ─────────────────────────────── INDIVIDUAL PAGES ──────────────────────────── */

export function SAYYouthPage() {
  return <MinistryPageTemplate
    badge="Youth Ministry"
    title="SAY Youth Group"
    subtitle="The Salvation Army Youth group (SAY) is a vibrant fellowship of young believers growing together in faith, service, and community — every Saturday and beyond."
    heroImg="/DSC_0004.webp"
    icon={<Users size={22} />}
    galleryImgs={['/DSC_0004.webp', '/DSC_0006.webp', '/DSC_0001.webp']}
    pillars={[
      { icon: <BookOpen size={18} />, title: 'Saturday Fellowships', desc: LOREM_SHORT },
      { icon: <Heart size={18} />,    title: 'Community Service',    desc: LOREM_SHORT },
      { icon: <Star size={18} />,     title: 'Spiritual Growth',     desc: LOREM_SHORT },
      { icon: <Users size={18} />,    title: 'Prayer Circles',       desc: LOREM_SHORT },
      { icon: <Shield size={18} />,   title: 'Medical Camps',        desc: LOREM_SHORT },
      { icon: <BookOpen size={18} />, title: 'Bible Quiz & Drama',   desc: LOREM_SHORT },
    ]}
  />;
}

export function JuniorHomeLeaguePage() {
  return <MinistryPageTemplate
    badge="Girls Ministry"
    title="Junior Home League"
    subtitle="Nurturing young girls in faith, life skills, fellowship, and service — helping them build a strong spiritual and ethical foundation for lifelong service."
    heroImg="/DSC_0006.webp"
    icon={<Heart size={22} />}
    galleryImgs={['/DSC_0006.webp', '/DSC_0003.webp']}
    pillars={[
      { icon: <Heart size={18} />,    title: 'Faith Formation',    desc: LOREM_SHORT },
      { icon: <Users size={18} />,    title: 'Fellowship',         desc: LOREM_SHORT },
      { icon: <Star size={18} />,     title: 'Life Skills',        desc: LOREM_SHORT },
      { icon: <Shield size={18} />,   title: 'Community Service',  desc: LOREM_SHORT },
      { icon: <BookOpen size={18} />, title: 'Scripture Study',    desc: LOREM_SHORT },
      { icon: <Heart size={18} />,    title: 'Character Building', desc: LOREM_SHORT },
    ]}
  />;
}

export function HomeLeaguePage() {
  return <MinistryPageTemplate
    badge="Women's Ministry"
    title={`Home League\nWomen`}
    subtitle="A vital women's ministry focused on fellowship, community outreach, and mutual support — helping ladies make an impact in their homes and neighborhoods."
    heroImg="/DSC_0811.webp"
    icon={<Heart size={22} />}
    galleryImgs={['/DSC_0811.webp', '/DSC_0002.webp']}
    pillars={[
      { icon: <Heart size={18} />,    title: 'Women\'s Fellowship',  desc: LOREM_SHORT },
      { icon: <Users size={18} />,    title: 'Community Outreach',   desc: LOREM_SHORT },
      { icon: <Star size={18} />,     title: 'Mutual Support',       desc: LOREM_SHORT },
      { icon: <Shield size={18} />,   title: 'Home & Family',        desc: LOREM_SHORT },
      { icon: <BookOpen size={18} />, title: 'Bible Sessions',       desc: LOREM_SHORT },
      { icon: <Heart size={18} />,    title: 'Prayer Network',       desc: LOREM_SHORT },
    ]}
  />;
}

export function ChildrensMinistriesPage() {
  return <MinistryPageTemplate
    badge="Children's Ministry"
    title="Children's Ministries"
    subtitle="Providing a fun, engaging, and safe environment for children during Sunday school — fostering early faith and learning Bible values in creative ways."
    heroImg="/DSC_0003.webp"
    icon={<Star size={22} />}
    galleryImgs={['/DSC_0003.webp', '/DSC_0001.webp', '/DSC_0006.webp']}
    pillars={[
      { icon: <BookOpen size={18} />, title: 'Sunday School',       desc: LOREM_SHORT },
      { icon: <Star size={18} />,     title: 'Creative Worship',    desc: LOREM_SHORT },
      { icon: <Heart size={18} />,    title: 'Bible Stories',       desc: LOREM_SHORT },
      { icon: <Users size={18} />,    title: 'Group Activities',    desc: LOREM_SHORT },
      { icon: <Shield size={18} />,   title: 'Safe Environment',    desc: LOREM_SHORT },
      { icon: <Star size={18} />,     title: 'Seasonal Programs',   desc: LOREM_SHORT },
    ]}
  />;
}

export function MedicalFellowshipPage() {
  return <MinistryPageTemplate
    badge="Healthcare Ministry"
    title="Medical Fellowship"
    subtitle="Mobilizing healthcare professionals and volunteers within the corps to run medical checkup camps and health initiatives for those in need across Mumbai."
    heroImg="/choir.webp"
    icon={<Shield size={22} />}
    galleryImgs={['/choir.webp', '/DSC_0002.webp']}
    pillars={[
      { icon: <Shield size={18} />,   title: 'Medical Checkup Camps', desc: LOREM_SHORT },
      { icon: <Heart size={18} />,    title: 'Health Awareness',      desc: LOREM_SHORT },
      { icon: <Users size={18} />,    title: 'Volunteer Network',     desc: LOREM_SHORT },
      { icon: <Star size={18} />,     title: 'Community Health',      desc: LOREM_SHORT },
      { icon: <BookOpen size={18} />, title: 'Counseling Support',    desc: LOREM_SHORT },
      { icon: <Shield size={18} />,   title: 'Emergency Aid',         desc: LOREM_SHORT },
    ]}
  />;
}

export function SundayWorshipPage() {
  return <MinistryPageTemplate
    badge="Worship Services"
    title="Sunday Worship"
    subtitle="Our weekly Holiness and worship services bringing the congregation together in praise, Scripture teaching, and corporate prayer every Sunday at 10:30 AM."
    heroImg="/DSC_0002.webp"
    icon={<BookOpen size={22} />}
    galleryImgs={['/DSC_0002.webp', '/DSC_0006.webp', '/DSC_0004.webp']}
    pillars={[
      { icon: <BookOpen size={18} />, title: 'Holiness Meeting',   desc: LOREM_SHORT },
      { icon: <Heart size={18} />,    title: 'Corporate Prayer',   desc: LOREM_SHORT },
      { icon: <Star size={18} />,     title: 'Praise & Worship',   desc: LOREM_SHORT },
      { icon: <Users size={18} />,    title: 'Testimonies',        desc: LOREM_SHORT },
      { icon: <Shield size={18} />,   title: 'Scripture Teaching', desc: LOREM_SHORT },
      { icon: <BookOpen size={18} />, title: 'Evening Class',      desc: LOREM_SHORT },
    ]}
  />;
}
