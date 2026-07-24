import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Mail, Building2, MapPin, Phone, Package, Trash2, ChevronDown } from "lucide-react";
import api from "../../lib/api";

const STATUSES = [
  { id: "new", label: "New" },
  { id: "in_progress", label: "In Progress" },
  { id: "quoted", label: "Quoted" },
  { id: "closed", label: "Closed" },
];
const statusColor = {
  new: "bg-blue-100 text-blue-800 border-blue-200",
  in_progress: "bg-amber-100 text-amber-800 border-amber-200",
  quoted: "bg-emerald-100 text-emerald-800 border-emerald-200",
  closed: "bg-slate-200 text-slate-600 border-slate-300",
};
const fmt = (d) => new Date(d).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

export const EnquiriesPanel = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);

  const load = () => {
    api.get("/enquiries").then(({ data }) => setItems(data)).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const changeStatus = async (id, status) => {
    try {
      await api.patch(`/enquiries/${id}`, { status });
      setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
      toast.success("Status updated.");
    } catch { toast.error("Update failed."); }
  };
  const remove = async (id) => {
    if (!window.confirm("Delete this enquiry?")) return;
    try {
      await api.delete(`/enquiries/${id}`);
      setItems((prev) => prev.filter((i) => i.id !== id));
      toast.success("Enquiry deleted.");
    } catch { toast.error("Delete failed."); }
  };

  const filtered = filter === "all" ? items : items.filter((i) => i.status === filter);
  const counts = STATUSES.reduce((a, s) => ({ ...a, [s.id]: items.filter((i) => i.status === s.id).length }), {});

  return (
    <div data-testid="enquiries-panel">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-serif text-3xl text-navy">Enquiries</h1>
          <p className="text-sm text-slate-500 mt-1">{items.length} total submissions</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {[{ id: "all", label: "All" }, ...STATUSES].map((s) => (
            <button key={s.id} onClick={() => setFilter(s.id)} data-testid={`enq-filter-${s.id}`} className={`px-4 py-2 text-xs font-semibold border transition-colors ${filter === s.id ? "bg-navy text-white border-navy" : "border-slate-300 text-slate-600 hover:border-navy"}`}>
              {s.label}{s.id !== "all" ? ` (${counts[s.id] || 0})` : ""}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : filtered.length === 0 ? (
        <div className="border border-dashed border-slate-300 p-12 text-center text-slate-500">No enquiries in this view.</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((e) => (
            <div key={e.id} data-testid={`enquiry-${e.id}`} className="bg-white border border-slate-200">
              <div className="flex flex-wrap items-center gap-4 p-5">
                <div className="flex-1 min-w-[200px]">
                  <div className="flex items-center gap-3">
                    <span className={`text-[0.65rem] font-semibold uppercase tracking-wider px-2.5 py-1 border ${e.type === "quote" ? "bg-gold/15 text-gold-dark border-gold/30" : "bg-slate-100 text-slate-600 border-slate-200"}`}>{e.type}</span>
                    <p className="font-serif text-xl text-navy">{e.name}</p>
                  </div>
                  <p className="text-sm text-slate-500 mt-1">{e.company || "No company"} · {fmt(e.created_at)}</p>
                </div>
                <select value={e.status} onChange={(ev) => changeStatus(e.id, ev.target.value)} data-testid={`enq-status-${e.id}`} className={`text-xs font-semibold px-3 py-2 border ${statusColor[e.status]}`}>
                  {STATUSES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
                <button onClick={() => setExpanded(expanded === e.id ? null : e.id)} className="p-2 text-slate-400 hover:text-navy" data-testid={`enq-expand-${e.id}`}>
                  <ChevronDown className={`w-5 h-5 transition-transform ${expanded === e.id ? "rotate-180" : ""}`} strokeWidth={1.5} />
                </button>
                <button onClick={() => remove(e.id)} className="p-2 text-slate-400 hover:text-red-600" data-testid={`enq-delete-${e.id}`}>
                  <Trash2 className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>
              {expanded === e.id && (
                <div className="border-t border-slate-100 p-5 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 text-sm">
                  <p className="flex items-center gap-2 text-slate-700"><Mail className="w-4 h-4 text-gold" strokeWidth={1.5} /> <a href={`mailto:${e.email}`} className="hover:text-gold">{e.email}</a></p>
                  {e.phone && <p className="flex items-center gap-2 text-slate-700"><Phone className="w-4 h-4 text-gold" strokeWidth={1.5} /> {e.phone}</p>}
                  {e.company && <p className="flex items-center gap-2 text-slate-700"><Building2 className="w-4 h-4 text-gold" strokeWidth={1.5} /> {e.company}</p>}
                  {e.country && <p className="flex items-center gap-2 text-slate-700"><MapPin className="w-4 h-4 text-gold" strokeWidth={1.5} /> {e.country}</p>}
                  {e.product && <p className="flex items-center gap-2 text-slate-700"><Package className="w-4 h-4 text-gold" strokeWidth={1.5} /> {e.product}{e.quantity ? ` — ${e.quantity}` : ""}</p>}
                  {(e.incoterm || e.destination_port) && <p className="text-slate-700">Terms: {e.incoterm} {e.destination_port ? `to ${e.destination_port}` : ""}</p>}
                  {e.message && <p className="md:col-span-2 text-slate-700 whitespace-pre-line border-t border-slate-200 pt-3">{e.message}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
