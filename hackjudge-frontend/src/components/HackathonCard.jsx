// src/components/HackathonCard.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { CalendarDaysIcon, MapPinIcon, UsersIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';

const HackathonCard = ({ hackathon }) => {
  // Destructure fields exactly as they appear in your original Mongo object
  const {
    _id,
    name,
    description,
    organizer, // Not directly used in the card's display, but available
    startDate,
    endDate,
    location,
    profileImgUrl, // Used for the main image
    coverImgUrl,   // Also available, but profileImgUrl seems more fitting for "image"
    prize,         // Renamed from 'cashPrize' to 'prize'
    // maxMembersPerTeam, minMembersPerTeam, noOfWinners, socialMediaUrls etc. are available but not displayed on the card
  } = hackathon;

  // Helper to format dates
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'; // Handle cases where date might be missing
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

  // --- No direct equivalent for 'tags' or 'participantsRegistered' in your original Mongo object ---
  // You might want to add these fields to your Mongo object if you intend to display them.
  // For now, I'll remove them or use placeholders/defaults.
  // The original component had fallback tags, so I'll keep a similar fallback.
  const displayedTags = ['Innovation', 'Tech', 'Coding']; // Default/placeholder tags since 'tags' is not in your mongo object

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
      {/* Hackathon Image/Banner */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <img
          // Using profileImgUrl from your Mongo object
          src={profileImgUrl || 'https://via.placeholder.com/600x300/F3F4F6/6B7280?text=Hackathon+Image'}
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
          {description ? `${description.substring(0, 160)}${description.length > 160 ? '...' : ''}` : 'No description provided.'}
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
          {/* Removed 'Participants' as 'participantsRegistered' is not in your Mongo object */}
          {/* You could display 'maxMembersPerTeam' or 'minMembersPerTeam' if you want to show team size info */}
          {/* Example if you want to show max members per team:
          <div className="flex items-center">
            <UsersIcon className="h-5 w-5 mr-2 text-green-600" />
            <span>Max Team Members: {maxMembersPerTeam !== undefined ? maxMembersPerTeam : 'N/A'}</span>
          </div>
          */}
          <div className="flex items-center font-semibold text-lg text-green-700">
            <CurrencyDollarIcon className="h-6 w-6 mr-2 text-green-600" />
            {/* Using 'prize' from your Mongo object */}
            <span>Prize: {prize !== undefined && prize > 0 ? `₹${prize.toLocaleString()}` : 'No Cash Prize'}</span>
          </div>
        </div>

        <div className="mb-4">
          {/* Using placeholder tags as 'tags' array is not in your mongo object */}
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