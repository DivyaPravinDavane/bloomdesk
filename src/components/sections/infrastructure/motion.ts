import { Variants, Transition } from "framer-motion";

// Reusable Easing Curves & Springs
export const EASINGS = {
  smoothOut: [0.22, 1, 0.36, 1] as const,
  gentleEase: [0.25, 0.1, 0.25, 1] as const,
  bounceSpring: { stiffness: 300, damping: 20 },
  softSpring: { stiffness: 90, damping: 16 },
  hotspotSpring: { stiffness: 260, damping: 18 },
};

// Section Container Orchestration
export const sectionContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Left Image Card Clip-Path Reveal
export const imageCardVariants: Variants = {
  hidden: {
    clipPath: "inset(0 100% 0 0 round 28px)",
    opacity: 0,
  },
  visible: {
    clipPath: "inset(0 0% 0 0 round 28px)",
    opacity: 1,
    transition: {
      duration: 1.0,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Inner Image Scale Transition
export const innerImageVariants: Variants = {
  hidden: { scale: 1.2 },
  visible: {
    scale: 1,
    transition: {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Hero Stat Card Entrance
export const statCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 16,
    },
  },
};

// Checklist Item Variants
export const checklistItemVariants: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// SVG Path Draw for Checklist
export const checkPathVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

// Amenity Cards Entrance (Cascading Fade-Up with Blur)
export const amenityCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Facility Standard Glass Panel Entrance
export const facilityPanelVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
