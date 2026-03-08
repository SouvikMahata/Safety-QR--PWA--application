// src/pages/auth/OtpPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth }     from '@hooks/useAuth';
import { useOtpTimer } from '@hooks/useOtpTimer';
import { ROUTES }      from '@utils/constants';
import { maskMobile }  from '@utils/formatters';
import { notificationService } from '@services/notificationService';

import OtpInput from '@components/forms/OtpInput';
import Button   from '@components/ui/Button';

const OtpPage = () => {
  const navigate = useNavigate();
  const { verifyOtp, sendOtp, mobile, loading, clearError } = useAuth();
  const { seconds, canResend, display, start } = useOtpTimer();
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');

  useEffect(() => {
    if (!mobile) { navigate(ROUTES.LOGIN, { replace: true }); return; }
    start();
    return () => clearError();
  }, [mobile]);

  const handleVerify = async () => {
    if (otp.length < 6) { setOtpError('Enter all 6 digits'); return; }
    setOtpError('');
    const result = await verifyOtp(otp);
    if (result.success) {
      if (result.isNewUser) navigate(ROUTES.REGISTER, { replace: true });
      else                  navigate(ROUTES.DASHBOARD, { replace: true });
    } else {
      setOtpError(result.error || 'Invalid OTP, please try again');
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setOtp('');
    setOtpError('');
    const result = await sendOtp(mobile);
    if (result.success) {
      start();
      notificationService.success('OTP resent!', { toastId: 'otp-resent' });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Verify OTP</h2>
        <p className="text-sm text-slate-400 mt-1">
          Sent to <span className="text-cyan-400 font-mono">{maskMobile(mobile || '')}</span>
        </p>
      </div>

      <OtpInput value={otp} onChange={setOtp} error={otpError} />

      <Button
        fullWidth
        size="lg"
        loading={loading}
        disabled={otp.length < 6}
        onClick={handleVerify}
      >
        Verify OTP
      </Button>

      <div className="text-center">
        {canResend ? (
          <button
            onClick={handleResend}
            className="text-cyan-400 text-sm font-semibold hover:underline"
          >
            Resend OTP
          </button>
        ) : (
          <p className="text-slate-500 text-sm">
            Resend in <span className="text-slate-300 font-mono">{display}</span>
          </p>
        )}
      </div>

      <button
        onClick={() => navigate(ROUTES.LOGIN)}
        className="text-slate-500 text-xs text-center hover:text-slate-300"
      >
        ← Change mobile number
      </button>
    </div>
  );
};

export default OtpPage;