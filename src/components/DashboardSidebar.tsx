import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { HomeIcon, BriefcaseIcon, UserIcon, MessageSquareIcon, SettingsIcon, HelpCircleIcon, MenuIcon, XIcon, CreditCardIcon, BarChartIcon, ClipboardListIcon, StarIcon, UsersIcon } from 'lucide-react';
type SidebarLinkProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
};
const SidebarLink: React.FC<SidebarLinkProps> = ({
  to,
  icon,
  label,
  isActive
}) => {
  return <Link to={to} className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${isActive ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300' : 'text-gray-700 hover:text-primary-700 hover:bg-primary-50 dark:text-gray-300 dark:hover:text-primary-300 dark:hover:bg-primary-900/30'}`}>
      <div className="mr-3">{icon}</div>
      <span>{label}</span>
      {isActive && <motion.div className="absolute left-0 w-1 h-8 bg-primary-600 dark:bg-primary-500 rounded-r" layoutId="activeIndicator" transition={{
      type: 'spring',
      stiffness: 300,
      damping: 30
    }} />}
    </Link>;
};
export const DashboardSidebar: React.FC = () => {
  const {
    user
  } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isFreelancer = user?.role === 'freelancer';
  const isActive = (path: string) => location.pathname === path;
  const freelancerLinks = [{
    to: '/freelancer/dashboard',
    icon: <HomeIcon className="h-5 w-5" />,
    label: 'Dashboard'
  }, {
    to: '/jobs',
    icon: <BriefcaseIcon className="h-5 w-5" />,
    label: 'Find Jobs'
  }, {
    to: '/freelancer/applications',
    icon: <ClipboardListIcon className="h-5 w-5" />,
    label: 'My Applications'
  }, {
    to: '/messages',
    icon: <MessageSquareIcon className="h-5 w-5" />,
    label: 'Messages'
  }, {
    to: '/freelancer/earnings',
    icon: <CreditCardIcon className="h-5 w-5" />,
    label: 'Earnings'
  }, {
    to: `/profile/${user?.id}`,
    icon: <UserIcon className="h-5 w-5" />,
    label: 'Profile'
  }];
  const clientLinks = [{
    to: '/client/dashboard',
    icon: <HomeIcon className="h-5 w-5" />,
    label: 'Dashboard'
  }, {
    to: '/client/post-job',
    icon: <BriefcaseIcon className="h-5 w-5" />,
    label: 'Post a Job'
  }, {
    to: '/client/manage-jobs',
    icon: <ClipboardListIcon className="h-5 w-5" />,
    label: 'Manage Jobs'
  }, {
    to: '/messages',
    icon: <MessageSquareIcon className="h-5 w-5" />,
    label: 'Messages'
  }, {
    to: '/client/freelancers',
    icon: <UsersIcon className="h-5 w-5" />,
    label: 'Find Freelancers'
  }, {
    to: `/profile/${user?.id}`,
    icon: <UserIcon className="h-5 w-5" />,
    label: 'Profile'
  }];
  const links = isFreelancer ? freelancerLinks : clientLinks;
  const commonLinks = [{
    to: '/settings',
    icon: <SettingsIcon className="h-5 w-5" />,
    label: 'Settings'
  }, {
    to: '/help',
    icon: <HelpCircleIcon className="h-5 w-5" />,
    label: 'Help & Support'
  }];
  return <>
      {/* Mobile menu button */}
      <div className="lg:hidden absolute top-4 left-4 z-30">
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500">
          <span className="sr-only">Open sidebar</span>
          {mobileMenuOpen ? <XIcon className="h-6 w-6" aria-hidden="true" /> : <MenuIcon className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>
      {/* Mobile sidebar */}
      {mobileMenuOpen && <motion.div className="fixed inset-0 z-20 bg-black bg-opacity-50" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} onClick={() => setMobileMenuOpen(false)}>
          <motion.div className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 p-4 overflow-y-auto z-30" initial={{
        x: -100 + '%'
      }} animate={{
        x: 0
      }} exit={{
        x: -100 + '%'
      }} transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30
      }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-center mb-8 pt-4">
              <BriefcaseIcon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                FreelanceHub
              </span>
            </div>
            <nav className="space-y-1">
              {links.map(link => <SidebarLink key={link.to} to={link.to} icon={link.icon} label={link.label} isActive={isActive(link.to)} />)}
              <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                {commonLinks.map(link => <SidebarLink key={link.to} to={link.to} icon={link.icon} label={link.label} isActive={isActive(link.to)} />)}
              </div>
            </nav>
          </motion.div>
        </motion.div>}
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:dark:border-gray-700 lg:bg-white lg:dark:bg-gray-800 lg:pt-5 lg:pb-4">
        <div className="flex items-center justify-center flex-shrink-0 px-6 mb-8">
          <BriefcaseIcon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
            FreelanceHub
          </span>
        </div>
        <div className="mt-5 flex-1 flex flex-col overflow-y-auto">
          <div className="px-3 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                <UserIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {user?.role}
                </p>
              </div>
            </div>
          </div>
          <nav className="flex-1 px-3 space-y-1">
            {links.map(link => <SidebarLink key={link.to} to={link.to} icon={link.icon} label={link.label} isActive={isActive(link.to)} />)}
            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
              {commonLinks.map(link => <SidebarLink key={link.to} to={link.to} icon={link.icon} label={link.label} isActive={isActive(link.to)} />)}
            </div>
          </nav>
        </div>
      </div>
    </>;
};