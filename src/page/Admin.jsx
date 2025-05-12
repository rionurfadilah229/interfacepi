import { useState, useEffect } from 'react';
import AdminLogin from '../components/AdminLogin.jsx';
import AdminDashboard from '../components/AdminDashboard.jsx';

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    setIsLoggedIn(adminLoggedIn);
  }, []);

  const handleLogin = (success) => {
    setIsLoggedIn(success);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return isLoggedIn ? (
    <AdminDashboard onLogout={handleLogout} />
  ) : (
    <AdminLogin onLogin={handleLogin} />
  );
}

export default Admin;