"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, ArrowUpRight } from "lucide-react";
import { PORTFOLIO_DATA, ProjectItem } from "@/data/portfolio-data";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { AutoTxDemo } from "@/components/demos/autotx-demo";
import { ChatEventDemo } from "@/components/demos/chat-event-demo";
import { MLRecommendationDemo } from "@/components/demos/ml-recommendation-demo";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/10">
      <div className="flex items-center gap-3 text-xs font-mono-tech text-emerald-400 mb-4">
        <span>04 // SELECTED WORK & CASE STUDIES</span>
        <span className="h-px bg-emerald-500/30 flex-grow max-w-xs" />
      </div>

      <div className="mb-16">
        <h2 className="text-3xl sm:text-6xl font-extrabold tracking-tight text-white uppercase">
          FEATURED PROJECTS
        </h2>
        <p className="text-gray-400 text-sm sm:text-base mt-2 max-w-xl font-light">
          Engineering concepts made interactive. Trigger each simulation to experience the core idea.
        </p>
      </div>

      <div className="space-y-20 lg:space-y-28">
        {PORTFOLIO_DATA.projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} isEven={index % 2 === 0} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, isEven }: { project: ProjectItem; isEven: boolean }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="group"
    >
      {/* Top meta row */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
        <span className="text-4xl font-extrabold font-mono-tech text-gray-600 group-hover:text-emerald-500 transition-colors duration-300">
          {project.number}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono-tech text-gray-500 uppercase tracking-wider">
            {project.tech.slice(0, 2).join(" · ")}
          </span>
          <MagneticButton strength={0.2}>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} on GitHub`}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/15 text-gray-400 hover:text-white hover:border-emerald-500/50 text-xs font-mono-tech transition-all"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GITHUB</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </MagneticButton>
        </div>
      </div>

      {/* Main content grid */}
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start`}>

        {/* Text Side */}
        <div className={`lg:col-span-5 space-y-5 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
          <div>
            <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-none">
              {project.title}
            </h3>
            <p className="text-xs font-mono-tech text-emerald-400 mt-2 uppercase tracking-wider">
              {project.subtitle}
            </p>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed font-light">
            {project.description}
          </p>

          {/* Expandable deep-dive */}
          <div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs font-mono-tech text-gray-400 hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
            >
              <span>{expanded ? "HIDE" : "VIEW"} ENGINEERING DETAILS</span>
              <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                ↓
              </motion.span>
            </button>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 space-y-2">
                    {project.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-300 font-mono-tech">
                        <span className="text-emerald-500 mt-0.5">→</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono-tech text-gray-400"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Interactive Demo Side */}
        <div className={`lg:col-span-7 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
          <div
            className="relative rounded-2xl bg-[#080a0d] border border-white/10 overflow-hidden"
            style={{ minHeight: 300 }}
          >
            {/* Terminal header bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.02]">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
              <span className="ml-3 text-[10px] font-mono-tech text-gray-500 uppercase">
                {project.id}_INTERACTIVE_SIM.SYS
              </span>
              <span className="ml-auto text-[10px] font-mono-tech text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" aria-hidden="true" />
                LIVE
              </span>
            </div>

            <div className="p-5">
              {project.id === "autotx" && <AutoTxDemo />}
              {project.id === "chat-app" && <ChatEventDemo />}
              {project.id === "no-excuses" && <MLRecommendationDemo />}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
