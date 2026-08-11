"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Zap } from "lucide-react";

const NODES = ["CLIENT", "SOCKET.IO", "SERVER", "ROOM", "PEERS"];

export function ChatEventDemo() {
  const [active, setActive] = useState<number>(-1);
  const [done, setDone] = useState(false);

  const emit = () => {
    if (active >= 0) return;
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      setActive(i);
      i++;
      if (i >= NODES.length) {
        clearInterval(interval);
        setDone(true);
        setTimeout(() => { setActive(-1); setDone(false); }, 2500);
      }
    }, 420);
  };

  return (
    <div className="space-y-6 font-mono-tech">
      {/* Event label */}
      <div className="text-[10px] text-gray-500 uppercase">EVENT: message → room #engineering</div>

      {/* Flow nodes */}
      <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2">
        {NODES.map((label, i) => (
          <div key={label} className="flex items-center gap-1 sm:gap-2 shrink-0">
            <motion.div
              animate={{
                backgroundColor: active >= i ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.04)",
                borderColor: active >= i ? "rgba(16,185,129,0.6)" : "rgba(255,255,255,0.12)",
              }}
              transition={{ duration: 0.25 }}
              className="px-3 py-2 rounded-lg border text-center min-w-[70px]"
            >
              <div
                className={`text-[10px] uppercase font-bold transition-colors ${active >= i ? "text-emerald-400" : "text-gray-600"}`}
              >
                {label}
              </div>
              {active === i && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  className="h-0.5 bg-emerald-400 rounded mt-1 origin-left"
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>
            {i < NODES.length - 1 && (
              <motion.div
                animate={{ opacity: active > i ? 1 : 0.2, backgroundColor: active > i ? "#10b981" : "#374151" }}
                className="h-px w-4 sm:w-6 rounded"
                transition={{ duration: 0.25 }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Status row */}
      <div className="flex items-center gap-3">
        {active < 0 && !done && (
          <button
            onClick={emit}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/90 text-white text-xs font-bold uppercase tracking-wider hover:bg-blue-400 transition-all"
          >
            <Zap className="w-3.5 h-3.5" />
            EMIT EVENT
          </button>
        )}
        {active >= 0 && !done && (
          <span className="text-xs text-blue-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping inline-block" aria-hidden="true" />
            PROPAGATING...
          </span>
        )}
        {done && (
          <span className="text-xs text-emerald-400 font-bold">
            ✓ BROADCAST TO 3 PEERS • 12ms RTT
          </span>
        )}
      </div>
    </div>
  );
}
