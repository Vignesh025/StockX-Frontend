import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import { useNotification } from '../../context/NotificationContext';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

function ToastIcon({ type }) {
  const props = { size: 18 };
  switch (type) {
    case 'success': return <CheckCircle {...props} color="var(--green)" />;
    case 'error':   return <AlertCircle {...props} color="var(--red)" />;
    case 'warning': return <AlertTriangle {...props} color="var(--amber)" />;
    default:        return <Info {...props} color="var(--brand)" />;
  }
}

export default function MainLayout({ children, title }) {
  const { notifications, dismiss } = useNotification();

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Header title={title} />
        <main>{children}</main>
        <Footer />
      </div>

      {/* Toast notifications */}
      <div className="toast-container" aria-live="polite">
        {notifications.map((n) => (
          <div key={n.id} className={`toast toast-${n.type}`}>
            <span className="toast-icon"><ToastIcon type={n.type} /></span>
            <span className="toast-msg">{n.message}</span>
            <button className="toast-close" onClick={() => dismiss(n.id)} aria-label="Dismiss">
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
