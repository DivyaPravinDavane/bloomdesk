import { Variants } from "framer-motion";

export const EASINGS = {
  smoothOut: [0.22, 1, 0.36, 1] as const,
  gentleEase: [0.25, 0.1, 0.25, 1] as const,
  springBounce: { stiffness: 300, damping: 20 },
  softSpring: { stiffness: 120, damping: 18 },
  cardSpring: { stiffness: 220, damping: 24 },
  popSpring: { stiffness: 380, damping: 22 },
};

// Parent load timeline variants
export const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

// Location Chip Variants
export const locationChipVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

// Sparkle Spin
export const sparkleSpinVariants: Variants = {
  hidden: { rotate: 0 },
  visible: {
    rotate: 360,
    transition: {
      duration: 1.2,
      ease: EASINGS.smoothOut,
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

// Subtitle blur-fade
export const subtitleVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: EASINGS.smoothOut,
    },
  },
};

// CTA Button Group Entrance
export const ctaGroupVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const ctaButtonVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 12,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      ...EASINGS.popSpring,
    },
  },
};

// Trust Row Items
export const trustRowVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const trustItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASINGS.smoothOut,
    },
  },
};

// Main photo clip-path reveal
export const heroMainClipVariants: Variants = {
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

// Inner photo scale reveal
export const heroInnerScaleVariants: Variants = {
  hidden: { scale: 1.3 },
  visible: {
    scale: 1,
    transition: {
      duration: 1.2,
      ease: EASINGS.smoothOut,
    },
  },
};

// Mini photos fly-in variants
export const miniPhotoTopLeftVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -60,
    y: -30,
    rotate: -8,
    scale: 0.85,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      delay: 0.45,
    },
  },
};

export const miniPhotoBottomRightVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 60,
    y: 30,
    rotate: 8,
    scale: 0.85,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      delay: 0.55,
    },
  },
};

// Floating Chip Entrance
export const floatingChipVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: (delay: number = 0.65) => ({
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      ...EASINGS.popSpring,
      delay,
    },
  }),
};

// Bottom Glass Card Slide Up
export const bottomGlassCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      delay: 0.75,
      ease: EASINGS.smoothOut,
    },
  },
};
