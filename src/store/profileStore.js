// src/store/profileStore.js
import { create } from "zustand";
import { profileApi } from "../api/profileApi";

const useProfileStore = create((set, get) => ({
  // ── State ──────────────────────────────────────────
  parent: null,
  students: [],
  loading: false,
  studentsLoading: false,
  error: null,

  clearError: () => set({ error: null }),

  // ── Parent ─────────────────────────────────────────
  fetchProfile: async () => {
    set({ loading: true, error: null });
    try {
      const res = await profileApi.getProfile();
      set({ loading: false, parent: res.data });
    } catch (err) {
      set({ loading: false, error: err.message });
    }
  },

  updateProfile: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await profileApi.updateProfile(data);
      set({ loading: false, parent: res.data });
      return { success: true };
    } catch (err) {
      set({ loading: false, error: err.message });
      return { success: false, error: err.message };
    }
  },

  // ── Students ────────────────────────────────────────
  fetchStudents: async () => {
    set({ studentsLoading: true, error: null });
    try {
      const res = await profileApi.getStudents();
      set({ studentsLoading: false, students: res.data });
    } catch (err) {
      set({ studentsLoading: false, error: err.message });
    }
  },

  createStudent: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await profileApi.createStudent(data);
      set((s) => ({ loading: false, students: [../.s.students, res.data] }));
      return { success: true, student: res.data };
    } catch (err) {
      set({ loading: false, error: err.message });
      return { success: false, error: err.message };
    }
  },

  upsertStudent: async (studentId, data) => {
    set({ loading: true, error: null });
    try {
      const res = await profileApi.upsertStudent(studentId, data);
      set((s) => ({
        loading: false,
        students: s.students.map((st) => (st.id === studentId ? res.data : st)),
      }));
      return { success: true, student: res.data };
    } catch (err) {
      set({ loading: false, error: err.message });
      return { success: false, error: err.message };
    }
  },

  uploadStudentPhoto: async (studentId, formData) => {
    try {
      const res = await profileApi.uploadStudentPhoto(studentId, formData);
      set((s) => ({
        students: s.students.map((st) =>
          st.id === studentId ? { ../.st, photo_url: res.data.photo_url } : st,
        ),
      }));
      return { success: true, photo_url: res.data.photo_url };
    } catch (err) {
      return { success: false, error: err.message };
    }
  },

  deleteStudent: async (studentId) => {
    set({ loading: true, error: null });
    try {
      await profileApi.deleteStudent(studentId);
      set((s) => ({
        loading: false,
        students: s.students.filter((st) => st.id !== studentId),
      }));
      return { success: true };
    } catch (err) {
      set({ loading: false, error: err.message });
      return { success: false, error: err.message };
    }
  },

  // ── Selectors ──────────────────────────────────────
  getStudentById: (id) => get().students.find((s) => s.id === id) ?? null,
}));

export default useProfileStore;
