import AppShell from "../components/AppShell";

export default function PatientsPage() {
  return (
    <AppShell
      active="patients"
      insight={
        <div className="mt-6 hidden rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50 to-emerald-50 p-4 lg:block">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">New Registrations</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">48</p>
          <p className="mt-1 text-xs text-slate-500">Patients added this week</p>
        </div>
      }
    >
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Patient Management</h2>
            <p className="text-xs text-slate-500">Manage records, contact info, and profiles.</p>
          </div>
          <button className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700">
            Export Patients
          </button>
        </div>
      </header>

      <main className="px-4 py-6 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-3">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-1">
            <h3 className="text-lg font-semibold text-slate-900">Add Patient</h3>
            <form className="mt-4 space-y-3 text-sm">
              <input
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                placeholder="Patient Name"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                  placeholder="Age"
                />
                <select className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <input
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                placeholder="Contact Number"
              />
              <textarea
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                rows="3"
                placeholder="Address"
              />
              <button type="button" className="w-full rounded-xl bg-cyan-600 px-4 py-2.5 font-semibold text-white transition hover:bg-cyan-700">
                Add Patient
              </button>
            </form>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-slate-900">Patient Records</h3>
              <input
                type="text"
                placeholder="Search patient..."
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100 sm:w-56"
              />
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-xs uppercase text-slate-500">
                    <th className="px-3 py-2">ID</th>
                    <th className="px-3 py-2">Name</th>
                    <th className="px-3 py-2">Age</th>
                    <th className="px-3 py-2">Gender</th>
                    <th className="px-3 py-2">Contact</th>
                    <th className="px-3 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="px-3 py-3 font-medium text-slate-900">P-1001</td>
                    <td className="px-3 py-3">Aarav Sharma</td>
                    <td className="px-3 py-3">34</td>
                    <td className="px-3 py-3">Male</td>
                    <td className="px-3 py-3">+91 98100 11223</td>
                    <td className="px-3 py-3">
                      <button className="rounded-lg bg-blue-100 px-2 py-1 text-blue-700">Edit</button>{" "}
                      <button className="rounded-lg bg-rose-100 px-2 py-1 text-rose-700">Delete</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-3 py-3 font-medium text-slate-900">P-1002</td>
                    <td className="px-3 py-3">Neha Verma</td>
                    <td className="px-3 py-3">29</td>
                    <td className="px-3 py-3">Female</td>
                    <td className="px-3 py-3">+91 98200 99887</td>
                    <td className="px-3 py-3">
                      <button className="rounded-lg bg-blue-100 px-2 py-1 text-blue-700">Edit</button>{" "}
                      <button className="rounded-lg bg-rose-100 px-2 py-1 text-rose-700">Delete</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-3 py-3 font-medium text-slate-900">P-1003</td>
                    <td className="px-3 py-3">Riya Menon</td>
                    <td className="px-3 py-3">41</td>
                    <td className="px-3 py-3">Female</td>
                    <td className="px-3 py-3">+91 98777 44112</td>
                    <td className="px-3 py-3">
                      <button className="rounded-lg bg-blue-100 px-2 py-1 text-blue-700">Edit</button>{" "}
                      <button className="rounded-lg bg-rose-100 px-2 py-1 text-rose-700">Delete</button>
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
