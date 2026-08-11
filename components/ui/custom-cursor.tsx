"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isVisibleRef = useRef(false);

  // Raw motion values — update directly, no React state, no re-renders per mousemove
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Spring-smoothed positions — glow (sluggish, large blob) and dot (snappy)
  const glowX = useSpring(rawX, { damping: 25, stiffness: 200, mass: 0.5 });
  const glowY = useSpring(rawY, { damping: 25, stiffness: 200, mass: 0.5 });
  const dotX  = useSpring(rawX, { damping: 30, stiffness: 350, mass: 0.2 });
  const dotY  = useSpring(rawY, { damping: 30, stiffness: 350, mass: 0.2 });

  useEffect(() => {
    // Only activate on fine pointer devices (desktop)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      try {
        const rawTarget = e.target as Node | null;
        if (!rawTarget) return;
        const target =
          rawTarget.nodeType === Node.ELEMENT_NODE
            ? (rawTarget as HTMLElement)
            : rawTarget.parentElement;
        if (target && typeof target.closest === "function") {
          const isInteractive =
            target.tagName === "BUTTON" ||
            target.tagName === "A" ||
            Boolean(target.closest("button")) ||
            Boolean(target.closest("a")) ||
            target.getAttribute?.("role") === "button" ||
            target.classList?.contains("interactive-hover");
          setIsHovered(Boolean(isInteractive));
        } else {
          setIsHovered(false);
        }
      } catch {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      isVisibleRef.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [rawX, rawY]); // motion values are stable refs — safe deps

  if (!isVisible) return null;

  const glowSize = isHovered ? 280 : 240;
  const dotSize  = isHovered ? 32  : 12;

  return (
    <>
      {/* Ambient glow blob — driven by spring motion values, 0 React re-renders on move */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full blur-xl opacity-20 bg-emerald-500 hidden md:block"
        style={{ x: glowX, y: glowY, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: glowSize, height: glowSize }}
        transition={{ type: "spring", damping: 25, stiffness: 200, mass: 0.5 }}
      />

      {/* Precision ring dot — snappier spring, same motion value source */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-emerald-400/50 bg-emerald-400/20 hidden md:block"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{ width: dotSize, height: dotSize }}
        transition={{ type: "spring", damping: 30, stiffness: 350, mass: 0.2 }}
      />
    </>
  );
}
