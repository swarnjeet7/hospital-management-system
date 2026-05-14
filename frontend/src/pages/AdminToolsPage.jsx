import AppShell from "../components/AppShell";
import AdminToolsPageContent from "../components/admin-tools/AdminToolsPageContent";
import SidebarStatInsight from "../components/layout/SidebarStatInsight";

export default function AdminToolsPage() {
  return (
    <AppShell
      active="admin-tools"
      insight={<SidebarStatInsight label="Active Users" value="124" caption="Across admin and staff roles" />}
    >
      <AdminToolsPageContent />
    </AppShell>
  );
}
