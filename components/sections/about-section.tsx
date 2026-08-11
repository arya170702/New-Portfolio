"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Award, GraduationCap, Code2, ShieldCheck, Terminal } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/10">
      {/* Section Header */}
      <div className="flex items-center gap-3 text-xs font-mono-tech text-emerald-400 mb-12">
        <span>02 // PHILOSOPHY & BACKGROUND</span>
        <span className="h-px bg-emerald-500/30 flex-grow max-w-xs" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Editorial Photo & Technical Frame */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 relative group"
        >
          <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-neutral-900 shadow-2xl">
            {/* Image Overlay Label */}
            <div className="absolute top-3 left-3 z-10 glass-pill px-3 py-1 rounded-md text-[10px] font-mono-tech text-emerald-400 flex items-center gap-1.5">
              <Terminal className="w-3 h-3" />
              <span>SUBHADIP_MONDAL.RAW</span>
            </div>

            <div className="aspect-[4/5] relative overflow-hidden bg-neutral-950">
              <Image
                src={PORTFOLIO_DATA.personal.profilePic}
                alt="Subhadip Mondal"
                fill
                className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Bottom Photo Metadata */}
            <div className="p-4 bg-[#0d0d0e] border-t border-white/10 flex items-center justify-between text-xs font-mono-tech text-gray-400">
              <div>
                <span className="text-gray-500 block text-[10px]">CURRENT STATUS</span>
                <span className="text-emerald-400 font-medium">FULL-STACK INTERN</span>
              </div>
              <div className="text-right">
                <span className="text-gray-500 block text-[10px]">BASE</span>
                <span className="text-gray-200">INDIA</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Narrative & Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-7 space-y-8"
        >
          {/* Main Statement */}
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-snug">
              Engineering with <span className="text-emerald-400">visual restraint</span> and <span className="text-emerald-400">architectural precision</span>.
            </h2>
            <p className="text-gray-300 leading-relaxed font-light text-base sm:text-lg">
              {PORTFOLIO_DATA.about.philosophy}
            </p>
          </div>

          {/* Education Highlight Box */}
          <div className="p-6 rounded-2xl glass-card border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <GraduationCap className="w-24 h-24 text-emerald-400" />
            </div>
            
            <div className="flex items-center gap-3 text-xs font-mono-tech text-emerald-400 mb-2">
              <GraduationCap className="w-4 h-4" />
              <span>EDUCATION</span>
            </div>

            <h3 className="text-xl font-bold text-white">
              {PORTFOLIO_DATA.personal.education.degree}
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              {PORTFOLIO_DATA.personal.education.institution}
            </p>

            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono-tech">
              <div>
                <span className="text-gray-500">PERIOD: </span>
                <span className="text-gray-200">{PORTFOLIO_DATA.personal.education.period}</span>
              </div>
              <div>
                <span className="text-gray-500">ACADEMIC CGPA: </span>
                <span className="text-emerald-400 font-bold">{PORTFOLIO_DATA.personal.education.cgpa} / 10.0</span>
              </div>
            </div>
          </div>

          {/* Key Engineering Pillars Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl glass-card border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono-tech text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>SECURITY</span>
              </div>
              <p className="text-xs text-gray-300">
                JWT HttpOnly cookie escalation, payload sanitization & rate limiting.
              </p>
            </div>

            <div className="p-4 rounded-xl glass-card border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono-tech text-emerald-400">
                <Code2 className="w-4 h-4" />
                <span>SYSTEMS</span>
              </div>
              <p className="text-xs text-gray-300">
                Prisma ORM schema migrations, REST API design & database tuning.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
