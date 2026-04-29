import AppShell from "../components/AppShell";

export default function AppointmentsPage() {
  return (
    <AppShell
      active="appointments"
      insight={
        <div className="mt-6 hidden rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50 to-emerald-50 p-4 lg:block">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">Today&apos;s Queue</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">38</p>
          <p className="mt-1 text-xs text-slate-500">Appointments scheduled today</p>
        </div>
      }
    >
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Appointment System</h2>
            <p className="text-xs text-slate-500">Book, manage, and cancel appointments.</p>
          </div>
          <button className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700">
            View Calendar
          </button>
        </div>
      </header>

      <main className="px-4 py-6 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-3">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Book Appointment</h3>
            <form className="mt-4 space-y-3 text-sm">
              <input
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                placeholder="Patient Name"
              />
              <input
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                placeholder="Doctor Name"
              />
              <input
                type="date"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
              />
              <input
                type="time"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
              />
              <button type="button" className="w-full rounded-xl bg-cyan-600 px-4 py-2.5 font-semibold text-white transition hover:bg-cyan-700">
                Book Now
              </button>
            </form>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-slate-900">Appointment List</h3>
              <input
                type="text"
                placeholder="Search appointment..."
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100 sm:w-56"
              />
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-xs uppercase text-slate-500">
                    <th className="px-3 py-2">ID</th>
                    <th className="px-3 py-2">Patient</th>
                    <th className="px-3 py-2">Doctor</th>
                    <th className="px-3 py-2">Date & Time</th>
                    <th className="px-3 py-2">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="px-3 py-3 font-medium text-slate-900">A-2214</td>
                    <td className="px-3 py-3">Aarav Sharma</td>
                    <td className="px-3 py-3">Dr. Priya Nair</td>
                    <td className="px-3 py-3">24 Apr, 11:00</td>
                    <td className="px-3 py-3">
                      <button className="rounded-lg bg-rose-100 px-2 py-1 text-rose-700">Cancel</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-3 py-3 font-medium text-slate-900">A-2215</td>
                    <td className="px-3 py-3">Neha Verma</td>
                    <td className="px-3 py-3">Dr. Sara Khan</td>
                    <td className="px-3 py-3">24 Apr, 14:30</td>
                    <td className="px-3 py-3">
                      <button className="rounded-lg bg-rose-100 px-2 py-1 text-rose-700">Cancel</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-3 py-3 font-medium text-slate-900">A-2216</td>
                    <td className="px-3 py-3">Riya Menon</td>
                    <td className="px-3 py-3">Dr. Aman Gupta</td>
                    <td className="px-3 py-3">24 Apr, 17:00</td>
                    <td className="px-3 py-3">
                      <button className="rounded-lg bg-rose-100 px-2 py-1 text-rose-700">Cancel</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </AppShell>
  );
}
