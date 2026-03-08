// src/components/student/StudentTile.jsx
import { motion } from 'framer-motion';
import { getInitials, calcAge } from '../utils/formatters';
import Badge from '../components/ui/Badge';

const StudentTile = ({ student, onPress }) => (
  <motion.div
    whileTap={{ scale: 0.98 }}
    onClick={() => onPress?.(student.id)}
    className="flex items-center gap-3 bg-slate-800 rounded-2xl p-4 border border-slate-700 cursor-pointer"
  >
    {/* Avatar */}
    {student.photo_url ? (
      <img
        src={student.photo_url}
        alt={student.name}
        className="w-12 h-12 rounded-full object-cover shrink-0"
      />
    ) : (
      <div className="w-12 h-12 rounded-full bg-cyan-400/20 flex items-center justify-center shrink-0">
        <span className="text-cyan-400 font-bold text-base">{getInitials(student.name)}</span>
      </div>
    )}

    {/* Info */}
    <div className="flex-1 min-w-0">
      <p className="font-semibold text-slate-100 truncate">{student.name}</p>
      <p className="text-xs text-slate-400 mt-0.5">
        {student.class} · {calcAge(student.dob)} · {student.blood_group}
      </p>
    </div>

    {/* Blood group badge */}
    <Badge label={student.blood_group} variant="info" />
  </motion.div>
);

export default StudentTile;