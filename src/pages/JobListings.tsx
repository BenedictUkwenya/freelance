import React, { useEffect, useState, Children } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { JobCard } from '../components/JobCard';
import { useJobs } from '../contexts/JobsContext';
import { motion } from 'framer-motion';
import { SearchIcon, FilterIcon, BriefcaseIcon, XIcon } from 'lucide-react';
export const JobListings: React.FC = () => {
  const {
    jobs
  } = useJobs();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const categories = [{
    value: 'web',
    label: 'Web Development'
  }, {
    value: 'mobile',
    label: 'Mobile Development'
  }, {
    value: 'design',
    label: 'Design'
  }, {
    value: 'writing',
    label: 'Content Writing'
  }, {
    value: 'marketing',
    label: 'Marketing'
  }, {
    value: 'other',
    label: 'Other'
  }];
  // Filter jobs based on search term, categories, and budget
  const filteredJobs = jobs.filter(job => {
    // Filter by search term
    const matchesSearchTerm = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || job.description.toLowerCase().includes(searchTerm.toLowerCase());
    // Filter by category
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(job.category);
    // Filter by budget
    const matchesMinBudget = minBudget === '' || job.budget >= parseInt(minBudget);
    const matchesMaxBudget = maxBudget === '' || job.budget <= parseInt(maxBudget);
    return matchesSearchTerm && matchesCategory && matchesMinBudget && matchesMaxBudget;
  });
  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setMinBudget('');
    setMaxBudget('');
  };
  return <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div className="text-center mb-8" initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }}>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Find Your Perfect Job
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Browse through our curated list of freelance opportunities
          </p>
        </motion.div>
        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors duration-200" placeholder="Search jobs by title or keywords..." />
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200">
              <FilterIcon className="h-5 w-5 mr-2" />
              Filters
              {(selectedCategories.length > 0 || minBudget || maxBudget) && <span className="ml-2 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300 text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                  {selectedCategories.length + (minBudget || maxBudget ? 1 : 0)}
                </span>}
            </button>
          </div>
          {/* Filters Panel */}
          {showFilters && <motion.div className="mt-4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4" initial={{
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
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Filter Jobs
                </h3>
                <button onClick={clearFilters} className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                  Clear all filters
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Categories
                  </h4>
                  <div className="space-y-2">
                    {categories.map(category => <div key={category.value} className="flex items-center">
                        <input id={`category-${category.value}`} type="checkbox" checked={selectedCategories.includes(category.value)} onChange={() => handleCategoryChange(category.value)} className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded transition-colors duration-200" />
                        <label htmlFor={`category-${category.value}`} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          {category.label}
                        </label>
                      </div>)}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Budget Range
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="min-budget" className="sr-only">
                        Minimum Budget
                      </label>
                      <input type="number" id="min-budget" value={minBudget} onChange={e => setMinBudget(e.target.value)} className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors duration-200" placeholder="Min $" min="0" />
                    </div>
                    <div>
                      <label htmlFor="max-budget" className="sr-only">
                        Maximum Budget
                      </label>
                      <input type="number" id="max-budget" value={maxBudget} onChange={e => setMaxBudget(e.target.value)} className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors duration-200" placeholder="Max $" min="0" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>}
        </div>
        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing <span className="font-medium">{filteredJobs.length}</span>{' '}
            jobs
          </p>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">
              Sort by:
            </span>
            <select className="text-sm border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200">
              <option>Newest</option>
              <option>Budget: High to Low</option>
              <option>Budget: Low to High</option>
              <option>Deadline</option>
            </select>
          </div>
        </div>
        {/* Job Listings */}
        {filteredJobs.length > 0 ? <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" initial="hidden" animate="show" variants={{
        hidden: {
          opacity: 0
        },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}>
            {filteredJobs.map(job => <motion.div key={job.id} variants={{
          hidden: {
            opacity: 0,
            y: 20
          },
          show: {
            opacity: 1,
            y: 0
          }
        }}>
                <JobCard job={job} />
              </motion.div>)}
          </motion.div> : <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
              <BriefcaseIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
              No jobs found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              We couldn't find any jobs matching your criteria. Try adjusting
              your filters or search term.
            </p>
            <button onClick={clearFilters} className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors duration-200">
              <XIcon className="h-4 w-4 mr-1" />
              Clear Filters
            </button>
          </div>}
      </main>
      <Footer />
    </div>;
};