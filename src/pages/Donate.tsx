import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Heart, QrCode, CreditCard, Copy, Check, ArrowUpRight } from 'lucide-react';
import { media } from '../lib/assets';
import { useWpSettings } from '../lib/useWpData';

function CopyField({ label, value }: { label: string; value: string; key?: React.Key }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between gap-4 bg-[#F8F9FA] border border-slate-200 px-5 py-4 hover:border-[#222d61]/30 transition-colors group">
      <div className="min-w-0">
        <span className="block font-tech text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-1">
          {label}
        </span>
        <span className="text-sm font-inter-tight font-bold text-[#222d61] truncate block">
          {value}
        </span>
      </div>
      <button
        onClick={handleCopy}
        title="Copy to clipboard"
        className={`shrink-0 w-9 h-9 border flex items-center justify-center transition-all duration-200 ${
          copied
            ? 'bg-[#FFE600] border-[#FFE600] text-[#222d61]'
            : 'bg-white border-slate-200 text-slate-400 hover:text-[#222d61] hover:border-[#222d61]/30'
        }`}
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.div key="c" initial={{ scale: 0.7 }} animate={{ scale: 1 }} exit={{ scale: 0.7 }}>
              <Check size={13} strokeWidth={3} />
            </motion.div>
          ) : (
            <motion.div key="u" initial={{ scale: 0.7 }} animate={{ scale: 1 }} exit={{ scale: 0.7 }}>
              <Copy size={13} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}

const QRS = [
  { src: media('/QRC.png'), label: 'Donation QR · A' },
  { src: media('/dan.webp'), label: 'Donation QR · B' },
];

export default function Donate() {
  const wpSettings = useWpSettings();

  const bankDetails = [
    { label: 'Account name', value: 'Salvation Army Tamil Church Sion' },
    { label: 'Account number', value: wpSettings.bankAccount || '32958492049' },
    { label: 'Bank name', value: wpSettings.bankName || 'State Bank of India (SBI)' },
    { label: 'Branch', value: 'Sion East Branch, Mumbai' },
    { label: 'IFSC code', value: wpSettings.bankIfsc || 'SBIN0000290' },
    { label: 'UPI ID', value: wpSettings.upiId || 'tsasion@upi' },
  ];

  return (
    <div className="w-full bg-white min-h-screen text-[#222d61]">

      {/* ── Page Header ──────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 px-6 md:px-12 border-b border-slate-200 bg-white overflow-hidden">
        <div className="max-w-[1600px] mx-auto">

          <div className="flex items-center gap-3 text-xs font-tech font-bold text-slate-400 uppercase tracking-widest mb-12">
            <span className="text-[#D92B27] font-mono">[N.04/05]</span>
            <span>—</span>
            <span className="text-[#222d61]">Give & support</span>
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
                Give with <span className="font-serif-italic font-normal text-[#D92B27]">grace</span>
              </motion.h1>
            </div>

            <div className="lg:col-span-5">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-slate-500 text-lg leading-relaxed font-normal"
              >
                Your generosity directly supports our youth retreats, community medical clinics, Saturday fellowship gatherings, and the upkeep of our church in Sion.
              </motion.p>
            </div>
          </div>

          {/* Giving highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-3 gap-6 pt-14 mt-14 border-t border-slate-200"
          >
            {[
              { label: 'UPI & QR code', desc: 'Instant transfer via GPay, PhonePe, Paytm or BHIM' },
              { label: 'Bank transfer', desc: 'NEFT / RTGS / IMPS to our SBI Sion East account' },
              { label: 'Donation receipt', desc: 'Email confirmation screenshot to get a formal receipt' },
            ].map((s) => (
              <div key={s.label}>
                <p className="font-inter-tight font-bold text-[#222d61] text-sm mb-1">{s.label}</p>
                <p className="font-tech text-xs text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Donation Options ─────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-[#F8F9FA]">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* QR / UPI column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white border border-slate-200"
          >
            {/* Card header */}
            <div className="flex items-center gap-4 p-7 border-b border-slate-100">
              <div className="w-11 h-11 bg-[#D92B27]/8 border border-[#D92B27]/15 flex items-center justify-center text-[#D92B27]">
                <QrCode size={20} />
              </div>
              <div>
                <span className="font-tech text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 block mb-0.5">
                  // Instant payment
                </span>
                <h2
                  className="font-inter-tight font-black text-[#222d61] leading-tight"
                  style={{ fontSize: 'clamp(18px, 2vw, 26px)', letterSpacing: '-0.02em' }}
                >
                  Scan & pay via UPI
                </h2>
              </div>
            </div>

            <div className="p-7">
              <p className="text-slate-500 text-sm leading-relaxed mb-7">
                Open any UPI-enabled app and scan the QR code below. Transfers are instant, safe, and settle directly to the church fund.
              </p>

              <div className="grid grid-cols-2 gap-5">
                {QRS.map((qr, i) => (
                  <div key={i} className="flex flex-col items-center gap-3">
                    <div className="w-full aspect-square bg-[#F8F9FA] border border-slate-200 flex items-center justify-center p-3">
                      <img
                        src={qr.src}
                        alt={`UPI QR Code ${i + 1}`}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <span className="font-tech text-[9px] font-bold uppercase tracking-widest text-slate-400">
                      {qr.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-7 pt-5 border-t border-slate-100 flex items-center gap-2 font-tech text-[10px] text-slate-400">
                <Shield size={11} className="text-[#D92B27]" />
                Secured · Direct bank settlement
              </div>
            </div>
          </motion.div>

          {/* Bank Transfer column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white border border-slate-200"
          >
            <div className="flex items-center gap-4 p-7 border-b border-slate-100">
              <div className="w-11 h-11 bg-[#D92B27]/8 border border-[#D92B27]/15 flex items-center justify-center text-[#D92B27]">
                <CreditCard size={20} />
              </div>
              <div>
                <span className="font-tech text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 block mb-0.5">
                  // NEFT · RTGS · IMPS
                </span>
                <h2
                  className="font-inter-tight font-black text-[#222d61] leading-tight"
                  style={{ fontSize: 'clamp(18px, 2vw, 26px)', letterSpacing: '-0.02em' }}
                >
                  Bank transfer
                </h2>
              </div>
            </div>

            <div className="p-7">
              <p className="text-slate-500 text-sm leading-relaxed mb-7">
                For direct bank transfers, use the following credentials. Tap the copy icon to instantly copy any field to your clipboard.
              </p>

              <div className="flex flex-col divide-y divide-slate-100 border border-slate-200">
                {bankDetails.map((f, i) => (
                  <CopyField key={i} label={f.label} value={f.value} />
                ))}
              </div>

              <div className="mt-7 pt-5 border-t border-slate-100">
                <p className="text-slate-400 text-xs leading-relaxed">
                  For a formal donation receipt, email a screenshot of your transfer confirmation to{' '}
                  <a
                    href="mailto:tsasionchurch76@gmail.com"
                    className="text-[#222d61] font-bold hover:text-[#D92B27] transition-colors"
                  >
                    tsasionchurch76@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12 bg-[#222d61]">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="font-tech text-[9px] font-bold uppercase tracking-[0.25em] text-[#FFE600] block mb-3">
              // Questions about giving?
            </span>
            <h2
              className="font-inter-tight font-black text-white leading-tight"
              style={{ fontSize: 'clamp(24px, 3vw, 44px)', letterSpacing: '-0.02em' }}
            >
              We're here to <span className="font-serif-italic font-normal text-[#FFE600]">help</span>
            </h2>
            <p className="text-white/60 text-sm mt-3 max-w-md">
              Reach out to our team for any questions about donations, receipts, or how your gift is used to bless the community.
            </p>
          </div>
          <a
            href="mailto:tsasionchurch76@gmail.com"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[#D92B27] hover:bg-[#FFE600] hover:text-[#222d61] text-white font-inter-tight font-bold text-sm transition-all duration-300 shrink-0"
          >
            Contact us
            <ArrowUpRight size={16} />
          </a>
        </div>
      </section>

    </div>
  );
}
