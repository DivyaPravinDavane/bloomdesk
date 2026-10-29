"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import { CountUp } from "../infrastructure/CountUp";
import { cardEntranceVariants, imageClipVariants, excerptRevealVariants, EASINGS } from "./motion";

export interface BlogItem {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: number; // in minutes
  excerpt: string;
  image: string;
}

interface BlogCardProps {
  item: BlogItem;
  isExpanded: boolean;
  onHover: () => void;
  onClick: () => void;
  scrollYOffset?: number;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  item,
  isExpanded,
  onHover,
  onClick,
  scrollYOffset = 0,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMouseInside, setIsMouseInside] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Mouse Coordinates for 3D Tilt, Glare, Spotlight, and Cursor Label
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Normalized for Tilt (-0.5 to 0.5)
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  // 3D Tilt springs
  const tiltSpringX = useSpring(normX, { stiffness: 240, damping: 20 });
  const tiltSpringY = useSpring(normY, { stiffness: 240, damping: 20 });

  const rotateX = useTransform(tiltSpringY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(tiltSpringX, [-0.5, 0.5], [-8, 8]);

  // Image parallax (shifts opposite to mouse by ±10px)
  const imgShiftX = useTransform(tiltSpringX, [-0.5, 0.5], [10, -10]);
  const imgShiftY = useTransform(tiltSpringY, [-0.5, 0.5], [10, -10]);

  // Spotlight radial gradient mask on surface
  const spotlightBg = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, rgba(8, 145, 178, 0.25), transparent 80%)`;
  const glareBg = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.22), transparent 75%)`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      mouseX.set(x);
      mouseY.set(y);
      normX.set(x / rect.width - 0.5);
      normY.set(y / rect.height - 0.5);
    },
    [shouldReduceMotion, mouseX, mouseY, normX, normY]
  );

  const handleMouseEnter = useCallback(() => {
    setIsMouseInside(true);
    onHover();
  }, [onHover]);

  const handleMouseLeave = useCallback(() => {
    setIsMouseInside(false);
    normX.set(0);
    normY.set(0);
  }, [normX, normY]);

  return (
    <motion.article
      ref={cardRef}
      variants={cardEntranceVariants}
      layout
      transition={{
        layout: { type: "spring", ...EASINGS.gallerySpring },
      }}
      style={{
        flex: isExpanded ? 2.2 : 1,
        perspective: 1000,
        y: shouldReduceMotion ? 0 : scrollYOffset,
      }}
      whileTap={!shouldReduceMotion ? { scale: 0.98 } : undefined}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Read article: ${item.title}`}
      className={`relative h-[480px] sm:h-[520px] rounded-[28px] overflow-hidden select-none outline-none focus-visible:ring-3 focus-visible:ring-[#0891B2] focus-visible:ring-offset-4 group transition-[flex,filter] duration-500 cursor-pointer ${
        isExpanded
          ? "brightness-100 saturate-110 shadow-2xl shadow-slate-950/25"
          : "brightness-75 saturate-85 shadow-lg shadow-slate-950/10 hover:brightness-95 hover:saturate-100"
      }`}
    >
      {/* 3D Tilt & Parallax Wrapper */}
      <motion.div
        variants={imageClipVariants}
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full rounded-[28px] overflow-hidden bg-slate-950"
      >
        {/* Full-bleed Photo with Zoom & Parallax */}
        <motion.div
          style={{
            x: shouldReduceMotion ? 0 : imgShiftX,
            y: shouldReduceMotion ? 0 : imgShiftY,
            scale: isExpanded ? 1.08 : 1,
          }}
          transition={{ duration: 0.7, ease: EASINGS.smoothOut }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 600px"
            priority={isExpanded}
          />
        </motion.div>

        {/* Themed Gradient Overlays for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/45 to-transparent z-10 pointer-events-none" />

        {/* 21st.dev Spotlight Border Effect */}
        {!shouldReduceMotion && isMouseInside && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-15 transition-opacity duration-300"
            style={{ background: spotlightBg }}
          />
        )}

        {/* Moving Glare Layer */}
        {!shouldReduceMotion && isMouseInside && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-15 mix-blend-overlay transition-opacity duration-300"
            style={{ background: glareBg }}
          />
        )}

        {/* Top Header Bar: Glass Chip & Circle Arrow Button */}
        <div className="absolute top-5 left-5 right-5 z-20 flex items-center justify-between pointer-events-none">
          {/* Top-Left Category Glass Chip with Shine Sweep on Hover */}
          <div className="relative overflow-hidden rounded-full px-3.5 py-1.5 bg-white/15 backdrop-blur-md border border-white/30 text-white shadow-lg text-[11px] font-extrabold uppercase tracking-widest group-hover:border-white/50 transition-colors">
            {!shouldReduceMotion && (
              <motion.span
                initial={{ x: "-150%" }}
                animate={isMouseInside ? { x: "150%" } : { x: "-150%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none"
              />
            )}
            <span className="relative z-10">{item.category}</span>
          </div>

          {/* Top-Right Circular Glass Arrow Button */}
          <motion.div
            animate={{
              rotate: isExpanded ? 0 : 45,
              backgroundColor: isExpanded ? "#0891B2" : "rgba(255, 255, 255, 0.2)",
              borderColor: isExpanded ? "#0891B2" : "rgba(255, 255, 255, 0.35)",
            }}
            transition={{ duration: 0.35, ease: EASINGS.smoothOut }}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white border shadow-lg backdrop-blur-md"
          >
            <ArrowUpRight className="w-4 h-4" />
          </motion.div>
        </div>

        {/* Bottom Content Area: ALL on top of the image */}
        <div className="absolute bottom-6 left-6 right-6 z-20 text-white flex flex-col justify-end">
          {/* Meta Row with Calendar & Clock Icons */}
          <div className="flex items-center gap-3.5 text-xs text-slate-300 font-semibold mb-2.5">
            <span className="flex items-center gap-1.5">
              <motion.span
                animate={isExpanded && !shouldReduceMotion ? { rotate: [0, -10, 10, 0] } : undefined}
                transition={{ duration: 0.5 }}
                className="text-[#FACC15]"
              >
                <Calendar className="w-3.5 h-3.5 text-[#FACC15]" />
              </motion.span>
              <span>{item.date}</span>
            </span>

            <span>•</span>

            <span className="flex items-center gap-1.5">
              <motion.span
                animate={isExpanded && !shouldReduceMotion ? { rotate: [0, 10, -10, 0] } : undefined}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-cyan-400"
              >
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
              </motion.span>
              <CountUp to={item.readTime} duration={1.2} />
              <span>min</span>
            </span>
          </div>

          {/* Short Title with Spring Sizing */}
          <motion.h3
            layout="position"
            className={`font-black text-white tracking-tight leading-tight transition-all duration-300 ${
              isExpanded
                ? "text-2xl sm:text-3xl max-w-lg mb-2 text-[#e8f7fa]"
                : "text-lg sm:text-xl truncate"
            }`}
          >
            {item.title}
          </motion.h3>

          {/* Excerpt & Read Pill - Revealed on Expanded Card */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                variants={excerptRevealVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-3 pt-1"
              >
                <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed font-medium line-clamp-2 max-w-md">
                  {item.excerpt}
                </p>

                <div className="pt-1 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0891B2] hover:bg-[#065F78] text-white text-xs font-bold tracking-wide transition-colors shadow-md shadow-[#0891B2]/30">
                    <span>Read Story</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.article>
  );
};
