// src/api/client.js
// Central Axios instance
// • Attaches Bearer token on every request
// • On 401 → silently refreshes token, retries original request
// • Queues concurrent requests during refresh
// • Normalises all error shapes to { status, message, errors, code }

import axios from 'axios';
import { tokenService } from '@services/tokenService';
import { ENV } from '@utils/env';

const client = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: ENV.API_TIMEOUT,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

// ── Request: inject token ────────────────────────────
client.interceptors.request.use(
  (config) => {
    const token = tokenService.getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (err) => Promise.reject(err),
);

// ── Response: refresh + error normalisation ──────────
let isRefreshing = false;
let failedQueue  = [];

const drainQueue = (err, token = null) => {
  failedQueue.forEach((p) => (err ? p.reject(err) : p.resolve(token)));
  failedQueue = [];
};

client.interceptors.response.use(
  (res) => res.data,   // auto-unwrap { data, ... } → data
  async (err) => {
    const orig = err.config;

    if (err.response?.status === 401 && !orig._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          orig.headers.Authorization = `Bearer ${token}`;
          return client(orig);
        });
      }

      orig._retry   = true;
      isRefreshing  = true;

      try {
        const rt = tokenService.getRefreshToken();
        if (!rt) throw new Error('No refresh token');

        const { data } = await axios.post(
          `${ENV.API_BASE_URL}/auth/refresh`,
          { refresh_token: rt },
        );
        tokenService.setTokens(data.access_token, data.refresh_token);
        drainQueue(null, data.access_token);
        orig.headers.Authorization = `Bearer ${data.access_token}`;
        return client(orig);
      } catch (refreshErr) {
        drainQueue(refreshErr, null);
        tokenService.clearTokens();
        window.location.replace('/auth/login');
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    // Normalise error
    return Promise.reject({
      status:  err.response?.status,
      message: err.response?.data?.message || err.message || 'Something went wrong',
      errors:  err.response?.data?.errors  || {},
      code:    err.response?.data?.code    || 'UNKNOWN_ERROR',
    });
  },
);

export default client;