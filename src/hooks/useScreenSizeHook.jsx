import React, { useState, useEffect, useCallback } from "react";

const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

export const useScreenSize = () => {
  const getScreenSize = useCallback((width) => {
    if (width >= breakpoints["2xl"]) {
      return "2xl";
    } else if (width >= breakpoints.xl) {
      return "xl";
    } else if (width >= breakpoints.lg) {
      return "lg";
    } else if (width >= breakpoints.md) {
      return "md";
    } else if (width >= breakpoints.sm) {
      return "sm";
    } else {
      return "xs";
    }
  }, []);

  const [screenSize, setScreenSize] = useState(() =>
    getScreenSize(window.innerWidth)
  );

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [getScreenSize]);

  return screenSize;
};
