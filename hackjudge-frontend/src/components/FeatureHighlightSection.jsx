// src/components/FeatureHighlightSection.js
import React from 'react';

const FeatureHighlightSection = () => {
  return (
    <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-green-500 to-blue-600 p-12 flex-col justify-center items-center text-white relative overflow-hidden">
      {/* Abstract geometric background elements */}
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-400 rounded-lg transform rotate-45 opacity-30 animate-float-slow"></div>
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-green-400 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-teal-300 rounded-xl transform -rotate-30 opacity-20 mix-blend-screen animate-float-slower"></div>

      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-extrabold mb-6 leading-tight">Unlock Your Potential!</h1>
        <p className="text-lg px-4 max-w-md mx-auto">
          Discover a world of possibilities with our innovative tools and resources.
          Start achieving your goals today.
        </p>
        <button className="mt-8 px-6 py-3 bg-white text-green-700 font-semibold rounded-full shadow-lg hover:bg-gray-100 transition duration-300 ease-in-out">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default FeatureHighlightSection;