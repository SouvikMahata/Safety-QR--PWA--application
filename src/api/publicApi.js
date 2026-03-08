// src/api/publicApi.js
// No auth required — used by emergency QR landing page
import client from "./client";

export const publicApi = {
  /**
   * GET /public/emergency/:cardId
   * Returns student emergency profile if card is active + unblocked
   * ../returns {{ data: { name, blood_group, allergies, medical_conditions,
   *                     emergency_contacts[], school_name, class, photo_url } }}
   */
  getEmergencyProfile: (cardId) => client.get(`/public/emergency/${cardId}`),
};
