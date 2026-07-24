import { useState, useEffect } from "react";
import { X, Award, ZoomIn } from "lucide-react";
import { useSeo } from "../lib/useSeo";
import { Reveal, Label } from "../components/Reveal";
import { PageHeader } from "../components/PageHeader";
import { QuoteCTA } from "../components/QuoteCTA";
import api, { resolveImage } from "../lib/api";
import { CREDENTIALS } from "../config";

export default function Certificates() {
  useSeo("Certificates", "View quality and compliance certificates held by NBMT Trading Co.");
  const [certs, setCerts] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    api.get("/certificates").then(({ data }) => setCerts(data)).catch(() => {});
  }, []);

  return (
    <div>
      <PageHeader
        label="Certificates"
        title="Certified quality,"
        accent="documented."
        description="Our shipments are supported by recognised quality and compliance standards. Click any certificate to view the scan."
      />

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <Reveal>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-black/10 pb-8">
            <span className="keyline flex items-center gap-2"><Award className="w-4 h-4 text-gold" strokeWidth={1.5} /> Standards</span>
            {CREDENTIALS.map((c) => (
              <span key={c} className="font-serif text-xl text-navy/80">{c}</span>
            ))}
          </div>
        </Reveal>

        {certs.length === 0 ? (
          <p className="mt-12 text-slate-500">Certificate scans will be published here shortly. Please contact us for documentation in the meantime.</p>
        ) : (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certs.map((c, i) => (
              <Reveal key={c.id} delay={(i % 3) * 0.05}>
                <button
                  onClick={() => setActive(c)}
                  data-testid={`certificate-${c.id}`}
                  className="group block text-left w-full bg-white border border-black/10 hover:-translate-y-1 transition-transform duration-500"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-stone-alt">
                    {c.image_path && <img src={resolveImage(c.image_path)} alt={c.name} loading="lazy" className="w-full h-full object-cover" />}
                    <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/30 transition-colors flex items-center justify-center">
                      <ZoomIn className="w-8 h-8 text-stone-warm opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-2xl text-navy">{c.name}</h3>
                    {c.issuer && <p className="mt-1 keyline">{c.issuer}</p>}
                    {c.description && <p className="mt-3 text-sm text-slate-600 line-clamp-2">{c.description}</p>}
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {active && (
        <div
          data-testid="certificate-lightbox"
          onClick={() => setActive(null)}
          className="fixed inset-0 z-[60] bg-navy/95 flex items-center justify-center p-6"
        >
          <button className="absolute top-6 right-6 text-stone-warm hover:text-gold" onClick={() => setActive(null)} data-testid="lightbox-close">
            <X className="w-8 h-8" strokeWidth={1.5} />
          </button>
          <div className="max-w-3xl max-h-[85vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <img src={resolveImage(active.image_path)} alt={active.name} className="w-full h-auto" />
            <div className="mt-4 text-center text-stone-warm">
              <p className="font-serif text-2xl">{active.name}</p>
              {active.issuer && <p className="keyline !text-slate-400 mt-1">{active.issuer}</p>}
            </div>
          </div>
        </div>
      )}

      <QuoteCTA variant="stone" />
    </div>
  );
}
