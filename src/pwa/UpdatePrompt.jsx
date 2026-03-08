// src/pwa/UpdatePrompt.jsx
import { useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '@components/ui/Button';

const UpdatePrompt = () => {
  const { needRefresh: [needRefresh], updateServiceWorker } = useRegisterSW();
  const [dismissed, setDismissed] = useState(false);

  return (
    <AnimatePresence>
      {needRefresh && !dismissed && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          className="fixed bottom-20 left-4 right-4 z-50 bg-slate-800 border border-cyan-400/40 rounded-2xl p-4 flex items-center gap-3 shadow-xl"
        >
          <span className="text-xl">🔄</span>
          <p className="flex-1 text-sm text-slate-200">New version available</p>
          <Button size="sm" variant="ghost" onClick={() => setDismissed(true)}>
            Later
          </Button>
          <Button size="sm" onClick={() => updateServiceWorker(true)}>
            Update
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UpdatePrompt;