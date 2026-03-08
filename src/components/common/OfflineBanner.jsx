// src/components/common/OfflineBanner.jsx
import { AnimatePresence, motion } from 'framer-motion';

const OfflineBanner = ({ show }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -40, opacity: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-slate-900 text-center text-xs font-bold py-2 px-4"
      >
        📡 You&apos;re offline — some features may not work
      </motion.div>
    )}
  </AnimatePresence>
);

export default OfflineBanner;