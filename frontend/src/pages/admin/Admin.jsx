import { useState } from "react";
import { Link } from "react-router-dom";
import { Inbox, Newspaper, Award, LogOut, ArrowLeft, Loader2, ShieldCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { COMPANY } from "../../config";
import { EnquiriesPanel } from "./EnquiriesPanel";
import { UpdatesPanel } from "./UpdatesPanel";
import { CertificatesPanel } from "./CertificatesPanel";

const TABS = [
  { id: "enquiries", label: "Enquiries", icon: Inbox },
  { id: "updates", label: "Updates", icon: Newspaper },
  { id: "certificates", label: "Certificates", icon: Award },
];

const AdminLogin = () => {
  const login = () => {
    // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
    const redirectUrl = window.location.origin + "/admin";
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-navy text-stone-warm px-6">
      <div className="w-full max-w-md text-center">
        <img src={COMPANY.logo} alt="NBMT" className="h-16 mx-auto" />
        <div className="mt-10 border border-white/10 bg-navy-light p-10">
          <ShieldCheck className="w-10 h-10 text-gold mx-auto" strokeWidth={1.2} />
          <h1 className="mt-5 font-serif text-3xl">Admin Access</h1>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">Sign in with an authorized Google account to manage enquiries, updates and certificates.</p>
          <button onClick={login} data-testid="google-signin-btn" className="mt-8 w-full inline-flex items-center justify-center gap-3 bg-white text-navy px-6 py-3.5 font-semibold hover:bg-stone-alt transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Sign in with Google
          </button>
          <Link to="/" className="mt-6 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-gold transition-colors">
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} /> Back to website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function Admin() {
  const { user, loading, logout } = useAuth();
  const [tab, setTab] = useState("enquiries");

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-navy"><Loader2 className="w-8 h-8 animate-spin text-gold" /></div>;
  }
  if (!user) return <AdminLogin />;

  return (
    <div className="min-h-screen flex bg-stone-warm">
      {/* SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 bg-navy text-stone-warm shrink-0">
        <div className="p-6 border-b border-white/10">
          <img src={COMPANY.logo} alt="NBMT" className="h-10" />
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} data-testid={`admin-tab-${t.id}`} className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${tab === t.id ? "bg-gold text-navy" : "text-slate-300 hover:bg-white/5"}`}>
              <t.icon className="w-5 h-5" strokeWidth={1.5} /> {t.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            {user.picture && <img src={user.picture} alt="" className="w-9 h-9 rounded-full" />}
            <div className="min-w-0">
              <p className="text-sm truncate">{user.name}</p>
              <p className="text-xs text-slate-400 truncate">{user.email}</p>
            </div>
          </div>
          <button onClick={logout} data-testid="admin-logout" className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-300 border border-white/10 hover:bg-white/5">
            <LogOut className="w-4 h-4" strokeWidth={1.5} /> Sign out
          </button>
        </div>
      </aside>

      {/* MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 inset-x-0 z-30 bg-navy text-stone-warm">
        <div className="flex items-center justify-between px-4 py-3">
          <img src={COMPANY.logo} alt="NBMT" className="h-8" />
          <button onClick={logout} className="text-sm flex items-center gap-1"><LogOut className="w-4 h-4" strokeWidth={1.5} /></button>
        </div>
        <div className="flex border-t border-white/10">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`flex-1 py-3 text-xs font-semibold ${tab === t.id ? "bg-gold text-navy" : "text-slate-300"}`}>{t.label}</button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <main className="flex-1 p-6 md:p-10 pt-32 md:pt-10 overflow-auto">
        <div className="max-w-6xl">
          {tab === "enquiries" && <EnquiriesPanel />}
          {tab === "updates" && <UpdatesPanel />}
          {tab === "certificates" && <CertificatesPanel />}
        </div>
      </main>
    </div>
  );
}
