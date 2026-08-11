"use client";

import { useState, useRef } from "react";
import { Activity } from "lucide-react";

const computeOutput = (activity: number, calories: number, rest: number) => {
  const protein = Math.round(30 + activity * 15);
  const carbs = Math.round(40 - activity * 5 + (calories / 1000) * 5);
  const fats = 100 - protein - carbs;
  const plan = activity > 6 ? "HIGH INTENSITY" : activity > 3 ? "MODERATE" : "RECOVERY";
  return { protein, carbs, fats: Math.max(fats, 10), plan };
};

export function MLRecommendationDemo() {
  const [activity, setActivity] = useState(5);
  const [calories, setCalories] = useState(2200);
  const [rest, setRest] = useState(7);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(computeOutput(5, 2200, 7));

  // Refs to avoid stale closure inside setTimeout
  const activityRef = useRef(5);
  const caloriesRef = useRef(2200);
  const restRef = useRef(7);

  const handleChange = (which: "activity" | "calories" | "rest", value: number) => {
    if (which === "activity") { setActivity(value); activityRef.current = value; }
    else if (which === "calories") { setCalories(value); caloriesRef.current = value; }
    else { setRest(value); restRef.current = value; }

    setLoading(true);
    setTimeout(() => {
      // Always reads latest values from refs — no stale closure
      setOutput(computeOutput(activityRef.current, caloriesRef.current, restRef.current));
      setLoading(false);
    }, 600);
  };

  return (
    <div className="space-y-5 font-mono-tech">
      {/* Sliders */}
      <div className="space-y-3">
        {[
          { label: "ACTIVITY LEVEL", val: activity, min: 1, max: 10, step: 1, which: "activity" as const, unit: "/10" },
          { label: "CALORIC INTAKE", val: calories, min: 1200, max: 3500, step: 100, which: "calories" as const, unit: " kcal" },
          { label: "REST HOURS", val: rest, min: 4, max: 10, step: 0.5, which: "rest" as const, unit: "h" },
        ].map(({ label, val, min, max, step, which, unit }) => (
          <div key={label}>
            <div className="flex justify-between text-[10px] text-gray-500 mb-1">
              <span>{label}</span>
              <span className="text-gray-300">{val}{unit}</span>
            </div>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={val}
              onChange={(e) => handleChange(which, Number(e.target.value))}
              className="w-full h-1 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #10b981 0%, #10b981 ${((val - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) ${((val - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) 100%)`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Output card */}
      <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
        <div className="flex items-center justify-between text-[10px] text-emerald-400 mb-2">
          <span>MODEL INFERENCE</span>
          <span className="flex items-center gap-1">
            <Activity className="w-3 h-3" />
            {loading ? "COMPUTING..." : "READY"}
          </span>
        </div>

        {loading ? (
          <div className="h-12 flex items-center justify-center text-xs text-gray-500 animate-pulse">
            running linear regression...
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-gray-400">PLAN:</span>
              <span className="text-emerald-300 font-bold">{output.plan}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-1 border-t border-emerald-500/20 text-center">
              <div>
                <div className="text-[9px] text-gray-500">PROTEIN</div>
                <div className="text-xs font-bold text-white">{output.protein}%</div>
              </div>
              <div>
                <div className="text-[9px] text-gray-500">CARBS</div>
                <div className="text-xs font-bold text-white">{output.carbs}%</div>
              </div>
              <div>
                <div className="text-[9px] text-gray-500">FATS</div>
                <div className="text-xs font-bold text-white">{output.fats}%</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
