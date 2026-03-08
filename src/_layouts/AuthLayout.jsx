// src/_layouts/AuthLayout.jsx
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

const AuthLayout = () => (
  <div className="min-h-dvh flex items-center justify-center p-5 bg-slate-900"
    style={{ background: 'radial-gradient(ellipse at top, #0c2233 0%, #0f172a 65%)' }}
  >
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full max-w-sm"
    >
      {/* Brand */}
      <div className="text-center mb-8">
        <div className="text-4xl mb-2">🛡️</div>
        <h1 className="text-2xl font-black text-slate-100 tracking-tight">SafetyQR</h1>
        <p className="text-sm text-slate-400 mt-1">Emergency profile for your child</p>
      </div>

      <Outlet />
    </motion.div>
  </div>
);

export default AuthLayout;