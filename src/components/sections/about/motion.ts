import { Variants } from "framer-motion";

export const EASINGS = {
  smoothOut: [0.22, 1, 0.36, 1] as const,
  gentleEase: [0.25, 0.1, 0.25, 1] as const,
  springBounce: { stiffness: 300, damping: 20 },
  softSpring: { stiffness: 90, damping: 16 },
  cardSpring: { stiffness: 220, damping: 18 },
};

// Section Parent Variants
export const aboutContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// Hero Portrait Reveal: smooth fade-up & scale
export const heroImageRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const heroInnerScaleVariants: Variants = {
  hidden: { scale: 1.25 },
  visible: {
    scale: 1,
    transition: {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Top-Right Floating Image Entrance
export const topRightImageVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 40,
    rotate: 6,
  },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      duration: 0.8,
      delay: 0.3,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Bottom-Right Floating Image Entrance
export const bottomRightImageVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    rotate: -6,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.8,
      delay: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Circular Image Pop-in
export const circularImageVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 18,
      delay: 0.55,
    },
  },
};

// Glass Badge Entrance
export const glassBadgeVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Headline Word Reveal (overflow hidden, y: 110% -> 0)
export const wordRevealVariants: Variants = {
  hidden: {
    y: "110%",
    opacity: 0,
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Copy Line Fade-Up with Blur
export const copyFadeVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
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

// Location Chips Spring Stagger
export const chipVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 18,
    },
  },
};

// Feature Tile Entrance
export const featureTileVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
    clipPath: "inset(20% 0 0 0 round 18px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0 0 0 round 18px)",
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
