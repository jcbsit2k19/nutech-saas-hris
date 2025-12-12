import React, { useState, useEffect } from "react";
// Adjust path to your reusable table
import { Table, TableRow, TableData } from "@components/tables/table";
import { GoCheck, GoX, GoEye, GoCalendar, GoDotFill } from "react-icons/go";
import Button from "@components/buttons/button";
import IconButton from "@components/buttons/icon-button";
import Card from "@components/containers/card";

// --- 1. Visual Helpers ---

const LeaveStatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    rejected: "bg-rose-100 text-rose-700 border-rose-200",
    cancelled: "bg-slate-100 text-slate-500 border-slate-200",
  };

  return (
    <span
      className={`px-2.5 py-0.5 text-[10px] uppercase tracking-wide font-bold rounded-full border ${styles[status]}`}
    >
      {status}
    </span>
  );
};

const LeaveTypeBadge = ({ type }) => {
  // Color coding distinct leave types helps HR visualize coverage
  const styles = {
    Sick: "text-rose-600 bg-rose-50",
    Casual: "text-blue-600 bg-blue-50",
    Annual: "text-purple-600 bg-purple-50",
    Unpaid: "text-slate-600 bg-slate-50",
  };

  return (
    <div
      className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium w-fit ${
        styles[type] || "text-gray-600"
      }`}
    >
      <GoDotFill className="text-[8px]" /> {type}
    </div>
  );
};

// --- 2. Main Component ---

export default function LeaveRequestsPage() {
  const [allLeaves, setAllLeaves] = useState([]);
  const [displayLeaves, setDisplayLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  // Specific Filter for this page
  const [statusFilter, setStatusFilter] = useState("pending"); // Default to pending so HR sees work first

  const columns = [
    "Employee",
    "Leave Type",
    "Duration",
    "Dates",
    "Reason",
    "Status",
    "Actions",
  ];

  // Mock API Call
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 101,
          employee: {
            name: "Alice Johnson",
            id: "EMP001",
            avatar: "https://i.pravatar.cc/150?u=1",
          },
          type: "Sick",
          fromDate: "Oct 24, 2023",
          toDate: "Oct 25, 2023",
          days: 2,
          reason: "High fever and flu symptoms",
          status: "pending",
          appliedOn: "Oct 23, 2023",
        },
        {
          id: 102,
          employee: {
            name: "Mark Smith",
            id: "EMP002",
            avatar: "https://i.pravatar.cc/150?u=2",
          },
          type: "Annual",
          fromDate: "Nov 01, 2023",
          toDate: "Nov 05, 2023",
          days: 5,
          reason: "Family vacation to Bali",
          status: "approved",
          appliedOn: "Oct 10, 2023",
        },
        {
          id: 103,
          employee: {
            name: "Sarah Connor",
            id: "EMP003",
            avatar: "https://i.pravatar.cc/150?u=3",
          },
          type: "Casual",
          fromDate: "Oct 24, 2023",
          toDate: "Oct 24, 2023",
          days: 1,
          reason: "Personal banking work",
          status: "rejected",
          appliedOn: "Oct 20, 2023",
        },
        {
          id: 104,
          employee: {
            name: "David Chen",
            id: "EMP004",
            avatar: "https://i.pravatar.cc/150?u=4",
          },
          type: "Unpaid",
          fromDate: "Oct 28, 2023",
          toDate: "Oct 30, 2023",
          days: 3,
          reason: "Emergency travel",
          status: "pending",
          appliedOn: "Oct 24, 2023",
        },
      ];
      setAllLeaves(mockData);
      setLoading(false);
    }, 800);
  }, []);

  // Filter Logic: When the external status dropdown changes, we filter the data passed to the Table
  const filteredData =
    statusFilter === "all"
      ? allLeaves
      : allLeaves.filter((leave) => leave.status === statusFilter);

  // Action Handlers
  const handleApprove = (id) => {
    console.log(`Approving leave ${id}`);
    // API call to update status -> Then refresh list
  };

  const handleReject = (id) => {
    console.log(`Rejecting leave ${id}`);
    // Open modal for rejection reason
  };

  return (
    <Card className="p-2 space-y-2 min-h-screen">
      <div className="space-y-4 mb-2">
        <div className="">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Leave Requests
          </h1>
          <p className="text-sm text-slate-500">
            Manage employee leave applications and approvals.
          </p>
        </div>
      </div>
      {/* --- Page Controls & Summary --- */}
      <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-md border border-slate-300 dark:border-slate-700 shadow-sm">
        {/* Status Tabs/Filter */}
        <div className="flex gap-2">
          {["pending", "approved", "rejected", "all"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition capitalize 
                 ${
                   statusFilter === status
                     ? "bg-indigo-100 text-indigo-700 ring-1 ring-indigo-500 dark:bg-indigo-900 dark:text-indigo-200"
                     : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"
                 }`}
            >
              {status}
            </button>
          ))}
        </div>

        <Button icon={GoCalendar} color={"green"}>
          New Request
        </Button>
      </div>

      {/* --- Data Table --- */}
      <Table
        title=""
        description=""
        columns={columns}
        data={filteredData} // We pass the filtered list here
        setData={setDisplayLeaves} // Table handles pagination on the filtered list
        loading={loading}
      >
        {displayLeaves.map((leave, index) => (
          <TableRow key={leave.id} row={index}>
            {/* 1. Employee */}
            <TableData>
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-semibold text-slate-700 dark:text-slate-200 text-sm">
                    {leave.employee.name}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Applied: {leave.appliedOn}
                  </p>
                </div>
              </div>
            </TableData>

            {/* 2. Type */}
            <TableData>
              <LeaveTypeBadge type={leave.type} />
            </TableData>

            {/* 3. Duration */}
            <TableData>
              {leave.days} {leave.days === 1 ? "Day" : "Days"}
            </TableData>

            {/* 4. Dates */}
            <TableData>
              <div className="flex flex-col text-xs">
                <span className="font-medium text-slate-600 dark:text-slate-300">
                  {leave.fromDate}
                </span>
                <span className="text-slate-400 text-[10px]">
                  to {leave.toDate}
                </span>
              </div>
            </TableData>

            {/* 5. Reason (Truncated) */}
            <TableData>
              <div
                className="max-w-[150px] truncate text-slate-500"
                title={leave.reason}
              >
                {leave.reason}
              </div>
            </TableData>

            {/* 6. Status */}
            <TableData>
              <LeaveStatusBadge status={leave.status} />
            </TableData>

            {/* 7. Actions */}
            <TableData>
              <div className="flex items-center gap-2">
                {leave.status === "pending" ? (
                  <>
                    <IconButton
                      icon={GoCheck}
                      tooltip={"Approve"}
                      theme="green"
                    />
                    <IconButton icon={GoX} tooltip={"Reject"} theme="red" />
                  </>
                ) : (
                  <IconButton icon={GoEye} tooltip={"View"} theme="blue" />
                )}
              </div>
            </TableData>
          </TableRow>
        ))}
      </Table>
    </Card>
  );
}
