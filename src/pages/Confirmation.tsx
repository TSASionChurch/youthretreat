import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import QRCode from 'react-qr-code';
import { Download, ArrowLeft, CheckCircle } from 'lucide-react';

export default function Confirmation() {
  const location = useLocation();
  const user = location.state?.user;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Construct QR data in the UID|Name|DOB format required by the verification script
  const qrData = (() => {
    if (user.qrData && user.qrData.includes('|')) {
      const parts = user.qrData.split('|');
      if (parts.length >= 3) {
        // Ensure the QR code uses the final server-returned UID
        parts[0] = user.uid;
        return parts.join('|');
      }
    }
    return `${user.uid}|${user.name}|${user.dob}`;
  })();

  return (
    <div className="retreat-site min-h-screen pt-24 pb-32 bg-[#F8FAFC] text-[#0A1128] flex flex-col items-center justify-center relative overflow-hidden px-4">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white rounded-3xl p-8 md:p-14 border border-slate-200 shadow-xl relative z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#D92B27]/10 border border-[#D92B27]/30 text-[#D92B27] font-black text-xs uppercase tracking-widest mb-4">
            <CheckCircle size={14} />
            <span>Registration Confirmed</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-4 text-[#0A1128]">
            You're <span className="text-[#D92B27]">In!</span>
          </h1>
          <p className="text-lg md:text-xl font-semibold text-slate-600">
            Thank you, <span className="text-[#0A1128] font-black">{user.name}</span>. Here is your official Retreat Pass.
          </p>
          {user.emailSent && (
            <p className="mt-3 text-sm text-green-700 font-semibold bg-green-50 border border-green-200 rounded-xl px-4 py-2 inline-block">
              ✅ Confirmation email sent to {user.email}
            </p>
          )}
        </div>

        {/* Ticket Pass */}
        <div className="bg-[#0A1128] text-white rounded-3xl p-8 md:p-10 relative overflow-hidden mb-10 shadow-xl">
          {/* Top Red Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-[#D92B27]" />

          {/* Cutouts */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-6 w-12 h-12 rounded-full bg-white" />
          <div className="absolute top-1/2 -translate-y-1/2 -right-6 w-12 h-12 rounded-full bg-white" />
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative border-b-2 border-dashed border-white/20 pb-8 mb-8">
            <div className="text-center sm:text-left">
              <span className="font-black text-xs uppercase tracking-widest text-[#D92B27] block mb-2">Youth Retreat 2026</span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter leading-tight text-white">
                Official Pass
              </h2>
              <p className="font-extrabold text-base text-slate-400">FRIDAY, OCT 2, 2026</p>
            </div>
            
            <div className="bg-white p-3.5 rounded-2xl shadow-md shrink-0 border border-slate-200">
              <QRCode 
                value={qrData}
                size={110}
                level="H"
                bgColor="#FFFFFF"
                fgColor="#0A1128"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Attendee Name</p>
              <p className="text-lg font-black uppercase tracking-tight text-white truncate">{user.name}</p>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">T-Shirt Size</p>
              <p className="text-lg font-black uppercase text-[#D92B27]">{user.tshirtSize}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Church / Corps</p>
              <p className="text-lg font-black uppercase tracking-tight text-white">{user.church}</p>
            </div>
            {user.ageGroup && (
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Age Group</p>
                <p className="text-lg font-black uppercase text-white">{user.ageGroup}</p>
              </div>
            )}
            {user.uid && (
              <div className="col-span-2 border-t border-white/10 pt-4">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Registration ID</p>
                <p className="text-xl font-black tracking-widest text-white">{user.uid}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => window.print()}
            className="flex-1 py-4 bg-[#D92B27] hover:bg-[#B81E1C] text-white rounded-full font-black uppercase tracking-widest text-base shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Download size={20} />
            Save Digital Pass
          </button>
          
          <Link 
            to="/"
            className="flex-1 py-4 bg-transparent border-2 border-slate-300 text-[#0A1128] rounded-full font-black uppercase tracking-widest text-base hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={20} />
            Return Home
          </Link>
        </div>

      </motion.div>
    </div>
  );
}
