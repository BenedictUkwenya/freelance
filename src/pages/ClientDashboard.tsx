import React, { useState, Children } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useJobs } from '../contexts/JobsContext';
import { DashboardLayout } from '../components/DashboardLayout';
import { StatCard } from '../components/StatCard';
import { motion } from 'framer-motion';
import { BriefcaseIcon, CalendarIcon, CheckIcon, DollarSignIcon, PlusIcon, UserIcon, XIcon, UsersIcon, ClipboardIcon, TrendingUpIcon, AlertCircleIcon } from 'lucide-react';
export const ClientDashboard: React.FC = () => {
  const {
    user
  } = useAuth();
  const {
    getJobsByClientId,
    getApplicationsByJobId,
    updateApplicationStatus
  } = useJobs();
  const [showJobForm, setShowJobForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'web',
    budget: '',
    deadline: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const myJobs = user ? getJobsByClientId(user.id) : [];
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      // Add the job to the jobs context
      useJobs().addJob({
        clientId: user.id,
        title: formData.title,
        description: formData.description,
        category: formData.category as any,
        budget: Number(formData.budget),
        deadline: formData.deadline
      });
      // Reset form and show success message
      setFormData({
        title: '',
        description: '',
        category: 'web',
        budget: '',
        deadline: ''
      });
      setShowJobForm(false);
      setSuccessMessage('Job posted successfully!');
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
  };
  const handleUpdateStatus = (applicationId: string, status: 'accepted' | 'rejected') => {
    updateApplicationStatus(applicationId, status);
  };
  const totalApplications = myJobs.reduce((total, job) => {
    return total + getApplicationsByJobId(job.id).length;
  }, 0);
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
  return <DashboardLayout title="Client Dashboard">
      {successMessage && <motion.div className="mb-6 bg-green-100 dark:bg-green-900/30 border-l-4 border-green-500 p-4 flex" initial={{
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
          <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
          <p className="text-green-700 dark:text-green-300">{successMessage}</p>
        </motion.div>}
      {/* Stats Cards */}
      <motion.div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8" variants={container} initial="hidden" animate="show">
        <motion.div variants={item}>
          <StatCard title="Active Jobs" value={myJobs.length} icon={<BriefcaseIcon className="h-6 w-6" />} color="primary" />
        </motion.div>
        <motion.div variants={item}>
          <StatCard title="Total Applications" value={totalApplications} icon={<ClipboardIcon className="h-6 w-6" />} color="info" />
        </motion.div>
        <motion.div variants={item}>
          <StatCard title="Hired Freelancers" value="3" icon={<UsersIcon className="h-6 w-6" />} color="success" />
        </motion.div>
        <motion.div variants={item}>
          <StatCard title="Total Spent" value="$2,450" description="Last 30 days" icon={<DollarSignIcon className="h-6 w-6" />} color="warning" />
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
                  Client
                </p>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex items-center mb-2">
                <BriefcaseIcon className="h-5 w-5 text-primary-500" />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  {myJobs.length} Posted Jobs
                </span>
              </div>
              <div className="flex items-center">
                <CheckIcon className="h-5 w-5 text-green-500" />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  Verified Account
                </span>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">
                Company
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                TechSolutions Inc.
              </p>
            </div>
            <div className="mt-6">
              <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">
                About
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                We're a tech company focused on creating innovative solutions
                for businesses. We regularly hire freelancers for various
                projects.
              </p>
            </div>
            <div className="mt-6">
              <motion.button className="w-full px-4 py-2 border border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400 rounded-md hover:bg-primary-50 dark:hover:bg-primary-900/50 transition-colors duration-200" onClick={() => setShowJobForm(!showJobForm)} whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }}>
                {showJobForm ? 'Cancel' : 'Post New Job'}
              </motion.button>
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
                    <CheckIcon className="h-4 w-4" />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    You accepted a freelancer's proposal
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    2 hours ago
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
                    New job posted: "Mobile App UI Design"
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    1 day ago
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <UsersIcon className="h-4 w-4" />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    3 new applications received
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    2 days ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Job Posting Form */}
          {showJobForm && <motion.div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6" initial={{
          opacity: 0,
          height: 0,
          y: -20
        }} animate={{
          opacity: 1,
          height: 'auto',
          y: 0
        }} exit={{
          opacity: 0,
          height: 0,
          y: -20
        }} transition={{
          duration: 0.3
        }}>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <PlusIcon className="h-5 w-5 mr-2 text-primary-500" />
                Post a New Job
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Job Title
                  </label>
                  <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors duration-200" placeholder="e.g. Web Developer Needed for E-commerce Site" />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Job Description
                  </label>
                  <textarea id="description" name="description" rows={4} value={formData.description} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors duration-200" placeholder="Describe the job requirements and expectations" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category
                    </label>
                    <select id="category" name="category" value={formData.category} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors duration-200">
                      <option value="web">Web Development</option>
                      <option value="mobile">Mobile Development</option>
                      <option value="design">Design</option>
                      <option value="writing">Writing</option>
                      <option value="marketing">Marketing</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Budget ($)
                    </label>
                    <input type="number" id="budget" name="budget" value={formData.budget} onChange={handleInputChange} required min="1" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors duration-200" placeholder="500" />
                  </div>
                  <div>
                    <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Deadline
                    </label>
                    <input type="date" id="deadline" name="deadline" value={formData.deadline} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors duration-200" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <motion.button type="button" onClick={() => setShowJobForm(false)} className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-200" whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }}>
                    Cancel
                  </motion.button>
                  <motion.button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 rounded-md transition-colors duration-200" whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }}>
                    Post Job
                  </motion.button>
                </div>
              </form>
            </motion.div>}
          {/* My Jobs */}
          <motion.div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6" initial={{
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
              <BriefcaseIcon className="h-5 w-5 mr-2 text-primary-500" />
              My Posted Jobs
            </h2>
            {myJobs.length > 0 ? <div className="space-y-6">
                {myJobs.map(job => {
              const applications = getApplicationsByJobId(job.id);
              return <motion.div key={job.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow" whileHover={{
                y: -2
              }}>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {job.title}
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-3 text-sm">
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
                        <div className="flex items-center text-gray-500 dark:text-gray-400">
                          <UserIcon className="h-4 w-4 mr-1 text-primary-500" />
                          <span>{applications.length} Applications</span>
                        </div>
                      </div>
                      {applications.length > 0 && <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Applications
                          </h4>
                          <div className="space-y-3">
                            {applications.slice(0, 2).map(app => <motion.div key={app.id} className="bg-gray-50 dark:bg-gray-750 p-3 rounded-md" whileHover={{
                      y: -1,
                      backgroundColor: '#f9fafb',
                      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
                    }}>
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h5 className="font-medium text-gray-800 dark:text-gray-200">
                                      {app.freelancerName}
                                    </h5>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                                      {app.coverLetter}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                      Proposed: ${app.proposedBudget}
                                    </p>
                                  </div>
                                  <div className="flex space-x-2">
                                    {app.status === 'pending' ? <>
                                        <motion.button onClick={() => handleUpdateStatus(app.id, 'accepted')} className="p-1 bg-green-100 text-green-600 rounded hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50 transition-colors duration-200" title="Accept" whileHover={{
                              scale: 1.1
                            }} whileTap={{
                              scale: 0.9
                            }}>
                                          <CheckIcon className="h-5 w-5" />
                                        </motion.button>
                                        <motion.button onClick={() => handleUpdateStatus(app.id, 'rejected')} className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 transition-colors duration-200" title="Reject" whileHover={{
                              scale: 1.1
                            }} whileTap={{
                              scale: 0.9
                            }}>
                                          <XIcon className="h-5 w-5" />
                                        </motion.button>
                                      </> : <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${app.status === 'accepted' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}`}>
                                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                      </span>}
                                  </div>
                                </div>
                              </motion.div>)}
                            {applications.length > 2 && <div className="text-center">
                                <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium">
                                  View {applications.length - 2} more
                                  applications
                                </button>
                              </div>}
                          </div>
                        </div>}
                    </motion.div>;
            })}
              </div> : <div className="text-center py-6">
                <BriefcaseIcon className="h-12 w-12 text-gray-400 mx-auto" />
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  No jobs posted
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Start by posting your first job to find talented freelancers.
                </p>
                <motion.button onClick={() => setShowJobForm(true)} className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors duration-200" whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Post Your First Job
                </motion.button>
              </div>}
          </motion.div>
        </div>
      </div>
    </DashboardLayout>;
};