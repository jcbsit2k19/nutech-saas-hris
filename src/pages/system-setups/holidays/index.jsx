import React, { useState, useEffect } from "react";
import { Table, TableRow, TableData } from "@components/tables/table";
import { GoCalendar, GoPlus, GoPencil, GoTrash, GoSync } from "react-icons/go";
import Button from "@components/buttons/button";
import IconButton from "@components/buttons/icon-button";
import SelectInput from "@components/selections/selectioninput";
import Card from "@components/containers/card";

// --- 1. Visual Helpers ---

const HolidayTypeBadge = ({ type }) => {
  const isMandatory = type === "Mandatory";
  return (
    <span
      className={`px-2 py-1 text-[10px] uppercase font-bold rounded border ${
        isMandatory
          ? "bg-purple-50 text-purple-700 border-purple-200"
          : "bg-amber-50 text-amber-700 border-amber-200"
      }`}
    >
      {type}
    </span>
  );
};

// --- 2. Main Component ---

export default function HolidaysPage() {
  const [loading, setLoading] = useState(true);
  const [holidays, setHolidays] = useState([]);
  const [displayHolidays, setDisplayHolidays] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Table Columns configuration
  const columns = [
    "Date",
    "Day",
    "Holiday Name",
    "Type",
    "Recurring",
    "Actions",
  ];

  // Mock API Call to fetch holidays
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: "HOL-001",
          date: `${selectedYear}-01-01`,
          name: "New Year's Day",
          type: "Mandatory",
          isRecurring: true,
        },
        {
          id: "HOL-002",
          date: `${selectedYear}-05-01`,
          name: "Labor Day",
          type: "Mandatory",
          isRecurring: true,
        },
        {
          id: "HOL-003",
          date: `${selectedYear}-11-24`,
          name: "Thanksgiving",
          type: "Mandatory",
          isRecurring: false,
        },
        {
          id: "HOL-004",
          date: `${selectedYear}-12-24`,
          name: "Christmas Eve",
          type: "Optional",
          isRecurring: true,
        },
        {
          id: "HOL-005",
          date: `${selectedYear}-12-25`,
          name: "Christmas Day",
          type: "Mandatory",
          isRecurring: true,
        },
      ];
      setHolidays(mockData);
      setLoading(false);
    }, 800);
  }, [selectedYear]);

  // Helper to format ISO date strings into readable text
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      full: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      dayName: date.toLocaleDateString("en-US", { weekday: "long" }),
      year: date.getFullYear(),
    };
  };

  // CRUD Actions
  const handleEdit = (item) => {
    console.log("Edit:", item.name);
  };

  const handleDelete = (id) => {
    if (window.confirm("Remove this holiday?")) {
      console.log("Delete ID:", id);
    }
  };

  // Options for the Year Select Input
  const yearOptions = [
    { label: "2022", value: 2022 },
    { label: "2023", value: 2023 },
    { label: "2024", value: 2024 },
    { label: "2025", value: 2025 },
  ];

  return (
    <Card className="p-2 space-y-2 min-h-screen">
      <div className="space-y-4 mb-2">
        <div className="">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Holidays
          </h1>
          <p className="text-sm text-slate-500">
            Manage company calendar and time-off rules.
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <SelectInput
            icon={GoCalendar}
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            options={yearOptions}
            placeholder="Select Year"
          />
          <Button icon={GoPlus} color="green">
            Add Holiday
          </Button>
        </div>
      </div>

      {/* --- Data Table Section --- */}
      <Table
        title={`Calendar: ${selectedYear}`}
        description="Public and company-specific holidays."
        columns={columns}
        data={holidays}
        setData={setDisplayHolidays}
        loading={loading}
      >
        {displayHolidays.map((holiday, index) => {
          const { full, dayName, year } = formatDate(holiday.date);

          return (
            <TableRow key={holiday.id} row={index}>
              {/* 1. Date */}
              <TableData>
                <div className="flex items-center gap-2">
                  <GoCalendar className="text-slate-400" />
                  <div>
                    <span className="font-bold text-slate-700 dark:text-slate-200">
                      {full}
                    </span>
                    <span className="text-xs text-slate-400 ml-1">{year}</span>
                  </div>
                </div>
              </TableData>

              {/* 2. Day of Week */}
              <TableData>
                <span
                  className={`text-sm ${
                    dayName === "Saturday" || dayName === "Sunday"
                      ? "text-rose-500 font-medium"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {dayName}
                </span>
              </TableData>

              {/* 3. Name */}
              <TableData>
                <span className="font-medium text-slate-700 dark:text-slate-200">
                  {holiday.name}
                </span>
              </TableData>

              {/* 4. Type */}
              <TableData>
                <HolidayTypeBadge type={holiday.type} />
              </TableData>

              {/* 5. Recurring */}
              <TableData>
                {holiday.isRecurring ? (
                  <div
                    className="flex items-center gap-1 text-xs text-indigo-600 bg-indigo-50 w-fit px-2 py-1 rounded-full border border-indigo-100"
                    title="Repeats every year on this date"
                  >
                    <GoSync /> Every Year
                  </div>
                ) : (
                  <span className="text-slate-300 text-xs">-</span>
                )}
              </TableData>

              {/* 6. Actions */}
              <TableData>
                <div className="flex items-center gap-2">
                  <IconButton
                    icon={GoPencil}
                    tooltip={"Edit"}
                    theme="blue"
                    onClick={() => handleEdit(holiday)}
                  />
                  <IconButton
                    icon={GoTrash}
                    tooltip={"Delete"}
                    theme="red"
                    onClick={() => handleDelete(holiday.id)}
                  />
                </div>
              </TableData>
            </TableRow>
          );
        })}
      </Table>
    </Card>
  );
}
