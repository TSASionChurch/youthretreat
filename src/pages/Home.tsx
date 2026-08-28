import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Church, Users, BookOpen,
  Video, MapPin, Mail, Phone, ExternalLink, Calendar, Heart, Sparkles,
  Baby
} from 'lucide-react';
import EventTimer from '../components/EventTimer';
import ImageCarousel from '../components/ImageCarousel';
import YoutubeFacade from '../components/YoutubeFacade';

/* ── Utility: scroll-triggered reveal ─────────────────── */
function Reveal({
  children, delay = 0, className = '', direction = 'up',
}: {
  children: React.ReactNode; delay?: number; className?: string;
  direction?: 'up' | 'left' | 'right';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const v = {
    up:    { hidden: { opacity: 0, y: 50  }, visible: { opacity: 1, y: 0 } },
    left:  { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 50  }, visible: { opacity: 1, x: 0 } },
  };
  return (
    <motion.div
      ref={ref} initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={v[direction]}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Marquee strip ─────────────────────────────────────── */
function Marquee() {
  const items = ['Faith', 'Hope', 'Fellowship', 'Service', 'Prayer', 'Community', 'Love', 'Grace'];
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden bg-[#D92B27] py-3.5 border-y border-[#b82320]">
      <motion.div
        className="flex items-center whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, repeatType: 'loop', duration: 36, ease: 'linear' }}
      >
        {doubled.map((w, i) => (
          <span key={i} className="inline-flex items-center gap-3 text-white font-black uppercase text-xs tracking-[0.25em] px-6">
            {w}
            <span className="text-white/40">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Service timing card ──────────────────────────────── */
function ServiceCard({
  icon, badge, title, time, desc, delay,
}: {
  icon: React.ReactNode; badge: string; title: string;
  time: string; desc: string; delay: number;
}) {
  return (
    <Reveal delay={delay} className="h-full border-r border-b border-slate-200">
      <div
        className="h-full bg-white p-6 sm:p-8 flex flex-col justify-between group hover:bg-[#0A1128] transition-all duration-500 min-h-[370px]"
      >
        <div>
          <div className="w-12 h-12 rounded-xl bg-[#D92B27]/5 border border-[#D92B27]/10 flex items-center justify-center text-[#D92B27] mb-6 transition-all duration-300 group-hover:bg-white/10 group-hover:text-white">
            {icon}
          </div>
          <span className="inline-block text-[8px] font-black uppercase tracking-[0.2em] bg-[#D92B27]/5 text-[#D92B27] px-2.5 py-1 rounded-full mb-4 transition-all duration-300 group-hover:bg-[#FFE600] group-hover:text-[#0A1128]">
            {badge}
          </span>
          <h3 
            className="text-lg font-bold text-[#0A1128] uppercase leading-tight tracking-tight transition-colors duration-300 group-hover:text-white"
            style={{ fontFamily: 'Unbounded' }}
          >
            {title}
          </h3>
          <p className="text-[#D92B27] group-hover:text-[#FFE600] font-black text-xs uppercase tracking-wide mt-1.5 transition-colors duration-300" style={{ whiteSpace: 'pre-line' }}>
            {time}
          </p>
          <p className="text-slate-500 group-hover:text-slate-300 text-xs sm:text-sm mt-4 leading-relaxed font-semibold transition-colors duration-300">
            {desc}
          </p>
        </div>
        <div className="pt-5 mt-5 border-t border-slate-100 group-hover:border-white/10 flex items-center gap-1.5 text-[9px] font-black uppercase text-slate-300 group-hover:text-white/40 tracking-wider transition-colors duration-300">
          <Calendar size={10} />
          <span>Weekly Gathering</span>
        </div>
      </div>
    </Reveal>
  );
}

/* ── Main export ─────────────────────────────────────── */
export default function Home() {
  const mapUrl = 'https://maps.app.goo.gl/FopB2t33gXKW2yux7';
  const embedMapUrl =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30173.47732297911!2d72.8218741743164!3d19.033612000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c92a7019f37d%3A0xbf05632e51e35ef6!2sSalvation%20Army%20Tamil%20Church%2C%20Women%20And%20Children%20Home!5e0!3m2!1sen!2sin!4v1728552474695!5m2!1sen!2sin';

  const [youtubeVideos, setYoutubeVideos] = useState<Array<{ videoId: string; title: string; badge: string; desc: string }>>([
    {
      videoId: 'WMOoBwsbagA',
      title: 'Half Night Prayer Service 28 August 2026',
      badge: 'Latest Broadcast',
      desc: 'Join in spirit with our congregation at TSA Tamil Sion for night prayer, worship, and an encouraging sermon.',
    },
    {
      videoId: 'H-Z1bLaeMV8',
      title: 'When You Stand for God, God Stands With You',
      badge: 'Youth Outreach',
      desc: 'Inspirational message and worship moments brought by the SAY Youth Group of TSA Sion Tamil Corps.',
    },
  ]);

  useEffect(() => {
    const rssFeedUrl = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent('https://www.youtube.com/feeds/videos.xml?channel_id=UC9KBf9YY5ahFbAxs3_u4aFA');
    fetch(rssFeedUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'ok' && Array.isArray(data.items) && data.items.length >= 2) {
          const latestTwo = data.items.slice(0, 2).map((item: any, idx: number) => {
            const rawId = item.guid ? item.guid.replace('yt:video:', '') : (item.link.includes('v=') ? item.link.split('v=')[1] : item.link.split('/').pop());
            const videoId = rawId ? rawId.split('&')[0] : 'WMOoBwsbagA';
            const cleanTitle = item.title.replace(/#\w+/g, '').trim();
            const dateStr = item.pubDate ? new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
            return {
              videoId,
              title: cleanTitle || item.title,
              badge: idx === 0 ? 'Latest Broadcast' : 'Featured Video',
              desc: dateStr ? `Published on ${dateStr} on TSA Sion Tamil Corps YouTube Channel.` : 'Streamed on TSA Sion Tamil Corps YouTube Channel.',
            };
          });
          setYoutubeVideos(latestTwo);
        }
      })
      .catch((err) => {
        console.warn('YouTube RSS feed fallback utilized:', err);
      });
  }, []);

  return (
    <div className="w-full overflow-x-hidden bg-white text-[#0A1128]">

      {/* ══ HERO — Split layout banner with active slideshow ══════════════════ */}
      <section className="relative w-full">
        <ImageCarousel />
      </section>

      {/* ══ Marquee ticker ══════════════════════════════ */}
      <Marquee />

      {/* ══ Intro statement ════════════════════════════ */}
      <section className="py-20 md:py-32 px-6 sm:px-10 md:px-16 noise bg-white">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: massive tagline */}
          <div className="lg:col-span-7">
            <Reveal direction="left">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[2px] bg-[#D92B27]" />
                <span className="text-[#D92B27] font-black uppercase text-xs tracking-[0.25em]">
                  Salvation Army Sion Corps
                </span>
              </div>
              <h2
                className="font-bold uppercase leading-[0.88] tracking-tighter text-[#0A1128]"
                style={{ fontSize: 'clamp(42px, 6.5vw, 96px)',fontFamily:"Unbounded" }}
              >
                Over Five
                <br />
                <span className="text-[#D92B27]">Decades</span>
                <br />
                of Service
              </h2>
            </Reveal>
          </div>

          {/* Right: short description + quick stats */}
          <div className="lg:col-span-5">
            <Reveal direction="right" delay={0.1}>
              <p className="text-slate-500 text-base sm:text-lg leading-relaxed font-medium mb-10">
                Rooted in faith and radical generosity, our corps has been a spiritual sanctuary in Sion for over 85 years, uplifting families across Mumbai through compassionate ministry and community leadership.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { stat: '85+', label: 'Years of Mission' },
                  { stat: '6',   label: 'Active Ministries' },
                  { stat: '52',  label: 'Sundays a Year' },
                ].map((s, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                    <p className="text-3xl sm:text-4xl font-black text-[#D92B27] leading-none">{s.stat}</p>
                    <p className="text-xs font-black uppercase tracking-wider text-slate-500 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ Service Timings ═══════════════════════════ */}
      <section id="service-timings" className="py-20 md:py-32 bg-[#F8FAFC] px-6 sm:px-10 md:px-16 border-y border-slate-200 noise">
        <div className="max-w-[1600px] mx-auto">
          <Reveal className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-[#D92B27] font-black uppercase tracking-[0.25em] text-xs mb-3 flex items-center gap-2">
                <span className="w-5 h-[1.5px] bg-[#D92B27]" />
                Weekly Schedule
              </p>
              <h2
                className="font-bold uppercase leading-[0.9] tracking-tighter text-[#0A1128]"
                style={{ fontSize: 'clamp(30px, 5vw, 72px)',fontFamily:"Unbounded"  }}
              >
                Worship<br />Timings
              </h2>
            </div>
            <Link
              to="/ministries"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-300 hover:border-[#0A1128] text-slate-600 hover:text-[#0A1128] font-black uppercase text-[10px] tracking-widest transition-all bg-white"
            >
              All Ministries <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-slate-200">
            {[
              { 
                icon: <Church size={20} />, 
                badge: 'Sunday Morning', 
                title: 'Sunday Holiness Meeting', 
                time: '10:15 AM – 12:30 PM', 
                desc: 'Primary congregational worship service with vibrant praise, scripture reading, testimonies, prayer, and an inspiring sermon.', 
                delay: 0 
              },
              { 
                icon: <Heart size={20} />, 
                badge: 'Friday & Monday', 
                title: "Women's Ministry", 
                time: 'Friday Fasting Prayer: 11:00 AM\nMonday Cottage Meeting: 12:00 PM', 
                desc: 'Dedicated prayer gatherings and home cottage fellowship interceding for families, the church, and our nation.', 
                delay: 0.07 
              },
              { 
                icon: <Sparkles size={20} />, 
                badge: 'Saturday & Sunday', 
                title: 'Youth Fellowship', 
                time: 'Saturday Prayer: 9:00 PM\nSunday Fellowship: 12:45 PM', 
                desc: 'SAY youth circles, evening prayer sessions, scripture studies, and creative fellowship empowering young leaders.', 
                delay: 0.14 
              },
              { 
                icon: <BookOpen size={20} />, 
                badge: 'Sunday Afternoon', 
                title: "Children's Ministry / Sunday School", 
                time: 'Sunday 12:00 PM', 
                desc: 'Nurturing young minds in biblical values, action songs, creative lessons, and Vacation Bible School (VBS).', 
                delay: 0.21 
              },
            ].map((s, i) => (
              <ServiceCard key={i} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ Featured Event (Retreat) ══════════════════ */}
      <section className="py-20 md:py-32 bg-[#0A1128] px-6 sm:px-10 md:px-16 noise relative overflow-hidden">
        {/* Grid texture */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:28px_28px] opacity-[0.025]" />

        <div className="max-w-[1600px] mx-auto relative z-10">

          {/* Section label */}
          <Reveal>
            <div className="flex items-center gap-3 mb-10">
              <span className="w-8 h-[2px] bg-[#D92B27]" />
              <span className="text-white/40 font-black uppercase text-xs tracking-[0.25em]">Special Event</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#D92B27] text-white text-[9px] font-black uppercase tracking-wider animate-pulse">
                Live Soon
              </span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left big title */}
            <div className="lg:col-span-5">
              <Reveal direction="left">
                <h2
                  className="font-bold uppercase leading-[0.88] tracking-tighter text-white mb-6"
                  style={{ fontSize: 'clamp(40px, 6vw, 88px)' ,fontFamily:"Unbounded"}}
                >
                  Youth<br />
                  <span className="text-[#FFE600]"    style={{ fontSize: 'clamp(40px, 6vw, 88px)' ,fontFamily:"Unbounded"}}>Retreat</span><br />
                  <span className="text-[#D92B27]"    style={{ fontSize: 'clamp(40px, 6vw, 88px)' ,fontFamily:"Unbounded"}}>2026</span>
                </h2>
                <p className="text-white/50 text-sm sm:text-base leading-relaxed font-medium mb-8 max-w-sm">
                  An annual gathering organised by the SAY Group, inviting youth from corps across Mumbai to grow in faith, worship, and community service.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/retreat"
                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D92B27] hover:bg-white text-white hover:text-[#0A1128] font-black uppercase text-[10px] tracking-widest transition-all duration-300"
                  >
                    Retreat Page <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:border-white text-white/70 hover:text-white font-black uppercase text-[10px] tracking-widest transition-all duration-300"
                  >
                    Register Now
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Right: countdown widget */}
            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <EventTimer compact />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══ Ministry highlight strip ══════════════════ */}
      <section className="py-20 md:py-32 bg-white px-6 sm:px-10 md:px-16 border-b border-slate-200 noise">
        <div className="max-w-[1600px] mx-auto">
          <Reveal className="mb-14">
            <p className="text-[#D92B27] font-black uppercase tracking-[0.25em] text-xs mb-3 flex items-center gap-2">
              <span className="w-5 h-[1.5px] bg-[#D92B27]" />
              Active Ministries
            </p>
            <h2
              className="font-bold uppercase leading-[0.9] tracking-tighter text-[#0A1128]"
              style={{ fontSize: 'clamp(30px, 5vw, 72px)' ,fontFamily:"Unbounded"}}
            >
              Serving the<br />
              <span className="text-[#D92B27]"  style={{ fontSize: 'clamp(30px, 5vw, 72px)' ,fontFamily:"Unbounded"}}>Community</span>
            </h2>
          </Reveal>

          {/* Horizontal scroll row of ministry chips */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'Sunday Worship',         img: '/DSC_0002.webp', to: '/ministries/sunday-worship' },
              { title: "Women's Ministries",     img: '/DSC_0811.webp', to: '/ministries/home-league' },
              { title: 'Youth Fellowship',        img: '/DSC_0004.webp', to: '/ministries/say-youth' },
              { title: "Children's Ministries",  img: '/DSC_0003.webp', to: '/ministries/childrens-ministries' },
              { title: 'Media Ministry',         img: '/choir.webp',    to: '/ministries/medical-fellowship' },
              { title: 'Medical Fellowship',      img: '/choir.webp',    to: '/ministries/medical-fellowship' },
            ].map((m, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <Link
                  to={m.to}
                  className="group flex items-center gap-4 bg-white border border-slate-200 rounded-2xl p-4 hover:border-[#D92B27]/40 hover:shadow-[0_12px_30px_rgba(10,17,40,0.06)] transition-all duration-300"
                >
                  {/* Thumbnail — uncropped */}
                  <div className="w-14 h-14 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                    <img src={m.img} alt={m.title} width="56" height="56" loading="lazy" decoding="async" className="max-w-full max-h-full object-contain" />
                  </div>
                  <span className="font-black uppercase text-xs tracking-tight text-[#0A1128] group-hover:text-[#D92B27] transition-colors leading-tight">
                    {m.title}
                  </span>
                  <ArrowRight size={14} className="ml-auto text-slate-300 group-hover:text-[#D92B27] group-hover:translate-x-0.5 transition-all" />
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3} className="mt-10 text-center">
            <Link
              to="/ministries"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#0A1128] hover:bg-[#D92B27] text-white font-black uppercase text-xs tracking-widest transition-all duration-300 shadow-sm"
            >
              View All Ministries <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══ Online Services (YouTube) ════════════════ */}
      <section className="py-20 md:py-32 bg-[#F8FAFC] px-6 sm:px-10 md:px-16 border-b border-slate-200 noise">
        <div className="max-w-[1600px] mx-auto">
          <Reveal className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-[#D92B27] font-black uppercase tracking-[0.25em] text-xs mb-3 flex items-center gap-2">
                <span className="w-5 h-[1.5px] bg-[#D92B27]" />
                Media Outreach
              </p>
              <h2
                className="font-bold uppercase leading-[0.9] tracking-tighter text-[#0A1128]"
                style={{ fontSize: 'clamp(30px, 5vw, 72px)' ,fontFamily:"Unbounded"}}
              >
                Online<br />Services
              </h2>
            </div>
            <a
              href="https://www.youtube.com/@SalvationArmyTamilCorpsSion"
              target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-300 hover:border-[#0A1128] text-slate-600 hover:text-[#0A1128] font-black uppercase text-[10px] tracking-widest transition-all bg-white"
            >
              <Video size={12} />
              YouTube Channel
              <ExternalLink size={10} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {youtubeVideos.map((v, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="bg-white rounded-[28px] border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm sm:text-base font-black uppercase text-[#0A1128] tracking-tight">{v.title}</h3>
                    <span className="text-[8px] font-black uppercase tracking-wider text-[#D92B27] bg-[#D92B27]/5 px-2.5 py-1 rounded-full">
                      {v.badge}
                    </span>
                  </div>
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-100">
                    <YoutubeFacade videoId={v.videoId} title={v.title} />
                  </div>
                  <p className="text-slate-500 text-xs font-semibold mt-4 leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Location ════════════════════════════════ */}
      <section className="py-20 md:py-32 bg-white px-6 sm:px-10 md:px-16 noise">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-4">
            <Reveal>
              <p className="text-[#D92B27] font-black uppercase tracking-[0.25em] text-xs mb-3 flex items-center gap-2">
                <span className="w-5 h-[1.5px] bg-[#D92B27]" />
                Visit Us
              </p>
              <h2
                className="font-bold uppercase leading-[0.9] tracking-tighter text-[#0A1128] mb-8"
                style={{ fontSize: 'clamp(30px, 5vw, 64px)' ,fontFamily:"Unbounded"}}
              >
                Church<br />Location
              </h2>
              <div className="space-y-5 mb-10">
                {[
                  { icon: <MapPin size={15} />, label: 'Address', text: 'Plot No. 6, First Floor, 60 Feet Road, Sion East, Mumbai 400022' },
                  { icon: <Mail size={15} />,   label: 'Email',   text: 'info@salvationarmy.com', href: 'mailto:info@salvationarmy.com' },
                  { icon: <Phone size={15} />,  label: 'Phone',   text: '(123) 456-7890',          href: 'tel:1234567890' },
                ].map((c, i) => (
                  <div key={i} className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-[#D92B27] shrink-0">
                      {c.icon}
                    </div>
                    <div>
                      <span className="block text-[9px] font-black uppercase tracking-widest text-slate-400">{c.label}</span>
                      {c.href
                        ? <a href={c.href} className="text-sm font-bold text-[#0A1128] hover:text-[#D92B27] transition-colors">{c.text}</a>
                        : <p className="text-sm font-bold text-[#0A1128] leading-snug">{c.text}</p>
                      }
                    </div>
                  </div>
                ))}
              </div>
              <a
                href={mapUrl} target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0A1128] hover:bg-[#D92B27] text-white font-black uppercase text-[10px] tracking-widest transition-colors shadow-sm"
              >
                <ExternalLink size={11} />
                Open Google Maps
                <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
            </Reveal>
          </div>

          {/* Map frame */}
          <div className="lg:col-span-8 relative rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50"
            style={{ minHeight: '400px', height: '500px' }}>
            <iframe
              title="TSA Sion Church Location"
              src={embedMapUrl}
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>
      </section>

    </div>
  );
}