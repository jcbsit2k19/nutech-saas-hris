import React, { useState } from "react";
import SlideAnimation from "@components/animations/slide-animation";

export default function Tooltip({ children, text, position = "top" }) {
  const [show, setShow] = useState(false);

  const getPositionClasses = () => {
    switch (position) {
      case "bottom":
        return {
          wrapper: "absolute top-full left-1/2 -translate-x-1/2 pt-1",
          animationVariant: "tb",
          // Arrow points up (Border Bottom Colored)
          arrow:
            "h-0 w-0 border-l-[6px] border-r-[6px] border-b-[6px] border-l-transparent border-r-transparent border-b-slate-800/90 dark:border-b-black",
          flexDirection: "flex-col-reverse",
        };
      case "left":
        return {
          wrapper: "absolute top-1/2 -translate-y-1/2 right-full pr-1",
          animationVariant: "rl",
          // Arrow points right (Border Left Colored)
          arrow:
            "h-0 w-0 border-t-[6px] border-b-[6px] border-l-[6px] border-t-transparent border-b-transparent border-l-slate-800/90 dark:border-l-black",
          flexDirection: "flex-row",
        };
      case "right":
        return {
          wrapper: "absolute top-1/2 -translate-y-1/2 left-full pl-1",
          animationVariant: "lr",
          // Arrow points left (Border Right Colored)
          arrow:
            "h-0 w-0 border-t-[6px] border-b-[6px] border-r-[6px] border-t-transparent border-b-transparent border-r-slate-800/90 dark:border-r-black",
          // FIXED: Changed to reverse so Arrow appears before Text
          flexDirection: "flex-row-reverse",
        };
      case "top":
      default:
        return {
          wrapper: "absolute bottom-full left-1/2 -translate-x-1/2 pb-1",
          animationVariant: "bt",
          // Arrow points down (Border Top Colored)
          arrow:
            "h-0 w-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-slate-800/90 dark:border-t-black",
          flexDirection: "flex-col",
        };
    }
  };

  const { wrapper, animationVariant, arrow, flexDirection } =
    getPositionClasses();

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <div className={`${wrapper} w-max pointer-events-none z-50`}>
        <SlideAnimation isVisible={show} variant={animationVariant}>
          <div className={`flex items-center ${flexDirection}`}>
            <span
              className="whitespace-nowrap rounded-md 
              bg-slate-800/90 text-white
              dark:bg-black dark:text-gray-100 dark:shadow-slate-800/50 
              p-2 text-xs leading-none shadow-lg transition-colors duration-300"
            >
              {text}
            </span>
            <div className={`${arrow} transition-colors duration-300`} />
          </div>
        </SlideAnimation>
      </div>
    </div>
  );
}
