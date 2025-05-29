// src/components/WelcomeSection.js
import React from 'react';

// Destructure the props directly in the functional component signature
const WelcomeSection = ({ title, subtitle }) => {
  return (
    <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-purple-600 to-orange-400 p-12 flex-col justify-center items-center text-white relative overflow-hidden">
      {/* Abstract wave-like background elements (simplified) */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-500 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-20 -right-10 w-80 h-80 bg-orange-300 rounded-full opacity-30 animate-pulse-slow"></div>
      <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-pink-400 rounded-full opacity-20 mix-blend-multiply animate-pulse-slower"></div>

      <div className="relative z-10 text-center">
        {/* Use the 'title' prop here */}
        <h1 className="text-5xl font-bold mb-6">{title}</h1>
        {/* Use the 'subtitle' prop here */}
        <p className="text-lg">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default WelcomeSection;