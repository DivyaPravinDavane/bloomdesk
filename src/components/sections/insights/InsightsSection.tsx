"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { ExpandingGallery } from "./ExpandingGallery";
import { MagneticLink } from "./MagneticLink";
import { BlogItem } from "./BlogCard";
import {
  insightsContainerVariants,
  eyebrowVariants,
  wordRevealVariants,
  EASINGS,
} from "./motion";

export const InsightsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll Tracking for Floating Orb & Parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
  });

  // Soft blurred teal orb drifting with scroll
  const orbX = useTransform(smoothProgress, [0, 1], [-40, 60]);
  const orbY = useTransform(smoothProgress, [0, 1], [-30, 40]);

  // Headline words for masked reveal
  const headlineWords = ["Fresh", "from", "the", "Blog"];

  const blogItems: BlogItem[] = [
    {
      id: "why-suburban-coworking-is-winning",
      title: "Why Suburban Coworking Is Winning",
      category: "Market Trends",
      date: "Oct 2026",
      readTime: 4,
      excerpt:
        "How decentralized suburban hubs slash commute times and attract elite local talent across Mumbai's western corridor.",
      image: "/assets/blog/news-1.jpg",
    },
    {
      id: "fintech-to-legal-who-thrives-here",
      title: "FinTech to Legal: Who Thrives Here?",
      category: "Community & Culture",
      date: "Sep 2026",
      readTime: 5,
      excerpt:
        "Cross-disciplinary synergy and serendipitous partnerships inside modern flexible workspace communities.",
      image: "/assets/blog/news-2.jpg",
    },
    {
      id: "metro-line-7-work-hubs-mapped",
      title: "Metro Line 7 Work Hubs, Mapped",
      category: "Location Guide",
      date: "Aug 2026",
      readTime: 6,
      excerpt:
        "A commuter guide to rapid transit office hubs along Western Express Highway and Western Railway lines.",
      image: "/assets/blog/news-3.jpg",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="insights"
      className="relative py-20 lg:py-28 bg-[#F5F5F0] overflow-hidden"
    >
      {/* Background Floating Blurred Teal Orb */}
      {!shouldReduceMotion && (
        <motion.div
          style={{ x: orbX, y: orbY }}
          className="absolute top-1/3 left-1/4 w-[420px] h-[420px] rounded-full bg-[#0891B2]/10 blur-[110px] pointer-events-none -z-0"
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Parent Orchestrated Container */}
        <motion.div
          variants={insightsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-10 sm:space-y-12"
        >
          {/* Section Header: Tiny & Clean (Eyebrow, Headline, Magnetic View All link) */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/70 pb-6">
            <div className="space-y-2">
              {/* Eyebrow Chip */}
              <motion.div variants={eyebrowVariants}>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest bg-[#0891B2]/10 text-[#0891B2] border border-[#0891B2]/20 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0891B2] animate-pulse" />
                  INSIGHTS
                </span>
              </motion.div>

              {/* Headline with Masked Word Reveal & Gradient Underline */}
              <div className="relative inline-block">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F172A] tracking-tight">
                  {headlineWords.map((word, idx) => (
                    <span key={idx} className="inline-block overflow-hidden mr-2.5 align-bottom">
                      <motion.span variants={wordRevealVariants} className="inline-block">
                        {word}
                      </motion.span>
                    </span>
                  ))}
                </h2>

                {/* Animated Teal Gradient Underline Drawing Left to Right */}
                {!shouldReduceMotion && (
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: 0.45,
                      ease: EASINGS.smoothOut,
                    }}
                    className="absolute -bottom-1 left-0 h-[3px] w-full bg-gradient-to-r from-[#0891B2] via-cyan-400 to-[#FACC15] origin-left rounded-full"
                  />
                )}
              </div>
            </div>

            {/* Right: Magnetic View All Link */}
            <div className="shrink-0 pt-2 sm:pt-0">
              <MagneticLink href="#insights">View all insights</MagneticLink>
            </div>
          </div>

          {/* 21st.dev Expanding Gallery */}
          <ExpandingGallery items={blogItems} />
        </motion.div>
      </div>
    </section>
  );
};

export default InsightsSection;
