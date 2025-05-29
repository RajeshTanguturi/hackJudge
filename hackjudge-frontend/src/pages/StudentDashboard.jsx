import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HackathonCard from '../components/HackathonCard';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // Get user role from localStorage or decode from token
      const storedRole = localStorage.getItem('userRole');
      setUserRole(storedRole);
    }
  }, []);
  
  const handleLogout = () => {
    // Clear token and user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserRole(null);
    navigate('/login');
  };

  return (
    <div>
      Student Dashboard
    </div>
  );
};

export default StudentDashboard;