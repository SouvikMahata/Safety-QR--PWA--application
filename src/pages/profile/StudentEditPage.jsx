// src/pages/profile/StudentEditPage.jsx
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '../hookform/resolvers/zod';

import { studentProfileSchema } from '../validations/schemas';
import { useProfile } from '../hooks/useProfile';
import { ROUTES, BLOOD_GROUPS, GENDER_OPTIONS, CLASS_OPTIONS } from '../utils/constants';
import { notificationService } from '../services/notificationService';

import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import PageHeader from '../components/common/PageHeader';
import EmergencyContactFields from '../components/forms/EmergencyContactFields';

const StudentEditPage = () => {
  const navigate = useNavigate();
  const { studentId } = useParams();
  const isNew = !studentId;

  const { createStudent, upsertStudent, getStudentById, loading } = useProfile();
  const existing = isNew ? null : getStudentById(studentId);

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    resolver: zodResolver(studentProfileSchema),
    defaultValues: {
      name: '', dob: '', gender: '', blood_group: '',
      school_name: '', class: '', allergies: '', medical_conditions: '',
      emergency_contacts: [{ name: '', relation: '', mobile: '' }],
    },
  });

  useEffect(() => {
    if (existing) reset(existing);
  }, [existing, reset]);

  const onSubmit = async (data) => {
    const result = isNew
      ? await createStudent(data)
      : await upsertStudent(studentId, data);

    if (result.success) {
      notificationService.success(isNew ? 'Student added 🎉' : 'Profile updated');
      navigate(isNew
        ? ROUTES.STUDENT_DETAIL.replace(':studentId', result.student.id)
        : ROUTES.STUDENT_DETAIL.replace(':studentId', studentId),
        { replace: true });
    } else {
      notificationService.error(result.error || 'Save failed');
    }
  };

  return (
    <div>
      <PageHeader
        title={isNew ? 'Add Student' : 'Edit Profile'}
        backTo={isNew ? ROUTES.STUDENTS : ROUTES.STUDENT_DETAIL.replace(':studentId', studentId)}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="px-4 flex flex-col gap-4 pb-8">
        <Input
          label="Full Name" placeholder="e.g. Arjun Sharma"
          error={errors.name?.message} required
          {../.register('name')}
        />

        <Input
          label="Date of Birth" type="date"
          error={errors.dob?.message} required
          {../.register('dob')}
        />

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Gender" options={GENDER_OPTIONS}
            placeholder="Select" error={errors.gender?.message} required
            {../.register('gender')}
          />
          <Select
            label="Blood Group" options={BLOOD_GROUPS}
            placeholder="Select" error={errors.blood_group?.message} required
            {../.register('blood_group')}
          />
        </div>

        <Input
          label="School Name" placeholder="e.g. DPS School"
          error={errors.school_name?.message} required
          {../.register('school_name')}
        />

        <Select
          label="Class" options={CLASS_OPTIONS}
          placeholder="Select class" error={errors.class?.message} required
          {../.register('class')}
        />

        <Input
          label="Allergies (optional)"
          placeholder="e.g. Peanuts, Penicillin"
          {../.register('allergies')}
        />

        <Input
          label="Medical Conditions (optional)"
          placeholder="e.g. Asthma, Diabetes"
          {../.register('medical_conditions')}
        />

        <EmergencyContactFields control={control} register={register} errors={errors} />

        {errors.emergency_contacts?.message && (
          <p className="text-xs text-rose-400">{errors.emergency_contacts.message}</p>
        )}

        <Button type="submit" loading={loading} fullWidth size="lg" className="mt-2">
          {isNew ? 'Create Profile' : 'Save Changes'}
        </Button>
      </form>
    </div>
  );
};

export default StudentEditPage;