import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight } from 'lucide-react';

function MinistryCard({
  imgSrc,
  title,
  description,
  linkTo,
  index,
}: {
  imgSrc: string;
  title: string;
  description: string;
  linkTo?: string;
  index: number;
}) {
  const CardWrapper = linkTo ? Link : 'div';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <CardWrapper
        to={linkTo || '#'}
        className={`flex flex-col h-full bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-[0_20px_45px_rgba(10,17,40,0.05)] hover:border-slate-300 transition-all duration-500 group relative ${
          linkTo ? 'cursor-pointer' : ''
        }`}
      >
        {/* Soft Hover Border Highlight */}
        <div className="absolute inset-0 border border-transparent group-hover:border-[#D92B27]/40 rounded-3xl pointer-events-none transition-colors duration-500 z-20" />

        {/* Padded Image Frame - Fully Uncropped display */}
        <div className="relative aspect-[16/10] overflow-hidden w-full bg-slate-50 flex items-center justify-center p-3 border-b border-slate-100">
          <div 
            className="absolute inset-0 bg-cover bg-center filter blur-xl opacity-[0.07] select-none scale-105 pointer-events-none"
            style={{ backgroundImage: `url(${imgSrc})` }}
          />
          <img
            src={imgSrc}
            alt={title}
            width="1920"
            height="1271"
            loading="lazy"
            decoding="async"
            className="max-w-full max-h-full object-contain relative z-10 rounded-2xl group-hover:scale-102 transition-transform duration-500 ease-out"
          />
        </div>

        {/* Content Details */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-[#0A1128] uppercase tracking-tight group-hover:text-[#D92B27] transition-colors duration-300">
              {title}
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-3 leading-relaxed font-semibold">
              {description}
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
            <span className="font-extrabold uppercase text-[9px] tracking-wider text-slate-400">
              Corps Ministry
            </span>
            
            {linkTo && (
              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-[#D92B27] tracking-wider">
                <span>View Page</span>
                <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            )}
          </div>
        </div>
      </CardWrapper>
    </motion.div>
  );
}

export default function Ministries() {
  const ministriesData = [
    {
      imgSrc: "/DSC_0004.webp",
      title: "SAY Group (Youth)",
      description: "Our dedicated Salvation Army Youth Group focusing on spiritual growth, Saturday prayer sessions, Christmas nativity planning, and medical camps.",
      linkTo: "/ministries/say-youth",
    },
    {
      imgSrc: "/DSC_0006.webp",
      title: "Junior Home League",
      description: "Nurturing young girls in faith, life skills, fellowship, and service, helping them build a strong spiritual and ethical foundation.",
      linkTo: "/ministries/junior-home-league",
    },
    {
      imgSrc: "/DSC_0811.webp",
      title: "Home League (Women)",
      description: "A vital women's ministry focused on fellowship, community outreach, and mutual support, helping ladies make an impact in their homes and neighborhood.",
      linkTo: "/ministries/home-league",
    },
    {
      imgSrc: "/DSC_0003.webp",
      title: "Children's Ministries",
      description: "Providing a fun, engaging, and safe environment for children during Sunday school, fostering early faith and learning bible values.",
      linkTo: "/ministries/childrens-ministries",
    },
    {
      imgSrc: "/choir.webp",
      title: "Media Ministry",
      description: "Representing our church across digital platforms, live streaming services, developing our 5000+ downloaded Hymns app, and publishing weekly one-minute sermons.",
      linkTo: "/ministries/media-ministry",
    },
    {
      imgSrc: "/choir.webp",
      title: "Medical Fellowship",
      description: "Mobilizing healthcare professionals and volunteers within the corps to run medical checkup camps and health initiatives for those in need.",
      linkTo: "/ministries/medical-fellowship",
    },
    {
      imgSrc: "/DSC_0002.webp",
      title: "Sunday Worship Services",
      description: "Our weekly Holiness and worship services bringing the congregation together in praise, Scripture teaching, and corporate prayer.",
      linkTo: "/ministries/sunday-worship",
    },
  ];

  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen text-[#0A1128] noise pb-24">
      {/* Header section */}
      <section className="relative bg-white pt-24 pb-16 px-4 md:px-10 border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#D92B27]/3 rounded-full blur-3xl" />
        </div>

        <div className="max-w-[1600px] mx-auto w-full relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Shield size={14} className="text-[#D92B27]" />
            <span className="text-[#D92B27] font-black uppercase tracking-[0.25em] text-xs">Our Work</span>
          </motion.div>

          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#0A1128] uppercase leading-none font-black"
              style={{ fontSize: 'clamp(36px, 8vw, 100px)', letterSpacing: '-0.02em' }}
            >
              Ministries
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-500 text-base sm:text-lg md:text-xl font-medium max-w-xl mx-auto mt-6 leading-relaxed"
          >
            Discover the dynamic outreach programs, fellowship circles, and spiritual growth opportunities active within our church community.
          </motion.p>
        </div>
      </section>

      {/* Grid List */}
      <section className="py-20 px-4 md:px-10">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ministriesData.map((item, idx) => (
              <MinistryCard
                key={idx}
                index={idx}
                imgSrc={item.imgSrc}
                title={item.title}
                description={item.description}
                linkTo={item.linkTo}
              />
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
}
