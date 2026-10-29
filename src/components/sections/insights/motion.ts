import { Variants } from "framer-motion";

export const EASINGS = {
  smoothOut: [0.22, 1, 0.36, 1] as const,
  gentleEase: [0.25, 0.1, 0.25, 1] as const,
  gallerySpring: { stiffness: 200, damping: 26 },
  tiltSpring: { stiffness: 260, damping: 20 },
  cursorSpring: { stiffness: 350, damping: 28 },
  popSpring: { stiffness: 300, damping: 18 },
};

// Section Container Variants
export const insightsContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

// Header Eyebrow Chip Variant
export const eyebrowVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: -8 },
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

// Headline Word Reveal Variants (overflow hidden, y: 110% -> 0)
export const wordRevealVariants: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Card Entrance: Blur-fade Stagger
export const cardEntranceVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    filter: "blur(12px)",
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Image Clip-path Reveal: inset(0 0 100% 0 round 28px) -> inset(0 round 28px)
export const imageClipVariants: Variants = {
  hidden: {
    clipPath: "inset(0 0 100% 0 round 28px)",
  },
  visible: {
    clipPath: "inset(0 round 28px)",
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Excerpt & Read Pill Reveal
export const excerptRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.35,
      delay: 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 12,
    filter: "blur(4px)",
    transition: { duration: 0.2 },
  },
};
