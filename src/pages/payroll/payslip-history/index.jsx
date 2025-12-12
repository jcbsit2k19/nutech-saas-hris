import React, { useState, useEffect } from "react";
import { Table, TableRow, TableData } from "@components/tables/table";
import {
  GoFile,
  GoDownload,
  GoEye,
  GoFilter,
  GoSearch,
  GoCalendar,
} from "react-icons/go";
import Button from "@components/buttons/button";
import IconButton from "@components/buttons/icon-button";
import TextInput from "@components/textinputs/textinput";
import SelectInput from "@components/selections/selectioninput";
import Card from "@components/containers/card";

// --- 1. Helper Components ---

const PaymentStatusBadge = ({ status }) => {
  const styles = {
    paid: "bg-emerald-100 text-emerald-700 border-emerald-200",
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    failed: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-semibold rounded-full border capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
};

// --- 2. Main Component ---

export default function PayslipHistoryPage() {
  const [loading, setLoading] = useState(true);
  const [allPayslips, setAllPayslips] = useState([]);
  const [displayPayslips, setDisplayPayslips] = useState([]);

  // Filter States
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedYear, setSelectedYear] = useState("2023");
  const [searchTerm, setSearchTerm] = useState("");

  const columns = [
    "Pay Period",
    "Employee",
    "Department",
    "Net Pay",
    "Payment Date",
    "Status",
    "Actions",
  ];

  // Options for SelectInputs
  const monthOptions = [
    { label: "All Months", value: "All" },
    { label: "January", value: "Jan" },
    { label: "February", value: "Feb" },
    { label: "March", value: "Mar" },
    { label: "September", value: "Sep" },
    { label: "October", value: "Oct" },
    { label: "November", value: "Nov" },
    { label: "December", value: "Dec" },
  ];

  const yearOptions = [
    { label: "2023", value: "2023" },
    { label: "2022", value: "2022" },
  ];

  // Mock API Call
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: "PS-2023-10-001",
          period: "Oct 2023",
          dateProcessed: "Oct 31, 2023",
          employee: {
            name: "Alice Johnson",
            id: "EMP001",
            avatar: "https://i.pravatar.cc/150?u=1",
            dept: "Engineering",
          },
          netPay: "$5,900.00",
          status: "paid",
        },
        {
          id: "PS-2023-10-002",
          period: "Oct 2023",
          dateProcessed: "Oct 31, 2023",
          employee: {
            name: "Mark Smith",
            id: "EMP002",
            avatar: "https://i.pravatar.cc/150?u=2",
            dept: "Marketing",
          },
          netPay: "$3,350.00",
          status: "paid",
        },
        {
          id: "PS-2023-09-001",
          period: "Sep 2023",
          dateProcessed: "Sep 30, 2023",
          employee: {
            name: "Alice Johnson",
            id: "EMP001",
            avatar: "https://i.pravatar.cc/150?u=1",
            dept: "Engineering",
          },
          netPay: "$5,850.00",
          status: "paid",
        },
        {
          id: "PS-2023-09-003",
          period: "Sep 2023",
          dateProcessed: "Sep 30, 2023",
          employee: {
            name: "Sarah Connor",
            id: "EMP003",
            avatar: "https://i.pravatar.cc/150?u=3",
            dept: "Security",
          },
          netPay: "$2,650.00",
          status: "failed",
        },
      ];
      setAllPayslips(mockData);
      setLoading(false);
    }, 800);
  }, []);

  // Filter Logic
  useEffect(() => {
    let data = allPayslips;

    // Filter by Month
    if (selectedMonth !== "All") {
      data = data.filter((item) => item.period.includes(selectedMonth));
    }

    // Filter by Search (Name or ID)
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      data = data.filter(
        (item) =>
          item.employee.name.toLowerCase().includes(lowerTerm) ||
          item.employee.id.toLowerCase().includes(lowerTerm)
      );
    }

    setDisplayPayslips(data);
  }, [selectedMonth, selectedYear, searchTerm, allPayslips]);

  return (
    <Card className="p-2 space-y-2 min-h-screen">
      <div className="space-y-4 mb-2">
        <div className="">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Payslip History
          </h1>
          <p className="text-sm text-slate-500">
            Archive of all processed salary payments.
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <Button icon={GoDownload} color={"green"}>
            Download Batch (Zip)
          </Button>
        </div>
      </div>

      {/* --- Filter Bar --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
        {/* Search Input */}
        <div className="col-span-1 md:col-span-2">
          <TextInput
            id={`search`}
            name={"search"}
            type={"text"}
            value={searchTerm}
            icon={GoSearch}
            placeholder={"Search Employee..."}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Month Filter */}
        <div className="col-span-1">
          <SelectInput
            icon={GoCalendar}
            options={monthOptions}
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            placeholder="Select Month"
          />
        </div>

        {/* Year Filter */}
        <div className="col-span-1">
          <SelectInput
            icon={GoCalendar}
            options={yearOptions}
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            placeholder="Select Year"
          />
        </div>
      </div>

      {/* --- Data Table --- */}
      <Table
        title="Records"
        description={`Showing ${displayPayslips.length} records`}
        columns={columns}
        data={displayPayslips}
        setData={setDisplayPayslips}
        loading={loading}
      >
        {displayPayslips.map((slip, index) => (
          <TableRow key={slip.id} row={index}>
            {/* 1. Pay Period */}
            <TableData>
              <div className="flex flex-col">
                <span className="font-bold text-slate-700 dark:text-slate-200">
                  {slip.period}
                </span>
                <span className="text-[10px] text-slate-400">{slip.id}</span>
              </div>
            </TableData>

            {/* 2. Employee */}
            <TableData>
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-medium text-slate-700 dark:text-slate-200 text-sm">
                    {slip.employee.name}
                  </p>
                  <p className="text-[10px] text-slate-400 uppercase">
                    {slip.employee.id}
                  </p>
                </div>
              </div>
            </TableData>

            {/* 3. Department */}
            <TableData>{slip.employee.dept}</TableData>

            {/* 4. Net Pay */}
            <TableData>
              <span className="font-mono">{slip.netPay}</span>
            </TableData>

            {/* 5. Processed Date */}
            <TableData>
              <span className="text-slate-500 text-xs">
                {slip.dateProcessed}
              </span>
            </TableData>

            {/* 6. Status */}
            <TableData>
              <PaymentStatusBadge status={slip.status} />
            </TableData>

            {/* 7. Actions */}
            <TableData>
              <div className="flex items-center gap-2">
                <IconButton
                  icon={GoDownload}
                  tooltip={"Download PDF"}
                  theme={"green"}
                  onClick={() => handleDownload(slip.id)}
                />
                <IconButton
                  icon={GoEye}
                  tooltip={"View Details"}
                  theme={"blue"}
                />
              </div>
            </TableData>
          </TableRow>
        ))}
      </Table>
    </Card>
  );
}
