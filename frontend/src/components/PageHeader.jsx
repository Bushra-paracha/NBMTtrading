import { Reveal, Label } from "./Reveal";

export const PageHeader = ({ label, title, accent, description, image }) => (
  <section data-testid="page-header" className="relative pt-32 md:pt-40 pb-16 md:pb-24 bg-navy text-stone-warm overflow-hidden">
    {image && (
      <>
        <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/60" />
      </>
    )}
    <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
      <Reveal>
        <Label className="!text-gold">{label}</Label>
        <h1 className="mt-6 font-serif text-5xl sm:text-6xl lg:text-7xl leading-[0.98] tracking-tight max-w-4xl">
          {title} {accent && <span className="italic text-gold">{accent}</span>}
        </h1>
        {description && (
          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">{description}</p>
        )}
      </Reveal>
    </div>
  </section>
);
