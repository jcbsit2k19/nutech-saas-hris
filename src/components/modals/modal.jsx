import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import ContentLoadingOverlay from "../loadings/content-loading-overlay";

export default function Modal({
  children,
  className,
  title,
  isOpen,
  onClose,
  loading = false,
}) {
  const modalVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const [scaleUp, setScaleUp] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={() => {
            setScaleUp(true);
            setTimeout(() => setScaleUp(false), 300);
          }}
          // Added dark:bg-black/60 for a dimmer backdrop in dark mode
          className="fixed p-4 inset-0 h-screen w-screen bg-black/10 dark:bg-black/60
          backdrop-blur-sm overflow-y-auto overflow-x-hidden flex justify-center
          z-50 transition-colors duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            // Added dark:bg-slate-800 and dark:border
            className={`my-auto max-w-4xl w-full bg-white dark:bg-slate-800 
            overflow-hidden rounded-md shadow-md flex flex-col transition-all ease-in-out duration-300 
            dark:border border-transparent dark:border-slate-700
            ${scaleUp ? "scale-105" : ""}`}
          >
            {/* Header: Added dark:bg-slate-900 to match your UserProfile */}
            <div className="h-12 flex items-center p-2 bg-[#4892cf] dark:bg-slate-900 text-sm text-white font-medium transition-colors duration-300">
              <div className="flex-1">{title}</div>
              {!loading && (
                <RiCloseLine
                  className="text-2xl hover:text-red-500 hover:scale-125 transition-all ease-in-out duration-300 cursor-pointer"
                  onClick={() => onClose && onClose()}
                />
              )}
            </div>

            {/* Content Body: Added default text color for dark mode */}
            <div
              className={`transition-all ease-in-out duration-300 relative text-slate-800 dark:text-slate-200 ${className}`}
            >
              {loading && <ContentLoadingOverlay />}
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
