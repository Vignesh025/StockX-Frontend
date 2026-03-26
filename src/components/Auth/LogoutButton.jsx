import { LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

export default function LogoutButton({ className = 'btn btn-ghost btn-sm' }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate(ROUTES.LOGIN, { replace: true });
  }

  return (
    <button id="logout-btn" className={className} onClick={handleLogout}>
      <LogOut size={16} />
      Log out
    </button>
  );
}
