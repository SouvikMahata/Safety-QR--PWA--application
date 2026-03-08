// src/store/cardStore.js
import { create } from "zustand";
import { cardApi } from "../api/cardApi";

const useCardStore = create((set, get) => ({
  // ── State ──────────────────────────────────────────
  cards: [],
  loading: false,
  actionLoading: {}, // { [cardId]: boolean }
  error: null,

  clearError: () => set({ error: null }),

  // ── Fetch ──────────────────────────────────────────
  fetchCards: async () => {
    set({ loading: true, error: null });
    try {
      const res = await cardApi.getCards();
      set({ loading: false, cards: res.data });
    } catch (err) {
      set({ loading: false, error: err.message });
    }
  },

  // ── Link ───────────────────────────────────────────
  linkCard: async (payload) => {
    set({ loading: true, error: null });
    try {
      const res = await cardApi.linkCard(payload);
      set((s) => ({ loading: false, cards: [...s.cards, res.data] }));
      return { success: true, card: res.data };
    } catch (err) {
      set({ loading: false, error: err.message });
      return { success: false, error: err.message };
    }
  },

  // ── Status ─────────────────────────────────────────
  setCardStatus: async (cardId, status) => {
    set((s) => ({ actionLoading: { ...s.actionLoading, [cardId]: true } }));
    try {
      const res = await cardApi.setCardStatus(cardId, status);
      set((s) => ({
        cards: s.cards.map((c) => (c.id === cardId ? res.data : c)),
        actionLoading: { ...s.actionLoading, [cardId]: false },
      }));
      return { success: true };
    } catch (err) {
      set((s) => ({
        actionLoading: { ...s.actionLoading, [cardId]: false },
        error: err.message,
      }));
      return { success: false, error: err.message };
    }
  },

  // ── Block ──────────────────────────────────────────
  setCardBlocked: async (cardId, blocked) => {
    set((s) => ({ actionLoading: { ...s.actionLoading, [cardId]: true } }));
    try {
      const res = await cardApi.setCardBlocked(cardId, blocked);
      set((s) => ({
        cards: s.cards.map((c) => (c.id === cardId ? res.data : c)),
        actionLoading: { ...s.actionLoading, [cardId]: false },
      }));
      return { success: true };
    } catch (err) {
      set((s) => ({
        actionLoading: { ...s.actionLoading, [cardId]: false },
        error: err.message,
      }));
      return { success: false, error: err.message };
    }
  },

  // ── Unlink ─────────────────────────────────────────
  unlinkCard: async (cardId) => {
    set((s) => ({ actionLoading: { ...s.actionLoading, [cardId]: true } }));
    try {
      await cardApi.unlinkCard(cardId);
      set((s) => ({
        cards: s.cards.filter((c) => c.id !== cardId),
        actionLoading: { ...s.actionLoading, [cardId]: false },
      }));
      return { success: true };
    } catch (err) {
      set((s) => ({
        actionLoading: { ...s.actionLoading, [cardId]: false },
        error: err.message,
      }));
      return { success: false, error: err.message };
    }
  },

  // ── Selectors ──────────────────────────────────────
  getCardById: (id) => get().cards.find((c) => c.id === id) ?? null,
  isCardLoading: (id) => get().actionLoading[id] === true,
  activeCards: () =>
    get().cards.filter((c) => c.status === "active" && !c.blocked),
  blockedCards: () => get().cards.filter((c) => c.blocked),
}));

export default useCardStore;
