import React, { useState, useEffect } from "react";

const CardLoadingSkeleton = ({ columnCount, rowCount }) => {
  const getRandomWidth = () => {
    const random = Math.random();
    if (random < 0.3) return "w-1/4";
    if (random < 0.6) return "w-1/3";
    if (random < 0.8) return "w-1/2";
    return "w-full";
  };

  const [widths, setWidths] = useState(
    Array.from({ length: rowCount }, () =>
      Array.from({ length: columnCount }, getRandomWidth)
    )
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setWidths(
        Array.from({ length: rowCount }, () =>
          Array.from({ length: columnCount }, getRandomWidth)
        )
      );
    }, 2000);

    return () => clearInterval(intervalId);
  }, [columnCount, rowCount]);

  return (
    <div className="space-y-4">
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <div
          key={`card-${rowIndex}`}
          className="border rounded-md p-2 space-y-2"
        >
          {Array.from({ length: columnCount }).map((_, colIndex) => (
            <div
              key={`card-item-${rowIndex}-${colIndex}`}
              className="flex items-center space-x-2"
            >
              <div className="bg-slate-200 animate-pulse h-4 w-1/4 rounded-md transition-all ease-in-out duration-500 delay-300"></div>
              <div
                className={`bg-slate-200 animate-pulse h-4 ${widths[rowIndex][colIndex]} rounded-md  transition-all ease-in-out duration-500 delay-300`}
              ></div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CardLoadingSkeleton;
