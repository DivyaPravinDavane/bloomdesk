"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { MapPin, Shield, Activity, Users } from "lucide-react";
import { ImageCollage } from "./ImageCollage";
import { SplitHeadline } from "./SplitHeadline";
import { FeatureTile } from "./FeatureTile";
import { PhotoMarquee } from "./PhotoMarquee";
import { MagneticButton } from "./MagneticButton";
import { aboutContainerVariants, copyFadeVariants, chipVariants } from "./motion";

interface AboutSectionProps {
  onBookTour?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onBookTour }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll Progress Tracking for Divider Line & Parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 20,
  });

  // Vertical line draw-down between columns
  const dividerHeight = useTransform(smoothProgress, [0.15, 0.85], ["0%", "100%"]);

  const locationChips = [
    { name: "Borivali East & West", pin: true },
    { name: "Kandivali West", pin: true },
    { name: "Metro Line 7 Corridor", pin: true },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-20 lg:py-28 bg-[#F5F5F0] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Parent Orchestrated Container */}
        <motion.div
          variants={aboutContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Scroll-Linked Vertical Divider Line between Columns (Desktop only) */}
          {!shouldReduceMotion && (
            <div className="hidden lg:block absolute left-[48.5%] top-8 bottom-8 w-[2px] bg-slate-300/30 pointer-events-none z-0">
              <motion.div
                style={{ height: dividerHeight }}
                className="w-full bg-gradient-to-b from-[#0891B2] via-cyan-400 to-[#0891B2]/20 shadow-sm shadow-[#0891B2]/40 origin-top"
              />
            </div>
          )}

          {/* LEFT COLUMN: Layered Image Collage (50% / 6 cols) */}
          <div className="lg:col-span-6 relative order-1">
            <ImageCollage scrollYProgress={smoothProgress} />
          </div>

          {/* RIGHT COLUMN: Editorial Content, Tiles, Marquee, CTAs (50% / 6 cols) */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7 order-2">
            {/* Location Chips with MapPin */}
            <div className="flex flex-wrap items-center gap-2">
              {locationChips.map((chip, idx) => (
                <motion.span
                  key={idx}
                  variants={chipVariants}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-[#0891B2] border border-slate-200/80 shadow-2xs"
                >
                  <MapPin className="w-3 h-3 text-[#0891B2]" />
                  <span>{chip.name}</span>
                </motion.span>
              ))}
            </div>

            {/* Split Animated Headline */}
            <SplitHeadline scrollYProgress={smoothProgress} />

            {/* Shortened 2-Line Editorial Copy */}
            <div className="space-y-2">
              <motion.p
                variants={copyFadeVariants}
                className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed"
              >
                Premium coworking across Mumbai&apos;s western suburbs. Fiber internet, furnished desks, meeting rooms, and flexible plans for freelancers, startups, and growing teams.
              </motion.p>
              <motion.p
                variants={copyFadeVariants}
                className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed"
              >
                Easy access via Western Express Highway, Western Railway, and Metro Line 7.
              </motion.p>
            </div>

            {/* 3 Visual Feature Tiles with Photos & Count-Up */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
              <FeatureTile
                title="Enterprise Ready"
                tagOrNumber="100% DG"
                description="Dual fiber internet, biometric security, and dedicated power redundancy."
                icon={<Shield className="w-4 h-4" />}
                bgImage="/assets/gallery/gallery-1.jpg"
              />
              <FeatureTile
                title="Vibrant Community"
                tagOrNumber="100+ Entities"
                countTo={100}
                hasPlus={true}
                description="Ambitious founders, creators, and corporate teams networking daily."
                icon={<Activity className="w-4 h-4" />}
                bgImage="/assets/gallery/gallery-4.jpg"
              />
              <FeatureTile
                title="On-Site Support"
                tagOrNumber="Front Desk"
                description="Attentive hospitality, guest concierge, and daily sanitize maintenance."
                icon={<Users className="w-4 h-4" />}
                bgImage="/assets/gallery/gallery-8.jpg"
              />
            </div>

            {/* Photo Marquee Strip */}
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 block mb-2">
                Active Center Glimpses
              </span>
              <PhotoMarquee />
            </div>

            {/* Magnetic CTA Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <MagneticButton
                variant="solid"
                hasArrow={true}
                onClick={onBookTour}
                className="shadow-lg"
              >
                Schedule a Visit
              </MagneticButton>

              <MagneticButton
                variant="outline"
                href="#locations"
                hasArrow={false}
              >
                Browse Mumbai Centers
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
