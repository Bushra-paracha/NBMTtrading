import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingWhatsApp, MobileActionBar } from "./FloatingActions";

export const SiteLayout = () => (
  <div className="min-h-screen flex flex-col bg-stone-warm">
    <Navbar />
    <main className="flex-1 pb-16 md:pb-0">
      <Outlet />
    </main>
    <Footer />
    <FloatingWhatsApp />
    <MobileActionBar />
  </div>
);
