// src/services/tokenService.js
// Access token  → memory only (never hits DOM storage → XSS safe)
// Refresh token → sessionStorage (cleared on tab/browser close)

import { jwtDecode } from 'jwt-decode';

const REFRESH_KEY = 'sqr_rt';

let _accessToken = null;

export const tokenService = {
  // ── Read ───────────────────────────────────────────
  getAccessToken:  () => _accessToken,
  getRefreshToken: () => sessionStorage.getItem(REFRESH_KEY),
  hasTokens: () => !!_accessToken || !!sessionStorage.getItem(REFRESH_KEY),

  // ── Write ──────────────────────────────────────────
  setTokens: (accessToken, refreshToken) => {
    _accessToken = accessToken;
    if (refreshToken) sessionStorage.setItem(REFRESH_KEY, refreshToken);
  },
  setAccessToken: (token) => { _accessToken = token; },

  // ── Clear ──────────────────────────────────────────
  clearTokens: () => {
    _accessToken = null;
    sessionStorage.removeItem(REFRESH_KEY);
  },

  // ── Inspect ────────────────────────────────────────
  /** Decode JWT payload (no signature verification) */
  decodeToken: (token = _accessToken) => {
    if (!token) return null;
    try { return jwtDecode(token); }
    catch { return null; }
  },

  /** Returns true if the access token is expired (or missing) */
  isTokenExpired: (token = _accessToken) => {
    if (!token) return true;
    try {
      const { exp } = jwtDecode(token);
      return Date.now() >= exp * 1000 - 10_000; // 10 s buffer
    } catch { return true; }
  },
};