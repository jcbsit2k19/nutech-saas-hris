import React, { useState, useEffect } from "react";
import { Table, TableRow, TableData } from "@components/tables/table";
import {
  GoBriefcase,
  GoDownload,
  GoFileCode, // Represents file formats
  GoPlus,
  GoShieldCheck,
  GoSync,
} from "react-icons/go";
import StatusCard from "@components/cards/status-card";
import IconButton from "@components/buttons/icon-button";
import Button from "@components/buttons/button";
import Card from "@components/containers/card";

// --- 1. Visual Helpers ---

const StatusBadge = ({ status }) => {
  const styles = {
    generated: "bg-blue-100 text-blue-700 border-blue-200",
    downloaded: "bg-purple-100 text-purple-700 border-purple-200", // User has already downloaded it once
    archived: "bg-slate-100 text-slate-500 border-slate-200",
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-semibold rounded-full border capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
};

const FormatBadge = ({ format }) => {
  const styles = {
    CSV: "bg-green-50 text-green-700 border-green-200",
    XML: "bg-orange-50 text-orange-700 border-orange-200",
    TXT: "bg-gray-50 text-gray-700 border-gray-200",
  };

  return (
    <span
      className={`flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono border rounded ${styles[format]}`}
    >
      <GoFileCode /> {format}
    </span>
  );
};

// --- 2. Main Component ---

export default function BankReportsPage() {
  const [loading, setLoading] = useState(true);
  const [bankFiles, setBankFiles] = useState([]);
  const [displayFiles, setDisplayFiles] = useState([]);

  // Columns for the Table
  const columns = [
    "Batch ID",
    "Target Bank",
    "Pay Period",
    "Employees",
    "Total Amount",
    "Generated On",
    "Status",
    "Actions",
  ];

  // Mock API Call
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: "BATCH-2023-10-A",
          bankName: "Chase Bank",
          format: "CSV",
          period: "Oct 2023",
          employeeCount: 12,
          totalAmount: 15250.0,
          generatedOn: "Oct 31, 2023 10:30 AM",
          status: "generated",
        },
        {
          id: "BATCH-2023-10-B",
          bankName: "HSBC Corporate",
          format: "XML",
          period: "Oct 2023",
          employeeCount: 5,
          totalAmount: 8400.5,
          generatedOn: "Oct 31, 2023 10:35 AM",
          status: "downloaded",
        },
        {
          id: "BATCH-2023-09-A",
          bankName: "Chase Bank",
          format: "CSV",
          period: "Sep 2023",
          employeeCount: 17,
          totalAmount: 22100.0,
          generatedOn: "Sep 30, 2023 04:15 PM",
          status: "archived",
        },
      ];
      setBankFiles(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  // Action: Trigger File Generation
  const handleDownload = (batchId, fileName) => {
    console.log(`Downloading ${fileName} for batch ${batchId}`);
    // Logic: Backend call to stream file
  };

  const handleGenerateNew = () => {
    console.log("Open Modal to select Pay Run and Bank Template");
  };

  return (
    <Card className="p-2 space-y-2 min-h-screen">
      <div className="space-y-4 mb-2">
        <div className="">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Bank Advice Files
          </h1>
          <p className="text-sm text-slate-500">
            Generate and download salary transfer files compatible with your
            bank.
          </p>
        </div>
      </div>

      {/* --- Summary Cards (Optional but useful for Finance) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <StatusCard
          title={"Last Batch Total"}
          value={"$23,650.50"}
          icon={GoBriefcase}
          iconColor="blue"
        />
        <StatusCard
          title={"Security"}
          value={"Hash Verificatied"}
          icon={GoShieldCheck}
          iconColor="green"
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button icon={GoPlus} color="green" onClick={handleGenerateNew}>
          Generate New File
        </Button>
      </div>

      {/* --- Main Data Table --- */}
      <Table
        title="File History"
        description="Archive of generated bank transfer files."
        columns={columns}
        data={bankFiles}
        setData={setDisplayFiles}
        loading={loading}
      >
        {displayFiles.map((file, index) => (
          <TableRow key={file.id} row={index}>
            <TableData>{file.id}</TableData>

            <TableData>
              <div className="flex flex-col gap-1">
                <span className="font-medium text-slate-700 dark:text-slate-200">
                  {file.bankName}
                </span>
                <div className="w-fit">
                  <FormatBadge format={file.format} />
                </div>
              </div>
            </TableData>

            <TableData>{file.period}</TableData>

            <TableData>
              <div className="flex items-center gap-2">
                <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded text-xs font-bold">
                  {file.employeeCount}
                </span>
                <span className="text-xs text-slate-400">Records</span>
              </div>
            </TableData>

            <TableData>
              $
              {file.totalAmount.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </TableData>

            <TableData>
              <span className="text-xs text-slate-500">{file.generatedOn}</span>
            </TableData>

            {/* 7. Status */}
            <TableData>
              <StatusBadge status={file.status} />
            </TableData>

            {/* 8. Actions */}
            <TableData>
              <IconButton
                icon={GoDownload}
                tooltip={"Download"}
                theme="green"
              />
            </TableData>
          </TableRow>
        ))}
      </Table>
    </Card>
  );
}
