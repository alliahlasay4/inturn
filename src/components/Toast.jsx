import { useEffect, useRef } from 'react';

export default function Toast({ type = 'success', message, onDismiss, durationMs = 3000 }) {
  const onDismissRef = useRef(onDismiss);

  useEffect(() => {
    onDismissRef.current = onDismiss;
  }, [onDismiss]);

  useEffect(() => {
    if (!message || !onDismissRef.current) {
      return undefined;
    }
    const timer = setTimeout(() => onDismissRef.current?.(), durationMs);
    return () => clearTimeout(timer);
  }, [message, durationMs]);

  if (!message) {
    return null;
  }

  return (
    <div className={`toast ${type}`}>
      {message}
    </div>
  );
}
