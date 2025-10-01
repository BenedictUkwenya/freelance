import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { AtSignIcon, LockIcon, UserIcon, AlertCircleIcon, CheckIcon } from 'lucide-react';
import { motion } from 'framer-motion';
export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'freelancer' | 'client'>('freelancer');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  });
  const {
    register,
    isLoading
  } = useAuth();
  const navigate = useNavigate();
  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  const validateName = (name: string) => {
    return name.trim().length >= 3;
  };
  const validatePassword = (password: string) => {
    return password.length >= 6;
  };
  const validateConfirmPassword = () => {
    return password === confirmPassword;
  };
  const isFormValid = () => {
    return validateName(name) && validateEmail(email) && validatePassword(password) && validateConfirmPassword();
  };
  const handleBlur = (field: 'name' | 'email' | 'password' | 'confirmPassword') => {
    setTouched({
      ...touched,
      [field]: true
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!isFormValid()) {
      setTouched({
        name: true,
        email: true,
        password: true,
        confirmPassword: true
      });
      return;
    }
    try {
      const success = await register(name, email, password, role);
      if (success) {
        navigate(role === 'freelancer' ? '/freelancer/dashboard' : '/client/dashboard');
      } else {
        setError('This email is already registered. Please use a different email.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };
  return <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg" initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }}>
          <div>
            <div className="mx-auto flex justify-center">
              <motion.div initial={{
              scale: 0.5,
              opacity: 0
            }} animate={{
              scale: 1,
              opacity: 1
            }} transition={{
              duration: 0.5
            }} className="bg-primary-100 dark:bg-primary-900 rounded-full p-3">
                <UserIcon className="h-10 w-10 text-primary-600 dark:text-primary-400" />
              </motion.div>
            </div>
            <motion.div initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2,
            duration: 0.5
          }}>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                Create your account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                Or{' '}
                <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition-colors duration-200">
                  sign in to your existing account
                </Link>
              </p>
            </motion.div>
          </div>
          {error && <motion.div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4 flex" initial={{
          opacity: 0,
          height: 0
        }} animate={{
          opacity: 1,
          height: 'auto'
        }} transition={{
          duration: 0.3
        }}>
              <AlertCircleIcon className="h-5 w-5 text-red-500 mr-2 flex-shrink-0" />
              <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
            </motion.div>}
          <motion.form className="mt-8 space-y-6" onSubmit={handleSubmit} initial={{
          opacity: 0,
          y: 10
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3,
          duration: 0.5
        }}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input id="name" name="name" type="text" autoComplete="name" required value={name} onChange={e => setName(e.target.value)} onBlur={() => handleBlur('name')} className={`appearance-none relative block w-full px-3 py-2 pl-10 border ${touched.name && !validateName(name) ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm transition-colors duration-200`} placeholder="Full Name" />
                </div>
                {touched.name && !validateName(name) && <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    Name must be at least 3 characters
                  </p>}
              </div>
              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <AtSignIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input id="email-address" name="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} onBlur={() => handleBlur('email')} className={`appearance-none relative block w-full px-3 py-2 pl-10 border ${touched.email && !validateEmail(email) ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm transition-colors duration-200`} placeholder="Email address" />
                </div>
                {touched.email && !validateEmail(email) && <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    Please enter a valid email address
                  </p>}
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input id="password" name="password" type="password" autoComplete="new-password" required value={password} onChange={e => setPassword(e.target.value)} onBlur={() => handleBlur('password')} className={`appearance-none relative block w-full px-3 py-2 pl-10 border ${touched.password && !validatePassword(password) ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm transition-colors duration-200`} placeholder="Password" />
                </div>
                {touched.password && !validatePassword(password) && <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    Password must be at least 6 characters
                  </p>}
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input id="confirm-password" name="confirm-password" type="password" autoComplete="new-password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} onBlur={() => handleBlur('confirmPassword')} className={`appearance-none relative block w-full px-3 py-2 pl-10 border ${touched.confirmPassword && !validateConfirmPassword() ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm transition-colors duration-200`} placeholder="Confirm Password" />
                  {confirmPassword && validateConfirmPassword() && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <CheckIcon className="h-5 w-5 text-green-500" />
                    </div>}
                </div>
                {touched.confirmPassword && !validateConfirmPassword() && <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                    Passwords do not match
                  </p>}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="mr-2 text-sm text-gray-700 dark:text-gray-300">
                  I am a:
                </span>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input type="radio" className="form-radio text-primary-600 focus:ring-primary-500" name="role" value="freelancer" checked={role === 'freelancer'} onChange={() => setRole('freelancer')} />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Freelancer
                    </span>
                  </label>
                  <label className="inline-flex items-center">
                    <input type="radio" className="form-radio text-primary-600 focus:ring-primary-500" name="role" value="client" checked={role === 'client'} onChange={() => setRole('client')} />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      Client
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div>
              <motion.button type="submit" disabled={isLoading || !isFormValid()} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-400 disabled:cursor-not-allowed transition-colors duration-200" whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }}>
                {isLoading ? <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg> : null}
                {isLoading ? 'Creating account...' : 'Create account'}
              </motion.button>
            </div>
          </motion.form>
        </motion.div>
      </div>
      <Footer />
    </div>;
};