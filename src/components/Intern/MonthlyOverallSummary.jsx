import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useAttendance } from "../../context/AttendanceContext";

import {
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaArrowDown,
  FaUserClock
} from "react-icons/fa";

export default function MonthlyOverallSummary({
  hours,
  late,
  absent,
  ontime,
  undertime
}) {
  const { attendance } = useAttendance();
  const handleDownloadDTR = () => {
    const doc = new jsPDF({ orientation: "landscape" });

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    // 🔹 Filter + sort monthly records
    const monthlyRecords = attendance
      .filter(record => {
        const d = new Date(record.date);
        return d.getMonth() === month && d.getFullYear() === year;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    if (monthlyRecords.length === 0) {
      alert("No attendance records for this month.");
      return;
    }

    // 🔹 Compute totals
    const totalHours = monthlyRecords.reduce(
      (sum, r) => sum + (Number(r.hours) || 0),
      0
    );

    const REQUIRED_HOURS = 600;
    const remainingHours = REQUIRED_HOURS - totalHours;

    // 🔹 Header Section
    doc.setFontSize(18);
    doc.text("DAILY TIME RECORD (DTR)", 14, 20);

    doc.setFontSize(12);
    doc.text(`Intern Name: ___________________________`, 14, 30);
    doc.text(`Company Name: ___________________________`, 14, 38);
    doc.text(
      `Month: ${today.toLocaleString("default", { month: "long" })} ${year}`,
      14,
      46
    );

    // 🔹 Table Data
    const tableData = monthlyRecords.map(record => [
      record.date,
      record.timeIn,
      record.timeOut,
      record.hours,
      record.wasUndertime
        ? "Undertime"
        : record.wasLate
          ? "Late"
          : "On Time"
    ]);

    autoTable(doc, {
      startY: 55,
      head: [["Date", "Time In", "Time Out", "Hours Rendered", "Status"]],
      body: tableData,
      theme: "grid",
      styles: {
        fontSize: 10
      },
      headStyles: {
        fillColor: [41, 128, 185]
      }
    });

    const finalY = doc.lastAutoTable.finalY + 15;

    // 🔹 Summary Section
    doc.setFontSize(12);
    doc.text(`Total Hours Rendered: ${totalHours}`, 14, finalY);
    doc.text(`Required OJT Hours: ${REQUIRED_HOURS}`, 14, finalY + 8);
    doc.text(`Remaining Hours: ${remainingHours}`, 14, finalY + 16);

    // 🔹 Signature Section
    const signatureY = finalY + 35;

    doc.text("Prepared by:", 14, signatureY);
    doc.line(14, signatureY + 10, 90, signatureY + 10);
    doc.text("Intern Signature", 14, signatureY + 18);

    doc.text("Approved by:", 150, signatureY);
    doc.line(150, signatureY + 10, 230, signatureY + 10);
    doc.text("Supervisor Signature", 150, signatureY + 18);

    doc.save(`DTR_${year}_${month + 1}.pdf`);
  };
  return (
    <div className="monthly-overall-summary card">

      {/* HEADER */}
      <div className="overall-header">
        <div className="header-left">
          <h3>Overall Summary</h3>

          <select className="year-select">
            <option>2026</option>
            <option>2025</option>
          </select>
        </div>

        <button className="download-btn" onClick={handleDownloadDTR}>
          ⬇ Download DTR
        </button>
      </div>

      {/* CARDS BELOW HEADER */}
      <div className="monthly-cards">

        <div className="summary-card total">
          <div className="card-icon"><FaClock /></div>
          <p>Total Hours</p>
          <h3>{hours} / 600</h3>
        </div>

        <div className="summary-card present">
          <div className="card-icon"><FaCheckCircle /></div>
          <p>Present Days</p>
          <h3>{ontime} / 75</h3>
        </div>

        <div className="summary-card late">
          <div className="card-icon"><FaUserClock /></div>
          <p>Late Days</p>
          <h3>{late}</h3>
        </div>

        <div className="summary-card absent">
          <div className="card-icon"><FaExclamationTriangle /></div>
          <p>Absent Days</p>
          <h3>{absent}</h3>
        </div>

        <div className="summary-card undertime">
          <div className="card-icon"><FaArrowDown /></div>
          <p>Undertime</p>
          <h3>{undertime || 0}</h3>
        </div>

      </div>

    </div>
  );
}