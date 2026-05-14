import DashboardWelcomeBanner from "./DashboardWelcomeBanner";
import DashboardStatCards from "./DashboardStatCards";
import DashboardPatientIntakeTrend from "./DashboardPatientIntakeTrend";
import DashboardNotifications from "./DashboardNotifications";
import DashboardRecentActivity from "./DashboardRecentActivity";
import DashboardQuickActions from "./DashboardQuickActions";

export default function DashboardMainContent({ dashboard, loading, error, onRetry }) {
  return (
    <main className="px-4 py-6 sm:px-6">
      {error ? (
        <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          <p>{error}</p>
          <button
            type="button"
            onClick={onRetry}
            className="mt-2 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-700"
          >
            Retry
          </button>
        </div>
      ) : null}
      <DashboardWelcomeBanner dashboard={dashboard} loading={loading} />
      <DashboardStatCards dashboard={dashboard} loading={loading} />
      <section className="mt-6 grid gap-4 xl:grid-cols-3">
        <DashboardPatientIntakeTrend dashboard={dashboard} loading={loading} />
        <DashboardNotifications dashboard={dashboard} loading={loading} />
      </section>
      <section className="mt-6 grid gap-4 xl:grid-cols-3">
        <DashboardRecentActivity dashboard={dashboard} loading={loading} />
        <DashboardQuickActions />
      </section>
    </main>
  );
}
