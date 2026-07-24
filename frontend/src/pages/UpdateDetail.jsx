import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useSeo } from "../lib/useSeo";
import { Reveal, Label } from "../components/Reveal";
import { QuoteCTA } from "../components/QuoteCTA";
import api, { resolveImage } from "../lib/api";

const fmt = (d) => new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });

export default function UpdateDetail() {
  const { slug } = useParams();
  const [update, setUpdate] = useState(null);
  const [status, setStatus] = useState("loading");
  useSeo(update ? update.title : "Update", update ? update.excerpt : "");

  useEffect(() => {
    api.get(`/updates/${slug}`).then(({ data }) => { setUpdate(data); setStatus("ok"); }).catch(() => setStatus("notfound"));
  }, [slug]);

  if (status === "loading") {
    return <div className="min-h-[70vh] flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-gold" /></div>;
  }
  if (status === "notfound") {
    return (
      <div className="pt-40 pb-24 text-center min-h-[60vh]">
        <p className="font-serif text-4xl text-navy">Update not found</p>
        <Link to="/updates" className="mt-6 inline-flex items-center gap-2 text-gold font-semibold"><ArrowLeft className="w-4 h-4" strokeWidth={1.5} /> All updates</Link>
      </div>
    );
  }

  return (
    <div>
      <article className="pt-32 md:pt-40">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <Reveal>
            <Link to="/updates" data-testid="back-to-updates" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-navy transition-colors">
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} /> All updates
            </Link>
            <div className="mt-8 flex items-center gap-3 keyline">
              <span className="text-gold">{update.category}</span>
              <span>{fmt(update.date)}</span>
            </div>
            <h1 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.02] text-navy">{update.title}</h1>
            {update.excerpt && <p className="mt-6 text-xl text-slate-600 leading-relaxed">{update.excerpt}</p>}
          </Reveal>
        </div>

        {update.image_path && (
          <Reveal delay={0.1}>
            <div className="max-w-5xl mx-auto px-6 md:px-12 mt-12">
              <div className="aspect-[16/9] overflow-hidden bg-stone-alt">
                <img src={resolveImage(update.image_path)} alt={update.title} className="w-full h-full object-cover" />
              </div>
            </div>
          </Reveal>
        )}

        <div className="max-w-3xl mx-auto px-6 md:px-12 py-16">
          <Reveal>
            <div className="prose-nbmt text-lg text-slate-700 leading-relaxed whitespace-pre-line">
              {update.body}
            </div>
          </Reveal>
        </div>
      </article>

      <QuoteCTA />
    </div>
  );
}
