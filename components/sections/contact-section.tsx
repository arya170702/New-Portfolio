"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Copy, Check, ArrowUpRight, Mail, Github, Linkedin, Twitter,
  FileText, Send, MessageSquare, CheckCircle2, AlertCircle,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { MagneticButton } from "@/components/ui/magnetic-button";

// ─── UPDATE with your Formspree form ID ──────────────────────────────────────
// Sign up free at https://formspree.io → create a form → paste the ID below
const FORMSPREE_ID = "xnpaddja";

type FormState = "idle" | "loading" | "success" | "error";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleCopyEmail = () => {
    const email = PORTFOLIO_DATA.personal.email;
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(email)
        .then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); })
        .catch(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); });
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setFormState("success");
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setFormState("idle"), 5000);
      } else {
        setFormState("error");
        setTimeout(() => setFormState("idle"), 4000);
      }
    } catch {
      setFormState("error");
      setTimeout(() => setFormState("idle"), 4000);
    }
  };

  const inputBase =
    "w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-emerald-500/60 focus:bg-white/[0.07] transition-all duration-200 font-light";

  return (
    <section id="contact" className="py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/10">
      {/* Section Label */}
      <div className="flex items-center gap-3 text-xs font-mono-tech text-emerald-400 mb-12">
        <span>08 // CONTACT &amp; COLLABORATION</span>
        <span className="h-px bg-emerald-500/30 flex-grow max-w-xs" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

        {/* ── Left: CTA + Socials ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Heading */}
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tighter text-white uppercase leading-[0.95]">
              LET&apos;S BUILD <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-emerald-400">
                SOMETHING EXTRAORDINARY.
              </span>
            </h2>
            <p className="text-gray-300 text-base font-light leading-relaxed">
              Have a project, full-stack opportunity, or complex technical problem? I&apos;m open to discussing new roles and ambitious engineering collaborations.
            </p>
          </div>

          {/* Email copy */}
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <MagneticButton strength={0.2}>
              <button
                onClick={handleCopyEmail}
                type="button"
                className="px-6 py-3.5 rounded-full bg-white text-black font-semibold text-sm tracking-wide flex items-center gap-3 hover:bg-emerald-400 transition-all shadow-xl shadow-white/5 group cursor-pointer"
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

            <AnimatePresence>
              {copied && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs font-mono-tech text-emerald-400 flex items-center gap-1.5 pt-3"
                >
                  <Check className="w-3.5 h-3.5" /> EMAIL COPIED
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Social links */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap gap-3 text-xs font-mono-tech">
            {[
              { href: PORTFOLIO_DATA.personal.github, icon: Github, label: "GITHUB", color: "" },
              { href: PORTFOLIO_DATA.personal.linkedin, icon: Linkedin, label: "LINKEDIN", color: "text-blue-400" },
              { href: PORTFOLIO_DATA.personal.twitter, icon: Twitter, label: "TWITTER", color: "text-sky-400" },
            ].map(({ href, icon: Icon, label, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white flex items-center gap-2 transition-all"
              >
                <Icon className={`w-3.5 h-3.5 ${color}`} />
                <span>{label}</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            ))}
            <a
              href={PORTFOLIO_DATA.personal.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center gap-2 transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>2026 RESUME</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </motion.div>

        {/* ── Right: Contact Form ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="p-7 sm:p-8 rounded-2xl glass-card border border-white/10 relative overflow-hidden">
            {/* Glow */}
            <div className="absolute -bottom-12 -right-12 w-56 h-56 bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-2 text-xs font-mono-tech text-emerald-400 mb-6">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>SEND A MESSAGE</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-[10px] font-mono-tech text-gray-400 tracking-wider uppercase mb-1.5">
                    YOUR NAME <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Subhadip Mondal"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className={inputBase}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-[10px] font-mono-tech text-gray-400 tracking-wider uppercase mb-1.5">
                    EMAIL ADDRESS <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className={inputBase}
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="contact-subject" className="block text-[10px] font-mono-tech text-gray-400 tracking-wider uppercase mb-1.5">
                  SUBJECT <span className="text-emerald-400">*</span>
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  placeholder="Project Collaboration / Full-Stack Role"
                  value={form.subject}
                  onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                  className={inputBase}
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-[10px] font-mono-tech text-gray-400 tracking-wider uppercase mb-1.5">
                  MESSAGE <span className="text-emerald-400">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  placeholder="Describe your project, idea, or role details..."
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className={`${inputBase} resize-none`}
                />
              </div>

              {/* Submit */}
              <button
                id="contact-submit"
                type="submit"
                disabled={formState === "loading" || formState === "success"}
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 disabled:cursor-not-allowed text-black font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2.5 transition-all duration-200 shadow-lg shadow-emerald-500/20"
              >
                {formState === "loading" ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                    />
                    SENDING...
                  </>
                ) : formState === "success" ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    MESSAGE SENT!
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    SEND MESSAGE
                  </>
                )}
              </button>

              {/* Feedback toasts */}
              <AnimatePresence>
                {formState === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-xs font-mono-tech text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-2.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    Got it! I&apos;ll get back to you within 24–48 hours.
                  </motion.div>
                )}
                {formState === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-xs font-mono-tech text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    Something went wrong. Try emailing me directly.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
