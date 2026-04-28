import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 via-white to-emerald-100" />
      <div className="absolute -left-14 top-10 h-72 w-72 rounded-full bg-cyan-300/35 blur-3xl" />
      <div className="absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-emerald-300/30 blur-3xl" />
      <section className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-300/60 lg:grid-cols-2">
          <div
            className="relative hidden overflow-hidden bg-gradient-to-br from-cyan-700 via-cyan-700 to-blue-700 p-10 text-white lg:block"
            style={{
              backgroundImage:
                "linear-gradient(to bottom right, rgba(8, 145, 178, 0.88), rgba(29, 78, 216, 0.85)), url('https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="relative z-10">
              <p className="inline-flex rounded-full border border-cyan-200/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-100">
                MediCore Cloud
              </p>
              <h1 className="mt-8 text-4xl font-bold leading-tight">Create your secure hospital workspace.</h1>
              <p className="mt-4 max-w-md text-sm text-cyan-100">
                Register staff and admins with role-based onboarding in a trusted healthcare environment.
              </p>
              <div className="mt-10 space-y-3 text-sm text-cyan-100">
                <p className="flex items-center gap-2">
                  <span>✓</span> Quick staff onboarding
                </p>
                <p className="flex items-center gap-2">
                  <span>✓</span> Role-based account setup
                </p>
                <p className="flex items-center gap-2">
                  <span>✓</span> Enterprise-grade security
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
                Create Account
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-bold text-slate-900">Create hospital account</h1>
            <p className="mt-2 text-sm text-slate-500">
              Register administrators and staff securely in your healthcare workspace.
            </p>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
              <form className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-slate-700">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    placeholder="Dr. Amit Sharma"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="staff@hospital.com"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Create password"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                  />
                </div>
                <div>
                  <label htmlFor="role" className="mb-2 block text-sm font-medium text-slate-700">
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                  >
                    <option>Admin</option>
                    <option>Doctor</option>
                    <option>Nurse</option>
                    <option>Reception Staff</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="terms" className="flex items-center gap-2 text-sm text-slate-600">
                    <input id="terms" type="checkbox" className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500" />
                    I agree to platform terms and hospital data policy.
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="button"
                    className="w-full rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-300/60 transition hover:-translate-y-0.5 hover:opacity-95 focus:outline-none focus:ring-4 focus:ring-cyan-200"
                  >
                    Create account
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-emerald-700">
              🔒 Staff onboarding is protected with secure role-based access.
            </div>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-cyan-700 transition hover:text-cyan-600">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
