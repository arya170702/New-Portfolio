"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Briefcase, Calendar, MapPin, CheckCircle2, ArrowUpRight } from "lucide-react";

import { PORTFOLIO_DATA, ExperienceItem } from "@/data/portfolio-data";

export function ExperienceSection() {
  const [selectedExp, setSelectedExp] = useState<string>(PORTFOLIO_DATA.experiences[0].id);

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/10">
      {/* Section Label */}
      <div className="flex items-center gap-3 text-xs font-mono-tech text-emerald-400 mb-4">
        <span>03 // WORK EXPERIENCE & IMPACT</span>
        <span className="h-px bg-emerald-500/30 flex-grow max-w-xs" />
      </div>

      <div className="mb-12">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
          ENGINEERING EXPERIENCE
        </h2>
        <p className="text-gray-400 text-sm sm:text-base mt-2 max-w-xl font-light">
          Hands-on full-stack development, authentication architecture, and production database engineering.
        </p>
      </div>

      {/* Experience Timeline Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Company Selector List */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          {PORTFOLIO_DATA.experiences.map((exp) => {
            const isSelected = selectedExp === exp.id;
            return (
              <button
                key={exp.id}
                onClick={() => setSelectedExp(exp.id)}
                className={`w-full text-left p-5 rounded-2xl transition-all duration-300 border text-xs font-mono-tech relative overflow-hidden group ${
                  isSelected
                    ? "bg-white/10 border-emerald-500/50 shadow-xl shadow-emerald-500/5"
                    : "bg-[#0d0d0e] border-white/10 hover:border-white/20 text-gray-400"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeExpBar"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-400"
                  />
                )}

                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500 uppercase">{exp.period}</span>
                  {isSelected && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px]">
                      ACTIVE
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {exp.company}
                </h3>
                <p className="text-gray-400 text-xs mt-0.5">{exp.role}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {exp.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                  {exp.tags.length > 3 && (
                    <span className="px-1.5 py-0.5 text-[10px] text-gray-500">
                      +{exp.tags.length - 3}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Deep-Dive Highlights Panel */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {PORTFOLIO_DATA.experiences
              .filter((exp) => exp.id === selectedExp)
              .map((exp) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 sm:p-8 rounded-2xl glass-card border border-white/10 space-y-6"
                >
                  {/* Experience Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono-tech text-emerald-400 mb-1">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span className="uppercase">{exp.role}</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                        {exp.companyUrl ? (
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5 group/link"
                          >
                            <span>{exp.company}</span>
                            <ArrowUpRight className="w-5 h-5 text-emerald-400 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                          </a>
                        ) : (
                          <span>{exp.company}</span>
                        )}
                      </h3>
                    </div>

                    <div className="flex flex-col sm:items-end text-xs font-mono-tech text-gray-400 gap-1">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-500" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-400">
                        <MapPin className="w-3.5 h-3.5 text-gray-500" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Highlights Bullet List */}
                  <div>
                    <h4 className="text-xs font-mono-tech text-gray-400 uppercase tracking-wider mb-4">
                      KEY ENGINEERING RESPONSIBILITIES & DELIVERABLES
                    </h4>
                    <div className="space-y-3">
                      {exp.highlights.map((highlight, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                          className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed group"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                          <span>{highlight}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Technology Tags */}
                  <div className="pt-4 border-t border-white/10">
                    <span className="text-[10px] font-mono-tech text-gray-500 uppercase block mb-2">
                      APPLIED STACK & DOMAINS
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono-tech text-emerald-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
