// src/components/ui/Toggle.jsx
import { motion } from 'framer-motion';

const Toggle = ({ checked, onChange, disabled = false, size = 'md' }) => {
  const dims = size === 'sm'
    ? { track: 'w-9 h-5',  knob: 'w-4 h-4',  on: 14, off: 2 }
    : { track: 'w-12 h-6', knob: 'w-5 h-5',  on: 18, off: 2 };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange?.(!checked)}
      className={[
        'relative inline-flex shrink-0 items-center rounded-full transition-colors duration-200',
        dims.track,
        checked ? 'bg-cyan-400' : 'bg-slate-600',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      ].join(' ')}
    >
      <motion.span
        layout
        animate={{ x: checked ? dims.on : dims.off }}
        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        className={`absolute bg-white rounded-full shadow ${dims.knob}`}
      />
    </button>
  );
};

export default Toggle;