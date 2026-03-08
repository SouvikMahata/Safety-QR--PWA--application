// src/components/ui/Card.jsx
const Card = ({ children, className = '', onClick, padding = true }) => (
    <div
      onClick={onClick}
      className={[
        'bg-slate-800 rounded-2xl border border-slate-700',
        padding ? 'p-4' : '',
        onClick ? 'cursor-pointer active:scale-[0.99] transition-transform' : '',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
  
  export default Card;