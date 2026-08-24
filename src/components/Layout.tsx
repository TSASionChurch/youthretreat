import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit3, Menu, X ,ArrowRight} from 'lucide-react';
import StaircasePreloader from './StaircasePreloader';

const NAV_LINKS = [
  { label: 'Venue', href: '/#venue' },
  { label: 'Speakers', href: '/#speakers' },
  { label: 'Contact', href: '/#contact' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative bg-white text-[#0A1128]">
      {/* Staircase Preloader Animation */}
      <StaircasePreloader />

      {/* Navbar */}
      <nav className="fixed w-full z-50 top-0 left-0 px-4 md:px-8 py-4 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex flex-col group" onClick={() => setMobileOpen(false)}>
            <span className="font-black text-2xl md:text-3xl leading-none tracking-tighter uppercase text-[#0A1128] group-hover:text-[#D92B27] transition-colors">
              Youth<span className="text-[#D92B27]">.</span>
            </span>
            <span className="font-extrabold text-[10px] md:text-xs tracking-[0.2em] uppercase text-slate-500">
              Retreat 2026
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-xs font-black uppercase tracking-widest text-[#0A1128]/60 hover:text-[#D92B27] transition-colors rounded-full hover:bg-[#D92B27]/5"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link
              to="/register"
              className="px-5 md:px-6 py-2.5 rounded-full bg-[#D92B27] hover:bg-[#B81E1C] text-white font-black uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-md"
            >
              <Edit3 size={14} />
              <span className="hidden sm:inline">Register Now</span>
              <span className="sm:hidden">Register</span>
            </Link>
            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-full text-[#0A1128] hover:bg-slate-100 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="md:hidden mt-2 mx-0 pb-3 border-t border-slate-100 pt-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-sm font-black uppercase tracking-widest text-[#0A1128]/70 hover:text-[#D92B27] hover:bg-[#D92B27]/5 rounded-xl transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      <main className="flex-grow pt-16">
        {children}
      </main>

      {/* Spotify Editorial Layout Footer */}
      <footer className="bg-[#F8FAFC] py-20 md:py-28 px-4 md:px-8 border-t border-slate-200 text-[#0A1128]">
        <div className="max-w-[1400px] mx-auto">
          
          {/* Top Pill Badges Section */}
          <div className="flex flex-wrap items-center gap-3 mb-12">
            <span className="px-6 py-2.5 rounded-full bg-white border border-[#0A1128] text-[#0A1128] font-black text-sm uppercase tracking-wide">
              Youth Retreat 2026
            </span>
            <span className="px-6 py-2.5 rounded-full bg-[#D92B27] text-white font-black text-sm uppercase tracking-wide">
              Empowering Generations
            </span>
            <span className="px-6 py-2.5 rounded-full bg-[#FFE600] text-[#0A1128] font-black text-sm uppercase tracking-wide">
              Live Conference
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
            <div className="lg:col-span-8">
              <h2 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-[#0A1128]">
                Get In <span className="text-[#D92B27]">Touch</span>
              </h2>
            </div>
            
            <div className="lg:col-span-4">
              <p className="text-lg md:text-xl font-normal text-slate-600 leading-relaxed mb-6">
                Behind everything we do are a few simple principles. We build with substance, bring energy into everything we create, and stay driven by purpose.
              </p>
              <Link 
                to="/register" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#0A1128] hover:bg-[#D92B27] text-white rounded-full font-black uppercase tracking-widest transition-all text-base shadow-lg"
              >
                <span>Register Your Pass</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs font-semibold text-slate-500 gap-4">
            <p>© TSA Sion Media Team 2026.</p>
            <div className="flex gap-6 uppercase tracking-wider font-extrabold text-[#0A1128]">
              <a href="#about" className="hover:text-[#D92B27] transition-colors">About</a>
              <a href="#pillars" className="hover:text-[#D92B27] transition-colors">Core Pillars</a>
              <Link to="/register" className="hover:text-[#D92B27] transition-colors">Passes</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
