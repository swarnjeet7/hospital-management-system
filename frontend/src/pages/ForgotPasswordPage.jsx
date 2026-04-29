import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 via-white to-emerald-100" />
      <div className="absolute -left-16 top-0 h-72 w-72 rounded-full bg-cyan-300/40 blur-3xl" />
      <div className="absolute -right-12 bottom-0 h-72 w-72 rounded-full bg-emerald-300/30 blur-3xl" />

      <section className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-300/60 lg:grid-cols-2">
          <div
            className="relative hidden overflow-hidden bg-gradient-to-br from-cyan-700 via-cyan-700 to-blue-700 p-10 text-white lg:block"
            style={{
              backgroundImage:
                "linear-gradient(to bottom right, rgba(8, 145, 178, 0.88), rgba(29, 78, 216, 0.85)), url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="relative z-10">
              <p className="inline-flex rounded-full border border-cyan-200/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-100">
                MediCore Cloud
              </p>
              <h1 className="mt-8 text-4xl font-bold leading-tight">Secure account recovery flow.</h1>
              <p className="mt-4 max-w-md text-sm text-cyan-100">
                Reset access quickly and safely for staff and administrators with guided recovery.
              </p>
              <div className="mt-10 space-y-3 text-sm text-cyan-100">
                <p className="flex items-center gap-2">
                  <span>✓</span> Trusted identity workflow
                </p>
                <p className="flex items-center gap-2">
                  <span>✓</span> Fast email recovery
                </p>
                <p className="flex items-center gap-2">
                  <span>✓</span> Role-safe account access
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <div className="flex items-center justify-between gap-3">
              <Link to="/login" className="text-sm font-semibold text-cyan-700 transition hover:text-cyan-600">
                ← Back to login
              </Link>
              <span className="hidden rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500 sm:inline-flex">
                Password Reset
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-bold text-slate-900">Reset password</h1>
            <p className="mt-2 text-sm text-slate-500">Enter your email and we will send reset instructions.</p>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
              <form className="space-y-5">
                <div>
                  <label htmlFor="recoveryEmail" className="mb-2 block text-sm font-medium text-slate-700">
                    Email address
                  </label>
                  <input
                    id="recoveryEmail"
                    name="recoveryEmail"
                    type="email"
                    autoComplete="email"
                    placeholder="admin@hospital.com"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                  />
                </div>
                <button
                  type="button"
                  className="w-full rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-300/60 transition hover:-translate-y-0.5 hover:opacity-95 focus:outline-none focus:ring-4 focus:ring-cyan-200"
                >
                  Send reset link
                </button>
              </form>
            </div>

            <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-emerald-700">
              🔒 Recovery links are securely delivered and time limited.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
