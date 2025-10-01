import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { MoonIcon, SunIcon } from 'lucide-react';
import { motion } from 'framer-motion';
export const ThemeToggle: React.FC = () => {
  const {
    isDarkMode,
    toggleTheme
  } = useTheme();
  return <motion.button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800" aria-label="Toggle theme" whileTap={{
    scale: 0.9
  }} whileHover={{
    rotate: 15
  }}>
      {isDarkMode ? <motion.div initial={{
      rotate: -30,
      opacity: 0
    }} animate={{
      rotate: 0,
      opacity: 1
    }} exit={{
      rotate: 30,
      opacity: 0
    }} transition={{
      duration: 0.2
    }}>
          <SunIcon className="h-5 w-5 text-yellow-400" />
        </motion.div> : <motion.div initial={{
      rotate: 30,
      opacity: 0
    }} animate={{
      rotate: 0,
      opacity: 1
    }} exit={{
      rotate: -30,
      opacity: 0
    }} transition={{
      duration: 0.2
    }}>
          <MoonIcon className="h-5 w-5 text-gray-700" />
        </motion.div>}
    </motion.button>;
};