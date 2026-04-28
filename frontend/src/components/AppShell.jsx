import { Link } from "react-router-dom";

function ShellNavLink({ to, active, children }) {
  return (
    <Link
      to={to}
      className={
        active
          ? "rounded-xl bg-cyan-50 px-3 py-2.5 font-semibold text-cyan-700"
          : "rounded-xl px-3 py-2.5 font-medium text-slate-600 transition hover:bg-slate-100"
      }
    >
      {children}
    </Link>
  );
}

export default function AppShell({ active, insight, children }) {
  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-700 lg:pl-72">
      <aside className="w-full border-b border-slate-200 bg-white px-4 py-5 lg:fixed lg:inset-y-0 lg:left-0 lg:w-72 lg:border-b-0 lg:border-r lg:px-5">
        <h1 className="text-xl font-bold text-slate-900">MediCore HMS</h1>
        <p className="text-xs text-slate-500">Hospital Admin Panel</p>
        <nav className="mt-6 grid grid-cols-2 gap-2 text-sm sm:grid-cols-3 lg:grid-cols-1">
          <ShellNavLink to="/dashboard" active={active === "dashboard"}>
            📊 Dashboard
          </ShellNavLink>
          <ShellNavLink to="/patients" active={active === "patients"}>
            🧑‍⚕️ Patient Management
          </ShellNavLink>
          <ShellNavLink to="/doctors" active={active === "doctors"}>
            👨‍⚕️ Doctor Management
          </ShellNavLink>
          <ShellNavLink to="/appointments" active={active === "appointments"}>
            📅 Appointment System
          </ShellNavLink>
          <ShellNavLink to="/billing" active={active === "billing"}>
            💳 Billing System
          </ShellNavLink>
          <ShellNavLink to="/admin-tools" active={active === "admin-tools"}>
            📈 Reports
          </ShellNavLink>
          <ShellNavLink to="/settings" active={active === "settings"}>
            ⚙️ Settings
          </ShellNavLink>
        </nav>

        {insight}
      </aside>

      {children}
    </div>
  );
}
