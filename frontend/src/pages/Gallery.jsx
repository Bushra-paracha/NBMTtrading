import { useState } from "react";
import { X } from "lucide-react";
import { useSeo } from "../lib/useSeo";
import { Reveal } from "../components/Reveal";
import { PageHeader } from "../components/PageHeader";
import { QuoteCTA } from "../components/QuoteCTA";
import { GALLERY } from "../data/gallery";

export default function Gallery() {
  useSeo("Gallery", "Shipment and logistics imagery from NBMT Trading Co.");
  const [active, setActive] = useState(null);

  return (
    <div>
      <PageHeader
        label="Gallery"
        title="Shipments, packing"
        accent="and logistics."
        description="A glimpse of how we handle, pack and move commodities from origin to your destination port."
      />

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {GALLERY.map((g, i) => (
            <Reveal key={i} delay={(i % 3) * 0.05}>
              <button
                onClick={() => setActive(g)}
                data-testid={`gallery-item-${i}`}
                className="group mb-4 block w-full overflow-hidden bg-navy break-inside-avoid"
              >
                <img src={g.src} alt={g.caption} loading="lazy" className="img-zoom w-full h-auto object-cover" />
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {active && (
        <div data-testid="gallery-lightbox" onClick={() => setActive(null)} className="fixed inset-0 z-[60] bg-navy/95 flex items-center justify-center p-6">
          <button className="absolute top-6 right-6 text-stone-warm hover:text-gold" onClick={() => setActive(null)}>
            <X className="w-8 h-8" strokeWidth={1.5} />
          </button>
          <figure className="max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img src={active.src} alt={active.caption} className="w-full h-auto max-h-[80vh] object-contain" />
            <figcaption className="mt-3 text-center text-slate-300 keyline">{active.caption}</figcaption>
          </figure>
        </div>
      )}

      <QuoteCTA />
    </div>
  );
}
