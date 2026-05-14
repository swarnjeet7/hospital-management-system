import { Link } from "react-router-dom";

export default function LoginFormPanel({
  formData,
  handleChange,
  handleSubmit,
  isSubmitting,
  errorMessage,
  successMessage,
}) {
  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <Link to="/" className="text-sm font-semibold text-cyan-700 transition hover:text-cyan-600">
          ← Back to project
        </Link>
        <span className="hidden rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500 sm:inline-flex">
          Admin Login
        </span>
      </div>
      <h2 className="mt-5 text-3xl font-bold text-slate-900">Welcome back</h2>
      <p className="mt-2 text-sm text-slate-500">Sign in to access your hospital command center.</p>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/70 p-5 sm:p-6">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="admin@hospital.com"
              value={formData.email}
              onChange={handleChange}
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
              autoComplete="current-password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label htmlFor="remember" className="flex items-center gap-2 text-slate-600">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                checked={formData.remember}
                onChange={handleChange}
                className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="font-semibold text-cyan-700 transition hover:text-cyan-600">
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-300/60 transition hover:-translate-y-0.5 hover:opacity-95 focus:outline-none focus:ring-4 focus:ring-cyan-200"
          >
            {isSubmitting ? "Signing in..." : "Sign in securely"}
          </button>
          {errorMessage ? <p className="text-sm font-medium text-rose-600">{errorMessage}</p> : null}
          {successMessage ? <p className="text-sm font-medium text-emerald-600">{successMessage}</p> : null}
          <p className="text-xs text-slate-500">Use your registered hospital account credentials.</p>
        </form>

        <div className="mt-5">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-medium uppercase tracking-wide text-slate-400">Or continue with</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Google
            </button>
            <button
              type="button"
              className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Microsoft
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-emerald-700">
        <span>🔒 Your session is encrypted and secure.</span>
        <span className="font-semibold">SSL Protected</span>
      </div>

      <p className="mt-6 text-center text-sm text-slate-600">
        New user?{" "}
        <Link to="/register" className="font-semibold text-cyan-700 transition hover:text-cyan-600">
          Create account
        </Link>
      </p>
    </>
  );
}
