"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

interface Photo {
  src: string;
  alt: string;
}

interface PhotoFilmstripProps {
  photos: Photo[];
  /** ms between auto-advances, default 3200 */
  interval?: number;
  className?: string;
}

export function PhotoFilmstrip({
  photos,
  interval = 3200,
  className = "",
}: PhotoFilmstripProps) {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setTimeout(advance, interval);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, isPaused, advance, interval]);

  return (
    <div
      className={`relative w-full h-full ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main photo display */}
      <div className="relative w-full h-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0"
          >
            <Image
              src={photos[active].src}
              alt={photos[active].alt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority={active === 0}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Thumbnail strip — peek strip at bottom */}
      <div className="absolute bottom-[60px] left-0 right-0 z-20 px-3 flex items-end gap-1.5 justify-center">
        {photos.map((photo, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActive(idx);
              setIsPaused(true);
              setTimeout(() => setIsPaused(false), 4000);
            }}
            aria-label={`View photo ${idx + 1}`}
            className={`relative rounded overflow-hidden transition-all duration-400 border flex-shrink-0 ${
              idx === active
                ? "w-10 h-12 border-emerald-400/70 shadow-lg shadow-emerald-400/20"
                : "w-7 h-9 border-white/20 opacity-50 hover:opacity-80 hover:border-white/40"
            }`}
            style={{ transitionProperty: "width, height, opacity, border-color" }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover object-center"
              sizes="40px"
            />
          </button>
        ))}
      </div>

      {/* Progress bar */}
      {!isPaused && (
        <div className="absolute bottom-[56px] left-0 right-0 z-20 h-[2px] bg-white/10">
          <motion.div
            key={`progress-${active}`}
            className="h-full bg-emerald-400/60"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: interval / 1000, ease: "linear" }}
          />
        </div>
      )}

      {/* Paused indicator */}
      <AnimatePresence>
        {isPaused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-3 right-3 z-20 px-2 py-0.5 rounded text-[9px] font-mono-tech text-white/50 bg-black/40 border border-white/10 tracking-widest uppercase"
          >
            PAUSED
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
