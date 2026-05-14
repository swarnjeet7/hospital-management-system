import AuthGradientBackdrop from "./AuthGradientBackdrop";

export default function AuthPageShell({ hero, children }) {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <AuthGradientBackdrop />
      <section className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-300/60 lg:grid-cols-2">
          {hero}
          <div className="p-6 sm:p-10">{children}</div>
        </div>
      </section>
    </main>
  );
}
