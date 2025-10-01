import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BriefcaseIcon, CheckIcon, ShieldCheckIcon, UsersIcon } from 'lucide-react';
export const About: React.FC = () => {
  return <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            About FreelanceHub
          </h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Our Mission
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                FreelanceHub is dedicated to connecting talented freelancers
                with clients who need their expertise. We believe in creating a
                platform that makes it easy for freelancers to find meaningful
                work and for clients to find the perfect talent for their
                projects.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Founded in 2023, our platform has quickly grown to become a
                trusted marketplace for freelance work across various industries
                including web development, design, content writing, marketing,
                and more.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-primary-100 dark:bg-primary-900 rounded-full p-2">
                    <UsersIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h2 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">
                    For Freelancers
                  </h2>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Access to diverse projects across multiple categories
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Build your portfolio and gain valuable experience
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Set your own rates and work on your own schedule
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Connect with clients from around the world
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-primary-100 dark:bg-primary-900 rounded-full p-2">
                    <BriefcaseIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h2 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">
                    For Clients
                  </h2>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Find skilled professionals for your specific project needs
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Post jobs and receive applications from qualified
                      freelancers
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Set your budget and project timeline
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Manage the entire project through our platform
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Our Values
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="mx-auto bg-primary-100 dark:bg-primary-900 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <ShieldCheckIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Trust
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    We prioritize building a trusted community where clients and
                    freelancers can work with confidence.
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto bg-primary-100 dark:bg-primary-900 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <UsersIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Community
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    We foster a supportive environment where professionals can
                    grow and collaborate.
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto bg-primary-100 dark:bg-primary-900 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <CheckIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Quality
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    We strive to maintain high standards for both freelancers
                    and clients on our platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-primary-700 dark:bg-primary-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6 text-center">
              <h2 className="text-xl font-semibold text-white mb-4">
                Join FreelanceHub Today
              </h2>
              <p className="text-primary-100 mb-6">
                Whether you're looking for work or looking to hire, FreelanceHub
                is the platform for you.
              </p>
              <div className="flex justify-center space-x-4">
                <a href="/register" className="px-4 py-2 text-sm font-medium rounded-md text-primary-700 bg-white hover:bg-primary-50">
                  Sign Up
                </a>
                <a href="/contact" className="px-4 py-2 text-sm font-medium rounded-md text-white border border-white hover:bg-primary-600">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>;
};