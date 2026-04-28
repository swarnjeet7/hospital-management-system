import AppShell from "../components/AppShell";

export default function BillingPage() {
  return (
    <AppShell
      active="billing"
      insight={
        <div className="mt-6 hidden rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50 to-emerald-50 p-4 lg:block">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">Monthly Collection</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">$58,900</p>
          <p className="mt-1 text-xs text-slate-500">+10.8% growth vs last month</p>
        </div>
      }
    >
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Billing System</h2>
            <p className="text-xs text-slate-500">Generate invoices and monitor payment status.</p>
          </div>
          <button className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700">
            Download Invoices
          </button>
        </div>
      </header>

      <main className="px-4 py-6 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-3">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Generate Bill</h3>
            <form className="mt-4 space-y-3 text-sm">
              <input
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                placeholder="Patient Name"
              />
              <input
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                placeholder="Service"
              />
              <input
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                placeholder="Amount"
              />
              <button type="button" className="w-full rounded-xl bg-cyan-600 px-4 py-2.5 font-semibold text-white transition hover:bg-cyan-700">
                Generate Invoice
              </button>
            </form>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-slate-900">Payment Status</h3>
              <input
                type="text"
                placeholder="Search invoice..."
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100 sm:w-56"
              />
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-xs uppercase text-slate-500">
                    <th className="px-3 py-2">Invoice</th>
                    <th className="px-3 py-2">Patient</th>
                    <th className="px-3 py-2">Amount</th>
                    <th className="px-3 py-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="px-3 py-3 font-medium text-slate-900">INV-871</td>
                    <td className="px-3 py-3">Aarav Sharma</td>
                    <td className="px-3 py-3">$490</td>
                    <td className="px-3 py-3">
                      <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">Paid</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-3 py-3 font-medium text-slate-900">INV-872</td>
                    <td className="px-3 py-3">Neha Verma</td>
                    <td className="px-3 py-3">$220</td>
                    <td className="px-3 py-3">
                      <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">Pending</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-3 py-3 font-medium text-slate-900">INV-873</td>
                    <td className="px-3 py-3">Riya Menon</td>
                    <td className="px-3 py-3">$710</td>
                    <td className="px-3 py-3">
                      <span className="rounded-full bg-rose-100 px-2 py-1 text-xs font-semibold text-rose-700">Failed</span>
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
