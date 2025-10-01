import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { JobsProvider } from './contexts/JobsContext';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { FreelancerDashboard } from './pages/FreelancerDashboard';
import { ClientDashboard } from './pages/ClientDashboard';
import { JobListings } from './pages/JobListings';
import { JobDetails } from './pages/JobDetails';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { ProfilePage } from './pages/ProfilePage';
import { MessagesPage } from './pages/MessagesPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AnimatePresence } from 'framer-motion';
export function App() {
  return <ThemeProvider>
      <AuthProvider>
        <JobsProvider>
          <BrowserRouter>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/jobs" element={<JobListings />} />
                <Route path="/jobs/:id" element={<JobDetails />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/profile/:id" element={<ProfilePage />} />
                <Route path="/messages" element={<ProtectedRoute>
                      <MessagesPage />
                    </ProtectedRoute>} />
                <Route path="/freelancer/dashboard" element={<ProtectedRoute requiredRole="freelancer">
                      <FreelancerDashboard />
                    </ProtectedRoute>} />
                <Route path="/client/dashboard" element={<ProtectedRoute requiredRole="client">
                      <ClientDashboard />
                    </ProtectedRoute>} />
              </Routes>
            </AnimatePresence>
          </BrowserRouter>
        </JobsProvider>
      </AuthProvider>
    </ThemeProvider>;
}