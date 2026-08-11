"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

const BASE_VISITS = 1428;

export function VisitorCounter() {
  const [visits, setVisits] = useState<number>(BASE_VISITS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const storedVisits = localStorage.getItem("portfolio_visits_count");
      const hasVisitedThisSession = sessionStorage.getItem("portfolio_session_active");

      let currentCount = storedVisits ? parseInt(storedVisits, 10) : BASE_VISITS;
      if (isNaN(currentCount) || currentCount < BASE_VISITS) {
        currentCount = BASE_VISITS;
      }

      if (!hasVisitedThisSession) {
        currentCount += 1;
        sessionStorage.setItem("portfolio_session_active", "true");
        localStorage.setItem("portfolio_visits_count", currentCount.toString());
      }

      setVisits(currentCount);
    } catch {
      // Fallback if storage restricted
      setVisits(BASE_VISITS + 1);
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-4 left-4 z-30 pointer-events-auto">
      <div className="glass-pill px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2 text-[11px] font-mono-tech text-gray-300 shadow-xl backdrop-blur-md hover:border-emerald-500/40 transition-colors">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <Eye className="w-3.5 h-3.5 text-emerald-400" />
        <span className="text-gray-400 font-light">VISITS:</span>
        <span className="text-white font-semibold font-mono-tech tracking-tight">
          {visits.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
