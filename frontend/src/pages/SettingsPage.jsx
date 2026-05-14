import AppShell from "../components/AppShell";
import SidebarStatInsight from "../components/layout/SidebarStatInsight";
import SettingsPageContent from "../components/settings/SettingsPageContent";

export default function SettingsPage() {
  return (
    <AppShell
      active="settings"
      insight={<SidebarStatInsight label="Security Status" value="Strong" caption="2FA recommended for all staff" />}
    >
      <SettingsPageContent />
    </AppShell>
  );
}
