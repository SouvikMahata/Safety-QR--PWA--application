// src/services/notificationService.js
// Wraps react-toastify so toast calls are consistent app-wide

import { toast } from "react-toastify";

export const notificationService = {
  success: (msg, opts) => toast.success(msg, opts),
  error: (msg, opts) => toast.error(msg, opts),
  info: (msg, opts) => toast.info(msg, opts),
  warning: (msg, opts) => toast.warning(msg, opts),
  loading: (msg, opts) => toast.loading(msg, opts),
  dismiss: (id) => toast.dismiss(id),
  update: (id, opts) => toast.update(id, opts),

  /**
   * Promise-based toast
   * ../param {Promise} promise
   * ../param {{ pending, success, error }} msgs
   */
  promise: (promise, msgs, opts) => toast.promise(promise, msgs, opts),
};
