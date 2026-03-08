// src/pages/dashboard/DashboardPage.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';
import { useCards } from '../hooks/useCards';
import { ROUTES } from '../utils/constants';
import { getInitials } from '../utils/formatters';

import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import EmptyState from '../components/common/EmptyState';

const StatCard = ({ icon, label, value, onClick }) => (
  <Card onClick={onClick} className="flex-1 text-center">
    <div className="text-2xl mb-1">{icon}</div>
    <p className="text-2xl font-black text-slate-100">{value}</p>
    <p className="text-xs text-slate-400">{label}</p>
  </Card>
);

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { students, fetchStudents, studentsLoading } = useProfile();
  const { cards, fetchCards, activeCards, blockedCards } = useCards();

  useEffect(() => {
    fetchStudents();
    fetchCards();
  }, []);

  const active = cards.filter((c) => c.status === 'active' && !c.blocked).length;
  const blocked = cards.filter((c) => c.blocked).length;

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="px-4 pt-8 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-cyan-400/20 flex items-center justify-center">
            <span className="text-cyan-400 font-bold">{getInitials(user?.name || 'U')}</span>
          </div>
          <div>
            <p className="text-xs text-slate-400">Hello 👋</p>
            <p className="text-base font-bold text-slate-100">{user?.name || 'Parent'}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 flex gap-3 mb-6">
        <StatCard icon="🎒" label="Students" value={students.length} onClick={() => navigate(ROUTES.STUDENTS)} />
        <StatCard icon="💳" label="Cards" value={cards.length} onClick={() => navigate(ROUTES.CARDS)} />
        <StatCard icon="✅" label="Active" value={active} />
      </div>

      {/* Alerts */}
      {blocked > 0 && (
        <motion.div
          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
          className="mx-4 mb-4 bg-rose-500/10 border border-rose-500/30 rounded-xl p-3 flex items-center gap-2"
        >
          <span>🔒</span>
          <p className="text-sm text-rose-300">
            <strong>{blocked}</strong> card{blocked > 1 ? 's are' : ' is'} blocked
          </p>
          <button
            onClick={() => navigate(ROUTES.CARDS)}
            className="ml-auto text-xs text-rose-400 underline"
          >
            Manage
          </button>
        </motion.div>
      )}

      {/* Recent students */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wide">Students</h2>
          <button
            onClick={() => navigate(ROUTES.STUDENTS)}
            className="text-xs text-cyan-400"
          >
            View all
          </button>
        </div>

        {studentsLoading ? (
          <div className="flex justify-center py-8">
            <div className="w-6 h-6 border-2 border-slate-700 border-t-cyan-400 rounded-full animate-spin" />
          </div>
        ) : students.length === 0 ? (
          <EmptyState
            icon="🎒"
            title="No students yet"
            description="Add your child's emergency profile"
            actionLabel="Add Student"
            onAction={() => navigate(ROUTES.STUDENT_NEW)}
          />
        ) : (
          <div className="flex flex-col gap-2">
            {students.slice(0, 3).map((s) => (
              <Card
                key={s.id}
                onClick={() => navigate(ROUTES.STUDENT_DETAIL.replace(':studentId', s.id))}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-cyan-400/15 flex items-center justify-center shrink-0">
                  <span className="text-cyan-400 font-bold text-sm">{getInitials(s.name)}</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-200 text-sm">{s.name}</p>
                  <p className="text-xs text-slate-400">{s.class} · {s.school_name}</p>
                </div>
                <Badge label={s.blood_group} variant="info" />
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;