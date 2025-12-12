import React, { useState, useEffect } from "react";

const TableLoadingSkeleton = ({ columnCount, rowCount }) => {
  const getRandomWidth = () => {
    const random = Math.random();
    if (random < 0.2) return "w-/3";
    if (random < 0.5) return "w-2/4";
    if (random < 0.8) return "w-3/4";
    return "w-full";
  };

  const [headerWidths, setHeaderWidths] = useState(
    Array.from({ length: columnCount }, getRandomWidth)
  );

  const [cellWidths, setCellWidths] = useState(
    Array.from({ length: rowCount }, () =>
      Array.from({ length: columnCount }, getRandomWidth)
    )
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHeaderWidths(Array.from({ length: columnCount }, getRandomWidth));
      setCellWidths(
        Array.from({ length: rowCount }, () =>
          Array.from({ length: columnCount }, getRandomWidth)
        )
      );
    }, 2000);

    return () => clearInterval(intervalId);
  }, [columnCount, rowCount]);

  return (
    <table className="w-full pb-2">
      <thead>
        <tr>
          {Array.from({ length: columnCount }).map((_, index) => (
            <th key={`header-${index}`} className="p-2 text-left">
              <div
                className={`bg-slate-200 animate-pulse h-7 ${headerWidths[index]} rounded-md transition-all ease-in-out duration-300`}
              ></div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rowCount }).map((_, rowIndex) => (
          <tr key={`row-${rowIndex}`}>
            {Array.from({ length: columnCount }).map((_, colIndex) => (
              <td key={`cell-${rowIndex}-${colIndex}`} className="p-1">
                <div
                  className={`bg-slate-200 animate-pulse h-6 ${cellWidths[rowIndex][colIndex]} rounded-md transition-all ease-in-out duration-300`}
                ></div>
              </td>
            ))}
          </tr>
        ))}
        <tr className="p-2 h-6 border-t"></tr>
      </tbody>
    </table>
  );
};

export default TableLoadingSkeleton;
