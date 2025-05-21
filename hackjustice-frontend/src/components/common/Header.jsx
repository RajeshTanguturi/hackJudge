import { Link } from 'react-router-dom'
import { useState } from 'react'

function Header({ toggleSidebar }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left side - Menu toggle and logo */}
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-600 hover:text-hackjustice-primary focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <Link to="/dashboard" className="ml-4 flex items-center">
            <span className="text-xl font-bold text-hackjustice-primary">HackJustice</span>
          </Link>
        </div>
        
        {/* Right side - User menu */}
        <div className="relative">
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center text-gray-700 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-hackjustice-primary text-white flex items-center justify-center">
              <span className="text-sm font-medium">JD</span>
            </div>
            <span className="ml-2 hidden md:block">John Doe</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {/* Dropdown menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <div className="py-1">
                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                <div className="border-t border-gray-100"></div>
                <Link to="/logout" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Logout</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header