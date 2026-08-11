"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Play, RotateCcw } from "lucide-react";

const SMS_RAW = "Txn of INR 1,450.00 debited from A/C XX4921 on 12-05-2026.";
const PARSED = { amount: "₹1,450.00", type: "DEBIT", category: "DINING", account: "XX4921" };

export function AutoTxDemo() {
  const [step, setStep] = useState<"idle" | "parsing" | "done">("idle");

  const parse = () => {
    if (step !== "idle") return;
    setStep("parsing");
    setTimeout(() => setStep("done"), 1800);
  };

  return (
    <div className="space-y-4 font-mono-tech">
      {/* Raw SMS */}
      <div className="p-3.5 rounded-lg bg-white/5 border border-white/10">
        <div className="text-[10px] text-gray-500 mb-2 uppercase tracking-wider">RAW BANK SMS</div>
        <p className="text-xs text-gray-300 leading-relaxed">
          {step === "parsing" ? (
            SMS_RAW.split("").map((ch, i) => (
              <motion.span
                key={i}
                initial={{ color: "#9ca3af" }}
                animate={{ color: i < 22 ? "#10b981" : i < 40 ? "#6366f1" : "#9ca3af" }}
                transition={{ delay: i * 0.018 }}
              >
                {ch}
              </motion.span>
            ))
          ) : (
            <span className="text-gray-300">{SMS_RAW}</span>
          )}
        </p>
      </div>

      {/* Pipeline arrow */}
      <div className="flex items-center gap-2 text-[10px] text-gray-600 uppercase">
        <span className={`h-px flex-grow transition-colors duration-500 ${step !== "idle" ? "bg-emerald-500/50" : "bg-white/10"}`} />
        <span className={step !== "idle" ? "text-emerald-400" : ""}>REGEX EXTRACTION PIPELINE</span>
        <span className={`h-px flex-grow transition-colors duration-500 ${step !== "idle" ? "bg-emerald-500/50" : "bg-white/10"}`} />
      </div>

      {/* Extracted fields */}
      <div className="grid grid-cols-2 gap-2.5">
        {Object.entries(PARSED).map(([key, val], i) => (
          <motion.div
            key={key}
            className={`p-2.5 rounded-lg border transition-all duration-300 ${
              step === "done"
                ? "bg-emerald-500/10 border-emerald-500/30"
                : "bg-white/3 border-white/10"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: step === "done" ? 1 : 0.3 }}
            transition={{ delay: step === "done" ? i * 0.1 : 0 }}
          >
            <div className="text-[10px] text-gray-500 uppercase mb-1">{key}</div>
            <div className={`text-sm font-bold transition-colors ${step === "done" ? "text-emerald-400" : "text-gray-600"}`}>
              {step === "done" ? val : "—"}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Control */}
      <div className="flex items-center gap-3 pt-2">
        {step === "idle" && (
          <button
            onClick={parse}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 text-black text-xs font-bold uppercase tracking-wider hover:bg-emerald-400 transition-all"
          >
            <Play className="w-3.5 h-3.5" />
            PARSE MESSAGE
          </button>
        )}
        {step === "parsing" && (
          <span className="text-xs text-emerald-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" aria-hidden="true" />
            EXTRACTING FIELDS...
          </span>
        )}
        {step === "done" && (
          <>
            <span className="text-xs text-emerald-400 font-bold">✓ TRANSACTION EXTRACTED</span>
            <button
              onClick={() => setStep("idle")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 text-gray-400 hover:text-white text-xs transition-all ml-auto"
            >
              <RotateCcw className="w-3 h-3" />
              RESET
            </button>
          </>
        )}
      </div>
    </div>
  );
}
