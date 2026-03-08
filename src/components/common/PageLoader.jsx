// src/components/common/PageLoader.jsx
const PageLoader = ({ message = '' }) => (
  <div className="min-h-dvh flex flex-col items-center justify-center bg-slate-900 gap-4">
    <div className="w-10 h-10 border-[3px] border-slate-700 border-t-cyan-400 rounded-full animate-spin" />
    {message && <p className="text-slate-400 text-sm">{message}</p>}
  </div>
);

export default PageLoader;