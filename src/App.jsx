import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WalletProvider } from './context/WalletContext';
import { NotificationProvider } from './context/NotificationContext';
import Router from './Router';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <AuthProvider>
          <WalletProvider>
            <Router />
          </WalletProvider>
        </AuthProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
}
