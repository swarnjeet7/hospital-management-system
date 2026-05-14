export default function AuthHeroPanel({ backgroundImageUrl, title, description, bullets = [] }) {
  return (
    <div
      className="relative hidden overflow-hidden bg-gradient-to-br from-cyan-700 via-cyan-700 to-blue-700 p-10 text-white lg:block"
      style={{
        backgroundImage: `linear-gradient(to bottom right, rgba(8, 145, 178, 0.88), rgba(29, 78, 216, 0.85)), url('${backgroundImageUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10">
        <p className="inline-flex rounded-full border border-cyan-200/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-100">
          MediCore Cloud
        </p>
        <h1 className="mt-8 text-4xl font-bold leading-tight">{title}</h1>
        <p className="mt-4 max-w-md text-sm text-cyan-100">{description}</p>
        {bullets.length > 0 ? (
          <div className="mt-10 space-y-3 text-sm text-cyan-100">
            {bullets.map((line) => (
              <p key={line} className="flex items-center gap-2">
                <span>✓</span> {line}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
