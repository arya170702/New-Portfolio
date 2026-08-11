"use client";

import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  User, Briefcase, Code2, Map, Layers, Trophy, Mail,
  Github, Linkedin, Twitter, FileText, Copy, Search, ArrowRight,
  Keyboard, Terminal
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio-data";

interface Command {
  id: string;
  label: string;
  description?: string;
  group: string;
  icon: React.ReactNode;
  action: () => void;
  keywords?: string;
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function openUrl(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [sudoMode, setSudoMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const copyEmail = useCallback(() => {
    const fallback = () => showToast("Email: " + PORTFOLIO_DATA.personal.email);
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        navigator.clipboard
          .writeText(PORTFOLIO_DATA.personal.email)
          .then(() => showToast("Email copied to clipboard"))
          .catch(fallback);
      } else {
        fallback();
      }
    } catch {
      fallback();
    }
    setOpen(false);
  }, []);

  const commands: Command[] = useMemo(() => [
    // Navigate
    { id: "nav-about",    group: "Navigate", label: "Go to About",            icon: <User className="w-4 h-4" />,      action: () => { scrollTo("about"); setOpen(false); } },
    { id: "nav-exp",      group: "Navigate", label: "Go to Experience",        icon: <Briefcase className="w-4 h-4" />, action: () => { scrollTo("experience"); setOpen(false); } },
    { id: "nav-work",     group: "Navigate", label: "Go to Selected Work",     icon: <Code2 className="w-4 h-4" />,     action: () => { scrollTo("projects"); setOpen(false); } },
    { id: "nav-map",      group: "Navigate", label: "Go to Engineering Map",   icon: <Map className="w-4 h-4" />,       action: () => { scrollTo("engineering-map"); setOpen(false); } },
    { id: "nav-think",    group: "Navigate", label: "Go to Engineering Philosophy", icon: <Terminal className="w-4 h-4" />, action: () => { scrollTo("thinking"); setOpen(false); } },
    { id: "nav-achieve",  group: "Navigate", label: "Go to Achievements",      icon: <Trophy className="w-4 h-4" />,    action: () => { scrollTo("achievements"); setOpen(false); } },
    { id: "nav-contact",  group: "Navigate", label: "Go to Contact",           icon: <Mail className="w-4 h-4" />,      action: () => { scrollTo("contact"); setOpen(false); } },
    // Projects
    { id: "proj-autotx",  group: "Projects", label: "AutoTX — Expense Tracker",       icon: <Code2 className="w-4 h-4" />, keywords: "autotx sms flutter", action: () => { scrollTo("projects"); setOpen(false); } },
    { id: "proj-chat",    group: "Projects", label: "Chat App — Socket.io Platform",  icon: <Code2 className="w-4 h-4" />, keywords: "chat socket nodejs",  action: () => { scrollTo("projects"); setOpen(false); } },
    { id: "proj-noex",    group: "Projects", label: "No-Excuses — ML Fitness App",    icon: <Code2 className="w-4 h-4" />, keywords: "noexcuses ml fitness", action: () => { scrollTo("projects"); setOpen(false); } },
    // Actions
    { id: "act-github",   group: "Actions", label: "Open GitHub Profile",   icon: <Github className="w-4 h-4" />,    action: () => { openUrl(PORTFOLIO_DATA.personal.github); setOpen(false); } },
    { id: "act-linkedin", group: "Actions", label: "Open LinkedIn Profile", icon: <Linkedin className="w-4 h-4" />,  action: () => { openUrl(PORTFOLIO_DATA.personal.linkedin); setOpen(false); } },
    { id: "act-twitter",  group: "Actions", label: "Open Twitter / X Profile", icon: <Twitter className="w-4 h-4" />, action: () => { openUrl(PORTFOLIO_DATA.personal.twitter); setOpen(false); } },
    { id: "act-cv",       group: "Actions", label: "Download 2026 CV",      icon: <FileText className="w-4 h-4" />,  action: () => { openUrl(PORTFOLIO_DATA.personal.resumePdf); setOpen(false); } },
    { id: "act-email",    group: "Actions", label: "Copy Email Address",     icon: <Copy className="w-4 h-4" />,      action: copyEmail, description: PORTFOLIO_DATA.personal.email },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [copyEmail]);

  // Filter commands by query
  const filtered = query.trim() === ""
    ? commands
    : commands.filter((c) => {
        const q = query.toLowerCase();
        return (
          c.label.toLowerCase().includes(q) ||
          c.group.toLowerCase().includes(q) ||
          (c.keywords ?? "").toLowerCase().includes(q)
        );
      });

  // Group filtered commands
  const groups = Array.from(new Set(filtered.map((c) => c.group)));

  // Check for sudo easter egg
  useEffect(() => {
    if (query.toLowerCase() === "sudo") {
      setSudoMode(true);
    } else {
      setSudoMode(false);
    }
  }, [query]);

  // Reset selection on query change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Global keyboard handler
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        setQuery("");
        setSudoMode(false);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Focus input when opened; restore focus on close
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      triggerRef.current?.focus();
    }
  }, [open]);

  // Focus trap: keep Tab/Shift+Tab inside the dialog
  const handleDialogKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !dialogRef.current) return;
    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  };

  // Keyboard navigation within palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (sudoMode) return; // no-op for easter egg
      filtered[selectedIndex]?.action();
    }
  };

  let flatIndex = 0;

  return (
    <>
      {/* Keyboard shortcut hint in footer area — discovered naturally */}
      <div className="fixed bottom-6 right-6 z-30 hidden lg:flex">
        <button
          ref={triggerRef}
          onClick={() => setOpen(true)}
          className="glass-pill px-3 py-2 rounded-full flex items-center gap-2 text-[10px] font-mono-tech text-gray-500 hover:text-gray-300 border border-white/10 hover:border-white/20 transition-all group"
          aria-label="Open command palette"
          aria-keyshortcuts="Control+k Meta+k"
        >
          <Keyboard className="w-3 h-3 text-gray-600 group-hover:text-emerald-400 transition-colors" />
          <span>⌘K</span>
        </button>
      </div>

      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[200] px-5 py-2.5 rounded-full bg-emerald-500 text-black text-xs font-mono-tech font-bold shadow-xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Command Palette Overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Palette panel */}
            <motion.div
              ref={dialogRef}
              initial={{ opacity: 0, scale: 0.97, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -12 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-[10vh] left-1/2 -translate-x-1/2 z-[101] w-full max-w-lg px-4 max-h-[80vh] flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              onKeyDown={handleDialogKeyDown}
            >
              <div
                className="bg-[#0c0c0f] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col min-h-0"
                onKeyDown={handleKeyDown}
              >
                {/* Search input */}
                <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
                  <Search className="w-4 h-4 text-gray-500 shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search commands, sections, projects..."
                    className="flex-grow bg-transparent text-sm text-white placeholder:text-gray-600 outline-none font-mono-tech"
                    aria-label="Command palette search"
                  />
                  <kbd className="text-[10px] font-mono-tech text-gray-600 px-1.5 py-0.5 rounded border border-white/10">
                    ESC
                  </kbd>
                </div>

                {/* Results or easter egg */}
                <div className="max-h-[50vh] overflow-y-auto overscroll-contain py-2">
                  {sudoMode ? (
                    <SudoEasterEgg />
                  ) : filtered.length === 0 ? (
                    <div className="px-4 py-8 text-center text-xs font-mono-tech text-gray-600">
                      No commands match "{query}"
                    </div>
                  ) : (
                    groups.map((group) => {
                      const groupCommands = filtered.filter((c) => c.group === group);
                      return (
                        <div key={group}>
                          <div className="px-4 py-1.5 text-[10px] font-mono-tech text-gray-600 uppercase tracking-wider">
                            {group}
                          </div>
                          {groupCommands.map((cmd) => {
                            const currentIndex = flatIndex++;
                            const isSelected = currentIndex === selectedIndex;
                            return (
                              <button
                                key={cmd.id}
                                onClick={cmd.action}
                                onMouseEnter={() => setSelectedIndex(currentIndex)}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                                  isSelected ? "bg-white/8 text-white" : "text-gray-400 hover:text-gray-200"
                                }`}
                              >
                                <span className={`shrink-0 transition-colors ${isSelected ? "text-emerald-400" : "text-gray-600"}`}>
                                  {cmd.icon}
                                </span>
                                <div className="flex-grow min-w-0">
                                  <div className="text-sm font-medium truncate">{cmd.label}</div>
                                  {cmd.description && (
                                    <div className="text-[10px] font-mono-tech text-gray-600 truncate">
                                      {cmd.description}
                                    </div>
                                  )}
                                </div>
                                {isSelected && (
                                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Footer hint */}
                <div className="px-4 py-2.5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono-tech text-gray-600">
                  <span>↑↓ navigate</span>
                  <span>↵ execute</span>
                  <span>esc close</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function SudoEasterEgg() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-4 py-6 font-mono-tech"
    >
      <div className="text-xs text-red-400 mb-1">bash: sudo: command not found</div>
      <div className="text-xs text-gray-500 mb-4">
        Nice try. This portfolio runs entirely without root access.
      </div>
      <div className="text-[10px] text-emerald-400 border-t border-white/10 pt-3 space-y-1">
        <div>{">"} SYSTEM: Subhadip Mondal Portfolio v2.0</div>
        <div>{">"} STACK: Next.js 15 · React 19 · TypeScript · Tailwind CSS v4</div>
        <div>{">"} STATUS: Available for opportunities</div>
        <div className="text-[10px] text-gray-600">{'>'} <span className="text-white">{PORTFOLIO_DATA.personal.email}</span></div>
      </div>
    </motion.div>
  );
}
