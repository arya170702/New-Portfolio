"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Copy, Check, ArrowUpRight, Mail, Github, Linkedin, Twitter, FileText } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    const email = PORTFOLIO_DATA.personal.email;
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(email)
        .then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); })
        .catch(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); });
    } else {
      // Clipboard API unavailable — show copied state anyway so user can see the email
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="contact" className="py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/10">
      {/* Section Label */}
      <div className="flex items-center gap-3 text-xs font-mono-tech text-emerald-400 mb-8">
        <span>08 // CONTACT & COLLABORATION</span>
        <span className="h-px bg-emerald-500/30 flex-grow max-w-xs" />
      </div>

      <div className="p-8 sm:p-14 rounded-3xl glass-card border border-white/10 relative overflow-hidden text-center sm:text-left">
        {/* Subtle Background Radial Glow */}
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-6 relative z-10">
          <h2 className="text-4xl sm:text-7xl font-extrabold tracking-tighter text-white uppercase leading-[0.95]">
            LET'S BUILD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-emerald-400">
              SOMETHING EXTRAORDINARY.
            </span>
          </h2>

          <p className="text-gray-300 text-base sm:text-xl font-light leading-relaxed">
            Have a project, full-stack opportunity, or complex technical problem? I’m open to discussing new roles and ambitious engineering collaborations.
          </p>

          {/* Email Copy Trigger */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
            <MagneticButton strength={0.2}>
              <button
                onClick={handleCopyEmail}
                type="button"
                className="w-full sm:w-auto px-6 py-4 rounded-full bg-white text-black font-semibold text-sm tracking-wide flex items-center justify-center gap-3 hover:bg-emerald-400 transition-all shadow-xl shadow-white/5 group cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>{PORTFOLIO_DATA.personal.email}</span>
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-700" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-700 group-hover:text-black transition-colors" />
                )}
              </button>
            </MagneticButton>

            {copied && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs font-mono-tech text-emerald-400 flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" /> EMAIL COPIED TO CLIPBOARD
              </motion.span>
            )}
          </div>

          {/* Social Links Row */}
          <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-mono-tech">
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white flex items-center gap-2 transition-all"
            >
              <Github className="w-4 h-4" />
              <span>GITHUB</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white flex items-center gap-2 transition-all"
            >
              <Linkedin className="w-4 h-4 text-blue-400" />
              <span>LINKEDIN</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href={PORTFOLIO_DATA.personal.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white flex items-center gap-2 transition-all"
            >
              <Twitter className="w-4 h-4 text-sky-400" />
              <span>TWITTER</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href={PORTFOLIO_DATA.personal.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center gap-2 transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>2026 RESUME (PDF)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
