import { Variants } from "framer-motion";

export const EASINGS = {
  smoothOut: [0.22, 1, 0.36, 1] as const,
  gentleEase: [0.25, 0.1, 0.25, 1] as const,
  springBounce: { stiffness: 300, damping: 20 },
  cardSpring: { stiffness: 220, damping: 24 },
  tiltSpring: { stiffness: 240, damping: 20 },
  tabSpring: { stiffness: 350, damping: 28 },
};

// Section Container Variants
export const sectionContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

// Header Chip Entrance
export const chipEntranceVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.6,
    y: 12,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      ...EASINGS.springBounce,
    },
  },
};

// Headline Word Reveal
export const wordRevealVariants: Variants = {
  hidden: {
    y: "110%",
    opacity: 0,
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.75,
      ease: EASINGS.smoothOut,
    },
  },
};

// Gradient Underline Draw
export const underlineDrawVariants: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.9,
      delay: 0.35,
      ease: EASINGS.smoothOut,
    },
  },
};

// Card Blur-Fade Entrance
export const cardEntranceVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
    filter: "blur(12px)",
  },
  visible: (index: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay: index * 0.1,
      ease: EASINGS.smoothOut,
    },
  }),
  exit: {
    opacity: 0,
    scale: 0.9,
    filter: "blur(8px)",
    transition: {
      duration: 0.35,
      ease: EASINGS.smoothOut,
    },
  },
};

// Photo Clip-Path Reveal
export const photoClipVariants: Variants = {
  hidden: {
    clipPath: "inset(0 0 100% 0 round 28px)",
  },
  visible: {
    clipPath: "inset(0 round 28px)",
    transition: {
      duration: 1.2,
      ease: EASINGS.smoothOut,
    },
  },
};

// Inner Image Scale Reveal
export const innerImageScaleVariants: Variants = {
  hidden: { scale: 1.3 },
  visible: {
    scale: 1,
    transition: {
      duration: 1.2,
      ease: EASINGS.smoothOut,
    },
  },
};

// Card Chips Pop-in
export const cardChipVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.7,
    y: -8,
  },
  visible: (delay: number = 0.4) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      ...EASINGS.springBounce,
      delay,
    },
  }),
};

// Live Dot Pulse Loop
export const liveDotVariants: Variants = {
  animate: {
    scale: [1, 1.6, 1],
    opacity: [1, 0, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
