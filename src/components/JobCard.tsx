import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, DollarSignIcon, TagIcon, ClockIcon, StarIcon } from 'lucide-react';
import { Job } from '../contexts/JobsContext';
import { motion } from 'framer-motion';
type JobCardProps = {
  job: Job;
};
export const JobCard: React.FC<JobCardProps> = ({
  job
}) => {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
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
  // Calculate days left
  const daysLeft = () => {
    const deadline = new Date(job.deadline);
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  const urgencyClass = () => {
    const days = daysLeft();
    if (days < 3) return 'text-red-600 dark:text-red-400';
    if (days < 7) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-green-600 dark:text-green-400';
  };
  return <motion.div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow" initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.3
  }} whileHover={{
    y: -5
  }}>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {job.title}
          </h3>
          <span className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 text-xs font-medium px-2.5 py-0.5 rounded">
            {getCategoryName(job.category)}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mt-2 line-clamp-3">
          {job.description}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <DollarSignIcon className="h-4 w-4 mr-1 text-primary-600 dark:text-primary-400" />
            <span className="font-medium">${job.budget}</span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <CalendarIcon className="h-4 w-4 mr-1 text-primary-600 dark:text-primary-400" />
            <span>Due {formatDate(job.deadline)}</span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <ClockIcon className={`h-4 w-4 mr-1 ${urgencyClass()}`} />
            <span className={urgencyClass()}>{daysLeft()} days left</span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <StarIcon className="h-4 w-4 mr-1 text-yellow-500" />
            <span>4.8 (15 reviews)</span>
          </div>
        </div>
        <div className="mt-6">
          <Link to={`/jobs/${job.id}`} className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 w-full transition-colors duration-200">
            View Details
          </Link>
        </div>
      </div>
    </motion.div>;
};