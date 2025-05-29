import React, { useState } from 'react';
import { UserIcon, EnvelopeIcon, LockClosedIcon, BuildingOffice2Icon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import WelcomeSection from '../components/WelcomeSection'; // Assuming WelcomeSection.js is in the same directory or configured path
import { AcademicCapIcon, BriefcaseIcon } from '@heroicons/react/24/solid';
import axios from 'axios'; // Import axios
import { useAuth } from '../context/AuthContext';
const roles = [
  { name: 'STUDENT', icon: <AcademicCapIcon className="h-12 w-12 mx-auto text-teal-500" /> },
  { name: 'ORGANIZER', icon: <BriefcaseIcon className="h-12 w-12 mx-auto text-pink-500" /> },
];

const API_URL = import.meta.env.VITE_API_URL;

const SignupForm = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("STUDENT");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    organization: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signupAction, isLoading: isAuthLoading } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

   const { name, email, password, confirmPassword, organization } = formData;

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (!selectedRole) {
      setError("Please select a role.");
      return;
    }

    // The API_URL check is now handled within loginAction in AuthContext,
    // but you could keep a frontend check too if desired, though it might be redundant.

    const result = await signupAction(name, email, password, confirmPassword, organization , selectedRole);

    if (!result.success) {
      setError(result.message || "Login failed. Please try again.");
    }
    // Navigation is handled by loginAction on success
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-inter">
      <div className="flex flex-col md:flex-row w-full max-w-4xl lg:max-w-5xl shadow-2xl rounded-xl overflow-hidden">
        <WelcomeSection title="Welcome Aboard!" subtitle ="It only takes a moment to create your account and get started." />
        <div className="w-full md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center">
          <div className="w-full">
            <h2 className="text-3xl font-bold text-purple-700 mb-4 text-center md:text-left">Sign up</h2>

            <div className="mb-6">
              <p className="text-gray-700 font-semibold mb-3 text-center md:text-left">WHO YOU ARE?</p>
              <div className="flex justify-around items-center space-x-2 md:space-x-4">
                {roles.map((role) => (
                  <button
                    key={role.name}
                    onClick={() => setSelectedRole(role.name)}
                    className={`flex-1 p-3 md:p-4 border-2 rounded-lg text-center transition-all duration-200 ease-in-out
                      ${selectedRole === role.name ? 'border-orange-500 bg-orange-50 ring-2 ring-orange-500' : 'border-gray-300 hover:border-orange-400'}
                      focus:outline-none`}
                  >
                    {role.icon}
                    <span className={`mt-2 block text-xs font-medium ${selectedRole === role.name ? 'text-orange-600' : 'text-gray-700'}`}>
                      {role.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
                    placeholder="chooseausername"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {selectedRole === 'ORGANIZER' && (
                <div>
                  <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
                    Organization
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BuildingOffice2Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      type="text"
                      name="organization"
                      id="organization"
                      className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
                      placeholder="Your Organization Name"
                      value={formData.organization}
                      onChange={handleChange}
                      required={selectedRole === 'ORGANIZER'} // Only required if organizer
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="password_signup" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="password_signup"
                    className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-md py-3"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    id="confirm_password"
                    className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-md py-3"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                   <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

                {error && <p className="text-red-500 text-sm text-center py-2">{error}</p>}

              <div>
                <button
                  type="submit"
                  disabled={isAuthLoading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                   {isAuthLoading ? 'SIGNING UP...' : 'SIGNUP'}
                </button>
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="font-medium text-orange-600 hover:text-orange-500 focus:outline-none"
              >
                Login here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;