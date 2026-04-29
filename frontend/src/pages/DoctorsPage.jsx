import AppShell from "../components/AppShell";

export default function DoctorsPage() {
  return (
    <AppShell
      active="doctors"
      insight={
        <div className="mt-6 hidden rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50 to-emerald-50 p-4 lg:block">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">Available Doctors</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">84</p>
          <p className="mt-1 text-xs text-slate-500">Active in current shift</p>
        </div>
      }
    >
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Doctor Management</h2>
            <p className="text-xs text-slate-500">Add doctors, departments, and schedules.</p>
          </div>
          <button className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700">
            Download Roster
          </button>
        </div>
      </header>

      <main className="px-4 py-6 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-3">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Add Doctor</h3>
            <form className="mt-4 space-y-3 text-sm">
              <input
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                placeholder="Doctor Name"
              />
              <input
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                placeholder="Specialization"
              />
              <input
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                placeholder="Contact Number"
              />
              <button type="button" className="w-full rounded-xl bg-cyan-600 px-4 py-2.5 font-semibold text-white transition hover:bg-cyan-700">
                Add Doctor
              </button>
            </form>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-slate-900">Doctor Schedule</h3>
              <input
                type="text"
                placeholder="Search doctor..."
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100 sm:w-56"
              />
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-xs uppercase text-slate-500">
                    <th className="px-3 py-2">Doctor</th>
                    <th className="px-3 py-2">Department</th>
                    <th className="px-3 py-2">Timing</th>
                    <th className="px-3 py-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="px-3 py-3 font-medium text-slate-900">Dr. Priya Nair</td>
                    <td className="px-3 py-3">Cardiology</td>
                    <td className="px-3 py-3">09:00 - 15:00</td>
                    <td className="px-3 py-3">
                      <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">Available</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-3 py-3 font-medium text-slate-900">Dr. Aman Gupta</td>
                    <td className="px-3 py-3">Orthopedics</td>
                    <td className="px-3 py-3">10:00 - 16:00</td>
                    <td className="px-3 py-3">
                      <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">On Leave</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-3 py-3 font-medium text-slate-900">Dr. Sara Khan</td>
                    <td className="px-3 py-3">Neurology</td>
                    <td className="px-3 py-3">11:00 - 17:00</td>
                    <td className="px-3 py-3">
                      <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">Available</span>
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
