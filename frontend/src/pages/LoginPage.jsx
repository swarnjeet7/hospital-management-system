import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const STORAGE_KEYS = {
  token: "medicore_token",
  user: "medicore_user",
};

const REQUEST_TIMEOUT_MS = 10000;
const DEFAULT_API_BASE_URL = "http://localhost:5000";

const normalizeBaseUrl = (url) => url.replace(/\/+$/, "");

const resolveApiBaseUrl = () => {
  const envBaseUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL;
  if (!envBaseUrl || !envBaseUrl.trim()) return DEFAULT_API_BASE_URL;
  return normalizeBaseUrl(envBaseUrl.trim());
};

const API_BASE_URL = resolveApiBaseUrl();
const LOGIN_ENDPOINT = import.meta.env.VITE_LOGIN_ENDPOINT?.trim() || `${API_BASE_URL}/api/auth/login`;

const extractApiErrorMessage = (errorPayload) => {
  const candidate =
    errorPayload?.message ||
    errorPayload?.error?.message ||
    errorPayload?.errors?.[0]?.message ||
    errorPayload?.data?.message;

  return typeof candidate === "string" && candidate.trim()
    ? candidate.trim()
    : "Invalid email or password.";
};

const parseJsonSafely = async (response) => {
  try {
    return await response.json();
  } catch {
    return {};
  }
};

export default function LoginPage() {
  const navigate = useNavigate();
  const redirectTimeoutRef = useRef(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    return () => {
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
    };
  }, []);

  const persistSession = ({ token, user, remember }) => {
    const activeStorage = remember ? localStorage : sessionStorage;
    const inactiveStorage = remember ? sessionStorage : localStorage;

    inactiveStorage.removeItem(STORAGE_KEYS.token);
    inactiveStorage.removeItem(STORAGE_KEYS.user);

    activeStorage.setItem(STORAGE_KEYS.token, token);
    activeStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user ?? {}));
  };

  const loginWithApi = async (payload, signal) => {
    const response = await fetch(LOGIN_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal,
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
      }),
    });

    const data = await parseJsonSafely(response);

    if (!response.ok) {
      throw new Error(extractApiErrorMessage(data));
    }

    const token = data?.token || data?.accessToken || data?.data?.token;
    const user = data?.user || data?.data?.user || {};

    if (!token) {
      throw new Error("Login succeeded but token was not returned by API.");
    }

    return { token, user };
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const email = formData.email.trim();
    const password = formData.password.trim();

    if (!email || !password) {
      setErrorMessage("Email and password are required.");
      return;
    }

    setIsSubmitting(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await loginWithApi(
        {
          email,
          password,
        },
        controller.signal
      );

      persistSession({
        token: response.token,
        user: response.user,
        remember: formData.remember,
      });

      setSuccessMessage("Login successful. Redirecting to dashboard...");
      redirectTimeoutRef.current = setTimeout(() => navigate("/dashboard"), 700);
    } catch (error) {
      if (error.name === "AbortError") {
        setErrorMessage("Request timed out. Please try again.");
      } else {
        setErrorMessage(error.message || "Unable to login right now.");
      }
    } finally {
      clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  };

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
                "linear-gradient(to bottom right, rgba(8, 145, 178, 0.88), rgba(29, 78, 216, 0.85)), url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="relative z-10">
              <p className="inline-flex rounded-full border border-cyan-200/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-100">
                MediCore Cloud
              </p>
              <h1 className="mt-8 text-4xl font-bold leading-tight">Hospital operations made easy.</h1>
              <p className="mt-4 max-w-md text-sm text-cyan-100">
                Centralize patient records, doctor schedules, appointments, and billing in one modern healthcare platform.
              </p>

              <div className="mt-10 space-y-3 text-sm text-cyan-100">
                <p className="flex items-center gap-2">
                  <span>✓</span> HIPAA-ready workflow design
                </p>
                <p className="flex items-center gap-2">
                  <span>✓</span> Smart appointment tracking
                </p>
                <p className="flex items-center gap-2">
                  <span>✓</span> Real-time admin insights
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-10">
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
          </div>
        </div>
      </section>
    </main>
  );
}
