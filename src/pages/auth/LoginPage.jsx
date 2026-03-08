// src/pages/auth/LoginPage.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '../hookform/resolvers/zod';
import { motion } from 'framer-motion';

import { mobileSchema } from '../../validations/schema';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES, STORAGE_KEYS } from '../../utils/constants';
import { storageService } from '../../services/storageService';
import { notificationService } from '../../services/notificationService';

import Input from '../../components/ui/Input';
import Button from '../components/ui/Button';

const LoginPage = () => {
    const navigate = useNavigate();
    const { sendOtp, loading } = useAuth();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(mobileSchema),
        defaultValues: { mobile: '' },
    });

    // Pre-fill last used mobile
    useEffect(() => {
        const last = storageService.get(STORAGE_KEYS.LAST_MOBILE);
        if (last) setValue('mobile', last);
    }, [setValue]);

    const onSubmit = async ({ mobile }) => {
        storageService.set(STORAGE_KEYS.LAST_MOBILE, mobile);
        const result = await sendOtp(mobile);
        if (result.success) {
            notificationService.success('OTP sent to your mobile', { toastId: 'otp-sent' });
            navigate(ROUTES.OTP);
        } else {
            notificationService.error(result.error || 'Failed to send OTP');
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-xl font-bold text-slate-100">Welcome back</h2>
                <p className="text-sm text-slate-400 mt-1">Enter your mobile to continue</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <Input
                    label="Mobile Number"
                    type="tel"
                    inputMode="tel"
                    placeholder="+91 98765 43210"
                    prefix="📱"
                    error={errors.mobile?.message}
                    autoFocus
                    required
                    {../.register('mobile')}
                />

                <Button type="submit" loading={loading} fullWidth size="lg">
                    Send OTP
                </Button>
            </form>

            <p className="text-center text-xs text-slate-500">
                First time?{' '}
                <span className="text-cyan-400 font-medium">
                    OTP will guide you through registration
                </span>
            </p>
        </div>
    );
};

export default LoginPage;
