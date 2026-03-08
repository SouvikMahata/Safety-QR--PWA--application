// src/pages/NotFoundPage.jsx
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import Button from '../components/ui/Button';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center gap-4 p-6 bg-slate-900">
      <span className="text-7xl font-black text-slate-700">404</span>
      <h1 className="text-xl font-bold text-slate-300">Page not found</h1>
      <p className="text-slate-500 text-sm text-center">The page you're looking for doesn't exist.</p>
      <Button onClick={() => navigate(ROUTES.DASHBOARD)}>Go Home</Button>
    </div>
  );
};

export default NotFoundPage;