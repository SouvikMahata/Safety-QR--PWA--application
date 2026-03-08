// src/services/storageService.js
// Prefixed localStorage wrapper with JSON serialisation & error safety

const PREFIX = 'sqr_';

export const storageService = {
  set: (key, value) => {
    try {
      localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value));
      return true;
    } catch { return false; }
  },

  get: (key, fallback = null) => {
    try {
      const raw = localStorage.getItem(`${PREFIX}${key}`);
      return raw !== null ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
  },

  remove: (key) => localStorage.removeItem(`${PREFIX}${key}`),

  clear: () => {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(PREFIX))
      .forEach((k) => localStorage.removeItem(k));
  },
};