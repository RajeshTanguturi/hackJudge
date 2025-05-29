// src/pages/LandingPage.js
import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import CallToActionSection from '../components/CallToActionSection';
import Footer from '../components/Footer';
import { useState, useEffect  } from 'react';
import { useNavigate } from'react-router-dom';

const LandingPage = () => {
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
    <div className="font-sans antialiased bg-gray-50">  
      <main>
        <HeroSection />
        <FeaturesSection />
        <CallToActionSection />
      </main>
    </div>
  );
};

export default LandingPage;