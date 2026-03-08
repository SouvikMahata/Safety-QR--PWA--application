// src/store/authStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { authApi } from "../api/authApi";
import { tokenService } from "../services/tokenService";
// import { toE164 } from "./../utils/formatters";

const useAuthStore = create(
  persist(
    (set, get) => ({
      // ── State ────────────────────────────────────────
      user: null,
      mobile: null, // holds mobile during OTP flow
      isAuthenticated: false,
      isRegistered: null, // null = unknown | true | false
      otpSent: false,
      loading: false,
      error: null,

      // ── Helpers ──────────────────────────────────────
      setMobile: (mobile) => set({ mobile }),
      clearError: () => set({ error: null }),
      resetOtp: () => set({ otpSent: false, mobile: null }),

      // ── Actions ──────────────────────────────────────

      /** Step 1: request OTP */
      sendOtp: async (rawMobile) => {
        const mobile = toE164(rawMobile);
        set({ loading: true, error: null, mobile });
        try {
          const res = await authApi.sendOtp(mobile);
          set({
            loading: false,
            otpSent: true,
            isRegistered: res.data?.is_registered ?? null,
          });
          return { success: true };
        } catch (err) {
          set({ loading: false, error: err.message });
          return { success: false, error: err.message };
        }
      },

      /** Step 2: verify OTP */
      verifyOtp: async (otp) => {
        const { mobile } = get();
        set({ loading: true, error: null });
        try {
          const res = await authApi.verifyOtp({ mobile, otp });
          tokenService.setTokens(res.data.access_token, res.data.refresh_token);
          set({
            loading: false,
            isAuthenticated: true,
            user: res.data.user,
            otpSent: false,
          });
          return { success: true, isNewUser: res.data.is_new_user };
        } catch (err) {
          set({ loading: false, error: err.message });
          return { success: false, error: err.message };
        }
      },

      /** Registration: link physical card */
      register: async ({ nonce, card_number }) => {
        const { mobile } = get();
        set({ loading: true, error: null });
        try {
          const res = await authApi.register({ mobile, nonce, card_number });
          tokenService.setTokens(res.data.access_token, res.data.refresh_token);
          set({ loading: false, isAuthenticated: true, user: res.data.user });
          return { success: true };
        } catch (err) {
          set({ loading: false, error: err.message });
          return { success: false, error: err.message };
        }
      },

      /** Logout */
      logout: async () => {
        try {
          await authApi.logout();
        } catch {
          /* server-side best-effort */
        }
        tokenService.clearTokens();
        set({
          user: null,
          isAuthenticated: false,
          mobile: null,
          otpSent: false,
        });
      },
    }),
    {
      name: "sqr-auth",
      storage: createJSONStorage(() => sessionStorage),
      // Only persist minimal auth state — tokens stay in memory/sessionStorage separately
      partialize: (s) => ({
        user: s.user,
        isAuthenticated: s.isAuthenticated,
        mobile: s.mobile,
        isRegistered: s.isRegistered,
      }),
    },
  ),
);

export default useAuthStore;
