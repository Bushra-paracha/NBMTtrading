import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, MessageCircle, ArrowUpRight } from "lucide-react";
import { COMPANY, NAV_LINKS, whatsappUrl } from "../../config";
import { CATEGORIES } from "../../data/products";

export const Footer = () => (
  <footer data-testid="site-footer" className="bg-navy text-stone-warm">
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <img src={COMPANY.logo} alt="NBMT Trading Co." className="h-14 w-auto mb-6" />
          <p className="text-slate-300 leading-relaxed max-w-sm text-sm">
            {COMPANY.name} is an independent Dubai based exporter of premium agricultural
            commodities, sourced with rigour and shipped worldwide with care.
          </p>
        </div>

        <div className="md:col-span-2">
          <h4 className="keyline text-slate-400 mb-6">Explore</h4>
          <ul className="space-y-3">
            {NAV_LINKS.slice(0, 6).map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-slate-300 hover:text-gold transition-colors text-sm">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="keyline text-slate-400 mb-6">Products</h4>
          <ul className="space-y-3">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link to={`/products?category=${c.id}`} className="text-slate-300 hover:text-gold transition-colors text-sm">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="keyline text-slate-400 mb-6">Get in touch</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3 text-slate-300">
              <MapPin className="w-4 h-4 mt-0.5 text-gold shrink-0" strokeWidth={1.5} />
              {COMPANY.address}
            </li>
            <li>
              <a href={`tel:${COMPANY.phoneRaw}`} className="flex items-center gap-3 text-slate-300 hover:text-gold transition-colors">
                <Phone className="w-4 h-4 text-gold" strokeWidth={1.5} /> {COMPANY.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 text-slate-300 hover:text-gold transition-colors">
                <Mail className="w-4 h-4 text-gold" strokeWidth={1.5} /> {COMPANY.email}
              </a>
            </li>
            <li>
              <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-300 hover:text-gold transition-colors">
                <MessageCircle className="w-4 h-4 text-gold" strokeWidth={1.5} /> WhatsApp Us
              </a>
            </li>
          </ul>
          <Link
            to="/quote"
            className="group mt-8 inline-flex items-center gap-2 border border-gold/50 text-gold px-5 py-3 text-sm font-semibold hover:bg-gold hover:text-navy transition-colors"
          >
            Request a Quote
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-slate-400 text-xs">
          © {new Date().getFullYear()} {COMPANY.name}, {COMPANY.location}. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-xs text-slate-400">
          <span>FOB & CIF Worldwide</span>
          <Link to="/admin" className="hover:text-gold transition-colors" data-testid="footer-admin-link">Admin</Link>
        </div>
      </div>
    </div>
  </footer>
);
