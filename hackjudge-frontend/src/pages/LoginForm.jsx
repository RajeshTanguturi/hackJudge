// src/components/LoginForm.js
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeSection from '../components/WelcomeSection';
import { AcademicCapIcon, BriefcaseIcon, ScaleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'; // Adjust imports based on actual icons you choose
const API_URL = import.meta.env.VITE_API_URL;
import { useAuth } from '../context/AuthContext';

const roles = [
  { name: 'STUDENT', icon: <AcademicCapIcon className="h-12 w-12 mx-auto text-teal-600" /> }, // Student icon
  { name: 'ORGANIZER', icon: <BriefcaseIcon className="h-12 w-12 mx-auto  text-pink-500" /> }, // Organizer icon
  { name: 'JUDGE', icon: <ScaleIcon className="h-12 w-12 mx-auto text-orange-600" /> }, // Judge icon
];


const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('STUDENT');
  const [error, setError] = useState('');
  const { loginAction, isLoading: isAuthLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    const { email, password } = formData;

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

    const result = await loginAction(email, password, selectedRole);

    if (!result.success) {
      setError(result.message || "Login failed. Please try again.");
    }
    // Navigation is handled by loginAction on success
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl lg:max-w-5xl shadow-2xl rounded-xl overflow-hidden">
        <WelcomeSection
          title="Welcome Back!"
          subtitle="We are glad to see you again. Login to continue your journey with us."
        />
        <div className="w-full md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center">

          <div className="w-full">
            <h2 className="text-3xl font-bold text-purple-700 mb-2 text-center md:text-left">Login</h2>
            <p className="text-gray-600 mb-8 text-center md:text-left">Welcome back! Please login to your account.</p>

            <div className="mb-6">
              <p className="text-gray-700 font-semibold mb-3 text-center md:text-left">WHO YOU ARE?</p>
              <div className="flex justify-around items-center space-x-2 md:space-x-4">
                {roles.map((role) => (
                  <button
                    key={role.name}
                    onClick={() => setSelectedRole(role.name)}
                    className={`flex-1 p-3 md:p-4 border-2 rounded-lg text-center transition-all duration-200 ease-in-out
                ${selectedRole === role.name ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-500' : 'border-gray-300 hover:border-orange-400'}
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
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  User Email
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
                    placeholder="email"
                  />
                </div>
              </div>

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
              {error && <p className="text-red-500 text-sm text-center py-2">{error}</p>}
              <div>
                <button
                  type="submit"
                  disabled={isAuthLoading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAuthLoading ? 'LOGING UP...' : 'LOGIN'}
                </button>
              </div>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600">
              New User?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="font-medium text-purple-600 hover:text-purple-500 focus:outline-none"
              >
                Signup
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>


  );
};

export default LoginForm;