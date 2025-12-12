import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SlideAnimation({
  className = "",
  children,
  isVisible,
  variant = "lr",
}) {
  const variants = getVariant(variant);
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={className}
          key="slide-animation"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ overflow: "hidden" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function getVariant(variant) {
  if (variant === "lr")
    return {
      initial: {
        x: "-100%", // Starts off-screen to the left
        opacity: 0,
        transition: { duration: 0.3, ease: "easeInOut" },
      },
      animate: {
        x: "0%", // Slides into its original position
        opacity: 1,
        transition: { duration: 0.3, ease: "easeInOut" },
      },
      exit: {
        x: "-100%", // Slides off-screen to the left
        opacity: 0,
        transition: { duration: 0.3, ease: "easeInOut" },
      },
    };
  else if (variant === "rl")
    return {
      initial: {
        x: "100%", // Starts off-screen to the right
        opacity: 0,
        transition: { duration: 0.3, ease: "easeInOut" },
      },
      animate: {
        x: "0%", // Slides into its original position
        opacity: 1,
        transition: { duration: 0.3, ease: "easeInOut" },
      },
      exit: {
        x: "100%", // Slides off-screen to the right
        opacity: 0,
        transition: { duration: 0.3, ease: "easeInOut" },
      },
    };
  else if (variant === "tb")
    return {
      initial: {
        y: "-100%", // Starts off-screen at the top
        opacity: 0,
        transition: { duration: 0.3, ease: "easeInOut" },
      },
      animate: {
        y: "0%", // Slides into its original position
        opacity: 1,
        transition: { duration: 0.3, ease: "easeInOut" },
      },
      exit: {
        y: "-100%", // Slides off-screen to the top
        opacity: 0,
        transition: { duration: 0.3, ease: "easeInOut" },
      },
    };
  else if (variant === "bt")
    return {
      initial: {
        y: "100%", // Starts off-screen at the bottom
        opacity: 0,
        transition: { duration: 0.3, ease: "easeInOut" },
      },
      animate: {
        y: "0%", // Slides into its original position
        opacity: 1,
        transition: { duration: 0.3, ease: "easeInOut" },
      },
      exit: {
        y: "100%", // Slides off-screen to the bottom
        opacity: 0,
        transition: { duration: 0.3, ease: "easeInOut" },
      },
    };
}
