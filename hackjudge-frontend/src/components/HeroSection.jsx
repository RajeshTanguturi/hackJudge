// src/components/HeroSection.js
import React from 'react';
import { SparklesIcon, GlobeAltIcon, RocketLaunchIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
const HeroSection = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/explore');
  };
  return (
    <section className="relative bg-gradient-to-br from-purple-700 to-orange-500 text-white py-20 md:py-32 overflow-hidden min-h-[700px] flex items-center">
      {/* Abstract background elements - adapted from WelcomeSection */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-500 rounded-full opacity-20 animate-pulse-slow"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-orange-300 rounded-full opacity-30 animate-pulse-slower"></div>
      <div className="absolute top-1/4 left-1/4 w-52 h-52 bg-pink-400 rounded-xl transform rotate-45 opacity-20 mix-blend-multiply animate-float-slow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-teal-300 rounded-full opacity-25 animate-rotate-pulse"></div>


      <div className="container mx-auto px-6 relative z-10 text-center animate-fade-in-up">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
          HackJudge: <br className="md:hidden"/>Your Central Hub for Hackathons
        </h2>
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90 drop-shadow">
          Create, Participate, Organize, and Judge Hackathons – Seamlessly.
        </p>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button onClick={handleExploreClick} className="bg-white text-purple-700 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-gray-100 transform hover:scale-105 transition duration-300 ease-in-out flex items-center justify-center">
            <RocketLaunchIcon className="h-6 w-6 mr-2" />
            Explore Hackathons
          </button>
          <button onClick={() => {navigate('/auth')}}className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-white hover:text-orange-600 transform hover:scale-105 transition duration-300 ease-in-out flex items-center justify-center">
            <SparklesIcon className="h-6 w-6 mr-2" />
            Start Organizing
          </button>
        </div>

        <div className="mt-16 flex justify-center space-x-8 text-white">
          <div className="flex items-center text-left">
            <GlobeAltIcon className="h-10 w-10 text-orange-200 mr-3" />
            <div>
              <p className="font-bold text-2xl">Global Reach</p>
              <p className="text-sm opacity-80">Connect with innovators worldwide</p>
            </div>
          </div>
          <div className="flex items-center text-left">
            <SparklesIcon className="h-10 w-10 text-pink-200 mr-3" />
            <div>
              <p className="font-bold text-2xl">Intuitive Judging</p>
              <p className="text-sm opacity-80">Streamlined evaluation process</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;