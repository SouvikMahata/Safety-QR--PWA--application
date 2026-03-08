import { useState, useRef, useEffect } from "react";

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --primary: #e8342a;
  --primary-dark: #c0271e;
  --primary-bg: rgba(232,52,42,0.08);
  --primary-glow: rgba(232,52,42,0.12);
  --primary-border: rgba(232,52,42,0.28);
  --bg: #0c0c0e;
  --surface: #111115;
  --surface2: #18181e;
  --surface3: #1f1f27;
  --border: rgba(255,255,255,0.07);
  --border2: rgba(255,255,255,0.12);
  --text: #f5f5f7;
  --text2: rgba(255,255,255,0.65);
  --text3: rgba(255,255,255,0.38);
  --success: #16a34a;
  --success-bg: rgba(22,163,74,0.1);
  --success-border: rgba(22,163,74,0.25);
  --warning: #f59e0b;
  --info: #3b82f6;
  --radius: 16px;
  --radius-lg: 24px;
  --radius-xl: 32px;
}

html, body, #root { height: 100%; background: var(--bg); }

body {
  font-family: 'DM Sans', sans-serif;
  color: var(--text);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

/* ── PAGE SHELL ── */
.pe-root {
  min-height: 100vh;
  background: var(--bg);
  position: relative;
}

.pe-noise {
  position: fixed; inset: 0; pointer-events: none; z-index: 0;
  opacity: 0.028;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 128px;
}

.pe-ambient {
  position: fixed; top: -280px; left: 50%; transform: translateX(-50%);
  width: 800px; height: 500px;
  background: radial-gradient(ellipse, rgba(232,52,42,0.055) 0%, transparent 70%);
  pointer-events: none; z-index: 0;
}

/* ── TOP BAR ── */
.pe-topbar {
  position: sticky; top: 0; z-index: 50;
  height: 60px;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 20px;
  background: rgba(12,12,14,0.85);
  backdrop-filter: blur(20px) saturate(1.4);
  border-bottom: 1px solid var(--border);
}

.pe-back {
  display: flex; align-items: center; gap: 8px;
  font-size: 14px; font-weight: 500; color: var(--text2);
  background: none; border: none; cursor: pointer;
  padding: 8px 12px; border-radius: 10px;
  transition: all 0.2s;
}
.pe-back:hover { background: var(--surface2); color: var(--text); }

.pe-topbar-title {
  font-family: 'Syne', sans-serif;
  font-size: 15px; font-weight: 700;
  color: var(--text);
  position: absolute; left: 50%; transform: translateX(-50%);
}

.pe-save-btn {
  font-family: 'DM Sans', sans-serif;
  font-size: 14px; font-weight: 600;
  color: #fff;
  background: var(--primary);
  border: none; cursor: pointer;
  padding: 8px 20px; border-radius: 10px;
  transition: all 0.2s;
  display: flex; align-items: center; gap: 6px;
  box-shadow: 0 4px 16px rgba(232,52,42,0.25);
}
.pe-save-btn:hover:not(:disabled) {
  background: var(--primary-dark);
  box-shadow: 0 6px 24px rgba(232,52,42,0.4);
  transform: translateY(-1px);
}
.pe-save-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

/* ── LAYOUT ── */
.pe-layout {
  position: relative; z-index: 1;
  max-width: 680px; margin: 0 auto;
  padding: 32px 20px 100px;
  display: flex; flex-direction: column; gap: 12px;
}

/* ── AVATAR SECTION ── */
.pe-avatar-section {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 32px 28px;
  display: flex; align-items: center; gap: 24px;
  position: relative; overflow: hidden;
  animation: fadeUp 0.5s ease both;
}

.pe-avatar-section::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, var(--primary-border), transparent);
}

.pe-avatar-ring {
  position: relative; flex-shrink: 0;
}

.pe-avatar {
  width: 80px; height: 80px;
  border-radius: 22px;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  display: flex; align-items: center; justify-content: center;
  font-family: 'Syne', sans-serif;
  font-size: 28px; font-weight: 800;
  color: #fff;
  border: 2px solid var(--primary-border);
  position: relative; overflow: hidden;
  cursor: pointer;
  transition: all 0.25s;
}
.pe-avatar:hover { transform: scale(1.04); }
.pe-avatar img { width: 100%; height: 100%; object-fit: cover; border-radius: inherit; }

.pe-avatar-overlay {
  position: absolute; inset: 0;
  background: rgba(0,0,0,0.55);
  display: flex; align-items: center; justify-content: center;
  border-radius: inherit;
  opacity: 0; transition: opacity 0.2s;
}
.pe-avatar:hover .pe-avatar-overlay { opacity: 1; }

.pe-avatar-status {
  position: absolute; bottom: -4px; right: -4px;
  width: 18px; height: 18px;
  background: var(--success);
  border: 2px solid var(--bg);
  border-radius: 50%;
}

.pe-avatar-info { flex: 1; }

.pe-avatar-name {
  font-family: 'Syne', sans-serif;
  font-size: 20px; font-weight: 800;
  color: var(--text);
  letter-spacing: -0.02em;
  margin-bottom: 4px;
}

.pe-avatar-phone {
  font-size: 13px; color: var(--text3);
  display: flex; align-items: center; gap: 6px;
  margin-bottom: 12px;
}

.pe-verified-badge {
  display: inline-flex; align-items: center; gap: 4px;
  background: var(--success-bg);
  border: 1px solid var(--success-border);
  color: #4ade80;
  padding: 3px 9px; border-radius: 100px;
  font-size: 10px; font-weight: 700;
  letter-spacing: 0.05em; text-transform: uppercase;
}

.pe-upload-btn {
  display: inline-flex; align-items: center; gap: 6px;
  background: var(--surface2);
  border: 1px solid var(--border2);
  color: var(--text2);
  padding: 7px 14px; border-radius: 10px;
  font-size: 12px; font-weight: 600;
  cursor: pointer; transition: all 0.2s;
  font-family: 'DM Sans', sans-serif;
}
.pe-upload-btn:hover { border-color: var(--primary-border); color: var(--text); background: var(--primary-bg); }

/* ── SECTION CARD ── */
.pe-section {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  animation: fadeUp 0.5s ease both;
}

.pe-section-head {
  padding: 20px 24px 16px;
  border-bottom: 1px solid var(--border);
  display: flex; align-items: center; gap: 12px;
}

.pe-section-icon {
  width: 34px; height: 34px;
  border-radius: 10px;
  background: var(--primary-bg);
  border: 1px solid var(--primary-border);
  display: flex; align-items: center; justify-content: center;
  font-size: 15px; flex-shrink: 0;
}

.pe-section-label {
  font-family: 'Syne', sans-serif;
  font-size: 14px; font-weight: 700;
  color: var(--text);
  letter-spacing: -0.01em;
}

.pe-section-sub {
  font-size: 11px; color: var(--text3);
  margin-top: 1px;
}

.pe-section-body { padding: 20px 24px 24px; }

/* ── FIELD GROUPS ── */
.pe-field-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
@media (max-width: 520px) { .pe-field-row { grid-template-columns: 1fr; } }

.pe-field { display: flex; flex-direction: column; gap: 6px; }
.pe-field + .pe-field { margin-top: 0; }

/* spacing between field groups */
.pe-fields-stack { display: flex; flex-direction: column; gap: 14px; }

.pe-label {
  font-size: 11px; font-weight: 700;
  color: var(--text3);
  text-transform: uppercase;
  letter-spacing: 0.07em;
  display: flex; align-items: center; gap: 6px;
}

.pe-label-required::after {
  content: '*';
  color: var(--primary);
  font-size: 13px; line-height: 1;
}

/* ── INPUT ── */
.pe-input-wrap {
  position: relative;
}

.pe-input {
  width: 100%;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px 16px;
  font-family: 'DM Sans', sans-serif;
  font-size: 15px; font-weight: 400;
  color: var(--text);
  outline: none;
  transition: all 0.2s;
  -webkit-appearance: none;
}

.pe-input::placeholder { color: var(--text3); }

.pe-input:focus {
  border-color: var(--primary-border);
  background: var(--surface3);
  box-shadow: 0 0 0 3px var(--primary-glow);
}

.pe-input:disabled {
  opacity: 0.45; cursor: not-allowed;
}

.pe-input.has-icon { padding-left: 42px; }
.pe-input.error { border-color: rgba(232,52,42,0.5); }

.pe-input-icon {
  position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
  color: var(--text3); font-size: 15px; pointer-events: none;
}

.pe-input-suffix {
  position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
  color: var(--text3); font-size: 12px; font-weight: 600;
  pointer-events: none;
  text-transform: uppercase; letter-spacing: 0.05em;
}

.pe-error-msg {
  font-size: 11px; color: var(--primary);
  display: flex; align-items: center; gap: 4px;
  margin-top: 2px;
}

.pe-hint {
  font-size: 11px; color: var(--text3);
  margin-top: 2px; line-height: 1.4;
}

/* ── SELECT ── */
.pe-select {
  width: 100%;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px 40px 12px 16px;
  font-family: 'DM Sans', sans-serif;
  font-size: 15px; font-weight: 400;
  color: var(--text);
  outline: none;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  transition: all 0.2s;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='rgba(255,255,255,0.3)' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
}
.pe-select:focus {
  border-color: var(--primary-border);
  background-color: var(--surface3);
  box-shadow: 0 0 0 3px var(--primary-glow);
}
.pe-select option { background: #1f1f27; }

/* ── PHONE FIELD (special) ── */
.pe-phone-wrap {
  display: flex; align-items: stretch; gap: 0;
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.2s;
  background: var(--surface2);
}
.pe-phone-wrap:focus-within {
  border-color: var(--primary-border);
  background: var(--surface3);
  box-shadow: 0 0 0 3px var(--primary-glow);
}

.pe-phone-prefix {
  display: flex; align-items: center;
  padding: 0 14px;
  font-size: 14px; font-weight: 600;
  color: var(--text2);
  border-right: 1px solid var(--border);
  background: var(--surface3);
  white-space: nowrap;
  gap: 6px;
  flex-shrink: 0;
}

.pe-phone-input {
  flex: 1;
  background: none; border: none; outline: none;
  padding: 12px 14px;
  font-family: 'DM Sans', sans-serif;
  font-size: 15px; font-weight: 400;
  color: var(--text);
  -webkit-appearance: none;
}
.pe-phone-input::placeholder { color: var(--text3); }
.pe-phone-locked {
  display: flex; align-items: center;
  padding-right: 14px;
  flex-shrink: 0;
}

/* ── TOGGLE ROWS ── */
.pe-toggle-row {
  display: flex; align-items: center; justify-content: space-between;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid var(--border);
}
.pe-toggle-row:last-child { border-bottom: none; padding-bottom: 0; }
.pe-toggle-row:first-child { padding-top: 0; }

.pe-toggle-info { flex: 1; }
.pe-toggle-title {
  font-size: 14px; font-weight: 600;
  color: var(--text); margin-bottom: 2px;
}
.pe-toggle-desc { font-size: 12px; color: var(--text3); line-height: 1.4; }

.pe-toggle {
  position: relative;
  width: 44px; height: 24px; flex-shrink: 0;
}
.pe-toggle input { opacity: 0; width: 0; height: 0; position: absolute; }
.pe-toggle-track {
  position: absolute; inset: 0;
  background: var(--surface3);
  border: 1px solid var(--border2);
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.25s;
}
.pe-toggle input:checked ~ .pe-toggle-track {
  background: var(--primary);
  border-color: var(--primary);
  box-shadow: 0 0 12px rgba(232,52,42,0.35);
}
.pe-toggle-thumb {
  position: absolute;
  top: 3px; left: 3px;
  width: 16px; height: 16px;
  background: rgba(255,255,255,0.4);
  border-radius: 50%;
  transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
  pointer-events: none;
}
.pe-toggle input:checked ~ .pe-toggle-track .pe-toggle-thumb {
  transform: translateX(20px);
  background: #fff;
}

/* ── SECURITY SECTION ── */
.pe-security-item {
  display: flex; align-items: center; gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid var(--border);
  cursor: pointer;
  transition: opacity 0.2s;
}
.pe-security-item:hover { opacity: 0.8; }
.pe-security-item:last-child { border-bottom: none; padding-bottom: 0; }
.pe-security-item:first-child { padding-top: 0; }

.pe-security-icon {
  width: 38px; height: 38px;
  border-radius: 11px;
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; flex-shrink: 0;
}

.pe-security-info { flex: 1; }
.pe-security-title {
  font-size: 14px; font-weight: 600;
  color: var(--text); margin-bottom: 2px;
}
.pe-security-desc { font-size: 11px; color: var(--text3); }

.pe-security-arrow {
  color: var(--text3); font-size: 16px;
}

/* ── DANGER ZONE ── */
.pe-danger-zone {
  background: rgba(232,52,42,0.04);
  border: 1px solid rgba(232,52,42,0.15);
  border-radius: var(--radius-lg);
  padding: 20px 24px;
  animation: fadeUp 0.5s ease both;
}

.pe-danger-title {
  font-family: 'Syne', sans-serif;
  font-size: 12px; font-weight: 700;
  color: rgba(232,52,42,0.7);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 14px;
  display: flex; align-items: center; gap: 8px;
}

.pe-danger-btn {
  width: 100%;
  background: none;
  border: 1px solid rgba(232,52,42,0.2);
  color: rgba(232,52,42,0.7);
  padding: 12px 16px;
  border-radius: 12px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px; font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 8px;
  text-align: left;
}
.pe-danger-btn:last-child { margin-bottom: 0; }
.pe-danger-btn:hover {
  background: rgba(232,52,42,0.08);
  border-color: rgba(232,52,42,0.4);
  color: var(--primary);
}

/* ── TOAST ── */
.pe-toast {
  position: fixed;
  bottom: 100px; left: 50%; transform: translateX(-50%) translateY(20px);
  background: var(--surface2);
  border: 1px solid var(--border2);
  border-radius: 100px;
  padding: 12px 20px;
  display: flex; align-items: center; gap: 10px;
  font-size: 14px; font-weight: 500; color: var(--text);
  box-shadow: 0 8px 32px rgba(0,0,0,0.5);
  z-index: 200;
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
  white-space: nowrap;
}
.pe-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
.pe-toast.success { border-color: var(--success-border); }
.pe-toast.error { border-color: var(--primary-border); }

/* ── BOTTOM NAV ── */
.pe-bottomnav {
  position: fixed; bottom: 0; left: 0; right: 0;
  height: 72px;
  background: rgba(17,17,21,0.92);
  backdrop-filter: blur(20px);
  border-top: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-around;
  padding-bottom: 8px;
  z-index: 50;
}

.pe-nav-item {
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  cursor: pointer; padding: 6px 16px; border-radius: 12px;
  transition: all 0.2s; text-decoration: none;
}
.pe-nav-item.active { background: var(--primary-bg); }

.pe-nav-label {
  font-size: 10px; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.05em;
}

/* ── UNSAVED BANNER ── */
.pe-unsaved {
  position: fixed; top: 60px; left: 0; right: 0;
  z-index: 40;
  background: rgba(232,52,42,0.08);
  border-bottom: 1px solid var(--primary-border);
  padding: 10px 20px;
  display: flex; align-items: center; justify-content: space-between;
  font-size: 13px; color: var(--text2);
  transform: translateY(-100%);
  transition: transform 0.3s ease;
}
.pe-unsaved.show { transform: translateY(0); }
.pe-unsaved-dot {
  width: 6px; height: 6px;
  background: var(--primary); border-radius: 50%;
  margin-right: 8px;
  animation: pulse-dot 1.5s ease infinite;
}
@keyframes pulse-dot {
  0%,100%{opacity:1;transform:scale(1);}
  50%{opacity:.5;transform:scale(.7);}
}

/* ── SPINNER ── */
.pe-spinner {
  width: 14px; height: 14px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── ANIMATIONS ── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}

.pe-section:nth-child(1) { animation-delay: 0.05s; }
.pe-section:nth-child(2) { animation-delay: 0.1s; }
.pe-section:nth-child(3) { animation-delay: 0.15s; }
.pe-section:nth-child(4) { animation-delay: 0.2s; }
.pe-section:nth-child(5) { animation-delay: 0.25s; }
.pe-avatar-section       { animation-delay: 0s; }
.pe-danger-zone          { animation-delay: 0.3s; }
`;

/* ─────────────────────────────────────────────
   SMALL COMPONENTS
───────────────────────────────────────────── */
const Toggle = ({ checked, onChange }) => (
  <label className="pe-toggle">
    <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
    <div className="pe-toggle-track">
      <div className="pe-toggle-thumb" />
    </div>
  </label>
);

const Field = ({ label, required, hint, error, children }) => (
  <div className="pe-field">
    <div className={`pe-label ${required ? 'pe-label-required' : ''}`}>{label}</div>
    {children}
    {error && <div className="pe-error-msg">⚠ {error}</div>}
    {hint && !error && <div className="pe-hint">{hint}</div>}
  </div>
);

const Input = ({ icon, suffix, error, ...props }) => (
  <div className="pe-input-wrap">
    {icon && <span className="pe-input-icon">{icon}</span>}
    <input
      className={`pe-input ${icon ? 'has-icon' : ''} ${error ? 'error' : ''}`}
      {...props}
    />
    {suffix && <span className="pe-input-suffix">{suffix}</span>}
  </div>
);

const SectionCard = ({ icon, label, sub, children, delay }) => (
  <div className="pe-section" style={{ animationDelay: delay }}>
    <div className="pe-section-head">
      <div className="pe-section-icon">{icon}</div>
      <div>
        <div className="pe-section-label">{label}</div>
        {sub && <div className="pe-section-sub">{sub}</div>}
      </div>
    </div>
    <div className="pe-section-body">{children}</div>
  </div>
);

const navItems = [
  { icon: (active) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#e8342a' : 'rgba(255,255,255,0.35)'} strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ), label: 'Home', active: false },
  { icon: (active) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#e8342a' : 'rgba(255,255,255,0.35)'} strokeWidth="2">
      <rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20"/>
    </svg>
  ), label: 'Cards', active: false },
  { icon: (active) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#e8342a' : 'rgba(255,255,255,0.35)'} strokeWidth="2">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
    </svg>
  ), label: 'Students', active: false },
  { icon: (active) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#e8342a' : '#e8342a'} strokeWidth="2">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ), label: 'Profile', active: true },
];

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function ProfileEditPage() {
  const fileInputRef = useRef(null);

  // Form state — maps to ParentUser schema
  const [form, setForm] = useState({
    firstName: 'Priya',
    lastName: 'Sharma',
    email: 'priya.sharma@gmail.com',
    phone: '9876543210',
    language: 'en',
    theme: 'dark',
    notifyScan: true,
    notifyAnomaly: true,
    notifyExpiry: true,
    notifyEvery: false,
    biometric: true,
    pinEnabled: true,
  });

  const [original] = useState({ ...form });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isDirty, setIsDirty] = useState(false);

  const set = (key, val) => {
    setForm(p => ({ ...p, [key]: val }));
    setIsDirty(true);
    if (errors[key]) setErrors(p => ({ ...p, [key]: null }));
  };

  const showToast = (msg, type = 'success') => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast(p => ({ ...p, show: false })), 3000);
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = 'First name is required';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address';
    if (!form.phone.trim() || form.phone.length < 10) e.phone = 'Enter a valid 10-digit number';
    return e;
  };

  const handleSave = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      showToast('Please fix the highlighted fields', 'error');
      return;
    }
    setSaving(true);
    await new Promise(r => setTimeout(r, 1400));
    setSaving(false);
    setIsDirty(false);
    showToast('Profile updated successfully ✓', 'success');
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setPhotoPreview(ev.target.result);
    reader.readAsDataURL(file);
    setIsDirty(true);
  };

  const initials = `${form.firstName?.[0] ?? ''}${form.lastName?.[0] ?? ''}`.toUpperCase();

  return (
    <>
      <style>{css}</style>
      <div className="pe-root">
        <div className="pe-noise" />
        <div className="pe-ambient" />

        {/* Unsaved changes banner */}
        <div className={`pe-unsaved ${isDirty ? 'show' : ''}`}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="pe-unsaved-dot" />
            Unsaved changes
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              background: 'var(--primary)', border: 'none', color: '#fff',
              padding: '6px 14px', borderRadius: 8,
              fontSize: 12, fontWeight: 600, cursor: 'pointer',
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            {saving ? 'Saving…' : 'Save now'}
          </button>
        </div>

        {/* Top bar */}
        <header className="pe-topbar">
          <button className="pe-back">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Back
          </button>
          <span className="pe-topbar-title">Edit Profile</span>
          <button className="pe-save-btn" onClick={handleSave} disabled={saving}>
            {saving ? <div className="pe-spinner" /> : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            )}
            {saving ? 'Saving' : 'Save'}
          </button>
        </header>

        {/* Page body */}
        <div className="pe-layout">

          {/* ── Avatar ── */}
          <div className="pe-avatar-section">
            <div className="pe-avatar-ring">
              <div className="pe-avatar" onClick={() => fileInputRef.current?.click()}>
                {photoPreview
                  ? <img src={photoPreview} alt="avatar" />
                  : initials}
                <div className="pe-avatar-overlay">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
                    <circle cx="12" cy="13" r="4"/>
                  </svg>
                </div>
              </div>
              <div className="pe-avatar-status" />
            </div>
            <div className="pe-avatar-info">
              <div className="pe-avatar-name">
                {form.firstName} {form.lastName}
              </div>
              <div className="pe-avatar-phone">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14z"/>
                </svg>
                +91 {form.phone}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <div className="pe-verified-badge">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="#4ade80">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Verified
                </div>
                <button className="pe-upload-btn" onClick={() => fileInputRef.current?.click()}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                    <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                  Change Photo
                </button>
              </div>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" hidden onChange={handlePhotoChange} />
          </div>

          {/* ── Personal Info ── */}
          <SectionCard icon="👤" label="Personal Information" sub="Your basic profile details" delay="0.05s">
            <div className="pe-fields-stack">
              <div className="pe-field-row">
                <Field label="First Name" required error={errors.firstName}>
                  <Input
                    placeholder="First name"
                    value={form.firstName}
                    onChange={e => set('firstName', e.target.value)}
                    error={!!errors.firstName}
                  />
                </Field>
                <Field label="Last Name">
                  <Input
                    placeholder="Last name"
                    value={form.lastName}
                    onChange={e => set('lastName', e.target.value)}
                  />
                </Field>
              </div>

              <Field label="Email Address" hint="Used for billing and important account alerts">
                <Input
                  icon="✉"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                  error={!!errors.email}
                />
                {errors.email && <div className="pe-error-msg">⚠ {errors.email}</div>}
              </Field>

              <Field label="Mobile Number" required hint="Verified number — used for OTP login. Contact support to change." error={errors.phone}>
                <div className="pe-phone-wrap">
                  <div className="pe-phone-prefix">
                    <span>🇮🇳</span>
                    <span>+91</span>
                  </div>
                  <input
                    className="pe-phone-input"
                    type="tel"
                    placeholder="10-digit number"
                    value={form.phone}
                    maxLength={10}
                    onChange={e => set('phone', e.target.value.replace(/\D/g, ''))}
                  />
                  <div className="pe-phone-locked">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                    </svg>
                  </div>
                </div>
              </Field>
            </div>
          </SectionCard>

          {/* ── App Preferences ── */}
          <SectionCard icon="🎨" label="App Preferences" sub="Language and display settings" delay="0.1s">
            <div className="pe-fields-stack">
              <div className="pe-field-row">
                <Field label="Language">
                  <select
                    className="pe-select"
                    value={form.language}
                    onChange={e => set('language', e.target.value)}
                  >
                    <option value="en">🇬🇧 English</option>
                    <option value="hi">🇮🇳 हिंदी (Hindi)</option>
                    <option value="bn">🇧🇩 বাংলা (Bengali)</option>
                    <option value="ta">தமிழ் (Tamil)</option>
                    <option value="te">తెలుగు (Telugu)</option>
                    <option value="mr">मराठी (Marathi)</option>
                    <option value="gu">ગુજરાતી (Gujarati)</option>
                    <option value="kn">ಕನ್ನಡ (Kannada)</option>
                  </select>
                </Field>
                <Field label="Theme">
                  <select
                    className="pe-select"
                    value={form.theme}
                    onChange={e => set('theme', e.target.value)}
                  >
                    <option value="dark">🌑 Dark</option>
                    <option value="light">☀️ Light</option>
                    <option value="system">⚙️ System Default</option>
                  </select>
                </Field>
              </div>
            </div>
          </SectionCard>

          {/* ── Notifications ── */}
          <SectionCard icon="🔔" label="Notifications" sub="Control when we reach out to you" delay="0.15s">
            <div>
              {[
                {
                  key: 'notifyScan',
                  title: 'Scan Alerts',
                  desc: 'Notify me when my child\'s card is scanned at school',
                },
                {
                  key: 'notifyAnomaly',
                  title: 'Anomaly Warnings',
                  desc: 'Alert me when an unusual scan location or device is detected',
                },
                {
                  key: 'notifyExpiry',
                  title: 'Card Expiry Reminders',
                  desc: 'Remind me before a card expires so I can renew in time',
                },
                {
                  key: 'notifyEvery',
                  title: 'Notify on Every Scan',
                  desc: 'Send an alert for each individual scan (may be frequent)',
                },
              ].map(n => (
                <div className="pe-toggle-row" key={n.key}>
                  <div className="pe-toggle-info">
                    <div className="pe-toggle-title">{n.title}</div>
                    <div className="pe-toggle-desc">{n.desc}</div>
                  </div>
                  <Toggle
                    checked={form[n.key]}
                    onChange={v => set(n.key, v)}
                  />
                </div>
              ))}
            </div>
          </SectionCard>

          {/* ── Security ── */}
          <SectionCard icon="🔒" label="Security" sub="Protect your account and app access" delay="0.2s">
            <div>
              {/* Biometric + PIN toggles */}
              <div className="pe-toggle-row">
                <div className="pe-toggle-info">
                  <div className="pe-toggle-title">Biometric Unlock</div>
                  <div className="pe-toggle-desc">Use fingerprint or Face ID to open the app</div>
                </div>
                <Toggle checked={form.biometric} onChange={v => set('biometric', v)} />
              </div>
              <div className="pe-toggle-row">
                <div className="pe-toggle-info">
                  <div className="pe-toggle-title">PIN Lock</div>
                  <div className="pe-toggle-desc">Require a 6-digit PIN when biometric fails or is unavailable</div>
                </div>
                <Toggle checked={form.pinEnabled} onChange={v => set('pinEnabled', v)} />
              </div>

              {/* Action items */}
              {[
                {
                  icon: '🔑', bg: 'rgba(59,130,246,0.1)',
                  title: 'Change PIN',
                  desc: 'Update your 6-digit security PIN',
                },
                {
                  icon: '📱', bg: 'rgba(22,163,74,0.1)',
                  title: 'Trusted Devices',
                  desc: 'Manage devices that have access to your account',
                },
                {
                  icon: '🕒', bg: 'rgba(245,158,11,0.1)',
                  title: 'Active Sessions',
                  desc: 'View and revoke active login sessions',
                },
              ].map(item => (
                <div className="pe-security-item" key={item.title}>
                  <div className="pe-security-icon" style={{ background: item.bg }}>{item.icon}</div>
                  <div className="pe-security-info">
                    <div className="pe-security-title">{item.title}</div>
                    <div className="pe-security-desc">{item.desc}</div>
                  </div>
                  <div className="pe-security-arrow">›</div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* ── Account Info (read-only) ── */}
          <SectionCard icon="ℹ️" label="Account Info" sub="Your account metadata" delay="0.25s">
            <div className="pe-fields-stack">
              <div className="pe-field-row">
                <Field label="Account Status">
                  <div style={{
                    background: 'var(--success-bg)', border: '1px solid var(--success-border)',
                    borderRadius: 12, padding: '11px 16px',
                    display: 'flex', alignItems: 'center', gap: 8,
                    fontSize: 14, color: '#4ade80', fontWeight: 500,
                  }}>
                    <div style={{ width: 7, height: 7, background: '#4ade80', borderRadius: '50%' }} />
                    Active
                  </div>
                </Field>
                <Field label="Member Since">
                  <div style={{
                    background: 'var(--surface2)', border: '1px solid var(--border)',
                    borderRadius: 12, padding: '11px 16px',
                    fontSize: 14, color: 'var(--text2)',
                  }}>
                    Jan 2024
                  </div>
                </Field>
              </div>
              <Field label="Last Login">
                <div style={{
                  background: 'var(--surface2)', border: '1px solid var(--border)',
                  borderRadius: 12, padding: '11px 16px',
                  fontSize: 14, color: 'var(--text2)',
                  display: 'flex', alignItems: 'center', gap: 8,
                }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  Today, 8:42 AM · Android · Chrome
                </div>
              </Field>
            </div>
          </SectionCard>

          {/* ── Danger Zone ── */}
          <div className="pe-danger-zone">
            <div className="pe-danger-title">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              Danger Zone
            </div>
            <button className="pe-danger-btn" onClick={() => showToast('Logged out of all devices', 'error')}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Log Out of All Devices
            </button>
            <button className="pe-danger-btn" onClick={() => showToast('Account deletion request submitted', 'error')}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
              </svg>
              Delete Account
            </button>
          </div>

        </div>{/* end layout */}

        {/* Bottom nav */}
        <nav className="pe-bottomnav">
          {navItems.map(n => (
            <div key={n.label} className={`pe-nav-item ${n.active ? 'active' : ''}`}>
              {n.icon(n.active)}
              <span className="pe-nav-label" style={{ color: n.active ? '#e8342a' : 'rgba(255,255,255,0.35)' }}>
                {n.label}
              </span>
            </div>
          ))}
        </nav>

        {/* Toast */}
        <div className={`pe-toast ${toast.show ? 'show' : ''} ${toast.type}`}>
          {toast.type === 'success'
            ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e8342a" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          }
          {toast.msg}
        </div>

      </div>
    </>
  );
}