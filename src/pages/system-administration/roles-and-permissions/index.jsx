import React, { useState, useEffect } from "react";
import { Table, TableRow, TableData } from "@components/tables/table";
import {
  GoShieldCheck,
  GoPlus,
  GoPencil,
  GoTrash,
  GoLock, // For System Roles (Cannot delete)
  GoPerson,
  GoCheckCircle,
} from "react-icons/go";
import Button from "@components/buttons/button";
import IconButton from "@components/buttons/icon-button";
// Corrected import path as requested
import SelectInput from "@components/selections/selectioninput";
import Card from "@components/containers/card";

// --- 1. Visual Helpers ---

const PermissionBadge = ({ level }) => {
  // Color coding for access levels
  const styles = {
    "Full Access": "bg-purple-100 text-purple-700 border-purple-200",
    "Read/Write": "bg-indigo-100 text-indigo-700 border-indigo-200",
    "Read Only": "bg-slate-100 text-slate-600 border-slate-200",
    Limited: "bg-amber-50 text-amber-700 border-amber-200",
  };

  return (
    <span
      className={`px-2 py-1 text-[10px] uppercase font-bold rounded border ${
        styles[level] || styles["Limited"]
      }`}
    >
      {level}
    </span>
  );
};

// --- 2. Main Component ---

export default function RolesPermissionsPage() {
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const [displayRoles, setDisplayRoles] = useState([]);

  // Filter State
  const [statusFilter, setStatusFilter] = useState("Active");

  const columns = [
    "Role Name",
    "Assigned Users",
    "Access Level",
    "Description",
    "Actions",
  ];

  // Mock API Call
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: "ROLE-001",
          name: "Super Admin",
          usersCount: 2,
          accessLevel: "Full Access",
          description: "Full control over all modules and settings.",
          isSystem: true, // Cannot be deleted
          status: "Active",
        },
        {
          id: "ROLE-002",
          name: "HR Manager",
          usersCount: 5,
          accessLevel: "Read/Write",
          description: "Can manage employees, attendance, and recruitment.",
          isSystem: false,
          status: "Active",
        },
        {
          id: "ROLE-003",
          name: "Payroll Specialist",
          usersCount: 1,
          accessLevel: "Read/Write",
          description: "Access to Payroll processing and Bank Reports only.",
          isSystem: false,
          status: "Active",
        },
        {
          id: "ROLE-004",
          name: "Employee (Standard)",
          usersCount: 142,
          accessLevel: "Limited",
          description: "Can only view own profile and request leaves.",
          isSystem: true,
          status: "Active",
        },
        {
          id: "ROLE-005",
          name: "Auditor",
          usersCount: 0,
          accessLevel: "Read Only",
          description: "View-only access to financial reports.",
          isSystem: false,
          status: "Inactive",
        },
      ];
      setRoles(mockData);
      setLoading(false);
    }, 800);
  }, []);

  // Filter Logic
  useEffect(() => {
    if (statusFilter === "All") {
      setDisplayRoles(roles);
    } else {
      setDisplayRoles(roles.filter((r) => r.status === statusFilter));
    }
  }, [statusFilter, roles]);

  // Actions
  const handleEdit = (role) => console.log("Edit Role:", role.name);

  const handleDelete = (role) => {
    if (role.isSystem) {
      alert("System roles cannot be deleted.");
      return;
    }
    if (role.usersCount > 0) {
      alert(
        `Cannot delete role. There are ${role.usersCount} users assigned to it.`
      );
      return;
    }
    if (window.confirm("Delete this role definition?")) {
      console.log("Delete ID:", role.id);
    }
  };

  // Options for SelectInput
  const statusOptions = [
    { label: "Active Roles", value: "Active" },
    { label: "Inactive Roles", value: "Inactive" },
    { label: "Show All", value: "All" },
  ];

  return (
    <Card className="p-2 space-y-2 min-h-screen">
      <div className="space-y-4 mb-2">
        <div className="">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Roles & Permissions
          </h1>
          <p className="text-sm text-slate-500">
            Define access levels and secure your data.
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <SelectInput
            icon={GoCheckCircle}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={statusOptions}
            placeholder="Status"
          />
          <Button icon={GoPlus} color="green">
            Create Role
          </Button>
        </div>
      </div>

      {/* --- Data Table --- */}
      <Table
        title="Role Definitions"
        description="List of available security profiles."
        columns={columns}
        data={displayRoles}
        setData={setDisplayRoles}
        loading={loading}
      >
        {displayRoles.map((role, index) => (
          <TableRow key={role.id} row={index}>
            {/* 1. Role Name */}
            <TableData>
              <div className="flex items-center gap-2">
                {role.isSystem ? (
                  <GoLock className="text-amber-500" title="System Role" />
                ) : (
                  <GoShieldCheck className="text-indigo-500" />
                )}
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {role.name}
                </span>
              </div>
            </TableData>

            {/* 2. Assigned Users */}
            <TableData>
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 w-fit px-2 py-1 rounded-full text-xs font-medium border border-slate-200 dark:border-slate-600">
                <GoPerson />
                <span>{role.usersCount} Users</span>
              </div>
            </TableData>

            {/* 3. Access Level */}
            <TableData>
              <PermissionBadge level={role.accessLevel} />
            </TableData>

            {/* 4. Description */}
            <TableData>
              <span className="text-xs text-slate-500 dark:text-slate-400 block max-w-xs truncate">
                {role.description}
              </span>
            </TableData>

            {/* 5. Actions */}
            <TableData>
              <div className="flex items-center gap-2">
                <IconButton
                  icon={GoPencil}
                  tooltip={"Edit Permissions"}
                  theme="blue"
                  onClick={() => handleEdit(role)}
                />

                {/* Conditionally render delete button based on system status */}
                {role.isSystem ? (
                  <span className="p-2 text-slate-300 cursor-not-allowed">
                    <GoLock />
                  </span>
                ) : (
                  <IconButton
                    icon={GoTrash}
                    tooltip={"Delete Role"}
                    theme="red"
                    onClick={() => handleDelete(role)}
                  />
                )}
              </div>
            </TableData>
          </TableRow>
        ))}
      </Table>
    </Card>
  );
}
