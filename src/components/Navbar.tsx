import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../contexts/AuthContext';
import { UserIcon, BriefcaseIcon, LogOutIcon, BellIcon, MenuIcon, XIcon, MessageSquareIcon } from 'lucide-react';
import { motion } from 'framer-motion';
type Notification = {
  id: string;
  message: string;
  time: string;
  read: boolean;
};
export const Navbar: React.FC = () => {
  const {
    user,
    logout
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  // Mock notifications
  const [notifications, setNotifications] = useState<Notification[]>([{
    id: '1',
    message: 'Your job application was accepted!',
    time: '10 min ago',
    read: false
  }, {
    id: '2',
    message: 'New job matching your skills posted',
    time: '2 hours ago',
    read: false
  }, {
    id: '3',
    message: 'Welcome to FreelanceHub!',
    time: '2 days ago',
    read: true
  }]);
  const unreadCount = notifications.filter(n => !n.read).length;
  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({
      ...n,
      read: true
    })));
  };
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  return <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <motion.div initial={{
              scale: 0.8,
              opacity: 0
            }} animate={{
              scale: 1,
              opacity: 1
            }} transition={{
              duration: 0.3
            }}>
                <BriefcaseIcon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              </motion.div>
              <motion.span className="ml-2 text-xl font-bold text-gray-900 dark:text-white" initial={{
              x: -20,
              opacity: 0
            }} animate={{
              x: 0,
              opacity: 1
            }} transition={{
              duration: 0.3,
              delay: 0.1
            }}>
                FreelanceHub
              </motion.span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link to="/jobs" className={`inline-flex items-center px-1 pt-1 border-b-2 ${isActive('/jobs') ? 'border-primary-500 text-gray-900 dark:text-white' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-white dark:hover:border-gray-600'} text-sm font-medium transition-colors duration-200`}>
                Browse Jobs
              </Link>
              <Link to="/about" className={`inline-flex items-center px-1 pt-1 border-b-2 ${isActive('/about') ? 'border-primary-500 text-gray-900 dark:text-white' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-white dark:hover:border-gray-600'} text-sm font-medium transition-colors duration-200`}>
                About
              </Link>
              <Link to="/contact" className={`inline-flex items-center px-1 pt-1 border-b-2 ${isActive('/contact') ? 'border-primary-500 text-gray-900 dark:text-white' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-white dark:hover:border-gray-600'} text-sm font-medium transition-colors duration-200`}>
                Contact
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <ThemeToggle />
            {user ? <div className="ml-4 flex items-center md:ml-6">
                {/* Notifications */}
                <div className="relative ml-3">
                  <motion.div whileTap={{
                scale: 0.9
              }}>
                    <button onClick={() => setNotificationsOpen(!notificationsOpen)} className="p-1 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800">
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" />
                      {unreadCount > 0 && <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800"></span>}
                    </button>
                  </motion.div>
                  {notificationsOpen && <motion.div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg py-1 bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none" initial={{
                opacity: 0,
                y: -20
              }} animate={{
                opacity: 1,
                y: 0
              }} exit={{
                opacity: 0,
                y: -20
              }} transition={{
                duration: 0.2
              }}>
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                            Notifications
                          </h3>
                          <button onClick={markAllAsRead} className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300">
                            Mark all as read
                          </button>
                        </div>
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        {notifications.length > 0 ? notifications.map(notification => <a key={notification.id} href="#" className={`block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-650 ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
                              <div className="flex items-start">
                                <div className="ml-3 w-0 flex-1">
                                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {notification.message}
                                  </p>
                                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                    {notification.time}
                                  </p>
                                </div>
                              </div>
                            </a>) : <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                            No notifications
                          </div>}
                      </div>
                    </motion.div>}
                </div>
                {/* Messages */}
                <motion.div whileTap={{
              scale: 0.9
            }} className="ml-3">
                  <Link to="/messages" className="p-1 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800">
                    <span className="sr-only">View messages</span>
                    <MessageSquareIcon className="h-6 w-6" />
                  </Link>
                </motion.div>
                {/* Dashboard */}
                <Link to={user.role === 'freelancer' ? '/freelancer/dashboard' : '/client/dashboard'} className="ml-4 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition-colors duration-200">
                  <UserIcon className="h-4 w-4 mr-1" />
                  Dashboard
                </Link>
                {/* Logout button */}
                <motion.button onClick={handleLogout} whileTap={{
              scale: 0.95
            }} className="ml-3 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors duration-200">
                  <LogOutIcon className="h-4 w-4 mr-1" />
                  Logout
                </motion.button>
              </div> : <div className="ml-4 flex items-center md:ml-6">
                <Link to="/login" className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 transition-colors duration-200">
                  Login
                </Link>
                <motion.div whileTap={{
              scale: 0.95
            }}>
                  <Link to="/register" className="ml-3 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors duration-200">
                    Register
                  </Link>
                </motion.div>
              </div>}
            {/* Mobile menu button */}
            <div className="flex items-center md:hidden ml-4">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? <XIcon className="block h-6 w-6" aria-hidden="true" /> : <MenuIcon className="block h-6 w-6" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && <motion.div className="md:hidden" initial={{
      opacity: 0,
      height: 0
    }} animate={{
      opacity: 1,
      height: 'auto'
    }} exit={{
      opacity: 0,
      height: 0
    }} transition={{
      duration: 0.2
    }}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/jobs" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/jobs') ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`} onClick={() => setMobileMenuOpen(false)}>
              Browse Jobs
            </Link>
            <Link to="/about" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/about') ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`} onClick={() => setMobileMenuOpen(false)}>
              About
            </Link>
            <Link to="/contact" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/contact') ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`} onClick={() => setMobileMenuOpen(false)}>
              Contact
            </Link>
            {user && <>
                <Link to="/messages" className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/messages') ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`} onClick={() => setMobileMenuOpen(false)}>
                  Messages
                </Link>
                <Link to={user.role === 'freelancer' ? '/freelancer/dashboard' : '/client/dashboard'} className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/freelancer/dashboard') || isActive('/client/dashboard') ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`} onClick={() => setMobileMenuOpen(false)}>
                  Dashboard
                </Link>
                <Link to={`/profile/${user.id}`} className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname.includes('/profile') ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'}`} onClick={() => setMobileMenuOpen(false)}>
                  Profile
                </Link>
                <button onClick={handleLogout} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20">
                  Logout
                </button>
              </>}
          </div>
        </motion.div>}
    </nav>;
};