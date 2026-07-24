import { useState } from "react";
import { toast } from "sonner";
import { UploadCloud, Loader2, X } from "lucide-react";
import api, { resolveImage } from "../../lib/api";

export const ImageUpload = ({ value, onChange, testid = "image-upload" }) => {
  const [uploading, setUploading] = useState(false);

  const handle = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const { data } = await api.post("/upload", fd, { headers: { "Content-Type": "multipart/form-data" } });
      onChange(data.path);
      toast.success("Image uploaded.");
    } catch {
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {value ? (
        <div className="relative inline-block">
          <img src={resolveImage(value)} alt="Uploaded" className="h-40 w-auto border border-black/15 object-cover" />
          <button type="button" onClick={() => onChange(null)} className="absolute -top-2 -right-2 bg-navy text-white w-7 h-7 flex items-center justify-center" data-testid={`${testid}-remove`}>
            <X className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center gap-2 h-40 border border-dashed border-black/25 bg-white cursor-pointer hover:border-gold transition-colors" data-testid={testid}>
          {uploading ? <Loader2 className="w-6 h-6 animate-spin text-gold" /> : <UploadCloud className="w-7 h-7 text-slate-400" strokeWidth={1.5} />}
          <span className="text-sm text-slate-500">{uploading ? "Uploading..." : "Click to upload image"}</span>
          <input type="file" accept="image/*" className="hidden" onChange={handle} disabled={uploading} />
        </label>
      )}
    </div>
  );
};
