import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, User, Home, Camera, Image, FileText, Info } from 'lucide-react';
import { account } from '../appwrite/appwriteConfig';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null = loading
  const [user, setUser] = useState(null); // Store user details
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close mobile menu when navigating or clicking outside
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest('nav')) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // 🔐 Check Login Status and Fetch User
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const userData = await account.get();  // Get current user details
        setUser(userData);
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
        setUser(null);
      }
    };
    checkLogin();
  }, []);

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      setIsLoggedIn(false);
      setUser(null);
      navigate('/login');
      setIsOpen(false); // Close mobile menu after logout
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  // Navigation items with icons
  const navItems = [
    { name: 'Home', to: '/', icon: <Home size={18} /> },
    { name: 'About', to: '/about', icon: <Info size={18} /> },
    { name: 'Upload Snap', to: '/UploadSnap', icon: <Camera size={18} /> },
    { name: 'Gallery', to: '/Gallery', icon: <Image size={18} /> },
    { name: 'Blog', to: '/Blog', icon: <FileText size={18} /> }
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <h1 
              className="text-2xl font-bold text-green-600 cursor-pointer flex items-center" 
              onClick={() => navigate('/')}
            >
              <Camera size={28} className="mr-2" />
              <span>Food Snap</span>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <ul className="flex items-center space-x-6 text-base font-medium text-stone-600">
              {navItems.map((item) => (
                <li key={item.name}>
                  <NavLink 
                    to={item.to} 
                    className={({ isActive }) => 
                      `flex items-center px-1 py-2 hover:text-green-600 transition-colors duration-200 ${
                        isActive 
                          ? 'text-green-700 border-b-2 border-green-600' 
                          : 'text-gray-600 hover:border-b-2 hover:border-green-400'
                      }`
                    }
                  >
                    <span className="mr-1.5">{item.icon}</span>
                    <span>{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Desktop Auth Buttons */}
            <div className="flex items-center space-x-3 pl-6 border-l border-gray-200">
              {isLoggedIn === null ? (
                <div className="text-gray-400 animate-pulse flex items-center">
                  <User size={18} className="mr-2" />
                  <span>Loading...</span>
                </div>
              ) : !isLoggedIn ? (
                <>
                  <NavLink
                    to="/login"
                    className="text-green-600 hover:text-green-700 px-3 py-2 rounded-md text-base font-medium"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/SignUp"
                    className="bg-green-600 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-green-700 transition-colors duration-200"
                  >
                    Sign Up
                  </NavLink>
                </>
              ) : (
                <>
                  <div className="flex items-center text-green-700 font-medium">
                    <User size={18} className="mr-2" />
                    <span className="truncate max-w-32">
                      {user?.name || user?.email?.split('@')[0] || 'User'}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-4 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu} 
              className="text-green-600 hover:text-green-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div 
        className={`md:hidden bg-white border-t border-gray-100 shadow-lg ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-1 sm:px-6">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) => 
                `block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                  isActive 
                    ? 'bg-green-50 text-green-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-green-600'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
          
          {/* Mobile Auth Section */}
          <div className="pt-4 mt-4 border-t border-gray-200">
            {isLoggedIn === null ? (
              <div className="px-3 py-2 text-gray-400 animate-pulse flex items-center">
                <User size={18} className="mr-2" />
                <span>Loading...</span>
              </div>
            ) : !isLoggedIn ? (
              <div className="space-y-2">
                <NavLink
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-green-600 hover:bg-green-50"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/SignUp"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-green-600 text-white hover:bg-green-700 text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </NavLink>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="px-3 py-2 flex items-center text-green-700">
                  <User size={18} className="mr-2" />
                  <span className="font-medium truncate">
                    {user?.name || user?.email || 'User'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-center px-3 py-2 rounded-md text-base font-medium border border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;