import { NavLink } from "react-router-dom";

import {
  FaTachometerAlt,
  FaFileAlt,
  FaFolderOpen,
  FaClock,
} from "react-icons/fa";

export default function Sidebar({ sidebarOpen }) {

  return (
    <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      <ul className="sidebar-menu">

        <li>
          <NavLink
            to="/intern"
            end
            className={({ isActive }) => isActive ? "active-link" : ""}
          >
            <FaTachometerAlt />
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/intern/reports"
            end
            className={({ isActive }) => isActive ? "active-link" : ""}
          >
            <FaFileAlt />
            <span>Reports</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/intern/documents"
            end
            className={({ isActive }) => isActive ? "active-link" : ""}
          >
            <FaFolderOpen />
            <span>Documents</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/intern/attendance"
            end
            className={({ isActive }) => isActive ? "active-link" : ""}
          >
            <FaClock />
            <span>Attendance</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}
