import { useCallback, useEffect, useState } from "react";
import AppShell from "../components/AppShell";
import DashboardMainContent from "../components/dashboard/DashboardMainContent";
import DashboardSidebarInsight from "../components/dashboard/DashboardSidebarInsight";
import DashboardTopBar from "../components/dashboard/DashboardTopBar";
import { authJson } from "../lib/authJson";

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await authJson("/api/reports/dashboard");
      setDashboard(res.data ?? null);
    } catch (e) {
      setDashboard(null);
      setError(e instanceof Error ? e.message : "Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <AppShell active="dashboard" insight={<DashboardSidebarInsight dashboard={dashboard} loading={loading} />}>
      <DashboardTopBar />
      <DashboardMainContent dashboard={dashboard} loading={loading} error={error} onRetry={load} />
    </AppShell>
  );
}
