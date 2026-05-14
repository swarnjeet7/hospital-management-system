import { useCallback, useEffect, useState } from "react";
import AppPageHeader from "../layout/AppPageHeader";
import { authJson } from "../../lib/authJson";

export default function SettingsPageContent() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [profile, setProfile] = useState({ name: "", email: "", phone: "" });
  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await authJson("/api/users/me");
      const u = res.data;
      setProfile({ name: u.name ?? "", email: u.email ?? "", phone: u.phone ?? "" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const onProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
  };

  const onPwdChange = (e) => {
    const { name, value } = e.target;
    setPwd((p) => ({ ...p, [name]: value }));
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    setError("");
    try {
      await authJson("/api/users/me", {
        method: "PATCH",
        body: JSON.stringify({
          name: profile.name.trim(),
          phone: profile.phone.trim() || null,
        }),
      });
      setMsg("Profile updated.");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update failed");
    } finally {
      setBusy(false);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");
    if (pwd.next !== pwd.confirm) {
      setError("New passwords do not match.");
      return;
    }
    setBusy(true);
    try {
      await authJson("/api/users/me/password", {
        method: "POST",
        body: JSON.stringify({ currentPassword: pwd.current, newPassword: pwd.next }),
      });
      setPwd({ current: "", next: "", confirm: "" });
      setMsg("Password changed.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Password change failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <AppPageHeader
        title="Settings"
        subtitle="Manage account profile and security preferences."
        action={
          <button type="button" onClick={() => void load()} className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700">
            Reload
          </button>
        }
      />
      <main className="px-4 py-6 sm:px-6">
        {error ? <p className="mb-4 text-sm font-medium text-rose-600">{error}</p> : null}
        {msg ? <p className="mb-4 text-sm font-medium text-emerald-600">{msg}</p> : null}
        {loading ? <p className="text-sm text-slate-500">Loading profile…</p> : null}
        <div className="grid gap-4 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Profile settings</h3>
            <form className="mt-4 space-y-3 text-sm" onSubmit={saveProfile}>
              <input name="name" value={profile.name} onChange={onProfileChange} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100" placeholder="Name" />
              <input name="email" value={profile.email} readOnly className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-3 py-2.5 text-slate-600" title="Email cannot be changed here" />
              <input name="phone" value={profile.phone} onChange={onProfileChange} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100" placeholder="Phone" />
              <div className="flex flex-wrap gap-2 pt-1">
                <button type="submit" disabled={busy} className="rounded-xl bg-cyan-600 px-4 py-2.5 font-semibold text-white transition hover:bg-cyan-700 disabled:opacity-60">
                  Update profile
                </button>
              </div>
            </form>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Change password</h3>
            <form className="mt-4 space-y-3 text-sm" onSubmit={changePassword}>
              <input name="current" type="password" value={pwd.current} onChange={onPwdChange} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100" placeholder="Current password" />
              <input name="next" type="password" value={pwd.next} onChange={onPwdChange} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100" placeholder="New password (8+)" />
              <input name="confirm" type="password" value={pwd.confirm} onChange={onPwdChange} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100" placeholder="Confirm new password" />
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">Use at least 8 characters for the new password.</div>
              <button type="submit" disabled={busy} className="rounded-xl bg-blue-600 px-4 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60">
                Change password
              </button>
            </form>
          </section>
        </div>
      </main>
    </>
  );
}
