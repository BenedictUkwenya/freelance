import React, { useState, Children } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useJobs } from '../contexts/JobsContext';
import { DashboardLayout } from '../components/DashboardLayout';
import { StatCard } from '../components/StatCard';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BriefcaseIcon, CheckCircleIcon, ClockIcon, DollarSignIcon, SearchIcon, StarIcon, TrendingUpIcon, UserIcon, AlertCircleIcon, CalendarIcon, XCircleIcon, ClipboardIcon, EyeIcon } from 'lucide-react';
export const FreelancerDashboard: React.FC = () => {
  const {
    user
  } = useAuth();
  const {
    jobs,
    getApplicationsByFreelancerId
  } = useJobs();
  const [showJobFilter, setShowJobFilter] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  // Get applications for the current freelancer
  const myApplications = user ? getApplicationsByFreelancerId(user.id) : [];
  // Count applications by status
  const pendingApplications = myApplications.filter(app => app.status === 'pending').length;
  const acceptedApplications = myApplications.filter(app => app.status === 'accepted').length;
  const rejectedApplications = myApplications.filter(app => app.status === 'rejected').length;
  // Calculate earnings (this would normally come from a real API)
  const totalEarnings = 2450;
  const pendingEarnings = 750;
  // Filter jobs based on category
  const filteredJobs = filterCategory === 'all' ? jobs : jobs.filter(job => job.category === filterCategory);
  // Animation variants
  const container = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const item = {
    hidden: {
      opacity: 0,
      y: 20
    },
    show: {
      opacity: 1,
      y: 0
    }
  };
  return <DashboardLayout title="Freelancer Dashboard">
      {/* Stats Cards */}
      <motion.div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8" variants={container} initial="hidden" animate="show">
        <motion.div variants={item}>
          <StatCard title="Active Applications" value={pendingApplications} icon={<ClipboardIcon className="h-6 w-6" />} color="primary" />
        </motion.div>
        <motion.div variants={item}>
          <StatCard title="Jobs Awarded" value={acceptedApplications} icon={<CheckCircleIcon className="h-6 w-6" />} color="success" />
        </motion.div>
        <motion.div variants={item}>
          <StatCard title="Total Earnings" value={`$${totalEarnings}`} description="Lifetime earnings" icon={<DollarSignIcon className="h-6 w-6" />} color="info" />
        </motion.div>
        <motion.div variants={item}>
          <StatCard title="Pending Earnings" value={`$${pendingEarnings}`} description="From active jobs" icon={<ClockIcon className="h-6 w-6" />} color="warning" />
        </motion.div>
      </motion.div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar / Profile */}
        <motion.div className="lg:col-span-1" initial={{
        opacity: 0,
        x: -20
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        duration: 0.5,
        delay: 0.2
      }}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center">
              <div className="h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 text-2xl font-bold">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {user?.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Freelancer
                </p>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex items-center mb-2">
                <StarIcon className="h-5 w-5 text-yellow-500" />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  4.9/5 Rating
                </span>
              </div>
              <div className="flex items-center mb-2">
                <BriefcaseIcon className="h-5 w-5 text-primary-500" />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  {myApplications.length} Applications
                </span>
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-500" />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  Verified Profile
                </span>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 rounded text-xs">
                  React
                </span>
                <span className="px-2 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 rounded text-xs">
                  TypeScript
                </span>
                <span className="px-2 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 rounded text-xs">
                  UI/UX Design
                </span>
                <span className="px-2 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 rounded text-xs">
                  Tailwind CSS
                </span>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">
                About
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Experienced frontend developer specializing in React and modern
                JavaScript frameworks. Passionate about creating beautiful,
                responsive user interfaces.
              </p>
            </div>
            <div className="mt-6">
              <Link to={`/profile/${user?.id}`} className="w-full inline-flex justify-center items-center px-4 py-2 border border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400 rounded-md hover:bg-primary-50 dark:hover:bg-primary-900/50 transition-colors duration-200">
                <UserIcon className="h-4 w-4 mr-2" />
                Edit Profile
              </Link>
            </div>
          </div>
          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
              <TrendingUpIcon className="h-5 w-5 mr-2 text-primary-500" />
              Recent Activity
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-400">
                    <CheckCircleIcon className="h-4 w-4" />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Your application was accepted!
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    1 hour ago
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <BriefcaseIcon className="h-4 w-4" />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    You applied for "Design a mobile app UI"
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    1 day ago
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <StarIcon className="h-4 w-4" />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    You received a 5-star review
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    3 days ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* My Applications */}
          <motion.div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.3
        }}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <ClipboardIcon className="h-5 w-5 mr-2 text-primary-500" />
              My Applications
            </h2>
            {myApplications.length > 0 ? <div className="space-y-4">
                {myApplications.map(application => {
              const job = jobs.find(j => j.id === application.jobId);
              if (!job) return null;
              return <motion.div key={application.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow" whileHover={{
                y: -2
              }}>
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {job.title}
                        </h3>
                        <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${application.status === 'accepted' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : application.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'}`}>
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </span>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center text-gray-500 dark:text-gray-400">
                          <DollarSignIcon className="h-4 w-4 mr-1 text-primary-500" />
                          <span>Proposed: ${application.proposedBudget}</span>
                        </div>
                        <div className="flex items-center text-gray-500 dark:text-gray-400">
                          <DollarSignIcon className="h-4 w-4 mr-1 text-primary-500" />
                          <span>Budget: ${job.budget}</span>
                        </div>
                        <div className="flex items-center text-gray-500 dark:text-gray-400">
                          <CalendarIcon className="h-4 w-4 mr-1 text-primary-500" />
                          <span>
                            Applied:{' '}
                            {new Date(application.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-500 dark:text-gray-400">
                          <CalendarIcon className="h-4 w-4 mr-1 text-primary-500" />
                          <span>
                            Due: {new Date(job.deadline).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        <span className="font-medium">Cover Letter: </span>
                        {application.coverLetter}
                      </div>
                      <div className="mt-3">
                        <Link to={`/jobs/${job.id}`} className="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm">
                          <EyeIcon className="h-4 w-4 mr-1" />
                          View Job Details
                        </Link>
                      </div>
                    </motion.div>;
            })}
              </div> : <div className="text-center py-6">
                <ClipboardIcon className="h-12 w-12 text-gray-400 mx-auto" />
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  No applications yet
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Start applying to jobs to grow your freelance career.
                </p>
                <Link to="/jobs" className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors duration-200">
                  <SearchIcon className="h-5 w-5 mr-2" />
                  Browse Jobs
                </Link>
              </div>}
          </motion.div>
          {/* Recommended Jobs */}
          <motion.div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.4
        }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                <BriefcaseIcon className="h-5 w-5 mr-2 text-primary-500" />
                Recommended Jobs
              </h2>
              <button onClick={() => setShowJobFilter(!showJobFilter)} className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 flex items-center">
                Filter
                <svg className={`ml-1 h-4 w-4 transition-transform ${showJobFilter ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            {showJobFilter && <motion.div className="mb-4 bg-gray-50 dark:bg-gray-750 p-4 rounded-md" initial={{
            opacity: 0,
            height: 0
          }} animate={{
            opacity: 1,
            height: 'auto'
          }} exit={{
            opacity: 0,
            height: 0
          }} transition={{
            duration: 0.3
          }}>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => setFilterCategory('all')} className={`px-3 py-1 rounded-full text-sm ${filterCategory === 'all' ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-650'}`}>
                    All
                  </button>
                  <button onClick={() => setFilterCategory('web')} className={`px-3 py-1 rounded-full text-sm ${filterCategory === 'web' ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-650'}`}>
                    Web Development
                  </button>
                  <button onClick={() => setFilterCategory('design')} className={`px-3 py-1 rounded-full text-sm ${filterCategory === 'design' ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-650'}`}>
                    Design
                  </button>
                  <button onClick={() => setFilterCategory('mobile')} className={`px-3 py-1 rounded-full text-sm ${filterCategory === 'mobile' ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-650'}`}>
                    Mobile
                  </button>
                  <button onClick={() => setFilterCategory('writing')} className={`px-3 py-1 rounded-full text-sm ${filterCategory === 'writing' ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-650'}`}>
                    Writing
                  </button>
                </div>
              </motion.div>}
            {filteredJobs.length > 0 ? <div className="space-y-4">
                {filteredJobs.slice(0, 3).map(job => <motion.div key={job.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow" whileHover={{
              y: -2
            }}>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {job.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {job.description}
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <DollarSignIcon className="h-4 w-4 mr-1 text-primary-500" />
                        <span>${job.budget}</span>
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <CalendarIcon className="h-4 w-4 mr-1 text-primary-500" />
                        <span>
                          Due {new Date(job.deadline).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Link to={`/jobs/${job.id}`} className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors duration-200">
                        View Details
                      </Link>
                    </div>
                  </motion.div>)}
                <div className="text-center mt-4">
                  <Link to="/jobs" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium">
                    View all jobs →
                  </Link>
                </div>
              </div> : <div className="text-center py-6">
                <AlertCircleIcon className="h-12 w-12 text-gray-400 mx-auto" />
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  No jobs found
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Try changing your filter or check back later.
                </p>
              </div>}
          </motion.div>
        </div>
      </div>
    </DashboardLayout>;
};