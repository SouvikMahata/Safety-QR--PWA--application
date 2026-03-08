// src/components/common/EmptyState.jsx
import Button from '../../components/ui/Button';

const EmptyState = ({ icon = '📭', title, description, actionLabel, onAction }) => (
  <div className="flex flex-col items-center justify-center text-center py-16 px-6 gap-4">
    <span className="text-5xl">{icon}</span>
    <div>
      <p className="text-base font-semibold text-slate-200">{title}</p>
      {description && <p className="text-sm text-slate-400 mt-1">{description}</p>}
    </div>
    {actionLabel && onAction && (
      <Button variant="primary" onClick={onAction}>{actionLabel}</Button>
    )}
  </div>
);

export default EmptyState;