import React, { useState, useEffect } from "react";
import { Table, TableRow, TableData } from "@components/tables/table";
import {
  GoCreditCard,
  GoPlus,
  GoPencil,
  GoTrash,
  GoGraph,
  GoShieldCheck,
} from "react-icons/go";
import Button from "@components/buttons/button";
import IconButton from "@components/buttons/icon-button";
import Card from "@components/containers/card";

// --- 1. Visual Helpers ---

const TypeBadge = ({ type }) => {
  const isEarning = type === "Earning";
  return (
    <span
      className={`px-2 py-1 text-[10px] uppercase font-bold rounded border ${
        isEarning
          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
          : "bg-rose-50 text-rose-700 border-rose-200"
      }`}
    >
      {type}
    </span>
  );
};

const TaxBadge = ({ isTaxable }) => {
  return isTaxable ? (
    <span className="flex items-center gap-1 text-[10px] font-medium text-slate-600 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">
      Taxable
    </span>
  ) : (
    <span className="flex items-center gap-1 text-[10px] font-medium text-slate-400 bg-transparent border border-slate-200 px-1.5 py-0.5 rounded border-dashed">
      <GoShieldCheck /> Exempt
    </span>
  );
};

// --- 2. Main Component ---

export default function SalaryComponentsPage() {
  const [loading, setLoading] = useState(true);
  const [components, setComponents] = useState([]);
  const [displayComponents, setDisplayComponents] = useState([]);

  // Columns
  const columns = [
    "Component Name",
    "Type",
    "Calculation",
    "Tax Status",
    "Status",
    "Actions",
  ];

  // Mock API Call
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {
          id: "SC-001",
          name: "Basic Salary",
          type: "Earning",
          calculation: "Fixed Amount", // User inputs a flat number
          isTaxable: true,
          status: "Active",
          description: "Base pay for the employee",
        },
        {
          id: "SC-002",
          name: "HRA (House Rent)",
          type: "Earning",
          calculation: "50% of Basic", // Formula based
          isTaxable: true,
          status: "Active",
          description: "Allowance for housing expenses",
        },
        {
          id: "SC-003",
          name: "Transport Allowance",
          type: "Earning",
          calculation: "Fixed Amount",
          isTaxable: false, // Non-taxable example
          status: "Active",
          description: "Commute reimbursement",
        },
        {
          id: "SC-004",
          name: "Provident Fund (PF)",
          type: "Deduction",
          calculation: "12% of Basic",
          isTaxable: false, // Pre-tax deduction
          status: "Active",
          description: "Retirement savings contribution",
        },
        {
          id: "SC-005",
          name: "Professional Tax",
          type: "Deduction",
          calculation: "Fixed Amount",
          isTaxable: false,
          status: "Active",
          description: "State government tax",
        },
      ];
      setComponents(mockData);
      setLoading(false);
    }, 800);
  }, []);

  // CRUD Actions
  const handleEdit = (item) => {
    console.log("Edit:", item.name);
  };

  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure? This will remove it from future payrolls.")
    ) {
      console.log("Delete ID:", id);
    }
  };

  return (
    <Card className="p-2 space-y-2 min-h-screen">
      <div className="space-y-4 mb-2">
        <div className="">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Salary Components
          </h1>
          <p className="text-sm text-slate-500">
            Define earnings, deductions, and tax rules.
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <Button icon={GoPlus} color="green">
            Add Component
          </Button>
        </div>
      </div>

      {/* --- Data Table --- */}
      <Table
        title="Payroll Rules"
        description="Active components used in salary processing."
        columns={columns}
        data={components}
        setData={setDisplayComponents}
        loading={loading}
      >
        {displayComponents.map((comp, index) => (
          <TableRow key={comp.id} row={index}>
            {/* 1. Name & Desc */}
            <TableData>
              <div>
                <p className="font-bold text-slate-700 dark:text-slate-200">
                  {comp.name}
                </p>
                <p className="text-xs text-slate-400">{comp.description}</p>
              </div>
            </TableData>

            {/* 2. Type (Earning/Deduction) */}
            <TableData>
              <TypeBadge type={comp.type} />
            </TableData>

            {/* 3. Calculation Method */}
            <TableData>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                <GoGraph className="text-indigo-500" />
                <span className="font-mono">{comp.calculation}</span>
              </div>
            </TableData>

            {/* 4. Tax Status */}
            <TableData>
              <TaxBadge isTaxable={comp.isTaxable} />
            </TableData>

            {/* 5. Status */}
            <TableData>
              <span className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full border border-slate-200 dark:border-slate-600">
                {comp.status}
              </span>
            </TableData>

            {/* 6. Actions */}
            <TableData>
              <div className="flex items-center gap-2">
                <IconButton
                  icon={GoPencil}
                  tooltip={"Edit Rule"}
                  theme="blue"
                  onClick={() => handleEdit(comp)}
                />
                <IconButton
                  icon={GoTrash}
                  tooltip={"Delete Rule"}
                  theme="red"
                  onClick={() => handleDelete(comp.id)}
                />
              </div>
            </TableData>
          </TableRow>
        ))}
      </Table>
    </Card>
  );
}
