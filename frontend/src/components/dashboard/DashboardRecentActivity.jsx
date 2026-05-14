function formatWhen(iso) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

export default function DashboardRecentActivity({ dashboard, loading }) {
  const rows = dashboard?.recentActivity ?? [];

  if (loading) {
    return (
      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
        <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-xl bg-slate-100 p-4">
              <div className="h-4 w-full rounded bg-slate-200" />
              <div className="mt-2 h-3 w-24 rounded bg-slate-100" />
            </div>
          ))}
        </div>
      </article>
    );
  }

  if (rows.length === 0) {
    return (
      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
        <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
        <p className="mt-4 text-sm text-slate-500">No recent patients, appointments, or invoices yet.</p>
      </article>
    );
  }

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
      <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {rows.map((row) => (
          <div key={`${row.text}-${row.at}`} className="rounded-xl bg-slate-50 p-4 text-sm">
            <p>{row.text}</p>
            <p className="mt-2 text-xs text-slate-400">{formatWhen(row.at)}</p>
          </div>
        ))}
      </div>
    </article>
  );
}
