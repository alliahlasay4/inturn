import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: "info",
    title: "Missing Time Out",
    message: "System detected that you did not record a Time Out on Friday, Oct 24, 2026.",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    type: "warning",
    title: "Document Revision Required",
    message: "Draft Project Proposal v1 was rejected. Please review supervisor remarks and re-upload.",
    time: "3 hours ago",
    unread: true,
  },
  {
    id: 3,
    type: "success",
    title: "Document Verified",
    message: "Your Parent Consent Waiver has been successfully verified by HR.",
    time: "1 day ago",
    unread: true,
  },
  {
    id: 4,
    type: "info",
    title: "System Update",
    message: "A scheduled maintenance and UI theme enhancement has been deployed.",
    time: "1 day ago",
    unread: false,
  },
  {
    id: 5,
    type: "success",
    title: "Daily Report Approved",
    message: "Supervisor approved your Accomplishment Report for Oct 21.",
    time: "2 days ago",
    unread: false,
  },
  {
    id: 6,
    type: "warning",
    title: "Midterm Evaluation Reminder",
    message: "Your Midterm Evaluation Form is pending supervisor review.",
    time: "3 days ago",
    unread: false,
  },
  {
    id: 7,
    type: "success",
    title: "Medical Clearance Accepted",
    message: "Clinic coordinator approved your complete medical examination documents.",
    time: "5 days ago",
    unread: false,
  },
  {
    id: 8,
    type: "info",
    title: "Weekly Townhall Meeting",
    message: "Intern weekly sync is scheduled for Monday at 10:00 AM via Google Meet.",
    time: "6 days ago",
    unread: false,
  }
];

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(() => {
    const stored = localStorage.getItem("notifications");
    if (!stored) {
      localStorage.setItem("notifications", JSON.stringify(INITIAL_NOTIFICATIONS));
      return INITIAL_NOTIFICATIONS;
    }
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      localStorage.setItem("notifications", JSON.stringify(INITIAL_NOTIFICATIONS));
      return INITIAL_NOTIFICATIONS;
    } catch {
      localStorage.setItem("notifications", JSON.stringify(INITIAL_NOTIFICATIONS));
      return INITIAL_NOTIFICATIONS;
    }
  });

  const updateNotifications = (newNotifsOrFn) => {
    setNotifications(prev => {
      const updated = typeof newNotifsOrFn === "function" ? newNotifsOrFn(prev) : newNotifsOrFn;
      localStorage.setItem("notifications", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications: updateNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationContext);
