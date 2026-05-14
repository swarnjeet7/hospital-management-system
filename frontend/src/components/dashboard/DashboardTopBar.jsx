import { Link } from "react-router-dom";

export default function DashboardTopBar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search patient, doctor, invoice..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
          />
          <span className="absolute left-3 top-2.5 text-slate-400">🔎</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative rounded-xl border border-slate-200 px-3 py-2 text-sm transition hover:bg-slate-50">
            🔔
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-rose-500" />
          </button>
          <div className="group relative">
            <button className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium transition hover:bg-slate-50">Admin ▾</button>
            <div className="invisible absolute right-0 mt-2 w-44 rounded-xl border border-slate-200 bg-white p-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100">
              <Link to="/settings" className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-100">
                Profile
              </Link>
              <Link to="/login" className="block rounded-lg px-3 py-2 text-sm text-rose-600 hover:bg-rose-50">
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
