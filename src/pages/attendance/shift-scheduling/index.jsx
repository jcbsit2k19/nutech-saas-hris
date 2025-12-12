import React, { useState, useEffect } from "react";
import { Table, TableRow, TableData } from "@components/tables/table"; // Your reusable component
import {
  GoChevronLeft,
  GoChevronRight,
  GoCalendar,
  GoPlus,
  GoDownload,
} from "react-icons/go";
import Button from "@components/buttons/button";
import Card from "@components/containers/card";

// --- 1. Configurations & Helpers ---

const SHIFT_TYPES = {
  M: {
    label: "Morning",
    time: "09:00 - 18:00",
    color: "bg-emerald-100 text-emerald-700 border-emerald-200",
    hours: 9,
  },
  E: {
    label: "Evening",
    time: "14:00 - 23:00",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    hours: 9,
  },
  N: {
    label: "Night",
    time: "22:00 - 07:00",
    color: "bg-purple-100 text-purple-700 border-purple-200",
    hours: 9,
  },
  O: {
    label: "Day Off",
    time: "-",
    color: "bg-slate-100 text-slate-400 border-slate-200",
    hours: 0,
  },
};

// Helper to get the 7 days of the currently selected week
const getWeekDays = (startDate) => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    days.push({
      fullDate: d.toISOString().split("T")[0], // 2023-10-24
      display: d.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
      }), // Mon 24
      dayName: d.toLocaleDateString("en-US", { weekday: "long" }),
    });
  }
  return days;
};

// --- 2. Main Component ---

export default function ShiftSchedulingPage() {
  const [loading, setLoading] = useState(false);

  // State: Start date of the current week view
  const [currentWeekStart, setCurrentWeekStart] = useState(
    new Date("2023-10-23")
  );

  // State: Roster Data
  const [rosterData, setRosterData] = useState([]);
  const [displayRoster, setDisplayRoster] = useState([]); // For table pagination

  // Generate the dynamic columns (Days) based on currentWeekStart
  const weekDays = getWeekDays(currentWeekStart);

  // Columns for the Table Component
  // [Employee Info, ...7 Days of Week, Total Hours]
  const columns = ["Employee", ...weekDays.map((d) => d.display), "Total Hrs"];

  // Mock API Call
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      // Structure: One object per employee, containing their schedule for the week
      const mockRoster = [
        {
          id: 1,
          employee: {
            name: "Alice Johnson",
            role: "Frontend Dev",
            avatar: "https://i.pravatar.cc/150?u=1",
          },
          schedule: {
            [weekDays[0].fullDate]: "M",
            [weekDays[1].fullDate]: "M",
            [weekDays[2].fullDate]: "M",
            [weekDays[3].fullDate]: "M",
            [weekDays[4].fullDate]: "M",
            [weekDays[5].fullDate]: "O", // Sat
            [weekDays[6].fullDate]: "O", // Sun
          },
        },
        {
          id: 2,
          employee: {
            name: "Mark Smith",
            role: "Support Lead",
            avatar: "https://i.pravatar.cc/150?u=2",
          },
          schedule: {
            [weekDays[0].fullDate]: "E",
            [weekDays[1].fullDate]: "E",
            [weekDays[2].fullDate]: "E",
            [weekDays[3].fullDate]: "E",
            [weekDays[4].fullDate]: "E",
            [weekDays[5].fullDate]: "M",
            [weekDays[6].fullDate]: "O",
          },
        },
        {
          id: 3,
          employee: {
            name: "Sarah Connor",
            role: "Security",
            avatar: "https://i.pravatar.cc/150?u=3",
          },
          schedule: {
            [weekDays[0].fullDate]: "N",
            [weekDays[1].fullDate]: "N",
            [weekDays[2].fullDate]: "N",
            [weekDays[3].fullDate]: "O",
            [weekDays[4].fullDate]: "N",
            [weekDays[5].fullDate]: "N",
            [weekDays[6].fullDate]: "N",
          },
        },
      ];
      setRosterData(mockRoster);
      setLoading(false);
    }, 600);
  }, [currentWeekStart]);

  // Handle Changing a Shift (Updates local state)
  const handleShiftChange = (employeeId, dateKey, newShiftCode) => {
    const updatedRoster = rosterData.map((row) => {
      if (row.id === employeeId) {
        return {
          ...row,
          schedule: { ...row.schedule, [dateKey]: newShiftCode },
        };
      }
      return row;
    });
    setRosterData(updatedRoster);
    // In a real app, you would also fire an API call here to save
  };

  // Helper to calculate total hours for the row
  const calculateTotalHours = (schedule) => {
    let total = 0;
    Object.values(schedule).forEach((code) => {
      total += SHIFT_TYPES[code]?.hours || 0;
    });
    return total;
  };

  // Date Navigation Handlers
  const changeWeek = (offset) => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(newDate.getDate() + offset * 7);
    setCurrentWeekStart(newDate);
  };

  return (
    <Card className="p-2 space-y-2 min-h-screen">
      <div className="space-y-4 mb-2">
        <div className="">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Shift Roster
          </h1>
          <p className="text-sm text-slate-500">
            Assign and monitor weekly work schedules.
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-md border border-slate-300 dark:border-slate-700 shadow-sm">
        {/* Date Navigator */}
        <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-700 p-2 rounded-lg border border-slate-200 dark:border-slate-600">
          <button
            onClick={() => changeWeek(-1)}
            className="p-1 hover:bg-white dark:hover:bg-slate-600 rounded shadow-sm text-slate-600 dark:text-slate-300 transition"
          >
            <GoChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-2 px-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
            <GoCalendar className="text-indigo-500" />
            <span>
              {weekDays[0].display} - {weekDays[6].display},{" "}
              {currentWeekStart.getFullYear()}
            </span>
          </div>

          <button
            onClick={() => changeWeek(1)}
            className="p-1 hover:bg-white dark:hover:bg-slate-600 rounded shadow-sm text-slate-600 dark:text-slate-300 transition"
          >
            <GoChevronRight size={20} />
          </button>
        </div>

        {/* Actions */}
        <div className="flex gap-2 w-full lg:w-auto">
          <Button icon={GoDownload} color="green">
            Download
          </Button>
          <Button icon={GoPlus} color={"yellow"}>
            Auto Assign
          </Button>
        </div>
      </div>

      {/* --- Matrix Table --- */}
      <Table
        title=""
        description=""
        columns={columns}
        data={rosterData}
        setData={setDisplayRoster}
        loading={loading}
      >
        {displayRoster.map((row, index) => (
          <TableRow key={row.id} row={index}>
            {/* 1. Employee Column (Fixed) */}
            <TableData className="min-w-[200px] border-r border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 sticky left-0 z-10">
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-semibold text-slate-700 dark:text-slate-200 text-sm">
                    {row.employee.name}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {row.employee.role}
                  </p>
                </div>
              </div>
            </TableData>

            {/* 2. Dynamic Day Columns */}
            {weekDays.map((day) => {
              const currentShiftCode = row.schedule[day.fullDate] || "O"; // Default to Off
              const shiftDetails = SHIFT_TYPES[currentShiftCode];

              return (
                <TableData
                  key={day.fullDate}
                  className="min-w-[100px] text-center"
                >
                  <div className="relative group">
                    {/* The Visual Badge */}
                    <div
                      className={`
                      text-xs font-semibold px-2 py-1.5 rounded border cursor-pointer transition-all
                      flex flex-col items-center gap-0.5
                      ${shiftDetails.color} hover:ring-2 ring-indigo-300 ring-offset-1
                    `}
                    >
                      <span>{shiftDetails.label}</span>
                      <span className="text-[9px] opacity-75 font-normal">
                        {shiftDetails.time}
                      </span>
                    </div>

                    {/* The "Invisible" Select for Interaction */}
                    {/* This overlays the badge, allowing native dropdown behavior without complex UI logic */}
                    <select
                      value={currentShiftCode}
                      onChange={(e) =>
                        handleShiftChange(row.id, day.fullDate, e.target.value)
                      }
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    >
                      {Object.keys(SHIFT_TYPES).map((code) => (
                        <option key={code} value={code}>
                          {SHIFT_TYPES[code].label} ({SHIFT_TYPES[code].time})
                        </option>
                      ))}
                    </select>
                  </div>
                </TableData>
              );
            })}

            {/* 3. Total Hours Column */}
            <TableData className="text-center font-mono font-bold text-slate-600 dark:text-slate-300 border-l border-slate-100 dark:border-slate-700">
              {calculateTotalHours(row.schedule)}h
            </TableData>
          </TableRow>
        ))}
      </Table>

      {/* Legend Footer */}
      <div className="flex flex-wrap gap-4 text-xs text-slate-500 pt-2 px-2">
        <span className="font-semibold">Legend:</span>
        {Object.values(SHIFT_TYPES).map((type) => (
          <div key={type.label} className="flex items-center gap-1">
            <span
              className={`w-3 h-3 rounded ${type.color.split(" ")[0]}`}
            ></span>
            {type.label}
          </div>
        ))}
      </div>
    </Card>
  );
}
