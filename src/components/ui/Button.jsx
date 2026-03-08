// src/components/ui/Button.jsx
import { motion } from 'framer-motion';

const VARIANTS = {
  primary: 'bg-cyan-400 text-slate-900 hover:bg-cyan-300 active:bg-cyan-500 disabled:bg-slate-700 disabled:text-slate-500',
  secondary: 'bg-slate-700 text-slate-100 hover:bg-slate-600 active:bg-slate-800 border border-slate-600',
  danger: 'bg-rose-500 text-white hover:bg-rose-400 active:bg-rose-600 disabled:opacity-50',
  ghost: 'bg-transparent text-cyan-400 hover:bg-slate-800 active:bg-slate-700',
  outline: 'bg-transparent border border-slate-600 text-slate-200 hover:border-cyan-400 hover:text-cyan-400',
};

const SIZES = {
  sm: 'h-8  px-3 text-xs  rounded-lg',
  md: 'h-11 px-5 text-sm  rounded-xl',
  lg: 'h-13 px-6 text-base rounded-2xl',
  icon: 'h-10 w-10 p-0      rounded-xl',
};

const Spinner = () => (
  <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
);

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  className = '',
  onClick,
  type = 'button',
  disabled,
  ...rest
}) => (
  <motion.button
    type={type}
    whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
    transition={{ duration: 0.1 }}
    onClick={onClick}
    disabled={disabled || loading}
    className={[
      'inline-flex items-center justify-center gap-2 font-semibold transition-colors duration-150 cursor-pointer select-none',
      'disabled:cursor-not-allowed',
      VARIANTS[variant],
      SIZES[size],
      fullWidth ? 'w-full' : '',
      className,
    ].join(' ')}
    {...rest}
  >
    {loading ? <Spinner /> : children}
  </motion.button>
);

export default Button;