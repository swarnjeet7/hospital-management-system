import { useCallback, useEffect, useState } from "react";
import AppPageHeader from "../layout/AppPageHeader";
import { authJson } from "../../lib/authJson";

const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "doctor", label: "Doctor" },
  { value: "nurse", label: "Nurse" },
  { value: "reception_staff", label: "Reception Staff" },
];

const emptyCreate = { name: "", email: "", password: "", role: "nurse" };

export default function AdminToolsPageContent() {
  const [summary, setSummary] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [createForm, setCreateForm] = useState(emptyCreate);
  const [editForm, setEditForm] = useState({ name: "", phone: "", role: "admin", accountStatus: "active" });
  const [editingUserId, setEditingUserId] = useState(null);
  const [busy, setBusy] = useState(false);

  const loadSummary = useCallback(async () => {
    try {
      const res = await authJson("/api/reports/summary");
      setSummary(res.data ?? null);
    } catch {
      setSummary(null);
    }
  }, []);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await authJson("/api/users");
      setUsers(res.data ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load users");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadAll = useCallback(async () => {
    await Promise.all([loadSummary(), loadUsers()]);
  }, [loadSummary, loadUsers]);

  useEffect(() => {
    void loadAll();
  }, [loadAll]);

  const onCreateChange = (e) => {
    const { name, value } = e.target;
    setCreateForm((p) => ({ ...p, [name]: value }));
  };

  const onCreateSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await authJson("/api/users", {
        method: "POST",
        body: JSON.stringify({
          name: createForm.name.trim(),
          email: createForm.email.trim(),
          password: createForm.password,
          role: createForm.role,
        }),
      });
      setCreateForm(emptyCreate);
      await loadUsers();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Create failed");
    } finally {
      setBusy(false);
    }
  };

  const startEdit = (u) => {
    setEditingUserId(u.id);
    setEditForm({
      name: u.name,
      phone: u.phone ?? "",
      role: u.role,
      accountStatus: u.accountStatus ?? "active",
    });
  };

  const onEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((p) => ({ ...p, [name]: value }));
  };

  const saveEdit = async () => {
    if (!editingUserId) return;
    setBusy(true);
    setError("");
    try {
      await authJson(`/api/users/${editingUserId}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: editForm.name.trim(),
          phone: editForm.phone.trim() || null,
          role: editForm.role,
          accountStatus: editForm.accountStatus,
        }),
      });
      setEditingUserId(null);
      await loadUsers();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update failed");
    } finally {
      setBusy(false);
    }
  };

  const onDeleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    setBusy(true);
    try {
      await authJson(`/api/users/${id}`, { method: "DELETE" });
      await loadUsers();
      if (editingUserId === id) setEditingUserId(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setBusy(false);
    }
  };

  const roleLabel = (r) => roleOptions.find((o) => o.value === r)?.label ?? r;

  return (
    <>
      <AppPageHeader
        title="Reports & Admin Tools"
        subtitle="Track performance metrics and manage users."
        action={
          <button type="button" onClick={() => void loadAll()} className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700">
            Refresh
          </button>
        }
      />
      <main className="px-4 py-6 sm:px-6">
        {error ? <p className="mb-4 text-sm font-medium text-rose-600">{error}</p> : null}
        <section className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Patients</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{summary?.patients ?? "—"}</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Doctors</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{summary?.doctors ?? "—"}</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Appointments</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{summary?.appointments ?? "—"}</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Invoices total</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{summary ? `$${Number(summary.invoicesTotal).toFixed(2)}` : "—"}</p>
          </article>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Add staff user</h3>
          <form className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4" onSubmit={onCreateSubmit}>
            <input name="name" value={createForm.name} onChange={onCreateChange} className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none focus:border-cyan-500 focus:bg-white" placeholder="Full name" required />
            <input name="email" type="email" value={createForm.email} onChange={onCreateChange} className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none focus:border-cyan-500 focus:bg-white" placeholder="Email" required />
            <input name="password" type="password" value={createForm.password} onChange={onCreateChange} className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none focus:border-cyan-500 focus:bg-white" placeholder="Password (8+)" required />
            <select name="role" value={createForm.role} onChange={onCreateChange} className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none focus:border-cyan-500 focus:bg-white">
              {roleOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <div className="sm:col-span-2 lg:col-span-4">
              <button type="submit" disabled={busy} className="rounded-xl bg-cyan-600 px-4 py-2.5 font-semibold text-white hover:bg-cyan-700 disabled:opacity-60">
                Create user
              </button>
            </div>
          </form>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">User management</h3>
          <p className="mt-1 text-xs text-slate-500">{loading ? "Loading…" : `${users.length} user(s)`}</p>
          {editingUserId ? (
            <div className="mt-4 flex flex-wrap items-end gap-3 rounded-xl border border-cyan-100 bg-cyan-50/50 p-4 text-sm">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Name</label>
                <input name="name" value={editForm.name} onChange={onEditChange} className="rounded-lg border border-slate-300 px-3 py-2" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Phone</label>
                <input value={editForm.phone} onChange={onEditChange} name="phone" className="rounded-lg border border-slate-300 px-3 py-2" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Role</label>
                <select value={editForm.role} onChange={onEditChange} name="role" className="rounded-lg border border-slate-300 px-3 py-2">
                  {roleOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Status</label>
                <select value={editForm.accountStatus} onChange={onEditChange} name="accountStatus" className="rounded-lg border border-slate-300 px-3 py-2">
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
              <button type="button" onClick={() => void saveEdit()} disabled={busy} className="rounded-lg bg-cyan-600 px-4 py-2 font-semibold text-white">
                Save
              </button>
              <button type="button" onClick={() => setEditingUserId(null)} className="rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700">
                Close
              </button>
            </div>
          ) : null}
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b text-xs uppercase text-slate-500">
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Email</th>
                  <th className="px-3 py-2">Role</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="px-3 py-3 font-medium text-slate-900">{u.name}</td>
                    <td className="px-3 py-3">{u.email}</td>
                    <td className="px-3 py-3">
                      <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">{roleLabel(u.role)}</span>
                    </td>
                    <td className="px-3 py-3">{u.accountStatus === "suspended" ? "Suspended" : "Active"}</td>
                    <td className="px-3 py-3">
                      <button type="button" onClick={() => startEdit(u)} className="rounded-lg bg-blue-100 px-2 py-1 text-blue-700">
                        Edit
                      </button>{" "}
                      <button type="button" onClick={() => void onDeleteUser(u.id)} className="rounded-lg bg-rose-100 px-2 py-1 text-rose-700">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </>
  );
}
