import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV_LINKS, COMPANY } from "../../config";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 border-b ${
        scrolled
          ? "bg-stone-warm/90 backdrop-blur-xl border-black/10"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          <Link to="/" data-testid="navbar-logo" className="flex items-center gap-3 shrink-0">
            <img src={COMPANY.logo} alt="NBMT Trading Co." className="h-11 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                data-testid={`nav-${l.label.toLowerCase().replace(/\s/g, "-")}`}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors link-underline ${
                    isActive ? "text-navy" : "text-slate-600 hover:text-navy"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/quote"
              data-testid="navbar-quote-btn"
              className="group inline-flex items-center gap-2 bg-navy text-stone-warm px-5 py-3 text-sm font-semibold hover:bg-navy-soft transition-colors"
            >
              Request a Quote
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
            </Link>
          </div>

          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-navy"
            aria-label="Toggle menu"
          >
            {open ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {open && (
        <div data-testid="mobile-menu" className="lg:hidden bg-stone-warm border-t border-black/10 px-6 py-6">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `py-3 text-lg font-serif border-b border-black/5 ${
                    isActive ? "text-gold" : "text-navy"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/quote"
              className="mt-4 text-center bg-navy text-stone-warm px-5 py-3 text-sm font-semibold"
            >
              Request a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
