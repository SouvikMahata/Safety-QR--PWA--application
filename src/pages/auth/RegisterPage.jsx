import { useState, useEffect } from "react";
import { C } from "../../utils/constants";

// ─── Icons ───────────────────────────────────────────────────────────────────
const Shield = ({ size = 15, color = C.text }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);
const ChevronLeft = ({ size = 18 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={C.text2} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" />
    </svg>
);
const Arrow = ({ size = 15, color = "#fff" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
);
const QrIcon = ({ size = 20, color = C.primary }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="3" height="3" />
        <line x1="17" y1="17" x2="21" y2="17" />
        <line x1="21" y1="17" x2="21" y2="21" />
        <line x1="17" y1="21" x2="21" y2="21" />
    </svg>
);
const CheckCircle = ({ size = 18, color = C.success }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);
const EditIcon = ({ size = 14, color = C.text3 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);
const PhoneIcon = ({ size = 16, color = C.text3 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
    </svg>
);
const SparkleIcon = ({ size = 16, color = C.primary }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v3M12 18v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M3 12h3M18 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
    </svg>
);

// ─── Spinner ──────────────────────────────────────────────────────────────────
const Spinner = () => (
    <div
        className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white"
        style={{ animation: "spinCW 0.7s linear infinite" }}
    />
);

// ─── Step indicator ───────────────────────────────────────────────────────────
function StepDots({ current, total = 3 }) {
    return (
        <div className="flex items-center justify-center gap-2 mb-8">
            {Array.from({ length: total }).map((_, i) => {
                const s = i + 1;
                const done = s < current;
                const active = s === current;
                return (
                    <div key={s} className="flex items-center gap-2">
                        <div
                            className="rounded-full flex items-center justify-center transition-all duration-300"
                            style={{
                                width: active ? 28 : 24,
                                height: active ? 28 : 24,
                                background: done ? C.success : active ? C.primary : C.surface3,
                                border: `1.5px solid ${done ? C.success : active ? C.primary : C.border}`,
                                boxShadow: active ? `0 0 12px ${C.primaryGlow}` : "none",
                            }}
                        >
                            {done ? (
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                                    stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            ) : (
                                <span
                                    className="text-[11px] font-bold"
                                    style={{ color: active ? "#fff" : C.text3, fontFamily: "Syne, sans-serif" }}
                                >
                                    {s}
                                </span>
                            )}
                        </div>
                        {i < total - 1 && (
                            <div
                                className="w-8 h-px transition-all duration-500"
                                style={{ background: done ? C.success : C.border }}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

// ─── Card ID field ────────────────────────────────────────────────────────────
function CardIdField({ value, onChange, autoFetched, onClear }) {
    const [focused, setFocused] = useState(false);
    const filled = value.length > 0;

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <label className="text-[12px] font-medium uppercase tracking-wider" style={{ color: C.text3 }}>
                    Card ID
                </label>
                {autoFetched && (
                    <div
                        className="flex items-center gap-1 rounded-full px-2.5 py-0.5"
                        style={{ background: C.successBg, border: `1px solid rgba(22,163,74,0.2)` }}
                    >
                        <SparkleIcon size={11} color={C.success} />
                        <span className="text-[10px] font-medium" style={{ color: C.success }}>
                            Auto-fetched
                        </span>
                    </div>
                )}
            </div>

            <div
                className="flex items-center gap-3 rounded-[14px] px-4 py-3.5 transition-all duration-200"
                style={{
                    background: autoFetched ? `rgba(22,163,74,0.06)` : C.surface2,
                    border: `1.5px solid ${focused ? C.primaryBorder : autoFetched ? "rgba(22,163,74,0.25)" : filled ? C.border2 : C.border}`,
                    boxShadow: focused ? `0 0 0 3px ${C.primaryBg}` : autoFetched ? `0 0 0 3px rgba(22,163,74,0.06)` : "none",
                }}
            >
                <QrIcon size={18} color={autoFetched ? C.success : focused ? C.primary : C.text3} />
                <input
                    type="text"
                    placeholder="e.g. SC-2024-08491"
                    value={value}
                    onChange={e => onChange(e.target.value.toUpperCase())}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="flex-1 bg-transparent outline-none text-[14px] tracking-wider"
                    style={{
                        color: autoFetched ? C.success : C.text,
                        fontFamily: "DM Sans, sans-serif",
                        caretColor: C.primary,
                    }}
                />
                {filled && (
                    <button
                        onClick={onClear}
                        className="flex items-center gap-1 transition-opacity hover:opacity-70 shrink-0"
                    >
                        <EditIcon size={13} color={C.text3} />
                    </button>
                )}
                {autoFetched && (
                    <CheckCircle size={16} color={C.success} />
                )}
            </div>

            {autoFetched && (
                <p className="text-[11.5px]" style={{ color: C.success }}>
                    ✓ Card ID found from your scanned QR code
                </p>
            )}
        </div>
    );
}

// ─── Phone input ──────────────────────────────────────────────────────────────
function PhoneField({ value, onChange, onSendOtp, otpSent, otpLoading, cooldown }) {
    const [focused, setFocused] = useState(false);
    const canSend = value.length === 10 && !otpSent && !otpLoading && cooldown === 0;

    return (
        <div className="flex flex-col gap-2">
            <label className="text-[12px] font-medium uppercase tracking-wider" style={{ color: C.text3 }}>
                Mobile Number
            </label>
            <div
                className="flex items-center rounded-[14px] overflow-hidden transition-all duration-200"
                style={{
                    border: `1.5px solid ${focused ? C.primaryBorder : otpSent ? "rgba(22,163,74,0.25)" : C.border}`,
                    background: C.surface2,
                    boxShadow: focused ? `0 0 0 3px ${C.primaryBg}` : "none",
                }}
            >
                {/* Country prefix */}
                <div
                    className="flex items-center gap-1.5 px-3.5 py-3.5 shrink-0"
                    style={{ borderRight: `1px solid ${C.border}` }}
                >
                    <span className="text-[14px]">🇮🇳</span>
                    <span className="text-[14px] font-medium" style={{ color: C.text2 }}>+91</span>
                </div>

                {/* Number */}
                <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="98765 43210"
                    value={value}
                    onChange={e => onChange(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="flex-1 bg-transparent outline-none px-3.5 py-3.5 text-[14px] tracking-wide"
                    style={{ color: C.text, caretColor: C.primary }}
                    disabled={otpSent}
                />

                {/* Send OTP button inline */}
                <button
                    onClick={onSendOtp}
                    disabled={!canSend}
                    className="shrink-0 mr-2 px-3.5 py-2 rounded-[10px] text-[12.5px] font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{
                        background: canSend ? C.primary : C.surface3,
                        color: "#fff",
                        fontFamily: "Syne, sans-serif",
                        boxShadow: canSend ? "0 4px 12px rgba(232,52,42,0.3)" : "none",
                        minWidth: 80,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 5,
                    }}
                    onMouseEnter={e => { if (canSend) e.currentTarget.style.background = C.primaryDark; }}
                    onMouseLeave={e => { if (canSend) e.currentTarget.style.background = C.primary; }}
                >
                    {otpLoading ? (
                        <div className="w-3.5 h-3.5 rounded-full border-[1.5px] border-white/30 border-t-white"
                            style={{ animation: "spinCW 0.7s linear infinite" }} />
                    ) : otpSent ? (
                        <span style={{ color: C.success }}>Sent ✓</span>
                    ) : cooldown > 0 ? (
                        <span style={{ color: C.text3 }}>{cooldown}s</span>
                    ) : (
                        "Send OTP"
                    )}
                </button>
            </div>

            {otpSent && (
                <p className="text-[11.5px]" style={{ color: C.success }}>
                    ✓ OTP sent to +91 {value}
                </p>
            )}
        </div>
    );
}

// ─── OTP boxes ────────────────────────────────────────────────────────────────
function OtpBoxes({ otp, onChange, onKeyDown, onPaste }) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-[12px] font-medium uppercase tracking-wider" style={{ color: C.text3 }}>
                Verification Code
            </label>
            <div className="flex gap-2.5 justify-between" onPaste={onPaste}>
                {otp.map((digit, idx) => (
                    <input
                        key={idx}
                        id={`reg-otp-${idx}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={e => onChange(e.target.value, idx)}
                        onKeyDown={e => onKeyDown(e, idx)}
                        className="flex-1 text-center text-[20px] font-bold rounded-[12px] py-3 outline-none transition-all duration-150"
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
        </div>
    );
}

// ─── Main Register Page ───────────────────────────────────────────────────────
export default function RegisterPage() {
    const [step, setStep] = useState(1);           // 1=card, 2=phone+otp, 3=done
    const [cardId, setCardId] = useState("");
    const [autoFetched, setAutoFetched] = useState(false);
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [otpSent, setOtpSent] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [cooldown, setCooldown] = useState(0);
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [continueLoading, setContinueLoading] = useState(false);

    // ── Auto-fetch card ID from localStorage on mount ─────────────────────────
    useEffect(() => {
        try {
            const stored = "123dds";
            // const stored = localStorage.getItem("safecard_physical_id");
            if (stored) {
                setCardId(stored.trim().toUpperCase());
                setAutoFetched(true);
            }
        } catch (_) { }
    }, []);

    // ── Cooldown timer ────────────────────────────────────────────────────────
    useEffect(() => {
        if (cooldown <= 0) return;
        const t = setTimeout(() => setCooldown(c => c - 1), 1000);
        return () => clearTimeout(t);
    }, [cooldown]);

    // ── Send OTP ──────────────────────────────────────────────────────────────
    const handleSendOtp = () => {
        if (phone.length < 10 || otpSent || otpLoading) return;
        setOtpLoading(true);
        setTimeout(() => {
            setOtpLoading(false);
            setOtpSent(true);
            setCooldown(30);
        }, 1200);
    };

    // ── OTP handlers ─────────────────────────────────────────────────────────
    const handleOtpChange = (val, idx) => {
        if (!/^\d?$/.test(val)) return;
        const next = [...otp];
        next[idx] = val;
        setOtp(next);
        if (val && idx < 5) document.getElementById(`reg-otp-${idx + 1}`)?.focus();
    };
    const handleOtpKeyDown = (e, idx) => {
        if (e.key === "Backspace" && !otp[idx] && idx > 0)
            document.getElementById(`reg-otp-${idx - 1}`)?.focus();
    };
    const handleOtpPaste = (e) => {
        const p = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        if (p.length === 6) { setOtp(p.split("")); document.getElementById("reg-otp-5")?.focus(); }
        e.preventDefault();
    };

    const otpFilled = otp.every(d => d !== "");

    // ── Step 1 continue ───────────────────────────────────────────────────────
    const handleStep1Continue = () => {
        if (!cardId.trim()) return;
        setContinueLoading(true);
        setTimeout(() => { setContinueLoading(false); setStep(2); }, 800);
    };

    // ── Step 2 verify ─────────────────────────────────────────────────────────
    const handleVerify = () => {
        if (!otpFilled) return;
        setVerifyLoading(true);
        setTimeout(() => { setVerifyLoading(false); setStep(3); }, 1200);
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
                <a href="/login" className="flex items-center gap-1.5 transition-opacity hover:opacity-70">
                    <ChevronLeft size={18} />
                    <span className="text-sm" style={{ color: C.text2 }}>Back</span>
                </a>
                <div className="flex items-center gap-2.5 absolute left-1/2 -translate-x-1/2">
                    <div
                        className="w-8 h-8 rounded-[9px] flex items-center justify-center"
                        style={{ background: C.primary, boxShadow: "0 4px 14px rgba(232,52,42,0.38)" }}
                    >
                        <Shield size={15} color="#fff" />
                    </div>
                    <span className="font-bold text-[17px] tracking-tight"
                        style={{ fontFamily: "Syne, sans-serif", color: C.text }}>
                        Safe<span style={{ color: C.primary }}>Card</span>
                    </span>
                </div>
                <div className="w-16" />
            </nav>

            {/* ── Main ────────────────────────────────────────────────────────── */}
            <main className="flex-1 flex items-center justify-center px-6 py-6 relative z-10">
                <div className="w-full max-w-[360px] flex flex-col">

                    <StepDots current={step === 3 ? 3 : step} total={3} />

                    {/* ══ STEP 1 — Card ID ══════════════════════════════════════ */}
                    {step === 1 && (
                        <div
                            className="rounded-[24px] p-6 flex flex-col gap-5 relative overflow-hidden"
                            style={{
                                background: C.surface,
                                border: `1px solid ${C.border}`,
                                boxShadow: `0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 ${C.border2}`,
                            }}
                        >
                            <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none rounded-t-[24px]"
                                style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)" }} />

                            {/* Header */}
                            <div className="flex flex-col gap-1.5">
                                <div
                                    className="w-11 h-11 rounded-[14px] flex items-center justify-center mb-1"
                                    style={{ background: C.primaryBg, border: `1px solid ${C.primaryBorder}` }}
                                >
                                    <QrIcon size={20} color={C.primary} />
                                </div>
                                <h1 className="text-[22px] font-bold tracking-tight"
                                    style={{ fontFamily: "Syne, sans-serif", color: C.text }}>
                                    Link your card
                                </h1>
                                <p className="text-[13.5px] leading-relaxed" style={{ color: C.text3 }}>
                                    Your physical QR card ID is auto-detected. You can also enter it manually.
                                </p>
                            </div>

                            {/* Card ID field */}
                            <CardIdField
                                value={cardId}
                                onChange={(v) => { setCardId(v); setAutoFetched(false); }}
                                autoFetched={autoFetched}
                                onClear={() => { setCardId(""); setAutoFetched(false); }}
                            />

                            {/* Divider with hint */}
                            {!autoFetched && (
                                <div
                                    className="flex items-center gap-3 rounded-[12px] px-4 py-3"
                                    style={{ background: C.surface2, border: `1px solid ${C.border}` }}
                                >
                                    <div
                                        className="w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0"
                                        style={{ background: C.primaryBg }}
                                    >
                                        <QrIcon size={15} color={C.primary} />
                                    </div>
                                    <p className="text-[12px] leading-snug" style={{ color: C.text3 }}>
                                        Card ID is printed on the back of your child's school QR card.
                                    </p>
                                </div>
                            )}

                            {/* Continue button */}
                            <button
                                onClick={handleStep1Continue}
                                disabled={!cardId.trim() || continueLoading}
                                className="w-full relative overflow-hidden text-white font-semibold text-[15px] tracking-tight rounded-[14px] py-3.5 flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                                style={{
                                    background: cardId.trim() ? C.primary : C.surface3,
                                    fontFamily: "Syne, sans-serif",
                                    boxShadow: cardId.trim() ? "0 8px 24px rgba(232,52,42,0.3)" : "none",
                                }}
                                onMouseEnter={e => { if (cardId.trim()) e.currentTarget.style.background = C.primaryDark; }}
                                onMouseLeave={e => { if (cardId.trim()) e.currentTarget.style.background = C.primary; }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent pointer-events-none" />
                                {continueLoading ? <Spinner /> : (
                                    <>
                                        <span className="relative">Continue</span>
                                        <Arrow size={15} />
                                    </>
                                )}
                            </button>

                            {/* Login link */}
                            <p className="text-center text-[13px]" style={{ color: C.text3 }}>
                                Already have an account?{" "}
                                <a href="/login"
                                    className="font-medium underline underline-offset-2 transition-all"
                                    style={{ color: C.primary, textDecorationColor: C.primaryBorder }}
                                    onMouseEnter={e => e.currentTarget.style.textDecorationColor = C.primary}
                                    onMouseLeave={e => e.currentTarget.style.textDecorationColor = C.primaryBorder}
                                >
                                    Log in
                                </a>
                            </p>
                        </div>
                    )}

                    {/* ══ STEP 2 — Phone + OTP ══════════════════════════════════ */}
                    {step === 2 && (
                        <div
                            className="rounded-[24px] p-6 flex flex-col gap-5 relative overflow-hidden"
                            style={{
                                background: C.surface,
                                border: `1px solid ${C.border}`,
                                boxShadow: `0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 ${C.border2}`,
                            }}
                        >
                            <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none rounded-t-[24px]"
                                style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)" }} />

                            {/* Header */}
                            <div className="flex flex-col gap-1.5">
                                <div
                                    className="w-11 h-11 rounded-[14px] flex items-center justify-center mb-1"
                                    style={{ background: C.primaryBg, border: `1px solid ${C.primaryBorder}` }}
                                >
                                    <PhoneIcon size={20} color={C.primary} />
                                </div>
                                <h1 className="text-[22px] font-bold tracking-tight"
                                    style={{ fontFamily: "Syne, sans-serif", color: C.text }}>
                                    Verify your number
                                </h1>
                                <p className="text-[13.5px] leading-relaxed" style={{ color: C.text3 }}>
                                    This number will be used for scan alerts and account recovery.
                                </p>
                            </div>

                            {/* Linked card chip */}
                            <div
                                className="flex items-center gap-2.5 rounded-[12px] px-4 py-3"
                                style={{ background: C.surface2, border: `1px solid ${C.border}` }}
                            >
                                <div
                                    className="w-7 h-7 rounded-[8px] flex items-center justify-center shrink-0"
                                    style={{ background: C.successBg }}
                                >
                                    <QrIcon size={14} color={C.success} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] uppercase tracking-wider" style={{ color: C.text3 }}>Linked Card</p>
                                    <p className="text-[13px] font-semibold tracking-widest truncate"
                                        style={{ color: C.text, fontFamily: "Syne, sans-serif" }}>
                                        {cardId}
                                    </p>
                                </div>
                                <CheckCircle size={16} color={C.success} />
                            </div>

                            {/* Phone + send OTP */}
                            <PhoneField
                                value={phone}
                                onChange={setPhone}
                                onSendOtp={handleSendOtp}
                                otpSent={otpSent}
                                otpLoading={otpLoading}
                                cooldown={cooldown}
                            />

                            {/* OTP boxes — shown after OTP sent */}
                            {otpSent && (
                                <>
                                    <OtpBoxes
                                        otp={otp}
                                        onChange={handleOtpChange}
                                        onKeyDown={handleOtpKeyDown}
                                        onPaste={handleOtpPaste}
                                    />

                                    {/* Resend row */}
                                    <div className="flex items-center justify-between -mt-1">
                                        <p className="text-[12px]" style={{ color: C.text3 }}>
                                            Didn't receive it?
                                        </p>
                                        <button
                                            disabled={cooldown > 0}
                                            onClick={() => {
                                                setOtp(["", "", "", "", "", ""]);
                                                setOtpSent(false);
                                                handleSendOtp();
                                            }}
                                            className="text-[12px] font-medium transition-opacity disabled:opacity-40"
                                            style={{ color: C.primary }}
                                        >
                                            {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend OTP"}
                                        </button>
                                    </div>
                                </>
                            )}

                            {/* Verify button */}
                            <button
                                onClick={handleVerify}
                                disabled={!otpFilled || verifyLoading || !otpSent}
                                className="w-full relative overflow-hidden text-white font-semibold text-[15px] tracking-tight rounded-[14px] py-3.5 flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
                                style={{
                                    background: otpFilled && otpSent ? C.primary : C.surface3,
                                    fontFamily: "Syne, sans-serif",
                                    boxShadow: otpFilled && otpSent ? "0 8px 24px rgba(232,52,42,0.3)" : "none",
                                }}
                                onMouseEnter={e => { if (otpFilled && otpSent) e.currentTarget.style.background = C.primaryDark; }}
                                onMouseLeave={e => { if (otpFilled && otpSent) e.currentTarget.style.background = C.primary; }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent pointer-events-none" />
                                {verifyLoading ? <Spinner /> : (
                                    <>
                                        <span className="relative">Verify & Create Account</span>
                                        <Arrow size={15} />
                                    </>
                                )}
                            </button>

                            {/* Back */}
                            <button
                                onClick={() => { setStep(1); setOtpSent(false); setOtp(["", "", "", "", "", ""]); }}
                                className="flex items-center justify-center gap-1.5 text-[13px] transition-opacity hover:opacity-70"
                                style={{ color: C.text3 }}
                            >
                                <ChevronLeft size={14} />
                                Change card ID
                            </button>
                        </div>
                    )}

                    {/* ══ STEP 3 — Success ══════════════════════════════════════ */}
                    {step === 3 && (
                        <div
                            className="rounded-[24px] p-6 flex flex-col items-center gap-5 text-center relative overflow-hidden"
                            style={{
                                background: C.surface,
                                border: `1px solid ${C.border}`,
                                boxShadow: `0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 ${C.border2}`,
                            }}
                        >
                            <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none rounded-t-[24px]"
                                style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)" }} />

                            {/* Success ring */}
                            <div className="relative flex items-center justify-center mt-2">
                                <div
                                    className="absolute w-20 h-20 rounded-full"
                                    style={{ background: C.successBg, animation: "pulseRing 2s ease-in-out infinite" }}
                                />
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center relative z-10"
                                    style={{ background: `rgba(22,163,74,0.15)`, border: `2px solid ${C.success}` }}
                                >
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                                        stroke={C.success} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <h1 className="text-[22px] font-bold tracking-tight"
                                    style={{ fontFamily: "Syne, sans-serif", color: C.text }}>
                                    You're all set!
                                </h1>
                                <p className="text-[13.5px] leading-relaxed max-w-[260px]" style={{ color: C.text3 }}>
                                    Your account is created and card <strong style={{ color: C.text }}>{cardId}</strong> is now linked.
                                </p>
                            </div>

                            {/* Info chips */}
                            <div className="flex flex-col gap-2 w-full">
                                {[
                                    { emoji: "🔔", text: "You'll get alerts when card is scanned" },
                                    { emoji: "🔒", text: "You can block/unblock the card anytime" },
                                    { emoji: "📋", text: "Complete your child's profile next" },
                                ].map(({ emoji, text }) => (
                                    <div key={text}
                                        className="flex items-center gap-3 rounded-[12px] px-4 py-3 text-left"
                                        style={{ background: C.surface2, border: `1px solid ${C.border}` }}
                                    >
                                        <span className="text-[16px]">{emoji}</span>
                                        <span className="text-[12.5px]" style={{ color: C.text2 }}>{text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Go to dashboard */}
                            <a
                                href="/dashboard"
                                className="w-full relative overflow-hidden text-white font-semibold text-[15px] tracking-tight rounded-[14px] py-3.5 flex items-center justify-center gap-2.5 transition-all duration-200"
                                style={{
                                    background: C.primary,
                                    fontFamily: "Syne, sans-serif",
                                    boxShadow: "0 8px 24px rgba(232,52,42,0.3)",
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = C.primaryDark}
                                onMouseLeave={e => e.currentTarget.style.background = C.primary}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent pointer-events-none" />
                                <span className="relative">Go to Dashboard</span>
                                <Arrow size={15} />
                            </a>
                        </div>
                    )}

                    {/* Bottom trust line */}
                    {step !== 3 && (
                        <div className="flex items-center justify-center gap-2 mt-5">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                                stroke={C.text3} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            <p className="text-[11.5px]" style={{ color: C.text3 }}>
                                Your data is encrypted and never shared
                            </p>
                        </div>
                    )}
                </div>
            </main>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
                body { font-family: 'DM Sans', sans-serif; }
                @keyframes spinCW    { to { transform: rotate(360deg); } }
                @keyframes pulseRing { 0%,100% { transform:scale(1); opacity:.6; } 50% { transform:scale(1.15); opacity:.2; } }
                input::placeholder   { color: ${C.text3}; }
                input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button { -webkit-appearance: none; }
            `}</style>
        </div>
    );
}