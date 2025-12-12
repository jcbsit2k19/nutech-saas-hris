import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeightAnimation({
  children,
  isVisible,
  className = "",
}) {
  const variants = {
    initial: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    animate: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={className}
          key="height-animation"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ overflow: "hidden w-full" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
