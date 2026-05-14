function greetingForHour(h) {
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function DashboardWelcomeBanner({ dashboard, loading }) {
  if (loading) {
    return (
      <section className="mb-4 rounded-2xl border border-cyan-100 bg-gradient-to-r from-cyan-50 to-emerald-50 p-4 sm:p-5">
        <div className="h-4 w-32 animate-pulse rounded bg-cyan-100" />
        <div className="mt-3 h-8 w-64 max-w-full animate-pulse rounded bg-white/60" />
        <div className="mt-2 h-4 w-full max-w-lg animate-pulse rounded bg-white/40" />
      </section>
    );
  }

  const name = dashboard?.viewer?.name?.trim() || "there";
  const hour = new Date().getHours();
  const greet = greetingForHour(hour);
  const sched = dashboard?.scheduledAppointmentsToday ?? 0;
  const pending = dashboard?.pendingInvoiceCount ?? 0;
  const todayAppt = dashboard?.appointmentsToday ?? 0;

  return (
    <section className="mb-4 rounded-2xl border border-cyan-100 bg-gradient-to-r from-cyan-50 to-emerald-50 p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">Today overview</p>
          <h2 className="mt-1 text-xl font-bold text-slate-900">
            {greet}, {name} 👋
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            {todayAppt} appointment{todayAppt === 1 ? "" : "s"} on today&apos;s calendar
            {sched > 0 ? ` (${sched} still scheduled)` : ""}. {pending} invoice{pending === 1 ? "" : "s"} pending payment.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-xl border border-cyan-200 bg-white px-4 py-2 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-50"
          >
            View Bed Matrix
          </button>
          <button
            type="button"
            className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700"
          >
            Generate Daily Report
          </button>
        </div>
      </div>
    </section>
  );
}
