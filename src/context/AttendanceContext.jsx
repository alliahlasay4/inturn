import { createContext, useContext, useState, useEffect } from "react";

const REQUIRED_HOURS = 8;

const AttendanceContext = createContext();

export const useAttendance = () => useContext(AttendanceContext);

const SEED_ATTENDANCE = [
  {
    date: "Fri Oct 24 2026",
    timeIn: "08:52 AM",
    timeInRaw: "2026-10-24T00:52:00.000Z",
    timeOut: "05:05 PM",
    hours: 8.22,
    wasLate: false,
    wasUndertime: false,
    status: "ontime"
  },
  {
    date: "Thu Oct 23 2026",
    timeIn: "08:45 AM",
    timeInRaw: "2026-10-23T00:45:00.000Z",
    timeOut: "05:00 PM",
    hours: 8.25,
    wasLate: false,
    wasUndertime: false,
    status: "ontime"
  },
  {
    date: "Wed Oct 22 2026",
    timeIn: "09:14 AM",
    timeInRaw: "2026-10-22T01:14:00.000Z",
    timeOut: "05:30 PM",
    hours: 8.27,
    wasLate: true,
    wasUndertime: false,
    status: "late"
  },
  {
    date: "Tue Oct 21 2026",
    timeIn: "08:55 AM",
    timeInRaw: "2026-10-21T00:55:00.000Z",
    timeOut: "05:02 PM",
    hours: 8.12,
    wasLate: false,
    wasUndertime: false,
    status: "ontime"
  },
  {
    date: "Mon Oct 20 2026",
    timeIn: "08:48 AM",
    timeInRaw: "2026-10-20T00:48:00.000Z",
    timeOut: "05:10 PM",
    hours: 8.37,
    wasLate: false,
    wasUndertime: false,
    status: "ontime"
  },
  {
    date: "Fri Oct 17 2026",
    timeIn: "09:20 AM",
    timeInRaw: "2026-10-17T01:20:00.000Z",
    timeOut: "03:30 PM",
    hours: 6.17,
    wasLate: true,
    wasUndertime: true,
    status: "undertime"
  },
  {
    date: "Thu Oct 16 2026",
    timeIn: "08:50 AM",
    timeInRaw: "2026-10-16T00:50:00.000Z",
    timeOut: "05:00 PM",
    hours: 8.17,
    wasLate: false,
    wasUndertime: false,
    status: "ontime"
  },
  {
    date: "Wed Oct 15 2026",
    timeIn: "08:58 AM",
    timeInRaw: "2026-10-15T00:58:00.000Z",
    timeOut: "05:00 PM",
    hours: 8.03,
    wasLate: false,
    wasUndertime: false,
    status: "ontime"
  },
  {
    date: "Tue Oct 14 2026",
    timeIn: "08:42 AM",
    timeInRaw: "2026-10-14T00:42:00.000Z",
    timeOut: "05:06 PM",
    hours: 8.40,
    wasLate: false,
    wasUndertime: false,
    status: "ontime"
  },
  {
    date: "Mon Oct 13 2026",
    timeIn: "09:05 AM",
    timeInRaw: "2026-10-13T01:05:00.000Z",
    timeOut: "05:15 PM",
    hours: 8.17,
    wasLate: true,
    wasUndertime: false,
    status: "late"
  },
  {
    date: "Fri Oct 10 2026",
    timeIn: "08:50 AM",
    timeInRaw: "2026-10-10T00:50:00.000Z",
    timeOut: "05:00 PM",
    hours: 8.17,
    wasLate: false,
    wasUndertime: false,
    status: "ontime"
  },
  {
    date: "Thu Oct 09 2026",
    timeIn: "08:40 AM",
    timeInRaw: "2026-10-09T00:40:00.000Z",
    timeOut: "05:00 PM",
    hours: 8.33,
    wasLate: false,
    wasUndertime: false,
    status: "ontime"
  },
  {
    date: "Wed Oct 08 2026",
    timeIn: "08:50 AM",
    timeInRaw: "2026-10-08T00:50:00.000Z",
    timeOut: "05:00 PM",
    hours: 8.17,
    wasLate: false,
    wasUndertime: false,
    status: "ontime"
  },
  {
    date: "Tue Oct 07 2026",
    timeIn: "08:45 AM",
    timeInRaw: "2026-10-07T00:45:00.000Z",
    timeOut: "05:00 PM",
    hours: 8.25,
    wasLate: false,
    wasUndertime: false,
    status: "ontime"
  },
  {
    date: "Mon Oct 06 2026",
    timeIn: "08:30 AM",
    timeInRaw: "2026-10-06T00:30:00.000Z",
    timeOut: "05:00 PM",
    hours: 8.50,
    wasLate: false,
    wasUndertime: false,
    status: "ontime"
  }
];

export const AttendanceProvider = ({ children }) => {
  const [attendance, setAttendance] = useState(() => {
    const stored = localStorage.getItem("attendance");
    if (!stored) {
      localStorage.setItem("attendance", JSON.stringify(SEED_ATTENDANCE));
      return SEED_ATTENDANCE;
    }

    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(record => {
          if ("wasLate" in record) return record;
          return {
            ...record,
            wasLate: record.status === "late",
            wasUndertime: record.status === "undertime"
          };
        });
      }
      localStorage.setItem("attendance", JSON.stringify(SEED_ATTENDANCE));
      return SEED_ATTENDANCE;
    } catch {
      localStorage.setItem("attendance", JSON.stringify(SEED_ATTENDANCE));
      return SEED_ATTENDANCE;
    }
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
