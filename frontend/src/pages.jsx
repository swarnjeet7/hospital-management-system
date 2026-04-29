import { Link } from "react-router-dom";

export function RouteHome({ routes }) {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-6 py-12 font-sans text-slate-100">
      <section className="w-full max-w-4xl rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl shadow-cyan-900/20 sm:p-10">
        <p className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-300">
          React + Vite
        </p>
        <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">MediCore Hospital Management System</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-300 sm:text-base">
          These routes run through React Router and render native React components (converted from your original HTML
          templates).
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {routes.map((route) => (
            <Link
              key={route.path}
              className="block rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-400 hover:bg-slate-700"
              to={route.path}
            >
              {route.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
