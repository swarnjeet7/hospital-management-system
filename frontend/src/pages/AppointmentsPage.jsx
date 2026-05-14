import AppShell from "../components/AppShell";
import AppointmentsPageContent from "../components/appointments/AppointmentsPageContent";
import SidebarStatInsight from "../components/layout/SidebarStatInsight";

export default function AppointmentsPage() {
  return (
    <AppShell
      active="appointments"
      insight={<SidebarStatInsight label="Today's Queue" value="38" caption="Appointments scheduled today" />}
    >
      <AppointmentsPageContent />
    </AppShell>
  );
}
