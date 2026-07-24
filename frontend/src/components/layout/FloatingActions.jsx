import { Link } from "react-router-dom";
import { MessageCircle, FileText } from "lucide-react";
import { whatsappUrl } from "../../config";

export const FloatingWhatsApp = () => (
  <a
    href={whatsappUrl()}
    target="_blank"
    rel="noreferrer"
    data-testid="floating-whatsapp"
    aria-label="Chat on WhatsApp"
    className="hidden md:flex fixed bottom-8 right-8 z-40 items-center justify-center w-14 h-14 bg-[#25D366] text-white shadow-lg hover:scale-105 transition-transform"
  >
    <MessageCircle className="w-7 h-7" strokeWidth={1.5} />
  </a>
);

export const MobileActionBar = () => (
  <div
    data-testid="mobile-action-bar"
    className="md:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-2 border-t border-black/10"
  >
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noreferrer"
      data-testid="mobile-whatsapp-btn"
      className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 text-sm font-semibold"
    >
      <MessageCircle className="w-5 h-5" strokeWidth={1.5} /> WhatsApp
    </a>
    <Link
      to="/quote"
      data-testid="mobile-quote-btn"
      className="flex items-center justify-center gap-2 bg-navy text-stone-warm py-4 text-sm font-semibold"
    >
      <FileText className="w-5 h-5" strokeWidth={1.5} /> Request a Quote
    </Link>
  </div>
);
