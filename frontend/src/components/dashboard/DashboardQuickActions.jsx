import { Link } from "react-router-dom";

const ACTIONS = [
  { to: "/patients", label: "+ Add New Patient" },
  { to: "/appointments", label: "+ Book Appointment" },
  { to: "/billing", label: "+ Generate Invoice" },
  { to: "/admin-tools", label: "Open Reports Panel" },
];

export default function DashboardQuickActions() {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
      <div className="mt-4 grid gap-3 text-sm">
        {ACTIONS.map((a) => (
          <Link
            key={a.to}
            to={a.to}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 font-medium transition hover:border-cyan-300 hover:bg-cyan-50"
          >
            {a.label}
          </Link>
        ))}
      </div>
    </article>
  );
}
