// src/pages/profile/StudentDetailPage.jsx
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useProfile } from '../hooks/useProfile';
import { useConfirm } from '../hooks/useConfirm';
import { ROUTES } from '../utils/constants';
import { formatDate, calcAge, getInitials } from '../utils/formatters';
import { notificationService } from '../services/notificationService';

import PageHeader from '../components/common/PageHeader';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const Section = ({ title, children }) => (
  <div className="mb-4">
    <p className="text-xs text-slate-500 uppercase font-bold tracking-wide mb-2">{title}</p>
    {children}
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between py-2 border-b border-slate-800 last:border-0">
    <span className="text-sm text-slate-400">{label}</span>
    <span className="text-sm text-slate-200 font-medium text-right max-w-[60%]">{value || '—'}</span>
  </div>
);

const StudentDetailPage = () => {
  const navigate = useNavigate();
  const { studentId } = useParams();
  const confirm = useConfirm();

  const { getStudentById, fetchStudents, deleteStudent, studentsLoading } = useProfile();
  const student = getStudentById(studentId);

  useEffect(() => { if (!student) fetchStudents(); }, []);

  const handleDelete = async () => {
    const ok = await confirm({
      title: 'Delete Student?',
      message: `This will permanently remove ${student?.name}'s profile and all linked cards.`,
    });
    if (!ok) return;
    const result = await deleteStudent(studentId);
    if (result.success) {
      notificationService.success('Student profile deleted');
      navigate(ROUTES.STUDENTS, { replace: true });
    } else {
      notificationService.error(result.error || 'Delete failed');
    }
  };

  if (studentsLoading || !student) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="w-7 h-7 border-2 border-slate-700 border-t-cyan-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Student Profile"
        backTo={ROUTES.STUDENTS}
        action={
          <Button
            size="sm" variant="outline"
            onClick={() => navigate(ROUTES.STUDENT_EDIT.replace(':studentId', studentId))}
          >
            Edit
          </Button>
        }
      />

      <div className="px-4 pb-8 flex flex-col gap-4">
        {/* Avatar + name */}
        <div className="flex items-center gap-4 bg-slate-800 rounded-2xl p-4 border border-slate-700">
          {student.photo_url ? (
            <img src={student.photo_url} alt={student.name}
              className="w-16 h-16 rounded-full object-cover shrink-0" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-cyan-400/20 flex items-center justify-center shrink-0">
              <span className="text-2xl font-black text-cyan-400">{getInitials(student.name)}</span>
            </div>
          )}
          <div>
            <h2 className="text-lg font-bold text-slate-100">{student.name}</h2>
            <p className="text-sm text-slate-400">{student.class} · {student.school_name}</p>
            <div className="flex gap-2 mt-1">
              <Badge label={student.blood_group} variant="info" />
              <Badge label={student.gender} variant="inactive" />
            </div>
          </div>
        </div>

        {/* Basic info */}
        <Card>
          <Section title="Basic Info">
            <InfoRow label="Date of Birth" value={`${formatDate(student.dob)} (${calcAge(student.dob)})`} />
            <InfoRow label="Blood Group" value={student.blood_group} />
            <InfoRow label="Allergies" value={student.allergies || 'None'} />
            <InfoRow label="Medical Notes" value={student.medical_conditions || 'None'} />
          </Section>
        </Card>

        {/* Emergency contacts */}
        <div>
          <p className="text-xs text-slate-500 uppercase font-bold tracking-wide mb-2">
            Emergency Contacts
          </p>
          <div className="flex flex-col gap-2">
            {student.emergency_contacts?.map((c, i) => (
              <Card key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-sm shrink-0">
                  {getInitials(c.name)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-200 text-sm">{c.name}</p>
                  <p className="text-xs text-slate-400">{c.relation}</p>
                </div>
                <a
                  href={`tel:${c.mobile}`}
                  className="text-cyan-400 font-mono text-xs underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {c.mobile}
                </a>
              </Card>
            ))}
          </div>
        </div>

        {/* Danger zone */}
        <div className="mt-4 pt-4 border-t border-slate-800">
          <Button variant="danger" size="sm" fullWidth onClick={handleDelete}>
            🗑 Delete Student Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailPage;