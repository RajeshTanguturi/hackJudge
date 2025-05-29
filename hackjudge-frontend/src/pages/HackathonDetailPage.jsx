// src/pages/HackathonDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CalendarDaysIcon, MapPinIcon, UsersIcon, CurrencyDollarIcon, CodeBracketIcon, TagIcon, BookmarkIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';

// --- Re-using the DUMMY_HACKATHONS data from ExploreHackathonsPage ---
// In a real app, you would make an API call here to fetch single hackathon data
const DUMMY_HACKATHONS = [
  {
    "_id": "682ee7cd653da6fc2ad88a71",
    "name": "AI Innovation Hackathon",
    "description": "A hackathon focused on AI, Machine Learning, and cutting-edge intelligence projects. Explore the future of AI and build revolutionary solutions! This event challenges participants to develop innovative AI-powered solutions to real-world problems. Expect workshops, mentorship, and inspiring keynotes from industry leaders.",
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
    "tags": ["AI", "ML", "Deep Learning", "Data Science", "Innovation"],
    "imageUrl": "https://images.unsplash.com/photo-1579567761406-4668b55e2825?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "cashPrize": 5000,
    "participantsRegistered": 120,
    "registrationLink": "https://example.com/register/ai-hackathon",
    "rulesLink": "https://example.com/rules/ai-hackathon",
    "discordLink": "https://discord.gg/ai-hackathon",
    "theme": "AI for Social Good",
    "tracks": ["Healthcare AI", "Environmental AI", "Fintech AI"],
    "mentors": ["Dr. Anya Sharma", "Mr. Ben Carter"]
  },
  {
    "_id": "682ee83a653da6fc2ad88a73",
    "name": "Web Dev Challenge 2025",
    "description": "Build the next generation of web applications using modern frameworks like React, Vue, and Angular. Frontend and Backend tracks available for all skill levels. This hackathon aims to push the boundaries of web technology, focusing on user experience and scalable architectures.",
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
    "tags": ["Web Development", "React", "Node.js", "Fullstack", "Frontend", "Backend"],
    "imageUrl": "https://images.unsplash.com/photo-1549605335-5b5c92c57805?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "cashPrize": 3000,
    "participantsRegistered": 95,
    "registrationLink": "https://example.com/register/webdev",
    "discordLink": "https://discord.gg/webdev-challenge",
    "theme": "Interactive Web Experiences",
    "tracks": ["E-commerce", "Social Media", "Productivity Apps"],
    "mentors": ["Ms. Clara Lee", "Mr. David Kim"]
  },
  {
    "_id": "682f1d10991bae10d92554cd",
    "name": "Sustainable Solutions Hack",
    "description": "Tackle pressing environmental issues with innovative technology. Focus on renewable energy, waste management, and smart agriculture to create a greener future. Participants will work on solutions that contribute to the UN Sustainable Development Goals.",
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
    "tags": ["Sustainability", "IoT", "Green Tech", "Smart Cities", "Environment"],
    "imageUrl": "https://images.unsplash.com/photo-1582213782179-e0d53f02e979?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "cashPrize": 4000,
    "participantsRegistered": 78,
    "registrationLink": "https://example.com/register/eco-hack",
    "rulesLink": "https://example.com/rules/eco-hack",
    "theme": "Circular Economy",
    "tracks": ["Water Management", "Renewable Energy", "Waste Reduction"],
    "mentors": ["Dr. Emily Green"]
  },
  {
    "_id": "682f1d10991bae10d92554ce",
    "name": "Blockchain Innovate",
    "description": "A deep dive into decentralized applications, smart contracts, and blockchain security. Build your DApp and contribute to the future of decentralized systems! This hackathon provides a platform for blockchain enthusiasts to collaborate on real-world decentralized solutions.",
    "organizer": {
      "_id": "682ee2442a53922ad0c0c3db",
      "name": "Blockchain Gurus",
      "email": "info@blockchain.org"
    },
    "judges": [],
    "startDate": "2025-05-20T09:00:00.000Z", // Past date for demonstration
    "endDate": "2025-05-22T18:00:00.000Z",
    "isActive": true,
    "location": "Online",
    "tags": ["Blockchain", "Web3", "Crypto", "FinTech", "Decentralized"],
    "imageUrl": "https://images.unsplash.com/photo-1620325492265-d5c4146a8e32?auto=format&fit=crop&q=80&w=2832&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "cashPrize": 6000,
    "participantsRegistered": 150,
    "registrationLink": "https://example.com/register/blockchain-hack",
    "theme": "Future of Finance",
    "tracks": ["DeFi", "NFTs", "Supply Chain"],
    "mentors": ["Mr. Fred Jones"]
  },
  {
    "_id": "682f1d10991bae10d92554cf",
    "name": "Game Dev Jam 2025",
    "description": "Unleash your creativity and build exciting new games. All engines and platforms welcome, from indie titles to immersive VR experiences! This is your chance to turn your game ideas into reality with the support of experienced mentors.",
    "organizer": {
      "_id": "682ee2442a53922ad0c0c3dc",
      "name": "Playmakers Studio",
      "email": "contact@playmakers.com"
    },
    "judges": [],
    "startDate": "2025-05-24T09:00:00.000Z", // Today's date for demonstration (Ongoing/Upcoming depending on exact time)
    "endDate": "2025-05-26T18:00:00.000Z",
    "isActive": true,
    "location": "Chennai, India",
    "tags": ["Game Development", "Unity", "Unreal Engine", "Design", "VR"],
    "imageUrl": "https://images.unsplash.com/photo-1611100582269-05d52233f2c5?auto=format&fit=crop&q=80&w=2832&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "cashPrize": 2500,
    "participantsRegistered": 85,
    "registrationLink": "https://example.com/register/gamedev-jam",
    "rulesLink": "https://example.com/rules/gamedev-jam",
    "discordLink": "https://discord.gg/gamedev-jam",
    "theme": "Retro-futurism",
    "tracks": ["Action", "Puzzle", "Simulation"],
    "mentors": ["Ms. Grace Hopper"]
  },
  {
    "_id": "682f1d10991bae10d92554d0",
    "name": "Data Science Challenge",
    "description": "Dive into big data and machine learning. Solve real-world problems using advanced analytical techniques and present your findings. This challenge emphasizes practical application of data science to business and social issues.",
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
    "tags": ["Data Science", "Machine Learning", "Analytics", "Python", "R"],
    "imageUrl": "https://images.unsplash.com/photo-1507207611896-cd44c7b8c2c7?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "cashPrize": 4500,
    "participantsRegistered": 110,
    "registrationLink": "https://example.com/register/data-science",
    "theme": "Predictive Analytics",
    "tracks": ["Financial Modeling", "Customer Behavior", "Healthcare Data"],
    "mentors": ["Dr. Isaac Newton", "Ms. Katherine Johnson"]
  }
];
// --- End Dummy Data ---


const HackathonDetailPage = () => {
  const { hackathonId } = useParams(); // Get the ID from the URL
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // In a real application, you would make an API call here:
    // fetch(`/api/hackathons/${hackathonId}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     setHackathon(data);
    //     setLoading(false);
    //   })
    //   .catch(err => {
    //     setError("Failed to load hackathon details.");
    //     setLoading(false);
    //   });

    // For now, we'll find it from our dummy data:
    const foundHackathon = DUMMY_HACKATHONS.find(h => h._id === hackathonId);
    if (foundHackathon) {
      setHackathon(foundHackathon);
    } else {
      setError("Hackathon not found.");
    }
    setLoading(false);
  }, [hackathonId]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center text-gray-700 text-xl">Loading hackathon details...</div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center flex-col p-6">
          <p className="text-red-600 text-2xl font-semibold mb-4">{error}</p>
          <Link to="/explore" className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition duration-300 flex items-center">
            <ArrowLeftIcon className="h-5 w-5 mr-2" /> Back to Explore
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (!hackathon) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex-grow flex items-center justify-center flex-col p-6">
                <p className="text-gray-600 text-xl font-semibold mb-4">No hackathon data available.</p>
                <Link to="/explore" className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition duration-300 flex items-center">
                    <ArrowLeftIcon className="h-5 w-5 mr-2" /> Back to Explore
                </Link>
            </div>
            <Footer />
        </div>
    );
  }

  // Helper to format dates
  const formatDateRange = (start, end) => {
    const startDate = new Date(start).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const endDate = new Date(end).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    return `${startDate} - ${endDate}`;
  };

  // Determine status based on dates relative to current date
  const now = new Date();
  const start = new Date(hackathon.startDate);
  const end = new Date(hackathon.endDate);

  let currentStatus = '';
  let statusColor = '';
  let actionButton = null;

  if (now < start) {
    currentStatus = 'Upcoming';
    statusColor = 'bg-blue-600';
    actionButton = (
      <a href={hackathon.registrationLink} target="_blank" rel="noopener noreferrer"
        className="bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-green-600 transform hover:scale-105 transition duration-300 ease-in-out flex items-center justify-center">
        <BookmarkIcon className="h-6 w-6 mr-3" /> Register Now
      </a>
    );
  } else if (now >= start && now <= end) {
    currentStatus = 'Ongoing';
    statusColor = 'bg-orange-500';
    actionButton = (
      <a href={hackathon.discordLink || '#'} target="_blank" rel="noopener noreferrer"
        className="bg-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-purple-700 transform hover:scale-105 transition duration-300 ease-in-out flex items-center justify-center">
        <CodeBracketIcon className="h-6 w-6 mr-3" /> Join Hackathon
      </a>
    );
  } else {
    currentStatus = 'Past';
    statusColor = 'bg-gray-600';
    actionButton = (
      <Link to="/explore"
        className="bg-gray-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-gray-600 transform hover:scale-105 transition duration-300 ease-in-out flex items-center justify-center">
        <ArrowLeftIcon className="h-6 w-6 mr-3" /> Explore Other Hackathons
      </Link>
    );
  }


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Image Section */}
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(${hackathon.imageUrl || 'https://via.placeholder.com/1500x500?text=Hackathon+Banner'})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
        <div className="absolute bottom-0 left-0 p-8 text-white z-10 w-full">
          <Link to="/explore" className="inline-flex items-center text-lg mb-4 hover:text-orange-300 transition duration-200">
            <ArrowLeftIcon className="h-5 w-5 mr-2" /> Back to all Hackathons
          </Link>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-2 leading-tight drop-shadow-lg">
            {hackathon.name}
          </h1>
          <p className="text-xl opacity-90 drop-shadow">{hackathon.location || 'Online / TBD'}</p>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto px-6 py-12 flex-grow">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 -mt-20 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Status and Actions */}
            <div className="md:col-span-1 flex flex-col items-start space-y-6">
              <span className={`px-5 py-2 rounded-full text-lg font-bold text-white ${statusColor} shadow-md`}>
                {currentStatus}
              </span>
              <div className="w-full">
                {actionButton}
              </div>
              {hackathon.registrationLink && currentStatus === 'Upcoming' && (
                <a href={hackathon.registrationLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                  <BookmarkIcon className="h-5 w-5 mr-2" /> Registration Link
                </a>
              )}
              {hackathon.discordLink && currentStatus !== 'Past' && (
                <a href={hackathon.discordLink} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline flex items-center">
                  <CodeBracketIcon className="h-5 w-5 mr-2" /> Join Discord
                </a>
              )}
              {hackathon.rulesLink && (
                <a href={hackathon.rulesLink} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline flex items-center">
                  <TagIcon className="h-5 w-5 mr-2" /> Read Rules
                </a>
              )}
            </div>

            {/* Details Column */}
            <div className="md:col-span-2">
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                {hackathon.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 mb-8">
                <div className="flex items-center text-lg">
                  <CalendarDaysIcon className="h-6 w-6 mr-3 text-purple-600" />
                  <span>Dates: {formatDateRange(hackathon.startDate, hackathon.endDate)}</span>
                </div>
                <div className="flex items-center text-lg">
                  <MapPinIcon className="h-6 w-6 mr-3 text-orange-500" />
                  <span>Location: {hackathon.location || 'Online / TBD'}</span>
                </div>
                <div className="flex items-center text-lg">
                  <UsersIcon className="h-6 w-6 mr-3 text-green-600" />
                  <span>Participants: {hackathon.participantsRegistered !== undefined ? hackathon.participantsRegistered : 'N/A'}</span>
                </div>
                <div className="flex items-center text-2xl font-bold text-green-700">
                  <CurrencyDollarIcon className="h-8 w-8 mr-3 text-green-600" />
                  <span>Prize: {hackathon.cashPrize ? `$${hackathon.cashPrize.toLocaleString()}` : 'N/A'}</span>
                </div>
              </div>

              {/* Tags/Technologies */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Technologies & Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {(hackathon.tags || ['General', 'Tech']).map((tag, index) => (
                    <span key={index} className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Additional Details (Theme, Tracks, Mentors) */}
              {(hackathon.theme || hackathon.tracks || hackathon.mentors) && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">More Information</h3>
                  {hackathon.theme && (
                    <p className="text-gray-700 mb-2"><span className="font-semibold">Theme:</span> {hackathon.theme}</p>
                  )}
                  {hackathon.tracks && hackathon.tracks.length > 0 && (
                    <p className="text-gray-700 mb-2"><span className="font-semibold">Tracks:</span> {hackathon.tracks.join(', ')}</p>
                  )}
                  {hackathon.mentors && hackathon.mentors.length > 0 && (
                    <p className="text-gray-700"><span className="font-semibold">Mentors:</span> {hackathon.mentors.join(', ')}</p>
                  )}
                </div>
              )}

              {/* Organizer Info */}
              {hackathon.organizer && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Organized By</h3>
                  <p className="text-gray-700 text-lg font-semibold">{hackathon.organizer.name}</p>
                  <p className="text-gray-500 text-sm">{hackathon.organizer.email}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HackathonDetailPage;