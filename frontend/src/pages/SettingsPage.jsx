import AppShell from "../components/AppShell";

export default function SettingsPage() {
  return (
    <AppShell
      active="settings"
      insight={
        <div className="mt-6 hidden rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50 to-emerald-50 p-4 lg:block">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">Security Status</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">Strong</p>
          <p className="mt-1 text-xs text-slate-500">2FA recommended for all staff</p>
        </div>
      }
    >
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Settings</h2>
            <p className="text-xs text-slate-500">Manage account profile and security preferences.</p>
          </div>
          <button className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700">
            Save All Changes
          </button>
        </div>
      </header>

      <main className="px-4 py-6 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Profile Settings</h3>
            <form className="mt-4 space-y-3 text-sm">
              <input
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                defaultValue="Amit Sharma"
              />
              <input
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                defaultValue="admin@hospital.com"
              />
              <input
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                defaultValue="+91 98100 11223"
              />
              <div className="flex flex-wrap gap-2 pt-1">
                <button type="button" className="rounded-xl bg-cyan-600 px-4 py-2.5 font-semibold text-white transition hover:bg-cyan-700">
                  Update Profile
                </button>
                <button
                  type="button"
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Upload Avatar
                </button>
              </div>
            </form>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Change Password</h3>
            <form className="mt-4 space-y-3 text-sm">
              <input
                type="password"
                placeholder="Current password"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
              />
              <input
                type="password"
                placeholder="New password"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
              />
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
              />
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
                Password tip: Use at least 12 characters with numbers and symbols.
              </div>
              <button type="button" className="rounded-xl bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700">
                Change Password
              </button>
            </form>
          </section>
        </div>
      </main>
    </AppShell>
  );
}
