import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, ArrowLeft, MessageCircle, Check, Package } from "lucide-react";
import { useSeo } from "../lib/useSeo";
import { Reveal, Label } from "../components/Reveal";
import { ProductCard } from "../components/ProductCard";
import { getProduct, PRODUCTS, categoryLabel } from "../data/products";
import { whatsappUrl } from "../config";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = getProduct(slug);
  useSeo(product ? product.name : "Product", product ? product.short : "");

  if (!product) {
    return (
      <div className="pt-40 pb-24 text-center min-h-[60vh]">
        <p className="font-serif text-4xl text-navy">Product not found</p>
        <Link to="/products" className="mt-6 inline-flex items-center gap-2 text-gold font-semibold">
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} /> Back to products
        </Link>
      </div>
    );
  }

  const related = PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 3);
  const enquiryMsg = `Hello NBMT Trading Co., I would like to enquire about ${product.name}. Please share your best offer and packing options.`;

  return (
    <div>
      <div className="pt-28 md:pt-36 bg-stone-warm">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <Link to="/products" data-testid="back-to-products" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-navy transition-colors">
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} /> All products
          </Link>
        </div>
      </div>

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          <Reveal>
            <div className="aspect-[4/3] overflow-hidden bg-stone-alt border border-black/10">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Label>{categoryLabel(product.category)}</Label>
            <h1 className="mt-5 font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.02] text-navy">
              {product.name}
            </h1>
            <p className="mt-6 text-lg text-slate-700 leading-relaxed">{product.description}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link to={`/quote?product=${encodeURIComponent(product.name)}`} data-testid="product-enquiry-btn" className="group inline-flex items-center justify-center gap-2 bg-navy text-stone-warm px-7 py-4 font-semibold hover:bg-navy-soft transition-colors">
                Enquire about this product
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
              </Link>
              <a href={whatsappUrl(enquiryMsg)} target="_blank" rel="noreferrer" className="group inline-flex items-center justify-center gap-2 border border-navy/20 text-navy px-7 py-4 font-semibold hover:bg-navy hover:text-stone-warm transition-colors">
                WhatsApp
                <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SPECS & PACKAGING */}
      <section className="bg-stone-alt">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            <Reveal>
              <Label>Specifications</Label>
              <div className="mt-8 border-t border-black/10">
                {product.specs.map((s) => (
                  <div key={s.label} className="flex items-center justify-between py-4 border-b border-black/10">
                    <span className="text-sm text-slate-500">{s.label}</span>
                    <span className="font-serif text-xl text-navy">{s.value}</span>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <Label>Packaging Options</Label>
              <ul className="mt-8 space-y-4">
                {product.packaging.map((p) => (
                  <li key={p} className="flex items-start gap-3 py-3 border-b border-black/10">
                    <Package className="w-5 h-5 text-gold shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-slate-700">{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex items-start gap-3 text-sm text-slate-500">
                <Check className="w-4 h-4 text-gold mt-0.5 shrink-0" strokeWidth={1.5} />
                Private label and custom packing available on request.
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <Label>Related</Label>
          <h2 className="mt-6 font-serif text-4xl sm:text-5xl tracking-tight">More in {categoryLabel(product.category)}</h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
