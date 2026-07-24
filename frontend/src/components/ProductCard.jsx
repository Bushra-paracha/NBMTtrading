import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { categoryLabel } from "../data/products";

export const ProductCard = ({ product, index = 0 }) => (
  <Link
    to={`/products/${product.slug}`}
    data-testid={`product-card-${product.slug}`}
    className="group block bg-white border border-black/10 hover:-translate-y-1 transition-transform duration-500"
  >
    <div className="relative aspect-[4/3] overflow-hidden bg-stone-alt">
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        className="img-zoom w-full h-full object-cover"
      />
      {product.tag && (
        <span className="absolute top-4 left-4 bg-navy/90 text-stone-warm keyline !text-[0.62rem] px-3 py-1.5">
          {product.tag}
        </span>
      )}
    </div>
    <div className="p-6">
      <span className="keyline">{categoryLabel(product.category)}</span>
      <h3 className="mt-3 font-serif text-2xl text-navy leading-tight">{product.name}</h3>
      <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-2">{product.short}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy group-hover:text-gold transition-colors">
        View details
        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
      </span>
    </div>
  </Link>
);
