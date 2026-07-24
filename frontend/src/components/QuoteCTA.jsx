import { Link } from "react-router-dom";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { whatsappUrl } from "../config";
import { Reveal, Label } from "./Reveal";

export const QuoteCTA = ({ variant = "navy" }) => (
  <section
    data-testid="quote-cta"
    className={variant === "navy" ? "bg-navy text-stone-warm" : "bg-stone-alt text-navy"}
  >
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">
      <Reveal>
        <Label className={variant === "navy" ? "!text-gold" : ""}>Let us quote your requirement</Label>
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <h2 className="lg:col-span-8 font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
            Ready to source premium commodities,{" "}
            <span className="italic text-gold">direct from Dubai?</span>
          </h2>
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <Link
              to="/quote"
              data-testid="cta-quote-btn"
              className="group inline-flex items-center justify-between gap-2 bg-gold text-navy px-6 py-4 font-semibold hover:bg-gold-dark transition-colors"
            >
              Request a Quote
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
            </Link>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
              data-testid="cta-whatsapp-btn"
              className={`group inline-flex items-center justify-between gap-2 px-6 py-4 font-semibold border transition-colors ${
                variant === "navy"
                  ? "border-white/25 text-stone-warm hover:bg-white/10"
                  : "border-navy/25 text-navy hover:bg-navy hover:text-stone-warm"
              }`}
            >
              WhatsApp Us
              <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);
