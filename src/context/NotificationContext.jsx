import { createContext, useContext, useState, useCallback, useRef } from 'react';

const NotificationContext = createContext(null);

let notifId = 0;

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    clearTimeout(timers.current[id]);
    delete timers.current[id];
  }, []);

  const addNotification = useCallback((message, type = 'info', duration = 5000) => {
    const id = ++notifId;
    setNotifications((prev) => [...prev, { id, message, type }]);
    if (duration > 0) {
      timers.current[id] = setTimeout(() => dismiss(id), duration);
    }
    return id;
  }, [dismiss]);

  const notify = {
    success: (msg, dur) => addNotification(msg, 'success', dur),
    error: (msg, dur) => addNotification(msg, 'error', dur),
    info: (msg, dur) => addNotification(msg, 'info', dur),
    warning: (msg, dur) => addNotification(msg, 'warning', dur),
  };

  return (
    <NotificationContext.Provider value={{ notifications, notify, dismiss }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotification must be used within NotificationProvider');
  return ctx;
}

export default NotificationContext;
