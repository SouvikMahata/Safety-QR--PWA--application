// src/hooks/useConfirm.js
import useUIStore from '@store/uiStore';

/**
 * Opens the global confirm dialog.
 * Returns a Promise that resolves true (confirmed) or false (cancelled).
 */
export const useConfirm = () => {
  const { openConfirm, closeConfirm } = useUIStore();

  const confirm = ({ title, message }) =>
    new Promise((resolve) => {
      openConfirm({
        title,
        message,
        onConfirm: () => { closeConfirm(); resolve(true); },
        onCancel:  () => { closeConfirm(); resolve(false); },
      });
    });

  return confirm;
};