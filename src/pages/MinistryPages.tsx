import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Heart, Star, Shield, BookOpen, ChevronRight, Video, ArrowUpRight } from 'lucide-react';
import { media } from '../lib/assets';

function Reveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string; key?: React.Key;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface MinistryPageProps {
  badge: string;
  title: string;
  subtitle: string;
  heroImg: string;
  icon: React.ReactNode;
  aboutText1: string;
  aboutText2: string;
  aboutText3?: string;
  visionText: string;
  joinText: string;
  ctaSubtitle?: string;
  pillars: { icon: React.ReactNode; title: string; desc: string }[];
  galleryImgs?: string[];
}

function MinistryPageTemplate({
  badge, title, subtitle, heroImg, icon, aboutText1, aboutText2, aboutText3, visionText, joinText, ctaSubtitle, pillars,
}: MinistryPageProps) {
  return (
    <div className="w-full bg-white min-h-screen text-[#222d61]">

      {/* ── 1. Page Header ───────────────────────────────────── */}
      <section className="pt-20 pb-16 px-6 md:px-12 border-b border-slate-200 bg-white">
        <div className="max-w-[1600px] mx-auto">
          
          {/* Breadcrumb / Tag */}
          <div className="flex items-center gap-2 mb-8 font-tech text-xs font-bold text-slate-400 uppercase tracking-widest">
            <Link to="/ministries" className="hover:text-[#D92B27] transition-colors flex items-center gap-1">
              MINISTRIES <ChevronRight size={12} />
            </Link>
            <span className="text-[#D92B27]">{badge}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Title & Subtitle */}
            <div className="lg:col-span-7">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-khand font-bold text-[#222d61] leading-none uppercase mb-6"
                style={{ fontSize: 'clamp(44px, 7vw, 100px)', letterSpacing: '0.01em' }}
              >
                {title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="text-slate-500 text-lg md:text-xl leading-relaxed font-normal max-w-2xl"
              >
                {subtitle}
              </motion.p>
            </div>

            {/* Hero Image Showcase Card */}
            <div className="lg:col-span-5 flex justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="w-full max-w-md bg-[#F8F9FA] border border-slate-200 overflow-hidden shadow-sm group"
              >
                <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
                  <img
                    src={heroImg}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-[#222d61] text-white font-tech text-[9px] font-bold uppercase tracking-widest">
                    {badge}
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. Who We Are (About Section) ────────────────────── */}
      <section className="py-16 px-6 md:px-12 bg-[#F8F9FA] border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <Reveal className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4 font-tech text-xs font-bold text-[#D92B27] uppercase tracking-[0.25em]">
              <span className="w-6 h-px bg-[#D92B27]" />
              <span>ABOUT THIS MINISTRY</span>
            </div>
            <h2
              className="font-khand font-bold uppercase text-[#222d61] leading-none mb-6"
              style={{ fontSize: 'clamp(36px, 5vw, 68px)', letterSpacing: '0.01em' }}
            >
              WHO WE ARE
            </h2>
            <div className="w-12 h-12 border border-[#D92B27]/20 bg-[#D92B27]/5 flex items-center justify-center text-[#D92B27]">
              {icon}
            </div>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-7 space-y-5 text-slate-600 text-base md:text-lg leading-relaxed font-normal">
            <p className="text-[#222d61] font-semibold">{aboutText1}</p>
            <p>{aboutText2}</p>
            {aboutText3 && <p>{aboutText3}</p>}
          </Reveal>

        </div>
      </section>

      {/* ── 3. What We Do (Focus Pillars Grid) ───────────────── */}
      <section className="py-16 px-6 md:px-12 bg-white border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto">
          
          <Reveal className="mb-12">
            <div className="flex items-center gap-3 mb-4 font-tech text-xs font-bold text-[#D92B27] uppercase tracking-[0.25em]">
              <span className="w-6 h-px bg-[#D92B27]" />
              <span>KEY INITIATIVES</span>
            </div>
            <h2
              className="font-khand font-bold uppercase text-[#222d61] leading-none"
              style={{ fontSize: 'clamp(36px, 5vw, 68px)', letterSpacing: '0.01em' }}
            >
              OUR FOCUS AREAS
            </h2>
          </Reveal>

          {/* Grid Layout with Hairline Borders */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
            {pillars.map((p, i) => (
              <Reveal key={i} delay={i * 0.05} className="bg-white p-8 flex flex-col justify-between group hover:bg-[#222d61] transition-all duration-400">
                <div>
                  <div className="w-10 h-10 border border-slate-200 group-hover:border-white/20 bg-slate-50 group-hover:bg-white/10 flex items-center justify-center text-[#D92B27] group-hover:text-[#FFE600] transition-colors mb-6">
                    {p.icon}
                  </div>
                  <span className="font-tech text-[9px] font-bold text-slate-400 group-hover:text-[#FFE600] uppercase tracking-widest block mb-2">
                    // FOCUS 0{i + 1}
                  </span>
                  <h3
                    className="font-khand font-bold uppercase text-[#222d61] group-hover:text-white leading-tight mb-3 transition-colors"
                    style={{ fontSize: 'clamp(20px, 1.8vw, 26px)', letterSpacing: '0.01em' }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-slate-500 group-hover:text-white/70 text-sm leading-relaxed font-normal transition-colors">
                    {p.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4. Vision & Join Information ─────────────────────── */}
      <section className="py-16 px-6 md:px-12 bg-[#F8F9FA]">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <Reveal delay={0}>
            <div className="bg-white border border-slate-200 p-8 md:p-10 h-full flex flex-col justify-between">
              <div>
                <span className="font-tech text-xs font-bold uppercase tracking-widest text-[#D92B27] block mb-3">
                  // OUR VISION
                </span>
                <h3
                  className="font-khand font-bold uppercase text-[#222d61] leading-none mb-4"
                  style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '0.01em' }}
                >
                  PURPOSE &amp; MISSION
                </h3>
                <p className="text-slate-600 text-base leading-relaxed font-normal">
                  {visionText}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-white border border-slate-200 p-8 md:p-10 h-full flex flex-col justify-between">
              <div>
                <span className="font-tech text-xs font-bold uppercase tracking-widest text-[#D92B27] block mb-3">
                  // HOW TO JOIN
                </span>
                <h3
                  className="font-khand font-bold uppercase text-[#222d61] leading-none mb-4"
                  style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '0.01em' }}
                >
                  GET INVOLVED
                </h3>
                <p className="text-slate-600 text-base leading-relaxed font-normal">
                  {joinText}
                </p>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ── 5. Bottom CTA ────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-[#222d61] text-white">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="font-tech text-xs font-bold text-[#FFE600] uppercase tracking-widest block mb-2">
              // BE PART OF THIS MINISTRY
            </span>
            <h2
              className="font-khand font-bold uppercase text-white leading-none"
              style={{ fontSize: 'clamp(32px, 4.5vw, 64px)', letterSpacing: '0.01em' }}
            >
              SERVE WITH US <span className="font-serif-italic font-normal text-[#FFE600] lowercase">this week</span>
            </h2>
            <p className="text-white/60 text-base mt-2 max-w-xl font-normal">
              {ctaSubtitle || "Connect with our corps officers or team leaders to get involved and serve together."}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 shrink-0">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-[#D92B27] hover:bg-[#FFE600] text-white hover:text-[#222d61] font-tech font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg"
            >
              <span>CONTACT US</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link
              to="/ministries"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 hover:border-white text-white font-tech font-bold text-xs uppercase tracking-widest transition-all"
            >
              <span>ALL MINISTRIES</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

/* ─────────────────────────────── INDIVIDUAL PAGES ──────────────────────────── */

export function SAYYouthPage() {
  return <MinistryPageTemplate
    badge="YOUTH MINISTRY"
    title="SAY YOUTH GROUP"
    subtitle="Formed in 2008 as the Salvation Army Youth (SAY Group), our youth fellowship stands as a core pillar of spiritual growth, teamwork, and active community outreach at TSA Sion Tamil Corps."
    heroImg={media("/DSC_0004.webp")}
    icon={<Users size={22} />}
    aboutText1="Youth ministry has been one of the foundational pillars of our church. Since 2008, youth members have united under the Salvation Army Youth (SAY Group) to work toward the spiritual upbringing of the younger generation and actively support the ongoing development of the church."
    aboutText2="Notable works of the SAY Group include designing the annual Christmas Nativity Crib—a landmark display of teamwork, artistic creativity, and faith that has become a prominent attraction in Sion each December. The youth also organize healthcare initiatives and free medical camps in partnership with leading Mumbai hospitals."
    aboutText3="Our flagship annual event is the Youth Retreat, a special one-day conference held collaboratively with member churches of the Salvation Army Mumbai Division, equipping young leaders to live with purpose and conviction."
    visionText="To nurture a generation of Christ-centered young leaders who are spiritually grounded, active in prayer, and dedicated to serving the community through love and practical social action."
    joinText="Youth members gather every Saturday at 9:00 PM for prayer and fellowship, as well as every Sunday afternoon at 12:45 PM. All young people are warmly welcome to join!"
    ctaSubtitle="Join our Saturday evening prayer circles and Sunday fellowship to grow in faith with passionate young leaders."
    galleryImgs={['/DSC_0004.webp', '/DSC_0006.webp', '/DSC_0001.webp']}
    pillars={[
      { icon: <BookOpen size={18} />, title: 'SATURDAY NIGHT PRAYER', desc: 'Weekly evening prayer at 9:00 PM to intercede, study scripture, and build strong spiritual bonds.' },
      { icon: <Users size={18} />,    title: 'SUNDAY YOUTH FELLOWSHIP', desc: 'Fellowship meetings every Sunday at 12:45 PM featuring praise, discussions, and leadership training.' },
      { icon: <Star size={18} />,     title: 'CHRISTMAS NATIVITY CRIB', desc: 'An annual tradition displaying teamwork, creativity, and faith that draws visitors from across Sion.' },
      { icon: <Shield size={18} />,   title: 'COMMUNITY MEDICAL CAMPS', desc: 'Collaborating with healthcare organizations and hospitals to conduct free health checkup camps.' },
      { icon: <Heart size={18} />,    title: 'ANNUAL YOUTH RETREAT', desc: 'Our flagship one-day conference bringing together youth from churches across the Mumbai Division.' },
      { icon: <BookOpen size={18} />, title: 'BIBLE DRAMA & QUIZZES', desc: 'Engaging young minds through creative arts, skits, gospel music, and interactive scripture study.' },
    ]}
  />;
}

export function JuniorHomeLeaguePage() {
  return <MinistryPageTemplate
    badge="GIRLS MINISTRY"
    title="JUNIOR HOME LEAGUE"
    subtitle="Nurturing young unmarried women soldiers in spiritual depth, moral integrity, fellowship, and Christian service."
    heroImg={media("/DSC_0006.webp")}
    icon={<Heart size={22} />}
    aboutText1="Women's ministry holds central importance in our church, and the Junior Home League is dedicated specifically to young unmarried women soldiers. It ensures their spiritual and personal development by guiding them into a vibrant, engaged Christian lifestyle."
    aboutText2="Junior Home League meetings take place twice a month following Sunday worship services. Through structured Bible studies, practical life skills workshops, and sisterly fellowship, young women build an enduring foundation of faith and moral leadership."
    aboutText3="Members actively participate in Sunday worship, divisional and territorial rallies, cultural performances, and benevolent outreach initiatives across the Salvation Army network."
    visionText="To empower young women with spiritual wisdom, strong character, and a heart for service as they fulfill their calling in their homes, church, and society."
    joinText="Young unmarried women soldiers meet twice monthly after Sunday services. Reach out to our Junior Home League leaders to participate!"
    ctaSubtitle="Connect with the Junior Home League to experience enriching fellowship and spiritual growth."
    galleryImgs={['/DSC_0006.webp', '/DSC_0003.webp']}
    pillars={[
      { icon: <Heart size={18} />,    title: 'BI-MONTHLY MEETINGS', desc: 'Twice-monthly gatherings held after Sunday service focused on scripture and personal growth.' },
      { icon: <Users size={18} />,    title: 'SPIRITUAL FELLOWSHIP', desc: 'Building strong bonds of sisterhood and spiritual encouragement among young women.' },
      { icon: <Star size={18} />,     title: 'LIFE SKILLS & CHARACTER', desc: 'Developing practical life skills, ethical leadership, and Christian character.' },
      { icon: <Shield size={18} />,   title: 'DIVISIONAL RALLIES', desc: 'Participating in divisional and territorial rallies featuring music, drama, and cultural programs.' },
      { icon: <BookOpen size={18} />, title: 'SCRIPTURE STUDY', desc: 'Interactive Bible lessons addressing contemporary challenges with biblical wisdom.' },
      { icon: <Heart size={18} />,    title: 'COMMUNITY SERVICE', desc: 'Engaging in acts of mercy and supportive church projects alongside the Senior Home League.' },
    ]}
  />;
}

export function HomeLeaguePage() {
  return <MinistryPageTemplate
    badge="WOMEN'S MINISTRY"
    title="HOME LEAGUE WOMEN"
    subtitle="A cornerstone ministry for married women focusing on prayer intercession, home blessings, fellowship, and international prayer solidarity."
    heroImg={media("/DSC_0811.webp")}
    icon={<Heart size={22} />}
    aboutText1="The Senior Home League at TSA Sion Tamil Corps is a vibrant ministry dedicated to married women, fostering spiritual growth, strong Christian households, and corporate intercession."
    aboutText2="Our members gather twice a month for fellowship and maintain two vital weekly prayer ministries: Friday Fasting Prayer at 11:00 AM to intercede for the church, local ministries, and the nation; and Monday Cottage Meetings at 12:00 PM, visiting members' homes to pray for household blessings."
    aboutText3="Each year, our women participate in the Senior Home League Rally organized at the divisional and territorial levels. We also observe the World Day of Prayer, joining women globally to pray for and learn about different nations."
    visionText="To cultivate godly women who model Christian love in their families, intercede faithfully for the church and nation, and serve the community with compassionate hearts."
    joinText="Women meet every Friday at 11:00 AM for Fasting Prayer, every Monday at 12:00 PM for Cottage Meetings, and twice monthly for Home League gatherings."
    ctaSubtitle="Join our women's intercessory prayer network and home fellowship circles."
    galleryImgs={['/DSC_0811.webp', '/DSC_0002.webp']}
    pillars={[
      { icon: <Heart size={18} />,    title: 'FRIDAY FASTING PRAYER', desc: 'Gathering every Friday at 11:00 AM to intercede for the church, ministries, and nation.' },
      { icon: <Users size={18} />,    title: 'MONDAY COTTAGE MEETINGS', desc: 'Visiting members\' homes every Monday at 12:00 PM to pray for family peace and blessings.' },
      { icon: <Star size={18} />,     title: 'SENIOR HOME LEAGUE RALLY', desc: 'Participating in annual divisional rallies with inspirational messages and cultural events.' },
      { icon: <Shield size={18} />,   title: 'WORLD DAY OF PRAYER', desc: 'Joining women worldwide annually to intercede for global peace and study different nations.' },
      { icon: <BookOpen size={18} />, title: 'BI-MONTHLY MEETINGS', desc: 'Twice-monthly gatherings focused on spiritual instruction, family care, and fellowship.' },
      { icon: <Heart size={18} />,    title: 'PRACTICAL BENEVOLENCE', desc: 'Supporting needy families, visiting sick members, and assisting in church programs.' },
    ]}
  />;
}

export function ChildrensMinistriesPage() {
  return <MinistryPageTemplate
    badge="CHILDREN'S MINISTRY"
    title="CHILDREN'S MINISTRIES"
    subtitle="Nurturing young hearts in biblical truth, action songs, memory verses, and Vacation Bible School (VBS)."
    heroImg={media("/DSC_0003.webp")}
    icon={<Star size={22} />}
    aboutText1="Children's Ministry at TSA Sion Tamil Corps provides a safe, joyful, and Christ-centered environment where young minds learn God's word and grow in faith."
    aboutText2="Every Sunday at 12:00 PM, dedicated teachers lead Sunday School classes featuring engaging Bible stories, action songs, memory verse challenges, and creative crafts suited for children of all ages."
    aboutText3="A major highlight of our children's year is the Vacation Bible School (VBS)—a week-long immersive spiritual program conducted every November, packed with music, games, drama, and deep biblical lessons."
    visionText="To plant seeds of faith in every child's heart, helping them understand God's love and build a strong foundation for a lifelong walk with Christ."
    joinText="Sunday School convenes every Sunday at 12:00 PM. All children in the community are welcome to join our weekly classes and November VBS!"
    ctaSubtitle="Bring your children to Sunday School every week at 12:00 PM for inspiring Bible learning."
    galleryImgs={['/DSC_0003.webp', '/DSC_0001.webp', '/DSC_0006.webp']}
    pillars={[
      { icon: <BookOpen size={18} />, title: 'SUNDAY SCHOOL (12:00 PM)', desc: 'Weekly Sunday classes delivering age-appropriate Bible lessons and interactive activities.' },
      { icon: <Star size={18} />,     title: 'NOVEMBER VBS WEEK', desc: 'A week-long Vacation Bible School held every November with music, crafts, and games.' },
      { icon: <Heart size={18} />,    title: 'ACTION SONGS & PRAISE', desc: 'Teaching energetic action songs and simple prayers that foster joyful worship.' },
      { icon: <Users size={18} />,    title: 'BIBLE MEMORY VERSES', desc: 'Guiding children to memorize Scripture passages that stay with them for life.' },
      { icon: <Shield size={18} />,   title: 'CREATIVE CRAFTS & DRAMA', desc: 'Hands-on crafts and seasonal plays bringing Christmas and Easter stories to life.' },
      { icon: <Star size={18} />,     title: 'SAFE & CARING ATMOSPHERE', desc: 'Ensuring a secure, loving, and supportive space where every child feels valued.' },
    ]}
  />;
}

export function MedicalFellowshipPage() {
  return <MinistryPageTemplate
    badge="HEALTHCARE MINISTRY"
    title="MEDICAL FELLOWSHIP"
    subtitle="Mobilizing doctors, nurses, and healthcare workers within our corps to provide free medical camps and compassionate health services."
    heroImg={media("/choir.webp")}
    icon={<Shield size={22} />}
    aboutText1="The Medical Fellowship unites healthcare professionals, doctors, nurses, and medical staff within our congregation to serve the community through medical outreach and health education."
    aboutText2="Our medical staff hold dedicated Sunday meetings to plan healthcare initiatives and coordinate with the SAY Youth Group. Together, they organize free community medical checkup camps across Sion and surrounding neighborhoods."
    aboutText3="From basic diagnostic screenings, blood pressure monitoring, and eye checks to free medicine distribution and health awareness counseling, our medical fellowship reflects Christ's healing compassion."
    visionText="To demonstrate the love of God by delivering quality medical care, health education, and spiritual support to underserved communities in Mumbai."
    joinText="Healthcare workers, nurses, doctors, and volunteers can connect with our Medical Fellowship leaders during dedicated Sunday meetings."
    ctaSubtitle="Join our team of healthcare volunteers or support our upcoming community medical camps."
    galleryImgs={['/choir.webp', '/DSC_0002.webp']}
    pillars={[
      { icon: <Shield size={18} />,   title: 'FREE COMMUNITY MEDICAL CAMPS', desc: 'Organizing free diagnostic and health checkup camps in Sion and Dharavi in collaboration with youth.' },
      { icon: <Heart size={18} />,    title: 'HEALTHCARE STAFF NETWORK', desc: 'Uniting Christian doctors, nurses, and medical professionals in corporate fellowship and service.' },
      { icon: <Users size={18} />,    title: 'HOSPITAL COLLABORATION', desc: 'Partnering with leading Mumbai hospitals and health organizations for specialized care.' },
      { icon: <Star size={18} />,     title: 'PREVENTIVE HEALTH EDUCATION', desc: 'Conducting awareness sessions on hygiene, disease prevention, nutrition, and wellness.' },
      { icon: <BookOpen size={18} />, title: 'DEDICATED SUNDAY MEETINGS', desc: 'Monthly gatherings for prayer, professional encouragement, and outreach strategy.' },
      { icon: <Shield size={18} />,   title: 'MEDICINE DISTRIBUTION & AID', desc: 'Providing basic medicines, health consultations, and prayer support for patients in need.' },
    ]}
  />;
}

export function MediaMinistryPage() {
  return <MinistryPageTemplate
    badge="MEDIA OUTREACH"
    title="MEDIA MINISTRY"
    subtitle="A rapidly growing wing of our church dedicated to representing TSA Sion Tamil Corps across digital platforms, live-streaming services, and developing mobile apps to reach believers worldwide."
    heroImg={media("/choir.webp")}
    icon={<Video size={22} />}
    aboutText1="The Media Ministry is a rapidly growing wing of our church responsible for the digital representation of TSA Sion Tamil Corps across modern media platforms, ensuring God's Word reaches remote locations and homes around the world."
    aboutText2="Sunday Services, Half Night Prayer Services, and Special Meetings are live streamed through our official YouTube and Facebook channels. We have also developed our own mobile application—The Salvation Army Hymns and Bible App—providing pocket-level access for believers with over 5,000+ downloads, especially across African and Middle Eastern nations."
    aboutText3="Our media team constantly brainstorms and introduces creative initiatives to share the Gospel, notably our weekly 'One Minute Sermon' series—delivering God's Word in quick 60-second video reflections on the go. Believers can also support our media initiatives through donations to help expand our broadcasting capabilities."
    visionText="To leverage digital media, live streams, and mobile app technology to proclaim the Gospel and connect believers across the globe with our church family."
    joinText="If you have skills in videography, live streaming, video editing, sound engineering, app development, or graphic design, get in touch with our Media Team!"
    ctaSubtitle="Support our media outreach or join our creative team to share God's Word worldwide."
    galleryImgs={['/choir.webp', '/DSC_0002.webp', '/DSC_0004.webp']}
    pillars={[
      { icon: <Video size={18} />,     title: 'LIVE SERVICE STREAMS', desc: 'Live broadcasting Sunday Services, Half Night Prayer, and Special Meetings on YouTube and Facebook.' },
      { icon: <Shield size={18} />,    title: 'HYMNS & BIBLE MOBILE APP', desc: 'Custom mobile app with 5,000+ downloads serving believers in Africa, the Middle East, and beyond.' },
      { icon: <Star size={18} />,      title: 'ONE MINUTE SERMON SERIES', desc: 'Weekly short video devotionals sharing God\'s message in a bite-sized format for people on the go.' },
      { icon: <BookOpen size={18} />,  title: 'SOCIAL MEDIA OUTREACH', desc: 'Managing YouTube, Facebook, and Instagram channels to broadcast worship and engage the community.' },
      { icon: <Heart size={18} />,     title: 'SANCTUARY AUDIO & SOUND', desc: 'Operating sound systems, microphones, and digital audio mixing for all church services and events.' },
      { icon: <Users size={18} />,     title: 'DIGITAL INNOVATIONS & AID', desc: 'Upgrading broadcasting equipment and inviting donations to support our global digital outreach initiatives.' },
    ]}
  />;
}

export function SundayWorshipPage() {
  return <MinistryPageTemplate
    badge="WORSHIP SERVICES"
    title="SUNDAY WORSHIP"
    subtitle="Gathering as one body in Christ for vibrant Tamil praise, prayer, Scripture teaching, and Holiness meetings every Sunday."
    heroImg={media("/DSC_0002.webp")}
    icon={<BookOpen size={22} />}
    aboutText1="Sunday Worship at TSA Sion Tamil Corps is the heartbeat of our church family, gathering believers of all ages to glorify God and hear His life-transforming Word."
    aboutText2="Our primary Holiness Meeting takes place every Sunday morning from 10:15 AM to 12:30 PM. It features spirit-filled Tamil praise and worship, congregational prayer, testimony sharing, and expository preaching."
    aboutText3="Whether you are seeking a spiritual home, visiting Mumbai, or looking to grow in faith, you will find a warm welcome and genuine Christian community at our Sunday services."
    visionText="To glorify God through holy, spirit-filled worship, bold proclamation of the Gospel, and loving fellowship that builds mature disciples."
    joinText="Join us every Sunday morning for our Holiness Service from 10:15 AM to 12:30 PM. Visitors and families are warmly welcomed!"
    ctaSubtitle="We look forward to worshipping with you this Sunday at TSA Sion Tamil Corps!"
    galleryImgs={['/DSC_0002.webp', '/DSC_0006.webp', '/DSC_0004.webp']}
    pillars={[
      { icon: <BookOpen size={18} />, title: 'HOLINESS MEETING (10:15 AM)', desc: 'Our main Sunday worship service focusing on holy living, praise, and sound biblical teaching.' },
      { icon: <Heart size={18} />,    title: 'SPIRIT-FILLED TAMIL WORSHIP', desc: 'Vibrant corporate praise and music exalting God led by our dedicated song leaders and choir.' },
      { icon: <Star size={18} />,     title: 'EXPOSITORY PREACHING', desc: 'Anointed messages grounded in Scripture to equip believers for daily Christian life.' },
      { icon: <Users size={18} />,    title: 'CONGREGATIONAL PRAYER', desc: 'Interceding together for the church family, sick members, Mumbai city, and our nation.' },
      { icon: <Shield size={18} />,   title: 'TESTIMONY SHARING', desc: 'Believers sharing powerful testimonies of God\'s grace, healing, and answered prayers.' },
      { icon: <BookOpen size={18} />, title: 'WARM CHRISTIAN FELLOWSHIP', desc: 'Building genuine relationships and welcoming new visitors into our church family.' },
    ]}
  />;
}
