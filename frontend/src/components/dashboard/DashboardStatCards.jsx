function formatInt(n) {
  return new Intl.NumberFormat().format(n);
}

function formatCurrency(amountStr) {
  const n = Number(amountStr);
  if (Number.isNaN(n)) return "—";
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function buildStats(dashboard) {
  const s = dashboard?.summary;
  if (!s) return null;
  const pending = dashboard.pendingInvoiceCount ?? 0;
  const today = dashboard.appointmentsToday ?? 0;
  const onLeave = dashboard.doctorsOnLeave ?? 0;
  return [
    {
      label: "Patients",
      value: formatInt(s.patients),
      hint: `${formatInt(s.patients)} total in system`,
      hintClass: "text-slate-500",
      emoji: "🧑",
      emojiBg: "bg-cyan-50",
      emojiText: "text-cyan-700",
    },
    {
      label: "Doctors",
      value: formatInt(s.doctors),
      hint: onLeave > 0 ? `${onLeave} on leave` : `${formatInt(s.doctors)} on staff`,
      hintClass: onLeave > 0 ? "text-amber-600" : "text-emerald-600",
      emoji: "👨‍⚕️",
      emojiBg: "bg-blue-50",
      emojiText: "text-blue-700",
    },
    {
      label: "Appointments",
      value: formatInt(s.appointments),
      hint: `Today on calendar: ${formatInt(today)}`,
      hintClass: "text-cyan-600",
      emoji: "📅",
      emojiBg: "bg-emerald-50",
      emojiText: "text-emerald-700",
    },
    {
      label: "Revenue",
      value: formatCurrency(s.invoicesTotal),
      hint: pending > 0 ? `${formatInt(pending)} invoice(s) pending` : "Invoice totals (all statuses)",
      hintClass: pending > 0 ? "text-amber-600" : "text-emerald-600",
      emoji: "💳",
      emojiBg: "bg-violet-50",
      emojiText: "text-violet-700",
    },
  ];
}

export default function DashboardStatCards({ dashboard, loading }) {
  const stats = buildStats(dashboard);

  if (loading || !stats) {
    return (
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <article
            key={i}
            className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="h-4 w-24 rounded bg-slate-200" />
            <div className="mt-4 h-9 w-20 rounded bg-slate-200" />
            <div className="mt-3 h-3 w-32 rounded bg-slate-100" />
          </article>
        ))}
      </section>
    );
  }

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <article
          key={item.label}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="flex items-start justify-between">
            <p className="text-sm text-slate-500">{item.label}</p>
            <span className={`rounded-lg px-2 py-1 text-xs ${item.emojiBg} ${item.emojiText}`}>{item.emoji}</span>
          </div>
          <p className="mt-2 text-3xl font-bold text-slate-900">{item.value}</p>
          <p className={`mt-2 text-xs ${item.hintClass}`}>{item.hint}</p>
        </article>
      ))}
    </section>
  );
}
