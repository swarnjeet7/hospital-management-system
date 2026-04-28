import AppShell from "../components/AppShell";

export default function AdminToolsPage() {
  return (
    <AppShell
      active="admin-tools"
      insight={
        <div className="mt-6 hidden rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50 to-emerald-50 p-4 lg:block">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">Active Users</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">124</p>
          <p className="mt-1 text-xs text-slate-500">Across admin and staff roles</p>
        </div>
      }
    >
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Reports & Admin Tools</h2>
            <p className="text-xs text-slate-500">Track performance metrics and manage users.</p>
          </div>
          <button className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700">
            Generate Summary
          </button>
        </div>
      </header>

      <main className="px-4 py-6 sm:px-6">
        <section className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <p className="text-sm text-slate-500">Daily OPD</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">214</p>
            <p className="mt-2 text-xs text-emerald-600">+6% vs yesterday</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <p className="text-sm text-slate-500">Lab Tests</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">89</p>
            <p className="mt-2 text-xs text-cyan-600">12 urgent reports</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <p className="text-sm text-slate-500">Admissions</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">36</p>
            <p className="mt-2 text-xs text-emerald-600">+4 this shift</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <p className="text-sm text-slate-500">Discharges</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">27</p>
            <p className="mt-2 text-xs text-slate-500">Pending approvals: 5</p>
          </article>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-slate-900">User Management</h3>
            <input
              type="text"
              placeholder="Search user..."
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100 sm:w-56"
            />
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b text-xs uppercase text-slate-500">
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Email</th>
                  <th className="px-3 py-2">Role</th>
                  <th className="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="px-3 py-3 font-medium text-slate-900">Amit Sharma</td>
                  <td className="px-3 py-3">admin@hospital.com</td>
                  <td className="px-3 py-3">
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">Admin</span>
                  </td>
                  <td className="px-3 py-3">Active</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-3 py-3 font-medium text-slate-900">Kavya Rao</td>
                  <td className="px-3 py-3">staff1@hospital.com</td>
                  <td className="px-3 py-3">
                    <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">Staff</span>
                  </td>
                  <td className="px-3 py-3">Active</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="px-3 py-3 font-medium text-slate-900">Rohan Jain</td>
                  <td className="px-3 py-3">staff2@hospital.com</td>
                  <td className="px-3 py-3">
                    <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">Staff</span>
                  </td>
                  <td className="px-3 py-3">Suspended</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </AppShell>
  );
}
