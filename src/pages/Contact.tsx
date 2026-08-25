import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';

const INFO = [
  {
    icon: <MapPin size={20} />,
    title: 'Our Address',
    lines: ['Plot No. 6, First Floor, 60 Feet Road,', 'Sion East, Mumbai, Maharashtra 400022'],
    link: { href: 'https://maps.app.goo.gl/FopB2t33gXKW2yux7', label: 'Open in Google Maps' },
  },
  {
    icon: <Phone size={20} />,
    title: 'Call Us',
    lines: ['(123) 456-7890'],
    link: { href: 'tel:1234567890', label: 'Tap to Call' },
  },
  {
    icon: <Mail size={20} />,
    title: 'Email Us',
    lines: ['info@salvationarmy.com'],
    link: { href: 'mailto:info@salvationarmy.com', label: 'Send an Email' },
  },
];

const MAP_EMBED = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30173.47732297911!2d72.8218741743164!3d19.033612000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c92a7019f37d%3A0xbf05632e51e35ef6!2sSalvation%20Army%20Tamil%20Church%2C%20Women%20And%20Children%20Home!5e0!3m2!1sen!2sin!4v1728552474695!5m2!1sen!2sin';

type Status = 'idle' | 'success' | 'error';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<Status>('idle');

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { setStatus('error'); return; }
    setBusy(true); setStatus('idle');
    setTimeout(() => { setBusy(false); setStatus('success'); setForm({ name: '', email: '', subject: '', message: '' }); }, 1600);
  };

  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen text-[#0A1128] noise pb-24">

      {/* Header */}
      <section className="relative bg-white pt-24 pb-16 px-4 md:px-10 border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-72 h-72 bg-[#D92B27]/3 rounded-full blur-3xl" />
        </div>
        <div className="max-w-[1600px] mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-2 mb-4">
            <Mail size={14} className="text-[#D92B27]" />
            <span className="text-[#D92B27] font-black uppercase tracking-[0.25em] text-xs">Get In Touch</span>
          </motion.div>
          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: '110%', opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#0A1128] uppercase leading-none font-black"
              style={{ fontSize: 'clamp(36px, 8vw, 100px)', letterSpacing: '-0.02em' }}
            >
              Contact Us
            </motion.h1>
          </div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-slate-500 text-base sm:text-lg font-medium max-w-xl mx-auto mt-6 leading-relaxed"
          >
            We'd love to hear from you. Reach out with any questions about our ministries, services, or upcoming events.
          </motion.p>
        </div>
      </section>

      {/* Info cards */}
      <section className="py-12 px-4 md:px-10">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {INFO.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.55 }}
              className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-[#D92B27] mb-5">
                {item.icon}
              </div>
              <h3 className="text-sm font-black uppercase text-[#0A1128] tracking-widest mb-3">{item.title}</h3>
              {item.lines.map((l, j) => (
                <p key={j} className="text-slate-500 text-sm font-semibold leading-relaxed">{l}</p>
              ))}
              {item.link && (
                <a
                  href={item.link.href}
                  target={item.link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-[#D92B27] hover:underline"
                >
                  {item.link.label}
                  <ExternalLink size={9} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Form + Map */}
      <section className="px-4 md:px-10 pb-4">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm"
          >
            <h2 className="text-xl sm:text-2xl font-black uppercase text-[#0A1128] tracking-tight mb-2">Send a Message</h2>
            <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">
              Fill in the form and our administrative team will reply as soon as possible.
            </p>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
                  className="flex flex-col items-center text-center py-10"
                >
                  <CheckCircle size={48} className="text-[#D92B27] mb-4" strokeWidth={1.5} />
                  <h3 className="text-lg font-black uppercase text-[#0A1128]">Message Sent!</h3>
                  <p className="text-slate-500 text-sm mt-2 max-w-sm leading-relaxed font-medium">
                    Thank you for reaching out. Our team will review your message and get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 px-6 py-2.5 rounded-full border-2 border-[#0A1128] text-xs font-black uppercase tracking-wider hover:bg-[#0A1128] hover:text-white transition-colors"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} className="space-y-5"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                >
                  {status === 'error' && (
                    <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-bold">
                      <AlertCircle size={14} className="shrink-0" />
                      Please fill in all required fields (*).
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: 'name',  label: 'Your Name *',      type: 'text' },
                      { id: 'email', label: 'Email Address *',   type: 'email' },
                    ].map(f => (
                      <div key={f.id}>
                        <label htmlFor={f.id} className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5">{f.label}</label>
                        <input
                          id={f.id} name={f.id} type={f.type}
                          value={(form as any)[f.id]} onChange={handle}
                          className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#D92B27] rounded-xl px-4 py-3 text-sm font-bold text-[#0A1128] outline-none transition-all"
                          required
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Subject</label>
                    <input
                      id="subject" name="subject" type="text"
                      value={form.subject} onChange={handle}
                      className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#D92B27] rounded-xl px-4 py-3 text-sm font-bold text-[#0A1128] outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Message *</label>
                    <textarea
                      id="message" name="message" rows={4}
                      value={form.message} onChange={handle}
                      className="w-full bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 focus:border-[#D92B27] rounded-xl px-4 py-3 text-sm font-bold text-[#0A1128] outline-none transition-all resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit" disabled={busy}
                    className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0A1128] hover:bg-[#D92B27] text-white font-black uppercase text-[10px] tracking-widest transition-colors shadow-sm disabled:opacity-50"
                  >
                    {busy ? 'Sending…' : <><span>Send Message</span><Send size={12} className="group-hover:translate-x-0.5 transition-transform" /></>}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50 min-h-[360px] lg:min-h-full relative"
          >
            <iframe
              title="TSA Sion Church Location"
              src={MAP_EMBED}
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

        </div>
      </section>
    </div>
  );
}
