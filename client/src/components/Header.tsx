import React, { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaStore, FaChartLine, FaFileInvoice, FaBoxes, FaHistory, FaUser, FaSignOutAlt, FaChevronDown } from 'react-icons/fa'

const Header = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { to: '/admin', icon: FaChartLine, label: 'Dashboard', end: true },
    { to: '/admin/billing', icon: FaFileInvoice, label: 'Billing' },
    { to: '/admin/products', icon: FaBoxes, label: 'Products' },
    { to: '/admin/saleshistory', icon: FaHistory, label: 'Sales History' },
  ];

  const adminEmail = localStorage.getItem('adminEmail') || 'admin@stockify.com'; // Changed from userEmail to adminEmail
  const adminName = adminEmail.split('@')[0]; // Get name part of email
  const avatarLetter = adminName.charAt(0).toUpperCase();

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('adminEmail'); // Clear admin email on logout
    localStorage.removeItem('adminData');
    localStorage.removeItem('userData');
    
    // Use navigate instead of window.location
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-sm">
              <FaStore className="text-white text-lg" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Stockify</h1>
              <p className="text-xs text-gray-500 leading-none">Admin Panel</p>
            </div>
          </div>

          {/* Center: Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 bg-gray-50 rounded-xl p-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-blue-700 shadow-sm border border-blue-100'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`
                }
              >
                <item.icon className="text-sm" />
                <span className="hidden lg:block">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Right: Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-50 transition-colors group"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white text-sm font-semibold">{avatarLetter}</span>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-700">{adminName}</p>
                <p className="text-xs text-gray-500">{adminEmail}</p>
              </div>
              <FaChevronDown 
                className={`text-gray-400 text-xs transition-transform duration-200 ${
                  isProfileDropdownOpen ? 'rotate-180' : ''
                }`} 
              />
            </button>

            {/* Dropdown Menu */}
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{adminName}</p>
                  <p className="text-xs text-gray-500">{adminEmail}</p>
                </div>
                
                <div className="py-2">
                  <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <FaUser className="text-gray-400" />
                    Profile Settings
                  </button>
                  
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <FaSignOutAlt className="text-red-500" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button - Only show on mobile */}
          <button className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation - Hidden by default, can be toggled */}
        <div className="md:hidden border-t border-gray-200 py-4 hidden">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
              >
                <item.icon className="text-sm" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header