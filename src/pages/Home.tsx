import React, { useEffect, useRef, Children } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BriefcaseIcon, UsersIcon, LightbulbIcon, TrendingUpIcon, SearchIcon, CheckCircleIcon, ClipboardCheckIcon } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
export const Home: React.FC = () => {
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const howItWorksInView = useInView(howItWorksRef, {
    once: true,
    amount: 0.3
  });
  const featuresInView = useInView(featuresRef, {
    once: true,
    amount: 0.3
  });
  const testimonialsInView = useInView(testimonialsRef, {
    once: true,
    amount: 0.3
  });
  const container = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
  return <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-900">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 sm:py-24 lg:px-8 flex flex-col md:flex-row items-center">
          <motion.div className="md:w-1/2 mb-10 md:mb-0" initial={{
          opacity: 0,
          x: -50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.6
        }}>
            <motion.h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }}>
              Find Talent.
              <br />
              <span className="text-primary-200">Get Work Done.</span>
            </motion.h1>
            <motion.p className="mt-6 text-xl text-primary-100 max-w-3xl" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.3
          }}>
              Connect with top freelancers for your project or showcase your
              skills to clients worldwide. FreelanceHub makes freelancing
              simple, effective, and rewarding.
            </motion.p>
            <motion.div className="mt-10 flex flex-col sm:flex-row gap-4" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.4
          }}>
              <motion.div whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                <Link to="/register" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-primary-50 shadow-md transition-all duration-200">
                  Get Started
                </Link>
              </motion.div>
              <motion.div whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                <Link to="/jobs" className="inline-flex items-center justify-center px-5 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-primary-700 transition-colors duration-200">
                  <SearchIcon className="h-5 w-5 mr-2" />
                  Browse Jobs
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div className="md:w-1/2 flex justify-center" initial={{
          opacity: 0,
          x: 50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.6
        }}>
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=500&q=80" alt="Freelancers collaborating" className="rounded-lg shadow-xl" />
          </motion.div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="py-16 bg-white dark:bg-gray-800" ref={howItWorksRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center" initial={{
          opacity: 0,
          y: 20
        }} animate={howItWorksInView ? {
          opacity: 1,
          y: 0
        } : {
          opacity: 0,
          y: 20
        }} transition={{
          duration: 0.5
        }}>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              How FreelanceHub Works
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
              Three simple steps to get your project done
            </p>
          </motion.div>
          <motion.div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3" variants={container} initial="hidden" animate={howItWorksInView ? 'show' : 'hidden'}>
            <motion.div variants={item} className="relative">
              <div className="absolute left-0 top-0 -ml-4 mt-2 h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  1
                </span>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 pl-16 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Post a Job
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Describe your project, set your budget, and specify the skills
                  you're looking for.
                </p>
                <div className="mt-4">
                  <BriefcaseIcon className="h-10 w-10 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
            </motion.div>
            <motion.div variants={item} className="relative">
              <div className="absolute left-0 top-0 -ml-4 mt-2 h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  2
                </span>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 pl-16 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Find a Freelancer
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Review proposals from talented freelancers and choose the best
                  match for your project.
                </p>
                <div className="mt-4">
                  <UsersIcon className="h-10 w-10 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
            </motion.div>
            <motion.div variants={item} className="relative">
              <div className="absolute left-0 top-0 -ml-4 mt-2 h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  3
                </span>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 pl-16 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Get It Done
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Collaborate seamlessly, track progress, and get your project
                  completed to satisfaction.
                </p>
                <div className="mt-4">
                  <CheckCircleIcon className="h-10 w-10 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900" ref={featuresRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center" initial={{
          opacity: 0,
          y: 20
        }} animate={featuresInView ? {
          opacity: 1,
          y: 0
        } : {
          opacity: 0,
          y: 20
        }} transition={{
          duration: 0.5
        }}>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Why Choose FreelanceHub?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
              Our platform makes it easy to connect talent with opportunity.
            </p>
          </motion.div>
          <motion.div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4" variants={container} initial="hidden" animate={featuresInView ? 'show' : 'hidden'}>
            <motion.div variants={item} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-primary-100 dark:bg-primary-900 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <BriefcaseIcon className="h-6 w-6 text-primary-600 dark:text-primary-300" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Quality Jobs
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-300">
                Access hundreds of verified job postings from reputable clients.
              </p>
            </motion.div>
            <motion.div variants={item} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-primary-100 dark:bg-primary-900 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <UsersIcon className="h-6 w-6 text-primary-600 dark:text-primary-300" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Skilled Freelancers
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-300">
                Find talented professionals across various domains and
                specialties.
              </p>
            </motion.div>
            <motion.div variants={item} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-primary-100 dark:bg-primary-900 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <LightbulbIcon className="h-6 w-6 text-primary-600 dark:text-primary-300" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Simple Process
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-300">
                Our streamlined platform makes hiring and finding work
                effortless.
              </p>
            </motion.div>
            <motion.div variants={item} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-primary-100 dark:bg-primary-900 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <TrendingUpIcon className="h-6 w-6 text-primary-600 dark:text-primary-300" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Career Growth
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-300">
                Build your portfolio and grow your professional network.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="py-16 bg-white dark:bg-gray-800" ref={testimonialsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" initial={{
          opacity: 0,
          y: 20
        }} animate={testimonialsInView ? {
          opacity: 1,
          y: 0
        } : {
          opacity: 0,
          y: 20
        }} transition={{
          duration: 0.5
        }}>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              What Our Users Say
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
              Success stories from freelancers and clients
            </p>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={container} initial="hidden" animate={testimonialsInView ? 'show' : 'hidden'}>
            <motion.div variants={item} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Sarah Johnson" className="h-full w-full object-cover" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Sarah Johnson
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Freelance Designer
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "FreelanceHub helped me find consistent work and build my client
                base. The platform is intuitive and makes it easy to showcase my
                portfolio."
              </p>
              <div className="mt-4 flex">
                {[1, 2, 3, 4, 5].map(star => <StarIcon key={star} className="h-5 w-5 text-yellow-500" />)}
              </div>
            </motion.div>
            <motion.div variants={item} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Mark Thompson" className="h-full w-full object-cover" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Mark Thompson
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Tech Startup CEO
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "As a client, I've found amazing talent on FreelanceHub. The
                quality of work has been exceptional and the hiring process is
                streamlined."
              </p>
              <div className="mt-4 flex">
                {[1, 2, 3, 4, 5].map(star => <StarIcon key={star} className="h-5 w-5 text-yellow-500" />)}
              </div>
            </motion.div>
            <motion.div variants={item} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="David Chen" className="h-full w-full object-cover" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    David Chen
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Web Developer
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "I started freelancing on FreelanceHub last year and now I have
                more clients than I can handle. The platform makes getting paid
                secure and easy."
              </p>
              <div className="mt-4 flex">
                {[1, 2, 3, 4, 5].map(star => <StarIcon key={star} className="h-5 w-5 text-yellow-500" />)}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }} viewport={{
          once: true
        }}>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to get started?</span>
              <span className="block text-primary-300">
                Join FreelanceHub today.
              </span>
            </h2>
            <p className="mt-4 text-lg text-primary-100 max-w-md">
              Whether you're looking to hire top talent or find your next gig,
              FreelanceHub has you covered.
            </p>
          </motion.div>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <motion.div className="inline-flex rounded-md shadow" whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }}>
              <Link to="/register" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-primary-50 transition-colors duration-200">
                Sign up
              </Link>
            </motion.div>
            <motion.div className="ml-3 inline-flex rounded-md shadow" whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }}>
              <Link to="/login" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200">
                Log in
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>;
};
const StarIcon = ({
  className
}: {
  className?: string;
}) => {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
    </svg>;
};