// src/api/authApi.js
import client from './client';

const BASE = '/auth';

export const authApi = {
  /**
   * Step 1 — send OTP
   * @param {string} mobile  E.164 e.g. +919876543210
   * @returns {{ data: { is_registered: boolean, expires_in: number } }}
   */
  sendOtp: (mobile) => client.post(`${BASE}/send-otp`, { mobile }),

  /**
   * Step 2 — verify OTP
   * @returns {{ data: { access_token, refresh_token, user, is_new_user } }}
   */
  verifyOtp: ({ mobile, otp }) => client.post(`${BASE}/verify-otp`, { mobile, otp }),

  /**
   * Registration — new user links physical card
   * @param {{ mobile, nonce, card_number }} payload
   * @returns {{ data: { access_token, refresh_token, user } }}
   */
  register: ({ mobile, nonce, card_number }) =>
    client.post(`${BASE}/register`, { mobile, nonce, card_number }),

  /** Refresh access token */
  refreshToken: (refresh_token) => client.post(`${BASE}/refresh`, { refresh_token }),

  /** Logout — invalidate refresh token server-side */
  logout: () => client.post(`${BASE}/logout`),
};