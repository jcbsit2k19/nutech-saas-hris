import React, { useState, useEffect } from "react";
// Icons
import {
  FiFileText,
  FiDownload,
  FiTrash2,
  FiUploadCloud,
  FiImage,
  FiFile,
  FiFilter,
  FiBox,
  FiSave,
} from "react-icons/fi";

// Your Custom Components
import { Table, TableRow, TableData } from "@components/tables/table"; // Adjust path
import Card from "@components/containers/card"; // Adjust path
import StatusCard from "@components/cards/status-card";
import Button from "@components/buttons/button";
import IconButton from "@components/buttons/icon-button";

// --- Mock Data ---
const MOCK_DOCS = [
  {
    id: 1,
    name: "Employment Contract - S. Connor",
    type: "pdf",
    category: "Contract",
    owner: "Sarah Connor",
    size: "2.4 MB",
    date: "Aug 20, 2025",
  },
  {
    id: 2,
    name: "NDA Agreement",
    type: "docx",
    category: "Legal",
    owner: "John Smith",
    size: "1.1 MB",
    date: "Aug 18, 2025",
  },
  {
    id: 3,
    name: "Q3 Marketing Assets",
    type: "zip",
    category: "Assets",
    owner: "Marketing Dept",
    size: "150 MB",
    date: "Aug 15, 2025",
  },
  {
    id: 4,
    name: "Leave Policy 2025",
    type: "pdf",
    category: "Policy",
    owner: "HR Admin",
    size: "800 KB",
    date: "Jan 10, 2025",
  },
  {
    id: 5,
    name: "Profile Photo - K. Reese",
    type: "jpg",
    category: "Personal",
    owner: "Kyle Reese",
    size: "2.5 MB",
    date: "Aug 22, 2025",
  },
  {
    id: 6,
    name: "Internship Agreement",
    type: "pdf",
    category: "Contract",
    owner: "Ellen Ripley",
    size: "1.8 MB",
    date: "Aug 24, 2025",
  },
  {
    id: 7,
    name: "Server Logs",
    type: "txt",
    category: "Technical",
    owner: "IT Dept",
    size: "50 KB",
    date: "Aug 25, 2025",
  },
];

export default function DocumentsPage() {
  const [loading, setLoading] = useState(true);

  // Data State
  const [documents, setDocuments] = useState([]);
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [viewData, setViewData] = useState([]); // For Table Pagination

  // Filters
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Load Data
  useEffect(() => {
    setTimeout(() => {
      setDocuments(MOCK_DOCS);
      setFilteredDocs(MOCK_DOCS);
      setLoading(false);
    }, 1000);
  }, []);

  // Handle Filtering
  useEffect(() => {
    if (categoryFilter === "All") {
      setFilteredDocs(documents);
    } else {
      setFilteredDocs(
        documents.filter((doc) => doc.category === categoryFilter)
      );
    }
  }, [categoryFilter, documents]);

  // File Icon Helper
  const getFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FiFileText className="text-red-500" />;
      case "docx":
      case "doc":
        return <FiFileText className="text-blue-500" />;
      case "jpg":
      case "png":
        return <FiImage className="text-purple-500" />;
      case "zip":
      case "rar":
        return <FiUploadCloud className="text-amber-500" />; // representing archive
      default:
        return <FiFile className="text-slate-400" />;
    }
  };

  const categories = [
    "All",
    "Contract",
    "Policy",
    "Legal",
    "Assets",
    "Personal",
  ];

  return (
    <Card className="p-2 space-y-2 min-h-screen">
      <div className="space-y-4 mb-4">
        <div className="">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Documents & Files
          </h1>
          <p className="text-sm text-slate-500">
            Manage employee contracts and company assets
          </p>
        </div>
      </div>

      {/* --- Stats Cards (Optional but good for overview) --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatusCard
          title="Total Files"
          value={documents.length}
          icon={FiBox}
          iconColor="blue"
        />
        <StatusCard
          title="Contracts"
          value={documents.filter((d) => d.category === "Contract").length}
          icon={FiFile}
          color="green"
        />
        <StatusCard
          title="Policies"
          value={documents.filter((d) => d.category === "Policy").length}
          icon={FiFile}
          color="yellow"
        />
        <StatusCard
          title="Total Size"
          value="1.2 GB"
          color="gray"
          icon={FiSave}
        />
      </div>

      {/* --- Filter Bar --- */}
      {/* <div className="flex justify-end mb-4">
        <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-2 rounded-md shadow-sm border border-slate-300 dark:border-slate-700">
          <FiFilter className="text-slate-400" />
          <select
            className="bg-transparent text-sm outline-none text-slate-600 dark:text-slate-300 cursor-pointer"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="dark:bg-slate-800">
                {cat === "All" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>
      </div> */}
      <div className="flex justify-end mb-2">
        <Button icon={FiUploadCloud} color="green">
          Upload new file
        </Button>
      </div>

      {/* --- Documents Table --- */}
      <Table
        title="File Repository"
        description="List of all uploaded documents"
        columns={[
          "Document Name",
          "Category",
          "Owner / Employee",
          "Date",
          "Size",
          "Actions",
        ]}
        data={filteredDocs}
        setData={setViewData}
        loading={loading}
      >
        {viewData.map((doc, index) => (
          <TableRow key={doc.id} row={index}>
            {/* 1. Name & Icon */}
            <TableData>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-lg">
                  {getFileIcon(doc.type)}
                </div>
                <div>
                  <div className="font-medium text-slate-800 dark:text-slate-200">
                    {doc.name}
                  </div>
                  <div className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">
                    {doc.type}
                  </div>
                </div>
              </div>
            </TableData>

            {/* 2. Category */}
            <TableData>
              <span className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium">
                {doc.category}
              </span>
            </TableData>

            {/* 3. Owner */}
            <TableData>{doc.owner}</TableData>

            {/* 4. Date */}
            <TableData>{doc.date}</TableData>

            {/* 5. Size */}
            <TableData>
              <span className="font-mono text-xs">{doc.size}</span>
            </TableData>

            {/* 6. Actions */}
            <TableData className="text-right">
              <div className="flex justify-end gap-2">
                <IconButton
                  icon={FiDownload}
                  tooltip={"Download"}
                  theme="blue"
                />
                <IconButton icon={FiTrash2} tooltip={"Delete"} theme="red" />
              </div>
            </TableData>
          </TableRow>
        ))}
      </Table>
    </Card>
  );
}

// Simple internal component for the top stats
function StatsWidget({ title, value, color }) {
  const colorMap = {
    blue: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800",
    green:
      "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800",
    indigo:
      "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800",
    gray: "text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700",
  };

  return (
    <Card
      className={`flex flex-col items-center justify-center p-4 border ${colorMap[color]}`}
    >
      <span className="text-2xl font-bold mb-1">{value}</span>
      <span className="text-xs font-medium uppercase tracking-wide opacity-70">
        {title}
      </span>
    </Card>
  );
}
