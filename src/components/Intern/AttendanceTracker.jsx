import { FaClock } from "react-icons/fa";
import { useAttendance } from "../../context/AttendanceContext";
import { useState, useEffect } from "react";

export default function AttendanceTracker() {

  const { attendance, timeIn } = useAttendance();

  const today = new Date().toDateString();

  const todayRecord = attendance.find(
    record => record.date === today
  );

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success"
  });

  const handleTimeIn = () => {
    const success = timeIn();

    if (success) {
      showToast("Time in recorded successfully!", "success");
    } else {
      showToast("You already timed in today!", "error");
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 3000);
  };
  // Calculate live or recorded hours for today
  const [elapsedHours, setElapsedHours] = useState(() => {
    if (!todayRecord) return 0;
    if (todayRecord.timeOut && todayRecord.timeOut !== "----") {
      return Number(todayRecord.hours) || 0;
    }
    if (todayRecord.timeInRaw) {
      const diffMs = Math.max(0, new Date() - new Date(todayRecord.timeInRaw));
      return Number((diffMs / (1000 * 60 * 60)).toFixed(2));
    }
    return 0;
  });

  // Live timer tick if intern has timed in but not yet timed out
  useEffect(() => {
    if (!todayRecord || (todayRecord.timeOut && todayRecord.timeOut !== "----")) {
      if (todayRecord && todayRecord.hours) {
        setElapsedHours(Number(todayRecord.hours) || 0);
      } else {
        setElapsedHours(0);
      }
      return;
    }

    const interval = setInterval(() => {
      if (todayRecord.timeInRaw) {
        const diffMs = Math.max(0, new Date() - new Date(todayRecord.timeInRaw));
        setElapsedHours(Number((diffMs / (1000 * 60 * 60)).toFixed(2)));
      }
    }, 30000); // update every 30s

    return () => clearInterval(interval);
  }, [todayRecord]);

  const REQUIRED_DAILY_HOURS = 8;
  const progressPercent = Math.min(100, Math.round((elapsedHours / REQUIRED_DAILY_HOURS) * 100));

  return (
    <>
      <div className="card attendance-card">

        {/* Card Header */}
        <h3>Attendance Tracker</h3>

        {/* Card Body */}
        <div className="card-body">
          <div className="attendance-body">

            <div className="attendance-left">

              <div className="attendance-row">
                <span className="label">Today:</span>
                <span>{today}</span>
              </div>

              <div className="attendance-row">
                <span className="label">Time in:</span>
                <span>{todayRecord?.timeIn || "—"}</span>
              </div>

              <div className="attendance-row">
                <span className="label">Hours:</span>
                <span>
                  {todayRecord
                    ? `${elapsedHours.toFixed(2)} / ${REQUIRED_DAILY_HOURS} hrs`
                    : "0.00 / 8 hrs"}
                </span>
              </div>

              <div className="attendance-row muted">
                <span className="label">Status:</span>
                <span>
                  {todayRecord
                    ? todayRecord.wasUndertime
                      ? "Undertime"
                      : todayRecord.wasLate
                        ? "Late"
                        : "On Time"
                    : "Not Recorded"}
                </span>
              </div>

              {/* Functional Dynamic Progress Bar */}
              <div className="attendance-progress-container">
                <div 
                  className="attendance-progress-track"
                  title={`${elapsedHours.toFixed(2)} hrs of ${REQUIRED_DAILY_HOURS} hrs required (${progressPercent}%)`}
                >
                  <div
                    className="attendance-progress-fill"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>

            </div>

            <div className="attendance-right">

              <div className="attendance-metric">
                <FaClock />
                <div>
                  <p className="metric-label">Time in</p>
                  <p className="metric-value">
                    {todayRecord?.timeIn || "--"}
                  </p>
                </div>
              </div>

              <button
                className="primary-btn full-width"
                onClick={handleTimeIn}
                disabled={!!todayRecord}
              >
                {todayRecord ? "Timed In" : "Time In"}
              </button>

            </div>

          </div>
        </div>

      </div>

      {/* Floating Toast */}
      {toast.show && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}

    </>
  );
}
