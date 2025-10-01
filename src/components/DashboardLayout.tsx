import React from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';
import { Footer } from './Footer';
import { motion } from 'framer-motion';
type DashboardLayoutProps = {
  children: React.ReactNode;
  title: string;
};
export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title
}) => {
  return <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <DashboardSidebar />
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-grow py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6" initial={{
            opacity: 0,
            y: -20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5
          }}>
              {title}
            </motion.h1>
            <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            duration: 0.5,
            delay: 0.2
          }}>
              {children}
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </div>;
};