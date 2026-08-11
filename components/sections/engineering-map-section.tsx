"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ENGINEERING_MAP, EngMapNode } from "@/data/engineering-map";

function getNodeColor(type: EngMapNode["type"], active: boolean, highlighted: boolean, dimmed: boolean) {
  if (dimmed) return { fill: "rgba(255,255,255,0.04)", stroke: "rgba(255,255,255,0.06)", text: "rgba(255,255,255,0.2)" };
  if (active) return { fill: "rgba(16,185,129,0.2)", stroke: "#10b981", text: "#fff" };
  if (highlighted) return { fill: "rgba(16,185,129,0.1)", stroke: "rgba(16,185,129,0.6)", text: "#d1fae5" };
  if (type === "project") return { fill: "rgba(255,255,255,0.08)", stroke: "rgba(255,255,255,0.3)", text: "#f3f4f6" };
  if (type === "tech") return { fill: "rgba(255,255,255,0.04)", stroke: "rgba(255,255,255,0.15)", text: "#9ca3af" };
  return { fill: "rgba(255,255,255,0.04)", stroke: "rgba(255,255,255,0.1)", text: "#6b7280" };
}

function getEdgeColor(active: boolean, highlighted: boolean, dimmed: boolean) {
  if (dimmed) return "rgba(255,255,255,0.03)";
  if (active) return "rgba(16,185,129,0.8)";
  if (highlighted) return "rgba(16,185,129,0.35)";
  return "rgba(255,255,255,0.08)";
}

function getEdgeWidth(active: boolean, highlighted: boolean) {
  if (active) return 1.5;
  if (highlighted) return 1;
  return 0.5;
}

export function EngineeringMapSection() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [hoverNode, setHoverNode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 800, h: 480 });

  const nodeById = new Map(ENGINEERING_MAP.nodes.map((n) => [n.id, n]));

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setDims({
          w: containerRef.current.offsetWidth,
          h: containerRef.current.offsetHeight,
        });
      }
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const focused = activeNode ?? hoverNode;

  // Find all node IDs directly connected to focused
  const connectedIds = focused
    ? new Set(
        ENGINEERING_MAP.edges
          .filter((e) => e.from === focused || e.to === focused)
          .flatMap((e) => [e.from, e.to])
      )
    : null;

  const isNodeHighlighted = (id: string): boolean => connectedIds !== null && connectedIds.has(id);
  const isNodeDimmed = (id: string): boolean => connectedIds !== null && !connectedIds.has(id) && id !== focused;
  const isEdgeActive = (from: string, to: string): boolean =>
    focused !== null && (from === focused || to === focused);
  const isEdgeHighlighted = (from: string, to: string): boolean =>
    focused !== null &&
    connectedIds !== null &&
    (connectedIds.has(from) || connectedIds.has(to)) &&
    !isEdgeActive(from, to);
  const isEdgeDimmed = (from: string, to: string): boolean =>
    focused !== null && !isEdgeActive(from, to) && !isEdgeHighlighted(from, to);

  const nodePos = (node: EngMapNode) => ({
    cx: (node.x / 100) * dims.w,
    cy: (node.y / 100) * dims.h,
  });

  const activeNodeData = ENGINEERING_MAP.nodes.find((n) => n.id === focused);

  return (
    <section id="engineering-map" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
      {/* Section Label */}
      <div className="flex items-center gap-3 text-xs font-mono-tech text-emerald-400 mb-4">
        <span>05 // ENGINEERING SYSTEM MAP</span>
        <span className="h-px bg-emerald-500/30 flex-grow max-w-xs" />
      </div>

      <div className="mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white uppercase">
            HOW IT ALL CONNECTS
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-2 max-w-lg font-light">
            Every project, technology and engineering concept from my actual work — mapped as a living system. Click any node to explore relationships.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 text-xs font-mono-tech text-gray-400 shrink-0">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full border-2 border-white/40 bg-white/10 inline-block" />
            PROJECT
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full border border-white/25 bg-white/5 inline-block" />
            TECH
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full border border-white/15 inline-block" />
            CONCEPT
          </span>
        </div>
      </div>

      {/* SVG Map Container */}
      <div
        ref={containerRef}
        className="relative w-full rounded-2xl border border-white/10 bg-[#060608] overflow-hidden"
        style={{ height: "clamp(380px, 55vw, 560px)" }}
      >
        {/* Subtle radial background */}
        <div className="absolute inset-0 bg-radial-gradient opacity-40 pointer-events-none" />

        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${dims.w} ${dims.h}`}
          className="absolute inset-0"
          style={{ cursor: "default" }}
          role="img"
          aria-label="Engineering system map showing connections between projects, technologies, and concepts"
        >
          {/* Draw edges first (behind nodes) */}
          {ENGINEERING_MAP.edges.map((edge) => {
            const fromNode = nodeById.get(edge.from)!;
            const toNode = nodeById.get(edge.to)!;
            const from = nodePos(fromNode);
            const to = nodePos(toNode);
            const active = isEdgeActive(edge.from, edge.to);
            const highlighted = isEdgeHighlighted(edge.from, edge.to);
            const dimmed = isEdgeDimmed(edge.from, edge.to);

            // Midpoint for a subtle bezier curve
            const mx = (from.cx + to.cx) / 2;
            const my = (from.cy + to.cy) / 2 - 20;

            return (
              <g key={`${edge.from}-${edge.to}`}>
                <path
                  d={`M ${from.cx} ${from.cy} Q ${mx} ${my} ${to.cx} ${to.cy}`}
                  fill="none"
                  stroke={getEdgeColor(active, highlighted, dimmed)}
                  strokeWidth={getEdgeWidth(active, highlighted)}
                  style={{ transition: "stroke 0.3s ease, stroke-width 0.3s ease" }}
                />
                {/* Animated travelling dot on active edges — CSS only, no SMIL */}
                {active && (
                  <path
                    d={`M ${from.cx} ${from.cy} Q ${mx} ${my} ${to.cx} ${to.cy}`}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="6 300"
                    style={{
                      animation: "edgeDash 1.4s linear infinite",
                    }}
                  />
                )}
              </g>
            );
          })}

          {/* Draw nodes */}
          {ENGINEERING_MAP.nodes.map((node) => {
            const { cx, cy } = nodePos(node);
            const isActive = node.id === focused;
            const highlighted = isNodeHighlighted(node.id) && !isActive;
            const dimmed = isNodeDimmed(node.id);
            const colors = getNodeColor(node.type, isActive, highlighted, dimmed);
            const radius = node.type === "project" ? 28 : node.type === "tech" ? 20 : 16;

            return (
              <g
                key={node.id}
                role="button"
                tabIndex={0}
                aria-label={`${node.type === "project" ? "Project" : node.type === "tech" ? "Technology" : "Concept"}: ${node.label}${node.description ? " — " + node.description : ""}`}
                aria-pressed={node.id === focused}
                style={{ cursor: "pointer", transition: "all 0.3s ease" }}
                onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
                onMouseEnter={() => setHoverNode(node.id)}
                onMouseLeave={() => setHoverNode(null)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveNode(activeNode === node.id ? null : node.id);
                  }
                }}
              >
                {/* Outer pulse ring — CSS animation, no SMIL */}
                {isActive && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={radius + 8}
                    fill="none"
                    stroke="rgba(16,185,129,0.3)"
                    strokeWidth="1"
                    style={{ animation: "nodeRingPulse 2s ease-in-out infinite" }}
                  />
                )}

                {/* Node circle */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={radius}
                  fill={colors.fill}
                  stroke={colors.stroke}
                  strokeWidth={isActive ? 1.5 : 1}
                  style={{ transition: "all 0.3s ease" }}
                />

                {/* Node label */}
                <text
                  x={cx}
                  y={cy + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={node.type === "project" ? 8 : 7}
                  fontFamily="var(--font-geist-mono), monospace"
                  fontWeight={node.type === "project" ? "700" : "500"}
                  fill={colors.text}
                  style={{ transition: "fill 0.3s ease", userSelect: "none", pointerEvents: "none" }}
                  letterSpacing="0.5"
                >
                  {node.label.length > 10 ? node.label.substring(0, 10) : node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover/Active Info Panel */}
        <AnimatePresence>
          {activeNodeData && (
            <motion.div
              key={activeNodeData.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs p-4 rounded-xl bg-[#0d0d0f]/95 border border-emerald-500/30 backdrop-blur-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-mono-tech text-emerald-400 uppercase block mb-1">
                    {activeNodeData.type === "project" ? "PROJECT" : activeNodeData.type === "tech" ? "TECHNOLOGY" : "CONCEPT"}
                  </span>
                  <h4 className="text-sm font-bold text-white">{activeNodeData.label}</h4>
                  {activeNodeData.description && (
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">{activeNodeData.description}</p>
                  )}
                </div>
                <button
                  onClick={() => setActiveNode(null)}
                  className="text-gray-500 hover:text-white text-lg leading-none shrink-0 transition-colors"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              <div className="mt-3 pt-3 border-t border-white/10 text-[10px] font-mono-tech text-gray-500">
                {ENGINEERING_MAP.edges.filter((e) => e.from === activeNodeData.id || e.to === activeNodeData.id).length} CONNECTIONS
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Idle hint */}
        {!focused && (
          <div className="absolute bottom-4 right-4 text-[10px] font-mono-tech text-gray-600 select-none">
            CLICK ANY NODE TO EXPLORE
          </div>
        )}
      </div>
    </section>
  );
}
