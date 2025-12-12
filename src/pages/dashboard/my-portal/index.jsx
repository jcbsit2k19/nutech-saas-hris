import React, { useState, useEffect } from "react";
// 1. Import Icons
import {
  FiClock,
  FiBriefcase,
  FiCalendar,
  FiBell,
  FiPlay,
  FiSquare,
} from "react-icons/fi";

// 2. Import your containers (Adjust paths as needed)
import Card from "@components/containers/card";
import StatusCard from "@components/cards/status-card";

export default function EmployeeDashboard() {
  const [loading, setLoading] = useState(true);

  // --- Mock Data ---
  const [stats, setStats] = useState({
    leaveBalance: 0,
    lateArrivals: 0,
    upcomingHolidays: 0,
  });

  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Simulate API Fetch
    const fetchData = () => {
      setStats({
        vleaveBalance: 8,
        sleaveBalance: 12, // Days remaining
        lateArrivals: 2, // Times late this month
        upcomingHolidays: 3, // Upcoming holidays
      });

      setAnnouncements([
        {
          id: 1,
          title: "Office Renovation Notice",
          date: "Aug 28, 2024",
          category: "News",
          content: "The 2nd-floor pantry will be closed for renovation.",
        },
        {
          id: 2,
          title: "Labor Day Holiday",
          date: "Sep 01, 2024",
          category: "Holiday",
          content: "Office will be closed. Enjoy your long weekend!",
        },
        {
          id: 3,
          title: "Q3 Town Hall",
          date: "Sep 15, 2024",
          category: "Event",
          content: "Join us for the quarterly review at 3 PM.",
        },
      ]);

      setLoading(false);
    };

    setTimeout(fetchData, 1500);
  }, []);

  return (
    <div>
      {/* Top Section: Clock Widget & Key Stats */}
      <div className="grid grid-cols-1 gap-2 mb-2">
        <div className="lg:col-span-2 h-full">
          <ClockWidget loading={loading} />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 h-full">
          <StatusCard
            title="Sick Leave Balance"
            value={`${stats.sleaveBalance} Days`}
            subtext="Available"
            icon={FiBriefcase}
            iconColor="blue"
            loading={loading}
          />
          <StatusCard
            title="Vacation Leave Balance"
            value={`${stats.vleaveBalance} Days`}
            subtext="Available"
            icon={FiBriefcase}
            iconColor="blue"
            loading={loading}
          />
          <StatusCard
            title="Late Arrivals"
            value={stats.lateArrivals}
            subtext="This Month"
            icon={FiClock}
            iconColor="yellow"
            loading={loading}
          />
        </div>
      </div>

      {/* Bottom Section: Announcements */}
      <div className="grid grid-cols-1 gap-2">
        <Card
          title="Announcements & Alerts"
          description="Latest updates from HR and Administration"
          className="min-h-[300px]"
        >
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-20 bg-slate-200 dark:bg-slate-700 animate-pulse rounded"
                ></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {announcements.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-sm transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-full ${
                        item.category === "Holiday"
                          ? "bg-green-100 text-green-700"
                          : item.category === "Event"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {item.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <FiCalendar className="w-3 h-3" /> {item.date}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

// --- Sub-Component: Clock Widget ---
function ClockWidget({ loading }) {
  const [time, setTime] = useState(new Date());
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [timer, setTimer] = useState(0); // Seconds elapsed

  // 1. Live Server Time Effect
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. Stopwatch Effect (Only runs when clocked in)
  useEffect(() => {
    let interval;
    if (isClockedIn) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else if (!isClockedIn && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isClockedIn, timer]);

  // Format seconds into HH:MM:SS
  const formatTimer = (totalSeconds) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleClockAction = () => {
    if (isClockedIn) {
      // Clock Out Logic
      setIsClockedIn(false);
      setTimer(0);
      alert("Clocked Out Successfully!");
    } else {
      // Clock In Logic
      setIsClockedIn(true);
    }
  };

  if (loading) {
    return (
      <Card className="h-full flex items-center justify-center">
        <div className="w-full h-full animate-pulse flex flex-col items-center justify-center gap-4">
          <div className="h-8 w-32 bg-slate-200 dark:bg-slate-700 rounded"></div>
          <div className="h-20 w-20 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col md:flex-row items-center justify-between gap-6 p-8">
      {/* Left: Time & Date Display */}
      <div className="text-center md:text-left">
        <h4 className="text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider text-sm mb-1">
          Current Time
        </h4>
        <div className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white font-mono tracking-tight">
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          <span className="text-lg text-slate-400 ml-1 font-sans font-normal">
            {time.toLocaleTimeString([], { second: "2-digit" }).slice(-2)}
          </span>
        </div>
        <p className="text-slate-500 dark:text-slate-400 mt-2 flex items-center justify-center md:justify-start gap-2">
          <FiCalendar />
          {time.toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Middle: Timer Status (Visible only when clocked in or relevant) */}
      <div className="text-center hidden md:block">
        <p className="text-sm text-slate-400 mb-1">Session Duration</p>
        <div
          className={`text-2xl font-mono font-bold ${
            isClockedIn ? "text-emerald-500" : "text-slate-300"
          }`}
        >
          {isClockedIn ? formatTimer(timer) : "--:--:--"}
        </div>
        <div className="text-xs text-slate-400 mt-1">
          Status:{" "}
          <span
            className={
              isClockedIn ? "text-green-500 font-bold" : "text-slate-500"
            }
          >
            {isClockedIn ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      {/* Right: The Big Button */}
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={handleClockAction}
          className={`
            w-32 h-32 rounded-full border-4 shadow-lg flex flex-col items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95
            ${
              isClockedIn
                ? "border-rose-100 bg-rose-500 text-white hover:bg-rose-600 shadow-rose-200"
                : "border-emerald-100 bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-200"
            }
          `}
        >
          {isClockedIn ? (
            <FiSquare className="w-8 h-8 mb-1" />
          ) : (
            <FiPlay className="w-8 h-8 mb-1 ml-1" />
          )}
          <span className="font-bold text-sm uppercase tracking-wider">
            {isClockedIn ? "Clock Out" : "Clock In"}
          </span>
        </button>
      </div>
    </Card>
  );
}
