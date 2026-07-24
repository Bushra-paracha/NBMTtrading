import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";
import api, { resolveImage } from "../../lib/api";
import { ImageUpload } from "../../components/admin/ImageUpload";

const field = "w-full bg-white border border-slate-300 px-4 py-2.5 text-navy focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold";
const empty = { name: "", issuer: "", description: "", image_path: null };

export const CertificatesPanel = () => {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  const load = () => api.get("/certificates").then(({ data }) => setItems(data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (c) => { setEditing(c); setForm({ ...c }); setOpen(true); };
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const save = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error("Name is required."); return; }
    if (!form.image_path) { toast.error("Please upload a certificate scan."); return; }
    setSaving(true);
    const payload = { name: form.name, issuer: form.issuer, description: form.description, image_path: form.image_path };
    try {
      if (editing) await api.put(`/certificates/${editing.id}`, payload);
      else await api.post("/certificates", payload);
      toast.success(editing ? "Certificate saved." : "Certificate added.");
      setOpen(false);
      load();
    } catch { toast.error("Save failed."); }
    finally { setSaving(false); }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this certificate?")) return;
    try { await api.delete(`/certificates/${id}`); setItems((p) => p.filter((i) => i.id !== id)); toast.success("Deleted."); }
    catch { toast.error("Delete failed."); }
  };

  return (
    <div data-testid="certificates-panel">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl text-navy">Certificates</h1>
          <p className="text-sm text-slate-500 mt-1">{items.length} certificates</p>
        </div>
        <button onClick={openNew} data-testid="new-certificate-btn" className="inline-flex items-center gap-2 bg-navy text-white px-5 py-3 text-sm font-semibold hover:bg-navy-soft">
          <Plus className="w-4 h-4" strokeWidth={1.5} /> New certificate
        </button>
      </div>

      {items.length === 0 ? (
        <div className="border border-dashed border-slate-300 p-12 text-center text-slate-500">No certificates yet. Upload your first scan.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((c) => (
            <div key={c.id} data-testid={`admin-cert-${c.id}`} className="bg-white border border-slate-200">
              <div className="aspect-[3/4] bg-slate-100 overflow-hidden">
                {c.image_path && <img src={resolveImage(c.image_path)} alt={c.name} className="w-full h-full object-cover" />}
              </div>
              <div className="p-4">
                <h3 className="font-serif text-lg text-navy leading-tight">{c.name}</h3>
                {c.issuer && <p className="text-xs text-slate-500 mt-1">{c.issuer}</p>}
                <div className="mt-3 flex gap-2">
                  <button onClick={() => openEdit(c)} data-testid={`edit-cert-${c.id}`} className="flex-1 inline-flex items-center justify-center gap-1.5 border border-slate-300 py-2 text-xs font-semibold hover:border-navy"><Pencil className="w-3.5 h-3.5" strokeWidth={1.5} /> Edit</button>
                  <button onClick={() => remove(c.id)} data-testid={`delete-cert-${c.id}`} className="inline-flex items-center justify-center border border-slate-300 py-2 px-3 text-slate-500 hover:border-red-500 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-[70] bg-navy/60 flex items-start justify-center p-4 overflow-auto" onClick={() => setOpen(false)}>
          <form onClick={(e) => e.stopPropagation()} onSubmit={save} data-testid="certificate-form" className="bg-stone-warm w-full max-w-lg my-8 p-8 border border-black/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl text-navy">{editing ? "Edit certificate" : "New certificate"}</h2>
              <button type="button" onClick={() => setOpen(false)}><X className="w-6 h-6 text-slate-500" strokeWidth={1.5} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="keyline">Name *</label>
                <input className={`mt-2 ${field}`} value={form.name} onChange={set("name")} data-testid="cert-name" placeholder="e.g. ISO 9001:2015" />
              </div>
              <div>
                <label className="keyline">Issuer</label>
                <input className={`mt-2 ${field}`} value={form.issuer} onChange={set("issuer")} data-testid="cert-issuer" placeholder="Issuing body" />
              </div>
              <div>
                <label className="keyline">Description</label>
                <textarea rows={3} className={`mt-2 ${field} resize-none`} value={form.description} onChange={set("description")} data-testid="cert-description" placeholder="Short description" />
              </div>
              <div>
                <label className="keyline">Certificate scan *</label>
                <div className="mt-2"><ImageUpload value={form.image_path} onChange={(p) => setForm({ ...form, image_path: p })} testid="cert-image" /></div>
              </div>
            </div>
            <button type="submit" disabled={saving} data-testid="cert-save" className="mt-6 inline-flex items-center gap-2 bg-navy text-white px-6 py-3 font-semibold hover:bg-navy-soft disabled:opacity-60">
              {saving && <Loader2 className="w-4 h-4 animate-spin" />} {editing ? "Save changes" : "Add certificate"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
