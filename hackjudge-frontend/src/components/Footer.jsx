// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="container mx-auto px-6 text-center">
        <p className="mb-4">&copy; {new Date().getFullYear()} HackJudge. All rights reserved.</p>
        <div className="flex justify-center space-x-6">
          <a href="#" className="hover:text-white transition duration-200">Privacy Policy</a>
          <a href="#" className="hover:text-white transition duration-200">Terms of Service</a>
          <a href="#" className="hover:text-white transition duration-200">Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;