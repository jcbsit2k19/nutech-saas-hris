import DocumentsPage from "@pages/hr-management/contracts-files";
import EmployeeProfile from "@pages/hr-management/contracts-files";
import EmployeeDirectory from "@pages/hr-management/employee-directory";
import OrgStructure from "@pages/hr-management/org-structure";
import AdminDashboard from "@pages/dashboard/admin";
import EmployeeDashboard from "@pages/dashboard/my-portal";
import {
  GoHome,
  GoCreditCard, // Payroll
  GoPeople, // Employees/HR
  GoGlobe, // Company Settings
  GoDatabase, // Master Data
  GoGitBranch, // Org Structure
  GoAlert, // Leave Requests
  GoCheck, // Approvals
  GoGear, // Admin
  GoTools, // Settings
  GoFileDirectory, // Logs/Records
  GoCalendar, // Holidays/Shifts
  GoClock, // Time Tracking
  GoGraph, // Reports
} from "react-icons/go";
import DailyLogsPage from "@pages/attendance/daily-logs";
import LeaveRequestsPage from "@pages/attendance/leave-request";
import ShiftSchedulingPage from "@pages/attendance/shift-scheduling";
import RunPayrollPage from "@pages/payroll/run-payroll";
import PayslipHistoryPage from "@pages/payroll/payslip-history";
import BankReportsPage from "@pages/payroll/bank-reports";
import DepartmentsPage from "@pages/system-setups/departments";
import DesignationsPage from "@pages/system-setups/designations";
import SalaryComponentsPage from "@pages/system-setups/salary-components";
import HolidaysPage from "@pages/system-setups/holidays";
import UserManagementPage from "@pages/system-administration/user-management";
import RolesPermissionsPage from "@pages/system-administration/roles-and-permissions";
import CompanySettingsPage from "@pages/system-administration/company-settings";

export const navRoutes = [
  // =========================================================
  // SECTION 1: DASHBOARD
  // =========================================================
  {
    id: "dashboard",
    title: "Dashboard",
    icon: GoHome,
    menu: [
      {
        id: "admin-overview",
        title: "Admin Overview",
        icon: GoGraph,
        path: "/dashboard/admin",
        element: AdminDashboard,
      },
      {
        id: "employee-portal",
        title: "My Portal (ESS)",
        icon: GoPeople,
        path: "/dashboard/my-portal",
        element: EmployeeDashboard,
      },
    ],
  },

  // =========================================================
  // SECTION 2: HR & EMPLOYEE MANAGEMENT
  // =========================================================
  {
    id: "hr-management",
    title: "HR Management",
    icon: GoPeople,
    menu: [
      {
        id: "employee-directory",
        title: "Employee Directory",
        icon: GoFileDirectory,
        path: "/hr/employees",
        element: EmployeeDirectory, // List of all staff
      },
      {
        id: "org-structure",
        title: "Org Structure",
        icon: GoGitBranch,
        path: "/hr/org-structure",
        element: OrgStructure, // Visual Tree View
      },
      {
        id: "contracts",
        title: "Contracts & Files",
        icon: GoDatabase,
        path: "/hr/contracts",
        element: DocumentsPage,
      },
    ],
  },

  // =========================================================
  // SECTION 3: TIME & ATTENDANCE
  // =========================================================
  {
    id: "attendance",
    title: "Attendance",
    icon: GoClock,
    menu: [
      {
        id: "daily-logs",
        title: "Daily Logs",
        icon: GoFileDirectory,
        path: "/attendance/logs",
        element: DailyLogsPage, // The Master Log Grid
      },
      {
        id: "leave-management",
        title: "Leave Requests",
        icon: GoAlert,
        path: "/attendance/leaves",
        element: LeaveRequestsPage, // Approval Queue
      },
      {
        id: "shift-scheduling",
        title: "Shift Scheduling",
        icon: GoCalendar,
        path: "/attendance/shifts",
        element: ShiftSchedulingPage, // Roster Management
      },
    ],
  },

  // =========================================================
  // SECTION 4: PAYROLL ENGINE
  // =========================================================
  {
    id: "payroll",
    title: "Payroll",
    icon: GoCreditCard,
    menu: [
      {
        id: "process-payroll",
        title: "Run Payroll",
        icon: GoGear,
        path: "/payroll/process",
        element: RunPayrollPage, // The "Wizard" Step-by-step
      },
      {
        id: "payslip-history",
        title: "Payslip History",
        icon: GoFileDirectory,
        path: "/payroll/history",
        element: PayslipHistoryPage,
      },
      {
        id: "bank-advice",
        title: "Bank Reports",
        icon: GoGraph,
        path: "/payroll/bank-reports",
        element: BankReportsPage,
      },
    ],
  },

  // =========================================================
  // SECTION 5: SYSTEM SETUP (Table Maintenance)
  // =========================================================
  {
    id: "setup",
    title: "System Setup",
    icon: GoDatabase,
    menu: [
      {
        id: "departments",
        title: "Departments",
        icon: GoPeople,
        path: "/setup/departments",
        element: DepartmentsPage,
      },
      {
        id: "designations",
        title: "Designations",
        icon: GoTools,
        path: "/setup/designations",
        element: DesignationsPage,
      },
      {
        id: "salary-components",
        title: "Salary Components",
        icon: GoCreditCard,
        path: "/setup/salary-components",
        element: SalaryComponentsPage, // Earnings, Deductions, Tax Rules
      },
      {
        id: "holidays",
        title: "Holidays",
        icon: GoCalendar,
        path: "/setup/holidays",
        element: HolidaysPage,
      },
    ],
  },

  // =========================================================
  // SECTION 6: ADMINISTRATION
  // =========================================================
  {
    id: "administration",
    title: "Administration",
    icon: GoGear,
    menu: [
      {
        id: "users",
        title: "User Management",
        icon: GoPeople,
        path: "/admin/users",
        element: UserManagementPage,
      },
      {
        id: "roles",
        title: "Roles & Permissions",
        icon: GoCheck,
        path: "/admin/roles",
        element: RolesPermissionsPage,
      },
      {
        id: "company-settings",
        title: "Company Settings",
        icon: GoGlobe,
        path: "/admin/settings",
        element: CompanySettingsPage, // Logo, Address, Timezone
      },
    ],
  },
];
