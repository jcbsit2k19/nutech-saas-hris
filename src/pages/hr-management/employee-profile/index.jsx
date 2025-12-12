import React, { useState } from "react";
// Icons
import {
  FiUser,
  FiBriefcase,
  FiDollarSign,
  FiFileText,
  FiPhone,
  FiMail,
  FiMapPin,
  FiCalendar,
  FiUploadCloud,
  FiTrash2,
  FiDownload,
  FiEdit2,
} from "react-icons/fi";

// Your Components
import Card from "@components/containers/card"; // Adjust path

export default function EmployeeProfile() {
  const [activeTab, setActiveTab] = useState("personal");

  // --- Mock Employee Data ---
  const employee = {
    id: 1,
    name: "Sarah Connor",
    role: "Product Manager",
    dept: "Product",
    avatar: "https://i.pravatar.cc/150?u=1",
    email: "sarah@company.com",
    phone: "+1 (555) 123-4567",
    location: "Los Angeles, CA",
    status: "Active",
    // Personal
    dob: "1985-05-12",
    address: "123 Skynet Blvd, Tech District, LA",
    emergencyContact: "Kyle Reese (+1 555 987 6543)",
    // Job
    doj: "2020-08-15",
    manager: "John Henry",
    empType: "Full-Time",
    // Financial
    bankName: "Cyberdyne Systems Bank",
    accountNo: "**** **** **** 8899",
    taxId: "TX-9988-7766",
    salary: "$120,000 / yr",
  };

  // Mock Documents for this specific user
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Employment Contract.pdf",
      size: "2.4 MB",
      date: "Aug 20, 2020",
    },
    { id: 2, name: "Passport_Copy.jpg", size: "1.1 MB", date: "Aug 18, 2020" },
    { id: 3, name: "Tax_Form_W2.pdf", size: "800 KB", date: "Jan 10, 2024" },
  ]);

  return (
    <div className="p-6 min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      {/* --- 1. Profile Header Card --- */}
      <div className="mb-6">
        <Card className="bg-white dark:bg-slate-800 p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            {/* Avatar */}
            <img
              src={employee.avatar}
              alt={employee.name}
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-slate-100 dark:border-slate-700 object-cover"
            />

            {/* Main Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                    {employee.name}
                  </h1>
                  <p className="text-indigo-600 dark:text-indigo-400 font-medium">
                    {employee.role} • {employee.dept}
                  </p>
                </div>
                <div className="mt-4 md:mt-0 flex gap-3">
                  <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md transition">
                    Edit Profile
                  </button>
                  <span className="px-3 py-2 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-md text-sm font-bold border border-emerald-200 dark:border-emerald-800">
                    {employee.status}
                  </span>
                </div>
              </div>

              {/* Quick Contact Bar */}
              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <FiMail /> {employee.email}
                </span>
                <span className="flex items-center gap-1">
                  <FiPhone /> {employee.phone}
                </span>
                <span className="flex items-center gap-1">
                  <FiMapPin /> {employee.location}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* --- 2. Tabs Navigation --- */}
      <div className="flex overflow-x-auto gap-2 mb-6 border-b border-slate-200 dark:border-slate-700 pb-1">
        <TabButton
          active={activeTab === "personal"}
          onClick={() => setActiveTab("personal")}
          icon={FiUser}
          label="Personal Info"
        />
        <TabButton
          active={activeTab === "job"}
          onClick={() => setActiveTab("job")}
          icon={FiBriefcase}
          label="Job Details"
        />
        <TabButton
          active={activeTab === "financial"}
          onClick={() => setActiveTab("financial")}
          icon={FiDollarSign}
          label="Financial"
        />
        <TabButton
          active={activeTab === "documents"}
          onClick={() => setActiveTab("documents")}
          icon={FiFileText}
          label="Documents"
        />
      </div>

      {/* --- 3. Content Sections --- */}
      <div className="animate-in fade-in zoom-in duration-300">
        {/* PERSONAL INFO TAB */}
        {activeTab === "personal" && (
          <Card title="Personal Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoField label="Full Name" value={employee.name} />
              <InfoField
                label="Date of Birth"
                value={employee.dob}
                icon={FiCalendar}
              />
              <InfoField label="Gender" value="Female" />
              <InfoField label="Marital Status" value="Single" />
              <InfoField label="Nationality" value="American" />
              <InfoField
                label="Personal Email"
                value="sarah.connor.personal@email.com"
              />
              <div className="md:col-span-2">
                <InfoField
                  label="Current Address"
                  value={employee.address}
                  icon={FiMapPin}
                />
              </div>
              <div className="md:col-span-2">
                <InfoField
                  label="Emergency Contact"
                  value={employee.emergencyContact}
                  isHighlighted
                />
              </div>
            </div>
          </Card>
        )}

        {/* JOB DETAILS TAB */}
        {activeTab === "job" && (
          <Card title="Employment Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoField
                label="Employee ID"
                value={`EMP-${employee.id.toString().padStart(3, "0")}`}
              />
              <InfoField
                label="Date of Joining"
                value={employee.doj}
                icon={FiCalendar}
              />
              <InfoField label="Designation" value={employee.role} />
              <InfoField label="Department" value={employee.dept} />
              <InfoField label="Reporting Manager" value={employee.manager} />
              <InfoField label="Employment Type" value={employee.empType} />
              <InfoField label="Work Location" value="Headquarters (LA)" />
              <InfoField label="Work Shift" value="General (9AM - 6PM)" />
            </div>
          </Card>
        )}

        {/* FINANCIAL TAB */}
        {activeTab === "financial" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Bank Account Details">
              <div className="space-y-4">
                <InfoField label="Bank Name" value={employee.bankName} />
                <InfoField label="Account Holder" value={employee.name} />
                <InfoField label="Account Number" value={employee.accountNo} />
                <InfoField label="IFSC / Swift Code" value="CYB000212" />
              </div>
            </Card>
            <Card title="Tax & Compensation">
              <div className="space-y-4">
                <InfoField
                  label="Tax Payer ID (SSN/PAN)"
                  value={employee.taxId}
                />
                <InfoField label="Payment Method" value="Direct Deposit" />
                <InfoField label="Basic Salary" value={employee.salary} />
              </div>
            </Card>
          </div>
        )}

        {/* DOCUMENTS TAB */}
        {activeTab === "documents" && (
          <Card title="Employee Documents">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-slate-500">
                Legal contracts and identification proofs.
              </p>
              <button className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                <FiUploadCloud /> Upload Document
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded text-slate-500">
                      <FiFileText />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                        {doc.name}
                      </p>
                      <p className="text-xs text-slate-400">
                        {doc.size} • {doc.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-400 hover:text-blue-500 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20">
                      <FiDownload />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-500 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20">
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

// --- Helper Components ---

// 1. Tab Button
function TabButton({ active, onClick, icon: Icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2
        ${
          active
            ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
            : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:border-slate-300"
        }
      `}
    >
      <Icon className={active ? "text-indigo-600" : ""} />
      {label}
    </button>
  );
}

// 2. Info Field (Row for details)
function InfoField({ label, value, icon: Icon, isHighlighted }) {
  return (
    <div
      className={`p-3 rounded-md border ${
        isHighlighted
          ? "bg-red-50 border-red-100 dark:bg-red-900/10 dark:border-red-900/30"
          : "border-transparent"
      }`}
    >
      <p className="text-xs text-slate-400 mb-1 flex items-center gap-1">
        {Icon && <Icon className="w-3 h-3" />} {label}
      </p>
      <p
        className={`font-medium ${
          isHighlighted
            ? "text-red-700 dark:text-red-400"
            : "text-slate-700 dark:text-slate-200"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
