import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useSeo } from "../lib/useSeo";
import { Reveal } from "../components/Reveal";
import { PageHeader } from "../components/PageHeader";
import { QuoteCTA } from "../components/QuoteCTA";
import api, { resolveImage } from "../lib/api";

const fmt = (d) => new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

export default function Updates() {
  useSeo("Updates & News", "Latest news, harvests and announcements from NBMT Trading Co.");
  const [updates, setUpdates] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    api.get("/updates").then(({ data }) => setUpdates(data)).catch(() => {}).finally(() => setLoaded(true));
  }, []);

  return (
    <div>
      <PageHeader
        label="News & Updates"
        title="Latest from"
        accent="NBMT."
        description="Company news, seasonal harvests, product announcements and updates from our trading desk."
      />

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        {loaded && updates.length === 0 && (
          <p className="text-slate-500">No updates published yet. Please check back soon.</p>
        )}

        {updates.length > 0 && (
          <>
            {/* FEATURED */}
            <Reveal>
              <Link to={`/updates/${updates[0].slug}`} data-testid="featured-update" className="group grid grid-cols-1 lg:grid-cols-2 gap-8 border border-black/10 bg-white hover:-translate-y-1 transition-transform duration-500">
                <div className="aspect-[16/10] lg:aspect-auto overflow-hidden bg-stone-alt">
                  {updates[0].image_path && <img src={resolveImage(updates[0].image_path)} alt={updates[0].title} className="img-zoom w-full h-full object-cover" />}
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 keyline">
                    <span className="text-gold">{updates[0].category}</span>
                    <span>{fmt(updates[0].date)}</span>
                  </div>
                  <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl text-navy leading-[1.05]">{updates[0].title}</h2>
                  <p className="mt-4 text-slate-600 leading-relaxed">{updates[0].excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-semibold text-navy group-hover:text-gold transition-colors">
                    Read more <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
                  </span>
                </div>
              </Link>
            </Reveal>

            {/* GRID */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {updates.slice(1).map((u, i) => (
                <Reveal key={u.id} delay={(i % 3) * 0.05}>
                  <Link to={`/updates/${u.slug}`} data-testid={`update-${u.slug}`} className="group block bg-white border border-black/10 hover:-translate-y-1 transition-transform duration-500 h-full">
                    <div className="aspect-[16/10] overflow-hidden bg-stone-alt">
                      {u.image_path && <img src={resolveImage(u.image_path)} alt={u.title} loading="lazy" className="img-zoom w-full h-full object-cover" />}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 keyline">
                        <span className="text-gold">{u.category}</span>
                        <span>{fmt(u.date)}</span>
                      </div>
                      <h3 className="mt-3 font-serif text-2xl text-navy leading-tight">{u.title}</h3>
                      <p className="mt-2 text-sm text-slate-600 line-clamp-2">{u.excerpt}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </>
        )}
      </section>

      <QuoteCTA />
    </div>
  );
}
