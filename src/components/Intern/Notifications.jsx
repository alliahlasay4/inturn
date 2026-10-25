import { useNotifications } from "../../context/NotificationContext";

export default function Notifications() {
  const { notifications } = useNotifications();

  const latestNotifications = notifications.slice(0, 6);

  return (
    <div className="card dashboard-notifications-card">
      <h3>Notifications</h3>

      <ul className="notification-list">
        {latestNotifications.map(n => (
          <li key={n.id}>
            {n.title}
            <span>{n.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
