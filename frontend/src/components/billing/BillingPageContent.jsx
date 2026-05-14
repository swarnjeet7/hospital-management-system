import { useCallback, useEffect, useState } from "react";
import AppPageHeader from "../layout/AppPageHeader";
import { authJson } from "../../lib/authJson";

const emptyForm = { patientName: "", service: "", amount: "", status: "pending" };

export default function BillingPageContent() {
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
      const res = await authJson("/api/invoices");
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
      const amount = Number(form.amount);
      if (!Number.isFinite(amount) || amount <= 0) {
        setError("Enter a valid amount.");
        setBusy(false);
        return;
      }
      const payload = {
        patientName: form.patientName.trim(),
        service: form.service.trim(),
        amount,
        status: form.status,
      };
      if (editingId) {
        await authJson(`/api/invoices/${editingId}`, { method: "PATCH", body: JSON.stringify(payload) });
      } else {
        await authJson("/api/invoices", { method: "POST", body: JSON.stringify(payload) });
      }
      resetForm();
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setBusy(false);
    }
  };

  const onEdit = (inv) => {
    setEditingId(inv.id);
    setForm({
      patientName: inv.patientName,
      service: inv.service,
      amount: String(inv.amount),
      status: inv.status,
    });
  };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this invoice?")) return;
    setBusy(true);
    try {
      await authJson(`/api/invoices/${id}`, { method: "DELETE" });
      await load();
      if (editingId === id) resetForm();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setBusy(false);
    }
  };

  const fmtMoney = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? `$${n.toFixed(2)}` : v;
  };

  return (
    <>
      <AppPageHeader
        title="Billing System"
        subtitle="Generate invoices and monitor payment status."
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
            <h3 className="text-lg font-semibold text-slate-900">{editingId ? "Edit invoice" : "Generate bill"}</h3>
            <form className="mt-4 space-y-3 text-sm" onSubmit={onSubmit}>
              <input name="patientName" value={form.patientName} onChange={onChange} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100" placeholder="Patient Name" required />
              <input name="service" value={form.service} onChange={onChange} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100" placeholder="Service" required />
              <input name="amount" type="number" step="0.01" min="0.01" value={form.amount} onChange={onChange} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100" placeholder="Amount" required />
              <select name="status" value={form.status} onChange={onChange} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100">
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
              </select>
              <div className="flex flex-wrap gap-2">
                <button type="submit" disabled={busy} className="w-full rounded-xl bg-cyan-600 px-4 py-2.5 font-semibold text-white transition hover:bg-cyan-700 disabled:opacity-60">
                  {busy ? "Saving…" : editingId ? "Update invoice" : "Generate invoice"}
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
            <h3 className="text-lg font-semibold text-slate-900">Payment status</h3>
            <p className="mt-1 text-xs text-slate-500">{loading ? "Loading…" : `${items.length} invoice(s)`}</p>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-xs uppercase text-slate-500">
                    <th className="px-3 py-2">Invoice</th>
                    <th className="px-3 py-2">Patient</th>
                    <th className="px-3 py-2">Amount</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50">
                      <td className="px-3 py-3 font-medium text-slate-900">{inv.invoiceNumber}</td>
                      <td className="px-3 py-3">{inv.patientName}</td>
                      <td className="px-3 py-3">{fmtMoney(inv.amount)}</td>
                      <td className="px-3 py-3">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-semibold ${
                            inv.status === "paid"
                              ? "bg-emerald-100 text-emerald-700"
                              : inv.status === "failed"
                                ? "bg-rose-100 text-rose-700"
                                : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {inv.status}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <button type="button" onClick={() => onEdit(inv)} className="rounded-lg bg-blue-100 px-2 py-1 text-blue-700">
                          Edit
                        </button>{" "}
                        <button type="button" onClick={() => void onDelete(inv.id)} className="rounded-lg bg-rose-100 px-2 py-1 text-rose-700">
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
