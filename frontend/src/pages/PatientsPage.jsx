import AppShell from "../components/AppShell";
import SidebarStatInsight from "../components/layout/SidebarStatInsight";
import PatientsPageContent from "../components/patients/PatientsPageContent";

export default function PatientsPage() {
  return (
    <AppShell
      active="patients"
      insight={<SidebarStatInsight label="New Registrations" value="48" caption="Patients added this week" />}
    >
      <PatientsPageContent />
    </AppShell>
  );
}
