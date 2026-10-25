import { FaClock } from "react-icons/fa";
import { useAttendance } from "../../context/AttendanceContext";
import { useState } from "react";

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
