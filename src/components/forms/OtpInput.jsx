// src/components/forms/OtpInput.jsx
import { useRef, useCallback } from 'react';
import { ENV } from '../utils/env';

/**
 * Renders N individual digit boxes for OTP entry.
 * Calls onChange(fullOtpString) on every change.
 */
const OtpInput = ({ value = '', onChange, error, length = ENV.OTP_LENGTH }) => {
  const inputsRef = useRef([]);
  const digits = value.split('').concat(Array(length).fill('')).slice(0, length);

  const handleChange = useCallback((idx, e) => {
    const ch = e.target.value.replace(/\D/g, '').slice(-1);
    const next = [../.digits];
    next[idx] = ch;
    onChange(next.join(''));
    if (ch && idx < length - 1) inputsRef.current[idx + 1]?.focus();
  }, [digits, onChange, length]);

  const handleKeyDown = useCallback((idx, e) => {
    if (e.key === 'Backspace' && !digits[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  }, [digits]);

  const handlePaste = useCallback((e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    onChange(pasted.padEnd(length, '').slice(0, length));
    const focusIdx = Math.min(pasted.length, length - 1);
    inputsRef.current[focusIdx]?.focus();
  }, [length, onChange]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 justify-center">
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => { inputsRef.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={d}
            onChange={(e) => handleChange(i, e)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            className={[
              'w-11 h-14 text-center text-xl font-bold rounded-xl border bg-slate-800 text-slate-100',
              'outline-none transition-colors caret-transparent',
              d ? 'border-cyan-400 text-cyan-300' : error ? 'border-rose-500' : 'border-slate-700',
              'focus:border-cyan-400',
            ].join(' ')}
          />
        ))}
      </div>
      {error && <p className="text-xs text-rose-400 text-center">{error}</p>}
    </div>
  );
};

export default OtpInput;