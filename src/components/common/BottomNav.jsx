// src/components/common/BottomNav.jsx
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '../../utils/constants';

const NAV_ITEMS = [
  { to: ROUTES.DASHBOARD, label: 'Home', icon: '🏠' },
  { to: ROUTES.STUDENTS, label: 'Students', icon: '🎒' },
  { to: ROUTES.CARDS, label: 'Cards', icon: '💳' },
  { to: ROUTES.PROFILE, label: 'Profile', icon: '👤' },
];

const BottomNav = () => (
  <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 pb-safe">
    <div className="flex h-16">
      {NAV_ITEMS.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => [
            'flex-1 flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold tracking-wide transition-colors',
            isActive ? 'text-cyan-400' : 'text-slate-500',
          ].join(' ')}
        >
          {({ isActive }) => (
            <>
              <motion.span
                className="text-xl leading-none"
                animate={{ scale: isActive ? 1.15 : 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                {icon}
              </motion.span>
              <span>{label}</span>
              {isActive && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute bottom-1 w-1 h-1 rounded-full bg-cyan-400"
                />
              )}
            </>
          )}
        </NavLink>
      ))}
    </div>
  </nav>
);

export default BottomNav;