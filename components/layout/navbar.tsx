"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Work", href: "#projects" },
  { name: "Map", href: "#engineering-map" },
  { name: "Thinking", href: "#thinking" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Simple active section detection
      const sections = navLinks.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections.reverse()) {
        const element = document.getElementById(sectionId);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sectionId);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 pt-4 md:pt-6 transition-all duration-300 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Brand Logo / Monogram */}
        <a
          href="#top"
          className="group glass-pill px-4 py-2 rounded-full flex items-center gap-2.5 text-xs font-mono-tech uppercase tracking-wider text-gray-300 hover:text-white transition-all hover:border-emerald-500/40"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-subtle" />
          <span className="font-semibold text-white group-hover:text-emerald-400 transition-colors">
            SM
          </span>
          <span className="hidden sm:inline text-gray-500">//</span>
          <span className="hidden sm:inline text-gray-400">
            SUBHADIP MONDAL
          </span>
        </a>

        {/* Desktop Pill Navigation */}
        <nav className="hidden md:flex items-center glass-pill px-3 py-1.5 rounded-full text-xs font-mono-tech border border-white/10 shadow-2xl">
          <div className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 rounded-full transition-all duration-200 uppercase tracking-wider ${
                    isActive
                      ? "text-white font-medium"
                      : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navPill"
                      className="absolute inset-0 bg-white/10 rounded-full border border-white/15"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              );
            })}
          </div>
        </nav>

        {/* Right CTA / Status Pill */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={PORTFOLIO_DATA.personal.resumePdf}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-pill px-4 py-2 rounded-full text-xs font-mono-tech text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 transition-all flex items-center gap-1.5 border border-emerald-500/30 hover:border-emerald-500/60"
          >
            <span>CV</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="md:hidden glass-pill p-2.5 rounded-full text-gray-200 hover:text-white border border-white/10"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden pointer-events-auto mt-3 mx-auto max-w-sm glass-pill p-5 rounded-2xl border border-white/10 shadow-2xl flex flex-col gap-4 text-sm font-mono-tech"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl hover:bg-white/5 text-gray-300 hover:text-emerald-400 transition-colors uppercase tracking-wider flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <span className="text-xs text-gray-600">→</span>
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <a
                href={PORTFOLIO_DATA.personal.resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-center font-medium flex items-center justify-center gap-2"
              >
                <span>DOWNLOAD CV</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
