// src/components/HackathonCard.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { CalendarDaysIcon, MapPinIcon, UsersIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';

const HackathonCard = ({ hackathon }) => {
  const { _id, name, description, organizer, startDate, endDate, location, tags, imageUrl, cashPrize, participantsRegistered } = hackathon;

  // Helper to format dates
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Determine status based on dates relative to current date
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  let currentStatus = '';
  let statusColor = '';

  if (now < start) {
    currentStatus = 'Upcoming';
    statusColor = 'bg-blue-200 text-blue-800';
  } else if (now >= start && now <= end) {
    currentStatus = 'Ongoing';
    statusColor = 'bg-green-200 text-green-800';
  } else {
    currentStatus = 'Past';
    statusColor = 'bg-gray-200 text-gray-700';
  }

  // Fallback for tags if not present in the data
  const displayedTags = tags && tags.length > 0 ? tags : ['Innovation', 'Tech', 'Coding']; // Default tags

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
      {/* Hackathon Image/Banner */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <img
          src={imageUrl || 'https://via.placeholder.com/600x300/F3F4F6/6B7280?text=Hackathon+Image'}
          alt={name}
          className="w-full h-full object-cover"
        />
        <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${statusColor} shadow`}>
          {currentStatus}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-gray-800 leading-tight mb-3">
          {name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">
          {description.substring(0, 160)}{description.length > 160 ? '...' : ''}
        </p>

        <div className="text-gray-700 text-base mb-4 space-y-2">
          <div className="flex items-center">
            <CalendarDaysIcon className="h-5 w-5 mr-2 text-purple-600" />
            <span>{formatDate(startDate)} - {formatDate(endDate)}</span>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="h-5 w-5 mr-2 text-orange-500" />
            <span>{location || 'Online / TBD'}</span>
          </div>
          <div className="flex items-center">
            <UsersIcon className="h-5 w-5 mr-2 text-green-600" />
            <span>Participants: {participantsRegistered !== undefined ? participantsRegistered : 'N/A'}</span>
          </div>
          <div className="flex items-center font-semibold text-lg text-green-700">
            <CurrencyDollarIcon className="h-6 w-6 mr-2 text-green-600" />
            <span>Prize: {cashPrize ? `$${cashPrize.toLocaleString()}` : 'N/A'}</span>
          </div>
        </div>

        <div className="mb-4">
          {displayedTags.map((tag, index) => (
            <span key={index} className="inline-block bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full mr-2 mb-2 font-medium">
              #{tag}
            </span>
          ))}
        </div>

        {/* Changed button to Link */}
        <Link
          to={`/hackathons/${_id}`} 
          className="mt-auto w-full bg-gradient-to-r from-purple-600 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-orange-600 transition duration-300 shadow-md transform hover:scale-[1.01] flex items-center justify-center"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default HackathonCard;