import { createContext, useContext, useState, useEffect } from "react";

const REQUIRED_HOURS = 8;

const AttendanceContext = createContext();

export const useAttendance = () => useContext(AttendanceContext);

export const AttendanceProvider = ({ children }) => {


  const [attendance, setAttendance] = useState(() => {
    const stored = localStorage.getItem("attendance");
    if (!stored) return [];

    const parsed = JSON.parse(stored);

    return parsed.map(record => {
      // If already migrated, keep as-is
      if ("wasLate" in record) return record;

      // Convert old status model
      return {
        ...record,
        wasLate: record.status === "late",
        wasUndertime: record.status === "undertime"
      };
    });
  });

  useEffect(() => {
    localStorage.setItem("attendance", JSON.stringify(attendance));
  }, [attendance]);

  // ✅ TIME IN
  const timeIn = () => {
    const today = new Date().toDateString();

    const alreadyTimedIn = attendance.find(a => a.date === today);
    if (alreadyTimedIn) return false;

    const now = new Date();

    const cutoff = new Date(now);
    cutoff.setHours(9, 0, 0, 0);

    const isLate = now > cutoff;

    const newRecord = {
      date: today,
      timeIn: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      timeInRaw: now.toISOString(),
      timeOut: "----",
      hours: 0,
      wasLate: isLate,
      wasUndertime: false
    };

    setAttendance(prev => [newRecord, ...prev]);
    return true;
  };

  // ✅ TIME OUT
  const timeOut = () => {
    const today = new Date().toDateString();

    const recordIndex = attendance.findIndex(a => a.date === today);
    if (recordIndex === -1) return false;

    const record = attendance[recordIndex];
    if (record.timeOut !== "----") return false;

    const now = new Date();

    const timeInSource = new Date(record.timeInRaw);
    if (isNaN(timeInSource.getTime())) return false;



    const diffMs = now - timeInSource;

    const diffHours = diffMs / (1000 * 60 * 60);

    const wasUndertime = diffHours < REQUIRED_HOURS;

    const updatedRecord = {
      ...record,
      timeOut: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      hours: Number(diffHours.toFixed(2)),
      wasUndertime
    };

    const updatedAttendance = [...attendance];
    updatedAttendance[recordIndex] = updatedRecord;

    setAttendance(updatedAttendance);
    return true;
  };

  return (
    <AttendanceContext.Provider value={{ attendance, timeIn, timeOut }}>
      {children}
    </AttendanceContext.Provider>
  );
};
