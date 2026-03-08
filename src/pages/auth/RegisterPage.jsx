// src/pages/auth/RegisterPage.jsx
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { registrationSchema } from '@validations/schemas';
import { useAuth } from '@hooks/useAuth';
import { ROUTES } from '@utils/constants';
import { notificationService } from '@services/notificationService';

import Input from '@components/ui/Input';
import Button from '@components/ui/Button';

const RegisterPage = () => {
    const navigate = useNavigate();
    const { register: registerUser, mobile, loading } = useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registrationSchema),
        defaultValues: { mobile: mobile || '', nonce: '', card_number: '' },
    });

    const onSubmit = async ({ nonce, card_number }) => {
        const result = await registerUser({ nonce, card_number });
        if (result.success) {
            notificationService.success('Registration successful! 🎉');
            navigate(ROUTES.DASHBOARD, { replace: true });
        } else {
            notificationService.error(result.error || 'Registration failed');
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-xl font-bold text-slate-100">Activate Your Card</h2>
                <p className="text-sm text-slate-400 mt-1">
                    Enter the details printed on your physical SafetyQR card
                </p>
            </div>

            {/* Card visual hint */}
            <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 text-sm text-slate-400">
                <p className="font-semibold text-slate-300 mb-1">📦 Find these on your card:</p>
                <ul className="list-disc list-inside space-y-0.5 text-xs">
                    <li><strong className="text-slate-200">Card Number</strong> — printed front-center</li>
                    <li><strong className="text-slate-200">Nonce</strong> — printed on the back (scratch to reveal)</li>
                </ul>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <Input
                    label="Mobile"
                    value={mobile || ''}
                    disabled
                    prefix="📱"
                    hint="Verified mobile number"
                />

                <Input
                    label="Card Number"
                    placeholder="e.g. SQRA-1234-5678"
                    autoCapitalize="characters"
                    error={errors.card_number?.message}
                    required
                    {...register('card_number')}
                />

                <Input
                    label="Nonce (Scratch Code)"
                    type="password"
                    placeholder="6–12 character code"
                    error={errors.nonce?.message}
                    required
                    {...register('nonce')}
                />

                <Button type="submit" loading={loading} fullWidth size="lg">
                    Activate &amp; Continue
                </Button>
            </form>
        </div>
    );
};

export default RegisterPage;
