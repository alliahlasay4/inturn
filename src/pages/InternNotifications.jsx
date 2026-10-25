import { useState, useEffect } from "react";
import WelcomeCard from "../components/Intern/WelcomeCard";
import "../styles/notifications.css";
import { FaCheckDouble, FaTimes } from "react-icons/fa";

import { useNotifications } from "../context/NotificationContext";


export default function InternNotifications() {
  const PAGE_SIZE = 5;

  const [activeTab, setActiveTab] = useState("all");

  const { notifications, setNotifications } = useNotifications();

  const [currentPage, setCurrentPage] = useState(1);

// 1. Filter
const filteredNotifications = notifications.filter(n => {
  if (activeTab === "all") return true;
  if (activeTab === "unread") return n.unread;
  return n.type === activeTab;
});

// 2. Paginate
const startIndex = (currentPage - 1) * PAGE_SIZE;

const paginatedNotifications = filteredNotifications.slice(
  startIndex,
  startIndex + PAGE_SIZE
);

// 3. Total pages (YOU REMOVED THIS — bring it back)
const totalPages = Math.max(
  1,
  Math.ceil(filteredNotifications.length / PAGE_SIZE)
);

// 4. Fix invalid page
useEffect(() => {
  if (currentPage > totalPages) {
    setCurrentPage(totalPages);
  }
}, [totalPages, currentPage]);

// 5. Counts
const counts = {
  all: notifications.length,
  unread: notifications.filter(n => n.unread).length,
  info: notifications.filter(n => n.type === "info").length,
  warning: notifications.filter(n => n.type === "warning").length,
  success: notifications.filter(n => n.type === "success").length,
};


  return (
    <div className="notifications-page">
      <WelcomeCard title="Notifications" />

      <div className="notifications-card">

        {/* Toolbar */}
        <div className="notifications-toolbar">
          <div className="notification-filters">
            <button
              className={activeTab === "all" ? "active all" : "all"}
              onClick={() => {
                setActiveTab("all");
                setCurrentPage(1);
              }}
            >
              All <span>{counts.all}</span>
            </button>

            <button
              className={activeTab === "unread" ? "active unread" : "unread"}
              onClick={() => {
                setActiveTab("unread");
                setCurrentPage(1);
              }}
            >
              Unread <span>{counts.unread}</span>
            </button>

            <button
              className={activeTab === "info" ? "active info" : "info"}
              onClick={() => {
                setActiveTab("info");
                setCurrentPage(1);
              }}
            >
              Info <span>{counts.info}</span>
            </button>

            <button
              className={activeTab === "warning" ? "active warning" : "warning"}
              onClick={() => {
                setActiveTab("warning");
                setCurrentPage(1);
              }}
            >
              Warning <span>{counts.warning}</span>
            </button>

            <button
              className={activeTab === "success" ? "active success" : "success"}
              onClick={() => {
                setActiveTab("success");
                setCurrentPage(1);
              }}
            >
              Success <span>{counts.success}</span>
            </button>


          </div>

          <button
            className="mark-read-btn"
            disabled={counts.unread === 0}
            onClick={() =>
              setNotifications(prev =>
                prev.map(item => ({ ...item, unread: false }))
              )
            }
          >
            <FaCheckDouble /> Mark All as Read
          </button>



        </div>

        {/* Notification List */}
        <div className="notification-list">

          {paginatedNotifications.length === 0 ? (
            <div className="no-notifications">
              {activeTab === "unread"
                ? "No unread messages."
                : "No notifications found."}
            </div>
          ) : (
            paginatedNotifications.map(item => (
              <div
                key={item.id}
                className={`notification-item ${item.type} ${item.unread ? "unread" : ""}`}
                onClick={() =>
                  setNotifications(prev =>
                    prev.map(n =>
                      n.id === item.id ? { ...n, unread: false } : n
                    )
                  )
                }
              >

                <div className="text">
                  <h4>{item.title}</h4>
                  <p>{item.message}</p>
                </div>

                <span className="time">{item.time}</span>

                <FaTimes
                  className="close"
                  onClick={(e) => {
                    e.stopPropagation();
                    setNotifications(prev => prev.filter(n => n.id !== item.id));
                  }}
                />

              </div>
            ))
          )}

        </div>
        <div className="notifications-footer">

          <button
            className="page-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >
            Previous
          </button>

          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="page-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            Next
          </button>

        </div>



      </div>
    </div>
  );
}
