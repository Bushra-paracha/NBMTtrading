import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, ShieldCheck, Ship, Package, Globe2, Factory, Award } from "lucide-react";
import { useSeo } from "../lib/useSeo";
import { Reveal, Label } from "../components/Reveal";
import { QuoteCTA } from "../components/QuoteCTA";
import { ProductCard } from "../components/ProductCard";
import { CATEGORIES, PRODUCTS, FEATURED_SLUGS, getProduct } from "../data/products";
import { MARKETS } from "../data/markets";
import { GALLERY } from "../data/gallery";
import { CREDENTIALS, COMPANY } from "../config";
import api, { resolveImage } from "../lib/api";

const HERO_IMG = "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=80";

const CATEGORY_IMAGES = {
  basmati: "https://images.pexels.com/photos/36346840/pexels-photo-36346840.jpeg?auto=compress&cs=tinysrgb&w=800",
  "non-basmati": "https://images.pexels.com/photos/6086556/pexels-photo-6086556.jpeg?auto=compress&cs=tinysrgb&w=800",
  salt: "https://images.pexels.com/photos/9974508/pexels-photo-9974508.jpeg?auto=compress&cs=tinysrgb&w=800",
  wheat: "https://images.pexels.com/photos/54084/wheat-grain-agriculture-seed-54084.jpeg?auto=compress&cs=tinysrgb&w=800",
  corn: "https://images.pexels.com/photos/30204262/pexels-photo-30204262.jpeg?auto=compress&cs=tinysrgb&w=800",
  sesame: "https://images.pexels.com/photos/7420888/pexels-photo-7420888.jpeg?auto=compress&cs=tinysrgb&w=800",
};

const STATS = [
  { value: "6", label: "Commodity Ranges" },
  { value: "20+", label: "Markets Served" },
  { value: "FOB", label: "& CIF Worldwide" },
  { value: "Dubai", label: "United Arab Emirates" },
];

const STORY = [
  { icon: Factory, title: "Rigorous Sourcing", body: "We select from trusted origins and vet every consignment for quality, purity and consistency before it carries our name." },
  { icon: ShieldCheck, title: "Certified Quality", body: "Every shipment can be supported by SGS or Bureau Veritas inspection, with documentation prepared to your market's requirements." },
  { icon: Globe2, title: "Global Reach", body: "From our base in Dubai we supply importers, distributors and re-exporters across the Gulf, Africa, Asia and Europe." },
  { icon: Ship, title: "Reliable Logistics", body: "FOB and CIF terms to all major ports, with careful packing and transparent timelines on every order." },
];

export default function Home() {
  useSeo(
    "Premium Agricultural Commodity Exporter",
    "NBMT Trading Co. is a Dubai based exporter of premium rice, salt, wheat, corn and sesame seeds to buyers worldwide."
  );
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    api.get("/updates").then(({ data }) => setUpdates(data.slice(0, 3))).catch(() => {});
  }, []);

  const featured = FEATURED_SLUGS.map(getProduct).filter(Boolean);

  return (
    <div>
      {/* HERO */}
      <section data-testid="hero" className="relative min-h-screen flex items-end overflow-hidden bg-navy">
        <img src={HERO_IMG} alt="Global logistics" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/30" />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 pb-20 pt-40 w-full text-stone-warm">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            <Label className="!text-gold">Dubai, United Arab Emirates</Label>
            <h1 className="mt-8 font-serif text-5xl sm:text-6xl lg:text-8xl leading-[0.95] tracking-tight max-w-5xl">
              Premium agricultural commodities, <span className="italic text-gold">exported from Dubai.</span>
            </h1>
            <p className="mt-8 text-lg text-slate-200 max-w-2xl leading-relaxed">
              {COMPANY.name} sources and supplies basmati and non-basmati rice, Himalayan and edible salt,
              wheat, yellow corn maize and natural sesame seeds to buyers across the world.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to="/quote" data-testid="hero-quote-btn" className="group inline-flex items-center justify-center gap-2 bg-gold text-navy px-8 py-4 font-semibold hover:bg-gold-dark transition-colors">
                Request a Quote
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
              </Link>
              <Link to="/products" data-testid="hero-products-btn" className="group inline-flex items-center justify-center gap-2 border border-white/30 text-stone-warm px-8 py-4 font-semibold hover:bg-white/10 transition-colors">
                View Products
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-navy-light text-stone-warm border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {STATS.map((s, i) => (
            <div key={i} className="py-10 px-6 first:pl-0">
              <p className="font-serif text-4xl md:text-5xl text-gold">{s.value}</p>
              <p className="mt-2 keyline !text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CREDIBILITY STRIP */}
      <section data-testid="credibility-strip" className="bg-stone-alt border-b border-black/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-10">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            <span className="keyline flex items-center gap-2"><Award className="w-4 h-4 text-gold" strokeWidth={1.5} /> Quality Assured</span>
            {CREDENTIALS.map((c) => (
              <span key={c} className="font-serif text-xl md:text-2xl text-navy/80">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT CATEGORIES */}
      <section data-testid="categories" className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <Label>Our Range</Label>
              <h2 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight max-w-2xl leading-[1.02]">
                A focused portfolio of <span className="italic text-gold">essential commodities.</span>
              </h2>
            </div>
            <Link to="/products" className="group inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-gold transition-colors shrink-0">
              View all products
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/10 border border-black/10">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.05}>
              <Link
                to={`/products?category=${c.id}`}
                data-testid={`category-${c.id}`}
                className="group relative flex flex-col justify-end h-72 overflow-hidden bg-navy"
              >
                <img src={CATEGORY_IMAGES[c.id]} alt={c.label} loading="lazy" className="img-zoom absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
                <div className="relative p-7 text-stone-warm">
                  <h3 className="font-serif text-3xl">{c.label}</h3>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-gold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                    Explore <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* QUALITY STORY */}
      <section data-testid="quality-story" className="bg-stone-alt">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <Reveal>
              <Label>Sourcing & Quality</Label>
              <h2 className="mt-6 font-serif text-4xl sm:text-5xl tracking-tight leading-[1.05]">
                Sourced with rigour. <span className="italic text-gold">Shipped with care.</span>
              </h2>
              <p className="mt-6 text-lg text-slate-700 leading-relaxed">
                As an independent Dubai trading house, our reputation rests on the integrity of every consignment.
                We work only with vetted origins, verify quality at each stage and prepare documentation to suit
                your market, so that what arrives at your port is exactly what was agreed.
              </p>
              <div className="mt-10 aspect-[16/10] overflow-hidden">
                <img src="https://images.pexels.com/photos/21958120/pexels-photo-21958120.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Export packing" className="w-full h-full object-cover" />
              </div>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-black/10 border border-black/10">
              {STORY.map((s, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <div className="bg-stone-warm p-8 h-full">
                    <s.icon className="w-7 h-7 text-gold" strokeWidth={1.5} />
                    <h3 className="mt-5 font-serif text-2xl text-navy">{s.title}</h3>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section data-testid="featured-products" className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">
        <Reveal>
          <Label>Featured</Label>
          <h2 className="mt-6 font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.02]">Signature products</h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* MARKETS SERVED */}
      <section data-testid="markets-served" className="bg-navy text-stone-warm">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
            <Reveal className="lg:col-span-5">
              <Label className="!text-gold">Global Reach</Label>
              <h2 className="mt-6 font-serif text-4xl sm:text-5xl tracking-tight leading-[1.05]">
                Trusted by buyers across <span className="italic text-gold">many markets.</span>
              </h2>
              <p className="mt-6 text-slate-300 leading-relaxed">
                From our base in Dubai we serve importers, distributors and re-exporters across the Gulf,
                Africa, Asia, Europe and the Americas.
              </p>
              <Link to="/global-reach" className="group mt-8 inline-flex items-center gap-2 border border-gold/40 text-gold px-6 py-3 font-semibold hover:bg-gold hover:text-navy transition-colors">
                Explore Global Reach
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
              </Link>
            </Reveal>
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-px bg-white/10 border border-white/10">
              {MARKETS.map((m, i) => (
                <Reveal key={m.id} delay={i * 0.04}>
                  <div className="bg-navy p-6 h-full">
                    <p className="font-serif text-2xl text-gold">{m.region}</p>
                    <p className="mt-2 text-xs text-slate-400 leading-relaxed">{m.countries.slice(0, 3).join(", ")}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRIVATE LABEL */}
      <section data-testid="private-label" className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <div className="aspect-[4/3] overflow-hidden bg-stone-alt">
              <img src="https://images.unsplash.com/photo-1775259608525-cf332eaf89d3?auto=format&fit=crop&w=1200&q=80" alt="Private label packing" className="w-full h-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Label>Private Label & Packing</Label>
            <h2 className="mt-6 font-serif text-4xl sm:text-5xl tracking-tight leading-[1.05]">
              Custom packing under <span className="italic text-gold">your own brand.</span>
            </h2>
            <p className="mt-6 text-lg text-slate-700 leading-relaxed">
              We offer flexible packing in PP, jute and non-woven bags, as well as branded consumer packs.
              Private label is available under your own brand for both retail and wholesale.
            </p>
            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["5kg, 25kg, 50kg & custom packing", "PP, jute, non-woven & consumer packs", "Private label under your brand", "FOB & CIF worldwide"].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-slate-700">
                  <Package className="w-5 h-5 text-gold shrink-0 mt-0.5" strokeWidth={1.5} /> {t}
                </li>
              ))}
            </ul>
            <Link to="/quote" className="group mt-10 inline-flex items-center gap-2 bg-navy text-stone-warm px-6 py-4 font-semibold hover:bg-navy-soft transition-colors">
              Discuss your requirement
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* LOGISTICS GALLERY */}
      <section data-testid="logistics-gallery" className="bg-stone-alt">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <Label>Logistics</Label>
                <h2 className="mt-6 font-serif text-4xl sm:text-5xl tracking-tight leading-[1.02]">From port to your door</h2>
              </div>
              <Link to="/gallery" className="group inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-gold transition-colors">
                View gallery <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
            {GALLERY.slice(0, 4).map((g, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="group aspect-[3/4] overflow-hidden bg-navy">
                  <img src={g.src} alt={g.caption} loading="lazy" className="img-zoom w-full h-full object-cover" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST UPDATES */}
      {updates.length > 0 && (
        <section data-testid="latest-updates" className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <Label>News & Updates</Label>
                <h2 className="mt-6 font-serif text-4xl sm:text-5xl tracking-tight leading-[1.02]">Latest from NBMT</h2>
              </div>
              <Link to="/updates" className="group inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-gold transition-colors">
                All updates <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {updates.map((u, i) => (
              <Reveal key={u.id} delay={i * 0.05}>
                <Link to={`/updates/${u.slug}`} className="group block bg-white border border-black/10 hover:-translate-y-1 transition-transform duration-500 h-full">
                  <div className="aspect-[16/10] overflow-hidden bg-stone-alt">
                    {u.image_path && <img src={resolveImage(u.image_path)} alt={u.title} className="img-zoom w-full h-full object-cover" />}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 keyline">
                      <span className="text-gold">{u.category}</span>
                      <span>{new Date(u.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span>
                    </div>
                    <h3 className="mt-3 font-serif text-2xl text-navy leading-tight">{u.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 line-clamp-2">{u.excerpt}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <QuoteCTA />
    </div>
  );
}
