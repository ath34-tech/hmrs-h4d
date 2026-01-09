import { NavLink } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      {/* HEADER */}
      <div className="sidebar-header">
        <h2>MCD HRMS</h2>
        <span>Admin Panel</span>
      </div>

      {/* MENU */}
      <ul className="sidebar-menu">
        <SidebarItem to="/dashboard" label="Dashboard" />
        <SidebarItem to="/employees" label="Employees" />
        <SidebarItem to="/attendance" label="Attendance" />
        <SidebarItem to="/leaves" label="Leave Management" />
        <SidebarItem to="/grievances" label="Grievances" />
        <SidebarItem to="/transfers" label="Transfers" />
        <SidebarItem to="/payroll" label="Payroll" />
        <SidebarItem to="/reports" label="Reports" />
      </ul>

      {/* FOOTER */}
      <div className="sidebar-footer">
        <button className="logout-btn">Logout</button>
      </div>
    </div>
  );
}

/* ===== SIDEBAR ITEM ===== */
function SidebarItem({ to, label }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive ? "sidebar-link active" : "sidebar-link"
        }
      >
        {label}
      </NavLink>
    </li>
  );
}
