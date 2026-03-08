// src/pages/profile/ProfileEditPage.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '../hookform/resolvers/zod';

import { parentProfileSchema } from '../validations/schemas';
import { useProfile } from '../hooks/useProfile';
import { ROUTES } from '../utils/constants';
import { notificationService } from '../services/notificationService';

import PageHeader from '../components/common/PageHeader';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const ProfileEditPage = () => {
  const navigate = useNavigate();
  const { parent, fetchProfile, updateProfile, loading } = useProfile();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(parentProfileSchema),
    defaultValues: { name: '', email: '', address: '' },
  });

  useEffect(() => {
    fetchProfile().then(() => {
      if (parent) reset({ name: parent.name, email: parent.email || '', address: parent.address || '' });
    });
  }, []);

  useEffect(() => {
    if (parent) reset({ name: parent.name, email: parent.email || '', address: parent.address || '' });
  }, [parent, reset]);

  const onSubmit = async (data) => {
    const result = await updateProfile(data);
    if (result.success) {
      notificationService.success('Profile updated');
      navigate(ROUTES.PROFILE);
    } else {
      notificationService.error(result.error || 'Update failed');
    }
  };

  return (
    <div>
      <PageHeader title="Edit Profile" backTo={ROUTES.PROFILE} />

      <form onSubmit={handleSubmit(onSubmit)} className="px-4 flex flex-col gap-4 pb-8">
        <Input
          label="Full Name" placeholder="Your full name"
          error={errors.name?.message} required
          {../.register('name')}
        />
        <Input
          label="Email (optional)" type="email" placeholder="you../example.com"
          error={errors.email?.message}
          {../.register('email')}
        />
        <Input
          label="Address (optional)" placeholder="Your home address"
          {../.register('address')}
        />
        <Button type="submit" loading={loading} fullWidth size="lg">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default ProfileEditPage;