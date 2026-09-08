import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { useWpSettings } from '../lib/useWpData';

const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30173.47732297911!2d72.8218741743164!3d19.033612000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c92a7019f37d%3A0xbf05632e51e35ef6!2sSalvation%20Army%20Tamil%20Church%2C%20Women%20And%20Children%20Home!5e0!3m2!1sen!2sin!4v1728552474695!5m2!1sen!2sin';

type Status = 'idle' | 'success' | 'error';

export default function Contact() {
  const wpSettings = useWpSettings();

  const contactInfo = [
    {
      icon: <MapPin size={22} />,
      label: 'Address',
      title: 'Plot No. 6, First Floor, 60 Feet Rd',
      subtitle: 'Sion East, Mumbai 400022',
      link: { href: 'https://maps.app.goo.gl/FopB2t33gXKW2yux7', label: 'Open in Google Maps ↗' },
    },
    {
      icon: <Phone size={22} />,
      label: 'Phone',
      title: '+91 96002 08400',
      subtitle: '+91 93243 42127',
      link: { href: 'tel:+919600208400', label: 'Tap to call' },
    },
    {
      icon: <Mail size={22} />,
      label: 'Email',
      title: 'tsasionchurch76@gmail.com',
      subtitle: 'We reply within 24 hours',
      link: { href: 'mailto:tsasionchurch76@gmail.com', label: 'Send email ↗' },
    },
  ];

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<Status>('idle');

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { setStatus('error'); return; }
    setBusy(true); setStatus('idle');

    const wp = typeof window !== 'undefined' ? (window as any).TSA_WP : undefined;
    if (wp?.restUrl) {
      try {
        const res = await fetch(`${wp.restUrl}contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': wp.nonce },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error('failed');
        setBusy(false); setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
        return;
      } catch {
        setBusy(false); setStatus('error'); return;
      }
    }
    setTimeout(() => {
      setBusy(false); setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 1400);
  };

  return (
    <div className="w-full bg-white min-h-screen text-[#222d61]">

      {/* ── Page Header ──────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 px-6 md:px-12 border-b border-slate-200 bg-white overflow-hidden">
        <div className="max-w-[1600px] mx-auto">

          <div className="flex items-center gap-3 text-xs font-tech font-bold text-slate-400 uppercase tracking-widest mb-12">
            <span className="text-[#D92B27] font-mono">[N.03/05]</span>
            <span>—</span>
            <span className="text-[#222d61]">Get in touch</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-inter-tight font-black text-[#222d61] leading-none"
                style={{ fontSize: 'clamp(48px, 8vw, 110px)', letterSpacing: '-0.03em' }}
              >
                Let's <span className="font-serif-italic font-normal text-[#D92B27]">connect</span>
              </motion.h1>
            </div>

            <div className="lg:col-span-5">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-slate-500 text-lg leading-relaxed font-normal"
              >
                We'd love to hear from you. Reach out with any questions about our ministries, services, retreats, or upcoming events — our team will respond promptly.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact Info Cards ────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-[#F8F9FA] border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 border border-slate-200">
            {contactInfo.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white p-8 flex flex-col gap-5 group hover:bg-[#222d61] transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#D92B27]/8 border border-[#D92B27]/15 flex items-center justify-center text-[#D92B27] group-hover:bg-[#D92B27] group-hover:text-white group-hover:border-[#D92B27] transition-all duration-400">
                  {item.icon}
                </div>
                <div>
                  <span className="font-tech text-[9px] font-bold uppercase tracking-[0.25em] text-slate-400 group-hover:text-[#FFE600] block mb-2 transition-colors duration-300">
                    // {item.label}
                  </span>
                  <p className="font-inter-tight font-bold text-[#222d61] group-hover:text-white text-base leading-tight transition-colors duration-300">
                    {item.title}
                  </p>
                  <p className="text-slate-400 group-hover:text-white/50 text-sm mt-1 transition-colors duration-300">
                    {item.subtitle}
                  </p>
                </div>
                {item.link && (
                  <a
                    href={item.link.href}
                    target={item.link.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="font-tech text-[10px] font-bold uppercase tracking-wider text-[#D92B27] group-hover:text-[#FFE600] hover:underline transition-colors duration-300 mt-auto"
                  >
                    {item.link.label}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form + Map ────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-8">
              <span className="font-tech text-[9px] font-bold uppercase tracking-[0.25em] text-[#D92B27] block mb-3">
                // Send a message
              </span>
              <h2
                className="font-inter-tight font-black text-[#222d61] leading-tight"
                style={{ fontSize: 'clamp(24px, 3vw, 40px)', letterSpacing: '-0.02em' }}
              >
                Write to <span className="font-serif-italic font-normal text-[#D92B27]">our team</span>
              </h2>
              <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                Fill in the form and our administrative team will reply as soon as possible.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center text-center py-16 border border-slate-200 rounded-2xl"
                >
                  <CheckCircle size={48} className="text-[#D92B27] mb-4" strokeWidth={1.5} />
                  <h3 className="font-inter-tight font-black text-xl text-[#222d61]">Message sent!</h3>
                  <p className="text-slate-500 text-sm mt-2 max-w-sm leading-relaxed">
                    Thank you for reaching out. Our team will review your message and get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 px-6 py-2.5 border border-[#222d61] text-xs font-inter-tight font-bold hover:bg-[#222d61] hover:text-white transition-colors"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={submit}
                  className="space-y-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {status === 'error' && (
                    <div className="flex items-center gap-2 p-3.5 bg-red-50 border border-red-200 text-red-600 text-xs font-bold">
                      <AlertCircle size={14} className="shrink-0" />
                      Please fill in all required fields (*).
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { id: 'name', label: 'Your name *', type: 'text' },
                      { id: 'email', label: 'Email address *', type: 'email' },
                    ].map((f) => (
                      <div key={f.id}>
                        <label htmlFor={f.id} className="block font-tech text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                          {f.label}
                        </label>
                        <input
                          id={f.id}
                          name={f.id}
                          type={f.type}
                          value={(form as any)[f.id]}
                          onChange={handle}
                          className="w-full bg-[#F8F9FA] hover:bg-white focus:bg-white border border-slate-200 focus:border-[#222d61] px-4 py-3 text-sm font-normal text-[#222d61] outline-none transition-all"
                          required
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block font-tech text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={form.subject}
                      onChange={handle}
                      className="w-full bg-[#F8F9FA] hover:bg-white focus:bg-white border border-slate-200 focus:border-[#222d61] px-4 py-3 text-sm font-normal text-[#222d61] outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-tech text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handle}
                      className="w-full bg-[#F8F9FA] hover:bg-white focus:bg-white border border-slate-200 focus:border-[#222d61] px-4 py-3 text-sm font-normal text-[#222d61] outline-none transition-all resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={busy}
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-[#222d61] hover:bg-[#D92B27] text-white font-inter-tight font-bold text-sm transition-all duration-300 shadow-lg disabled:opacity-50"
                  >
                    {busy ? 'Sending…' : (
                      <>
                        <span>Send message</span>
                        <Send size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-5"
          >
            <div className="mb-2">
              <span className="font-tech text-[9px] font-bold uppercase tracking-[0.25em] text-[#D92B27] block mb-3">
                // Find us
              </span>
              <h2
                className="font-inter-tight font-black text-[#222d61] leading-tight"
                style={{ fontSize: 'clamp(24px, 3vw, 40px)', letterSpacing: '-0.02em' }}
              >
                Visit our <span className="font-serif-italic font-normal text-[#D92B27]">church</span>
              </h2>
              <p className="text-slate-500 text-sm mt-3">
                Plot No. 6, First Floor, 60 Feet Road, Sion East, Mumbai 400022
              </p>
            </div>

            <div className="border border-slate-200 overflow-hidden" style={{ minHeight: '400px' }}>
              <iframe
                title="TSA Sion Church Location"
                src={MAP_EMBED}
                className="w-full h-full border-0"
                style={{ minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <a
              href="https://maps.app.goo.gl/FopB2t33gXKW2yux7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-tech text-[10px] font-bold uppercase tracking-wider text-[#222d61] hover:text-[#D92B27] transition-colors"
            >
              <ExternalLink size={12} />
              Open in Google Maps
            </a>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
