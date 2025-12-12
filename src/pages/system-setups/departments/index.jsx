import React, { useState, useEffect } from "react";
import { Table, TableRow, TableData } from "@components/tables/table";
import {
  GoOrganization,
  GoPlus,
  GoPencil,
  GoTrash,
  GoPeople,
  GoDotFill,
} from "react-icons/go";
import IconButton from "@components/buttons/icon-button";
import Button from "@components/buttons/button";
import Card from "@components/containers/card";

// --- 1. Visual Helpers ---

const StatusBadge = ({ status }) => {
  // Simple dot indicator for Active/Inactive
  const isActive = status === "Active";
  return (
    <span
      className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full border ${
        isActive
          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
          : "bg-slate-50 text-slate-500 border-slate-200"
      }`}
    >
      <GoDotFill className={isActive ? "text-emerald-500" : "text-slate-400"} />
      {status}
    </span>
  );
};

// --- 2. Main Component ---

export default function DepartmentsPage() {
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState([]);
  const [displayDepartments, setDisplayDepartments] = useState([]);

  // Columns
  const columns = [
    "Department Name",
    "Head of Dept (HOD)",
    "Employees",
    "Cost Center", // Useful for Payroll/Finance
    "Status",
    "Actions",
  ];

  // Mock API Call
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: "DEPT-001",
          name: "Engineering",
          description: "Software Development & QA",
          hod: {
            name: "Alice Johnson",
            avatar: "https://i.pravatar.cc/150?u=1",
            id: "EMP001",
          },
          employeeCount: 24,
          costCenter: "CC-100",
          status: "Active",
        },
        {
          id: "DEPT-002",
          name: "Human Resources",
          description: "Recruitment, Payroll & Admin",
          hod: {
            name: "Sarah Connor",
            avatar: "https://i.pravatar.cc/150?u=3",
            id: "EMP003",
          },
          employeeCount: 5,
          costCenter: "CC-200",
          status: "Active",
        },
        {
          id: "DEPT-003",
          name: "Marketing",
          description: "Brand awareness & Sales",
          hod: null, // Example of Vacant HOD
          employeeCount: 12,
          costCenter: "CC-300",
          status: "Active",
        },
        {
          id: "DEPT-004",
          name: "Legacy Operations",
          description: "Discontinued assembly line",
          hod: null,
          employeeCount: 0,
          costCenter: "CC-999",
          status: "Inactive",
        },
      ];
      setDepartments(mockData);
      setLoading(false);
    }, 800);
  }, []);

  // CRUD Actions
  const handleEdit = (dept) => {
    console.log("Edit Dept:", dept.name);
    // Logic: Open Modal with form pre-filled
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Are you sure? This might affect employees assigned to this department."
      )
    ) {
      console.log("Delete ID:", id);
      // Logic: Call API to soft-delete
    }
  };

  return (
    <Card className="p-2 space-y-2 min-h-screen">
      <div className="space-y-4 mb-2">
        <div className="">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Departments
          </h1>
          <p className="text-sm text-slate-500">
            Manage organizational structure and cost centers.
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <Button icon={GoPlus} color="green">
            Add Department
          </Button>
        </div>
      </div>

      {/* --- Data Table --- */}
      <Table
        title="Department List"
        description="All registered departments in the company."
        columns={columns}
        data={departments}
        setData={setDisplayDepartments}
        loading={loading}
      >
        {displayDepartments.map((dept, index) => (
          <TableRow key={dept.id} row={index}>
            {/* 1. Department Name */}
            <TableData>
              <div>
                <p className="font-bold text-slate-700 dark:text-slate-200">
                  {dept.name}
                </p>
                <p className="text-xs text-slate-400 max-w-[200px] truncate">
                  {dept.description}
                </p>
              </div>
            </TableData>

            {/* 2. Head of Dept */}
            <TableData>
              {dept.hod ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                    {dept.hod.name}
                  </span>
                </div>
              ) : (
                <span className="text-xs text-slate-400 italic bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                  Vacant
                </span>
              )}
            </TableData>

            {/* 3. Employee Count */}
            <TableData>
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                <GoPeople />
                <span className="font-mono text-sm">{dept.employeeCount}</span>
              </div>
            </TableData>

            {/* 4. Cost Center */}
            <TableData>
              <span className="font-mono text-xs text-slate-500 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 px-2 py-0.5 rounded">
                {dept.costCenter}
              </span>
            </TableData>

            {/* 5. Status */}
            <TableData>
              <StatusBadge status={dept.status} />
            </TableData>

            {/* 6. Actions */}
            <TableData>
              <div className="flex items-center gap-2">
                <IconButton
                  icon={GoPencil}
                  tooltip={"Edit"}
                  theme="blue"
                  onClick={() => handleEdit(dept)}
                />
                <IconButton
                  icon={GoTrash}
                  tooltip={"Delete"}
                  theme="red"
                  onClick={() => handleDelete(dept.id)}
                />
              </div>
            </TableData>
          </TableRow>
        ))}
      </Table>
    </Card>
  );
}
