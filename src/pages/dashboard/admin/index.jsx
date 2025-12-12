import React, { useState, useEffect } from "react";
// 1. Import Icons
import {
  FiUsers,
  FiCheckCircle,
  FiClock,
  FiCheck,
  FiX,
  FiCalendar,
} from "react-icons/fi";

import BarChart from "@components/charts/barchart";
import Card from "@components/containers/card";
import StatusCard from "@components/cards/status-card";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);

  // --- Mock Data Setup ---
  const [stats, setStats] = useState({
    totalEmployees: 0,
    present: 0,
    absent: 0,
    late: 0,
  });

  const [leaveRequests, setLeaveRequests] = useState([]);
  const [attendanceData, setAttendanceData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = () => {
      setStats({
        totalEmployees: 124,
        present: 112,
        absent: 8,
        late: 4,
      });

      // B. Pending Actions (Leave Requests)
      setLeaveRequests([
        { id: 1, name: "Sarah Connor", type: "Sick Leave", date: "Aug 24" },
        { id: 2, name: "John Smith", type: "Vacation", date: "Aug 25-28" },
        { id: 3, name: "Kyle Reese", type: "Emergency", date: "Aug 24" },
      ]);

      // C. Chart Data
      setAttendanceData({
        labels: Array.from({ length: 15 }, (_, i) => `Day ${i + 1}`),
        datasets: [
          {
            label: "Present",
            data: [
              110, 115, 112, 120, 122, 118, 124, 121, 119, 123, 120, 122, 118,
              124, 124,
            ],
            backgroundColor: "#10b981", // Emerald-500
            borderRadius: 4,
          },
          {
            label: "Late",
            data: [5, 2, 8, 1, 0, 4, 0, 2, 3, 1, 4, 2, 6, 0, 0],
            backgroundColor: "#f59e0b", // Amber-500
            borderRadius: 4,
          },
        ],
      });

      setLoading(false);
    };

    setTimeout(fetchData, 1500);
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-2">
        <StatusCard
          title="Total Employees"
          value={stats.totalEmployees}
          icon={FiUsers}
          iconColor="blue"
          loading={loading}
        />
        <StatusCard
          title="Present Today"
          value={stats.present}
          subtext="On time"
          icon={FiCheckCircle}
          iconColor="green"
          loading={loading}
        />
        <StatusCard
          title="Late Arrivals"
          value={stats.late}
          subtext="Need review"
          icon={FiClock}
          iconColor="yellow"
          loading={loading}
        />
        <StatusCard
          title="Next Payroll Run"
          value="In 5 Days"
          subtext="August 30th, 2024"
          icon={FiCalendar}
          iconColor="indigo"
          loading={loading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Card
          title="Attendance Trends"
          description="Last 30 days activity"
          className="h-full"
        >
          <div className="h-[300px] w-full">
            <BarChart chartData={attendanceData} loading={loading} />
          </div>
        </Card>

        <Card
          title="Pending Actions"
          description="Leave requests waiting for approval"
          className=""
        >
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-16 bg-slate-200 dark:bg-slate-700 animate-pulse rounded"
                ></div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {leaveRequests.map((req) => (
                <div
                  key={req.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                >
                  <div>
                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 text-sm">
                      {req.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {req.type} • {req.date}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="p-2 text-emerald-600 hover:bg-emerald-100 rounded transition"
                      title="Approve"
                    >
                      <FiCheck className="w-5 h-5" />
                    </button>
                    <button
                      className="p-2 text-rose-600 hover:bg-rose-100 rounded transition"
                      title="Reject"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}

              {leaveRequests.length === 0 && (
                <p className="text-slate-500 text-sm">No pending requests.</p>
              )}

              <button className="mt-auto w-full py-2 text-sm text-blue-600 dark:text-blue-400 font-medium hover:underline flex justify-center items-center gap-1">
                View All Requests
              </button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
