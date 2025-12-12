import React, { useState, useEffect } from "react";
// Adjust these import paths to match your project structure
import { Table, TableRow, TableData } from "@components/tables/table";
import {
  GoDeviceDesktop,
  GoKey,
  GoPencil,
  GoDeviceCameraVideo,
} from "react-icons/go";
import IconButton from "@components/buttons/icon-button";
import Button from "@components/buttons/button";
import { FaPlus } from "react-icons/fa";
import Card from "@components/containers/card";
import { FiDownload } from "react-icons/fi";
import AttendanceBadge from "@components/badges/attendance-badge";

const MethodIcon = ({ method }) => {
  switch (method) {
    case "fingerprint":
      return (
        <div
          className="flex items-center gap-1 text-slate-500"
          title="Biometric: Fingerprint"
        >
          <GoKey /> <span>Bio</span>
        </div>
      );
    case "face_id":
      return (
        <div
          className="flex items-center gap-1 text-slate-500"
          title="Biometric: Face ID"
        >
          <GoDeviceCameraVideo /> <span>Face</span>
        </div>
      );
    case "web":
      return (
        <div
          className="flex items-center gap-1 text-blue-500"
          title="Web Portal"
        >
          <GoDeviceDesktop /> <span>Web</span>
        </div>
      );
    default:
      return <span className="text-slate-300">-</span>;
  }
};

// --- 2. Main Page Component ---

export default function DailyLogsPage() {
  // State for the full dataset fetched from API
  const [allLogs, setAllLogs] = useState([]);

  // State for the data currently being displayed (handled by your Table component)
  const [displayLogs, setDisplayLogs] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // External Filter States (Outside the table's internal text search)
  const [dateFilter, setDateFilter] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [deptFilter, setDeptFilter] = useState("All");

  // Columns Configuration
  const columns = [
    "Employee",
    "Date",
    "Shift",
    "Check In",
    "Check Out",
    "Duration",
    "Method",
    "Status",
    "Action",
  ];

  // Mock API Call
  useEffect(() => {
    setLoading(true);
    // Simulate fetching data
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          employeeName: "Alice Johnson",
          employeeId: "EMP001",
          avatar: "https://i.pravatar.cc/150?u=1",
          date: "2023-10-24",
          shift: "09:00 - 18:00",
          checkIn: "08:55 AM",
          checkOut: "06:05 PM",
          duration: "9h 10m",
          method: "fingerprint",
          status: "present",
          dept: "Engineering",
        },
        {
          id: 2,
          employeeName: "Mark Smith",
          employeeId: "EMP002",
          avatar: "https://i.pravatar.cc/150?u=2",
          date: "2023-10-24",
          shift: "09:00 - 18:00",
          checkIn: "09:15 AM",
          checkOut: "06:00 PM",
          duration: "8h 45m",
          method: "face_id",
          status: "late",
          dept: "Marketing",
        },
        {
          id: 3,
          employeeName: "Sarah Connor",
          employeeId: "EMP003",
          avatar: "https://i.pravatar.cc/150?u=3",
          date: "2023-10-24",
          shift: "09:00 - 18:00",
          checkIn: "--:--",
          checkOut: "--:--",
          duration: "0h 00m",
          method: "none",
          status: "absent",
          dept: "HR",
        },
        {
          id: 4,
          employeeName: "David Chen",
          employeeId: "EMP004",
          avatar: "https://i.pravatar.cc/150?u=4",
          date: "2023-10-24",
          shift: "09:00 - 18:00",
          checkIn: "08:50 AM",
          checkOut: "--:--",
          duration: "Running",
          method: "web",
          status: "mismatch",
          dept: "Engineering",
        },
      ];
      setAllLogs(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  // Handle Edit Action
  const handleEdit = (logId) => {
    console.log("Edit log:", logId);
    // Open modal logic here
  };

  return (
    <Card className="p-2 space-y-2 min-h-screen">
      <div className="space-y-4 mb-2">
        <div className="">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Attendance Logs
          </h1>
          <p className="text-sm text-slate-500">
            Monitor daily check-ins, check-outs, and biometric data.
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <Button icon={FiDownload} color="green">
            Download
          </Button>
          <Button icon={FaPlus} color="blue">
            Manual Entry
          </Button>
        </div>
      </div>
      <Table
        title=""
        description=""
        columns={columns}
        data={allLogs}
        setData={setDisplayLogs}
        loading={loading}
      >
        {displayLogs.map((log, index) => (
          <TableRow key={log.id} row={index}>
            {/* 1. Employee Info */}
            <TableData>
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-medium text-slate-700 dark:text-slate-200">
                    {log.employeeName}
                  </p>
                  <p className="text-[10px] text-slate-400 uppercase">
                    {log.employeeId}
                  </p>
                </div>
              </div>
            </TableData>

            {/* 2. Date */}
            <TableData>{log.date}</TableData>

            {/* 3. Shift */}
            <TableData>{log.shift}</TableData>

            {/* 4. Check In */}
            <TableData>
              <span
                className={
                  log.status === "late" ? "text-red-500 font-medium" : ""
                }
              >
                {log.checkIn}
              </span>
            </TableData>

            {/* 5. Check Out */}
            <TableData>{log.checkOut}</TableData>

            {/* 6. Duration */}
            <TableData>{log.duration}</TableData>

            {/* 7. Method */}
            <TableData>
              <MethodIcon method={log.method} />
            </TableData>

            {/* 8. Status */}
            <TableData>
              <AttendanceBadge status={log.status} />
            </TableData>

            {/* 9. Action */}
            <TableData className={"flex gap-2 justify-start"}>
              <IconButton icon={GoPencil} tooltip={"Edit"} theme="blue" />
            </TableData>
          </TableRow>
        ))}
      </Table>
    </Card>
  );
}
