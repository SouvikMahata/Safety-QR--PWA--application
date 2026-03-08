// src/components/ui/Badge.jsx
const COLORS = {
    active:   'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    inactive: 'bg-slate-600/30  text-slate-400  border-slate-600/40',
    blocked:  'bg-rose-500/15   text-rose-400   border-rose-500/30',
    warning:  'bg-amber-500/15  text-amber-400  border-amber-500/30',
    info:     'bg-cyan-500/15   text-cyan-400   border-cyan-500/30',
  };
  
  const Badge = ({ label, variant = 'info', className = '' }) => (
    <span className={[
      'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border',
      COLORS[variant] ?? COLORS.info,
      className,
    ].join(' ')}>
      {label}
    </span>
  );
  
  export default Badge;