import { useCallback, useEffect, useState } from "react";
import AppPageHeader from "../layout/AppPageHeader";
import { authJson } from "../../lib/authJson";

const emptyForm = { name: "", age: "", gender: "Male", contact: "", address: "" };

export default function PatientsPageContent() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await authJson("/api/patients");
      setItems(res.data ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const payload = {
        name: form.name.trim(),
        age: Number(form.age),
        gender: form.gender,
        contact: form.contact.trim(),
        address: form.address.trim() || null,
      };
      if (editingId) {
        await authJson(`/api/patients/${editingId}`, { method: "PATCH", body: JSON.stringify(payload) });
      } else {
        await authJson("/api/patients", { method: "POST", body: JSON.stringify(payload) });
      }
      resetForm();
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setBusy(false);
    }
  };

  const onEdit = (p) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      age: String(p.age),
      gender: p.gender,
      contact: p.contact,
      address: p.address ?? "",
    });
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this patient?")) return;
    setBusy(true);
    try {
      await authJson(`/api/patients/${id}`, { method: "DELETE" });
      await load();
      if (editingId === id) resetForm();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <AppPageHeader
        title="Patient Management"
        subtitle="Manage records, contact info, and profiles."
        action={
          <button
            type="button"
            onClick={() => void load()}
            className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700"
          >
            Refresh
          </button>
        }
      />
      <main className="px-4 py-6 sm:px-6">
        {error ? <p className="mb-4 text-sm font-medium text-rose-600">{error}</p> : null}
        <div className="grid gap-4 lg:grid-cols-3">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-1">
            <h3 className="text-lg font-semibold text-slate-900">{editingId ? "Edit patient" : "Add patient"}</h3>
            <form className="mt-4 space-y-3 text-sm" onSubmit={onSubmit}>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                placeholder="Patient Name"
                required
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  name="age"
                  type="number"
                  min={0}
                  max={150}
                  value={form.age}
                  onChange={onChange}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                  placeholder="Age"
                  required
                />
                <select
                  name="gender"
                  value={form.gender}
                  onChange={onChange}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <input
                name="contact"
                value={form.contact}
                onChange={onChange}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                placeholder="Contact Number"
                required
              />
              <textarea
                name="address"
                value={form.address}
                onChange={onChange}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                rows={3}
                placeholder="Address"
              />
              <div className="flex flex-wrap gap-2">
                <button
                  type="submit"
                  disabled={busy}
                  className="rounded-xl bg-cyan-600 px-4 py-2.5 font-semibold text-white transition hover:bg-cyan-700 disabled:opacity-60"
                >
                  {busy ? "Saving…" : editingId ? "Update patient" : "Add patient"}
                </button>
                {editingId ? (
                  <button type="button" onClick={resetForm} className="rounded-xl border border-slate-300 px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-50">
                    Cancel
                  </button>
                ) : null}
              </div>
            </form>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
            <h3 className="text-lg font-semibold text-slate-900">Patient records</h3>
            <p className="mt-1 text-xs text-slate-500">{loading ? "Loading…" : `${items.length} record(s)`}</p>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-xs uppercase text-slate-500">
                    <th className="px-3 py-2">ID</th>
                    <th className="px-3 py-2">Name</th>
                    <th className="px-3 py-2">Age</th>
                    <th className="px-3 py-2">Gender</th>
                    <th className="px-3 py-2">Contact</th>
                    <th className="px-3 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="px-3 py-3 font-medium text-slate-900">{p.id.slice(0, 8)}…</td>
                      <td className="px-3 py-3">{p.name}</td>
                      <td className="px-3 py-3">{p.age}</td>
                      <td className="px-3 py-3">{p.gender}</td>
                      <td className="px-3 py-3">{p.contact}</td>
                      <td className="px-3 py-3">
                        <button type="button" onClick={() => onEdit(p)} className="rounded-lg bg-blue-100 px-2 py-1 text-blue-700">
                          Edit
                        </button>{" "}
                        <button type="button" onClick={() => void onDelete(p.id)} className="rounded-lg bg-rose-100 px-2 py-1 text-rose-700">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
