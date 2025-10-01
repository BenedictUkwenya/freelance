import React from 'react';
import { motion } from 'framer-motion';
type StatCardProps = {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  color?: string;
};
export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon,
  color = 'primary'
}) => {
  const getColorClasses = () => {
    switch (color) {
      case 'primary':
        return 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200';
      case 'success':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'danger':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'info':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200';
    }
  };
  return <motion.div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg" whileHover={{
    y: -5
  }} transition={{
    duration: 0.3
  }}>
      <div className="p-5">
        <div className="flex items-center">
          <div className={`flex-shrink-0 rounded-md p-3 ${getColorClasses()}`}>
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                {title}
              </dt>
              <dd>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {value}
                </div>
                {description && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {description}
                  </p>}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </motion.div>;
};