import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Church, Heart, Sparkles,
  BookOpen, Video, MapPin, Mail, Phone,
  ExternalLink, Calendar, ArrowUpRight
} from 'lucide-react';
import EventTimer from '../components/EventTimer';
import ImageCarousel from '../components/ImageCarousel';
import YoutubeFacade from '../components/YoutubeFacade';
import { media } from '../lib/assets';
import { useWpSettings } from '../lib/useWpData';

/* ── Scroll Reveal ─────────────────────────────────────────────── */
function Reveal({
  children, delay = 0, className = '',
}: {
  children: React.ReactNode; delay?: number; className?: string; key?: React.Key;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Ticker ─────────────────────────────────────────────────────── */
function Ticker() {
  const items = ['FAITH', 'HOPE', 'FELLOWSHIP', 'SERVICE', 'PRAYER', 'COMMUNITY', 'LOVE', 'GRACE'];
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div className="overflow-hidden bg-[#D92B27] py-3.5 border-y border-[#b82320]">
      <motion.div
        className="flex items-center whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, repeatType: 'loop', duration: 240, ease: 'linear' }}
      >
        {doubled.map((w, i) => (
          <span key={i} className="inline-flex items-center gap-3 text-white font-tech font-bold text-xs tracking-[0.25em] px-6 uppercase">
            {w}
            <span className="text-white/40 text-[9px]">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Service Timing Card ─────────────────────────────────────────── */
function ServiceCard({
  icon, badge, title, time, desc, delay,
}: {
  icon: React.ReactNode; badge: string; title: string;
  time: string; desc: string; delay: number; key?: React.Key;
}) {
  return (
    <Reveal delay={delay} className="h-full">
      <div className="h-full bg-white p-8 flex flex-col gap-5 group hover:bg-[#222d61] transition-all duration-500 min-h-[340px] border-r border-b border-slate-200">
        <div className="w-10 h-10 rounded-lg bg-[#D92B27]/6 border border-[#D92B27]/12 flex items-center justify-center text-[#D92B27] transition-all duration-300 group-hover:bg-white/10 group-hover:text-white">
          {icon}
        </div>

        <div>
          <span className="inline-block font-tech text-[9px] font-bold uppercase tracking-[0.2em] text-[#D92B27] group-hover:text-[#FFE600] transition-colors duration-300 mb-2">
            {badge}
          </span>
          <h3 className="font-khand font-bold text-[#222d61] uppercase leading-tight group-hover:text-white transition-colors duration-300 mb-1.5"
            style={{ fontSize: 'clamp(20px, 1.8vw, 26px)', letterSpacing: '0.01em' }}
          >
            {title}
          </h3>
          <p className="font-tech text-[10px] text-[#D92B27] group-hover:text-[#FFE600] font-bold tracking-wide transition-colors duration-300 uppercase" style={{ whiteSpace: 'pre-line' }}>
            {time}
          </p>
        </div>

        <p className="text-slate-500 group-hover:text-white/70 text-sm leading-relaxed font-normal transition-colors duration-300 flex-1">
          {desc}
        </p>

        <div className="pt-4 border-t border-slate-100 group-hover:border-white/10 flex items-center gap-1.5 font-tech text-[9px] text-slate-300 group-hover:text-white/30 uppercase tracking-wider transition-colors duration-300">
          <Calendar size={10} />
          <span>WEEKLY GATHERING</span>
        </div>
      </div>
    </Reveal>
  );
}

/* ── Main Component ──────────────────────────────────────────────── */
export default function Home() {
  const wpSettings = useWpSettings();

  const mapUrl = 'https://maps.app.goo.gl/FopB2t33gXKW2yux7';
  const embedMapUrl =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30173.47732297911!2d72.8218741743164!3d19.033612000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c92a7019f37d%3A0xbf05632e51e35ef6!2sSalvation%20Army%20Tamil%20Church%2C%20Women%20And%20Children%20Home!5e0!3m2!1sen!2sin!4v1728552474695!5m2!1sen!2sin';

  /* YouTube RSS feed — live latest 2 videos */
  const [youtubeVideos, setYoutubeVideos] = useState<
    Array<{ videoId: string; title: string; badge: string; desc: string }>
  >([
    {
      videoId: 'WMOoBwsbagA',
      title: 'HALF NIGHT PRAYER SERVICE 28 AUGUST 2026',
      badge: 'LATEST BROADCAST',
      desc: 'Join in spirit with our congregation at TSA Tamil Sion for night prayer, worship, and an encouraging sermon.',
    },
    {
      videoId: 'H-Z1bLaeMV8',
      title: 'WHEN YOU STAND FOR GOD, GOD STANDS WITH YOU',
      badge: 'YOUTH OUTREACH',
      desc: 'Inspirational message and worship moments brought by the SAY Youth Group of TSA Sion Tamil Corps.',
    },
  ]);

  useEffect(() => {
    const rssUrl =
      'https://api.rss2json.com/v1/api.json?rss_url=' +
      encodeURIComponent('https://www.youtube.com/feeds/videos.xml?channel_id=UC9KBf9YY5ahFbAxs3_u4aFA');
    fetch(rssUrl)
      .then((r) => r.json())
      .then((data) => {
        if (data.status === 'ok' && Array.isArray(data.items) && data.items.length >= 2) {
          const latest = data.items.slice(0, 2).map((item: any, idx: number) => {
            const rawId = item.guid
              ? item.guid.replace('yt:video:', '')
              : item.link.includes('v=')
                ? item.link.split('v=')[1]
                : item.link.split('/').pop();
            const videoId = rawId ? rawId.split('&')[0] : 'WMOoBwsbagA';
            const dateStr = item.pubDate
              ? new Date(item.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
              : '';
            return {
              videoId,
              title: item.title.replace(/#\w+/g, '').trim().toUpperCase(),
              badge: idx === 0 ? 'LATEST BROADCAST' : 'FEATURED VIDEO',
              desc: dateStr
                ? `Published ${dateStr} · TSA Sion Tamil Corps`
                : 'TSA Sion Tamil Corps YouTube Channel',
            };
          });
          setYoutubeVideos(latest);
        }
      })
      .catch(() => {/* fallback */ });
  }, []);

  return (
    <div className="w-full overflow-x-hidden bg-white text-[#222d61]">

      {/* ── 1. Hero Carousel ──────────────────────────────────── */}
      <section className="w-full">
        <ImageCarousel />
      </section>

      {/* ── 2. Ticker ─────────────────────────────────────────── */}
      <Ticker />

      {/* ── 3. Intro Statement ───────────────────────────────── */}
      <section className="py-24 md:py-36 px-6 sm:px-10 md:px-16 bg-white">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex items-center gap-3 mb-6 font-tech text-xs font-bold text-[#D92B27] uppercase tracking-[0.25em]">
                <span className="w-6 h-px bg-[#D92B27]" />
                <span>SALVATION ARMY SION CORPS</span>
              </div>
              <h2
                className="font-khand font-bold uppercase text-[#222d61] leading-[0.9]"
                style={{ fontSize: 'clamp(48px, 7.5vw, 110px)', letterSpacing: '0.01em' }}
              >
                OVER FIVE DECADES<br />
                <span className="text-[#D92B27]">OF SERVICE</span>
              </h2>
            </Reveal>
          </div>

          {/* Right */}
          <div className="lg:col-span-5 lg:pt-6">
            <Reveal delay={0.12}>
              <p className="text-slate-500 text-lg leading-relaxed font-normal mb-10">
                Rooted in faith and radical generosity, our corps has been a spiritual sanctuary in Sion for over 85 years, uplifting families across Mumbai through compassionate ministry and community leadership.
              </p>
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-100">
                {[
                  { stat: '85+', label: 'YEARS OF MISSION' },
                  { stat: '6', label: 'ACTIVE MINISTRIES' },
                  { stat: '52', label: 'SUNDAYS A YEAR' },
                ].map((s) => (
                  <div key={s.label}>
                    <p
                      className="font-khand font-bold text-[#D92B27] leading-none mb-1"
                      style={{ fontSize: 'clamp(36px, 4vw, 56px)' }}
                    >
                      {s.stat}
                    </p>
                    <p className="font-tech text-[10px] text-slate-400 font-bold uppercase tracking-wider">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 4. Service Timings ───────────────────────────────── */}
      <section id="service-timings" className="bg-[#F8F9FA] border-y border-slate-200">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16 pt-20 pb-0">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-3 mb-4 font-tech text-xs font-bold text-[#D92B27] uppercase tracking-[0.25em]">
                <span className="w-6 h-px bg-[#D92B27]" />
                <span>WEEKLY SCHEDULE</span>
              </div>
              <h2
                className="font-khand font-bold uppercase text-[#222d61] leading-none"
                style={{ fontSize: 'clamp(40px, 6vw, 92px)', letterSpacing: '0.01em' }}
              >
                WORSHIP <span className="text-[#D92B27]">TIMINGS</span>
              </h2>
            </div>
            <Link
              to="/ministries"
              className="group inline-flex items-center gap-2 text-xs font-tech font-bold uppercase tracking-widest text-slate-500 hover:text-[#222d61] transition-colors"
            >
              <span>ALL MINISTRIES</span> <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </Reveal>
        </div>

        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 md:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-slate-200">
            {[
              {
                icon: <Church size={18} />,
                badge: 'SUNDAY MORNING',
                title: 'SUNDAY HOLINESS MEETING',
                time: '10:15 AM – 12:30 PM',
                desc: 'Primary congregational worship with vibrant Tamil praise, scripture reading, testimonies, prayer, and an inspiring sermon.',
                delay: 0,
              },
              {
                icon: <Heart size={18} />,
                badge: 'FRIDAY & MONDAY',
                title: "WOMEN'S MINISTRY",
                time: 'FRIDAY FASTING PRAYER: 11:00 AM\nMONDAY COTTAGE MEETING: 12:00 PM',
                desc: 'Dedicated prayer gatherings and home cottage fellowship interceding for families, the church, and our nation.',
                delay: 0.06,
              },
              {
                icon: <Sparkles size={18} />,
                badge: 'SATURDAY & SUNDAY',
                title: 'YOUTH FELLOWSHIP',
                time: 'SATURDAY PRAYER: 9:00 PM\nSUNDAY FELLOWSHIP: 12:45 PM',
                desc: 'SAY youth circles, evening prayer sessions, scripture studies, and creative fellowship empowering young leaders.',
                delay: 0.12,
              },
              {
                icon: <BookOpen size={18} />,
                badge: 'SUNDAY AFTERNOON',
                title: "CHILDREN'S MINISTRY & SUNDAY SCHOOL",
                time: 'SUNDAY 12:00 PM',
                desc: 'Nurturing young minds in biblical values, action songs, creative lessons, and Vacation Bible School (VBS).',
                delay: 0.18,
              },
            ].map((s, i) => (
              <ServiceCard key={i} icon={s.icon} badge={s.badge} title={s.title} time={s.time} desc={s.desc} delay={s.delay} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Awwwards-Style Youth Retreat 2026 Section (No Photo, Clean Large Typography) ───────── */}
      <section className="py-16 md:py-24 bg-[#222d61] text-white px-6 sm:px-10 md:px-16 relative overflow-hidden">
        {/* Subtle background hairline grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-10"
          style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '80px 80px' }}
        />

        <div className="max-w-[1600px] mx-auto relative z-10">

          {/* Section Metadata Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-10 border-b border-white/15">
            <div className="flex items-center gap-3 font-tech text-xs font-bold uppercase tracking-[0.25em] text-[#FFE600]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFE600] animate-pulse" />
              <span>[SPECIAL EVENT • RETREAT.2026]</span>
            </div>
            <div className="flex items-center gap-4 font-tech text-xs text-white/50 uppercase tracking-widest">
              <span>OCTOBER 02, 2026</span>
              <span>•</span>
              <span>MUMBAI DIVISION</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Main Title & Description */}
            <div className="lg:col-span-7">
              <Reveal>
                <div className="inline-block px-3 py-1 bg-[#D92B27] text-white font-tech text-xs font-bold uppercase tracking-[0.2em] mb-4">
                  ANNUAL YOUTH CONFERENCE
                </div>
                
                <h2
                  className="font-khand font-bold uppercase text-white leading-[0.88] mb-6"
                  style={{ fontSize: 'clamp(54px, 8vw, 120px)', letterSpacing: '0.01em' }}
                >
                  YOUTH <span className="font-serif-italic font-normal text-[#FFE600] lowercase">retreat</span> <span className="text-[#D92B27]">2026</span>
                </h2>

                <p className="text-white/80 text-base md:text-xl leading-relaxed font-normal max-w-2xl">
                  An annual flagship gathering organised by the SAY Youth Group, bringing together young salvationists from corps across Mumbai to encounter God, grow in leadership, and engage in transformational fellowship.
                </p>
              </Reveal>
            </div>

            {/* Right Timer & Actions Block */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <Reveal delay={0.1}>
                <div className="p-6 bg-white/5 border border-white/15 rounded-2xl backdrop-blur-md">
                  <span className="font-tech text-xs font-bold uppercase tracking-[0.25em] text-[#FFE600] block mb-4">
                    // EVENT COUNTDOWN
                  </span>
                  <EventTimer compact />
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-6">
                  <Link
                    to="/retreat"
                    className="group inline-flex items-center gap-2 px-8 py-4 bg-[#D92B27] hover:bg-[#FFE600] text-white hover:text-[#222d61] font-tech font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl"
                  >
                    <span>EXPLORE RETREAT</span>
                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 hover:border-white text-white font-tech font-bold text-xs uppercase tracking-widest transition-all duration-300"
                  >
                    <span>REGISTER NOW</span>
                  </Link>
                </div>
              </Reveal>
            </div>

          </div>

        </div>
      </section>



      {/* ── 7. YouTube Feed ──────────────────────────────────── */}
      <section className="py-24 md:py-36 bg-[#F8F9FA] px-6 sm:px-10 md:px-16 border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-3 mb-4 font-tech text-xs font-bold text-[#D92B27] uppercase tracking-[0.25em]">
                <span className="w-6 h-px bg-[#D92B27]" />
                <span>MEDIA OUTREACH</span>
              </div>
              <h2
                className="font-khand font-bold uppercase text-[#222d61] leading-none"
                style={{ fontSize: 'clamp(36px, 5.5vw, 84px)', letterSpacing: '0.01em' }}
              >
                WATCH OUR <span className="font-serif-italic font-normal text-[#D92B27] lowercase">services</span>
              </h2>
            </div>
            <a
              href="https://www.youtube.com/@SalvationArmyTamilCorpsSion"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-tech font-bold text-xs uppercase tracking-widest text-slate-500 hover:text-[#222d61] transition-colors"
            >
              <Video size={14} />
              <span>YOUTUBE CHANNEL</span>
              <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {youtubeVideos.map((v, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="bg-white border border-slate-200 p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="font-khand font-bold uppercase text-[#222d61] leading-snug text-xl"
                      style={{ letterSpacing: '0.01em' }}
                    >
                      {v.title}
                    </h3>
                    <span className="font-tech text-[9px] font-bold uppercase tracking-wider text-[#D92B27] bg-[#D92B27]/5 px-2.5 py-1 shrink-0">
                      {v.badge}
                    </span>
                  </div>
                  <div className="relative aspect-video overflow-hidden bg-slate-900 border border-slate-100">
                    <YoutubeFacade videoId={v.videoId} title={v.title} />
                  </div>
                  <p className="text-slate-500 text-xs font-normal mt-4 leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Location ──────────────────────────────────────── */}
      <section className="py-24 md:py-36 bg-white px-6 sm:px-10 md:px-16">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">

          <div className="lg:col-span-4">
            <Reveal>
              <div className="flex items-center gap-3 mb-4 font-tech text-xs font-bold text-[#D92B27] uppercase tracking-[0.25em]">
                <span className="w-6 h-px bg-[#D92B27]" />
                <span>VISIT US</span>
              </div>
              <h2
                className="font-khand font-bold uppercase text-[#222d61] leading-none mb-10"
                style={{ fontSize: 'clamp(32px, 4.5vw, 68px)', letterSpacing: '0.01em' }}
              >
                CHURCH <span className="font-serif-italic font-normal text-[#D92B27] lowercase">location</span>
              </h2>

              <div className="space-y-6 mb-10">
                {[
                  {
                    icon: <MapPin size={15} />,
                    label: 'ADDRESS',
                    text: 'Plot No. 6, First Floor, 60 Feet Road, Sion East, Mumbai 400022',
                  },
                  {
                    icon: <Mail size={15} />,
                    label: 'EMAIL',
                    text: 'tsasionchurch76@gmail.com',
                    href: 'mailto:tsasionchurch76@gmail.com',
                  },
                  {
                    icon: <Phone size={15} />,
                    label: 'PHONE',
                    text: '+91 96002 08400',
                    href: 'tel:+919600208400',
                  },
                ].map((c, i) => (
                  <div key={i} className="flex items-start gap-3.5">
                    <div className="w-8 h-8 border border-slate-200 flex items-center justify-center text-[#D92B27] shrink-0 mt-0.5">
                      {c.icon}
                    </div>
                    <div>
                      <span className="block font-tech text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">
                        {c.label}
                      </span>
                      {c.href ? (
                        <a href={c.href} className="text-sm text-[#222d61] hover:text-[#D92B27] transition-colors font-normal">
                          {c.text}
                        </a>
                      ) : (
                        <p className="text-sm text-[#222d61] font-normal leading-snug">{c.text}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-tech font-bold text-xs uppercase tracking-widest text-[#222d61] hover:text-[#D92B27] transition-colors"
              >
                <ExternalLink size={13} />
                <span>OPEN GOOGLE MAPS</span>
              </a>
            </Reveal>
          </div>

          <div
            className="lg:col-span-8 border border-slate-200 overflow-hidden shadow-sm"
            style={{ height: '480px' }}
          >
            <iframe
              title="TSA Sion Church Location"
              src={embedMapUrl}
              className="w-full h-full border-0"
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