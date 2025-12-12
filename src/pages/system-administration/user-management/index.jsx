import React, { useState, useEffect } from "react";
import { Table, TableRow, TableData } from "@components/tables/table";
import {
  GoPerson,
  GoPlus,
  GoPencil,
  GoTrash,
  GoLock, // For Password Reset
  GoShieldLock,
  GoDotFill,
} from "react-icons/go";
import Button from "@components/buttons/button";
import IconButton from "@components/buttons/icon-button";
import SelectInput from "@components/selections/selectioninput";
import Card from "@components/containers/card";

// --- 1. Visual Helpers ---

const RoleBadge = ({ role }) => {
  // Security-focused color coding
  const styles = {
    "Super Admin": "bg-purple-100 text-purple-700 border-purple-200",
    "HR Manager": "bg-blue-100 text-blue-700 border-blue-200",
    Employee: "bg-slate-100 text-slate-600 border-slate-200",
  };

  return (
    <span
      className={`px-2 py-1 text-[10px] font-bold rounded border flex items-center gap-1 w-fit ${
        styles[role] || styles["Employee"]
      }`}
    >
      {role === "Super Admin" && <GoShieldLock />}
      {role}
    </span>
  );
};

const StatusBadge = ({ status }) => {
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

export default function UserManagementPage() {
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]); // Master list
  const [displayUsers, setDisplayUsers] = useState([]); // Filtered list for Table

  // Filter State
  const [roleFilter, setRoleFilter] = useState("All");

  const columns = ["User Profile", "Role", "Status", "Last Login", "Actions"];

  // Mock API Call
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          name: "Alice Johnson",
          email: "alice@company.com",
          avatar: "https://i.pravatar.cc/150?u=1",
          role: "Super Admin",
          status: "Active",
          lastLogin: "Just now",
        },
        {
          id: 2,
          name: "Mark Smith",
          email: "mark.s@company.com",
          avatar: "https://i.pravatar.cc/150?u=2",
          role: "HR Manager",
          status: "Active",
          lastLogin: "2 hours ago",
        },
        {
          id: 3,
          name: "Sarah Connor",
          email: "sarah.c@company.com",
          avatar: "https://i.pravatar.cc/150?u=3",
          role: "Employee",
          status: "Inactive",
          lastLogin: "2 months ago",
        },
        {
          id: 4,
          name: "David Chen",
          email: "david.c@company.com",
          avatar: "https://i.pravatar.cc/150?u=4",
          role: "Employee",
          status: "Active",
          lastLogin: "Yesterday",
        },
      ];
      setAllUsers(mockData);
      setLoading(false);
    }, 800);
  }, []);

  // Filter Logic
  useEffect(() => {
    if (roleFilter === "All") {
      setDisplayUsers(allUsers);
    } else {
      setDisplayUsers(allUsers.filter((user) => user.role === roleFilter));
    }
  }, [roleFilter, allUsers]);

  // Actions
  const handleEdit = (user) => console.log("Edit User:", user.email);
  const handleResetPassword = (email) => {
    alert(`Password reset link sent to ${email}`);
  };
  const handleDelete = (id) => {
    if (window.confirm("Deactivate this user account?")) {
      console.log("Deactivate ID:", id);
    }
  };

  // Options for SelectInput
  const roleOptions = [
    { label: "All Roles", value: "All" },
    { label: "Super Admin", value: "Super Admin" },
    { label: "HR Manager", value: "HR Manager" },
    { label: "Employee", value: "Employee" },
  ];

  return (
    <Card className="p-2 space-y-2 min-h-screen">
      <div className="space-y-4 mb-2">
        <div className="">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            User Management
          </h1>
          <p className="text-sm text-slate-500">
            Control system access and user roles.
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <SelectInput
            icon={GoPerson}
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            options={roleOptions}
            placeholder="Filter by Role"
          />
          <Button icon={GoPlus} color="green">
            Invite User
          </Button>
        </div>
      </div>

      {/* --- Data Table --- */}
      <Table
        title="System Users"
        description="Active accounts with access to the platform."
        columns={columns}
        data={displayUsers}
        setData={setDisplayUsers}
        loading={loading}
      >
        {displayUsers.map((user, index) => (
          <TableRow key={user.id} row={index}>
            {/* 1. User Profile (Name + Email) */}
            <TableData>
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-semibold text-slate-700 dark:text-slate-200 text-sm">
                    {user.name}
                  </p>
                  <p className="text-xs text-slate-400">{user.email}</p>
                </div>
              </div>
            </TableData>

            {/* 2. Role */}
            <TableData>
              <RoleBadge role={user.role} />
            </TableData>

            {/* 3. Status */}
            <TableData>
              <StatusBadge status={user.status} />
            </TableData>

            {/* 4. Last Login */}
            <TableData>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {user.lastLogin}
              </span>
            </TableData>

            {/* 5. Actions */}
            <TableData>
              <div className="flex items-center gap-2">
                <IconButton
                  icon={GoLock}
                  tooltip={"Reset Password"}
                  theme="yellow"
                  onClick={() => handleResetPassword(user.email)}
                />
                <IconButton
                  icon={GoPencil}
                  tooltip={"Edit Role"}
                  theme="blue"
                  onClick={() => handleEdit(user)}
                />
                <IconButton
                  icon={GoTrash}
                  tooltip={"Deactivate"}
                  theme="red"
                  onClick={() => handleDelete(user.id)}
                />
              </div>
            </TableData>
          </TableRow>
        ))}
      </Table>
    </Card>
  );
}
