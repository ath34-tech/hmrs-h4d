import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

import DashboardLayout from "../components/layout/DashboardLayout";

/* PAGES */
import Dashboard from "../pages/dashboard/Dashboard";
import EmployeeList from "../pages/employees/EmployeeList";
import EmployeeForm from "../pages/employees/EmployeeForm";
import EmployeeDetail from "../pages/employees/EmployeeDetail";
import AttendanceList from "../pages/attendance/AttendanceList";
import AttendanceForm from "../pages/attendance/AttendanceForm";
import LeaveForm from "../pages/leaves/LeaveForm";
import LeaveList from "../pages/leaves/LeaveList";
import GrievanceList from "../pages/grievances/GrievanceList";
import GrievanceForm from "../pages/grievances/GrievanceForm";
import GrievanceDetail from "../pages/grievances/GrievanceDetail";
import TransferForm from "../pages/transfers/TransferForm";
import TransferList from "../pages/transfers/TransferList";
import PayrollCycles from "../pages/payroll/PayrollCycles";
import PayslipList from "../pages/payroll/PayslipList";
import PayrollGenerate from "../pages/payroll/PayrollGenerate";
import ReportsDashboard from "../pages/reports/ReportsDashboard";
export default function Router() {
  return (
    <Routes>
      {/* -------- PUBLIC -------- */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />

      <Route path="/" element={<Navigate to="/login" />} />

      {/* -------- PROTECTED (ADMIN) -------- */}
      <Route
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employees/new" element={<EmployeeForm />} />
        <Route path="/employees/:id/edit" element={<EmployeeForm />} />
        <Route path="/employees/:id" element={<EmployeeDetail />} />
        <Route path="/attendance" element={<AttendanceList />} />
<Route path="/attendance/new" element={<AttendanceForm />} />
<Route path="/attendance/:id/edit" element={<AttendanceForm />} />
<Route path="/leaves" element={<LeaveList />} />
<Route path="/leaves/new" element={<LeaveForm />} />
<Route path="/grievances" element={<GrievanceList />} />
<Route path="/grievances/new" element={<GrievanceForm />} />
<Route path="/grievances/:id" element={<GrievanceDetail />} />
<Route path="/transfers" element={<TransferList />} />
<Route path="/transfers/new" element={<TransferForm />} />
<Route path="/payroll" element={<PayrollCycles />} />
<Route path="/payroll/:cycleId" element={<PayslipList />} />
<Route path="/payroll/:cycleId/generate" element={<PayrollGenerate />} />
<Route path="/reports" element={<ReportsDashboard />} />

      </Route>

      {/* -------- FALLBACK -------- */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}
