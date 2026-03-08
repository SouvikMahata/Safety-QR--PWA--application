<<<<<<< HEAD
import { useState } from "react";
import { C } from "../../utils/constants";

// ─── Icons ───────────────────────────────────────────────────────────────────
const Shield = ({ size = 15, color = C.text }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);
const Phone = ({ size = 16, color = C.text3 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
    </svg>
);
const Arrow = ({ size = 15, color = "#fff" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
);
const ChevronLeft = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={C.text2} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" />
    </svg>
);

// ─── Steps ───────────────────────────────────────────────────────────────────
// step 1 → enter phone
// step 2 → enter OTP

export default function LoginPage() {
    const [step, setStep] = useState(1); // 1 = phone, 2 = otp
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [phoneFocused, setPhoneFocused] = useState(false);

    // ── send OTP ──────────────────────────────────────────────────────────────
    const handleSendOtp = () => {
        if (phone.length < 10) return;
        setLoading(true);
        setTimeout(() => { setLoading(false); setStep(2); }, 1200);
    };

    // ── OTP input boxes ───────────────────────────────────────────────────────
    const handleOtpChange = (val, idx) => {
        if (!/^\d?$/.test(val)) return;
        const next = [...otp];
        next[idx] = val;
        setOtp(next);
        if (val && idx < 5) {
            document.getElementById(`otp-${idx + 1}`)?.focus();
        }
    };
    const handleOtpKeyDown = (e, idx) => {
        if (e.key === "Backspace" && !otp[idx] && idx > 0) {
            document.getElementById(`otp-${idx - 1}`)?.focus();
        }
    };
    const handleOtpPaste = (e) => {
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        if (pasted.length === 6) {
            setOtp(pasted.split(""));
            document.getElementById("otp-5")?.focus();
        }
        e.preventDefault();
    };

    const otpFilled = otp.every(d => d !== "");

    // ── verify OTP ────────────────────────────────────────────────────────────
    const handleVerify = () => {
        if (!otpFilled) return;
        setLoading(true);
        setTimeout(() => setLoading(false), 1200);
    };

    return (
        <div
            className="min-h-screen flex flex-col relative overflow-hidden"
            style={{ background: C.bg, color: C.text }}
        >
            {/* Ambient glows */}
            <div
                className="pointer-events-none absolute -top-32 -right-20 w-[380px] h-[380px] rounded-full blur-[90px]"
                style={{ background: `radial-gradient(circle, ${C.primaryGlow} 0%, transparent 70%)` }}
            />
            <div
                className="pointer-events-none absolute -bottom-24 -left-16 w-[280px] h-[280px] rounded-full blur-[70px]"
                style={{ background: "radial-gradient(circle, rgba(232,52,42,0.05) 0%, transparent 70%)" }}
            />

            {/* Dot grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                    maskImage: "radial-gradient(ellipse 80% 80% at 50% 40%, black 0%, transparent 100%)",
                }}
            />

            {/* ── Navbar ──────────────────────────────────────────────────────── */}
            <nav className="flex items-center justify-between px-6 py-5 relative z-10">
                {/* Back / Logo */}
                <a
                    href="/"
                    className="flex items-center gap-1.5 transition-opacity hover:opacity-70"
                >
                    <ChevronLeft size={18} />
                    <span className="text-sm" style={{ color: C.text2 }}>Back</span>
                </a>

                {/* Logo center */}
                <div className="flex items-center gap-2.5 absolute left-1/2 -translate-x-1/2">
                    <div
                        className="w-8 h-8 rounded-[9px] flex items-center justify-center"
                        style={{ background: C.primary, boxShadow: "0 4px 14px rgba(232,52,42,0.38)" }}
                    >
                        <Shield size={15} color="#fff" />
                    </div>
                    <span
                        className="font-bold text-[17px] tracking-tight"
                        style={{ fontFamily: "Syne, sans-serif", color: C.text }}
                    >
                        Safe<span style={{ color: C.primary }}>Card</span>
                    </span>
                </div>

                {/* Spacer */}
                <div className="w-16" />
            </nav>

            {/* ── Main card ───────────────────────────────────────────────────── */}
            <main className="flex-1 flex items-center justify-center px-6 py-8 relative z-10">
                <div className="w-full max-w-[360px] flex flex-col">

                    {/* Progress dots */}
                    <div className="flex items-center justify-center gap-2 mb-8">
                        {[1, 2].map(s => (
                            <div
                                key={s}
                                className="rounded-full transition-all duration-300"
                                style={{
                                    width: step === s ? 24 : 8,
                                    height: 8,
                                    background: step === s ? C.primary : C.surface3,
                                }}
                            />
                        ))}
                    </div>

                    {/* Card container */}
                    <div
                        className="rounded-[24px] p-6 flex flex-col gap-6"
                        style={{
                            background: C.surface,
                            border: `1px solid ${C.border}`,
                            boxShadow: `0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 ${C.border2}`,
                        }}
                    >
                        {/* Card inner shine */}
                        <div
                            className="absolute top-0 left-0 right-0 h-24 pointer-events-none rounded-t-[24px]"
                            style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)" }}
                        />

                        {/* ── STEP 1: Phone ─────────────────────────── */}
                        {step === 1 && (
                            <>
                                {/* Header */}
                                <div className="flex flex-col gap-1.5">
                                    <div
                                        className="w-11 h-11 rounded-[14px] flex items-center justify-center mb-1"
                                        style={{ background: C.primaryBg, border: `1px solid ${C.primaryBorder}` }}
                                    >
                                        <Phone size={20} color={C.primary} />
                                    </div>
                                    <h1
                                        className="text-[22px] font-bold tracking-tight"
                                        style={{ fontFamily: "Syne, sans-serif", color: C.text }}
                                    >
                                        Welcome back
                                    </h1>
                                    <p className="text-[13.5px] leading-relaxed" style={{ color: C.text3 }}>
                                        Enter your registered mobile number to receive a verification code.
                                    </p>
                                </div>

                                {/* Phone input */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-[12px] font-medium uppercase tracking-wider" style={{ color: C.text3 }}>
                                        Mobile Number
                                    </label>
                                    <div
                                        className="flex items-center gap-0 rounded-[14px] overflow-hidden transition-all duration-200"
                                        style={{
                                            border: `1px solid ${phoneFocused ? C.primaryBorder : C.border}`,
                                            background: C.surface2,
                                            boxShadow: phoneFocused ? `0 0 0 3px ${C.primaryBg}` : "none",
                                        }}
                                    >
                                        {/* Country code */}
                                        <div
                                            className="flex items-center gap-1.5 px-3.5 py-3.5 shrink-0"
                                            style={{ borderRight: `1px solid ${C.border}` }}
                                        >
                                            <span className="text-[14px]">🇮🇳</span>
                                            <span className="text-[14px] font-medium" style={{ color: C.text2 }}>+91</span>
                                        </div>
                                        {/* Number input */}
                                        <input
                                            type="tel"
                                            inputMode="numeric"
                                            maxLength={10}
                                            placeholder="98765 43210"
                                            value={phone}
                                            onChange={e => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                                            onFocus={() => setPhoneFocused(true)}
                                            onBlur={() => setPhoneFocused(false)}
                                            onKeyDown={e => e.key === "Enter" && handleSendOtp()}
                                            className="flex-1 bg-transparent outline-none px-3.5 py-3.5 text-[15px] tracking-wide"
                                            style={{
                                                color: C.text,
                                                fontFamily: "DM Sans, sans-serif",
                                                caretColor: C.primary,
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Send OTP button */}
                                <button
                                    onClick={handleSendOtp}
                                    disabled={phone.length < 10 || loading}
                                    className="w-full relative overflow-hidden text-white font-semibold text-[15px] tracking-tight rounded-[14px] py-3.5 flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                                    style={{
                                        background: phone.length >= 10 ? C.primary : C.surface3,
                                        fontFamily: "Syne, sans-serif",
                                        boxShadow: phone.length >= 10 ? "0 8px 24px rgba(232,52,42,0.3)" : "none",
                                    }}
                                    onMouseEnter={e => { if (phone.length >= 10) e.currentTarget.style.background = C.primaryDark; }}
                                    onMouseLeave={e => { if (phone.length >= 10) e.currentTarget.style.background = C.primary; }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent pointer-events-none" />
                                    {loading ? (
                                        <div
                                            className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white"
                                            style={{ animation: "spinCW 0.7s linear infinite" }}
                                        />
                                    ) : (
                                        <>
                                            <span className="relative">Send OTP</span>
                                            <Arrow size={15} />
                                        </>
                                    )}
                                </button>

                                {/* Divider + Register */}
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 h-px" style={{ background: C.border }} />
                                        <span className="text-[12px]" style={{ color: C.text3 }}>New here?</span>
                                        <div className="flex-1 h-px" style={{ background: C.border }} />
                                    </div>
                                    <a
                                        href="/register"
                                        className="w-full text-[14px] font-medium rounded-[14px] py-3 flex items-center justify-center gap-2 transition-all duration-200"
                                        style={{
                                            color: C.text2,
                                            border: `1px solid ${C.border}`,
                                            background: "transparent",
                                        }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.borderColor = C.border2;
                                            e.currentTarget.style.background = C.surface2;
                                            e.currentTarget.style.color = C.text;
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.borderColor = C.border;
                                            e.currentTarget.style.background = "transparent";
                                            e.currentTarget.style.color = C.text2;
                                        }}
                                    >
                                        Create an account
                                    </a>
                                </div>
                            </>
                        )}

                        {/* ── STEP 2: OTP ───────────────────────────── */}
                        {step === 2 && (
                            <>
                                {/* Header */}
                                <div className="flex flex-col gap-1.5">
                                    {/* OTP icon */}
                                    <div
                                        className="w-11 h-11 rounded-[14px] flex items-center justify-center mb-1"
                                        style={{ background: C.primaryBg, border: `1px solid ${C.primaryBorder}` }}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                                            stroke={C.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                        </svg>
                                    </div>
                                    <h1
                                        className="text-[22px] font-bold tracking-tight"
                                        style={{ fontFamily: "Syne, sans-serif", color: C.text }}
                                    >
                                        Verify your number
                                    </h1>
                                    <p className="text-[13.5px] leading-relaxed" style={{ color: C.text3 }}>
                                        We sent a 6-digit code to{" "}
                                        <span
                                            className="font-medium"
                                            style={{ color: C.text }}
                                        >
                                            +91 {phone}
                                        </span>
                                    </p>
                                </div>

                                {/* OTP boxes */}
                                <div className="flex gap-2.5 justify-between" onPaste={handleOtpPaste}>
                                    {otp.map((digit, idx) => (
                                        <input
                                            key={idx}
                                            id={`otp-${idx}`}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            value={digit}
                                            onChange={e => handleOtpChange(e.target.value, idx)}
                                            onKeyDown={e => handleOtpKeyDown(e, idx)}
                                            className="flex-1 text-center text-[20px] font-bold rounded-[12px] py-3.5 outline-none transition-all duration-150"
                                            style={{
                                                background: digit ? C.surface3 : C.surface2,
                                                border: `1.5px solid ${digit ? C.primaryBorder : C.border}`,
                                                color: digit ? C.text : C.text3,
                                                caretColor: C.primary,
                                                fontFamily: "Syne, sans-serif",
                                                boxShadow: digit ? `0 0 0 3px ${C.primaryBg}` : "none",
                                                maxWidth: 48,
                                            }}
                                        />
                                    ))}
                                </div>

                                {/* Verify button */}
                                <button
                                    onClick={handleVerify}
                                    disabled={!otpFilled || loading}
                                    className="w-full relative overflow-hidden text-white font-semibold text-[15px] tracking-tight rounded-[14px] py-3.5 flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                                    style={{
                                        background: otpFilled ? C.primary : C.surface3,
                                        fontFamily: "Syne, sans-serif",
                                        boxShadow: otpFilled ? "0 8px 24px rgba(232,52,42,0.3)" : "none",
                                    }}
                                    onMouseEnter={e => { if (otpFilled) e.currentTarget.style.background = C.primaryDark; }}
                                    onMouseLeave={e => { if (otpFilled) e.currentTarget.style.background = C.primary; }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent pointer-events-none" />
                                    {loading ? (
                                        <div
                                            className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white"
                                            style={{ animation: "spinCW 0.7s linear infinite" }}
                                        />
                                    ) : (
                                        <>
                                            <span className="relative">Verify & Continue</span>
                                            <Arrow size={15} />
                                        </>
                                    )}
                                </button>

                                {/* Resend + change number */}
                                <div className="flex items-center justify-between">
                                    <button
                                        onClick={() => { setStep(1); setOtp(["", "", "", "", "", ""]); }}
                                        className="text-[13px] flex items-center gap-1 transition-opacity hover:opacity-70"
                                        style={{ color: C.text3 }}
                                    >
                                        <ChevronLeft size={14} />
                                        Change number
                                    </button>
                                    <button
                                        className="text-[13px] font-medium transition-opacity hover:opacity-70"
                                        style={{ color: C.primary }}
                                        onClick={() => setOtp(["", "", "", "", "", ""])}
                                    >
                                        Resend OTP
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Bottom trust line */}
                    <div className="flex items-center justify-center gap-2 mt-5">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                            stroke={C.text3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <p className="text-[11.5px]" style={{ color: C.text3 }}>
                            Your data is encrypted and never shared
                        </p>
                    </div>
                </div>
            </main>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
                body { font-family: 'DM Sans', sans-serif; }
                @keyframes spinCW { to { transform: rotate(360deg); } }
                input::placeholder { color: ${C.text3}; }
                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button { -webkit-appearance: none; }
            `}</style>
        </div>
    );
}
=======
// src/pages/auth/LoginPage.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';

import { mobileSchema } from '@validations/schemas';
import { useAuth } from '@hooks/useAuth';
import { ROUTES, STORAGE_KEYS } from '@utils/constants';
import { storageService } from '@services/storageService';
import { notificationService } from '@services/notificationService';

import Input  from '@components/ui/Input';
import Button from '@components/ui/Button';

const LoginPage = () => {
  const navigate = useNavigate();
  const { sendOtp, loading } = useAuth();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(mobileSchema),
    defaultValues: { mobile: '' },
  });

  // Pre-fill last used mobile
  useEffect(() => {
    const last = storageService.get(STORAGE_KEYS.LAST_MOBILE);
    if (last) setValue('mobile', last);
  }, [setValue]);

  const onSubmit = async ({ mobile }) => {
    storageService.set(STORAGE_KEYS.LAST_MOBILE, mobile);
    const result = await sendOtp(mobile);
    if (result.success) {
      notificationService.success('OTP sent to your mobile', { toastId: 'otp-sent' });
      navigate(ROUTES.OTP);
    } else {
      notificationService.error(result.error || 'Failed to send OTP');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Welcome back</h2>
        <p className="text-sm text-slate-400 mt-1">Enter your mobile to continue</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          label="Mobile Number"
          type="tel"
          inputMode="tel"
          placeholder="+91 98765 43210"
          prefix="📱"
          error={errors.mobile?.message}
          autoFocus
          required
          {...register('mobile')}
        />

        <Button type="submit" loading={loading} fullWidth size="lg">
          Send OTP
        </Button>
      </form>

      <p className="text-center text-xs text-slate-500">
        First time?{' '}
        <span className="text-cyan-400 font-medium">
          OTP will guide you through registration
        </span>
      </p>
    </div>
  );
};

export default LoginPage;
>>>>>>> e306721a97b54980a0daac8d13c0da06d1cc8ee9
