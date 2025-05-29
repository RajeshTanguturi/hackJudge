// src/components/CallToActionSection.js
import React from 'react';

const CallToActionSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-green-600 to-blue-700 py-20 text-white text-center overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute -top-10 left-1/4 w-48 h-48 bg-green-500 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-10 right-1/4 w-56 h-56 bg-blue-500 rounded-xl transform rotate-12 opacity-20 animate-float-slow"></div>

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl font-bold mb-6 drop-shadow">
          Ready to Innovate?
        </h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90 drop-shadow">
          Join HackJudge today and revolutionize your hackathon experience, whether you're a hacker, organizer, or judge.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button className="bg-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-orange-600 transform hover:scale-105 transition duration-300 ease-in-out">
            Get Started - It's Free!
          </button>
          <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-white hover:text-green-700 transform hover:scale-105 transition duration-300 ease-in-out">
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;