import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";
import api, { resolveImage } from "../../lib/api";
import { ImageUpload } from "../../components/admin/ImageUpload";

const field = "w-full bg-white border border-slate-300 px-4 py-2.5 text-navy focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold";
const CATS = ["News", "Award", "Harvest", "Product", "Announcement"];
const empty = { title: "", category: "News", excerpt: "", body: "", image_path: null, published: true };

export const UpdatesPanel = () => {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  const load = () => api.get("/updates?all=true").then(({ data }) => setItems(data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (u) => { setEditing(u); setForm({ ...u }); setOpen(true); };
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const save = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { toast.error("Title is required."); return; }
    setSaving(true);
    const payload = { title: form.title, category: form.category, excerpt: form.excerpt, body: form.body, image_path: form.image_path, published: form.published };
    try {
      if (editing) await api.put(`/updates/${editing.id}`, payload);
      else await api.post("/updates", payload);
      toast.success(editing ? "Update saved." : "Update published.");
      setOpen(false);
      load();
    } catch { toast.error("Save failed."); }
    finally { setSaving(false); }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this update?")) return;
    try { await api.delete(`/updates/${id}`); setItems((p) => p.filter((i) => i.id !== id)); toast.success("Deleted."); }
    catch { toast.error("Delete failed."); }
  };

  return (
    <div data-testid="updates-panel">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl text-navy">Updates & News</h1>
          <p className="text-sm text-slate-500 mt-1">{items.length} posts</p>
        </div>
        <button onClick={openNew} data-testid="new-update-btn" className="inline-flex items-center gap-2 bg-navy text-white px-5 py-3 text-sm font-semibold hover:bg-navy-soft">
          <Plus className="w-4 h-4" strokeWidth={1.5} /> New update
        </button>
      </div>

      {items.length === 0 ? (
        <div className="border border-dashed border-slate-300 p-12 text-center text-slate-500">No updates yet. Create your first post.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((u) => (
            <div key={u.id} data-testid={`admin-update-${u.id}`} className="bg-white border border-slate-200">
              <div className="aspect-[16/10] bg-slate-100 overflow-hidden">
                {u.image_path && <img src={resolveImage(u.image_path)} alt={u.title} className="w-full h-full object-cover" />}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-wider font-semibold">
                  <span className="text-gold-dark">{u.category}</span>
                  {!u.published && <span className="text-slate-400">· Draft</span>}
                </div>
                <h3 className="mt-2 font-serif text-lg text-navy leading-tight line-clamp-2">{u.title}</h3>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => openEdit(u)} data-testid={`edit-update-${u.id}`} className="flex-1 inline-flex items-center justify-center gap-1.5 border border-slate-300 py-2 text-xs font-semibold hover:border-navy"><Pencil className="w-3.5 h-3.5" strokeWidth={1.5} /> Edit</button>
                  <button onClick={() => remove(u.id)} data-testid={`delete-update-${u.id}`} className="inline-flex items-center justify-center border border-slate-300 py-2 px-3 text-slate-500 hover:border-red-500 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-[70] bg-navy/60 flex items-start justify-center p-4 overflow-auto" onClick={() => setOpen(false)}>
          <form onClick={(e) => e.stopPropagation()} onSubmit={save} data-testid="update-form" className="bg-stone-warm w-full max-w-2xl my-8 p-8 border border-black/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl text-navy">{editing ? "Edit update" : "New update"}</h2>
              <button type="button" onClick={() => setOpen(false)}><X className="w-6 h-6 text-slate-500" strokeWidth={1.5} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="keyline">Title *</label>
                <input className={`mt-2 ${field}`} value={form.title} onChange={set("title")} data-testid="update-title" placeholder="Update title" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="keyline">Category</label>
                  <select className={`mt-2 ${field}`} value={form.category} onChange={set("category")} data-testid="update-category">
                    {CATS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 text-sm text-navy cursor-pointer">
                    <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} data-testid="update-published" className="w-4 h-4 accent-navy" />
                    Published
                  </label>
                </div>
              </div>
              <div>
                <label className="keyline">Excerpt</label>
                <textarea rows={2} className={`mt-2 ${field} resize-none`} value={form.excerpt} onChange={set("excerpt")} data-testid="update-excerpt" placeholder="Short summary shown in listings" />
              </div>
              <div>
                <label className="keyline">Body</label>
                <textarea rows={6} className={`mt-2 ${field} resize-none`} value={form.body} onChange={set("body")} data-testid="update-body" placeholder="Full article text" />
              </div>
              <div>
                <label className="keyline">Image</label>
                <div className="mt-2"><ImageUpload value={form.image_path} onChange={(p) => setForm({ ...form, image_path: p })} testid="update-image" /></div>
              </div>
            </div>
            <button type="submit" disabled={saving} data-testid="update-save" className="mt-6 inline-flex items-center gap-2 bg-navy text-white px-6 py-3 font-semibold hover:bg-navy-soft disabled:opacity-60">
              {saving && <Loader2 className="w-4 h-4 animate-spin" />} {editing ? "Save changes" : "Publish update"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
