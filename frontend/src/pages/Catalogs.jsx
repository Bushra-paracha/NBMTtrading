import { Link } from "react-router-dom";
import { FileText, Download, ArrowUpRight } from "lucide-react";
import { useSeo } from "../lib/useSeo";
import { Reveal, Label } from "../components/Reveal";
import { PageHeader } from "../components/PageHeader";
import { QuoteCTA } from "../components/QuoteCTA";
import { CATALOGS } from "../data/gallery";
import { COMPANY, whatsappUrl } from "../config";

export default function Catalogs() {
  useSeo("Catalogs", "Download the NBMT Trading Co. company profile and product catalogs.");

  return (
    <div>
      <PageHeader
        label="Catalogs"
        title="Company profile"
        accent="& product sheets."
        description="Request our latest catalogs and specification sheets. Contact us and we will share the current documents by email or WhatsApp."
      />

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATALOGS.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.05}>
              <div className="group bg-white border border-black/10 p-8 h-full flex flex-col hover:-translate-y-1 transition-transform duration-500">
                <FileText className="w-10 h-10 text-gold" strokeWidth={1.2} />
                <h3 className="mt-6 font-serif text-2xl text-navy leading-tight">{c.name}</h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed flex-1">{c.desc}</p>
                <a
                  href={whatsappUrl(`Hello ${COMPANY.name}, please share the "${c.name}" catalog.`)}
                  target="_blank"
                  rel="noreferrer"
                  data-testid={`catalog-request-${i}`}
                  className="mt-6 inline-flex items-center justify-between gap-2 border border-navy/20 text-navy px-5 py-3 text-sm font-semibold hover:bg-navy hover:text-stone-warm transition-colors"
                >
                  Request document
                  <Download className="w-4 h-4" strokeWidth={1.5} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16 border border-black/10 bg-stone-alt p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <Label>Need something specific?</Label>
              <p className="mt-4 font-serif text-3xl text-navy leading-tight max-w-xl">Tell us your requirement and we will prepare tailored documentation.</p>
            </div>
            <Link to="/quote" className="group inline-flex items-center gap-2 bg-navy text-stone-warm px-6 py-4 font-semibold hover:bg-navy-soft transition-colors shrink-0">
              Request a Quote
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
            </Link>
          </div>
        </Reveal>
      </section>

      <QuoteCTA />
    </div>
  );
}
