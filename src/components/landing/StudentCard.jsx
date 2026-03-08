import { C } from "../../utils/constants";

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
const QRPattern = () => (
    <svg width="80" height="80" viewBox="0 0 100 100">
        <rect x="4" y="4" width="28" height="28" rx="3" fill={C.surface} />
        <rect x="9" y="9" width="18" height="18" rx="1" fill="#fff" />
        <rect x="13" y="13" width="10" height="10" rx="1" fill={C.surface} />
        <rect x="68" y="4" width="28" height="28" rx="3" fill={C.surface} />
        <rect x="73" y="9" width="18" height="18" rx="1" fill="#fff" />
        <rect x="77" y="13" width="10" height="10" rx="1" fill={C.surface} />
        <rect x="4" y="68" width="28" height="28" rx="3" fill={C.surface} />
        <rect x="9" y="73" width="18" height="18" rx="1" fill="#fff" />
        <rect x="13" y="77" width="10" height="10" rx="1" fill={C.surface} />
        {[38, 42, 46, 50, 54, 58, 62, 66].map(x =>
            [38, 42, 46, 50, 54, 58, 62, 66].map(y =>
                (x + y) % 8 < 5
                    ? <rect key={`${x}-${y}`} x={x} y={y} width="3" height="3" rx=".5" fill={C.surface} />
                    : null
            )
        )}
        <rect x="43" y="43" width="14" height="14" rx="3" fill={C.primary} />
    </svg>
);

// ─── Student card ────────────────────────────────────────────────────────────
export function StudentCard() {
    return (
        <div className="relative flex items-center justify-center w-[220px] h-[300px]">

            {/* Glow blob */}
            <div
                className="absolute w-[180px] h-[180px] rounded-full blur-[40px] pointer-events-none"
                style={{ background: `radial-gradient(circle, ${C.primaryGlow} 0%, transparent 70%)` }}
            />

            {/* Rotating ring */}
            <div
                className="absolute w-[270px] h-[270px] rounded-full pointer-events-none"
                style={{
                    border: `1px solid ${C.primaryBorder}`,
                    borderTopColor: C.primary,
                    animation: "spinCW 22s linear infinite",
                    opacity: 0.4,
                }}
            />

            {/* Card */}
            <div
                className="relative w-[200px] rounded-[20px] p-[18px] flex flex-col gap-3 overflow-hidden"
                style={{
                    background: `linear-gradient(145deg, ${C.surface2} 0%, ${C.surface} 100%)`,
                    border: `1px solid ${C.border}`,
                    boxShadow: `0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px ${C.border}, inset 0 1px 0 ${C.border2}`,
                }}
            >
                {/* Card inner shine */}
                <div
                    className="absolute top-0 left-0 right-0 h-1/2 rounded-t-[20px] pointer-events-none"
                    style={{ background: "linear-gradient(180deg,rgba(255,255,255,0.04) 0%,transparent 100%)" }}
                />

                {/* Top bar */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div
                            className="w-[26px] h-[26px] rounded-[7px] flex items-center justify-center"
                            style={{ background: C.primary }}
                        >
                            <Shield size={12} color="#fff" />
                        </div>
                        <div>
                            <p className="text-[8px] uppercase tracking-[0.12em]" style={{ color: C.text3 }}>SafeCard</p>
                            <p className="text-[11px] font-bold leading-none" style={{ color: C.text, fontFamily: "Syne, sans-serif" }}>
                                Student ID
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span
                            className="w-[6px] h-[6px] rounded-full"
                            style={{ background: C.success, boxShadow: `0 0 6px ${C.success}`, animation: "blink 2s ease-in-out infinite" }}
                        />
                        <span className="text-[8px] font-semibold tracking-wide" style={{ color: C.success }}>ACTIVE</span>
                    </div>
                </div>

                {/* Student */}
                <div className="flex gap-2.5 items-center">
                    <div
                        className="w-[42px] h-[48px] rounded-[9px] flex items-center justify-center shrink-0"
                        style={{ background: C.surface3, border: `1px solid ${C.border}` }}
                    >
                        <svg width="26" height="30" viewBox="0 0 26 30" fill="none">
                            <circle cx="13" cy="10" r="6" fill={C.primaryBg} stroke={C.primaryBorder} strokeWidth="1" />
                            <path d="M2 28c0-6 4-9 11-9s11 3 11 9" stroke={C.primaryBorder} strokeWidth="1.2" fill={C.primaryBg} />
                        </svg>
                    </div>
                    <div>
                        <p className="text-[12px] font-bold" style={{ color: C.text, fontFamily: "Syne, sans-serif" }}>Aryan Sharma</p>
                        <p className="text-[9px] mt-0.5" style={{ color: C.text3 }}>Class 8 · Section A</p>
                        <span
                            className="inline-block mt-1.5 text-[8px] px-2 py-0.5 rounded tracking-wide"
                            style={{ background: C.primaryBg, border: `1px solid ${C.primaryBorder}`, color: C.primary }}
                        >
                            Delhi Public School
                        </span>
                    </div>
                </div>

                {/* QR */}
                <div className="bg-white rounded-[10px] p-2.5 relative overflow-hidden flex items-center justify-center">
                    <QRPattern />
                    <div
                        className="absolute left-2 right-2 h-[1.5px] pointer-events-none"
                        style={{
                            background: `linear-gradient(90deg, transparent, ${C.primary}, transparent)`,
                            boxShadow: `0 0 8px ${C.primary}`,
                            animation: "scanDown 2.2s ease-in-out infinite",
                        }}
                    />
                </div>

                <p className="text-center text-[7.5px] tracking-[0.12em]" style={{ color: C.text3 }}>
                    #SC-2024-08491 · Valid 2025
                </p>
            </div>

            {/* Floating badge */}
            <div
                className="absolute -top-2 -right-14 rounded-xl p-2 flex items-center gap-2 min-w-[148px]"
                style={{
                    background: C.surface2,
                    border: `1px solid ${C.border}`,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
                    animation: "badgeIn 0.55s 1s cubic-bezier(.22,.68,0,1.2) both",
                }}
            >
                <div
                    className="w-6 h-6 rounded-[7px] flex items-center justify-center shrink-0"
                    style={{ background: C.successBg }}
                >
                    <Check size={10} color={C.success} />
                </div>
                <div>
                    <p className="text-[8px] uppercase tracking-wider" style={{ color: C.text3 }}>Scan detected</p>
                    <p className="text-[10.5px] font-medium" style={{ color: C.text }}>School Gate · Now</p>
                </div>
            </div>
        </div>
    );
}