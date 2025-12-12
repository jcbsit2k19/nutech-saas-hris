import React, { useState, useEffect } from "react";
import { Table, TableRow, TableData } from "@components/tables/table";
import {
  GoTools, // Icon for Designations/Skills
  GoPlus,
  GoPencil,
  GoTrash,
  GoTag,
  GoBriefcase,
} from "react-icons/go";
import Button from "@components/buttons/button";
import IconButton from "@components/buttons/icon-button";
import Card from "@components/containers/card";

// --- 1. Visual Helpers ---

const GradeBadge = ({ grade }) => {
  // Color coding based on hierarchy level (Mock logic: M=Manager, L=Level, I=Intern)
  let style = "bg-slate-100 text-slate-600 border-slate-200"; // Default

  if (grade.startsWith("M") || grade.startsWith("C")) {
    // Management / C-Level
    style = "bg-purple-100 text-purple-700 border-purple-200";
  } else if (grade.startsWith("S") || grade.startsWith("L3")) {
    // Senior
    style = "bg-indigo-100 text-indigo-700 border-indigo-200";
  } else if (grade.startsWith("I") || grade.startsWith("L1")) {
    // Intern / Junior
    style = "bg-green-100 text-green-700 border-green-200";
  }

  return (
    <span className={`px-2 py-1 text-[10px] font-bold rounded border ${style}`}>
      {grade}
    </span>
  );
};

// --- 2. Main Component ---

export default function DesignationsPage() {
  const [loading, setLoading] = useState(true);
  const [designations, setDesignations] = useState([]);
  const [displayDesignations, setDisplayDesignations] = useState([]);

  // Columns
  const columns = [
    "Designation Title",
    "Job Grade",
    "Department",
    "Description",
    "Actions",
  ];

  // Mock API Call
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: "DES-001",
          title: "Chief Technology Officer",
          grade: "C-Level",
          department: "Executive",
          description:
            "Oversees all technical aspects and technological resources.",
        },
        {
          id: "DES-002",
          title: "Senior Software Engineer",
          grade: "L3",
          department: "Engineering",
          description: "Leads development teams and architects solutions.",
        },
        {
          id: "DES-003",
          title: "Marketing Specialist",
          grade: "L2",
          department: "Marketing",
          description: "Executes marketing campaigns and analyzes trends.",
        },
        {
          id: "DES-004",
          title: "HR Manager",
          grade: "M1",
          department: "Human Resources",
          description: "Oversees recruitment, payroll, and employee relations.",
        },
        {
          id: "DES-005",
          title: "Office Assistant",
          grade: "L1",
          department: null, // Null implies it can exist in ANY department
          description: "General administrative support.",
        },
      ];
      setDesignations(mockData);
      setLoading(false);
    }, 800);
  }, []);

  // CRUD Actions
  const handleEdit = (item) => {
    console.log("Edit:", item.title);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this designation?")) {
      console.log("Delete ID:", id);
    }
  };

  return (
    <Card className="p-2 space-y-2 min-h-screen">
      <div className="space-y-4 mb-2">
        <div className="">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Designations
          </h1>
          <p className="text-sm text-slate-500">
            Define job titles and hierarchy levels.
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <Button icon={GoPlus} color="green">
            Add Designation
          </Button>
        </div>
      </div>

      {/* --- Data Table --- */}
      <Table
        title="Job Titles"
        description="List of available job roles in the organization."
        columns={columns}
        data={designations}
        setData={setDisplayDesignations}
        loading={loading}
      >
        {displayDesignations.map((role, index) => (
          <TableRow key={role.id} row={index}>
            {/* 1. Title */}
            <TableData>
              <div className="flex items-center gap-2">
                <GoBriefcase className="text-slate-400" />
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {role.title}
                </span>
              </div>
            </TableData>

            {/* 2. Grade/Level */}
            <TableData>
              <GradeBadge grade={role.grade} />
            </TableData>

            {/* 3. Department */}
            <TableData>
              {role.department ? (
                <span className="text-sm text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                  {role.department}
                </span>
              ) : (
                <span className="text-xs text-slate-400 italic">
                  Global / Generic
                </span>
              )}
            </TableData>

            {/* 4. Description */}
            <TableData>
              <span
                className="text-xs text-slate-500 dark:text-slate-400 block max-w-xs truncate"
                title={role.description}
              >
                {role.description}
              </span>
            </TableData>

            {/* 5. Actions */}
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
