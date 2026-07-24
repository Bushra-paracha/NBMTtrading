import { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { MapPin, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSeo } from "../lib/useSeo";
import { Reveal, Label } from "../components/Reveal";
import { QuoteCTA } from "../components/QuoteCTA";
import { MARKETS, BUYER_TYPES } from "../data/markets";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function GlobalReach() {
  useSeo("Global Reach", "NBMT Trading Co. serves buyers across the Gulf, Africa, Asia, Europe and the Americas.");
  const [active, setActive] = useState(MARKETS[0]);

  return (
    <div>
      <section className="relative pt-32 md:pt-40 pb-12 bg-navy text-stone-warm">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Reveal>
            <Label className="!text-gold">Global Reach</Label>
            <h1 className="mt-6 font-serif text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.98] max-w-4xl">
              A truly <span className="italic text-gold">global footprint.</span>
            </h1>
            <p className="mt-6 text-slate-300 max-w-2xl leading-relaxed">
              From our base in the UAE we ship premium rice, salt, wheat, corn and sesame seeds to buyers across the
              world. Select a region on the map to explore the markets we serve.
            </p>
          </Reveal>
        </div>
      </section>

      {/* MAP */}
      <section className="bg-navy text-stone-warm pb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8 border border-white/10 bg-navy-light" data-testid="world-map">
              <ComposableMap projection="geoMercator" projectionConfig={{ scale: 130, center: [20, 25] }} style={{ width: "100%", height: "auto" }}>
                <Geographies geography={GEO_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        style={{
                          default: { fill: "#1b264f", stroke: "#0B132B", strokeWidth: 0.5, outline: "none" },
                          hover: { fill: "#243163", outline: "none" },
                          pressed: { fill: "#243163", outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>
                {MARKETS.map((m) => {
                  const isActive = active.id === m.id;
                  return (
                    <Marker key={m.id} coordinates={m.coordinates} onClick={() => setActive(m)} style={{ cursor: "pointer" }}>
                      <circle r={isActive ? 9 : 5} fill={isActive ? "#C5A059" : "rgba(197,160,89,0.5)"} stroke="#C5A059" strokeWidth={1.5} className="transition-all" />
                      {isActive && <circle r={16} fill="none" stroke="#C5A059" strokeWidth={1} opacity={0.5} />}
                    </Marker>
                  );
                })}
              </ComposableMap>
              <div className="flex flex-wrap gap-2 p-4 border-t border-white/10">
                {MARKETS.map((m) => (
                  <button
                    key={m.id}
                    data-testid={`market-btn-${m.id}`}
                    onClick={() => setActive(m)}
                    className={`px-4 py-2 text-xs font-semibold border transition-colors ${
                      active.id === m.id ? "bg-gold text-navy border-gold" : "border-white/15 text-slate-300 hover:border-gold hover:text-gold"
                    }`}
                  >
                    {m.region}
                  </button>
                ))}
              </div>
            </div>

            {/* PANEL */}
            <div className="lg:col-span-4" data-testid="market-panel">
              <div className="border border-white/10 bg-navy-light p-8 sticky top-28">
                <MapPin className="w-7 h-7 text-gold" strokeWidth={1.5} />
                <h2 className="mt-5 font-serif text-4xl text-gold">{active.region}</h2>
                <p className="mt-4 text-slate-300 leading-relaxed">{active.note}</p>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="keyline !text-slate-400 mb-3">Countries</p>
                  <div className="flex flex-wrap gap-2">
                    {active.countries.map((c) => (
                      <span key={c} className="text-xs bg-white/5 px-3 py-1.5 text-slate-200">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BUYER TYPES */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">
        <Reveal>
          <Label>Who we supply</Label>
          <h2 className="mt-6 font-serif text-4xl sm:text-5xl tracking-tight leading-[1.05] max-w-3xl">
            Trusted across the <span className="italic text-gold">supply chain.</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-black/10 border border-black/10">
          {BUYER_TYPES.map((b, i) => (
            <Reveal key={b} delay={i * 0.04}>
              <div className="bg-stone-warm p-7 h-full flex items-center">
                <p className="font-serif text-xl text-navy leading-tight">{b}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-12">
          <Link to="/contact" className="group inline-flex items-center gap-2 bg-navy text-stone-warm px-6 py-4 font-semibold hover:bg-navy-soft transition-colors">
            Become a partner
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      <QuoteCTA />
    </div>
  );
}
