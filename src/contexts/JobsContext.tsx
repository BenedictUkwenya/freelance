import React, { useState, createContext, useContext } from 'react';
type JobCategory = 'web' | 'mobile' | 'design' | 'writing' | 'marketing' | 'other';
export type Job = {
  id: string;
  clientId: string;
  title: string;
  description: string;
  category: JobCategory;
  budget: number;
  deadline: string;
  createdAt: string;
};
export type Application = {
  id: string;
  jobId: string;
  freelancerId: string;
  freelancerName: string;
  coverLetter: string;
  proposedBudget: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
};
type JobsContextType = {
  jobs: Job[];
  applications: Application[];
  addJob: (job: Omit<Job, 'id' | 'createdAt'>) => void;
  applyToJob: (application: Omit<Application, 'id' | 'createdAt' | 'status'>) => void;
  updateApplicationStatus: (applicationId: string, status: 'accepted' | 'rejected') => void;
  getJobById: (id: string) => Job | undefined;
  getApplicationsByJobId: (jobId: string) => Application[];
  getApplicationsByFreelancerId: (freelancerId: string) => Application[];
  getJobsByClientId: (clientId: string) => Job[];
};
// Mock data
const initialJobs: Job[] = [{
  id: '1',
  clientId: '2',
  title: 'Build a responsive landing page',
  description: 'Need a responsive landing page for a SaaS product. Must be modern and fast.',
  category: 'web',
  budget: 500,
  deadline: '2023-12-31',
  createdAt: '2023-10-01'
}, {
  id: '2',
  clientId: '2',
  title: 'Design a mobile app UI',
  description: 'Looking for a talented designer to create a modern UI for a fitness app.',
  category: 'design',
  budget: 800,
  deadline: '2023-11-15',
  createdAt: '2023-10-02'
}, {
  id: '3',
  clientId: '2',
  title: 'Write technical blog articles',
  description: 'Need a writer to create 5 technical blog posts about web development.',
  category: 'writing',
  budget: 300,
  deadline: '2023-12-01',
  createdAt: '2023-10-03'
}];
const initialApplications: Application[] = [{
  id: '1',
  jobId: '1',
  freelancerId: '1',
  freelancerName: 'John Freelancer',
  coverLetter: "I have 5 years of experience building responsive websites. I'd love to help with your landing page.",
  proposedBudget: 450,
  status: 'pending',
  createdAt: '2023-10-05'
}];
const JobsContext = createContext<JobsContextType | undefined>(undefined);
export const JobsProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const addJob = (job: Omit<Job, 'id' | 'createdAt'>) => {
    const newJob: Job = {
      ...job,
      id: String(jobs.length + 1),
      createdAt: new Date().toISOString()
    };
    setJobs([...jobs, newJob]);
  };
  const applyToJob = (application: Omit<Application, 'id' | 'createdAt' | 'status'>) => {
    const newApplication: Application = {
      ...application,
      id: String(applications.length + 1),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setApplications([...applications, newApplication]);
  };
  const updateApplicationStatus = (applicationId: string, status: 'accepted' | 'rejected') => {
    setApplications(applications.map(app => app.id === applicationId ? {
      ...app,
      status
    } : app));
  };
  const getJobById = (id: string) => {
    return jobs.find(job => job.id === id);
  };
  const getApplicationsByJobId = (jobId: string) => {
    return applications.filter(app => app.jobId === jobId);
  };
  const getApplicationsByFreelancerId = (freelancerId: string) => {
    return applications.filter(app => app.freelancerId === freelancerId);
  };
  const getJobsByClientId = (clientId: string) => {
    return jobs.filter(job => job.clientId === clientId);
  };
  return <JobsContext.Provider value={{
    jobs,
    applications,
    addJob,
    applyToJob,
    updateApplicationStatus,
    getJobById,
    getApplicationsByJobId,
    getApplicationsByFreelancerId,
    getJobsByClientId
  }}>
      {children}
    </JobsContext.Provider>;
};
export const useJobs = (): JobsContextType => {
  const context = useContext(JobsContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobsProvider');
  }
  return context;
};