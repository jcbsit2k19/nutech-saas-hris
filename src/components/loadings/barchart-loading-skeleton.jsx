import React, { useState, useEffect, useRef } from "react";

export default function BarChartLoadingSkeleton() {
  const [barHeights, setBarHeights] = useState(Array(10).fill(30)); // Initial lower mid-range
  const intervalRef = useRef(null);

  useEffect(() => {
    const updateHeights = () => {
      setBarHeights(
        (prevHeights) =>
          prevHeights.map(() => Math.floor(Math.random() * 140) + 20) // Random height between 20px and 140px
      );
    };

    intervalRef.current = setInterval(updateHeights, 2000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className={"flex animate-pulse"}>
      <div className="space-y-1 pb-8 p-1">
        {Array(10)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="h-4 w-6 bg-slate-200 rounded-md"></div>
          ))}
      </div>
      <div className="flex flex-col flex-1 gap-1 p-1">
        {/* Main Content with dynamic heights and CSS transition */}
        <div className="flex gap-2 flex-1 items-end">
          {barHeights.map((height, index) => (
            <div
              key={index}
              className="w-full bg-slate-200 rounded-md transition-all ease-in-out duration-300"
              style={{ height: `${height}px` }}
            />
          ))}
        </div>
        <div className="flex gap-2">
          {Array(10)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="w-full bg-slate-200 rounded-md"></div>
            ))}
        </div>
        <div className="flex justify-center gap-2">
          {Array(6)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="h-4 w-12 bg-slate-200 rounded-md"
              ></div>
            ))}
        </div>
      </div>
    </div>
  );
}
