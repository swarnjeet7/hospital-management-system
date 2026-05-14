export default function AuthGradientBackdrop() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 via-white to-emerald-100" />
      <div className="absolute -left-16 top-0 h-72 w-72 rounded-full bg-cyan-300/40 blur-3xl" />
      <div className="absolute -right-12 bottom-0 h-72 w-72 rounded-full bg-emerald-300/30 blur-3xl" />
    </>
  );
}
