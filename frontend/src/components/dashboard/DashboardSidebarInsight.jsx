export default function DashboardSidebarInsight({ dashboard, loading }) {
  if (loading) {
    return (
      <div className="mt-6 hidden rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50 to-emerald-50 p-4 lg:block">
        <div className="h-3 w-32 animate-pulse rounded bg-cyan-100" />
        <div className="mt-2 h-8 w-16 animate-pulse rounded bg-white/50" />
        <div className="mt-3 h-2 animate-pulse rounded-full bg-cyan-100" />
      </div>
    );
  }

  const pct = dashboard?.sidebar?.loadPercent ?? 0;
  const today = dashboard?.sidebar?.appointmentsToday ?? 0;
  const pending = dashboard?.sidebar?.pendingInvoiceCount ?? 0;
  const width = `${Math.min(100, Math.max(4, pct))}%`;

  return (
    <div className="mt-6 hidden rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50 to-emerald-50 p-4 lg:block">
      <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">Clinic load (today)</p>
      <p className="mt-2 text-2xl font-bold text-slate-900">{pct}%</p>
      <div className="mt-3 h-2 rounded-full bg-cyan-100">
        <div className="h-2 rounded-full bg-cyan-500 transition-all" style={{ width }} />
      </div>
      <p className="mt-2 text-xs text-slate-500">
        Based on {today} today appointment{today === 1 ? "" : "s"} vs staff capacity. {pending} pending invoice
        {pending === 1 ? "" : "s"}.
      </p>
    </div>
  );
}
