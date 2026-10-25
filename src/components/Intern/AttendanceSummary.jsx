import { useAttendance } from "../../context/AttendanceContext";

export default function AttendanceSummary() {

  const { attendance } = useAttendance();

  const present = attendance.filter(a => a.status === "ontime").length;
  const late = attendance.filter(a => a.status === "late").length;
  const absent = attendance.filter(a => a.status === "absent").length;

  const totalHours = attendance.reduce((sum, record) => {
    return sum + (record.hours || 0);
  }, 0);

  return (
    <div className="card attendance-summary-card">
      <div>
        <h4>Present</h4>
        <p>{present} days</p>
      </div>

      <div>
        <h4>Late</h4>
        <p>{late} day{late !== 1 && "s"}</p>
      </div>

      <div>
        <h4>Absent</h4>
        <p>{absent}</p>
      </div>

      <div>
        <h4>Total Rendered</h4>
        <p>{totalHours.toFixed(2)} hrs</p>
      </div>
    </div>
  );
}
