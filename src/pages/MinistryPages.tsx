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
  badge, title, subtitle, heroImg, icon, aboutText1, aboutText2, aboutText3, visionText, joinText, ctaSubtitle, pillars, galleryImgs = [],
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
            <p className="text-slate-600 text-base leading-relaxed font-medium mb-5">{aboutText1}</p>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-medium mb-5">{aboutText2}</p>
            {aboutText3 && <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-medium">{aboutText3}</p>}
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

      {/* ── Vision & Join Info block ──────────────────────────── */}
      <section className="py-20 px-6 md:px-10">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Reveal delay={0}>
            <div className="bg-white rounded-3xl border border-slate-200 p-8 h-full">
              <h3 className="font-black uppercase text-sm tracking-tight text-[#D92B27] mb-1">
                Our Vision
              </h3>
              <h4 className="font-bold uppercase text-base tracking-tight text-[#0A1128] mb-4"
                style={{ fontFamily: 'Unbounded' }}>
                Purpose &amp; Mission
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">{visionText}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-white rounded-3xl border border-slate-200 p-8 h-full">
              <h3 className="font-black uppercase text-sm tracking-tight text-[#D92B27] mb-1">
                How To Join
              </h3>
              <h4 className="font-bold uppercase text-base tracking-tight text-[#0A1128] mb-4"
                style={{ fontFamily: 'Unbounded' }}>
                Get Involved
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">{joinText}</p>
            </div>
          </Reveal>
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
            <p className="text-white/60 text-base font-medium max-w-lg mx-auto mb-8">
              {ctaSubtitle || "Connect with our corps officers or team leaders to get involved and serve together."}
            </p>
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
    subtitle="Formed in 2008 as the Salvation Army Youth (SAY Group), our youth fellowship stands as a core pillar of spiritual growth, teamwork, and active community outreach at TSA Sion Tamil Corps."
    heroImg="/DSC_0004.webp"
    icon={<Users size={22} />}
    aboutText1="Youth ministry has been one of the foundational pillars of our church. Since 2008, youth members have united under the Salvation Army Youth (SAY Group) to work toward the spiritual upbringing of the younger generation and actively support the ongoing development of the church."
    aboutText2="Notable works of the SAY Group include designing the annual Christmas Nativity Crib—a landmark display of teamwork, artistic creativity, and faith that has become a prominent attraction in Sion each December. The youth also organize healthcare initiatives and free medical camps in partnership with leading Mumbai hospitals."
    aboutText3="Our flagship annual event is the Youth Retreat, a special one-day conference held collaboratively with member churches of the Salvation Army Mumbai Division, equipping young leaders to live with purpose and conviction."
    visionText="To nurture a generation of Christ-centered young leaders who are spiritually grounded, active in prayer, and dedicated to serving the community through love and practical social action."
    joinText="Youth members gather every Saturday at 9:00 PM for prayer and fellowship, as well as every Sunday afternoon at 12:45 PM. All young people are warmly welcome to join!"
    ctaSubtitle="Join our Saturday evening prayer circles and Sunday fellowship to grow in faith with passionate young leaders."
    galleryImgs={['/DSC_0004.webp', '/DSC_0006.webp', '/DSC_0001.webp']}
    pillars={[
      { icon: <BookOpen size={18} />, title: 'Saturday Night Prayer', desc: 'Weekly evening prayer at 9:00 PM to intercede, study scripture, and build strong spiritual bonds.' },
      { icon: <Users size={18} />,    title: 'Sunday Youth Fellowship', desc: 'Fellowship meetings every Sunday at 12:45 PM featuring praise, discussions, and leadership training.' },
      { icon: <Star size={18} />,     title: 'Christmas Nativity Crib', desc: 'An annual tradition displaying teamwork, creativity, and faith that draws visitors from across Sion.' },
      { icon: <Shield size={18} />,   title: 'Community Medical Camps', desc: 'Collaborating with healthcare organizations and hospitals to conduct free health checkup camps.' },
      { icon: <Heart size={18} />,    title: 'Annual Youth Retreat', desc: 'Our flagship one-day conference bringing together youth from churches across the Mumbai Division.' },
      { icon: <BookOpen size={18} />, title: 'Bible Drama & Quizzes', desc: 'Engaging young minds through creative arts, skits, gospel music, and interactive scripture study.' },
    ]}
  />;
}

export function JuniorHomeLeaguePage() {
  return <MinistryPageTemplate
    badge="Girls Ministry"
    title="Junior Home League"
    subtitle="Nurturing young unmarried women soldiers in spiritual depth, moral integrity, fellowship, and Christian service."
    heroImg="/DSC_0006.webp"
    icon={<Heart size={22} />}
    aboutText1="Women's ministry holds central importance in our church, and the Junior Home League is dedicated specifically to young unmarried women soldiers. It ensures their spiritual and personal development by guiding them into a vibrant, engaged Christian lifestyle."
    aboutText2="Junior Home League meetings take place twice a month following Sunday worship services. Through structured Bible studies, practical life skills workshops, and sisterly fellowship, young women build an enduring foundation of faith and moral leadership."
    aboutText3="Members actively participate in Sunday worship, divisional and territorial rallies, cultural performances, and benevolent outreach initiatives across the Salvation Army network."
    visionText="To empower young women with spiritual wisdom, strong character, and a heart for service as they fulfill their calling in their homes, church, and society."
    joinText="Young unmarried women soldiers meet twice monthly after Sunday services. Reach out to our Junior Home League leaders to participate!"
    ctaSubtitle="Connect with the Junior Home League to experience enriching fellowship and spiritual growth."
    galleryImgs={['/DSC_0006.webp', '/DSC_0003.webp']}
    pillars={[
      { icon: <Heart size={18} />,    title: 'Bi-Monthly Meetings', desc: 'Twice-monthly gatherings held after Sunday service focused on scripture and personal growth.' },
      { icon: <Users size={18} />,    title: 'Spiritual Fellowship', desc: 'Building strong bonds of sisterhood and spiritual encouragement among young women.' },
      { icon: <Star size={18} />,     title: 'Life Skills & Character', desc: 'Developing practical life skills, ethical leadership, and Christian character.' },
      { icon: <Shield size={18} />,   title: 'Divisional Rallies', desc: 'Participating in divisional and territorial rallies featuring music, drama, and cultural programs.' },
      { icon: <BookOpen size={18} />, title: 'Scripture Study', desc: 'Interactive Bible lessons addressing contemporary challenges with biblical wisdom.' },
      { icon: <Heart size={18} />,    title: 'Community Service', desc: 'Engaging in acts of mercy and supportive church projects alongside the Senior Home League.' },
    ]}
  />;
}

export function HomeLeaguePage() {
  return <MinistryPageTemplate
    badge="Women's Ministry"
    title={`Home League\nWomen`}
    subtitle="A cornerstone ministry for married women focusing on prayer intercession, home blessings, fellowship, and international prayer solidarity."
    heroImg="/DSC_0811.webp"
    icon={<Heart size={22} />}
    aboutText1="The Senior Home League at TSA Sion Tamil Corps is a vibrant ministry dedicated to married women, fostering spiritual growth, strong Christian households, and corporate intercession."
    aboutText2="Our members gather twice a month for fellowship and maintain two vital weekly prayer ministries: Friday Fasting Prayer at 11:00 AM to intercede for the church, local ministries, and the nation; and Monday Cottage Meetings at 12:00 PM, visiting members' homes to pray for household blessings."
    aboutText3="Each year, our women participate in the Senior Home League Rally organized at the divisional and territorial levels. We also observe the World Day of Prayer, joining women globally to pray for and learn about different nations."
    visionText="To cultivate godly women who model Christian love in their families, intercede faithfully for the church and nation, and serve the community with compassionate hearts."
    joinText="Women meet every Friday at 11:00 AM for Fasting Prayer, every Monday at 12:00 PM for Cottage Meetings, and twice monthly for Home League gatherings."
    ctaSubtitle="Join our women's intercessory prayer network and home fellowship circles."
    galleryImgs={['/DSC_0811.webp', '/DSC_0002.webp']}
    pillars={[
      { icon: <Heart size={18} />,    title: 'Friday Fasting Prayer', desc: 'Gathering every Friday at 11:00 AM to intercede for the church, ministries, and nation.' },
      { icon: <Users size={18} />,    title: 'Monday Cottage Meetings', desc: 'Visiting members\' homes every Monday at 12:00 PM to pray for family peace and blessings.' },
      { icon: <Star size={18} />,     title: 'Senior Home League Rally', desc: 'Participating in annual divisional rallies with inspirational messages and cultural events.' },
      { icon: <Shield size={18} />,   title: 'World Day of Prayer', desc: 'Joining women worldwide annually to intercede for global peace and study different nations.' },
      { icon: <BookOpen size={18} />, title: 'Bi-Monthly Meetings', desc: 'Twice-monthly gatherings focused on spiritual instruction, family care, and fellowship.' },
      { icon: <Heart size={18} />,    title: 'Practical Benevolence', desc: 'Supporting needy families, visiting sick members, and assisting in church programs.' },
    ]}
  />;
}

export function ChildrensMinistriesPage() {
  return <MinistryPageTemplate
    badge="Children's Ministry"
    title="Children's Ministries"
    subtitle="Nurturing young hearts in biblical truth, action songs, memory verses, and Vacation Bible School (VBS)."
    heroImg="/DSC_0003.webp"
    icon={<Star size={22} />}
    aboutText1="Children's Ministry at TSA Sion Tamil Corps provides a safe, joyful, and Christ-centered environment where young minds learn God's word and grow in faith."
    aboutText2="Every Sunday at 12:00 PM, dedicated teachers lead Sunday School classes featuring engaging Bible stories, action songs, memory verse challenges, and creative crafts suited for children of all ages."
    aboutText3="A major highlight of our children's year is the Vacation Bible School (VBS)—a week-long immersive spiritual program conducted every November, packed with music, games, drama, and deep biblical lessons."
    visionText="To plant seeds of faith in every child's heart, helping them understand God's love and build a strong foundation for a lifelong walk with Christ."
    joinText="Sunday School convenes every Sunday at 12:00 PM. All children in the community are welcome to join our weekly classes and November VBS!"
    ctaSubtitle="Bring your children to Sunday School every week at 12:00 PM for inspiring Bible learning."
    galleryImgs={['/DSC_0003.webp', '/DSC_0001.webp', '/DSC_0006.webp']}
    pillars={[
      { icon: <BookOpen size={18} />, title: 'Sunday School (12:00 PM)', desc: 'Weekly Sunday classes delivering age-appropriate Bible lessons and interactive activities.' },
      { icon: <Star size={18} />,     title: 'November VBS Week', desc: 'A week-long Vacation Bible School held every November with music, crafts, and games.' },
      { icon: <Heart size={18} />,    title: 'Action Songs & Praise', desc: 'Teaching energetic action songs and simple prayers that foster joyful worship.' },
      { icon: <Users size={18} />,    title: 'Bible Memory Verses', desc: 'Guiding children to memorize Scripture passages that stay with them for life.' },
      { icon: <Shield size={18} />,   title: 'Creative Crafts & Drama', desc: 'Hands-on crafts and seasonal plays bringing Christmas and Easter stories to life.' },
      { icon: <Star size={18} />,     title: 'Safe & Caring Atmosphere', desc: 'Ensuring a secure, loving, and supportive space where every child feels valued.' },
    ]}
  />;
}

export function MedicalFellowshipPage() {
  return <MinistryPageTemplate
    badge="Healthcare Ministry"
    title="Medical Fellowship"
    subtitle="Mobilizing doctors, nurses, and healthcare workers within our corps to provide free medical camps and compassionate health services."
    heroImg="/choir.webp"
    icon={<Shield size={22} />}
    aboutText1="The Medical Fellowship unites healthcare professionals, doctors, nurses, and medical staff within our congregation to serve the community through medical outreach and health education."
    aboutText2="Our medical staff hold dedicated Sunday meetings to plan healthcare initiatives and coordinate with the SAY Youth Group. Together, they organize free community medical checkup camps across Sion and surrounding neighborhoods."
    aboutText3="From basic diagnostic screenings, blood pressure monitoring, and eye checks to free medicine distribution and health awareness counseling, our medical fellowship reflects Christ's healing compassion."
    visionText="To demonstrate the love of God by delivering quality medical care, health education, and spiritual support to underserved communities in Mumbai."
    joinText="Healthcare workers, nurses, doctors, and volunteers can connect with our Medical Fellowship leaders during dedicated Sunday meetings."
    ctaSubtitle="Join our team of healthcare volunteers or support our upcoming community medical camps."
    galleryImgs={['/choir.webp', '/DSC_0002.webp']}
    pillars={[
      { icon: <Shield size={18} />,   title: 'Free Community Medical Camps', desc: 'Organizing free diagnostic and health checkup camps in Sion and Dharavi in collaboration with youth.' },
      { icon: <Heart size={18} />,    title: 'Healthcare Staff Network', desc: 'Uniting Christian doctors, nurses, and medical professionals in corporate fellowship and service.' },
      { icon: <Users size={18} />,    title: 'Hospital Collaboration', desc: 'Partnering with leading Mumbai hospitals and health organizations for specialized care.' },
      { icon: <Star size={18} />,     title: 'Preventive Health Education', desc: 'Conducting awareness sessions on hygiene, disease prevention, nutrition, and wellness.' },
      { icon: <BookOpen size={18} />, title: 'Dedicated Sunday Meetings', desc: 'Monthly gatherings for prayer, professional encouragement, and outreach strategy.' },
      { icon: <Shield size={18} />,   title: 'Medicine Distribution & Aid', desc: 'Providing basic medicines, health consultations, and prayer support for patients in need.' },
    ]}
  />;
}

export function SundayWorshipPage() {
  return <MinistryPageTemplate
    badge="Worship Services"
    title="Sunday Worship"
    subtitle="Gathering as one body in Christ for vibrant Tamil praise, prayer, Scripture teaching, and Holiness meetings every Sunday."
    heroImg="/DSC_0002.webp"
    icon={<BookOpen size={22} />}
    aboutText1="Sunday Worship at TSA Sion Tamil Corps is the heartbeat of our church family, gathering believers of all ages to glorify God and hear His life-transforming Word."
    aboutText2="Our primary Holiness Meeting takes place every Sunday morning from 10:15 AM to 12:30 PM. It features spirit-filled Tamil praise and worship, congregational prayer, testimony sharing, and expository preaching."
    aboutText3="Whether you are seeking a spiritual home, visiting Mumbai, or looking to grow in faith, you will find a warm welcome and genuine Christian community at our Sunday services."
    visionText="To glorify God through holy, spirit-filled worship, bold proclamation of the Gospel, and loving fellowship that builds mature disciples."
    joinText="Join us every Sunday morning for our Holiness Service from 10:15 AM to 12:30 PM. Visitors and families are warmly welcomed!"
    ctaSubtitle="We look forward to worshipping with you this Sunday at TSA Sion Tamil Corps!"
    galleryImgs={['/DSC_0002.webp', '/DSC_0006.webp', '/DSC_0004.webp']}
    pillars={[
      { icon: <BookOpen size={18} />, title: 'Holiness Meeting (10:15 AM)', desc: 'Our main Sunday worship service focusing on holy living, praise, and sound biblical teaching.' },
      { icon: <Heart size={18} />,    title: 'Spirit-Filled Tamil Worship', desc: 'Vibrant corporate praise and music exalting God led by our dedicated song leaders and choir.' },
      { icon: <Star size={18} />,     title: 'Expository Preaching', desc: 'Anointed messages grounded in Scripture to equip believers for daily Christian life.' },
      { icon: <Users size={18} />,    title: 'Congregational Prayer', desc: 'Interceding together for the church family, sick members, Mumbai city, and our nation.' },
      { icon: <Shield size={18} />,   title: 'Testimony Sharing', desc: 'Believers sharing powerful testimonies of God\'s grace, healing, and answered prayers.' },
      { icon: <BookOpen size={18} />, title: 'Warm Christian Fellowship', desc: 'Building genuine relationships and welcoming new visitors into our church family.' },
    ]}
  />;
}
