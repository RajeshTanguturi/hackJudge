// src/components/FeaturesSection.js
import React from 'react';
import { CodeBracketIcon, UsersIcon, ShieldCheckIcon, TrophyIcon } from '@heroicons/react/24/solid';

const FeatureCard = ({ icon, title, description, gradient }) => (
  <div className={`p-8 rounded-xl shadow-lg flex flex-col items-center text-center ${gradient} text-white`}>
    {icon}
    <h3 className="text-xl font-bold mt-4 mb-2">{title}</h3>
    <p className="text-sm opacity-90">{description}</p>
  </div>
);

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-purple-700 mb-12">
          Why Choose HackJudge?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<CodeBracketIcon className="h-16 w-16 text-white" />}
            title="Seamless Creation"
            description="Effortlessly set up and manage your hackathons from start to finish."
            gradient="bg-gradient-to-br from-blue-500 to-purple-600"
          />
          <FeatureCard
            icon={<UsersIcon className="h-16 w-16 text-white" />}
            title="Engaging Participation"
            description="Find exciting hackathons, join teams, and showcase your skills."
            gradient="bg-gradient-to-br from-orange-500 to-pink-500"
          />
          <FeatureCard
            icon={<ShieldCheckIcon className="h-16 w-16 text-white" />}
            title="Fair Judging"
            description="Robust tools for impartial and efficient evaluation of projects."
            gradient="bg-gradient-to-br from-green-500 to-teal-400"
          />
          <FeatureCard
            icon={<TrophyIcon className="h-16 w-16 text-white" />}
            title="Global Community"
            description="Connect with a vibrant network of hackers, mentors, and organizers."
            gradient="bg-gradient-to-br from-red-500 to-orange-400"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;