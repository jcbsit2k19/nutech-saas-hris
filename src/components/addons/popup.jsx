import { useScreenSize } from "@hooks/useScreenSizeHook";
import HeightAnimation from "@components/animations/height-animation";
import React, { useState, useRef, useEffect } from "react";

export default function Popup({ children, content }) {
  const [show, setShow] = useState(false);
  const popupRef = useRef(null);
  const screenSize = useScreenSize();

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShow(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);

  return (
    <div ref={popupRef} className="relative">
      <div className="cursor-pointer" onClick={() => setShow(!show)}>
        {children}
      </div>

      <HeightAnimation
        isVisible={show}
        className={`mt-2 z-50 shadow-md ${
          !["xs"].includes(screenSize) ? "right-0 absolute" : "right-1 fixed"
        } bg-white rounded-md overflow-hidden`}
      >
        {content}
      </HeightAnimation>
    </div>
  );
}
