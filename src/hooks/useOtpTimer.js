// src/hooks/useOtpTimer.js
import { useState, useEffect, useRef, useCallback } from "react";
import { ENV } from "../utils/env";

/**
 * Countdown timer for OTP resend cooldown.
 * ../param {number} initialSeconds  defaults to ENV.OTP_RESEND_INTERVAL
 */
export const useOtpTimer = (initialSeconds = ENV.OTP_RESEND_INTERVAL) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const ref = useRef(null);

  const stop = useCallback(() => {
    clearInterval(ref.current);
    setIsRunning(false);
    setSeconds(0);
  }, []);

  const start = useCallback(() => {
    stop();
    setSeconds(initialSeconds);
    setIsRunning(true);
  }, [initialSeconds, stop]);

  useEffect(() => {
    if (!isRunning) return;
    ref.current = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(ref.current);
          setIsRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(ref.current);
  }, [isRunning]);

  return {
    seconds,
    isRunning,
    canResend: !isRunning && seconds === 0,
    start,
    stop,
    /** Formatted as mm:ss */
    display: `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`,
  };
};
