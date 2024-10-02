import React from 'react';
import { FaInstagram, FaTwitter } from 'react-icons/fa';

const SocialMedia = () => {
  return (
    <div className="hidden lg:grid lg:grid-cols-1 gap-4">
      <a
        href="https://www.instagram.com/hablemosdebelgrano/"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gradient-to-r from-gray-700 to-gray-800 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center transition-all duration-300 hover:from-gray-600 hover:to-gray-700"
      >
        <FaInstagram className="text-6xl" />
      </a>
      <a
        href="https://x.com/hdeBelgrano"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gradient-to-r from-gray-700 to-gray-800 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center transition-all duration-300 hover:from-gray-600 hover:to-gray-700"
      >
        <FaTwitter className="text-6xl" />
      </a>
    </div>
  );
};

export default SocialMedia;