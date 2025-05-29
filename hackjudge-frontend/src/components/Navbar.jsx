import React, { useState, useEffect, useRef } from 'react';

import { useNavigate, Link } from 'react-router-dom';
import { UserCircleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'; // Import Bars3Icon and XMarkIcon
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const mobileMenuRef = useRef(null);
  const profileRef = useRef(null);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // New state for mobile menu
  const { userRole, logoutAction: handleLogout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }

      if (
        isProfileOpen &&
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        window.innerWidth >= 768
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobileMenuOpen, isProfileOpen]);


  const getNavLinks = (isMobile = false) => {
    const linkClasses = isMobile
      ? "block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition duration-200"
      : "text-gray-700 hover:text-orange-500 font-medium transition duration-200";

    if (!userRole) {
      return (
        <>
          <Link to="/explore" className={linkClasses} onClick={() => isMobile && setIsMobileMenuOpen(false)}>Explore</Link>
          <Link to="/about" className={linkClasses} onClick={() => isMobile && setIsMobileMenuOpen(false)}>About Us</Link>
        </>
      );
    }

    switch (userRole?.toLowerCase()) {
      case 'student':
        return (
          <>
            <Link to="/explore" className={linkClasses} onClick={() => isMobile && setIsMobileMenuOpen(false)}>Explore Hackathons</Link>
            <Link to="/my-projects" className={linkClasses} onClick={() => isMobile && setIsMobileMenuOpen(false)}>My Projects</Link>
          </>
        );
      case 'organizer':
        return (
          <>
            <Link to="/my-hackathons" className={linkClasses} onClick={() => isMobile && setIsMobileMenuOpen(false)}>My Hackathons</Link>
            <Link to="/create-hackathon" className={linkClasses} onClick={() => isMobile && setIsMobileMenuOpen(false)}>Create Hackathon</Link>
          </>
        );
      case 'judge':
        return (
          <>
            <Link to="/assigned-hackathons" className={linkClasses} onClick={() => isMobile && setIsMobileMenuOpen(false)}>Assigned Hackathons</Link>
            <Link to="/evaluations" className={linkClasses} onClick={() => isMobile && setIsMobileMenuOpen(false)}>Evaluations</Link>
          </>
        );
      default:
        return null;
    }
  };

  const closeMobileMenuAndProfile = () => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg py-4 relative z-50">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-purple-700">
          HackJudge
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8">
          {getNavLinks()}
        </div>

        {/* Desktop Auth/Profile Section */}
        <div className="hidden md:block relative">
          {!userRole ? (
            <div>
              <button
                onClick={() => navigate('/login')}
                className="bg-purple-600 text-white px-5 py-2 rounded-full font-medium hover:bg-purple-700 transition duration-200"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="ml-4 bg-orange-500 text-white px-5 py-2 rounded-full font-medium hover:bg-orange-600 transition duration-200"
              >
                Sign Up
              </button>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 focus:outline-none"
              >
                <UserCircleIcon className="h-8 w-8" />
                <span className="font-medium">{userRole}</span>
              </button>

              {isProfileOpen && (
                <div ref={profileRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link
                    to={`/${userRole?.toLowerCase()}`}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                    onClick={closeMobileMenuAndProfile}
                  >
                    My Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                    onClick={closeMobileMenuAndProfile}
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={() => { handleLogout(); closeMobileMenuAndProfile(); }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-7 w-7" /> // 'X' icon when menu is open
            ) : (
              <Bars3Icon className="h-7 w-7" /> // Hamburger icon when menu is closed
            )}
          </button>
        </div>
      </div>
      {/* Mobile Menu Content (conditionally rendered) */}
      {isMobileMenuOpen && (
        <div ref={mobileMenuRef} className="md:hidden bg-white shadow-lg pb-4 pt-2 absolute top-full left-0 w-full z-40">
          <div className="flex flex-col items-center space-y-4 px-6">
            {getNavLinks(true)} {/* Pass true to get mobile-specific link styles and close menu on click */}

            {!userRole ? (
              <>
                <button
                  onClick={() => { navigate('/login'); closeMobileMenuAndProfile(); }}
                  className="w-50 bg-purple-600 text-white px-5 py-2 rounded-full font-medium hover:bg-purple-700 transition duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => { navigate('/signup'); closeMobileMenuAndProfile(); }}
                  className="w-50 bg-orange-500 text-white px-5 py-2 rounded-full font-medium hover:bg-orange-600 transition duration-200"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <Link
                  to={`/${userRole?.toLowerCase()}`}
                  className="w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-md"
                  onClick={closeMobileMenuAndProfile}
                >
                  My Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-md"
                  onClick={closeMobileMenuAndProfile}
                >
                  My Profile
                </Link>
                <button
                  onClick={() => { handleLogout(); closeMobileMenuAndProfile(); }}
                  className="w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-md"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;