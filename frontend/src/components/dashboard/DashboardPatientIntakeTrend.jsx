const BAR_COLORS = ["bg-cyan-200", "bg-cyan-300", "bg-cyan-400", "bg-cyan-500", "bg-blue-400", "bg-blue-500", "bg-blue-600"];

export default function DashboardPatientIntakeTrend({ dashboard, loading }) {
  const series = dashboard?.patientIntakeLast7Days ?? [];

  if (loading) {
    return (
      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
        <div className="mb-6 flex items-center justify-between">
          <div className="h-6 w-48 animate-pulse rounded bg-slate-200" />
          <div className="h-6 w-24 animate-pulse rounded-full bg-slate-100" />
        </div>
        <div className="flex h-44 items-end gap-3">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex-1 animate-pulse rounded-t-lg bg-slate-100" style={{ height: "40%" }} />
          ))}
        </div>
      </article>
    );
  }

  const max = Math.max(1, ...series.map((d) => d.count));
  const totalWeek = series.reduce((acc, d) => acc + d.count, 0);

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Patient Intake Trend</h2>
        <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
          Last 7 days · {totalWeek} new
        </span>
      </div>
      <div className="flex h-44 items-end gap-3">
        {series.map((day, i) => {
          const pct = day.count === 0 ? 8 : Math.max(12, Math.round((day.count / max) * 100));
          const color = BAR_COLORS[i] ?? "bg-cyan-400";
          return (
            <div
              key={day.date}
              title={`${day.date}: ${day.count}`}
              className={`flex-1 rounded-t-lg ${color} min-h-[8px] transition hover:opacity-90`}
              style={{ height: `${pct}%` }}
            />
          );
        })}
      </div>
      <div className="mt-3 grid grid-cols-7 text-center text-xs text-slate-400">
        {series.map((d) => (
          <span key={d.date}>{d.weekday}</span>
        ))}
      </div>
    </article>
  );
}
