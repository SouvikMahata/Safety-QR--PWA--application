// src/pages/profile/ProfilePage.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth }    from '@hooks/useAuth';
import { useProfile } from '@hooks/useProfile';
import { useConfirm } from '@hooks/useConfirm';
import { ROUTES }     from '@utils/constants';
import { formatPhone, getInitials } from '@utils/formatters';
import { notificationService } from '@services/notificationService';

import PageHeader from '@components/common/PageHeader';
import Card       from '@components/ui/Card';
import Button     from '@components/ui/Button';

const MenuItem = ({ icon, label, onClick, danger }) => (
  <button
    onClick={onClick}
    className={[
      'flex items-center gap-3 w-full py-3 px-1 border-b border-slate-800 last:border-0',
      'text-left transition-colors active:bg-slate-800/50',
      danger ? 'text-rose-400' : 'text-slate-200',
    ].join(' ')}
  >
    <span className="text-lg w-6 text-center">{icon}</span>
    <span className="text-sm font-medium flex-1">{label}</span>
    {!danger && <span className="text-slate-600 text-sm">›</span>}
  </button>
);

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout }            = useAuth();
  const { parent, fetchProfile }    = useProfile();
  const confirm                     = useConfirm();

  useEffect(() => { fetchProfile(); }, []);

  const handleLogout = async () => {
    const ok = await confirm({ title: 'Logout?', message: 'You will be signed out of this device.' });
    if (!ok) return;
    await logout();
    navigate(ROUTES.LOGIN, { replace: true });
  };

  return (
    <div>
      <PageHeader title="Profile" />

      <div className="px-4 flex flex-col gap-4 pb-8">
        {/* Avatar card */}
        <Card className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-cyan-400/20 flex items-center justify-center shrink-0">
            <span className="text-2xl font-black text-cyan-400">
              {getInitials(user?.name || 'P')}
            </span>
          </div>
          <div>
            <p className="font-bold text-slate-100 text-base">{user?.name || 'Parent'}</p>
            <p className="text-sm text-slate-400 font-mono">{formatPhone(user?.mobile || '')}</p>
          </div>
        </Card>

        {/* Account */}
        <Card padding={false} className="px-3">
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wide px-1 pt-3 pb-1">Account</p>
          <MenuItem icon="✏️" label="Edit Profile"  onClick={() => navigate(ROUTES.PROFILE_EDIT)} />
          <MenuItem icon="🎒" label="My Students"   onClick={() => navigate(ROUTES.STUDENTS)} />
          <MenuItem icon="💳" label="My Cards"      onClick={() => navigate(ROUTES.CARDS)} />
        </Card>

        {/* Session */}
        <Card padding={false} className="px-3">
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wide px-1 pt-3 pb-1">Session</p>
          <MenuItem icon="🚪" label="Logout" onClick={handleLogout} danger />
        </Card>

        {/* App version */}
        <p className="text-center text-xs text-slate-600 mt-2">SafetyQR v1.0.0</p>
      </div>
    </div>
  );
};

export default ProfilePage;