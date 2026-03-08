// src/_layouts/AppLayout.jsx
import { AnimatePresence, motion } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from '../components/common/BottomNav';
import OfflineBanner from '../components/common/OfflineBanner';
import ConfirmDialog from '../components/ui/ConfirmDialog';
import { useNetwork } from '../hooks/useNetwork';

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
};

const AppLayout = () => {
  const isOnline = useNetwork();
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-dvh bg-slate-900">
      <OfflineBanner show={!isOnline} />

      <main className="flex-1 overflow-y-auto pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNav />
      <ConfirmDialog />
    </div>
  );
};

export default AppLayout;