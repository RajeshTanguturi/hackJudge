// src/pages/ExploreHackathonsPage.js
import React, { useState, useEffect } from 'react';
import HackathonCard from '../components/HackathonCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MagnifyingGlassIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

// --- Updated Dummy Data with new fields ---
const DUMMY_HACKATHONS = [
  {
    "_id": "682ee7cd653da6fc2ad88a71",
    "name": "AI Innovation Hackathon",
    "description": "A hackathon focused on AI, Machine Learning, and cutting-edge intelligence projects. Explore the future of AI and build revolutionary solutions!",
    "organizer": {
      "_id": "682ee2442a53922ad0c0c3da",
      "name": "KMITAdmin",
      "email": "admin@kmit.in"
    },
    "judges": ["683040a015a4c6c248f4e020"],
    "startDate": "2025-07-01T09:00:00.000Z",
    "endDate": "2025-07-03T18:00:00.000Z",
    "isActive": true,
    "location": "Online / Virtual",
    "tags": ["AI", "ML", "Deep Learning", "Data Science"],
    "imageUrl": "https://picsum.photos/seed/picsum/200/300",
    "cashPrize": 5000,
    "participantsRegistered": 120
  },
  {
    "_id": "682ee83a653da6fc2ad88a73",
    "name": "Web Dev Challenge 2025",
    "description": "Build the next generation of web applications using modern frameworks like React, Vue, and Angular. Frontend and Backend tracks available for all skill levels.",
    "organizer": {
      "_id": "682ee2442a53922ad0c0c3da",
      "name": "KMITAdmin",
      "email": "admin@kmit.in"
    },
    "judges": [],
    "startDate": "2025-06-10T09:00:00.000Z",
    "endDate": "2025-06-12T18:00:00.000Z",
    "isActive": true,
    "location": "Hyderabad, India",
    "tags": ["Web Development", "React", "Node.js", "Fullstack"],
   "imageUrl": "https://picsum.photos/seed/picsum/200/300",
    "cashPrize": 3000,
    "participantsRegistered": 95
  },
  {
    "_id": "682f1d10991bae10d92554cd",
    "name": "Sustainable Solutions Hack",
    "description": "Tackle pressing environmental issues with innovative technology. Focus on renewable energy, waste management, and smart agriculture to create a greener future.",
    "organizer": {
      "_id": "682ee2442a53922ad0c0c3da",
      "name": "KMITAdmin",
      "email": "admin@kmit.in"
    },
    "judges": [],
    "startDate": "2025-08-01T09:00:00.000Z",
    "endDate": "2025-08-03T18:00:00.000Z",
    "isActive": true,
    "location": "Bengaluru, India",
    "tags": ["Sustainability", "IoT", "Green Tech", "Smart Cities"],
   "imageUrl": "https://picsum.photos/seed/picsum/200/300",
    "cashPrize": 4000,
    "participantsRegistered": 78
  },
  {
    "_id": "682f1d10991bae10d92554ce",
    "name": "Blockchain Innovate",
    "description": "A deep dive into decentralized applications, smart contracts, and blockchain security. Build your DApp and contribute to the future of decentralized systems!",
    "organizer": {
      "_id": "682ee2442a53922ad0c0c3db",
      "name": "Blockchain Gurus",
      "email": "info@blockchain.org"
    },
    "judges": [],
    "startDate": "2025-05-20T09:00:00.000Z",
    "endDate": "2025-05-22T18:00:00.000Z",
    "isActive": true,
    "location": "Online",
    "tags": ["Blockchain", "Web3", "Crypto", "FinTech"],
    "imageUrl": "https://picsum.photos/seed/picsum/200/300",
    "cashPrize": 6000,
    "participantsRegistered": 150
  },
  {
    "_id": "682f1d10991bae10d92554cf",
    "name": "Game Dev Jam 2025",
    "description": "Unleash your creativity and build exciting new games. All engines and platforms welcome, from indie titles to immersive VR experiences!",
    "organizer": {
      "_id": "682ee2442a53922ad0c0c3dc",
      "name": "Playmakers Studio",
      "email": "contact@playmakers.com"
    },
    "judges": [],
    "startDate": "2025-05-24T09:00:00.000Z",
    "endDate": "2025-05-26T18:00:00.000Z",
    "isActive": true,
    "location": "Chennai, India",
    "tags": ["Game Development", "Unity", "Unreal Engine", "Design"],
   "imageUrl": "https://picsum.photos/seed/picsum/200/300",
    "cashPrize": 2500,
    "participantsRegistered": 85
  },
  {
    "_id": "682f1d10991bae10d92554d0",
    "name": "Data Science Challenge",
    "description": "Dive into big data and machine learning. Solve real-world problems using advanced analytical techniques and present your findings.",
    "organizer": {
      "_id": "682ee2442a53922ad0c0c3dd",
      "name": "DataGenius Academy",
      "email": "data@academy.com"
    },
    "judges": [],
    "startDate": "2025-07-20T09:00:00.000Z",
    "endDate": "2025-07-22T18:00:00.000Z",
    "isActive": true,
    "location": "Online / Global",
    "tags": ["Data Science", "Machine Learning", "Analytics", "Python"],
    "imageUrl": "https://picsum.photos/seed/picsum/200/300",
    "cashPrize": 4500,
    "participantsRegistered": 110
  }
];
// --- End Updated Dummy Data ---

const ExploreHackathonsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'upcoming', 'ongoing', 'past'
  const [filterLocation, setFilterLocation] = useState('all'); // 'all', 'Online', 'Hyderabad', 'Bengaluru', 'Chennai' etc.
  const [sortBy, setSortBy] = useState('startDate'); // 'startDate', 'name', 'cashPrize', 'participantsRegistered'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc', 'desc'
  const [filteredHackathons, setFilteredHackathons] = useState(DUMMY_HACKATHONS);

  // Derive unique locations from dummy data for the filter dropdown
  const availableLocations = Array.from(new Set(DUMMY_HACKATHONS.map(h => h.location))).sort();

  useEffect(() => {
    let results = [...DUMMY_HACKATHONS]; // Use spread to create a mutable copy

    // 1. Search Filtering
    if (searchTerm) {
      results = results.filter(hackathon =>
        hackathon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hackathon.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hackathon.organizer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hackathon.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hackathon.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // 2. Status Filtering
    const now = new Date();
    if (filterStatus !== 'all') {
      results = results.filter(hackathon => {
        const start = new Date(hackathon.startDate);
        const end = new Date(hackathon.endDate);
        if (filterStatus === 'upcoming') return now < start;
        if (filterStatus === 'ongoing') return now >= start && now <= end;
        if (filterStatus === 'past') return now > end;
        return true;
      });
    }

    // 3. Location Filtering
    if (filterLocation !== 'all') {
      results = results.filter(hackathon =>
        hackathon.location && hackathon.location.toLowerCase() === filterLocation.toLowerCase()
      );
    }

    // 4. Sorting
    results.sort((a, b) => {
      let valA, valB;
      if (sortBy === 'startDate') {
        valA = new Date(a.startDate).getTime();
        valB = new Date(b.startDate).getTime();
      } else if (sortBy === 'name') {
        valA = a.name.toLowerCase();
        valB = b.name.toLowerCase();
      } else if (sortBy === 'cashPrize') {
        valA = a.cashPrize || 0; // Treat undefined/null prizes as 0 for sorting
        valB = b.cashPrize || 0;
      } else if (sortBy === 'participantsRegistered') {
        valA = a.participantsRegistered || 0;
        valB = b.participantsRegistered || 0;
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredHackathons(results);
  }, [searchTerm, filterStatus, filterLocation, sortBy, sortOrder]);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="container mx-auto px-6 py-12 flex-grow">
        <h1 className="text-4xl font-bold text-purple-700 text-center mb-10">
          Explore Hackathons for Students
        </h1>

        {/* Search and Filters Section */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-10 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
            {/* Search Bar */}
            <div className="relative col-span-full lg:col-span-2">
              <input
                type="text"
                placeholder="Search by name, description, tags, or organizer..."
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 text-gray-700 text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
            </div>

            {/* Status Filter */}
            <div>
              <label htmlFor="status-filter" className="sr-only">Filter by Status</label>
              <select
                id="status-filter"
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 text-gray-700 text-lg"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="past">Past</option>
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label htmlFor="location-filter" className="sr-only">Filter by Location</label>
              <select
                id="location-filter"
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 text-gray-700 text-lg"
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
              >
                <option value="all">All Locations</option>
                {availableLocations.map(loc => (
                  <option key={loc} value={loc.toLowerCase()}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label htmlFor="sort-by" className="sr-only">Sort By</label>
              <select
                id="sort-by"
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-200 text-gray-700 text-lg"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="startDate">Sort by Date</option>
                <option value="name">Sort by Name</option>
                <option value="cashPrize">Sort by Prize</option>
                <option value="participantsRegistered">Sort by Participants</option>
              </select>
            </div>

            {/* Sort Order */}
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-3 bg-purple-600 text-white rounded-full shadow-md hover:bg-purple-700 focus:ring-2 focus:ring-purple-400 transition-all duration-200 flex items-center justify-center w-12 h-12 mx-auto"
              title={sortOrder === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
            >
              {sortOrder === 'asc' ? (
                <ArrowUpIcon className="h-6 w-6" />
              ) : (
                <ArrowDownIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Hackathons List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredHackathons.length > 0 ? (
            filteredHackathons.map(hackathon => (
              <HackathonCard key={hackathon._id} hackathon={hackathon} />
            ))
          ) : (
            <p className="text-center text-gray-600 text-xl col-span-full py-10">
              No hackathons found matching your criteria. Try adjusting your filters!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreHackathonsPage;