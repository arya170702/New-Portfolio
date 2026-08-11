"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowDownRight, Github, Linkedin, Twitter, FileText, Sparkles, MapPin } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animationFrameId: number;
    let isInView = true;
    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const gridSpacing = 40;
    const points: { x: number; y: number; originX: number; originY: number }[] = [];

    for (let x = 0; x < width; x += gridSpacing) {
      for (let y = 0; y < height; y += gridSpacing) {
        points.push({ x, y, originX: x, originY: y });
      }
    }

    let targetX = width / 2;
    let targetY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
    };

    // If reduced-motion: draw a static grid and bail — no animation
    if (prefersReduced) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
      for (const p of points) ctx.fillRect(p.x, p.y, 1.5, 1.5);
      return () => window.removeEventListener("resize", handleResize);
    }

    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      if (!isInView) return; // paused — section out of viewport
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const dx = targetX - p.originX;
        const dy = targetY - p.originY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 180;

        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * 12;
          const angle = Math.atan2(dy, dx);
          p.x = p.originX - Math.cos(angle) * force;
          p.y = p.originY - Math.sin(angle) * force;
          ctx.fillStyle = `rgba(16, 185, 129, ${0.15 + (1 - dist / maxDist) * 0.45})`;
        } else {
          p.x += (p.originX - p.x) * 0.1;
          p.y += (p.originY - p.y) * 0.1;
          ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
        }
        ctx.fillRect(p.x, p.y, 1.5, 1.5);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Pause RAF loop when section leaves viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
        if (isInView) animationFrameId = requestAnimationFrame(render);
      },
      { threshold: 0 }
    );
    observer.observe(canvas);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-[92svh] lg:min-h-screen flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-grid-pattern bg-radial-gradient"
    >
      {/* Background Interactive Grid Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-70 z-0"
      />

      {/* Hero Top Technical Metadata Bar */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-wrap items-center justify-between gap-4 text-xs font-mono-tech border-b border-white/10 pb-4">
        <div className="flex items-center gap-3 text-gray-400">
          <span className="text-emerald-400 font-semibold">01 // INTRO</span>
          <span className="text-gray-600">•</span>
          <span className="flex items-center gap-1.5 text-gray-300">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>INDIA</span>
          </span>
        </div>

        {/* Live Availability Status */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" aria-hidden="true" />
          <span className="font-medium tracking-wide uppercase">
            {PORTFOLIO_DATA.personal.status}
          </span>
        </div>
      </div>

      {/* Hero Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto w-full my-auto py-12 flex flex-col justify-center">
        {/* Sub-header / Role Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono-tech text-emerald-400 tracking-wider uppercase flex items-center gap-1.5">
            <span>FULL-STACK DEVELOPER INTERN @</span>
            <a
              href="https://notapex.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-emerald-400 transition-colors underline underline-offset-4 decoration-emerald-500/50 inline-flex items-center gap-0.5"
            >
              <span>NOTAPEX</span>
              <ArrowDownRight className="w-3 h-3 text-emerald-400 -rotate-90" />
            </a>
          </span>
          <span className="hidden sm:inline text-xs font-mono-tech text-gray-500">
            B.TECH CSE @ VIT VELLORE
          </span>
        </motion.div>

        {/* Huge Typographic Display Headline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-1 sm:space-y-2"
        >
          <h1 className="text-4xl sm:text-7xl lg:text-9xl font-extrabold tracking-tighter uppercase text-white leading-[0.9]">
            <span className="block">SUBHADIP</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-400 to-emerald-400/80">MONDAL</span>
          </h1>
        </motion.div>

        {/* Narrative Intro & Key Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-8 max-w-2xl flex flex-col sm:flex-row items-start gap-6 border-l-2 border-emerald-500/40 pl-5"
        >
          <p className="text-lg sm:text-xl text-gray-300 font-light leading-relaxed">
            Full-Stack Developer building thoughtful interfaces, reliable security systems, and high-performance digital products that feel effortless to use.
          </p>
        </motion.div>

        {/* CTA Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton strength={0.3}>
            <a
              href="#projects"
              className="px-6 py-3.5 rounded-full bg-white text-black font-semibold text-sm tracking-wide flex items-center gap-2 hover:bg-emerald-400 hover:text-black transition-all shadow-lg shadow-white/5 group"
            >
              <span>EXPLORE SELECTED WORK</span>
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </a>
          </MagneticButton>

          <MagneticButton strength={0.25}>
            <a
              href={PORTFOLIO_DATA.personal.resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-mono-tech text-xs tracking-wider uppercase border border-white/15 flex items-center gap-2 transition-all hover:border-emerald-500/40"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>DOWNLOAD 2026 CV</span>
            </a>
          </MagneticButton>

          <div className="flex items-center gap-2 ml-auto sm:ml-0 pt-2 sm:pt-0">
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-3.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-3.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PORTFOLIO_DATA.personal.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter Profile"
              className="p-3.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Hero Bottom Bar Metadata */}
      <div className="relative z-10 max-w-6xl mx-auto w-full pt-6 border-t border-white/10 flex flex-wrap items-start justify-between gap-6 text-xs font-mono-tech text-gray-400">
        <div className="flex flex-wrap items-start gap-8">
          <div>
            <span className="text-gray-600 block text-[10px] mb-1">FRONTEND</span>
            <span className="text-gray-300">React · Next.js · TypeScript · Redux · Tailwind</span>
          </div>
          <div className="hidden sm:block">
            <span className="text-gray-600 block text-[10px] mb-1">BACKEND & CLOUD</span>
            <span className="text-gray-300">Node · Express · Prisma · Socket.IO · AWS</span>
          </div>
          <div className="hidden md:block">
            <span className="text-gray-600 block text-[10px] mb-1">MOBILE & DATABASES</span>
            <span className="text-gray-300">Flutter · React Native · PostgreSQL · MongoDB · Redis</span>
          </div>
          <div className="hidden lg:block">
            <span className="text-gray-600 block text-[10px] mb-1">SECURITY & AI</span>
            <span className="text-gray-300">JWT · OAuth · Python ML · NumPy · Pandas</span>
          </div>
        </div>

        <a
          href="#about"
          className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors group shrink-0"
        >
          <span>SCROLL FOR SYSTEM OVERVIEW</span>
          <span className="animate-bounce">↓</span>
        </a>
      </div>
    </section>

  );
}
