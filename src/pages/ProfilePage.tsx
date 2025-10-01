import React from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { UserIcon, StarIcon, BriefcaseIcon, CalendarIcon, MapPinIcon, MailIcon, LinkIcon, CheckCircleIcon } from 'lucide-react';
export const ProfilePage: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const {
    user
  } = useAuth();
  // In a real app, we would fetch the profile data based on the ID
  // For now, we'll just use the logged-in user's data
  const profile = user;
  const isOwnProfile = profile && user ? profile.id === user.id : false;
  const isFreelancer = profile?.role === 'freelancer';
  // Mock data
  const skills = ['React', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Tailwind CSS', 'Node.js', 'UI/UX Design'];
  const completedJobs = [{
    id: '1',
    title: 'E-commerce Website Development',
    client: 'TechStore Inc.',
    date: 'June 2023',
    rating: 5
  }, {
    id: '2',
    title: 'Landing Page Design',
    client: 'Marketing Agency XYZ',
    date: 'July 2023',
    rating: 4
  }, {
    id: '3',
    title: 'Mobile App UI Redesign',
    client: 'Health App Startup',
    date: 'August 2023',
    rating: 5
  }];
  if (!profile) {
    return <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Profile not found
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              The user profile you're looking for doesn't exist.
            </p>
          </div>
        </div>
        <Footer />
      </div>;
  }
  return <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <motion.div className="lg:col-span-1" initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.5
        }}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-900 h-24"></div>
              <div className="p-6 -mt-12">
                <div className="flex justify-center">
                  <div className="h-24 w-24 rounded-full bg-primary-100 dark:bg-primary-900 border-4 border-white dark:border-gray-800 flex items-center justify-center text-primary-600 dark:text-primary-400 text-4xl font-bold">
                    {profile.name.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="text-center mt-4">
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    {profile.name}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 capitalize">
                    {profile.role} {isFreelancer && '• Web Developer'}
                  </p>
                  <div className="flex items-center justify-center mt-2">
                    <StarIcon className="h-5 w-5 text-yellow-500" />
                    <StarIcon className="h-5 w-5 text-yellow-500" />
                    <StarIcon className="h-5 w-5 text-yellow-500" />
                    <StarIcon className="h-5 w-5 text-yellow-500" />
                    <StarIcon className="h-5 w-5 text-yellow-500" />
                    <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                      5.0 (18 reviews)
                    </span>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center">
                    <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">
                      San Francisco, CA
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MailIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {profile.email}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <LinkIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline">
                      portfolio-website.com
                    </a>
                  </div>
                  <div className="flex items-center">
                    <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Member since January 2023
                    </span>
                  </div>
                </div>
                {isOwnProfile && <div className="mt-6">
                    <motion.button className="w-full px-4 py-2 border border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400 rounded-md hover:bg-primary-50 dark:hover:bg-primary-900/50 transition-colors duration-200" whileHover={{
                  scale: 1.02
                }} whileTap={{
                  scale: 0.98
                }}>
                      Edit Profile
                    </motion.button>
                  </div>}
                {!isOwnProfile && <div className="mt-6">
                    <motion.button className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors duration-200" whileHover={{
                  scale: 1.02
                }} whileTap={{
                  scale: 0.98
                }}>
                      Contact {profile.name.split(' ')[0]}
                    </motion.button>
                  </div>}
              </div>
            </div>
            {isFreelancer && <motion.div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mt-6" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            duration: 0.5,
            delay: 0.2
          }}>
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => <span key={index} className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded text-xs">
                        {skill}
                      </span>)}
                  </div>
                </div>
              </motion.div>}
          </motion.div>
          {/* Main Content */}
          <motion.div className="lg:col-span-2" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.1
        }}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  About
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {isFreelancer ? <>
                      Passionate web developer with over 5 years of experience
                      building modern, responsive web applications. Specialized
                      in React, TypeScript, and UI/UX design. I focus on
                      creating clean, efficient, and user-friendly interfaces
                      that provide excellent user experiences.
                      <br />
                      <br />
                      I've worked with clients ranging from startups to large
                      enterprises, helping them bring their digital products to
                      life. My goal is to deliver high-quality work that exceeds
                      client expectations and helps their businesses succeed.
                    </> : <>
                      Tech company focused on creating innovative solutions for
                      businesses. We regularly hire freelancers for various
                      projects including web development, design, and content
                      creation.
                      <br />
                      <br />
                      Our mission is to help businesses leverage technology to
                      grow and succeed. We believe in building long-term
                      relationships with talented freelancers who can help us
                      deliver exceptional results to our clients.
                    </>}
                </p>
              </div>
            </div>
            {isFreelancer ? <motion.div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            duration: 0.5,
            delay: 0.3
          }}>
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Work History
                  </h2>
                  {completedJobs.length > 0 ? <div className="space-y-6">
                      {completedJobs.map(job => <motion.div key={job.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 last:pb-0" whileHover={{
                  x: 5
                }} transition={{
                  duration: 0.2
                }}>
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-white">
                                {job.title}
                              </h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Client: {job.client}
                              </p>
                            </div>
                            <div className="flex">
                              {[...Array(job.rating)].map((_, i) => <StarIcon key={i} className="h-4 w-4 text-yellow-500" />)}
                            </div>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            <span>Completed in {job.date}</span>
                          </div>
                          <div className="mt-3 flex items-center">
                            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              Completed on time and within budget
                            </span>
                          </div>
                        </motion.div>)}
                    </div> : <div className="text-center py-6">
                      <BriefcaseIcon className="h-12 w-12 text-gray-400 mx-auto" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                        No work history yet
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        This freelancer hasn't completed any jobs yet.
                      </p>
                    </div>}
                </div>
              </motion.div> : <motion.div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            duration: 0.5,
            delay: 0.3
          }}>
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Posted Jobs
                  </h2>
                  <div className="space-y-6">
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Frontend Developer for SaaS Dashboard
                      </h3>
                      <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        <span>Posted on October 15, 2023</span>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <DollarSignIcon className="h-4 w-4 mr-1" />
                        <span>Budget: $1,200</span>
                      </div>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          Active
                        </span>
                      </div>
                    </div>
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Mobile App UI Design
                      </h3>
                      <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        <span>Posted on September 28, 2023</span>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <DollarSignIcon className="h-4 w-4 mr-1" />
                        <span>Budget: $800</span>
                      </div>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                          In Progress
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        Content Writer for Blog Posts
                      </h3>
                      <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        <span>Posted on August 15, 2023</span>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <DollarSignIcon className="h-4 w-4 mr-1" />
                        <span>Budget: $500</span>
                      </div>
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          Completed
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>;
};