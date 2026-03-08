// src/components/common/PageHeader.jsx
import { useNavigate } from 'react-router-dom';

const PageHeader = ({ title, subtitle, backTo, action }) => {
  const navigate = useNavigate();
  return (
    <header className="flex items-center gap-3 px-4 pt-5 pb-3">
      {backTo && (
        <button
          onClick={() => navigate(backTo)}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 shrink-0"
          aria-label="Go back"
        >
          ←
        </button>
      )}
      <div className="flex-1 min-w-0">
        <h1 className="text-xl font-bold text-slate-100 truncate">{title}</h1>
        {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
};

export default PageHeader;