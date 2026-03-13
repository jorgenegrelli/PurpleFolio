import { Variants } from "framer-motion";

/** Fade in with upward slide. Use on section children with stagger. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/** Container variant — staggers children by 0.1s */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/** Scale up on hover for cards */
export const cardHover = {
  scale: 1.02,
  borderColor: "rgba(147, 51, 234, 0.4)",
  boxShadow: "0 0 20px rgba(147, 51, 234, 0.15)",
  transition: { duration: 0.2 },
};

/** Spring config for parallax */
export const parallaxSpring = {
  stiffness: 100,
  damping: 30,
};
