"use client";

import { ArrowUp } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/10 text-xs font-mono-tech text-gray-400">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left Info */}
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-white font-bold tracking-wider">
            SUBHADIP MONDAL
          </div>
          <p className="text-gray-500">
            Full-Stack Developer Intern • B.Tech CSE @ VIT Vellore
          </p>
        </div>

        {/* Center Links */}
        <div className="flex items-center gap-6 text-gray-400">
          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors"
          >
            GITHUB
          </a>
          <a
            href={PORTFOLIO_DATA.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors"
          >
            LINKEDIN
          </a>
          <a
            href={PORTFOLIO_DATA.personal.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors"
          >
            TWITTER
          </a>
          <a
            href={`mailto:${PORTFOLIO_DATA.personal.email}`}
            className="hover:text-emerald-400 transition-colors"
          >
            EMAIL
          </a>
        </div>

        {/* Right Back to Top */}
        <div className="flex items-center gap-4">
          <span className="text-gray-600">© 2026 SUBHADIP MONDAL</span>
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="p-2.5 rounded-full glass-pill text-gray-300 hover:text-emerald-400 border border-white/10 hover:border-emerald-500/40 transition-all"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
