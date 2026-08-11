"use client";

import { motion } from "motion/react";
import { Award, ShieldCheck, Trophy, ArrowUpRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

export function AchievementsSection() {
  return (
    <section id="achievements" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/10">
      {/* Section Label */}
      <div className="flex items-center gap-3 text-xs font-mono-tech text-emerald-400 mb-4">
        <span>07 // METRICS & CERTIFICATIONS</span>
        <span className="h-px bg-emerald-500/30 flex-grow max-w-xs" />
      </div>

      <div className="mb-14">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
          ACHIEVEMENTS & MILESTONES
        </h2>
        <p className="text-gray-400 text-sm sm:text-base mt-2 max-w-xl font-light">
          Competitive entrance examination rank metrics and industry technical certifications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: High-Impact Entrance Stats Cards */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PORTFOLIO_DATA.achievements.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-6 rounded-2xl glass-card border border-white/10 flex flex-col justify-between relative overflow-hidden group hover:border-emerald-500/30"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Trophy className="w-16 h-16 text-emerald-400" />
              </div>

              <div>
                <span className="text-[10px] font-mono-tech text-emerald-400 uppercase tracking-widest block mb-2">
                  NATIONAL RANKING
                </span>
                <h3 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                  {item.value}
                </h3>
                <p className="text-sm font-bold text-gray-200 mt-2">{item.label}</p>
                <p className="text-xs text-gray-400 mt-1 font-light">{item.detail}</p>
              </div>

              {item.subtext && (
                <div className="mt-6 pt-4 border-t border-white/10 text-[11px] font-mono-tech text-gray-400">
                  {item.subtext}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Right Column: Industry Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-6 p-8 rounded-2xl glass-card border border-white/10 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-tech text-emerald-400 mb-6">
              <Award className="w-4 h-4" />
              <span className="uppercase">PROFESSIONAL CERTIFICATIONS</span>
            </div>

            <div className="space-y-6">
              {PORTFOLIO_DATA.certifications.map((cert) => (
                cert.url ? (
                  <a
                    key={cert.title}
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-4 hover:border-emerald-500/30 transition-all group cursor-pointer"
                  >
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 group-hover:scale-110 transition-transform">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                        {cert.title}
                      </h4>
                      <p className="text-xs font-mono-tech text-gray-400 mt-1">
                        ISSUED BY: <span className="text-emerald-400">{cert.issuer}</span>
                      </p>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono-tech text-gray-500 group-hover:text-emerald-400 mt-2 transition-colors">
                        VIEW CREDENTIAL
                        <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </a>
                ) : (
                  <div
                    key={cert.title}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-4 group"
                  >
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <h4 className="text-base font-bold text-white leading-snug">
                        {cert.title}
                      </h4>
                      <p className="text-xs font-mono-tech text-gray-400 mt-1">
                        ISSUED BY: <span className="text-emerald-400">{cert.issuer}</span>
                      </p>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 text-xs font-mono-tech text-gray-500 flex items-center justify-between">
            <span>VERIFIED CREDENTIALS</span>
            <span className="text-emerald-400">AUTHENTICATED</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
