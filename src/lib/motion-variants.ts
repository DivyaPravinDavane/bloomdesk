import { Variants } from "framer-motion";

export const fadeIn = (direction: "up" | "down" | "left" | "right" = "up", delay: number = 0): Variants => ({
  hidden: {
    opacity: 0,
    y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
    x: direction === "left" ? 30 : direction === "right" ? -30 : 0,
  },
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 120,
      duration: 0.6,
      delay,
    },
  },
});

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 24,
      stiffness: 140,
      duration: 0.5,
    },
  },
};

export const cardHover = {
  rest: { y: 0, scale: 1, transition: { duration: 0.25, ease: "easeOut" } },
  hover: { y: -6, scale: 1.01, transition: { duration: 0.25, ease: "easeOut" } },
};

export const imageZoom = {
  rest: { scale: 1, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } },
  hover: { scale: 1.06, transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } },
};
