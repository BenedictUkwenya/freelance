import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { useJobs } from '../contexts/JobsContext';
import { motion } from 'framer-motion';
import { CalendarIcon, CheckIcon, ClockIcon, DollarSignIcon, TagIcon, ArrowLeftIcon, UserIcon, StarIcon, AlertCircleIcon, BriefcaseIcon, MapPinIcon } from 'lucide-react';
export const JobDetails: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const {
    user
  } = useAuth();
  const {
    getJobById,
    applyToJob
  } = useJobs();
  const [coverLetter, setCoverLetter] = useState('');
  const [proposedBudget, setProposedBudget] = useState('');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const [error, setError] = useState('');
  const job = id ? getJobById(id) : undefined;
  if (!job) {
    return <Navigate to="/jobs" replace />;
  }
  // Get category display name
  const getCategoryName = (category: string) => {
    const categories: Record<string, string> = {
      web: 'Web Development',
      mobile: 'Mobile Development',
      design: 'Design',
      writing: 'Content Writing',
      marketing: 'Marketing',
      other: 'Other'
    };
    return categories[category] || category;
  };
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  // Calculate days left
  const daysLeft = () => {
    const deadline = new Date(job.deadline);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!coverLetter.trim()) {
      setError('Please provide a cover letter');
      return;
    }
    if (!proposedBudget || Number(proposedBudget) <= 0) {
      setError('Please provide a valid budget');
      return;
    }
    if (user && user.role === 'freelancer') {
      applyToJob({
        jobId: job.id,
        freelancerId: user.id,
        freelancerName: user.name,
        coverLetter,
        proposedBudget: Number(proposedBudget)
      });
      setApplicationSuccess(true);
      setShowApplicationForm(false);
      setCoverLetter('');
      setProposedBudget('');
    }
  };
  return <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <motion.div className="mb-4" initial={{
        opacity: 0,
        x: -20
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        duration: 0.3
      }}>
          <Link to="/jobs" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 flex items-center">
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to Jobs
          </Link>
        </motion.div>
        {applicationSuccess && <motion.div className="mb-6 bg-green-100 dark:bg-green-900/30 border-l-4 border-green-500 p-4 flex" initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} transition={{
        duration: 0.3
      }}>
            <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
            <p className="text-green-700 dark:text-green-300">
              Your application has been submitted successfully! The client will
              review your proposal and get back to you soon.
            </p>
          </motion.div>}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.4
        }}>
            <div className="p-6">
              <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                <motion.h1 className="text-2xl font-bold text-gray-900 dark:text-white" initial={{
                opacity: 0
              }} animate={{
                opacity: 1
              }} transition={{
                duration: 0.4,
                delay: 0.1
              }}>
                  {job.title}
                </motion.h1>
                <motion.span className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 text-xs font-medium px-2.5 py-0.5 rounded" initial={{
                opacity: 0,
                scale: 0.8
              }} animate={{
                opacity: 1,
                scale: 1
              }} transition={{
                duration: 0.4,
                delay: 0.2
              }}>
                  {getCategoryName(job.category)}
                </motion.span>
              </div>
              <motion.div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.4,
              delay: 0.3
            }}>
                <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <DollarSignIcon className="h-5 w-5 text-primary-600 dark:text-primary-400 mb-1" />
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    ${job.budget}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Budget
                  </span>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <CalendarIcon className="h-5 w-5 text-primary-600 dark:text-primary-400 mb-1" />
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {formatDate(job.deadline).split(' ')[0]}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Deadline
                  </span>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <ClockIcon className="h-5 w-5 text-primary-600 dark:text-primary-400 mb-1" />
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">
                    {daysLeft()}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Days Left
                  </span>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <TagIcon className="h-5 w-5 text-primary-600 dark:text-primary-400 mb-1" />
                  <span className="text-lg font-semibold text-gray-900 dark:text-white truncate max-w-full">
                    {getCategoryName(job.category).split(' ')[0]}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Category
                  </span>
                </div>
              </motion.div>
              <motion.div className="mt-6" initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              duration: 0.4,
              delay: 0.4
            }}>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Job Description
                </h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {job.description}
                  </p>
                </div>
              </motion.div>
              <motion.div className="mt-6" initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              duration: 0.4,
              delay: 0.5
            }}>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Required Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {getCategoryName(job.category) === 'Web Development' && <>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded text-xs">
                        HTML/CSS
                      </span>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 rounded text-xs">
                        JavaScript
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded text-xs">
                        React
                      </span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 rounded text-xs">
                        Responsive Design
                      </span>
                    </>}
                  {getCategoryName(job.category) === 'Design' && <>
                      <span className="px-2 py-1 bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300 rounded text-xs">
                        UI/UX
                      </span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 rounded text-xs">
                        Adobe XD
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded text-xs">
                        Figma
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded text-xs">
                        Prototyping
                      </span>
                    </>}
                  {getCategoryName(job.category) === 'Mobile Development' && <>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded text-xs">
                        React Native
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded text-xs">
                        Android
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded text-xs">
                        iOS
                      </span>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 rounded text-xs">
                        Mobile UI
                      </span>
                    </>}
                  {getCategoryName(job.category) === 'Writing' && <>
                      <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded text-xs">
                        Copywriting
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded text-xs">
                        SEO
                      </span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 rounded text-xs">
                        Content Strategy
                      </span>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 rounded text-xs">
                        Editing
                      </span>
                    </>}
                </div>
              </motion.div>
              {user?.role === 'freelancer' && <motion.div className="mt-8" initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              duration: 0.4,
              delay: 0.6
            }}>
                  {!applicationSuccess && <>
                      {!showApplicationForm ? <motion.button onClick={() => setShowApplicationForm(true)} className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 rounded-md shadow-sm transition-colors duration-200 w-full md:w-auto" whileHover={{
                  scale: 1.02
                }} whileTap={{
                  scale: 0.98
                }}>
                          Apply for this Job
                        </motion.button> : <motion.div className="bg-gray-50 dark:bg-gray-750 p-6 rounded-lg border border-gray-200 dark:border-gray-700" initial={{
                  opacity: 0,
                  height: 0
                }} animate={{
                  opacity: 1,
                  height: 'auto'
                }} transition={{
                  duration: 0.3
                }}>
                          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            Submit Your Application
                          </h2>
                          {error && <div className="mb-4 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4 flex">
                              <AlertCircleIcon className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
                              <p className="text-sm text-red-700 dark:text-red-400">
                                {error}
                              </p>
                            </div>}
                          <form onSubmit={handleSubmitApplication}>
                            <div className="mb-4">
                              <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Cover Letter
                              </label>
                              <textarea id="coverLetter" rows={6} value={coverLetter} onChange={e => setCoverLetter(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors duration-200" placeholder="Tell the client why you're the best fit for this job..." />
                              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                Explain your relevant experience, approach to
                                the project, and why you're the best candidate.
                              </p>
                            </div>
                            <div className="mb-4">
                              <label htmlFor="proposedBudget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Your Proposed Budget ($)
                              </label>
                              <input type="number" id="proposedBudget" value={proposedBudget} onChange={e => setProposedBudget(e.target.value)} required min="1" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors duration-200" placeholder={job.budget.toString()} />
                              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                The client's budget is ${job.budget}. You can
                                propose a different amount.
                              </p>
                            </div>
                            <div className="flex justify-end">
                              <motion.button type="button" onClick={() => setShowApplicationForm(false)} className="mr-3 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-200" whileHover={{
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
                                Submit Application
                              </motion.button>
                            </div>
                          </form>
                        </motion.div>}
                    </>}
                </motion.div>}
              {!user && <motion.div className="mt-8 bg-gray-50 dark:bg-gray-750 p-4 rounded-lg text-center border border-gray-200 dark:border-gray-700" initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              duration: 0.4,
              delay: 0.6
            }}>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">
                    You need to be logged in as a freelancer to apply for this
                    job.
                  </p>
                  <div className="flex justify-center gap-4">
                    <motion.div whileHover={{
                  scale: 1.05
                }} whileTap={{
                  scale: 0.95
                }}>
                      <Link to="/login" className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 rounded-md transition-colors duration-200">
                        Log In
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{
                  scale: 1.05
                }} whileTap={{
                  scale: 0.95
                }}>
                      <Link to="/register" className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-200">
                        Register
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>}
              {user?.role === 'client' && <motion.div className="mt-8 bg-gray-50 dark:bg-gray-750 p-4 rounded-lg text-center border border-gray-200 dark:border-gray-700" initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} transition={{
              duration: 0.4,
              delay: 0.6
            }}>
                  <p className="text-gray-700 dark:text-gray-300">
                    You are logged in as a client. Only freelancers can apply
                    for jobs.
                  </p>
                </motion.div>}
            </div>
          </motion.div>
          {/* Sidebar */}
          <motion.div className="lg:col-span-1" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.4,
          delay: 0.2
        }}>
            {/* Client Info */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                About the Client
              </h3>
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 text-xl font-bold">
                  J
                </div>
                <div className="ml-3">
                  <h4 className="text-md font-medium text-gray-900 dark:text-white">
                    Jane Client
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    TechSolutions Inc.
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    San Francisco, USA
                  </span>
                </div>
                <div className="flex items-center">
                  <BriefcaseIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    15 Jobs Posted
                  </span>
                </div>
                <div className="flex items-center">
                  <StarIcon className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    4.8/5 (25 reviews)
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Member Since
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  October 2022
                </p>
              </div>
            </div>
            {/* Similar Jobs */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Similar Jobs
              </h3>
              <div className="space-y-4">
                <a href="#" className="block p-3 hover:bg-gray-50 dark:hover:bg-gray-750 rounded-md transition-colors">
                  <h4 className="text-md font-medium text-gray-900 dark:text-white">
                    Frontend Developer for SaaS App
                  </h4>
                  <div className="flex items-center mt-1">
                    <DollarSignIcon className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      $600
                    </span>
                  </div>
                </a>
                <a href="#" className="block p-3 hover:bg-gray-50 dark:hover:bg-gray-750 rounded-md transition-colors">
                  <h4 className="text-md font-medium text-gray-900 dark:text-white">
                    React Developer for E-commerce Site
                  </h4>
                  <div className="flex items-center mt-1">
                    <DollarSignIcon className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      $750
                    </span>
                  </div>
                </a>
                <a href="#" className="block p-3 hover:bg-gray-50 dark:hover:bg-gray-750 rounded-md transition-colors">
                  <h4 className="text-md font-medium text-gray-900 dark:text-white">
                    Landing Page Designer Needed
                  </h4>
                  <div className="flex items-center mt-1">
                    <DollarSignIcon className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      $400
                    </span>
                  </div>
                </a>
              </div>
              <div className="mt-4 text-center">
                <Link to="/jobs" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium">
                  View all jobs →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>;
};