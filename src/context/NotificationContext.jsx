import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: "info",
    title: "Missing Time Out",
    message: "System detected that you did not time-out on January 26, 2026",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    type: "info",
    title: "System Update",
    message: "A system update has been deployed.",
    time: "4 hours ago",
    unread: true,
  },
  {
    id: 3,
    type: "success",
    title: "Document Verified",
    message: "A document you uploaded has been verified.",
    time: "1 day ago",
    unread: false,
  },
  {
    id: 4,
    type: "warning",
    title: "Missing Daily Report",
    message: "You did not submit any Daily Report on January 29, 2026",
    time: "3 days ago",
    unread: false,
  },
  {
    id: 5,
    type: "success",
    title: "Document Verified",
    message: "A document you uploaded has been verified.",
    time: "1 day ago",
    unread: false,
  },
  {
    id: 6,
    type: "warning",
    title: "Missing Daily Report",
    message: "You did not submit any Daily Report on January 29, 2026",
    time: "3 days ago",
    unread: false,
  }
];

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationContext);
