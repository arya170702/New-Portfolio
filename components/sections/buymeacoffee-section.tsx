"use client";

import { motion } from "motion/react";
import { Coffee, ArrowUpRight } from "lucide-react";

// ─── UPDATE with your buymeacoffee.com username ───────────────────────────────
const BMC_URL = "https://buymeacoffee.com/aryasubhaa";

export function BuyMeACoffeeSection() {
  return (
    <section
      id="support"
      className="py-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
      <motion.a
        href={BMC_URL}
        target="_blank"
        rel="noopener noreferrer"
        id="buy-me-coffee-cta"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.01 }}
        className="group flex items-center justify-between gap-4 px-6 py-4 rounded-2xl glass-card border border-white/10 hover:border-emerald-500/40 transition-all duration-300 cursor-pointer"
      >
        {/* Left: icon + text */}
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-colors">
            <Coffee className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white leading-snug">
              Buy me a coffee
            </p>
            <p className="text-xs text-gray-500 font-mono-tech mt-0.5">
              If my work helped you, a coffee means a lot ☕
            </p>
          </div>
        </div>

        {/* Right: CTA pill */}
        <div className="shrink-0 flex items-center gap-1.5 text-xs font-mono-tech text-emerald-400 group-hover:text-emerald-300 transition-colors">
          <span className="hidden sm:inline uppercase tracking-wider">Support</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </motion.a>
    </section>
  );
}
