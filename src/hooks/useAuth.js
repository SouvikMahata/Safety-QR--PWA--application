// src/hooks/useAuth.js
import useAuthStore from "../store/authStore";

/**
 * Convenience hook — exposes auth state + actions.
 * Components should use this instead of accessing the store directly.
 */
export const useAuth = () => useAuthStore();
