import { Variants } from "framer-motion";

export const EASINGS = {
  smoothOut: [0.22, 1, 0.36, 1] as const,
  springBounce: { stiffness: 300, damping: 20 },
  cardSpring: { stiffness: 220, damping: 24 },
  tiltSpring: { stiffness: 240, damping: 20 },
  popSpring: { stiffness: 400, damping: 18 },
};

// Section container orchestration
export const sectionContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

// Pill Chip Entrance
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
      stiffness: 300,
      damping: 20,
    },
  },
};

// Dot pulse animation
export const dotPulseVariants: Variants = {
  animate: {
    scale: [1, 1.8, 1],
    opacity: [1, 0, 1],
    transition: {
      duration: 1.8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Word reveal variants (for SplitHeadline)
export const wordRevealVariants: Variants = {
  hidden: {
    y: "110%",
    opacity: 0,
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: EASINGS.smoothOut,
    },
  },
};

// Marquee row entrance variants (opacity 0 -> 1, y: 30 -> 0, 0.8s, no blur)
export const marqueeRowEntranceVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: EASINGS.smoothOut,
    },
  },
};

// Individual card entrance stagger
export const cardEntranceVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: (index: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: index * 0.04,
      type: "spring",
      ...EASINGS.cardSpring,
    },
  }),
};
