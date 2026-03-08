// src/components/card/CardTile.jsx
import { motion } from 'framer-motion';
import Badge from '@components/ui/Badge';
import Toggle from '@components/ui/Toggle';
import { formatCardNumber } from '@utils/formatters';

const CardTile = ({ card, onToggleStatus, onToggleBlock, onPress, actionLoading }) => {
  const isBlocked  = card.blocked;
  const isActive   = card.status === 'active';
  const isLoading  = actionLoading;

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onPress}
      className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 p-4 cursor-pointer"
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs text-slate-500 font-mono mb-0.5">CARD NO.</p>
          <p className="font-mono font-bold text-slate-200 tracking-widest text-sm">
            {formatCardNumber(card.card_number)}
          </p>
        </div>
        <div className="flex gap-2">
          {isBlocked && <Badge label="Blocked" variant="blocked" />}
          <Badge label={isActive ? 'Active' : 'Inactive'} variant={isActive ? 'active' : 'inactive'} />
        </div>
      </div>

      {/* Student name */}
      {card.student_name && (
        <p className="text-sm text-slate-300 mb-3">
          👤 {card.student_name}
        </p>
      )}

      {/* Controls */}
      <div
        className="flex items-center justify-between pt-3 border-t border-slate-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Active</span>
          <Toggle
            checked={isActive}
            onChange={() => onToggleStatus?.(card.id, isActive ? 'inactive' : 'active')}
            disabled={isBlocked || isLoading}
            size="sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Block</span>
          <Toggle
            checked={isBlocked}
            onChange={() => onToggleBlock?.(card.id, !isBlocked)}
            disabled={isLoading}
            size="sm"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default CardTile;