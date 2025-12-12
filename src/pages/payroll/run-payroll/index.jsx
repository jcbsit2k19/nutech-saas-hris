import React, { useState } from "react";
import { Table, TableRow, TableData } from "@components/tables/table";
import {
  GoCheck,
  GoArrowRight,
  GoAlert,
  GoCreditCard,
  GoDatabase,
  GoDownload,
  GoSync,
  GoArrowLeft,
} from "react-icons/go";
import Button from "@components/buttons/button";
import Card from "@components/containers/card";
import TextInput from "@components/textinputs/textinput";

// --- 1. Sub-Components for the Wizard (Stepper) ---

const Stepper = ({ currentStep, steps }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => {
        const stepNum = index + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;

        return (
          <div key={step} className="flex items-center">
            {/* Circle */}
            <div
              className={`
              w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all
              ${
                isActive
                  ? "bg-indigo-600 text-white ring-4 ring-indigo-100"
                  : ""
              }
              ${isCompleted ? "bg-green-500 text-white" : ""}
              ${!isActive && !isCompleted ? "bg-slate-200 text-slate-500" : ""}
            `}
            >
              {isCompleted ? <GoCheck /> : stepNum}
            </div>

            {/* Label */}
            <span
              className={`ml-2 text-sm font-medium hidden sm:block ${
                isActive ? "text-indigo-700" : "text-slate-500"
              }`}
            >
              {step}
            </span>

            {/* Connector Line (except for last item) */}
            {index < steps.length - 1 && (
              <div
                className={`w-12 h-1 mx-4 rounded ${
                  isCompleted ? "bg-green-500" : "bg-slate-200"
                }`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// --- 2. Main Page Component ---

export default function RunPayrollPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [payrollData, setPayrollData] = useState([]);
  const [displayData, setDisplayData] = useState([]); // For table pagination

  // Form State
  const [payPeriod, setPayPeriod] = useState({
    month: "October",
    year: "2023",
  });

  const steps = ["Configuration", "Validation", "Review & Adjust", "Finalize"];

  // Mock Columns for Step 3
  const reviewColumns = [
    "Employee",
    "Basic Pay",
    "Allowances",
    "Deductions",
    "Bonus (Adhoc)",
    "Net Salary",
  ];

  // Mock Fetch Logic
  const fetchPayrollPreview = () => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          name: "Alice Johnson",
          role: "Manager",
          basic: 5000,
          allowances: 1200,
          deductions: 300,
          bonus: 0,
          net: 5900,
          avatar: "https://i.pravatar.cc/150?u=1",
        },
        {
          id: 2,
          name: "Mark Smith",
          role: "Support",
          basic: 3000,
          allowances: 500,
          deductions: 150,
          bonus: 0,
          net: 3350,
          avatar: "https://i.pravatar.cc/150?u=2",
        },
        {
          id: 3,
          name: "Sarah Connor",
          role: "Security",
          basic: 2500,
          allowances: 200,
          deductions: 100,
          bonus: 50,
          net: 2650,
          avatar: "https://i.pravatar.cc/150?u=3",
        },
      ];
      setPayrollData(mockData);
      setLoading(false);
    }, 1500);
  };

  // Handle Input Change in Table (Step 3)
  const handleBonusChange = (id, val) => {
    const newVal = parseFloat(val) || 0;
    const updated = payrollData.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          bonus: newVal,
          net: item.basic + item.allowances + newVal - item.deductions,
        };
      }
      return item;
    });
    setPayrollData(updated);
  };

  // --- Step Rendering Logic ---

  const renderStepContent = () => {
    switch (currentStep) {
      // STEP 1: CONFIGURATION
      case 1:
        return (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-full max-w-lg">
              <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600 text-3xl">
                <GoDatabase />
              </div>
              <h2 className="text-xl font-bold text-center text-slate-800 dark:text-white mb-2">
                Select Pay Period
              </h2>
              <p className="text-slate-500 text-center mb-8">
                Choose the month and year to process salary.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-left">
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                    Month
                  </label>
                  {/* Styled to match your PayslipHistoryPage selects */}
                  <select
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-md focus:ring-indigo-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white outline-none"
                    value={payPeriod.month}
                    onChange={(e) =>
                      setPayPeriod({ ...payPeriod, month: e.target.value })
                    }
                  >
                    <option>October</option>
                    <option>November</option>
                    <option>December</option>
                  </select>
                </div>
                <div className="text-left">
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                    Year
                  </label>
                  <select
                    className="w-full px-3 py-2.5 text-sm border border-slate-300 rounded-md focus:ring-indigo-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white outline-none"
                    value={payPeriod.year}
                    onChange={(e) =>
                      setPayPeriod({ ...payPeriod, year: e.target.value })
                    }
                  >
                    <option>2023</option>
                    <option>2024</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      // STEP 2: VALIDATION
      case 2:
        return (
          <div className="space-y-4 py-4">
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg flex items-start gap-3">
              <GoCheck className="text-green-600 mt-1 text-lg" />
              <div>
                <h4 className="font-bold text-green-800">
                  Attendance Data Ready
                </h4>
                <p className="text-sm text-green-700">
                  All biometric logs for this period have been synchronized.
                </p>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex items-start gap-3">
              <GoAlert className="text-amber-600 mt-1 text-lg" />
              <div>
                <h4 className="font-bold text-amber-800">
                  Pending Leave Requests (2)
                </h4>
                <p className="text-sm text-amber-700">
                  There are 2 pending leave requests. Approving them might
                  affect payroll calculation.
                </p>
                <button className="text-xs font-bold underline mt-1 text-amber-900">
                  Resolve Now
                </button>
              </div>
            </div>
          </div>
        );

      // STEP 3: REVIEW & ADJUST
      case 3:
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-700 dark:text-white">
                Salary Preview
              </h3>
              <div className="text-right">
                <p className="text-xs text-slate-500">Total Net Payable</p>
                <p className="text-2xl font-bold text-indigo-600">$11,900.00</p>
              </div>
            </div>

            <Table
              title=""
              description=""
              columns={reviewColumns}
              data={payrollData}
              setData={setDisplayData}
              loading={loading}
            >
              {displayData.map((row, index) => (
                <TableRow key={row.id} row={index}>
                  {/* Employee */}
                  <TableData>
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium text-slate-700 dark:text-slate-200">
                          {row.name}
                        </p>
                        <p className="text-[10px] text-slate-400">{row.role}</p>
                      </div>
                    </div>
                  </TableData>

                  {/* Basic */}
                  <TableData>
                    <span className="text-slate-600">${row.basic}</span>
                  </TableData>

                  {/* Allowances */}
                  <TableData>
                    <span className="text-green-600">+${row.allowances}</span>
                  </TableData>

                  {/* Deductions */}
                  <TableData>
                    <span className="text-red-500">-${row.deductions}</span>
                  </TableData>

                  {/* Editable Bonus Input */}
                  <TableData>
                    {/* Visual match for TextInput, but simpler for table cell */}
                    <input
                      type="number"
                      className="w-24 px-3 py-2 text-sm border border-slate-300 rounded-md focus:ring-indigo-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white outline-none transition"
                      value={row.bonus}
                      onChange={(e) =>
                        handleBonusChange(row.id, e.target.value)
                      }
                    />
                  </TableData>

                  {/* Net Pay */}
                  <TableData>
                    <span className="font-bold text-slate-800 dark:text-white">
                      ${row.net}
                    </span>
                  </TableData>
                </TableRow>
              ))}
            </Table>
          </div>
        );

      // STEP 4: FINALIZE
      case 4:
        return (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <GoCheck className="text-green-600 text-4xl" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
              Payroll Processed!
            </h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">
              Payroll for <strong>October 2023</strong> has been finalized.
              Payslips have been generated and queued for email delivery.
            </p>

            <div className="flex justify-center gap-4">
              <Button icon={GoDownload} color={"gray"}>
                Bank Advice (CSV)
              </Button>
              <Button icon={GoCreditCard} color={"blue"}>
                View Reports
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // --- Navigation Handlers ---

  const handleNext = () => {
    if (currentStep === 1) {
      // Simulate checking data
      fetchPayrollPreview();
    }
    if (currentStep < 4) setCurrentStep((c) => c + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((c) => c - 1);
  };

  return (
    <Card className="p-2 space-y-2">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
          Run Payroll
        </h1>
        <p className="text-sm text-slate-500">
          Calculate salaries, review reports, and generate payslips.
        </p>
      </div>

      {/* The Stepper UI */}
      <Stepper currentStep={currentStep} steps={steps} />

      {/* Main Content Area - Wrapped in Card */}
      <Card className="p-6 mb-6 min-h-[400px] flex flex-col justify-between">
        {loading ? (
          <div className="flex flex-col items-center justify-center flex-grow text-slate-400 py-20">
            <GoSync className="animate-spin text-3xl mb-2" />
            <p>Calculating Payroll Data...</p>
          </div>
        ) : (
          <div className="grow">{renderStepContent()}</div>
        )}

        {/* Footer Navigation Buttons (Inside Card) */}
        {currentStep !== 4 && !loading && (
          <div className="flex justify-between mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
            <Button
              icon={GoArrowLeft}
              color={"white"}
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Back
            </Button>
            <Button icon={GoArrowRight} color={"blue"} onClick={handleNext}>
              {currentStep === 3 ? "Process & Finish" : "Next Step"}{" "}
            </Button>
          </div>
        )}
      </Card>
    </Card>
  );
}
