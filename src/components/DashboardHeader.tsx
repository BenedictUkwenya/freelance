import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BellIcon, MessageSquareIcon, SearchIcon } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { motion } from 'framer-motion';
export const DashboardHeader: React.FC = () => {
  const {
    user
  } = useAuth();
  return <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pl-64">
        <div className="flex justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:justify-start">
            <div className="w-full max-w-lg lg:max-w-xs">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative text-gray-400 focus-within:text-gray-600 dark:focus-within:text-gray-300">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5" />
                </div>
                <input id="search" className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 dark:focus:placeholder-gray-500 focus:ring-primary-500 focus:border-primary-500 dark:text-white sm:text-sm transition-colors duration-200" placeholder="Search for jobs, freelancers, etc." type="search" />
              </div>
            </div>
          </div>
          <div className="ml-6 flex items-center">
            {/* Notifications */}
            <motion.button className="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800" whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }}>
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" />
            </motion.button>
            {/* Messages */}
            <motion.button className="ml-3 p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800" whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }}>
              <span className="sr-only">View messages</span>
              <MessageSquareIcon className="h-6 w-6" />
            </motion.button>
            {/* Theme Toggle */}
            <div className="ml-3">
              <ThemeToggle />
            </div>
            {/* Profile dropdown */}
            <div className="ml-3 relative">
              <div>
                <motion.button className="max-w-xs bg-white dark:bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800" id="user-menu" aria-haspopup="true" whileHover={{
                scale: 1.05
              }} whileTap={{
                scale: 0.95
              }}>
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 font-medium">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>;
};