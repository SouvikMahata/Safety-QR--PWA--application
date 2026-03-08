// src/api/profileApi.js
import client from "./client";

const BASE = "/profile";

export const profileApi = {
  // ── Parent ─────────────────────────────────────────

  /** GET /profile → parent object */
  getProfile: () => client.get(BASE),

  /** PUT /profile → updated parent */
  updateProfile: (data) => client.put(BASE, data),

  // ── Students ────────────────────────────────────────

  /** GET /profile/students → Student[] */
  getStudents: () => client.get(`${BASE}/students`),

  /** GET /profile/students/:id → Student */
  getStudent: (studentId) => client.get(`${BASE}/students/${studentId}`),

  /**
   * PUT /profile/students/:id  (create if new, update if existing)
   * Body: { name, dob, gender, blood_group, school_name, class,
   *         allergies, medical_conditions, emergency_contacts[] }
   */
  upsertStudent: (studentId, data) =>
    client.put(`${BASE}/students/${studentId}`, data),

  /** POST /profile/students → create new student; returns Student */
  createStudent: (data) => client.post(`${BASE}/students`, data),

  /**
   * POST /profile/students/:id/photo  (multipart/form-data)
   * ../returns {{ data: { photo_url: string } }}
   */
  uploadStudentPhoto: (studentId, formData) =>
    client.post(`${BASE}/students/${studentId}/photo`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  /** DELETE /profile/students/:id */
  deleteStudent: (studentId) => client.delete(`${BASE}/students/${studentId}`),
};
