import { useState, useEffect } from "react";
import { StudentCard } from "../components/landing/StudentCard";
import { C } from "../utils/constants";



// ─── Tiny icons ──────────────────────────────────────────────────────────────
const Shield = ({ size = 15, color = C.text }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
);
const Check = ({ size = 9, color = C.text }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);
const Arrow = ({ size = 15 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={C.text} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
);
const Lock = ({ size = 13 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
        stroke={C.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

// ─── QR svg pattern ──────────────────────────────────────────────────────────

// ─── Main ────────────────────────────────────────────────────────────────────
export default function LandingPage() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);

    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: C.bg, color: C.text }}>

            {/* Ambient glow top-right */}
            <div
                className="pointer-events-none absolute -top-32 -right-20 w-[420px] h-[420px] rounded-full blur-[90px]"
                style={{ background: `radial-gradient(circle, ${C.primaryGlow} 0%, transparent 70%)` }}
            />
            {/* Ambient glow bottom-left */}
            <div
                className="pointer-events-none absolute -bottom-24 -left-16 w-[320px] h-[320px] rounded-full blur-[70px]"
                style={{ background: `radial-gradient(circle, rgba(232,52,42,0.05) 0%, transparent 70%)` }}
            />

            {/* Dot grid */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.035]"
                style={{
                    backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                    maskImage: "radial-gradient(ellipse 80% 80% at 50% 40%, black 0%, transparent 100%)",
                }}
            />

            {/* ── Navbar ──────────────────────────────── */}
            <nav
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 transition-all duration-300"
                style={{
                    paddingTop: scrolled ? 12 : 20,
                    paddingBottom: scrolled ? 12 : 20,
                    background: scrolled ? `${C.bg}e6` : "transparent",
                    backdropFilter: scrolled ? "blur(18px)" : "none",
                    borderBottom: scrolled ? `1px solid ${C.border}` : "none",
                }}
            >
                {/* Logo */}
                <div className="flex items-center gap-2.5">
                    <div
                        className="w-8 h-8 rounded-[9px] flex items-center justify-center"
                        style={{
                            background: C.primary,
                            boxShadow: `0 4px 14px rgba(232,52,42,0.38)`,
                        }}
                    >
                        <Shield size={15} color="#fff" />
                    </div>
                    <span className="font-bold text-[17px] tracking-tight" style={{ fontFamily: "Syne, sans-serif", color: C.text }}>
                        Safe<span style={{ color: C.primary }}>Card</span>
                    </span>
                </div>

                {/* Login link */}
                <a
                    href="#"
                    className="text-sm px-4 py-2 rounded-xl transition-all duration-200"
                    style={{
                        color: C.text2,
                        border: `1px solid ${C.border}`,
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.color = C.text;
                        e.currentTarget.style.borderColor = C.border2;
                        e.currentTarget.style.background = C.surface2;
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.color = C.text2;
                        e.currentTarget.style.borderColor = C.border;
                        e.currentTarget.style.background = "transparent";
                    }}
                >
                    Log in
                </a>
            </nav>

            {/* ── Hero ────────────────────────────────── */}
            <main className="flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-12 relative z-10 text-center">

                {/* Trust pill */}
                <div
                    className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-7"
                    style={{ background: C.primaryBg, border: `1px solid ${C.primaryBorder}` }}
                >
                    <span
                        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: C.primary }}
                    >
                        <Check size={8} color="#fff" />
                    </span>
                    <span className="text-xs font-medium" style={{ color: C.text2 }}>
                        Trusted by <strong style={{ color: C.text }}>12,000+</strong> parents across India
                    </span>
                </div>

                {/* Headline */}
                <h1
                    className="text-[clamp(38px,10vw,62px)] font-extrabold leading-[1.06] tracking-[-2.5px] mb-5"
                    style={{ fontFamily: "Syne, sans-serif", color: C.text }}
                >
                    Your child's safety
                    <br />
                    <span style={{ color: C.primary }}>one scan</span> away.
                </h1>

                {/* Sub */}
                <p className="text-[15px] font-light leading-relaxed max-w-[300px] mb-10" style={{ color: C.text3 }}>
                    Scan the school card. Get real‑time alerts.
                    <br />
                    Know your child is safe — always.
                </p>

                {/* ── CTA block ───────────────────────────── */}
                <div className="w-full max-w-[300px] flex flex-col items-center gap-3.5">

                    {/* Primary button */}
                    <button
                        className="w-full relative overflow-hidden text-white font-semibold text-[15px] tracking-tight rounded-[16px] py-4 flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.98]"
                        style={{
                            background: C.primary,
                            fontFamily: "Syne, sans-serif",
                            boxShadow: `0 8px 28px rgba(232,52,42,0.32)`,
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = C.primaryDark;
                            e.currentTarget.style.boxShadow = `0 12px 36px rgba(232,52,42,0.45)`;
                            e.currentTarget.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = C.primary;
                            e.currentTarget.style.boxShadow = `0 8px 28px rgba(232,52,42,0.32)`;
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.1] to-transparent pointer-events-none" />
                        <Shield size={17} color="#fff" />
                        <span className="relative">Get Started — It's Free</span>
                        <Arrow size={15} />
                    </button>

                    {/* Already have account */}
                    <p className="text-[13px]" style={{ color: C.text3 }}>
                        Already have an account?{" "}
                        <a
                            href="#"
                            className="font-medium underline underline-offset-2 transition-all"
                            style={{ color: C.primary, textDecorationColor: C.primaryBorder }}
                            onMouseEnter={e => e.currentTarget.style.textDecorationColor = C.primary}
                            onMouseLeave={e => e.currentTarget.style.textDecorationColor = C.primaryBorder}
                        >
                            Log in
                        </a>
                    </p>

                    {/* Trust tagline */}
                    <div
                        className="flex items-center gap-2 rounded-[14px] px-4 py-2.5 w-full justify-center"
                        style={{ background: C.surface, border: `1px solid ${C.border}` }}
                    >
                        <Lock size={13} />
                        <p className="text-[11.5px]" style={{ color: C.text3 }}>
                            No ads · No data selling · Zero compromises
                        </p>
                    </div>
                </div>

                {/* ── Card visual ─────────────────────────── */}
                <div className="mt-12">
                    <StudentCard />
                </div>

                {/* Feature pills */}
                <div className="flex flex-wrap justify-center gap-2 mt-9">
                    {[
                        { emoji: "🔔", label: "Instant alerts" },
                        { emoji: "🔒", label: "Block card anytime" },
                        { emoji: "📴", label: "Works offline" },
                    ].map(({ emoji, label }) => (
                        <div
                            key={label}
                            className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5"
                            style={{ background: C.surface2, border: `1px solid ${C.border}` }}
                        >
                            <span className="text-[12px]">{emoji}</span>
                            <span className="text-[12px]" style={{ color: C.text3 }}>{label}</span>
                        </div>
                    ))}
                </div>
            </main>


            {/* Keyframes only for things Tailwind can't do */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        @keyframes spinCW   { to { transform: rotate(360deg); } }
        @keyframes scanDown { 0% { top:8%; opacity:1; } 90% { opacity:.4; } 100% { top:88%; opacity:0; } }
        @keyframes badgeIn  { from { opacity:0; transform:scale(.8) translateY(8px); } to { opacity:1; transform:scale(1) translateY(0); } }
        @keyframes blink    { 0%,100% { opacity:1; } 50% { opacity:.2; } }
        [style*="scanDown"] { position: absolute; }
      `}</style>
        </div>
    );
}