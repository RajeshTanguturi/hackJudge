import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-purple-600 mb-4">404</h1>
        <div className="text-6xl font-medium text-gray-700 mb-8">Page Not Found</div>
        <p className="text-xl text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium border-2 border-purple-600 hover:bg-purple-50 transition-colors duration-200"
          >
            Home Page
          </button>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
        <div className="w-64 h-64 bg-purple-100 rounded-full opacity-30 blur-3xl"></div>
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 -z-10">
        <div className="w-64 h-64 bg-purple-200 rounded-full opacity-30 blur-3xl"></div>
      </div>
    </div>
  );
};

export default NotFound;