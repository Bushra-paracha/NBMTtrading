import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSeo } from "../lib/useSeo";
import { Reveal } from "../components/Reveal";
import { PageHeader } from "../components/PageHeader";
import { QuoteCTA } from "../components/QuoteCTA";
import { ProductCard } from "../components/ProductCard";
import { PRODUCTS, CATEGORIES } from "../data/products";

export default function Products() {
  useSeo("Products", "Explore NBMT Trading Co. products: basmati and non-basmati rice, Himalayan salt, wheat, yellow corn maize and sesame seeds.");
  const [params, setParams] = useSearchParams();
  const active = params.get("category") || "all";
  const [filter, setFilter] = useState(active);

  useEffect(() => {
    setFilter(params.get("category") || "all");
  }, [params]);

  const setCategory = (id) => {
    if (id === "all") setParams({});
    else setParams({ category: id });
  };

  const filtered = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

  return (
    <div>
      <PageHeader
        label="Our Range"
        title="Products we"
        accent="export."
        description="A focused portfolio of essential commodities, each supported by clear specifications, flexible packaging and a direct enquiry."
        image="https://images.pexels.com/photos/36346840/pexels-photo-36346840.jpeg?auto=compress&cs=tinysrgb&w=1400"
      />

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* FILTERS */}
        <Reveal>
          <div data-testid="product-filters" className="flex flex-wrap gap-3 border-b border-black/10 pb-8">
            {[{ id: "all", label: "All Products" }, ...CATEGORIES].map((c) => (
              <button
                key={c.id}
                data-testid={`filter-${c.id}`}
                onClick={() => setCategory(c.id)}
                className={`px-5 py-2.5 text-sm font-semibold border transition-colors ${
                  filter === c.id
                    ? "bg-navy text-stone-warm border-navy"
                    : "bg-transparent text-slate-600 border-black/15 hover:border-navy hover:text-navy"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.05}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="mt-12 text-slate-500">No products in this category yet.</p>
        )}
      </section>

      <QuoteCTA variant="stone" />
    </div>
  );
}
