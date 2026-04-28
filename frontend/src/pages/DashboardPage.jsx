import { Link } from "react-router-dom";
import AppShell from "../components/AppShell";

export default function DashboardPage() {
  return (
    <AppShell
      active="dashboard"
      insight={
        <div className="mt-6 hidden rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50 to-emerald-50 p-4 lg:block">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">Hospital Occupancy</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">76%</p>
          <div className="mt-3 h-2 rounded-full bg-cyan-100">
            <div className="h-2 w-3/4 rounded-full bg-cyan-500" />
          </div>
          <p className="mt-2 text-xs text-slate-500">ICU beds currently utilized</p>
        </div>
      }
    >
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

      <main className="px-4 py-6 sm:px-6">
        <section className="mb-4 rounded-2xl border border-cyan-100 bg-gradient-to-r from-cyan-50 to-emerald-50 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">Today Overview</p>
              <h2 className="mt-1 text-xl font-bold text-slate-900">Good morning, Admin 👋</h2>
              <p className="mt-1 text-sm text-slate-600">38 appointments scheduled and 12 discharges pending review.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="rounded-xl border border-cyan-200 bg-white px-4 py-2 text-sm font-semibold text-cyan-700 transition hover:bg-cyan-50">
                View Bed Matrix
              </button>
              <button className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700">
                Generate Daily Report
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between">
              <p className="text-sm text-slate-500">Patients</p>
              <span className="rounded-lg bg-cyan-50 px-2 py-1 text-xs text-cyan-700">🧑</span>
            </div>
            <p className="mt-2 text-3xl font-bold text-slate-900">1,284</p>
            <p className="mt-2 text-xs text-emerald-600">+7.2% this month</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between">
              <p className="text-sm text-slate-500">Doctors</p>
              <span className="rounded-lg bg-blue-50 px-2 py-1 text-xs text-blue-700">👨‍⚕️</span>
            </div>
            <p className="mt-2 text-3xl font-bold text-slate-900">142</p>
            <p className="mt-2 text-xs text-emerald-600">+4 new hires</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between">
              <p className="text-sm text-slate-500">Appointments</p>
              <span className="rounded-lg bg-emerald-50 px-2 py-1 text-xs text-emerald-700">📅</span>
            </div>
            <p className="mt-2 text-3xl font-bold text-slate-900">368</p>
            <p className="mt-2 text-xs text-cyan-600">Today total</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between">
              <p className="text-sm text-slate-500">Revenue</p>
              <span className="rounded-lg bg-violet-50 px-2 py-1 text-xs text-violet-700">💳</span>
            </div>
            <p className="mt-2 text-3xl font-bold text-slate-900">$58,900</p>
            <p className="mt-2 text-xs text-emerald-600">+10.8% growth</p>
          </article>
        </section>

        <section className="mt-6 grid gap-4 xl:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Patient Intake Trend</h2>
              <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">Last 7 days</span>
            </div>
            <div className="flex h-44 items-end gap-3">
              <div className="flex-1 rounded-t-lg bg-cyan-200" style={{ height: "32%" }} />
              <div className="flex-1 rounded-t-lg bg-cyan-300" style={{ height: "48%" }} />
              <div className="flex-1 rounded-t-lg bg-cyan-400" style={{ height: "43%" }} />
              <div className="flex-1 rounded-t-lg bg-cyan-500" style={{ height: "65%" }} />
              <div className="flex-1 rounded-t-lg bg-blue-400" style={{ height: "73%" }} />
              <div className="flex-1 rounded-t-lg bg-blue-500" style={{ height: "81%" }} />
              <div className="flex-1 rounded-t-lg bg-blue-600" style={{ height: "69%" }} />
            </div>
            <div className="mt-3 grid grid-cols-7 text-center text-xs text-slate-400">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Notifications</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="rounded-xl bg-cyan-50 p-3">Emergency case admitted in ICU.</li>
              <li className="rounded-xl bg-emerald-50 p-3">3 lab reports pending review.</li>
              <li className="rounded-xl bg-slate-50 p-3">System backup completed successfully.</li>
            </ul>
          </article>
        </section>

        <section className="mt-6 grid gap-4 xl:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
            <h2 className="text-lg font-semibold text-slate-900">Recent Activity</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-50 p-4 text-sm">Dr. Priya updated patient #P-1029 treatment plan.</div>
              <div className="rounded-xl bg-slate-50 p-4 text-sm">Appointment #A-2214 rescheduled to 4:30 PM.</div>
              <div className="rounded-xl bg-slate-50 p-4 text-sm">New billing invoice generated for Aarav Singh.</div>
              <div className="rounded-xl bg-slate-50 p-4 text-sm">Staff role updated: Reception to Senior Staff.</div>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Quick Actions</h2>
            <div className="mt-4 grid gap-3 text-sm">
              <Link
                to="/patients"
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 font-medium transition hover:border-cyan-300 hover:bg-cyan-50"
              >
                + Add New Patient
              </Link>
              <Link
                to="/appointments"
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 font-medium transition hover:border-cyan-300 hover:bg-cyan-50"
              >
                + Book Appointment
              </Link>
              <Link
                to="/billing"
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 font-medium transition hover:border-cyan-300 hover:bg-cyan-50"
              >
                + Generate Invoice
              </Link>
              <Link
                to="/admin-tools"
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 font-medium transition hover:border-cyan-300 hover:bg-cyan-50"
              >
                Open Reports Panel
              </Link>
            </div>
          </article>
        </section>
      </main>
    </AppShell>
  );
}
