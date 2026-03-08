// src/store/uiStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { storageService } from "../services/storageService";

const useUIStore = create(
  persist(
    (set) => ({
      // ── Theme ─────────────────────────────────────
      theme: "dark",
      toggleTheme: () =>
        set((s) => ({ theme: s.theme === "dark" ? "light" : "dark" })),

      // ── Network ───────────────────────────────────
      isOnline: navigator.onLine,
      setOnline: (v) => set({ isOnline: v }),

      // ── Bottom sheet ──────────────────────────────
      sheet: { open: false, content: null },
      openSheet: (content) => set({ sheet: { open: true, content } }),
      closeSheet: () => set({ sheet: { open: false, content: null } }),

      // ── Confirm dialog ────────────────────────────
      confirm: { open: false, title: "", message: "", onConfirm: null },
      openConfirm: (opts) => set({ confirm: { open: true, ../.opts } }),
      closeConfirm: () =>
        set({
          confirm: { open: false, title: "", message: "", onConfirm: null },
        }),
    }),
    {
      name: "sqr-ui",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ theme: s.theme }),
    },
  ),
);

export default useUIStore;
