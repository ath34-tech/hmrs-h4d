import { useEffect, useState } from "react";
import "./dashboard.css";

import {
  getDashboardStats,
  getEmployeeRoleDistribution,
  getAttendanceTrend,
} from "../../services/dashboardService";

import { useNavigate } from "react-router-dom";
import { canPerform } from "../../utils/access";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

/* ===== COLORS ===== */
const COLORS = ["#2563eb", "#60a5fa", "#93c5fd", "#1e40af", "#3b82f6"];

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [roleData, setRoleData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // 🔑 Normalize role (THIS FIXES HR ISSUE)
  const role = localStorage.getItem("role")?.toLowerCase().trim();

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [statsRes, roleDistribution, attendanceTrend] =
        await Promise.all([
          getDashboardStats(),
          getEmployeeRoleDistribution(),
          getAttendanceTrend(7),
        ]);

      setStats(statsRes);

      setRoleData(
        Object.entries(roleDistribution).map(([r, count]) => ({
          name: r,
          value: count,
        }))
      );

      setAttendanceData(
        Object.entries(attendanceTrend)
          .map(([date, count]) => ({ date, count }))
          .sort((a, b) => new Date(a.date) - new Date(b.date))
      );
    } catch (err) {
      console.error("Dashboard load failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-main">

        {/* ================= HEADER ================= */}
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>System overview and analytics</p>
        </div>

        {/* ================= STATS (ADMIN + HR) ================= */}
        {(role === "admin" || role === "hr") && (
          <div className="stats-grid">
            <StatCard title="Total Employees" value={loading ? "—" : stats?.totalEmployees} />
            <StatCard title="Active Employees" value={loading ? "—" : stats?.activeEmployees} />
            <StatCard title="Pending Leaves" value={loading ? "—" : stats?.pendingLeaves} />
            <StatCard title="Open Grievances" value={loading ? "—" : stats?.openGrievances} />
            <StatCard title="Pending Transfers" value={loading ? "—" : stats?.pendingTransfers} />
          </div>
        )}

        {/* ================= QUICK ACTIONS ================= */}
        <div className="quick-actions">
          <h3>Quick Actions</h3>

          <div className="quick-actions-grid">

            {canPerform("employee", "create") && (
              <button
                className="quick-action-btn"
                onClick={() => navigate("/employees/new")}
              >
                Add Employee
              </button>
            )}

            {(role === "admin" || role === "hr") && (
              <button
                className="quick-action-btn"
                onClick={() => navigate("/employees")}
              >
                View Employees
              </button>
            )}

            {canPerform("leave", "approve") && (
              <button
                className="quick-action-btn"
                onClick={() => navigate("/leaves")}
              >
                Approve Leaves
              </button>
            )}

            {(role === "admin" || role === "hr" || role === "supervisor") && (
              <button
                className="quick-action-btn"
                onClick={() => navigate("/grievances")}
              >
                View Grievances
              </button>
            )}

            {canPerform("transfer", "approve") && (
              <button
                className="quick-action-btn"
                onClick={() => navigate("/transfers")}
              >
                Transfer Requests
              </button>
            )}

          </div>
        </div>

        {/* ================= CHARTS ================= */}
        <div className="charts-grid">

          {/* EMPLOYEE DISTRIBUTION → ADMIN + HR */}
          {(role === "admin" || role === "hr") && (
            <div className="chart-card">
              <h3>Employee Distribution by Role</h3>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={roleData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={100}
                  >
                    {roleData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* ATTENDANCE TREND → ALL ROLES */}
          <div className="chart-card">
            <h3>Attendance Trend (Last 7 Days)</h3>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#2563eb"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENT ================= */

function StatCard({ title, value }) {
  return (
    <div className="stat-card">
      <div className="stat-title">{title}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}
