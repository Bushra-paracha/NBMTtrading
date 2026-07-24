import { useState } from "react";
import { toast } from "sonner";
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle2, Loader2 } from "lucide-react";
import { useSeo } from "../lib/useSeo";
import { Reveal, Label } from "../components/Reveal";
import { PageHeader } from "../components/PageHeader";
import api from "../lib/api";
import { COMPANY, whatsappUrl } from "../config";

const emailOk = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

const field = "w-full bg-white border border-black/15 px-4 py-3 text-navy placeholder:text-slate-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors";

export default function Contact() {
  useSeo("Contact", "Get in touch with NBMT Trading Co. in the UAE for enquiries and partnerships.");
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Please enter your name.";
    if (!form.email.trim()) err.email = "Please enter your email.";
    else if (!emailOk(form.email)) err.email = "Please enter a valid email.";
    if (!form.message.trim()) err.message = "Please enter a message.";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    try {
      await api.post("/enquiries", { type: "contact", ...form });
      setDone(true);
      toast.success("Message sent. We will be in touch shortly.");
    } catch {
      toast.error("Something went wrong. Please try again or WhatsApp us.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <PageHeader
        label="Contact"
        title="Let us start a"
        accent="conversation."
        description="Reach our trading desk in the UAE. We respond to serious enquiries promptly."
      />

      <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
          {/* INFO */}
          <Reveal className="lg:col-span-5">
            <Label>Get in touch</Label>
            <h2 className="mt-6 font-serif text-4xl sm:text-5xl tracking-tight leading-[1.05]">{COMPANY.name}</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">{COMPANY.location}. Independent trading company sourcing and exporting agricultural commodities worldwide.</p>
            <ul className="mt-10 space-y-6">
              <li className="flex items-start gap-4">
                <span className="w-11 h-11 flex items-center justify-center bg-navy text-gold shrink-0"><MapPin className="w-5 h-5" strokeWidth={1.5} /></span>
                <div><p className="keyline">Office</p><p className="mt-1 text-navy">{COMPANY.address}</p></div>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-11 h-11 flex items-center justify-center bg-navy text-gold shrink-0"><Phone className="w-5 h-5" strokeWidth={1.5} /></span>
                <div><p className="keyline">Phone</p><a href={`tel:${COMPANY.phoneRaw}`} className="mt-1 block text-navy hover:text-gold transition-colors">{COMPANY.phone}</a></div>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-11 h-11 flex items-center justify-center bg-navy text-gold shrink-0"><Mail className="w-5 h-5" strokeWidth={1.5} /></span>
                <div><p className="keyline">Email</p><a href={`mailto:${COMPANY.email}`} className="mt-1 block text-navy hover:text-gold transition-colors">{COMPANY.email}</a></div>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-11 h-11 flex items-center justify-center bg-[#25D366] text-white shrink-0"><MessageCircle className="w-5 h-5" strokeWidth={1.5} /></span>
                <div><p className="keyline">WhatsApp</p><a href={whatsappUrl()} target="_blank" rel="noreferrer" className="mt-1 block text-navy hover:text-gold transition-colors">Chat with our team</a></div>
              </li>
            </ul>
          </Reveal>

          {/* FORM */}
          <Reveal className="lg:col-span-7" delay={0.1}>
            <div className="bg-stone-alt border border-black/10 p-8 md:p-10">
              {done ? (
                <div data-testid="contact-success" className="py-12 text-center">
                  <CheckCircle2 className="w-14 h-14 text-gold mx-auto" strokeWidth={1.2} />
                  <h3 className="mt-6 font-serif text-3xl text-navy">Thank you</h3>
                  <p className="mt-3 text-slate-600">Your message has reached us. Our team will respond shortly.</p>
                  <button onClick={() => { setDone(false); setForm({ name: "", email: "", company: "", phone: "", message: "" }); }} className="mt-8 text-gold font-semibold" data-testid="contact-send-another">Send another message</button>
                </div>
              ) : (
                <form onSubmit={submit} data-testid="contact-form" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="keyline">Name *</label>
                      <input className={`mt-2 ${field}`} value={form.name} onChange={set("name")} data-testid="contact-name" placeholder="Your full name" />
                      {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="keyline">Email *</label>
                      <input className={`mt-2 ${field}`} value={form.email} onChange={set("email")} data-testid="contact-email" placeholder="you@company.com" />
                      {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="keyline">Company</label>
                      <input className={`mt-2 ${field}`} value={form.company} onChange={set("company")} data-testid="contact-company" placeholder="Company name" />
                    </div>
                    <div>
                      <label className="keyline">Phone</label>
                      <input className={`mt-2 ${field}`} value={form.phone} onChange={set("phone")} data-testid="contact-phone" placeholder="Phone number" />
                    </div>
                  </div>
                  <div className="mt-5">
                    <label className="keyline">Message *</label>
                    <textarea rows={5} className={`mt-2 ${field} resize-none`} value={form.message} onChange={set("message")} data-testid="contact-message" placeholder="How can we help?" />
                    {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
                  </div>
                  <button type="submit" disabled={sending} data-testid="contact-submit" className="group mt-6 inline-flex items-center gap-2 bg-navy text-stone-warm px-7 py-4 font-semibold hover:bg-navy-soft transition-colors disabled:opacity-60">
                    {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" strokeWidth={1.5} />}
                    {sending ? "Sending..." : "Send message"}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
