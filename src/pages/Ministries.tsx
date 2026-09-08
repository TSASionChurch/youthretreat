import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { media } from '../lib/assets';

function MinistryCard({
  imgSrc, title, badge, description, linkTo, index,
}: {
  imgSrc: string; title: string; badge: string;
  description: string; linkTo?: string; index: number; key?: React.Key;
}) {
  const CardWrapper = linkTo ? Link : ('div' as any);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <CardWrapper
        to={linkTo || '#'}
        className="flex flex-col h-full bg-white border border-slate-200 group hover:border-[#222d61]/30 transition-all duration-300 cursor-pointer"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
          <span className="absolute top-3 left-3 z-10 font-tech text-[9px] font-bold text-slate-400 bg-white/90 px-2 py-1 tracking-widest uppercase">
            [{String(index + 1).padStart(2, '0')}]
          </span>
          <img
            src={imgSrc}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-6">
          <span className="font-tech text-[9px] font-bold uppercase tracking-[0.2em] text-[#D92B27] block mb-2">
            {badge}
          </span>
          <h3
            className="font-khand font-bold text-[#222d61] leading-tight mb-2 group-hover:text-[#D92B27] transition-colors duration-300 uppercase"
            style={{ fontSize: 'clamp(20px, 1.8vw, 26px)', letterSpacing: '0.01em' }}
          >
            {title}
          </h3>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal flex-1">
            {description}
          </p>

          {linkTo && (
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="font-tech text-[9px] font-bold text-slate-400 uppercase tracking-wider">CORPS MINISTRY</span>
              <span className="w-7 h-7 border border-slate-200 flex items-center justify-center text-[#222d61] group-hover:bg-[#222d61] group-hover:text-white group-hover:border-[#222d61] transition-all duration-300">
                <ArrowRight size={12} />
              </span>
            </div>
          )}
        </div>
      </CardWrapper>
    </motion.div>
  );
}

export default function Ministries() {
  /* Exactly in the requested order:
     1. SUNDAY HOLINESS MEETING
     2. HOME LEAGUE
     3. YOUTH FELLOWSHIP (renamed from SAY GROUP)
     4. JUNIOR HOME LEAGUE
     5. CHILDREN'S MINISTRIES
     6. MEDIA MINISTRY
     7. MEDICAL FELLOWSHIP
  */
  const ministriesData = [
    {
      imgSrc: media('/DSC_0002.webp'),
      badge: 'SUNDAY WORSHIP',
      title: 'SUNDAY HOLINESS MEETING',
      description:
        'Our weekly Holiness Meeting (10:15 AM – 12:30 PM) brings the congregation together in vibrant Tamil praise, scripture reading, testimony, and biblical preaching.',
      linkTo: '/ministries/sunday-worship',
    },
    {
      imgSrc: media('/DSC_0811.webp'),
      badge: "WOMEN'S MINISTRY",
      title: 'HOME LEAGUE',
      description:
        "A cornerstone ministry for married women focusing on Friday Fasting Prayer (11:00 AM), Monday Cottage Meetings (12:00 PM), and bi-monthly fellowship gatherings.",
      linkTo: '/ministries/home-league',
    },
    {
      imgSrc: media('/DSC_0004.webp'),
      badge: 'YOUTH FELLOWSHIP',
      title: 'YOUTH FELLOWSHIP',
      description:
        'Formed as our youth fellowship (SAY Group), our youth meet every Saturday (9 PM) and Sunday (12:45 PM) for prayer, Bible study, Christmas nativity crib planning, and free medical camps.',
      linkTo: '/ministries/say-youth',
    },
    {
      imgSrc: media('/DSC_0006.webp'),
      badge: 'YOUNG WOMEN',
      title: 'JUNIOR HOME LEAGUE',
      description:
        'Nurturing young unmarried women soldiers in spiritual depth, moral integrity, fellowship, and Christian service — meeting twice monthly after Sunday worship.',
      linkTo: '/ministries/junior-home-league',
    },
    {
      imgSrc: media('/DSC_0003.webp'),
      badge: "CHILDREN'S CHURCH",
      title: "CHILDREN'S MINISTRIES",
      description:
        'Providing a vibrant, safe environment for children every Sunday at 12:00 PM — action songs, memory verses, creative crafts, and our annual week-long Vacation Bible School (VBS).',
      linkTo: '/ministries/childrens-ministries',
    },
    {
      imgSrc: media('/choir.webp'),
      badge: 'DIGITAL OUTREACH',
      title: 'MEDIA MINISTRY',
      description:
        'Live streaming services to YouTube & Facebook, developing the Salvation Army Hymns & Bible App (5,000+ downloads), and publishing weekly "One Minute Sermon" devotionals.',
      linkTo: '/ministries/media-ministry',
    },
    {
      imgSrc: media('/choir.webp'),
      badge: 'HEALTHCARE',
      title: 'MEDICAL FELLOWSHIP',
      description:
        'Mobilising doctors, nurses, and healthcare volunteers to conduct free medical checkup camps, diagnostic screenings, and medicine distribution across Sion and Dharavi.',
      linkTo: '/ministries/medical-fellowship',
    },
  ];

  return (
    <div className="w-full bg-white min-h-screen text-[#222d61]">

      {/* ── Compact Header ───────────────────────────────────── */}
      <section className="pt-16 pb-8 px-6 md:px-12 border-b border-slate-200 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center gap-3 mb-4 font-tech text-xs font-bold text-[#D92B27] uppercase tracking-[0.25em]">
            <span className="w-6 h-px bg-[#D92B27]" />
            <span>OUR WORK & OUTREACH</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-7">
              <h1
                className="font-khand font-bold text-[#222d61] leading-none uppercase"
                style={{ fontSize: 'clamp(44px, 6.5vw, 96px)', letterSpacing: '0.01em' }}
              >
                ACTIVE <span className="font-serif-italic font-normal text-[#D92B27] lowercase">ministries</span>
              </h1>
            </div>
            <div className="lg:col-span-5">
              <p className="text-slate-500 text-base md:text-lg leading-relaxed font-normal">
                Discover the dynamic outreach programmes and fellowship circles spanning worship, women, youth, children, media, and healthcare.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Grid (Starts Immediately) ────────────────────────── */}
      <section className="py-12 px-6 md:px-12 bg-[#F8F9FA]">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
            {ministriesData.map((item, idx) => (
              <div key={idx} className="bg-[#F8F9FA]">
                <MinistryCard
                  index={idx}
                  imgSrc={item.imgSrc}
                  badge={item.badge}
                  title={item.title}
                  description={item.description}
                  linkTo={item.linkTo}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
