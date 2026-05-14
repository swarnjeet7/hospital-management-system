import AppShell from "../components/AppShell";
import BillingPageContent from "../components/billing/BillingPageContent";
import SidebarStatInsight from "../components/layout/SidebarStatInsight";

export default function BillingPage() {
  return (
    <AppShell
      active="billing"
      insight={
        <SidebarStatInsight label="Monthly Collection" value="$58,900" caption="+10.8% growth vs last month" />
      }
    >
      <BillingPageContent />
    </AppShell>
  );
}
