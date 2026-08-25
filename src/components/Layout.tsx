import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Calendar, Facebook, Instagram, Youtube } from 'lucide-react';
import StaircasePreloader from './StaircasePreloader';

const NAV_LINKS = [
  { label: 'Home',       href: '/'           },
  { label: 'History',    href: '/history'     },
  { label: 'Ministries', href: '/ministries'  },
  { label: 'Contact',    href: '/contact'     },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isLinkActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-white text-[#0A1128]">
      <StaircasePreloader />

      {/* ── Navbar ──────────────────────────────────────── */}
      <nav className="fixed w-full z-50 top-0 left-0 px-4 md:px-8 py-4
        bg-white/97 backdrop-blur-md
        border-b border-slate-200 shadow-sm">

        <div className="max-w-[1600px] mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" onClick={() => setMobileOpen(false)}>
            <img
              src="/crest.png"
              alt="Salvation Army Crest Logo"
              className="w-10 h-10 object-contain group-hover:rotate-6 transition-transform duration-300"
            />
            <div className="flex flex-col">
              <span className="font-black text-sm sm:text-base leading-none tracking-tight uppercase text-[#0A1128]">
                The Salvation Army
              </span>
              <span className="font-extrabold text-[9px] tracking-wider uppercase text-[#D92B27]">
                Tamil Church Sion
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`px-4 py-2 text-xs font-black uppercase tracking-widest transition-all duration-300 rounded-full ${
                  isLinkActive(link.href)
                    ? 'text-[#D92B27] bg-[#D92B27]/10'
                    : 'text-[#0A1128]/60 hover:text-[#D92B27] hover:bg-[#D92B27]/5'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Retreat pill */}
            <Link
              to="/retreat"
              className={`px-4 py-2 text-xs font-black uppercase tracking-widest transition-colors rounded-full flex items-center gap-1.5 ${
                isLinkActive('/retreat')
                  ? 'text-[#D92B27] bg-[#D92B27]/10'
                  : 'text-[#D92B27] hover:bg-[#D92B27]/5'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#D92B27] animate-ping" />
              <span>Retreat 2026</span>
            </Link>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link
              to="/donate"
              className="px-5 md:px-6 py-2.5 rounded-full bg-[#D92B27] hover:bg-[#0A1128] text-white font-black uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <Heart size={13} className="stroke-[2.5]" />
              <span className="hidden sm:inline">Donate Us</span>
              <span className="sm:hidden">Donate</span>
            </Link>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-full text-[#0A1128] hover:bg-slate-100 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className="lg:hidden mt-2 mx-0 pb-4 border-t border-slate-100 pt-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 text-sm font-black uppercase tracking-widest rounded-xl transition-colors ${
                  isLinkActive(link.href)
                    ? 'text-[#D92B27] bg-[#D92B27]/5'
                    : 'text-[#0A1128]/70 hover:text-[#D92B27] hover:bg-[#D92B27]/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/retreat"
              onClick={() => setMobileOpen(false)}
              className={`px-4 py-3 text-sm font-black uppercase tracking-widest rounded-xl transition-colors flex items-center gap-2 ${
                isLinkActive('/retreat')
                  ? 'text-[#D92B27] bg-[#D92B27]/5'
                  : 'text-[#D92B27] hover:bg-[#D92B27]/5'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#D92B27]" />
              <span>Retreat 2026</span>
            </Link>
          </div>
        )}
      </nav>

      {/* ── Main content ─────────────────────────────────── */}
      <main className="flex-grow pt-16">
        {children}
      </main>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="bg-[#F8FAFC] py-16 md:py-24 px-4 md:px-8 border-t border-slate-200 text-[#0A1128]">
        <div className="max-w-[1400px] mx-auto">

          {/* Top badges */}
          <div className="flex flex-wrap items-center gap-3 mb-12">
            <span className="px-5 py-2.5 rounded-full bg-white border border-slate-200 text-[#0A1128] font-black text-xs uppercase tracking-wider">
              TSA Sion Church
            </span>
            <Link
              to="/retreat"
              className="px-5 py-2.5 rounded-full bg-[#D92B27] text-white font-black text-xs uppercase tracking-wider hover:bg-[#0A1128] transition-colors flex items-center gap-1.5"
            >
              <Calendar size={12} />
              <span>Youth Retreat 2026 Event</span>
            </Link>
            <Link
              to="/donate"
              className="px-5 py-2.5 rounded-full bg-[#FFE600] text-[#0A1128] font-black text-xs uppercase tracking-wider hover:scale-105 transition-all"
            >
              Support Our Mission
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
            <div className="lg:col-span-8">
              <h2
                className="font-bold uppercase tracking-tighter leading-[0.9] text-[#0A1128]"
                style={{ fontSize: 'clamp(30px, 5vw, 72px)', fontFamily: 'Unbounded' }}
              >
                TSA<br />
                <span className="text-[#D92B27]">Sion Tamil Corps</span>
              </h2>
            </div>

            <div className="lg:col-span-4">
              <p className="text-base font-normal text-slate-600 leading-relaxed mb-6">
                Our church has been serving the Sion and Dharavi community in Mumbai since 1940. We believe in sharing the love of God through spiritual leadership and practical community actions.
              </p>
              <div className="flex items-center gap-3">
                {[
                  { href: 'https://www.facebook.com/groups/say.youth/', label: 'Facebook Page', Icon: Facebook },
                  { href: 'https://www.instagram.com/salvationarmysion/', label: 'Instagram Profile', Icon: Instagram },
                  { href: 'https://www.youtube.com/@SalvationArmyTamilCorpsSion', label: 'YouTube Channel', Icon: Youtube },
                ].map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-full border border-slate-200 hover:border-[#D92B27] hover:text-[#D92B27] flex items-center justify-center transition-colors bg-white text-slate-500 shadow-sm"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs font-semibold text-slate-500 gap-4">
            <p>© 2026 TSA Sion Media Team. All rights reserved.</p>
            <div className="flex flex-wrap gap-4 sm:gap-6 uppercase tracking-wider font-extrabold text-[#0A1128] justify-center">
              {[
                { to: '/history',    label: 'About Us'     },
                { to: '/ministries', label: 'Ministries'   },
                { to: '/retreat',    label: 'Retreat 2026' },
                { to: '/contact',    label: 'Contact'      },
              ].map(({ to, label }) => (
                <Link key={to} to={to} className="hover:text-[#D92B27] transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
