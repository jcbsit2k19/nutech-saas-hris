import React from "react";

export default function StatusBadge({ status, noText = false }) {
  // Base classes that apply to all states
  const commonStyle = noText
    ? "rounded-full text-xs text-center font-medium min-w-2 h-2 shadow-md"
    : "py-1 rounded-full text-xs text-center font-medium max-w-16 min-w-14 text-center h-6 shadow-md";

  // Helper to determine specific color classes based on status
  const getStatusClasses = (currentStatus) => {
    switch (currentStatus.toLowerCase()) {
      case "active":
        return "bg-green-400 text-white dark:bg-green-800 dark:text-green-100 dark:border dark:border-green-600";
      case "inactive":
        return "bg-red-400 text-white dark:bg-red-900/80 dark:text-red-100 dark:border dark:border-red-700";
      case "pending":
        // For yellow/pending, white text is often hard to read on light mode,
        // so I used darker text for light mode and lighter text for dark mode.
        return "bg-yellow-300 text-yellow-800 dark:bg-yellow-700/50 dark:text-yellow-100 dark:border dark:border-yellow-600";
      default:
        // Fallback for unknown statuses
        return "bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const statusClass = getStatusClasses(status);
  const displayStatus =
    status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

  return (
    <div
      className={`${commonStyle} ${statusClass} transition-colors duration-300 flex items-center justify-center`}
    >
      {!noText && displayStatus}
    </div>
  );
}
