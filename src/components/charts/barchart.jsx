import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import BarChartLoadingSkeleton from "@components/loadings/barchart-loading-skeleton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ chartData, loading = false, vertical = false }) => {
  // 1. State to track dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 2. Effect to detect 'dark' class changes on the HTML tag (Tailwind standard)
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    };

    // Check immediately on mount
    checkDarkMode();

    // Watch for class changes on the <html> element
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // 3. Define Colors based on mode (Slate-300 for dark text, Slate-700 for dark grid)
  const textColor = isDarkMode ? "#cbd5e1" : "#4b5563"; // Light: Gray-600, Dark: Slate-300
  const gridColor = isDarkMode ? "#334155" : "#e5e7eb"; // Light: Gray-200, Dark: Slate-700

  const options = {
    indexAxis: vertical ? "y" : "x",
    responsive: true,
    maintainAspectRatio: false, // Recommended for better responsiveness
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: textColor, // <--- Adaptive Text Color
          font: {
            family: "Montserrat",
            size: 10,
          },
        },
      },
      tooltip: {
        // Optional: Customizing tooltip background for dark mode
        backgroundColor: isDarkMode ? "#1e293b" : "rgba(0,0,0,0.8)", // Slate-800
        titleColor: "#fff",
        bodyColor: "#fff",
        bodyFont: {
          family: "Montserrat",
          size: 10,
        },
        titleFont: {
          family: "Montserrat",
          size: 10,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColor, // <--- Adaptive Text Color
          font: {
            family: "Montserrat",
            size: 10,
          },
          minRotation: chartData?.labels?.length > 15 ? 90 : 0,
          autoSkip: false,
        },
        grid: {
          color: gridColor, // <--- Adaptive Grid Color
          borderColor: gridColor,
        },
      },
      y: {
        ticks: {
          color: textColor, // <--- Adaptive Text Color
          font: {
            family: "Montserrat",
            size: 10,
          },
          autoSkip: false,
        },
        grid: {
          color: gridColor, // <--- Adaptive Grid Color
          borderColor: gridColor,
        },
      },
    },
    font: {
      family: "Montserrat",
      size: 10,
    },
  };

  if (loading) return <BarChartLoadingSkeleton />;

  // Added container with height to ensure responsive prop works correctly
  return (
    <div className="w-full h-full min-h-[300px]">
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default BarChart;
