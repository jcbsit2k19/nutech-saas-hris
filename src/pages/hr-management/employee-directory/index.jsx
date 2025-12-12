import React, { useState, useEffect } from "react";
// 1. Import Icons
import { FiFilter, FiMoreVertical, FiMail, FiPhone } from "react-icons/fi";

// 2. Import your Table components (adjust path as needed)
import { Table, TableRow, TableData } from "@components/tables/table"; // Assuming the file name is Table.js
import Card from "@components/containers/card";
import IconButton from "@components/buttons/icon-button";
import Button from "@components/buttons/button";
import { FaPlus } from "react-icons/fa";
import { GoDownload } from "react-icons/go";

// --- Mock Data ---
const MOCK_EMPLOYEES = [
  {
    id: 1,
    name: "Sarah Connor",
    role: "Product Manager",
    dept: "Product",
    status: "Active",
    email: "sarah@company.com",
    phone: "+1 234 567 890",
    avatar: "https://i.pravatar.cc/150?u=1",
  },
  {
    id: 2,
    name: "John Smith",
    role: "Frontend Dev",
    dept: "Engineering",
    status: "Active",
    email: "john@company.com",
    phone: "+1 234 567 891",
    avatar: "https://i.pravatar.cc/150?u=2",
  },
  {
    id: 3,
    name: "Kyle Reese",
    role: "Security Officer",
    dept: "Operations",
    status: "On Leave",
    email: "kyle@company.com",
    phone: "+1 234 567 892",
    avatar: "https://i.pravatar.cc/150?u=3",
  },
  {
    id: 4,
    name: "Ellen Ripley",
    role: "QA Engineer",
    dept: "Engineering",
    status: "Active",
    email: "ellen@company.com",
    phone: "+1 234 567 893",
    avatar: "https://i.pravatar.cc/150?u=4",
  },
  {
    id: 5,
    name: "James Holden",
    role: "Team Lead",
    dept: "Management",
    status: "Inactive",
    email: "james@company.com",
    phone: "+1 234 567 894",
    avatar: "https://i.pravatar.cc/150?u=5",
  },
  {
    id: 6,
    name: "Naomi Nagata",
    role: "Backend Dev",
    dept: "Engineering",
    status: "Active",
    email: "naomi@company.com",
    phone: "+1 234 567 895",
    avatar: "https://i.pravatar.cc/150?u=6",
  },
  {
    id: 7,
    name: "Amos Burton",
    role: "Mechanic",
    dept: "Operations",
    status: "Active",
    email: "amos@company.com",
    phone: "+1 234 567 896",
    avatar: "https://i.pravatar.cc/150?u=7",
  },
  {
    id: 8,
    name: "Alex Kamal",
    role: "Pilot",
    dept: "Operations",
    status: "Active",
    email: "alex@company.com",
    phone: "+1 234 567 897",
    avatar: "https://i.pravatar.cc/150?u=8",
  },
  {
    id: 9,
    name: "Camina Drummer",
    role: "Director",
    dept: "Management",
    status: "Active",
    email: "camina@company.com",
    phone: "+1 234 567 898",
    avatar: "https://i.pravatar.cc/150?u=9",
  },
  {
    id: 10,
    name: "Josephus Miller",
    role: "Investigator",
    dept: "Security",
    status: "Inactive",
    email: "miller@company.com",
    phone: "+1 234 567 899",
    avatar: "https://i.pravatar.cc/150?u=10",
  },
  {
    id: 11,
    name: "Chrisjen Avasarala",
    role: "Executive",
    dept: "Management",
    status: "Active",
    email: "chrisjen@company.com",
    phone: "+1 234 567 900",
    avatar: "https://i.pravatar.cc/150?u=11",
  },
  {
    id: 12,
    name: "Bobbie Draper",
    role: "Security Consultant",
    dept: "Security",
    status: "On Leave",
    email: "bobbie@company.com",
    phone: "+1 234 567 901",
    avatar: "https://i.pravatar.cc/150?u=12",
  },
];

export default function EmployeeDirectory() {
  const [loading, setLoading] = useState(true);

  // 1. filteredData: The data after Dept/Status filters are applied
  const [filteredData, setFilteredData] = useState([]);

  // 2. viewData: The data the Table component is currently displaying (it handles pagination slicing)
  const [viewData, setViewData] = useState([]);

  // External Filters
  const [deptFilter, setDeptFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const columns = [
    "Employee",
    "Role",
    "Department",
    "Status",
    "Contact",
    "Actions",
  ];

  // Initial Data Fetch Simulation
  useEffect(() => {
    setTimeout(() => {
      setFilteredData(MOCK_EMPLOYEES);
      setLoading(false);
    }, 1000);
  }, []);

  // Handle External Filters (Dept & Status)
  useEffect(() => {
    let result = MOCK_EMPLOYEES;

    if (deptFilter !== "All") {
      result = result.filter((emp) => emp.dept === deptFilter);
    }
    if (statusFilter !== "All") {
      result = result.filter((emp) => emp.status === statusFilter);
    }

    setFilteredData(result);
  }, [deptFilter, statusFilter]);

  // Helper for Status Badge Color
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "On Leave":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "Inactive":
        return "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-400";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const departments = ["All", ...new Set(MOCK_EMPLOYEES.map((e) => e.dept))];

  return (
    <Card className="p-2 space-y-2 min-h-screen">
      <div className="space-y-4">
        <div className="">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Employee Directory
          </h1>
          <p className="text-sm text-slate-500">
            Manage and view all staff members
          </p>
        </div>
        <div className="flex justify-end">
          <Button icon={GoDownload} color={"green"}>
            Download Batch (Zip)
          </Button>
        </div>
      </div>
      <Table
        title=""
        description=""
        columns={columns}
        data={filteredData} // We pass the full (filtered) list here
        setData={setViewData} // The Table component uses this to update 'viewData' based on pagination
        loading={loading}
      >
        {/* Render Table Rows based on viewData (processed by Table component) */}
        {viewData.map((emp, index) => (
          <TableRow key={emp.id} row={index}>
            {/* 1. Name & Avatar */}
            <TableData>
              <div className="flex items-center gap-3">
                <div>
                  <div className="font-medium text-slate-800 dark:text-slate-200">
                    {emp.name}
                  </div>
                  {/* Show email on mobile in the first cell as a subtext if needed */}
                  <div className="text-[10px] text-slate-400 sm:hidden">
                    {emp.email}
                  </div>
                </div>
              </div>
            </TableData>

            {/* 2. Role */}
            <TableData>{emp.role}</TableData>

            {/* 3. Department */}
            <TableData>{emp.dept}</TableData>

            {/* 4. Status Badge */}
            <TableData>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-bold ${getStatusColor(
                  emp.status
                )}`}
              >
                {emp.status}
              </span>
            </TableData>

            {/* 5. Contact Info */}
            <TableData>
              <div className="flex flex-col text-xs">
                <span className="flex items-center gap-1">
                  <FiMail className="w-3 h-3 text-slate-400" /> {emp.email}
                </span>
                <span className="flex items-center gap-1 mt-0.5">
                  <FiPhone className="w-3 h-3 text-slate-400" /> {emp.phone}
                </span>
              </div>
            </TableData>

            {/* 6. Actions */}
            <TableData className="flex items-center justify-center">
              <IconButton
                icon={FiMoreVertical}
                tooltip={"Actions"}
                theme="blue"
              />
            </TableData>
          </TableRow>
        ))}
      </Table>
    </Card>
  );
}
