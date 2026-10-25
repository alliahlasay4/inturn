import { FaCalendarCheck, FaClipboardList, FaStar } from "react-icons/fa";
import "../../styles/dashboard.css";

export default function PerformanceReview() {
  return (
    <div className="card performance-card">
      <h3>Performance Overview</h3>

      <div className="performance-list">
        <div className="performance-item">
          <div className="performance-left">
            <FaCalendarCheck className="performance-icon" />
            <span className="performance-label">Attendance</span>
          </div>

          <div className="performance-stars">
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
          </div>
        </div>

        <div className="performance-item">
          <div className="performance-left">
            <FaClipboardList className="performance-icon" />
            <span className="performance-label">Daily Report</span>
          </div>

          <div className="performance-stars">
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
          </div>
        </div>

        <div className="performance-item overall">
          <FaStar className="overall-star" />
          <span className="overall-text">Overall 10/10</span>
        </div>
      </div>
    </div>
  );
}
