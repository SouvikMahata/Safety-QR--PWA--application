// src/pages/profile/StudentsPage.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useProfile } from '../hooks/useProfile';
import { ROUTES } from '../utils/constants';

import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import StudentTile from '../components/student/StudentTile';
import Button from '../components/ui/Button';

const StudentsPage = () => {
  const navigate = useNavigate();
  const { students, fetchStudents, studentsLoading } = useProfile();

  useEffect(() => { fetchStudents(); }, []);

  return (
    <div>
      <PageHeader
        title="Students"
        subtitle={`${students.length} registered`}
        action={
          <Button size="sm" onClick={() => navigate(ROUTES.STUDENT_NEW)}>
            + Add
          </Button>
        }
      />

      <div className="px-4 flex flex-col gap-3 pb-6">
        {studentsLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-7 h-7 border-2 border-slate-700 border-t-cyan-400 rounded-full animate-spin" />
          </div>
        ) : students.length === 0 ? (
          <EmptyState
            icon="🎒"
            title="No students added"
            description="Add your child's emergency profile to get started"
            actionLabel="Add Student"
            onAction={() => navigate(ROUTES.STUDENT_NEW)}
          />
        ) : (
          students.map((s) => (
            <StudentTile
              key={s.id}
              student={s}
              onPress={(id) => navigate(ROUTES.STUDENT_DETAIL.replace(':studentId', id))}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default StudentsPage;