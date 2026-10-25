import { useEffect, useState } from "react";

export default function WelcomeCard({ title }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card welcome-card">
      <h2>{title}</h2>
      <p>{time.toLocaleString()}</p>
    </div>
  );
}
