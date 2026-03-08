import { useState } from "react";

/* ─────────────────────────────────────────
   STYLES
───────────────────────────────────────── */
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
  --success-bg: rgba(22,163,74,0.10);
  --success-border: rgba(22,163,74,0.25);
  --warning: #f59e0b;
  --warning-bg: rgba(245,158,11,0.10);
  --info: #3b82f6;
  --info-bg: rgba(59,130,246,0.10);
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

/* ── ROOT ── */
.pp-root {
  min-height: 100vh;
  background: var(--bg);
  position: relative;
  padding-bottom: 90px;
}

.pp-noise {
  position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 128px;
}

/* ── HERO ── */
.pp-hero {
  position: relative; z-index: 1; overflow: hidden;
}

.pp-hero-bg {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(232,52,42,0.065) 0%, transparent 100%);
}

.pp-hero-grid {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: linear-gradient(180deg, transparent, rgba(0,0,0,0.45) 30%, rgba(0,0,0,0.45) 70%, transparent);
}

.pp-hero-inner {
  position: relative; z-index: 2;
  padding: 60px 20px 32px;
  max-width: 680px; margin: 0 auto;
  display: flex; flex-direction: column; align-items: center;
  text-align: center;
}

/* Avatar */
.pp-avatar-wrap {
  position: relative; margin-bottom: 20px;
  animation: fadeDown 0.5s ease both;
}

.pp-avatar-outer {
  width: 96px; height: 96px;
  border-radius: 28px; padding: 3px;
  background: linear-gradient(135deg, var(--primary), rgba(232,52,42,0.25));
  box-shadow: 0 0 48px rgba(232,52,42,0.18), 0 20px 60px rgba(0,0,0,0.55);
}

.pp-avatar {
  width: 100%; height: 100%; border-radius: 26px;
  background: linear-gradient(135deg, #2a1212, #180c0c);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Syne', sans-serif;
  font-size: 32px; font-weight: 800; color: #fff; overflow: hidden;
}
.pp-avatar img { width: 100%; height: 100%; object-fit: cover; border-radius: inherit; }

.pp-avatar-online {
  position: absolute; bottom: 2px; right: 2px;
  width: 20px; height: 20px;
  background: var(--success);
  border: 3px solid var(--bg); border-radius: 50%;
  box-shadow: 0 0 10px rgba(22,163,74,0.55);
}

.pp-name {
  font-family: 'Syne', sans-serif;
  font-size: 26px; font-weight: 800;
  letter-spacing: -0.025em; color: var(--text);
  margin-bottom: 6px;
  animation: fadeDown 0.5s 0.06s ease both;
}

.pp-phone-row {
  display: flex; align-items: center; justify-content: center;
  gap: 8px; margin-bottom: 16px;
  animation: fadeDown 0.5s 0.12s ease both;
}
.pp-phone-text { font-size: 14px; color: var(--text3); }

.pp-verified {
  display: inline-flex; align-items: center; gap: 4px;
  background: var(--success-bg); border: 1px solid var(--success-border);
  color: #4ade80; padding: 3px 9px; border-radius: 100px;
  font-size: 10px; font-weight: 700;
  letter-spacing: 0.05em; text-transform: uppercase;
}

.pp-status-pills {
  display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center;
  margin-bottom: 24px;
  animation: fadeDown 0.5s 0.18s ease both;
}

.pp-pill {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 5px 12px; border-radius: 100px;
  font-size: 11px; font-weight: 600;
  letter-spacing: 0.04em; text-transform: uppercase;
  border: 1px solid;
}

.pp-edit-btn {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--surface2); border: 1px solid var(--border2);
  color: var(--text2); padding: 11px 24px; border-radius: 12px;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px; font-weight: 600;
  cursor: pointer; transition: all 0.22s;
  animation: fadeDown 0.5s 0.24s ease both;
}
.pp-edit-btn:hover {
  background: var(--surface3); border-color: var(--primary-border);
  color: var(--text); transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
}

/* ── STAT RIBBON ── */
.pp-stats {
  display: grid; grid-template-columns: repeat(3,1fr);
  gap: 1px; background: var(--border);
  border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
  position: relative; z-index: 1;
  animation: fadeUp 0.45s 0.28s ease both;
}

.pp-stat {
  background: var(--surface); padding: 18px 10px;
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  transition: background 0.2s; cursor: default;
}
.pp-stat:hover { background: var(--surface2); }

.pp-stat-num {
  font-family: 'Syne', sans-serif;
  font-size: 22px; font-weight: 800;
  color: var(--text); letter-spacing: -0.02em; line-height: 1;
}
.pp-stat-num.accent { color: var(--primary); }

.pp-stat-label {
  font-size: 10px; font-weight: 600; color: var(--text3);
  text-transform: uppercase; letter-spacing: 0.07em; text-align: center;
}

/* ── BODY ── */
.pp-body {
  position: relative; z-index: 1;
  max-width: 680px; margin: 0 auto;
  padding: 16px 16px 0;
  display: flex; flex-direction: column; gap: 10px;
}

/* ── BLOCK ── */
.pp-block {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg); overflow: hidden;
}

.pp-block-head {
  padding: 16px 20px 14px;
  display: flex; align-items: center; justify-content: space-between;
  border-bottom: 1px solid var(--border);
}

.pp-block-left { display: flex; align-items: center; gap: 10px; }

.pp-block-icon {
  width: 32px; height: 32px; border-radius: 9px;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; flex-shrink: 0;
}

.pp-block-title {
  font-family: 'Syne', sans-serif;
  font-size: 13px; font-weight: 700; color: var(--text); letter-spacing: -0.01em;
}

.pp-block-action {
  font-size: 12px; font-weight: 600; color: var(--primary);
  background: none; border: none; cursor: pointer;
  padding: 5px 10px; border-radius: 8px;
  transition: background 0.2s; font-family: 'DM Sans', sans-serif;
}
.pp-block-action:hover { background: var(--primary-bg); }

.pp-block-body { padding: 16px 20px 20px; }

/* ── CHILDREN ── */
.pp-children { display: flex; flex-direction: column; gap: 10px; }

.pp-child-card {
  background: var(--surface2); border: 1px solid var(--border);
  border-radius: 14px; padding: 14px 16px;
  display: flex; align-items: center; gap: 14px;
  cursor: pointer; transition: all 0.2s; position: relative; overflow: hidden;
}
.pp-child-card::before {
  content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
  border-radius: 0 2px 2px 0;
}
.pp-child-card.is-active::before { background: var(--success); }
.pp-child-card.is-inactive::before { background: var(--text3); }
.pp-child-card:hover { border-color: var(--border2); background: var(--surface3); transform: translateX(3px); }

.pp-child-avatar {
  width: 44px; height: 44px; border-radius: 13px;
  display: flex; align-items: center; justify-content: center;
  font-family: 'Syne', sans-serif;
  font-size: 16px; font-weight: 800; color: #fff; flex-shrink: 0;
}

.pp-child-info { flex: 1; min-width: 0; }
.pp-child-name {
  font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700;
  color: var(--text); margin-bottom: 3px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.pp-child-meta { font-size: 11px; color: var(--text3); display: flex; align-items: center; gap: 5px; flex-wrap: wrap; }

.pp-child-dot { color: var(--border2); }

.pp-status-chip {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 3px 9px; border-radius: 100px;
  font-size: 9px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.05em; flex-shrink: 0;
}

.pp-child-arrow { color: var(--text3); font-size: 18px; }

/* ── INFO ROWS ── */
.pp-info-row {
  display: flex; align-items: center; gap: 14px;
  padding: 12px 0; border-bottom: 1px solid var(--border);
}
.pp-info-row:first-child { padding-top: 0; }
.pp-info-row:last-child { border-bottom: none; padding-bottom: 0; }

.pp-info-icon {
  width: 34px; height: 34px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; flex-shrink: 0;
}

.pp-info-key {
  font-size: 10px; font-weight: 700; color: var(--text3);
  text-transform: uppercase; letter-spacing: 0.07em; margin-bottom: 2px;
}
.pp-info-val {
  font-size: 14px; font-weight: 500; color: var(--text2);
  display: flex; align-items: center; gap: 7px; flex-wrap: wrap;
}

/* ── NOTIF ROWS ── */
.pp-notif-row {
  display: flex; align-items: center; justify-content: space-between; gap: 12px;
  padding: 11px 0; border-bottom: 1px solid var(--border);
}
.pp-notif-row:first-child { padding-top: 0; }
.pp-notif-row:last-child { border-bottom: none; padding-bottom: 0; }
.pp-notif-label { font-size: 13px; font-weight: 500; color: var(--text2); }
.pp-notif-chip {
  font-size: 10px; font-weight: 700; padding: 3px 9px; border-radius: 100px;
  text-transform: uppercase; letter-spacing: 0.04em; flex-shrink: 0;
}

/* ── SECURITY ROWS ── */
.pp-sec-row {
  display: flex; align-items: center; gap: 14px;
  padding: 13px 0; border-bottom: 1px solid var(--border);
  cursor: pointer; transition: opacity 0.2s;
}
.pp-sec-row:first-child { padding-top: 0; }
.pp-sec-row:last-child { border-bottom: none; padding-bottom: 0; }
.pp-sec-row:hover { opacity: 0.72; }

.pp-sec-icon {
  width: 36px; height: 36px; border-radius: 11px;
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; flex-shrink: 0;
}
.pp-sec-info { flex: 1; }
.pp-sec-title { font-size: 14px; font-weight: 600; color: var(--text); margin-bottom: 2px; }
.pp-sec-sub { font-size: 11px; color: var(--text3); }
.pp-sec-badge {
  font-size: 10px; font-weight: 700; padding: 3px 9px; border-radius: 100px;
  text-transform: uppercase; letter-spacing: 0.05em; flex-shrink: 0;
}
.pp-sec-arrow { color: var(--text3); font-size: 18px; }

/* ── DEVICE ROWS ── */
.pp-device-row {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 0; border-bottom: 1px solid var(--border);
}
.pp-device-row:first-child { padding-top: 0; }
.pp-device-row:last-child { border-bottom: none; padding-bottom: 0; }

.pp-device-icon {
  width: 36px; height: 36px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center; font-size: 18px;
  background: var(--surface3); border: 1px solid var(--border); flex-shrink: 0;
}
.pp-device-name { font-size: 13px; font-weight: 600; color: var(--text); margin-bottom: 2px; }
.pp-device-meta { font-size: 11px; color: var(--text3); }
.pp-device-this {
  font-size: 10px; font-weight: 700; color: var(--primary);
  background: var(--primary-bg); border: 1px solid var(--primary-border);
  padding: 3px 8px; border-radius: 100px;
  text-transform: uppercase; letter-spacing: 0.04em; flex-shrink: 0;
}

/* ── SETTINGS ROWS ── */
.pp-setting-row {
  display: flex; align-items: center; gap: 14px;
  padding: 12px 0; border-bottom: 1px solid var(--border);
  cursor: pointer; transition: opacity 0.2s;
}
.pp-setting-row:first-child { padding-top: 0; }
.pp-setting-row:last-child { border-bottom: none; padding-bottom: 0; }
.pp-setting-row:hover { opacity: 0.72; }
.pp-setting-label { flex: 1; font-size: 14px; font-weight: 500; color: var(--text2); }
.pp-setting-val {
  font-size: 13px; color: var(--text3);
  display: flex; align-items: center; gap: 5px;
}

/* ── PENDING BANNER ── */
.pp-pending {
  background: var(--surface2);
  border: 1px solid rgba(245,158,11,0.2); border-left: 3px solid var(--warning);
  border-radius: 14px; padding: 13px 16px;
  display: flex; align-items: center; gap: 12px; cursor: pointer;
  transition: border-color 0.2s;
}
.pp-pending:hover { border-color: rgba(245,158,11,0.4); }
.pp-pending-icon {
  width: 34px; height: 34px; border-radius: 10px;
  background: var(--warning-bg); display: flex;
  align-items: center; justify-content: center; font-size: 15px; flex-shrink: 0;
}
.pp-pending-text { flex: 1; }
.pp-pending-title { font-size: 13px; font-weight: 600; color: var(--text); margin-bottom: 2px; }
.pp-pending-sub { font-size: 11px; color: var(--text3); }
.pp-pending-arrow { color: var(--warning); font-size: 18px; }

/* ── SIGNOUT ── */
.pp-signout {
  background: none; border: 1px solid rgba(232,52,42,0.16);
  color: rgba(232,52,42,0.65); width: 100%; padding: 14px;
  border-radius: var(--radius); font-family: 'DM Sans', sans-serif;
  font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s;
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.pp-signout:hover { background: rgba(232,52,42,0.06); border-color: rgba(232,52,42,0.35); color: var(--primary); }

/* ── BOTTOM NAV ── */
.pp-bottomnav {
  position: fixed; bottom: 0; left: 0; right: 0; z-index: 50;
  height: 72px; background: rgba(17,17,21,0.94);
  backdrop-filter: blur(20px); border-top: 1px solid var(--border);
  display: flex; align-items: center; justify-content: space-around; padding-bottom: 8px;
}

.pp-nav-item {
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  cursor: pointer; padding: 6px 16px; border-radius: 12px;
  transition: background 0.2s; position: relative;
}
.pp-nav-item.active { background: var(--primary-bg); }
.pp-nav-item.active::before {
  content: ''; position: absolute; top: -1px; left: 50%; transform: translateX(-50%);
  width: 24px; height: 2px; background: var(--primary); border-radius: 0 0 4px 4px;
}
.pp-nav-label {
  font-size: 10px; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.05em;
}

/* ── LOGOUT SHEET ── */
.pp-sheet-backdrop {
  position: fixed; inset: 0; z-index: 200;
  background: rgba(0,0,0,0.72); backdrop-filter: blur(10px);
  display: flex; align-items: flex-end; justify-content: center;
  padding: 0 16px 28px;
}
.pp-sheet {
  background: var(--surface2); border: 1px solid var(--border2);
  border-radius: 24px; padding: 28px 24px;
  width: 100%; max-width: 420px;
  animation: sheetUp 0.32s cubic-bezier(0.34,1.56,0.64,1) both;
}
.pp-sheet-avatar {
  width: 54px; height: 54px; border-radius: 16px;
  background: rgba(232,52,42,0.1); border: 1px solid rgba(232,52,42,0.2);
  display: flex; align-items: center; justify-content: center;
  font-size: 24px; margin: 0 auto 14px;
}
.pp-sheet-title {
  font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 800;
  color: var(--text); text-align: center; margin-bottom: 8px;
}
.pp-sheet-sub {
  font-size: 14px; color: var(--text3); text-align: center;
  line-height: 1.55; margin-bottom: 24px;
}
.pp-sheet-btns { display: flex; gap: 10px; }
.pp-sheet-cancel {
  flex: 1; background: var(--surface3); border: 1px solid var(--border);
  color: var(--text2); padding: 13px; border-radius: 12px;
  font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600;
  cursor: pointer; transition: background 0.2s;
}
.pp-sheet-cancel:hover { background: var(--surface); }
.pp-sheet-confirm {
  flex: 1; background: var(--primary); border: none;
  color: #fff; padding: 13px; border-radius: 12px;
  font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600;
  cursor: pointer; transition: background 0.2s;
  box-shadow: 0 4px 20px rgba(232,52,42,0.32);
}
.pp-sheet-confirm:hover { background: var(--primary-dark); }

/* ── ANIMATIONS ── */
@keyframes fadeDown {
  from { opacity: 0; transform: translateY(-14px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes sheetUp {
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes pulseDot {
  0%,100% { transform: scale(1); opacity: 1; }
  50%      { transform: scale(0.65); opacity: 0.45; }
}

/* staggered block reveal */
.pp-body > *:nth-child(1) { animation: fadeUp 0.42s 0.32s ease both; }
.pp-body > *:nth-child(2) { animation: fadeUp 0.42s 0.38s ease both; }
.pp-body > *:nth-child(3) { animation: fadeUp 0.42s 0.44s ease both; }
.pp-body > *:nth-child(4) { animation: fadeUp 0.42s 0.50s ease both; }
.pp-body > *:nth-child(5) { animation: fadeUp 0.42s 0.56s ease both; }
.pp-body > *:nth-child(6) { animation: fadeUp 0.42s 0.62s ease both; }
.pp-body > *:nth-child(7) { animation: fadeUp 0.42s 0.68s ease both; }
.pp-body > *:nth-child(8) { animation: fadeUp 0.42s 0.74s ease both; }
`;

/* ─────────────────────────────────────────
   MOCK DATA  (maps 1-to-1 with schema)
───────────────────────────────────────── */
const USER = {
  firstName: "Priya", lastName: "Sharma",
  phone: "+91 98765 43210",
  email: "priya.sharma@gmail.com",
  is_phone_verified: true, is_email_verified: true,
  status: "ACTIVE",
  created_at: "12 Jan 2024", last_login_at: "Today, 8:42 AM",
};

const CHILDREN = [
  { id:1, first_name:"Aarav",  last_name:"Sharma", class:"5", section:"A",
    school:"Delhi Public School",  is_active:true,  relationship:"Son",
    color:"#1d4ed8", cardStatus:"ACTIVE",   lastScan:"Today, 8:20 AM" },
  { id:2, first_name:"Riya",   last_name:"Sharma", class:"3", section:"B",
    school:"Delhi Public School",  is_active:true,  relationship:"Daughter",
    color:"#7c3aed", cardStatus:"ACTIVE",   lastScan:"Today, 8:18 AM" },
  { id:3, first_name:"Karan",  last_name:"Mehta",  class:"8", section:"C",
    school:"Ryan International",   is_active:false, relationship:"Nephew",
    color:"#be185d", cardStatus:"INACTIVE", lastScan:"3 days ago" },
];

const DEVICES = [
  { id:1, platform:"Android", name:"Samsung Galaxy S24", added:"Jan 2024", thisDevice:true  },
  { id:2, platform:"iOS",     name:"iPhone 14",          added:"Mar 2024", thisDevice:false },
];

const NOTIFS = [
  { label:"Scan Alerts",              enabled:true  },
  { label:"Anomaly Warnings",         enabled:true  },
  { label:"Card Expiry Reminders",    enabled:true  },
  { label:"Notify on Every Scan",     enabled:false },
];

/* ─────────────────────────────────────────
   SVG NAV ICONS
───────────────────────────────────────── */
const IconHome     = ({a}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a?'#e8342a':'rgba(255,255,255,0.28)'} strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const IconCards    = ({a}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a?'#e8342a':'rgba(255,255,255,0.28)'} strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20"/></svg>;
const IconStudents = ({a}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a?'#e8342a':'rgba(255,255,255,0.28)'} strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>;
const IconProfile  = ({a}) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a?'#e8342a':'rgba(255,255,255,0.28)'} strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;

const ChevronRight = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>;

/* ─────────────────────────────────────────
   BLOCK WRAPPER
───────────────────────────────────────── */
const Block = ({ icon, iconBg, title, action, onAction, children }) => (
  <div className="pp-block">
    <div className="pp-block-head">
      <div className="pp-block-left">
        <div className="pp-block-icon" style={{ background: iconBg || "var(--primary-bg)" }}>{icon}</div>
        <div className="pp-block-title">{title}</div>
      </div>
      {action && <button className="pp-block-action" onClick={onAction}>{action}</button>}
    </div>
    <div className="pp-block-body">{children}</div>
  </div>
);

/* small chip */
const Chip = ({ on }) => (
  <div className="pp-notif-chip" style={on
    ? { color:"#4ade80", background:"rgba(22,163,74,0.1)", border:"1px solid rgba(22,163,74,0.22)" }
    : { color:"var(--text3)", background:"var(--surface3)", border:"1px solid var(--border)" }
  }>{on ? "On" : "Off"}</div>
);

/* mini verified badge */
const VerifiedBadge = () => (
  <span style={{
    display:"inline-flex", alignItems:"center", gap:3,
    fontSize:9, fontWeight:700, color:"#4ade80",
    background:"rgba(22,163,74,0.1)", border:"1px solid rgba(22,163,74,0.22)",
    padding:"2px 6px", borderRadius:100, textTransform:"uppercase", letterSpacing:"0.05em",
  }}>
    <svg width="7" height="7" viewBox="0 0 24 24" fill="#4ade80"><polyline points="20 6 9 17 4 12"/></svg>
    Verified
  </span>
);

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function ProfilePage() {
  const [showLogout, setShowLogout] = useState(false);
  const initials = `${USER.firstName[0]}${USER.lastName[0]}`;
  const activeCount = CHILDREN.filter(c => c.is_active).length;

  return (
    <>
      <style>{css}</style>
      <div className="pp-root">
        <div className="pp-noise" />

        {/* ──────── HERO ──────── */}
        <div className="pp-hero">
          <div className="pp-hero-bg" />
          <div className="pp-hero-grid" />
          <div className="pp-hero-inner">

            {/* Avatar */}
            <div className="pp-avatar-wrap">
              <div className="pp-avatar-outer">
                <div className="pp-avatar">{initials}</div>
              </div>
              <div className="pp-avatar-online" />
            </div>

            {/* Name */}
            <div className="pp-name">{USER.firstName} {USER.lastName}</div>

            {/* Phone + verified */}
            <div className="pp-phone-row">
              <span className="pp-phone-text">{USER.phone}</span>
              {USER.is_phone_verified && (
                <div className="pp-verified">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="#4ade80"><polyline points="20 6 9 17 4 12"/></svg>
                  Verified
                </div>
              )}
            </div>

            {/* Pills */}
            <div className="pp-status-pills">
              <div className="pp-pill" style={{
                color:"#4ade80", background:"rgba(22,163,74,0.08)",
                borderColor:"rgba(22,163,74,0.2)"
              }}>
                <span style={{
                  display:"inline-block", width:7, height:7, borderRadius:"50%",
                  background:"#4ade80", animation:"pulseDot 1.6s ease infinite",
                }} />
                Active
              </div>
              <div className="pp-pill" style={{ color:"var(--text3)", background:"var(--surface3)", borderColor:"var(--border)" }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                Since {USER.created_at}
              </div>
              <div className="pp-pill" style={{ color:"var(--text3)", background:"var(--surface3)", borderColor:"var(--border)" }}>
                👶 {CHILDREN.length} Children
              </div>
            </div>

            {/* CTA */}
            <button className="pp-edit-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Edit Profile
            </button>
          </div>
        </div>

        {/* ──────── STATS RIBBON ──────── */}
        <div className="pp-stats">
          {[
            { num: CHILDREN.length, label: "Children",     accent: false },
            { num: activeCount,      label: "Active Cards", accent: true  },
            { num: DEVICES.length,   label: "Devices",      accent: false },
          ].map(s => (
            <div className="pp-stat" key={s.label}>
              <div className={`pp-stat-num ${s.accent ? "accent" : ""}`}>{s.num}</div>
              <div className="pp-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ──────── BODY ──────── */}
        <div className="pp-body">

          {/* Pending update banner */}
          <div className="pp-pending">
            <div className="pp-pending-icon">⏳</div>
            <div className="pp-pending-text">
              <div className="pp-pending-title">1 Update Pending Approval</div>
              <div className="pp-pending-sub">Aarav's details awaiting school review</div>
            </div>
            <div className="pp-pending-arrow">›</div>
          </div>

          {/* ── MY CHILDREN ── */}
          <Block icon="👨‍👩‍👧‍👦" iconBg="rgba(232,52,42,0.1)" title="My Children" action="View All">
            <div className="pp-children">
              {CHILDREN.map(c => (
                <div key={c.id} className={`pp-child-card ${c.is_active ? "is-active" : "is-inactive"}`}>
                  <div className="pp-child-avatar" style={{ background: c.color }}>
                    {c.first_name[0]}{c.last_name[0]}
                  </div>
                  <div className="pp-child-info">
                    <div className="pp-child-name">{c.first_name} {c.last_name}</div>
                    <div className="pp-child-meta">
                      <span>Class {c.class}{c.section}</span>
                      <span className="pp-child-dot">·</span>
                      <span>{c.relationship}</span>
                      <span className="pp-child-dot">·</span>
                      <span>🕒 {c.lastScan}</span>
                    </div>
                  </div>
                  <div
                    className="pp-status-chip"
                    style={c.is_active
                      ? { color:"#4ade80", background:"rgba(22,163,74,0.1)", border:"1px solid rgba(22,163,74,0.22)" }
                      : { color:"var(--text3)", background:"var(--surface3)", border:"1px solid var(--border)" }
                    }
                  >
                    {c.is_active && <span style={{ width:5,height:5,background:"#4ade80",borderRadius:"50%",display:"inline-block" }} />}
                    {c.cardStatus}
                  </div>
                  <div className="pp-child-arrow">›</div>
                </div>
              ))}
            </div>
          </Block>

          {/* ── ACCOUNT INFO ── */}
          <Block icon="👤" iconBg="rgba(59,130,246,0.1)" title="Account Information">
            {[
              {
                icon:"📧", bg:"rgba(59,130,246,0.08)",
                label:"Email Address", value: USER.email,
                extra: USER.is_email_verified ? <VerifiedBadge /> : null,
              },
              {
                icon:"📱", bg:"rgba(22,163,74,0.08)",
                label:"Mobile Number", value: USER.phone,
                extra: <VerifiedBadge />,
              },
              { icon:"🕒", bg:"rgba(255,255,255,0.04)", label:"Last Login", value: USER.last_login_at },
              { icon:"📅", bg:"rgba(255,255,255,0.04)", label:"Member Since", value: USER.created_at },
            ].map(r => (
              <div className="pp-info-row" key={r.label}>
                <div className="pp-info-icon" style={{ background: r.bg, border:"1px solid var(--border)" }}>{r.icon}</div>
                <div style={{ flex:1 }}>
                  <div className="pp-info-key">{r.label}</div>
                  <div className="pp-info-val">{r.value}{r.extra}</div>
                </div>
              </div>
            ))}
          </Block>

          {/* ── NOTIFICATION PREFS ── */}
          <Block icon="🔔" iconBg="rgba(245,158,11,0.1)" title="Notification Preferences" action="Edit">
            {NOTIFS.map(n => (
              <div className="pp-notif-row" key={n.label}>
                <div className="pp-notif-label">{n.label}</div>
                <Chip on={n.enabled} />
              </div>
            ))}
          </Block>

          {/* ── SECURITY ── */}
          <Block icon="🔒" iconBg="rgba(124,58,237,0.1)" title="Security">
            {[
              { icon:"🔑", bg:"rgba(59,130,246,0.08)",  title:"PIN Lock",        sub:"6-digit PIN enabled",             badge:{ label:"Active", color:"#4ade80", bg:"rgba(22,163,74,0.1)", bd:"rgba(22,163,74,0.22)" } },
              { icon:"👆", bg:"rgba(124,58,237,0.08)",  title:"Biometric Unlock", sub:"Fingerprint / Face ID active",    badge:{ label:"On",     color:"#4ade80", bg:"rgba(22,163,74,0.1)", bd:"rgba(22,163,74,0.22)" } },
              { icon:"🕒", bg:"rgba(245,158,11,0.08)",  title:"Active Sessions",  sub:`${DEVICES.length} trusted devices`, badge: null },
            ].map(s => (
              <div className="pp-sec-row" key={s.title}>
                <div className="pp-sec-icon" style={{ background: s.bg }}>{s.icon}</div>
                <div className="pp-sec-info">
                  <div className="pp-sec-title">{s.title}</div>
                  <div className="pp-sec-sub">{s.sub}</div>
                </div>
                {s.badge && (
                  <div className="pp-sec-badge" style={{
                    color: s.badge.color, background: s.badge.bg, border:`1px solid ${s.badge.bd}`
                  }}>{s.badge.label}</div>
                )}
                <div className="pp-sec-arrow">›</div>
              </div>
            ))}
          </Block>

          {/* ── DEVICES ── */}
          <Block icon="📲" iconBg="rgba(22,163,74,0.08)" title="Trusted Devices" action="Manage">
            {DEVICES.map(d => (
              <div className="pp-device-row" key={d.id}>
                <div className="pp-device-icon">{d.platform === "Android" ? "🤖" : "🍎"}</div>
                <div style={{ flex:1 }}>
                  <div className="pp-device-name">{d.name}</div>
                  <div className="pp-device-meta">{d.platform} · Added {d.added}</div>
                </div>
                {d.thisDevice && <div className="pp-device-this">This Device</div>}
              </div>
            ))}
          </Block>

          {/* ── APP SETTINGS ── */}
          <Block icon="⚙️" iconBg="rgba(255,255,255,0.04)" title="App Settings">
            {[
              { label:"Language",    value:"🇬🇧 English", chevron:true },
              { label:"Theme",       value:"🌑 Dark",     chevron:true },
              { label:"App Version", value:"v1.0.0",      chevron:false },
            ].map(s => (
              <div className="pp-setting-row" key={s.label} style={{ cursor: s.chevron ? "pointer" : "default" }}>
                <div className="pp-setting-label">{s.label}</div>
                <div className="pp-setting-val">
                  {s.value}
                  {s.chevron && <ChevronRight />}
                </div>
              </div>
            ))}
          </Block>

          {/* Sign Out */}
          <button className="pp-signout" onClick={() => setShowLogout(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Sign Out
          </button>

        </div>{/* /pp-body */}

        {/* ──────── BOTTOM NAV ──────── */}
        <nav className="pp-bottomnav">
          {[
            { label:"Home",     Icon:IconHome,     active:false },
            { label:"Cards",    Icon:IconCards,    active:false },
            { label:"Students", Icon:IconStudents, active:false },
            { label:"Profile",  Icon:IconProfile,  active:true  },
          ].map(n => (
            <div key={n.label} className={`pp-nav-item ${n.active ? "active" : ""}`}>
              <n.Icon a={n.active} />
              <span className="pp-nav-label" style={{ color: n.active ? "#e8342a" : "rgba(255,255,255,0.28)" }}>
                {n.label}
              </span>
            </div>
          ))}
        </nav>

        {/* ──────── SIGN-OUT SHEET ──────── */}
        {showLogout && (
          <div className="pp-sheet-backdrop" onClick={() => setShowLogout(false)}>
            <div className="pp-sheet" onClick={e => e.stopPropagation()}>
              <div className="pp-sheet-avatar">👋</div>
              <div className="pp-sheet-title">Sign out?</div>
              <div className="pp-sheet-sub">
                You'll need to verify your mobile number again to sign back in.
              </div>
              <div className="pp-sheet-btns">
                <button className="pp-sheet-cancel" onClick={() => setShowLogout(false)}>
                  Cancel
                </button>
                <button className="pp-sheet-confirm">Sign Out</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}