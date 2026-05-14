import { Link } from "react-router-dom";

export default function RegisterFormPanel({
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
        <form className="grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit}>
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
              value={formData.fullName}
              onChange={handleChange}
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
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={formData.password}
              onChange={handleChange}
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
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            >
              <option value="admin">Admin</option>
              <option value="doctor">Doctor</option>
              <option value="nurse">Nurse</option>
              <option value="reception_staff">Reception Staff</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="terms" className="flex items-center gap-2 text-sm text-slate-600">
              <input
                id="terms"
                name="termsAccepted"
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500"
              />
              I agree to platform terms and hospital data policy.
            </label>
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-300/60 transition hover:-translate-y-0.5 hover:opacity-95 focus:outline-none focus:ring-4 focus:ring-cyan-200 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
            {errorMessage ? <p className="mt-3 text-sm font-medium text-rose-600">{errorMessage}</p> : null}
            {successMessage ? <p className="mt-3 text-sm font-medium text-emerald-600">{successMessage}</p> : null}
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
    </>
  );
}
