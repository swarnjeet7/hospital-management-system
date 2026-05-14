import AppShell from "../components/AppShell";
import DoctorsPageContent from "../components/doctors/DoctorsPageContent";
import SidebarStatInsight from "../components/layout/SidebarStatInsight";

export default function DoctorsPage() {
  return (
    <AppShell
      active="doctors"
      insight={<SidebarStatInsight label="Available Doctors" value="84" caption="Active in current shift" />}
    >
      <DoctorsPageContent />
    </AppShell>
  );
}
