import { NavLink } from "react-router-dom";
import {
  HiOutlineViewGrid,
  HiOutlineDocumentText,
  HiOutlineFolder,
  HiOutlineCalendar,
} from "react-icons/hi";

export default function Sidebar({ sidebarOpen }) {
  return (
    <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          <li>
            <NavLink
              to="/intern"
              end
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <HiOutlineViewGrid className="sidebar-icon" />
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/intern/reports"
              end
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <HiOutlineDocumentText className="sidebar-icon" />
              <span>Reports</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/intern/documents"
              end
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <HiOutlineFolder className="sidebar-icon" />
              <span>Documents</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/intern/attendance"
              end
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <HiOutlineCalendar className="sidebar-icon" />
              <span>Attendance</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
