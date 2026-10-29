"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { MapPin, Users, ArrowUpRight, Maximize2 } from "lucide-react";
import { CenterLocation } from "./types";
import { SpotlightBorder } from "./SpotlightBorder";
import { TiltGlare } from "./TiltGlare";
import { CountUp } from "./CountUp";
import {
  cardEntranceVariants,
  photoClipVariants,
  innerImageScaleVariants,
  cardChipVariants,
  liveDotVariants,
  EASINGS,
} from "./motion";

interface LocationCardProps {
  center: CenterLocation;
  index: number;
  hoveredCenterId: string | null;
  onHoverChange: (id: string | null) => void;
  onBookTour?: (name: string) => void;
}

export const LocationCard: React.FC<LocationCardProps> = ({
  center,
  index,
  hoveredCenterId,
  onHoverChange,
  onBookTour,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // Mouse Coordinates for 3D Tilt, Parallax and Spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  // 3D Tilt Springs (±8deg, perspective 1000px)
  const tiltX = useSpring(useTransform(normY, [-0.5, 0.5], [8, -8]), EASINGS.tiltSpring);
  const tiltY = useSpring(useTransform(normX, [-0.5, 0.5], [-8, 8]), EASINGS.tiltSpring);

  // Photo Parallax (shifts opposite to mouse by ±10px)
  const imgShiftX = useTransform(normX, [-0.5, 0.5], [10, -10]);
  const imgShiftY = useTransform(normY, [-0.5, 0.5], [10, -10]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion || isTouchDevice || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouseX.set(x);
      mouseY.set(y);
      normX.set(x / rect.width - 0.5);
      normY.set(y / rect.height - 0.5);
    },
    [shouldReduceMotion, isTouchDevice, mouseX, mouseY, normX, normY]
  );

  const handleMouseEnter = useCallback(() => {
    if (isTouchDevice) return;
    setIsHovered(true);
    onHoverChange(center.id);
  }, [isTouchDevice, onHoverChange, center.id]);

  const handleMouseLeave = useCallback(() => {
    if (isTouchDevice) return;
    setIsHovered(false);
    normX.set(0);
    normY.set(0);
    onHoverChange(null);
  }, [isTouchDevice, normX, normY, onHoverChange]);

  // Sibling dimming
  const isDimmed = Boolean(hoveredCenterId && hoveredCenterId !== center.id);

  return (
    <motion.div
      layout
      variants={cardEntranceVariants}
      custom={index}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: true, margin: "-80px" }}
      className={`relative w-full aspect-[4/5] rounded-[28px] transition-[opacity,filter] duration-300 ${
        isDimmed ? "opacity-60 blur-[1px]" : "opacity-100 blur-0"
      }`}
      style={{ perspective: 1000 }}
    >
      <Link
        href={`/centers/${center.slug}`}
        onClick={(e) => {
          if (onBookTour) {
            e.preventDefault();
            onBookTour(center.name);
          }
        }}
        className="block w-full h-full rounded-[28px] outline-none focus-visible:ring-3 focus-visible:ring-[#0891B2] focus-visible:ring-offset-4 focus-visible:ring-offset-[#F5F5F0]"
      >
        <motion.article
          ref={cardRef}
          whileTap={!shouldReduceMotion ? { scale: 0.98 } : undefined}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: shouldReduceMotion || isTouchDevice ? 0 : tiltX,
            rotateY: shouldReduceMotion || isTouchDevice ? 0 : tiltY,
            transformStyle: "preserve-3d",
          }}
          className="relative w-full h-full rounded-[28px] overflow-hidden bg-slate-900 shadow-xl shadow-slate-950/15 cursor-pointer select-none group border border-slate-200/40"
        >
          {/* Photo Clip-Path Reveal + Scale Reveal */}
          <motion.div
            variants={photoClipVariants}
            className="absolute inset-0 w-full h-full rounded-[28px] overflow-hidden"
          >
            <motion.div
              variants={innerImageScaleVariants}
              style={{
                x: shouldReduceMotion || isTouchDevice ? 0 : imgShiftX,
                y: shouldReduceMotion || isTouchDevice ? 0 : imgShiftY,
                scale: isHovered ? 1.08 : 1,
              }}
              transition={{ duration: 0.7, ease: EASINGS.smoothOut }}
              className="relative w-full h-full"
            >
              <Image
                src={center.image}
                alt={center.name}
                fill
                priority={index < 3}
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDUiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjUiIGZpbGw9IiMwZjE3MmEiLz48L3N2Zz4="
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </motion.div>
          </motion.div>

          {/* Dark Gradient Overlay for optimal text readability */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent pointer-events-none transition-opacity duration-500 z-10 ${
              isHovered ? "opacity-95" : "opacity-85"
            }`}
          />

          {/* Magic Card Spotlight Border */}
          <SpotlightBorder
            mouseX={mouseX}
            mouseY={mouseY}
            isHovered={isHovered && !isTouchDevice}
          />

          {/* White Glare Layer on 3D Tilt */}
          <TiltGlare
            mouseX={mouseX}
            mouseY={mouseY}
            isHovered={isHovered && !isTouchDevice}
          />

          {/* TOP ROW: Glass Chips */}
          <div className="absolute top-5 left-5 right-5 z-25 flex items-center justify-between pointer-events-none">
            {/* Top-Left: Area Glass Chip */}
            <motion.div
              variants={cardChipVariants}
              custom={0.35}
              className="relative overflow-hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold shadow-md"
            >
              {!shouldReduceMotion && (
                <motion.span
                  initial={{ x: "-150%" }}
                  animate={isHovered ? { x: "150%" } : { x: "-150%" }}
                  transition={{ duration: 0.7, ease: EASINGS.smoothOut }}
                  className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"
                />
              )}
              <MapPin className="w-3.5 h-3.5 text-[#0891B2]" />
              <span className="relative z-10">{center.areaLabel}</span>
            </motion.div>

            {/* Top-Right: Spaces Glass Chip with Live Pulsing Dot */}
            <motion.div
              variants={cardChipVariants}
              custom={0.45}
              className="relative overflow-hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold shadow-md"
            >
              {!shouldReduceMotion && (
                <motion.span
                  initial={{ x: "-150%" }}
                  animate={isHovered ? { x: "150%" } : { x: "-150%" }}
                  transition={{ duration: 0.7, ease: EASINGS.smoothOut }}
                  className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"
                />
              )}
              <span className="relative flex h-2 w-2">
                <motion.span
                  variants={liveDotVariants}
                  animate="animate"
                  className="absolute inline-flex h-full w-full rounded-full bg-[#0891B2]"
                />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0891B2]" />
              </span>
              <Users className="w-3.5 h-3.5 text-slate-300" />
              <span className="relative z-10">{center.spaces}</span>
            </motion.div>
          </div>

          {/* BOTTOM CONTENT AREA (All on image, no white footer) */}
          <div className="absolute bottom-6 left-6 right-6 z-25 text-white flex flex-col justify-end">
            {/* Center Name */}
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-sm mb-1.5 leading-tight">
              {center.name}
            </h3>

            {/* Hidden until Hover: Short Tagline line & Sq. Ft. chip */}
            <motion.div
              initial={false}
              animate={
                isHovered || isTouchDevice
                  ? { opacity: 1, y: 0, filter: "blur(0px)", height: "auto" }
                  : { opacity: 0, y: 16, filter: "blur(6px)", height: 0 }
              }
              transition={{ duration: 0.35, ease: EASINGS.smoothOut, delay: 0.05 }}
              className="overflow-hidden flex items-center justify-between gap-2 mb-3.5"
            >
              <p className="text-xs sm:text-sm text-slate-200 font-medium line-clamp-1 drop-shadow-sm">
                {center.tagline}
              </p>
              <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-[10px] font-bold text-white tracking-wider">
                <Maximize2 className="w-2.5 h-2.5 text-[#FACC15]" />
                {center.sqft}
              </span>
            </motion.div>

            {/* Bottom Row: Price CountUp + Circular Teal Arrow Button */}
            <div className="flex items-center justify-between pt-2 border-t border-white/15">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-300">
                  Starting
                </span>
                <div className="text-lg sm:text-xl font-extrabold text-white flex items-baseline gap-1">
                  <span>From</span>
                  <CountUp value={center.price} />
                  <span className="text-xs font-medium text-slate-300">/mo</span>
                </div>
              </div>

              {/* Circular Teal Arrow-up-right Button */}
              <motion.div
                animate={{
                  rotate: isHovered ? 0 : 45,
                  backgroundColor: isHovered ? "#0891B2" : "rgba(8, 145, 178, 0.25)",
                  borderColor: isHovered ? "#0891B2" : "rgba(255, 255, 255, 0.4)",
                  scale: isHovered ? 1.08 : 1,
                }}
                transition={{ duration: 0.35, ease: EASINGS.smoothOut }}
                className="w-11 h-11 rounded-full flex items-center justify-center text-white border shadow-lg backdrop-blur-md shrink-0"
              >
                <motion.div
                  animate={
                    isHovered
                      ? {
                          x: [0, 2, 0],
                          y: [0, -2, 0],
                        }
                      : { x: 0, y: 0 }
                  }
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <ArrowUpRight className="w-5 h-5" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
};
