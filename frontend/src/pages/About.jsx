import { Link } from "react-router-dom";
import { ArrowUpRight, Target, Eye, Compass, Building2, Quote } from "lucide-react";
import { useSeo } from "../lib/useSeo";
import { Reveal, Label } from "../components/Reveal";
import { PageHeader } from "../components/PageHeader";
import { QuoteCTA } from "../components/QuoteCTA";
import { MARKETS } from "../data/markets";
import { COMPANY } from "../config";

const DUBAI_IMG = "https://images.pexels.com/photos/19612571/pexels-photo-19612571.jpeg?auto=compress&cs=tinysrgb&w=1400";

const DIRECTORS = [
  {
    name: "Muhammad Ali Piracha",
    title: "Director",
    image: "https://images.unsplash.com/photo-1659353220482-554773c2f7fa?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    message:
      "Mr. Muhammad Ali is a mechanical engineer by profession. After gaining experience as an engineer, he joined the company as a director. With significant knowledge of processing units, banking procedures and both domestic and international markets, he oversees the company's exports.",
  },
  {
    name: "Sultan Ali Piracha",
    title: "Director",
    image: "https://images.unsplash.com/photo-1723990720514-65968a7d517b?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    message:
      "Mr. Sultan Ali is a dynamic personality with vast experience in the commodities export sector. Well versed in the costing strategies for raw and processed goods and the sales process, he serves as the focal point of contact for local and international buyers.",
  },
];

export default function About() {
  useSeo("About", "Learn about NBMT Trading Co., an independent Dubai based exporter of premium agricultural commodities.");

  return (
    <div>
      <PageHeader
        label="About NBMT"
        title="An independent Dubai trading house,"
        accent="built on trust."
        description="We connect quality origins with buyers worldwide, backed by careful sourcing, rigorous quality control and dependable logistics."
        image={DUBAI_IMG}
      />

      {/* OVERVIEW */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <Reveal className="lg:col-span-7">
            <Label>Company Overview</Label>
            <h2 className="mt-6 font-serif text-4xl sm:text-5xl tracking-tight leading-[1.05]">
              Premium commodities, <span className="italic text-gold">sourced with rigour.</span>
            </h2>
            <div className="mt-6 space-y-5 text-lg text-slate-700 leading-relaxed">
              <p>
                {COMPANY.name} is an independent trading company based in {COMPANY.location}. We source and export
                agricultural commodities, basmati and non-basmati rice, Himalayan and edible salt, wheat, yellow
                corn maize and natural white hulled sesame seeds, to international buyers.
              </p>
              <p>
                Operating from Dubai, one of the world's foremost trading hubs, gives us the connectivity,
                banking infrastructure and logistics access to serve buyers efficiently across multiple regions.
                Our focus is simple: consistent quality, honest documentation and shipments that arrive as agreed.
              </p>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.1}>
            <div className="aspect-[4/5] overflow-hidden bg-stone-alt">
              <img src={DUBAI_IMG} alt="Dubai skyline" className="w-full h-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* MISSION VISION */}
      <section className="bg-stone-alt">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10 border border-black/10">
            {[
              { icon: Target, title: "Our Mission", body: "To be the dependable link between quality origins and global buyers, delivering commodities that meet exacting standards, on time and as specified." },
              { icon: Eye, title: "Our Vision", body: "To grow into a leading independent commodity trading house from Dubai, recognised for integrity, quality and long standing partnerships." },
              { icon: Compass, title: "Our Values", body: "Transparency in every transaction, uncompromising quality control, and a service ethic that treats each buyer as a long term partner." },
            ].map((c, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="bg-stone-warm p-10 h-full">
                  <c.icon className="w-8 h-8 text-gold" strokeWidth={1.5} />
                  <h3 className="mt-6 font-serif text-3xl text-navy">{c.title}</h3>
                  <p className="mt-4 text-slate-600 leading-relaxed">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section data-testid="leadership" className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">
        <Reveal>
          <Label>Leadership</Label>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <h2 className="lg:col-span-7 font-serif text-4xl sm:text-5xl tracking-tight leading-[1.05]">
              A message from <span className="italic text-gold">our directors.</span>
            </h2>
            <p className="lg:col-span-5 text-slate-700 leading-relaxed">
              Our business is built on relationships. We value long term partnerships and provide personalised
              service, tailor made solutions and competitive pricing to every buyer.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
          {DIRECTORS.map((d, i) => (
            <Reveal key={d.name} delay={i * 0.08}>
              <div className="group bg-white border border-black/10 h-full flex flex-col sm:flex-row">
                <div className="sm:w-2/5 aspect-square sm:aspect-auto overflow-hidden bg-stone-alt shrink-0">
                  <img src={d.image} alt={d.name} loading="lazy" className="img-zoom w-full h-full object-cover" />
                </div>
                <div className="p-7 flex flex-col justify-center">
                  <Quote className="w-7 h-7 text-gold" strokeWidth={1.2} />
                  <p className="mt-4 text-sm text-slate-600 leading-relaxed">{d.message}</p>
                  <div className="mt-5 pt-4 border-t border-black/10">
                    <p className="font-serif text-2xl text-navy leading-tight">{d.name}</p>
                    <p className="keyline mt-1">{d.title}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* GLOBAL REACH */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">
        <Reveal>
          <Label>Global Reach</Label>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <h2 className="lg:col-span-7 font-serif text-4xl sm:text-5xl tracking-tight leading-[1.05]">
              A footprint that spans <span className="italic text-gold">continents.</span>
            </h2>
            <p className="lg:col-span-5 text-slate-700 leading-relaxed">
              We supply importers, distributors, re-exporters and food processors across the Gulf, Africa, Asia,
              Europe and the Americas.
            </p>
          </div>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-black/10 border border-black/10">
          {MARKETS.map((m, i) => (
            <Reveal key={m.id} delay={i * 0.04}>
              <div className="bg-white p-7 h-full">
                <Building2 className="w-6 h-6 text-gold" strokeWidth={1.5} />
                <h3 className="mt-4 font-serif text-2xl text-navy">{m.region}</h3>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">{m.countries.join(", ")}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-12">
          <Link to="/global-reach" className="group inline-flex items-center gap-2 bg-navy text-stone-warm px-6 py-4 font-semibold hover:bg-navy-soft transition-colors">
            View the interactive map
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      <QuoteCTA />
    </div>
  );
}
