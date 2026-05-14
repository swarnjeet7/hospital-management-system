export default function SidebarStatInsight({ label, value, caption }) {
  return (
    <div className="mt-6 hidden rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50 to-emerald-50 p-4 lg:block">
      <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{caption}</p>
    </div>
  );
}
