import { Link } from "react-router-dom";

export default function ForgotPasswordFormPanel() {
  return (
    <>
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
    </>
  );
}
