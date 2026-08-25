import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import QRCode from 'react-qr-code';

const GOOGLE_APP_SCRIPT_URL = import.meta.env.VITE_GOOGLE_APP_SCRIPT_URL || "";
const CHURCHES = [
  "Sion Tamil Corps",
  "Jerimeri Corps",
  "Mira Road Corps",
  "Sion Home",
  "Ambernath Corps",
  "Badlapur Corps",
  "Bhandup Corps",
  "Byculla Marathi Central",
  "Goregaon Corps",
  "Matunga Corps",
  "Nallasopara Corps",
  "Panjarpol Corps",
  "Parel",
  "Sewri Outpost",
  "Ulhasnagar Corps",
  "Vithhalwadi",
  "Wadala Corps",
];

const TSHIRT_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "Other"];

// Converts an SVG element to a PNG Base64 string via an off-screen canvas
async function svgElementToBase64Png(svgEl: SVGSVGElement, size: number): Promise<string> {
  const serializer = new XMLSerializer();
  const svgStr = serializer.serializeToString(svgEl);
  const svgBlob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = (err) => { URL.revokeObjectURL(url); reject(err); };
    img.src = url;
  });
}

function formatDateToMMDDYYYY(dateStr: string): string {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const [year, month, day] = parts;
  return `${month}/${day}/${year}`;
}

export default function Register() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    otherGender: '',
    isOfficer: '',
    dob: '',
    phone: '',
    email: '',
    church: '',
    otherChurch: '',
    tshirtSize: '',
    otherTshirtSize: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (isSubmitting) return;

  setIsSubmitting(true);
  setSubmitError(null);
  setIsDuplicate(false);

  const formattedDob = formatDateToMMDDYYYY(formData.dob);

  const finalPayload = {
    name: formData.name.trim(),
    gender: formData.gender === "Other" ? formData.otherGender.trim() || "Other" : formData.gender,
    dob: formattedDob,
    phone: formData.phone.trim(),
    email: formData.email.trim(),
    church: formData.church === "Other" ? formData.otherChurch.trim() || "Other" : formData.church,
    isOfficer: formData.isOfficer,
    tshirtSize: formData.tshirtSize === "Other" ? formData.otherTshirtSize.trim() || "Other" : formData.tshirtSize,
  };

  try {
    // -------------------------------------------------------
    // STEP 1: Get server-generated UID (no sheet write yet)
    // -------------------------------------------------------
    const generateParams = new URLSearchParams();
    generateParams.append("name", finalPayload.name);
    generateParams.append("dob", finalPayload.dob);
    generateParams.append("gender", finalPayload.gender);
    generateParams.append("whatsapp", finalPayload.phone);
    generateParams.append("email", finalPayload.email);
    generateParams.append("church", finalPayload.church);
    generateParams.append("officers", finalPayload.isOfficer);
    generateParams.append("size", finalPayload.tshirtSize);
    generateParams.append("step", "generate");

    const generateResponse = await fetch(GOOGLE_APP_SCRIPT_URL, {
      method: "POST",
      body: generateParams,
    });

    const generateText = await generateResponse.text();
    console.log("Generate response:", generateText);

    let generateResult: {
      success: boolean;
      step?: string;
      uid?: string;
      name?: string;
      dob?: string;
      age?: number;
      ageGroup?: string;
      duplicate?: boolean;
      message?: string;
      error?: string;
    };

    try {
      generateResult = JSON.parse(generateText);
    } catch {
      generateResult = { success: generateResponse.ok };
    }

    if (!generateResult.success) {
      if (generateResult.duplicate) {
        setIsDuplicate(true);
        setSubmitError(
          generateResult.message ||
          "A registration already exists for this name and date of birth."
        );
      } else {
        setSubmitError(
          generateResult.error ||
          generateResult.message ||
          "Registration failed. Please try again."
        );
      }
      return;
    }

    const serverUid = generateResult.uid;
    if (!serverUid) {
      throw new Error("Server did not return a UID");
    }

    console.log("Server-generated UID:", serverUid);

    // -------------------------------------------------------
    // STEP 2: Generate QR code with the SERVER UID
    // -------------------------------------------------------
    const qrPayload = `${serverUid}|${finalPayload.name}|${finalPayload.dob}`;
    console.log("QR Payload with server UID:", qrPayload);

    let qrBase64 = "";
    try {
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      document.body.appendChild(container);

      const { createRoot } = await import('react-dom/client');
      const root = createRoot(container);
      await new Promise<void>((resolve) => {
        root.render(
          React.createElement(QRCode, {
            value: qrPayload,
            size: 300,
            level: 'H',
            bgColor: '#ffffff',
            fgColor: '#0A1128',
          })
        );
        setTimeout(resolve, 100);
      });

      const svgEl = container.querySelector('svg') as SVGSVGElement | null;
      if (svgEl) {
        qrBase64 = await svgElementToBase64Png(svgEl, 300);
      }

      root.unmount();
      document.body.removeChild(container);
    } catch (qrErr) {
      console.warn('QR generation failed:', qrErr);
    }

    // -------------------------------------------------------
    // STEP 3: Finalize registration with QR code
    // -------------------------------------------------------
    const finalizeParams = new URLSearchParams();
    finalizeParams.append("name", finalPayload.name);
    finalizeParams.append("dob", finalPayload.dob);
    finalizeParams.append("gender", finalPayload.gender);
    finalizeParams.append("whatsapp", finalPayload.phone);
    finalizeParams.append("email", finalPayload.email);
    finalizeParams.append("church", finalPayload.church);
    finalizeParams.append("officers", finalPayload.isOfficer);
    finalizeParams.append("size", finalPayload.tshirtSize);
    finalizeParams.append("qrBase64", qrBase64 || "");
    finalizeParams.append("step", "finalize");
    finalizeParams.append("tempUid", serverUid);

    const finalizeResponse = await fetch(GOOGLE_APP_SCRIPT_URL, {
      method: "POST",
      body: finalizeParams,
    });

    const finalizeText = await finalizeResponse.text();
    console.log("Finalize response:", finalizeText);

    let finalizeResult: {
      success: boolean;
      step?: string;
      message?: string;
      error?: string;
      uid?: string;
      age?: number;
      ageGroup?: string;
      emailSent?: boolean;
    };

    try {
      finalizeResult = JSON.parse(finalizeText);
    } catch {
      finalizeResult = { success: finalizeResponse.ok };
    }

    if (!finalizeResult.success) {
      setSubmitError(
        finalizeResult.error ||
        finalizeResult.message ||
        "Failed to save registration. Please try again."
      );
      return;
    }

    // -------------------------------------------------------
    // STEP 4: Navigate to confirmation
    // -------------------------------------------------------
    navigate("/confirmation", {
      state: {
        user: {
          ...finalPayload,
          uid: serverUid,
          age: finalizeResult.age ?? generateResult.age ?? null,
          ageGroup: finalizeResult.ageGroup ?? generateResult.ageGroup ?? "",
          emailSent: finalizeResult.emailSent ?? false,
          qrData: qrPayload,
        },
      },
    });

  } catch (error) {
    console.error("Registration submission failed:", error);
    setSubmitError(
      "There was a problem submitting your registration. Please check your connection and try again."
    );
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="retreat-site min-h-screen pt-24 sm:pt-32 pb-24 bg-[#F8FAFC] text-[#0A1128]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">

        {/* TOP HEADER CARD */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm overflow-hidden border border-slate-200 mb-6 relative"
        >
          {/* Accent Bar */}
          <div className="h-3 bg-[#D92B27] w-full" />

          <div className="p-6 sm:p-10">
            <div className="flex items-center gap-2 text-[#D92B27] font-black text-xs uppercase tracking-widest mb-2">
              <Sparkles size={16} />
              <span>Youth Retreat 2026 Official Registration</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#0A1128] mb-4">
              Registration <span className="text-[#D92B27]">Form</span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed mb-6 border-b border-slate-200 pb-6">
              Welcome! Please fill out all required information below to register for Youth Retreat 2026. Your digital pass will be generated upon submission.
            </p>

            <div className="flex items-center gap-1.5 text-[#D92B27] text-xs sm:text-sm font-bold">
              <span>* Indicates required question</span>
            </div>
          </div>
        </motion.div>

        {/* FORM CONTAINER */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* CARD 1: FULL NAME */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            onClick={() => setFocusedField('name')}
            className={`bg-white rounded-3xl p-6 sm:p-8 border transition-all duration-200 relative ${focusedField === 'name'
              ? 'border-[#D92B27] border-l-8 shadow-sm'
              : 'border-slate-200'
              }`}
          >
            <label htmlFor="name" className="block text-base sm:text-lg font-black text-[#0A1128] mb-2">
              Full Name <span className="text-[#D92B27] font-bold">*</span>
            </label>
            <p className="text-xs sm:text-sm text-slate-500 mb-4">Enter your full legal name as it should appear on your pass.</p>
            <input
              required
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onFocus={() => setFocusedField('name')}
              onChange={handleChange}
              placeholder="Your answer"
              className="w-full sm:w-3/4 bg-transparent border-b-2 border-slate-300 py-2 sm:py-3 text-lg sm:text-xl font-medium text-[#0A1128] focus:outline-none focus:border-[#D92B27] transition-colors placeholder:text-slate-400"
            />
          </motion.div>

          {/* CARD 2: DATE OF BIRTH */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => setFocusedField('dob')}
            className={`bg-white rounded-3xl p-6 sm:p-8 border transition-all duration-200 relative ${focusedField === 'dob'
              ? 'border-[#D92B27] border-l-8 shadow-sm'
              : 'border-slate-200'
              }`}
          >
            <label htmlFor="dob" className="block text-base sm:text-lg font-black text-[#0A1128] mb-2">
              Date of Birth <span className="text-[#D92B27] font-bold">*</span>
            </label>
            <p className="text-xs sm:text-sm text-slate-500 mb-4">Select your date of birth.</p>
            <input
              required
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onFocus={() => setFocusedField('dob')}
              onChange={handleChange}
              className="w-full sm:w-1/2 bg-transparent border-b-2 border-slate-300 py-2 sm:py-3 text-base sm:text-lg font-medium text-[#0A1128] focus:outline-none focus:border-[#D92B27] transition-colors"
            />
          </motion.div>

          {/* CARD 3: GENDER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            onClick={() => setFocusedField('gender')}
            className={`bg-white rounded-3xl p-6 sm:p-8 border transition-all duration-200 relative ${focusedField === 'gender'
              ? 'border-[#D92B27] border-l-8 shadow-sm'
              : 'border-slate-200'
              }`}
          >
            <label className="block text-base sm:text-lg font-black text-[#0A1128] mb-4">
              Gender <span className="text-[#D92B27] font-bold">*</span>
            </label>

            <div className="space-y-3">
              {["Male", "Female", "Other"].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-4 cursor-pointer p-2.5 rounded-xl hover:bg-slate-100 transition-colors group"
                >
                  <input
                    type="radio"
                    name="gender"
                    value={option}
                    required
                    checked={formData.gender === option}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('gender')}
                    className="w-5 h-5 accent-[#D92B27] cursor-pointer"
                  />
                  <span className="text-base sm:text-lg font-semibold text-[#0A1128]">
                    {option}
                  </span>
                </label>
              ))}
            </div>

            <AnimatePresence>
              {formData.gender === 'Other' && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden pl-9"
                >
                  <input
                    type="text"
                    name="otherGender"
                    required
                    value={formData.otherGender}
                    onChange={handleChange}
                    placeholder="Please specify your gender..."
                    className="w-full sm:w-3/4 bg-transparent border-b-2 border-[#D92B27] py-2 text-base sm:text-lg font-medium text-[#0A1128] focus:outline-none placeholder:text-slate-400"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* CARD 4: PHONE NUMBER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => setFocusedField('phone')}
            className={`bg-white rounded-3xl p-6 sm:p-8 border transition-all duration-200 relative ${focusedField === 'phone'
              ? 'border-[#D92B27] border-l-8 shadow-sm'
              : 'border-slate-200'
              }`}
          >
            <label htmlFor="phone" className="block text-base sm:text-lg font-black text-[#0A1128] mb-2">
              Phone Number <span className="text-[#D92B27] font-bold">*</span>
            </label>
            <p className="text-xs sm:text-sm text-slate-500 mb-4">WhatsApp enabled mobile number preferred.</p>
            <input
              required
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onFocus={() => setFocusedField('phone')}
              onChange={handleChange}
              placeholder="Your answer (+91...)"
              className="w-full sm:w-3/4 bg-transparent border-b-2 border-slate-300 py-2 sm:py-3 text-lg sm:text-xl font-medium text-[#0A1128] focus:outline-none focus:border-[#D92B27] transition-colors placeholder:text-slate-400"
            />
          </motion.div>

          {/* CARD 5: EMAIL ADDRESS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            onClick={() => setFocusedField('email')}
            className={`bg-white rounded-3xl p-6 sm:p-8 border transition-all duration-200 relative ${focusedField === 'email'
              ? 'border-[#D92B27] border-l-8 shadow-sm'
              : 'border-slate-200'
              }`}
          >
            <label htmlFor="email" className="block text-base sm:text-lg font-black text-[#0A1128] mb-2">
              Email Address <span className="text-[#D92B27] font-bold">*</span>
            </label>
            <p className="text-xs sm:text-sm text-slate-500 mb-4">We will send your pass confirmation to this email.</p>
            <input
              required
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onFocus={() => setFocusedField('email')}
              onChange={handleChange}
              placeholder="Your email address"
              className="w-full sm:w-3/4 bg-transparent border-b-2 border-slate-300 py-2 sm:py-3 text-lg sm:text-xl font-medium text-[#0A1128] focus:outline-none focus:border-[#D92B27] transition-colors placeholder:text-slate-400"
            />
          </motion.div>

          {/* CARD 6: CHURCH NAME */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => setFocusedField('church')}
            className={`bg-white rounded-3xl p-6 sm:p-8 border transition-all duration-200 relative ${focusedField === 'church'
              ? 'border-[#D92B27] border-l-8 shadow-sm'
              : 'border-slate-200'
              }`}
          >
            <label htmlFor="church" className="block text-base sm:text-lg font-black text-[#0A1128] mb-2">
              Church Name / Corps <span className="text-[#D92B27] font-bold">*</span>
            </label>
            <p className="text-xs sm:text-sm text-slate-500 mb-4">Select your church from the list or choose "Other".</p>

            <input
              required
              list="church-list"
              id="church"
              name="church"
              value={formData.church}
              onFocus={() => setFocusedField('church')}
              onChange={handleChange}
              placeholder="Choose or type church..."
              className="w-full sm:w-3/4 bg-transparent border-b-2 border-slate-300 py-2 sm:py-3 text-lg sm:text-xl font-medium text-[#0A1128] focus:outline-none focus:border-[#D92B27] transition-colors placeholder:text-slate-400"
            />
            <datalist id="church-list">
              {CHURCHES.map((church, idx) => (
                <option key={idx} value={church} />
              ))}
              <option value="Other" />
            </datalist>

            <AnimatePresence>
              {formData.church === 'Other' && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <input
                    type="text"
                    name="otherChurch"
                    required
                    value={formData.otherChurch}
                    onChange={handleChange}
                    placeholder="Please specify your church / corps name..."
                    className="w-full sm:w-3/4 bg-transparent border-b-2 border-[#D92B27] py-2 text-base sm:text-lg font-medium text-[#0A1128] focus:outline-none placeholder:text-slate-400"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* CARD 7: OFFICER STATUS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            onClick={() => setFocusedField('isOfficer')}
            className={`bg-white rounded-3xl p-6 sm:p-8 border transition-all duration-200 relative ${focusedField === 'isOfficer'
              ? 'border-[#D92B27] border-l-8 shadow-sm'
              : 'border-slate-200'
              }`}
          >
            <label className="block text-base sm:text-lg font-black text-[#0A1128] mb-4">
              Are you an Officer? <span className="text-[#D92B27] font-bold">*</span>
            </label>

            <div className="space-y-3">
              {[
                { label: "Yes", val: "Yes" },
                { label: "No", val: "No" }
              ].map((item) => (
                <label
                  key={item.val}
                  className="flex items-center gap-4 cursor-pointer p-2.5 rounded-xl hover:bg-slate-100 transition-colors group"
                >
                  <input
                    type="radio"
                    name="isOfficer"
                    value={item.val}
                    required
                    checked={formData.isOfficer === item.val}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('isOfficer')}
                    className="w-5 h-5 accent-[#D92B27] cursor-pointer"
                  />
                  <span className="text-base sm:text-lg font-semibold text-[#0A1128]">
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </motion.div>

          {/* CARD 8: T-SHIRT SIZE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={() => setFocusedField('tshirtSize')}
            className={`bg-white rounded-3xl p-6 sm:p-8 border transition-all duration-200 relative ${focusedField === 'tshirtSize'
              ? 'border-[#D92B27] border-l-8 shadow-sm'
              : 'border-slate-200'
              }`}
          >
            <label className="block text-base sm:text-lg font-black text-[#0A1128] mb-4">
              T-Shirt Size <span className="text-[#D92B27] font-bold">*</span>
            </label>
            <p className="text-xs sm:text-sm text-slate-500 mb-4">Select your preferred retreat merchandise size.</p>

            <div className="space-y-3">
              {TSHIRT_SIZES.map((size) => (
                <label
                  key={size}
                  className="flex items-center gap-4 cursor-pointer p-2.5 rounded-xl hover:bg-slate-100 transition-colors group"
                >
                  <input
                    type="radio"
                    name="tshirtSize"
                    value={size}
                    required
                    checked={formData.tshirtSize === size}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('tshirtSize')}
                    className="w-5 h-5 accent-[#D92B27] cursor-pointer"
                  />
                  <span className="text-base sm:text-lg font-semibold text-[#0A1128]">
                    {size}
                  </span>
                </label>
              ))}
            </div>

            <AnimatePresence>
              {formData.tshirtSize === 'Other' && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden pl-9"
                >
                  <input
                    type="text"
                    name="otherTshirtSize"
                    required
                    value={formData.otherTshirtSize}
                    onChange={handleChange}
                    placeholder="Please specify your custom T-shirt size (e.g. 3XL)..."
                    className="w-full sm:w-3/4 bg-transparent border-b-2 border-[#D92B27] py-2 text-base sm:text-lg font-medium text-[#0A1128] focus:outline-none placeholder:text-slate-400"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ERROR / DUPLICATE BANNER */}
          <AnimatePresence>
            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={`rounded-2xl p-5 border flex items-start gap-4 ${isDuplicate
                  ? 'bg-amber-50 border-amber-300 text-amber-900'
                  : 'bg-red-50 border-red-300 text-red-900'
                  }`}
              >
                <AlertCircle size={22} className="shrink-0 mt-0.5" />
                <div>
                  <p className="font-black text-base">
                    {isDuplicate ? 'Already Registered' : 'Submission Failed'}
                  </p>
                  <p className="text-sm font-medium mt-1">{submitError}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* FORM FOOTER / SUBMIT ACTION CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4"
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-10 py-4 bg-[#D92B27] hover:bg-[#B81E1C] text-white font-black uppercase tracking-widest text-lg rounded-full shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <span>Submitting Registration...</span>
              ) : (
                <>
                  <span>Submit Form</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setFormData({ name: '', gender: '', otherGender: '', isOfficer: '', dob: '', phone: '', email: '', church: '', otherChurch: '', tshirtSize: '', otherTshirtSize: '' });
                setSubmitError(null);
                setIsDuplicate(false);
              }}
              className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500 hover:text-[#D92B27] transition-colors py-2 px-4"
            >
              Clear Form
            </button>
          </motion.div>

        </form>
      </div>
    </div>
  );
}