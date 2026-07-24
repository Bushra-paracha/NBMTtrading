import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { ArrowUpRight, CheckCircle2, Loader2, ShieldCheck, Clock, Package } from "lucide-react";
import { useSeo } from "../lib/useSeo";
import { Reveal, Label } from "../components/Reveal";
import { PageHeader } from "../components/PageHeader";
import api from "../lib/api";
import { PRODUCTS } from "../data/products";

const emailOk = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
const field = "w-full bg-white border border-black/15 px-4 py-3 text-navy placeholder:text-slate-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors";

const INCOTERMS = ["FOB", "CIF", "CFR", "EXW", "Other"];

export default function Quote() {
  useSeo("Request a Quote", "Request a competitive quotation from NBMT Trading Co. for premium agricultural commodities.");
  const [params] = useSearchParams();
  const preset = params.get("product") || "";

  const [form, setForm] = useState({
    name: "", email: "", company: "", country: "", phone: "",
    product: preset, quantity: "", incoterm: "FOB", destination_port: "", message: "",
  });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Please enter your name.";
    if (!form.email.trim()) err.email = "Please enter your email.";
    else if (!emailOk(form.email)) err.email = "Please enter a valid email.";
    if (!form.product.trim()) err.product = "Please select a product.";
    if (!form.quantity.trim()) err.quantity = "Please enter a quantity.";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    try {
      await api.post("/enquiries", { type: "quote", ...form });
      setDone(true);
      toast.success("Quote request received. Our desk will revert with an offer.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <PageHeader
        label="Request a Quote"
        title="Tell us what you need,"
        accent="we will price it."
        description="Share your product, quantity and destination. Our trading desk will respond with a competitive offer and packing options."
        image="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1400&q=80"
      />

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
          {/* FORM */}
          <Reveal className="lg:col-span-8">
            <div className="bg-stone-alt border border-black/10 p-8 md:p-10">
              {done ? (
                <div data-testid="quote-success" className="py-12 text-center">
                  <CheckCircle2 className="w-14 h-14 text-gold mx-auto" strokeWidth={1.2} />
                  <h3 className="mt-6 font-serif text-3xl text-navy">Quote request received</h3>
                  <p className="mt-3 text-slate-600 max-w-md mx-auto">Thank you. Our trading desk will review your requirement and respond with a competitive offer.</p>
                  <button onClick={() => { setDone(false); setForm({ ...form, quantity: "", message: "" }); }} className="mt-8 text-gold font-semibold" data-testid="quote-send-another">Submit another request</button>
                </div>
              ) : (
                <form onSubmit={submit} data-testid="quote-form" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="keyline">Name *</label>
                      <input className={`mt-2 ${field}`} value={form.name} onChange={set("name")} data-testid="quote-name" placeholder="Your full name" />
                      {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="keyline">Email *</label>
                      <input className={`mt-2 ${field}`} value={form.email} onChange={set("email")} data-testid="quote-email" placeholder="you@company.com" />
                      {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="keyline">Company</label>
                      <input className={`mt-2 ${field}`} value={form.company} onChange={set("company")} data-testid="quote-company" placeholder="Company name" />
                    </div>
                    <div>
                      <label className="keyline">Country</label>
                      <input className={`mt-2 ${field}`} value={form.country} onChange={set("country")} data-testid="quote-country" placeholder="Destination country" />
                    </div>
                    <div>
                      <label className="keyline">Product *</label>
                      <select className={`mt-2 ${field}`} value={form.product} onChange={set("product")} data-testid="quote-product">
                        <option value="">Select a product</option>
                        {PRODUCTS.map((p) => <option key={p.slug} value={p.name}>{p.name}</option>)}
                        <option value="Other / Multiple products">Other / Multiple products</option>
                      </select>
                      {errors.product && <p className="mt-1 text-xs text-red-600">{errors.product}</p>}
                    </div>
                    <div>
                      <label className="keyline">Quantity *</label>
                      <input className={`mt-2 ${field}`} value={form.quantity} onChange={set("quantity")} data-testid="quote-quantity" placeholder="e.g. 2 x 20ft container / 50 MT" />
                      {errors.quantity && <p className="mt-1 text-xs text-red-600">{errors.quantity}</p>}
                    </div>
                    <div>
                      <label className="keyline">Incoterm</label>
                      <select className={`mt-2 ${field}`} value={form.incoterm} onChange={set("incoterm")} data-testid="quote-incoterm">
                        {INCOTERMS.map((i) => <option key={i} value={i}>{i}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="keyline">Destination Port</label>
                      <input className={`mt-2 ${field}`} value={form.destination_port} onChange={set("destination_port")} data-testid="quote-port" placeholder="e.g. Jebel Ali, Mombasa" />
                    </div>
                  </div>
                  <div className="mt-5">
                    <label className="keyline">Additional details</label>
                    <textarea rows={4} className={`mt-2 ${field} resize-none`} value={form.message} onChange={set("message")} data-testid="quote-message" placeholder="Packing preference, target price, delivery timeline..." />
                  </div>
                  <button type="submit" disabled={sending} data-testid="quote-submit" className="group mt-6 inline-flex items-center gap-2 bg-navy text-stone-warm px-7 py-4 font-semibold hover:bg-navy-soft transition-colors disabled:opacity-60">
                    {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />}
                    {sending ? "Submitting..." : "Submit quote request"}
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* ASIDE */}
          <Reveal className="lg:col-span-4" delay={0.1}>
            <div className="bg-navy text-stone-warm p-8 h-full">
              <Label className="!text-gold">Why NBMT</Label>
              <ul className="mt-8 space-y-8">
                {[
                  { icon: ShieldCheck, title: "Certified quality", body: "SGS and Bureau Veritas inspection available on request." },
                  { icon: Package, title: "Flexible packing", body: "Custom and private label packing for retail and wholesale." },
                  { icon: Clock, title: "Prompt response", body: "Serious enquiries answered quickly by our trading desk." },
                ].map((c, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <c.icon className="w-6 h-6 text-gold shrink-0" strokeWidth={1.5} />
                    <div>
                      <p className="font-serif text-xl">{c.title}</p>
                      <p className="mt-1 text-sm text-slate-300 leading-relaxed">{c.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
