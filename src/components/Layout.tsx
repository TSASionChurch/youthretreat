import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Radio, Heart, Sparkles } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home',       href: '/',          idx: '01' },
  { label: 'History',    href: '/history',    idx: '02' },
  { label: 'Ministries', href: '/ministries', idx: '03' },
  { label: 'Retreat 26', href: '/retreat',    idx: '04' },
  { label: 'Contact',    href: '/contact',    idx: '05' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isLinkActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-white text-[#222d61]">

      {/* Technical top utility bar */}
      <div className="hidden md:flex justify-between items-center px-8 py-2 bg-[#222d61] text-white text-[10px] font-tech uppercase tracking-widest border-b border-white/10">
        <div className="flex items-center gap-4 text-white/70">
          <span className="flex items-center gap-1.5 text-[#FFE600] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFE600] animate-pulse" />
            [LOC: SION, MUMBAI]
          </span>
          <span className="text-white/20">•</span>
          <span>EST. 1940</span>
          <span className="text-white/20">•</span>
          <span className="text-[#FFE600] font-bold">SUNDAY WORSHIP @ 9:00 AM</span>
        </div>

        <div className="flex items-center gap-5 text-white/70">
          <span>TSA SION CORPS</span>

          <a 
            href="https://www.youtube.com/@SalvationArmyTamilCorpsSion" 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-[#FFE600] transition-colors flex items-center gap-1.5 text-[#D92B27] font-bold"
          >
            <Radio size={12} className="animate-pulse" />
            LIVE BROADCAST
          </a>
        </div>
      </div>

      {/* Unified Floating Pill Header — No Gap */}
      <header className="sticky top-0 z-50 px-4 md:px-8 pt-2 pb-2 transition-all duration-300 pointer-events-none">
        <div className="max-w-[1500px] mx-auto glass-pill px-4 py-2 rounded-full shadow-2xl border border-white/20 flex items-center justify-between pointer-events-auto">
          
          {/* Logo container — Direct SVG without red circle */}
          <Link 
            to="/" 
            className="flex items-center gap-3 text-white pl-1 group"
            onClick={() => setMobileOpen(false)}
          >
            <img src="/logo.svg" alt="The Salvation Army" className="h-8 sm:h-9 object-contain group-hover:scale-105 transition-transform duration-300" />
            <div className="flex flex-col">
              <span className="font-syne font-extrabold text-sm tracking-tight leading-none text-white group-hover:text-[#FFE600] transition-colors">
                TSA SION
              </span>
              <span className="text-[9px] font-tech text-slate-300 uppercase tracking-widest mt-0.5">
                EST. 1940
              </span>
            </div>
          </Link>

          {/* Unified Center Navigation Bar */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative px-4 py-2 text-xs font-tech font-bold uppercase tracking-wider rounded-full transition-all duration-300 flex items-center gap-1.5 ${
                    active
                      ? 'bg-[#D92B27] text-white shadow-md'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFE600] inline-block shadow-[0_0_8px_#FFE600]" />
                  )}
                  <span>{link.label}</span>
                  <span className={`text-[9px] font-mono ${active ? 'text-white/70' : 'text-slate-400'}`}>
                    {link.idx}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Unified Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-2">
            <Link
              to="/donate"
              className="px-4 py-2 rounded-full bg-white text-[#222d61] hover:bg-[#FFE600] text-xs font-tech font-extrabold uppercase tracking-widest shadow-md transition-all duration-300 flex items-center gap-1.5 group hover:scale-105"
            >
              <span>Give / Support</span>
              <Heart size={13} className="text-[#D92B27] fill-[#D92B27]" />
            </Link>
            
            <Link
              to="/register"
              className="px-4 py-2 rounded-full bg-[#D92B27] text-white hover:bg-[#FFE600] hover:text-[#222d61] text-xs font-tech font-extrabold uppercase tracking-widest shadow-lg transition-all duration-300 flex items-center gap-1.5 group hover:scale-105"
            >
              <span>Register Now</span>
              <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-10 h-10 rounded-full bg-[#222d61] border border-white/10 text-white flex items-center justify-center shadow-lg hover:bg-[#D92B27] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="lg:hidden mt-3 mx-auto max-w-[1400px] glass-pill rounded-2xl p-6 shadow-2xl border border-white/15 pointer-events-auto flex flex-col gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-tech text-[#FFE600] font-bold tracking-widest">
              <span>// MENU NAVIGATION</span>
              <span>[N.01/05]</span>
            </div>
            
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 text-xs font-tech font-bold uppercase tracking-widest rounded-xl transition-all flex justify-between items-center ${
                  isLinkActive(link.href)
                    ? 'text-white bg-[#D92B27] shadow-md'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  {isLinkActive(link.href) && <span className="w-2 h-2 rounded-full bg-[#FFE600]" />}
                  <span>{link.label}</span>
                </div>
                <span className="text-[10px] font-mono text-white/50">// {link.idx}</span>
              </Link>
            ))}

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <Link
                to="/retreat"
                onClick={() => setMobileOpen(false)}
                className="w-full py-3 bg-[#FFE600] text-[#222d61] text-xs font-tech font-extrabold uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 shadow-md"
              >
                <Sparkles size={14} className="text-[#D92B27]" />
                <span>Youth Retreat 2026</span>
              </Link>
              <Link
                to="/donate"
                onClick={() => setMobileOpen(false)}
                className="w-full py-3 bg-white/10 text-white text-xs font-tech font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 hover:bg-white/20"
              >
                <Heart size={14} className="text-[#D92B27]" />
                <span>Support &amp; Giving</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Compact Footer */}
      <footer className="bg-[#222d61] text-white pt-10 pb-8 px-6 md:px-12 border-t border-white/10">
        <div className="max-w-[1600px] mx-auto">

          {/* Top row: Logo + Nav + Socials */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/10">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img src="/logo.svg" alt="The Salvation Army" className="h-8 object-contain" />
              <div className="flex flex-col">
                <span className="font-tech font-extrabold text-sm tracking-tight leading-none text-white">TSA SION</span>
                <span className="text-[9px] font-tech text-white/50 uppercase tracking-widest mt-0.5">EST. 1940 · SION, MUMBAI</span>
              </div>
            </Link>

            {/* Nav links */}
            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-tech text-white/60">
              {[
                { label: 'Home', href: '/' },
                { label: 'History', href: '/history' },
                { label: 'Ministries', href: '/ministries' },
                { label: 'Retreat 26', href: '/retreat' },
                { label: 'Contact', href: '/contact' },
                { label: 'Support', href: '/donate' },
              ].map(l => (
                <Link key={l.href} to={l.href} className="hover:text-[#FFE600] transition-colors uppercase tracking-wider">
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Socials */}
            <div className="flex items-center gap-3">
              {[
                { label: 'Facebook', href: 'https://www.facebook.com/groups/say.youth/' },
                { label: 'Instagram', href: 'https://www.instagram.com/salvationarmysion/' },
                { label: 'YouTube', href: 'https://www.youtube.com/@SalvationArmyTamilCorpsSion' },
              ].map(s => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-full border border-white/20 text-[10px] font-tech font-bold uppercase tracking-wider text-white/70 hover:text-[#FFE600] hover:border-[#FFE600] transition-all duration-200">
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom row: Copyright */}
          <div className="pt-5 flex flex-col sm:flex-row items-center justify-between text-[10px] font-tech text-white/40 gap-2">
            <p>© 2026 TSA Sion Media Team. All rights reserved.</p>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <Radio size={9} className="text-[#D92B27] animate-pulse" />
                <span className="text-white/60 uppercase tracking-widest">Broadcast Ready</span>
              </span>
              <span>·</span>
              <span className="uppercase tracking-widest">Tamil Church Sion</span>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
