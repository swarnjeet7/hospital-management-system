import { useCallback, useEffect, useState } from "react";
import AppPageHeader from "../layout/AppPageHeader";
import { authJson } from "../../lib/authJson";

function toLocalInputValue(iso) {
  const dt = new Date(iso);
  const p = (n) => String(n).padStart(2, "0");
  return `${dt.getFullYear()}-${p(dt.getMonth() + 1)}-${p(dt.getDate())}T${p(dt.getHours())}:${p(dt.getMinutes())}`;
}

const emptyForm = { patientName: "", doctorName: "", localAt: "" };

export default function AppointmentsPageContent() {
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
      const res = await authJson("/api/appointments");
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
      const scheduledAt = new Date(form.localAt).toISOString();
      const payload = {
        patientName: form.patientName.trim(),
        doctorName: form.doctorName.trim(),
        scheduledAt,
        status: "scheduled",
      };
      if (editingId) {
        await authJson(`/api/appointments/${editingId}`, { method: "PATCH", body: JSON.stringify(payload) });
      } else {
        await authJson("/api/appointments", { method: "POST", body: JSON.stringify(payload) });
      }
      resetForm();
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setBusy(false);
    }
  };

  const onEdit = (a) => {
    setEditingId(a.id);
    setForm({
      patientName: a.patientName,
      doctorName: a.doctorName,
      localAt: toLocalInputValue(a.scheduledAt),
    });
  };

  const onCancelAppt = async (id) => {
    setBusy(true);
    try {
      await authJson(`/api/appointments/${id}`, { method: "PATCH", body: JSON.stringify({ status: "cancelled" }) });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update failed");
    } finally {
      setBusy(false);
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this appointment?")) return;
    setBusy(true);
    try {
      await authJson(`/api/appointments/${id}`, { method: "DELETE" });
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
        title="Appointment System"
        subtitle="Book, manage, and cancel appointments."
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
            <h3 className="text-lg font-semibold text-slate-900">{editingId ? "Edit appointment" : "Book appointment"}</h3>
            <form className="mt-4 space-y-3 text-sm" onSubmit={onSubmit}>
              <input name="patientName" value={form.patientName} onChange={onChange} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100" placeholder="Patient Name" required />
              <input name="doctorName" value={form.doctorName} onChange={onChange} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100" placeholder="Doctor Name" required />
              <input name="localAt" type="datetime-local" value={form.localAt} onChange={onChange} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100" required />
              <div className="flex flex-wrap gap-2">
                <button type="submit" disabled={busy} className="w-full rounded-xl bg-cyan-600 px-4 py-2.5 font-semibold text-white transition hover:bg-cyan-700 disabled:opacity-60">
                  {busy ? "Saving…" : editingId ? "Update" : "Book now"}
                </button>
                {editingId ? (
                  <button type="button" onClick={resetForm} className="w-full rounded-xl border border-slate-300 px-4 py-2.5 font-semibold text-slate-700 hover:bg-slate-50">
                    Cancel edit
                  </button>
                ) : null}
              </div>
            </form>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
            <h3 className="text-lg font-semibold text-slate-900">Appointment list</h3>
            <p className="mt-1 text-xs text-slate-500">{loading ? "Loading…" : `${items.length} appointment(s)`}</p>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-xs uppercase text-slate-500">
                    <th className="px-3 py-2">Patient</th>
                    <th className="px-3 py-2">Doctor</th>
                    <th className="px-3 py-2">When</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((a) => (
                    <tr key={a.id} className="hover:bg-slate-50">
                      <td className="px-3 py-3 font-medium text-slate-900">{a.patientName}</td>
                      <td className="px-3 py-3">{a.doctorName}</td>
                      <td className="px-3 py-3">{new Date(a.scheduledAt).toLocaleString()}</td>
                      <td className="px-3 py-3">{a.status}</td>
                      <td className="px-3 py-3">
                        <button type="button" onClick={() => onEdit(a)} className="rounded-lg bg-blue-100 px-2 py-1 text-blue-700">
                          Edit
                        </button>{" "}
                        {a.status !== "cancelled" ? (
                          <button type="button" onClick={() => void onCancelAppt(a.id)} className="rounded-lg bg-amber-100 px-2 py-1 text-amber-800">
                            Cancel
                          </button>
                        ) : null}{" "}
                        <button type="button" onClick={() => void onDelete(a.id)} className="rounded-lg bg-rose-100 px-2 py-1 text-rose-700">
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
