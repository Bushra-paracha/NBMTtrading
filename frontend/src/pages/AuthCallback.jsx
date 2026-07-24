import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";

export const AuthCallback = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const hasProcessed = useRef(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;

    const hash = window.location.hash || "";
    const match = hash.match(/session_id=([^&]+)/);
    const sessionId = match ? decodeURIComponent(match[1]) : null;

    const run = async () => {
      if (!sessionId) {
        navigate("/admin", { replace: true });
        return;
      }
      try {
        const { data } = await api.post("/auth/session", { session_id: sessionId });
        setUser(data);
        window.history.replaceState(null, "", "/admin");
        navigate("/admin", { replace: true, state: { user: data } });
      } catch (e) {
        setError(e?.response?.data?.detail || "Authentication failed.");
      }
    };
    run();
  }, [navigate, setUser]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-navy text-stone-warm px-6">
      {error ? (
        <div className="text-center max-w-md">
          <p className="font-serif text-3xl mb-4">Access denied</p>
          <p className="text-slate-300 mb-8">{error}</p>
          <button
            onClick={() => navigate("/admin", { replace: true })}
            className="bg-gold text-navy px-6 py-3 font-semibold"
            data-testid="auth-error-back"
          >
            Back to sign in
          </button>
        </div>
      ) : (
        <>
          <Loader2 className="w-8 h-8 animate-spin text-gold mb-4" />
          <p className="text-slate-300">Signing you in...</p>
        </>
      )}
    </div>
  );
};
