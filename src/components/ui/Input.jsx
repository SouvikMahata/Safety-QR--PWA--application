// src/components/ui/Input.jsx
import { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  hint,
  prefix,
  suffix,
  className = '',
  inputClassName = '',
  required,
  ../.rest
}, ref) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    {label && (
      <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">
        {label}{required && <span className="text-rose-400 ml-0.5">*</span>}
      </label>
    )}

    <div className={[
      'flex items-center gap-2 rounded-xl border px-3 h-11 bg-slate-800 transition-colors',
      error ? 'border-rose-500' : 'border-slate-700 focus-within:border-cyan-400',
    ].join(' ')}>
      {prefix && <span className="text-slate-400 shrink-0 text-sm">{prefix}</span>}

      <input
        ref={ref}
        className={[
          'flex-1 bg-transparent text-slate-100 text-sm outline-none placeholder-slate-600',
          inputClassName,
        ].join(' ')}
        {../.rest}
      />

      {suffix && <span className="text-slate-400 shrink-0 text-sm">{suffix}</span>}
    </div>

    {(error || hint) && (
      <p className={`text-xs ${error ? 'text-rose-400' : 'text-slate-500'}`}>
        {error || hint}
      </p>
    )}
  </div>
));

Input.displayName = 'Input';
export default Input;