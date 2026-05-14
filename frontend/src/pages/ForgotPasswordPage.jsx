import AuthHeroPanel from "../components/auth/AuthHeroPanel";
import AuthPageShell from "../components/auth/AuthPageShell";
import ForgotPasswordFormPanel from "../components/forgot-password/ForgotPasswordFormPanel";

const FORGOT_HERO_IMAGE =
  "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80";

export default function ForgotPasswordPage() {
  return (
    <AuthPageShell
      hero={
        <AuthHeroPanel
          backgroundImageUrl={FORGOT_HERO_IMAGE}
          title="Secure account recovery flow."
          description="Reset access quickly and safely for staff and administrators with guided recovery."
          bullets={["Trusted identity workflow", "Fast email recovery", "Role-safe account access"]}
        />
      }
    >
      <ForgotPasswordFormPanel />
    </AuthPageShell>
  );
}
