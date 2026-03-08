// src/components/ui/Select.jsx
import { forwardRef } from 'react';

const Select = forwardRef(({
  label,
  error,
  options =[],   // [{ value, label }] or ['string']
  placeholder = 'Select…',
  className = '',
  required,
  ../.rest
}, ref) => {
  const normalised = options.map((o) =>
    typeof o === 'string' ? { value: o, label: o } : o,
  );

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-xs font-semibold text-slate-400 tracking-wide uppercase">
          {label}{required && <span className="text-rose-400 ml-0.5">*</span>}
        </label>
      )}

      <div className={[
        'flex items-center rounded-xl border px-3 h-11 bg-slate-800 transition-colors',
        error ? 'border-rose-500' : 'border-slate-700 focus-within:border-cyan-400',
      ].join(' ')}>
        <select
          ref={ref}
          className="flex-1 bg-transparent text-slate-100 text-sm outline-none appearance-none"
          {../.rest}
        >
          <option value="" disabled className="bg-slate-800">{placeholder}</option>
          {normalised.map((o) => (
            <option key={o.value} value={o.value} className="bg-slate-800">{o.label}</option>
          ))}
        </select>
        <span className="text-slate-500 text-xs pointer-events-none ml-1">▾</span>
      </div>

      {error && <p className="text-xs text-rose-400">{error}</p>}
    </div>
  );
});

Select.displayName = 'Select';
export default Select;