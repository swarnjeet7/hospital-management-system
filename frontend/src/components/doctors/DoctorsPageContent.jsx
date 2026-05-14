import { useCallback, useEffect, useState } from "react";
import AppPageHeader from "../layout/AppPageHeader";
import { authJson } from "../../lib/authJson";

const emptyForm = {
  name: "",
  specialization: "",
  department: "",
  contact: "",
  timingStart: "",
  timingEnd: "",
  status: "available",
};

export default function DoctorsPageContent() {
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
      const res = await authJson("/api/doctors");
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
        specialization: form.specialization.trim(),
        department: form.department.trim() || null,
        contact: form.contact.trim() || null,
        timingStart: form.timingStart.trim() || null,
        timingEnd: form.timingEnd.trim() || null,
        status: form.status,
      };
      if (editingId) {
        await authJson(`/api/doctors/${editingId}`, { method: "PATCH", body: JSON.stringify(payload) });
      } else {
        await authJson("/api/doctors", { method: "POST", body: JSON.stringify(payload) });
      }
      resetForm();
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setBusy(false);
    }
  };

  const onEdit = (d) => {
    setEditingId(d.id);
    setForm({
      name: d.name,
      specialization: d.specialization,
      department: d.department ?? "",
      contact: d.contact ?? "",
      timingStart: d.timingStart ?? "",
      timingEnd: d.timingEnd ?? "",
      status: d.status,
    });
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this doctor?")) return;
    setBusy(true);
    try {
      await authJson(`/api/doctors/${id}`, { method: "DELETE" });
      await load();
      if (editingId === id) resetForm();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setBusy(false);
    }
  };

  const statusLabel = (s) => (s === "on_leave" ? "On Leave" : "Available");

  return (
    <>
      <AppPageHeader
        title="Doctor Management"
        subtitle="Add doctors, departments, and schedules."
        action={
          <button type="button" onClick={() => void load()} className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700">
            Refresh
          </button>
        }
      />
      <main className="px-4 py-6 sm:px-6">
        {error ? <p className="mb-4 text-sm font-medium text-rose-600">{error}</p> : null}
        <div className="grid gap-4 lg:grid-cols-3">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">{editingId ? "Edit doctor" : "Add doctor"}</h3>
            <form className="mt-4 space-y-3 text-sm" onSubmit={onSubmit}>
              <input name="name" value={form.name} onChange={onChange} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100" placeholder="Doctor Name" required />
              <input name="specialization" value={form.specialization} onChange={onChange} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100" placeholder="Specialization" required />
              <input name="department" value={form.department} onChange={onChange} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100" placeholder="Department" />
              <input name="contact" value={form.contact} onChange={onChange} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100" placeholder="Contact Number" />
              <div className="grid grid-cols-2 gap-2">
                <input name="timingStart" value={form.timingStart} onChange={onChange} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100" placeholder="Start e.g. 09:00" />
                <input name="timingEnd" value={form.timingEnd} onChange={onChange} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100" placeholder="End e.g. 15:00" />
              </div>
              <select name="status" value={form.status} onChange={onChange} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100">
                <option value="available">Available</option>
                <option value="on_leave">On leave</option>
              </select>
              <div className="flex flex-wrap gap-2">
                <button type="submit" disabled={busy} className="w-full rounded-xl bg-cyan-600 px-4 py-2.5 font-semibold text-white transition hover:bg-cyan-700 disabled:opacity-60">
                  {busy ? "Saving…" : editingId ? "Update doctor" : "Add doctor"}
                </button>
                {editingId ? (
                  <button type="button" onClick={resetForm} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-50">
                    Cancel
                  </button>
                ) : null}
              </div>
            </form>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
            <h3 className="text-lg font-semibold text-slate-900">Doctor schedule</h3>
            <p className="mt-1 text-xs text-slate-500">{loading ? "Loading…" : `${items.length} doctor(s)`}</p>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-xs uppercase text-slate-500">
                    <th className="px-3 py-2">Doctor</th>
                    <th className="px-3 py-2">Department</th>
                    <th className="px-3 py-2">Timing</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50">
                      <td className="px-3 py-3 font-medium text-slate-900">{d.name}</td>
                      <td className="px-3 py-3">{d.department ?? "—"}</td>
                      <td className="px-3 py-3">
                        {d.timingStart && d.timingEnd ? `${d.timingStart} - ${d.timingEnd}` : "—"}
                      </td>
                      <td className="px-3 py-3">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-semibold ${
                            d.status === "on_leave" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          {statusLabel(d.status)}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <button type="button" onClick={() => onEdit(d)} className="rounded-lg bg-blue-100 px-2 py-1 text-blue-700">
                          Edit
                        </button>{" "}
                        <button type="button" onClick={() => void onDelete(d.id)} className="rounded-lg bg-rose-100 px-2 py-1 text-rose-700">
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
