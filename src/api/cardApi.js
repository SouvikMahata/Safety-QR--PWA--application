// src/api/cardApi.js
import client from "./client";

const BASE = "/cards";

export const cardApi = {
  /** GET /cards → Card[] */
  getCards: () => client.get(BASE),

  /** GET /cards/:id → Card */
  getCard: (cardId) => client.get(`${BASE}/${cardId}`),

  /**
   * POST /cards/link — link physical card to a student
   * ../param {{ card_number, nonce, student_id }} payload
   */
  linkCard: ({ card_number, nonce, student_id }) =>
    client.post(`${BASE}/link`, { card_number, nonce, student_id }),

  /**
   * PATCH /cards/:id/status
   * ../param {'active'|'inactive'} status
   */
  setCardStatus: (cardId, status) =>
    client.patch(`${BASE}/${cardId}/status`, { status }),

  /**
   * PATCH /cards/:id/block
   * ../param {boolean} blocked
   */
  setCardBlocked: (cardId, blocked) =>
    client.patch(`${BASE}/${cardId}/block`, { blocked }),

  /** DELETE /cards/:id — unlink card */
  unlinkCard: (cardId) => client.delete(`${BASE}/${cardId}`),

  /**
   * GET /cards/:id/qr → { qr_data: string, qr_url: string }
   * qr_data is the raw value to encode; qr_url is pre-rendered image URL
   */
  getCardQr: (cardId) => client.get(`${BASE}/${cardId}/qr`),
};
