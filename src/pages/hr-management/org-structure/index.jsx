import React, { useState } from "react";
// Icons
import { FiEdit2, FiTrash2, FiPlus, FiX } from "react-icons/fi";

// Your Components
import { Table, TableRow, TableData } from "@components/tables/table"; // Adjust path
import Card from "@components/containers/card"; // Adjust path
import Button from "@components/buttons/button";
import { FaPlus } from "react-icons/fa";
import IconButton from "@components/buttons/icon-button";

export default function OrgStructure() {
  // --- State Management ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("department"); // 'department' or 'designation'
  const [editingId, setEditingId] = useState(null); // null = create, number = update

  // Mock Data: Departments
  const [departments, setDepartments] = useState([
    { id: 1, name: "Engineering", head: "John Doe" },
    { id: 2, name: "Human Resources", head: "Sarah Smith" },
    { id: 3, name: "Sales", head: "Mike Ross" },
  ]);
  const [deptViewData, setDeptViewData] = useState([]); // For Table Pagination

  // Mock Data: Designations
  const [designations, setDesignations] = useState([
    { id: 1, title: "Senior Developer", grade: "L3" },
    { id: 2, title: "Junior Developer", grade: "L1" },
    { id: 3, title: "HR Manager", grade: "M1" },
  ]);
  const [desigViewData, setDesigViewData] = useState([]); // For Table Pagination

  return (
    <Card className="p-2 space-y-2 min-h-screen">
      <div className="space-y-4">
        <div className="">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Organization Structure
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Manage company departments and job designations
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <Button icon={FaPlus} color="green">
            Add Department
          </Button>
          <Button icon={FaPlus} color="blue">
            Add Designation
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <Table
          title="Departments"
          description="Department management"
          columns={["ID", "Name", "Head of Dept", "Actions"]}
          data={departments}
          setData={setDeptViewData} // Local pagination state
          loading={false}
        >
          {deptViewData.map((dept, i) => (
            <TableRow key={dept.id} row={i}>
              <TableData className="w-16">{dept.id}</TableData>
              <TableData>
                <span className="font-medium text-slate-700 dark:text-slate-200">
                  {dept.name}
                </span>
              </TableData>
              <TableData>{dept.head}</TableData>
              <TableData className="flex items-center justify-start gap-2">
                <IconButton icon={FiEdit2} theme={"blue"} tooltip={"Edit"} />
                <IconButton icon={FiTrash2} theme={"red"} tooltip={"Delete"} />
              </TableData>
            </TableRow>
          ))}
        </Table>
        <Table
          title="Designations"
          description="Designation management"
          columns={["ID", "Job Title", "Grade", "Actions"]}
          data={designations}
          setData={setDesigViewData} // Local pagination state
          loading={false}
        >
          {desigViewData.map((desig, i) => (
            <TableRow key={desig.id} row={i}>
              <TableData className="w-16">{desig.id}</TableData>
              <TableData>
                <span className="font-medium text-slate-700 dark:text-slate-200">
                  {desig.title}
                </span>
              </TableData>
              <TableData>
                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-xs font-mono">
                  {desig.grade}
                </span>
              </TableData>
              <TableData className="flex items-center justify-start gap-2">
                <IconButton icon={FiEdit2} theme={"blue"} tooltip={"Edit"} />
                <IconButton icon={FiTrash2} theme={"red"} tooltip={"Delete"} />
              </TableData>
            </TableRow>
          ))}
        </Table>
      </div>
    </Card>
  );
}
