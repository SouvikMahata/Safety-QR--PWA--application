// src/components/ui/ConfirmDialog.jsx
import { AnimatePresence, motion } from 'framer-motion';
import useUIStore from '@store/uiStore';
import Button from './Button';

const ConfirmDialog = () => {
  const { confirm, closeConfirm } = useUIStore();
  const { open, title, message, onConfirm, onCancel } = confirm;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onCancel ?? closeConfirm}
          />
          {/* Sheet */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-slate-800 rounded-t-3xl p-6 pb-safe"
          >
            <div className="w-10 h-1 bg-slate-600 rounded-full mx-auto mb-5" />
            <h3 className="text-lg font-bold text-slate-100 mb-2">{title}</h3>
            <p className="text-slate-400 text-sm mb-6">{message}</p>
            <div className="flex gap-3">
              <Button variant="secondary" fullWidth onClick={onCancel ?? closeConfirm}>
                Cancel
              </Button>
              <Button variant="danger" fullWidth onClick={onConfirm}>
                Confirm
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDialog;