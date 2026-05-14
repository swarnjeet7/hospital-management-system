export default function DashboardNotifications({ dashboard, loading }) {
  const items = dashboard?.notifications ?? [];

  if (loading) {
    return (
      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Notifications</h2>
        <ul className="mt-4 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <li key={i} className="animate-pulse rounded-xl bg-slate-100 p-3">
              <div className="h-4 w-full rounded bg-slate-200" />
            </li>
          ))}
        </ul>
      </article>
    );
  }

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Notifications</h2>
      <ul className="mt-4 space-y-3 text-sm">
        {items.map((n, i) => (
          <li key={`${i}-${n.text}`} className={`rounded-xl p-3 ${n.tone}`}>
            {n.text}
          </li>
        ))}
      </ul>
    </article>
  );
}
