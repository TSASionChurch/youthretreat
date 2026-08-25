import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Heart, QrCode, CreditCard, Copy, Check } from 'lucide-react';

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between gap-4 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 hover:border-slate-300 transition-colors">
      <div className="min-w-0">
        <span className="block text-[9px] font-black uppercase text-slate-400 tracking-widest mb-0.5">{label}</span>
        <span className="text-sm font-bold text-[#0A1128] font-mono truncate block">{value}</span>
      </div>
      <button
        onClick={handleCopy}
        title="Copy to Clipboard"
        className={`shrink-0 w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-200 ${
          copied
            ? 'bg-[#FFE600] border-[#FFE600] text-[#0A1128] scale-95'
            : 'bg-white border-slate-200 text-slate-400 hover:text-[#0A1128] hover:border-slate-300'
        }`}
      >
        <AnimatePresence mode="wait">
          {copied
            ? <motion.div key="c" initial={{ scale: 0.7 }} animate={{ scale: 1 }} exit={{ scale: 0.7 }}><Check size={13} strokeWidth={3} /></motion.div>
            : <motion.div key="u" initial={{ scale: 0.7 }} animate={{ scale: 1 }} exit={{ scale: 0.7 }}><Copy size={13} /></motion.div>
          }
        </AnimatePresence>
      </button>
    </div>
  );
}

const BANK = [
  { label: 'Account Name',   value: 'Salvation Army Tamil Church Sion' },
  { label: 'Account Number', value: '32958492049' },
  { label: 'Bank Name',      value: 'State Bank of India (SBI)' },
  { label: 'IFSC Code',      value: 'SBIN0000290' },
  { label: 'Branch',         value: 'Sion East Branch' },
];

const QRS = [
  { src: '/QRC.png',  label: 'Donation QR · A' },
  { src: '/dan.webp', label: 'Donation QR · B' },
];

export default function Donate() {
  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen text-[#0A1128] noise pb-24">

      {/* Header */}
      <section className="relative bg-white pt-24 pb-16 px-4 md:px-10 border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#D92B27]/3 rounded-full blur-3xl" />
        </div>
        <div className="max-w-[1600px] mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-2 mb-4">
            <Heart size={14} className="text-[#D92B27]" />
            <span className="text-[#D92B27] font-black uppercase tracking-[0.25em] text-xs">Give & Support</span>
          </motion.div>
          <div className="overflow-hidden mb-2">
            <motion.h1
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#0A1128] uppercase leading-none font-black"
              style={{ fontSize: 'clamp(36px, 8vw, 100px)', letterSpacing: '-0.02em' }}
            >
              Donate
            </motion.h1>
          </div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-slate-500 text-base sm:text-lg font-medium max-w-xl mx-auto mt-6 leading-relaxed"
          >
            Your generosity directly supports our Saturday youth gatherings, community medical clinics, annual retreats, and sanctuary upkeep.
          </motion.p>
        </div>
      </section>

      {/* Donation options */}
      <section className="py-20 px-4 md:px-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* QR Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-[#D92B27]">
                <QrCode size={18} />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black uppercase text-[#0A1128] tracking-tight">Scan & Pay via UPI</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">GPay · PhonePe · Paytm · BHIM</p>
              </div>
            </div>

            <p className="text-slate-500 text-sm leading-relaxed font-medium mb-8">
              Open any UPI-enabled app and scan the QR code below. Transfers are instant, safe, and settle directly to the church fund.
            </p>

            {/* QR display — full image, no crop */}
            <div className="grid grid-cols-2 gap-6">
              {QRS.map((qr, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <div className="w-full aspect-square rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center p-3 shadow-inner">
                    <img
                      src={qr.src}
                      alt={`UPI QR Code ${i + 1}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{qr.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-2 text-[10px] font-bold text-slate-400">
              <Shield size={11} className="text-[#D92B27]" />
              <span>Secured · Direct Bank Settlement</span>
            </div>
          </motion.div>

          {/* Bank Transfer Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-[#D92B27]">
                <CreditCard size={18} />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black uppercase text-[#0A1128] tracking-tight">Bank Transfer</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">NEFT · RTGS · IMPS</p>
              </div>
            </div>

            <p className="text-slate-500 text-sm leading-relaxed font-medium mb-8">
              For direct bank transfers, use the following credentials. Click the copy icon to instantly copy any field.
            </p>

            <div className="space-y-3">
              {BANK.map((f, i) => <CopyField key={i} label={f.label} value={f.value} />)}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-slate-400 text-xs leading-relaxed font-semibold">
                For a formal donation receipt, please email a screenshot of your transfer confirmation to{' '}
                <a href="mailto:tsasionchurch76@gmail.com" className="text-[#0A1128] font-bold hover:text-[#D92B27] transition-colors">
                  tsasionchurch76@gmail.com
                </a>
              </p>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
