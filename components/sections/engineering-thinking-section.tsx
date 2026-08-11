"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const PRINCIPLES = [
  {
    id: "security",
    index: "01",
    statement: "SECURITY IS PART OF THE PRODUCT.",
    elaboration:
      "Security isn't a feature you bolt on at the end. It shapes architecture decisions from the very first schema design.",
    practices: [
      "JWT with stateless refresh token rotation",
      "HttpOnly cookies — inaccessible to client-side JS",
      "API rate limiting against brute-force and DDoS",
      "Payment payload sanitization before processing",
      "Google reCAPTCHA v3 on all public entry points",
      "Role-escalation gating — Student → Teacher/Institute",
    ],
    origin: "NOTAPEX INTERNSHIP",
  },
  {
    id: "ui",
    index: "02",
    statement: "GOOD UI HIDES COMPLEXITY.",
    elaboration:
      "The best interfaces expose zero of their internal machinery. The engineering challenge is making something hard feel effortless.",
    practices: [
      "Pagination UI sitting on top of raw LIMIT/OFFSET SQL",
      "Grid/list toggle with preserved query state",
      "Bilingual i18n switching with zero layout shift",
      "Mobile-first responsive admin panel design",
      "Flutter UX abstracting away REST API calls",
    ],
    origin: "NOTAPEX · AUTOTX · NO-EXCUSES",
  },
  {
    id: "data",
    index: "03",
    statement: "PERFORMANCE STARTS WITH DATA.",
    elaboration:
      "A fast UI on top of a slow query is an illusion. Real performance is engineered at the database boundary.",
    practices: [
      "Database-level LIMIT/OFFSET rather than in-memory slicing",
      "Prisma schema design with explicit relation indexing",
      "SMS regex parsing on-device to avoid server roundtrips",
      "MongoDB document structure optimized for query patterns",
      "Event-driven Socket.io eliminating polling entirely",
    ],
    origin: "NOTAPEX · AUTOTX · CHAT APP",
  },
  {
    id: "boring",
    index: "04",
    statement: "BORING SYSTEMS ARE RELIABLE SYSTEMS.",
    elaboration:
      "Clever engineering is often fragile engineering. The most important code is migration scripts, seed files and error handlers.",
    practices: [
      "Production schema migrations with rollback-safe structure",
      "Database seed scripts for reproducible environments",
      "Signed-PDF delivery pipeline — deterministic, not clever",
      "Bot detection logic — predictable rule-based approach",
      "Session management using server-side room state",
    ],
    origin: "NOTAPEX · ITJOBXS · CHAT APP",
  },
];

export function EngineeringThinkingSection() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="thinking" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/10">
      {/* Section Label */}
      <div className="flex items-center gap-3 text-xs font-mono-tech text-emerald-400 mb-4">
        <span>06 // ENGINEERING PHILOSOPHY</span>
        <span className="h-px bg-emerald-500/30 flex-grow max-w-xs" />
      </div>

      <div className="mb-16">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
          HOW I THINK
        </h2>
        <p className="text-gray-400 text-sm sm:text-base mt-2 max-w-lg font-light">
          Not what I know — how I reason. Four principles derived directly from production engineering experience.
        </p>
      </div>

      {/* Principles as editorial open list — no cards */}
      <div className="space-y-0">
        {PRINCIPLES.map((p, i) => {
          const isOpen = open === p.id;

          return (
            <div key={p.id} className="border-t border-white/10 last:border-b last:border-white/10">
              <button
                onClick={() => setOpen(isOpen ? null : p.id)}
                className="w-full text-left py-7 sm:py-8 flex items-start gap-6 sm:gap-10 group"
                aria-expanded={isOpen}
                aria-controls={`principle-panel-${p.id}`}
              >
                {/* Index number */}
                <span
                  className={`text-xs font-mono-tech shrink-0 mt-1 transition-colors duration-200 ${
                    isOpen ? "text-emerald-400" : "text-gray-600 group-hover:text-gray-400"
                  }`}
                >
                  {p.index}
                </span>

                {/* Statement */}
                <div className="flex-grow">
                  <h3
                    className={`text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight transition-colors duration-200 ${
                      isOpen ? "text-white" : "text-gray-300 group-hover:text-white"
                    }`}
                  >
                    {p.statement}
                  </h3>

                  {/* Origin tag — always visible */}
                  <p className="text-[10px] font-mono-tech text-gray-500 mt-2 uppercase tracking-wider">
                    SOURCE: {p.origin}
                  </p>
                </div>

                {/* Expand indicator */}
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0, color: isOpen ? "#10b981" : "#4b5563" }}
                  transition={{ duration: 0.2 }}
                  className="text-2xl leading-none shrink-0 mt-0.5 font-light"
                  aria-hidden="true"
                >
                  +
                </motion.span>
              </button>

              {/* Expanded content — inline, no card border */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    id={`principle-panel-${p.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                    role="region"
                    aria-label={p.statement}
                  >
                    <div className="pb-8 pl-12 sm:pl-20 grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Elaboration */}
                      <div>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light mb-0">
                          {p.elaboration}
                        </p>
                      </div>

                      {/* Practices */}
                      <div>
                        <div className="text-[10px] font-mono-tech text-emerald-400 uppercase tracking-wider mb-3">
                          IN PRACTICE
                        </div>
                        <div className="space-y-2">
                          {p.practices.map((practice, j) => (
                            <motion.div
                              key={j}
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: j * 0.04, duration: 0.2 }}
                              className="flex items-start gap-2 text-xs text-gray-300 font-mono-tech"
                            >
                              <span className="text-emerald-500 shrink-0">→</span>
                              <span>{practice}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
