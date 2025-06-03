// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';
// import {
//   CalendarDaysIcon,
//   MapPinIcon,
//   UsersIcon,
//   CurrencyDollarIcon,
//   GlobeAltIcon,
//   LinkIcon,
//   MegaphoneIcon,
//   EnvelopeIcon,
//   ArrowLeftIcon,
//   BookmarkIcon,
//   CodeBracketIcon,
//   TagIcon,
// } from '@heroicons/react/24/solid';

// const API_URL = import.meta.env.VITE_API_URL;

// const HackathonDetailPage = () => {
//   const { id } = useParams();
//   const [hackathon, setHackathon] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchHackathonDetails = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/hackathons/${id}`);
//         setHackathon(response.data);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHackathonDetails();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-50">
//         <div className="text-xl text-gray-700">Loading hackathon details...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-red-100 text-red-800">
//         Error: {error.message || 'Something went wrong'}. Could not load hackathon details.
//       </div>
//     );
//   }

//   if (!hackathon) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-50">
//         <div className="text-xl text-gray-700">Hackathon not found.</div>
//       </div>
//     );
//   }

//   const {
//     name,
//     description,
//     organizer,
//     startDate,
//     endDate,
//     location,
//     profileImgUrl,
//     coverImgUrl,
//     prize,
//     maxMembersPerTeam,
//     minMembersPerTeam,
//     noOfWinners,
//     socialMediaUrls,
//     registrationLink,
//     websiteLink,
//     contactEmail,
//     tags,
//     theme,
//     tracks,
//     mentors,
//     participantsRegistered,
//     discordLink,
//     rulesLink,
//   } = hackathon;

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     return new Date(dateString).toLocaleString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   const formatDateRange = (start, end) => {
//     return `${formatDate(start)} - ${formatDate(end)}`;
//   };

//   const currentStatus = new Date() < new Date(startDate) ? 'Upcoming' : new Date() > new Date(endDate) ? 'Past' : 'Ongoing';
//   const statusColor = currentStatus === 'Upcoming' ? 'bg-yellow-500' : currentStatus === 'Ongoing' ? 'bg-green-500' : 'bg-gray-500';

//   const actionButton = registrationLink && currentStatus !== 'Past' ? (
//     <a
//       href={registrationLink}
//       target="_blank"
//       rel="noopener noreferrer"
//       className="inline-flex items-center justify-center px-6 py-3 rounded-full text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
//     >
//       <LinkIcon className="h-6 w-6 mr-3" />
//       Register Now!
//     </a>
//   ) : null;

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       {/* Hero Image Section */}
//       <div
//         className="relative h-96 bg-cover bg-center"
//         style={{
//           backgroundImage: `url(${coverImgUrl || profileImgUrl || 'https://via.placeholder.com/1500x500?text=Hackathon+Banner'})`,
//         }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
//         <div className="absolute bottom-0 left-0 p-8 text-white z-10 w-full">
//           <Link
//             to="/explore"
//             className="inline-flex items-center text-lg mb-4 hover:text-orange-300 transition duration-200"
//           >
//             <ArrowLeftIcon className="h-5 w-5 mr-2" /> Back to all Hackathons
//           </Link>
//           <h1 className="text-5xl md:text-6xl font-extrabold mb-2 leading-tight drop-shadow-lg">{name}</h1>
//           <p className="text-xl opacity-90 drop-shadow">{location || 'Online / TBD'}</p>
//         </div>
//       </div>

//       {/* Main Content Section */}
//       <div className="container mx-auto px-6 py-12 flex-grow">
//         <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 -mt-20 relative z-20">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
//             {/* Status and Actions */}
//             <div className="md:col-span-1 flex flex-col items-start space-y-6">
//               <span
//                 className={`px-5 py-2 rounded-full text-lg font-bold text-white ${statusColor} shadow-md`}
//               >
//                 {currentStatus}
//               </span>
//               <div className="w-full">{actionButton}</div>
//               {registrationLink && currentStatus === 'Upcoming' && (
//                 <a
//                   href={registrationLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 hover:underline flex items-center"
//                 >
//                   <BookmarkIcon className="h-5 w-5 mr-2" /> Registration Link
//                 </a>
//               )}
//               {discordLink && currentStatus !== 'Past' && (
//                 <a
//                   href={discordLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-purple-600 hover:underline flex items-center"
//                 >
//                   <CodeBracketIcon className="h-5 w-5 mr-2" /> Join Discord
//                 </a>
//               )}
//               {rulesLink && (
//                 <a
//                   href={rulesLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-orange-600 hover:underline flex items-center"
//                 >
//                   <TagIcon className="h-5 w-5 mr-2" /> Read Rules
//                 </a>
//               )}
//             </div>

//             {/* Details Column */}
//             <div className="md:col-span-2">
//               <p className="text-gray-700 text-lg mb-6 leading-relaxed">
//                 {description ||
//                   'No detailed description provided for this hackathon. Check the official website for more information.'}
//               </p>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 mb-8">
//                 <div className="flex items-center text-lg">
//                   <CalendarDaysIcon className="h-6 w-6 mr-3 text-purple-600" />
//                   <span>Dates: {formatDateRange(startDate, endDate)}</span>
//                 </div>
//                 <div className="flex items-center text-lg">
//                   <MapPinIcon className="h-6 w-6 mr-3 text-orange-500" />
//                   <span>Location: {location || 'Online / TBD'}</span>
//                 </div>
//                 <div className="flex items-center text-lg">
//                   <UsersIcon className="h-6 w-6 mr-3 text-green-600" />
//                   <span>
//                     Team Size:{' '}
//                     {minMembersPerTeam && maxMembersPerTeam
//                       ? `${minMembersPerTeam} - ${maxMembersPerTeam} members`
//                       : minMembersPerTeam
//                       ? `Min ${minMembersPerTeam} members`
//                       : maxMembersPerTeam
//                       ? `Max ${maxMembersPerTeam} members`
//                       : 'N/A'}
//                   </span>
//                 </div>
//                 <div className="flex items-center text-lg">
//                   <MegaphoneIcon className="h-6 w-6 mr-3 text-yellow-600" />
//                   <span>Number of Winners: {noOfWinners || 'N/A'}</span>
//                 </div>
//                 <div className="flex items-center text-lg">
//                   <CurrencyDollarIcon className="h-6 w-6 mr-3 text-green-700" />
//                   <span>
//                     Prize: {prize !== undefined && prize > 0 ? `₹${prize.toLocaleString()}` : 'No Cash Prize'}
//                   </span>
//                 </div>
//                 <div className="flex items-center text-lg">
//                   <UsersIcon className="h-6 w-6 mr-3 text-blue-600" />
//                   <span>
//                     Participants Registered:{' '}
//                     {participantsRegistered !== undefined ? participantsRegistered : 'N/A'}
//                   </span>
//                 </div>
//               </div>

//               {/* Tags/Technologies */}
//               <div className="mb-8">
//                 <h3 className="text-xl font-bold text-gray-800 mb-3">Technologies & Tags</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {(tags || ['General', 'Tech']).map((tag, index) => (
//                     <span
//                       key={index}
//                       className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium"
//                     >
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {/* Additional Details (Theme, Tracks, Mentors) */}
//               {(theme || tracks || mentors) && (
//                 <div className="mb-8">
//                                     <h3 className="text-xl font-bold text-gray-800 mb-3">More Information</h3>
//                   {theme && (
//                     <p className="text-gray-700 mb-2">
//                       <span className="font-semibold">Theme:</span> {theme}
//                     </p>
//                   )}
//                   {tracks && tracks.length > 0 && (
//                     <p className="text-gray-700 mb-2">
//                       <span className="font-semibold">Tracks:</span> {tracks.join(', ')}
//                     </p>
//                   )}
//                   {mentors && mentors.length > 0 && (
//                     <p className="text-gray-700 mb-2">
//                       <span className="font-semibold">Mentors:</span> {mentors.join(', ')}
//                     </p>
//                   )}
//                 </div>
//               )}

//               {/* Organizer Info */}
//               {organizer && (
//                 <div className="mb-8">
//                   <h3 className="text-xl font-bold text-gray-800 mb-3">Organized By</h3>
//                   <p className="text-gray-700 text-lg font-semibold">{organizer.name}</p>
//                   {organizer.email && (
//                     <p className="text-gray-500 flex items-center text-sm">
//                       <EnvelopeIcon className="h-5 w-5 mr-2 text-gray-400" />
//                       {organizer.email}
//                     </p>
//                   )}
//                 </div>
//               )}

//               {/* Website and Contact */}
//               <div className="flex flex-wrap gap-4 mt-6">
//                 {websiteLink && (
//                   <a
//                     href={websiteLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center text-blue-600 hover:underline"
//                   >
//                     <GlobeAltIcon className="h-5 w-5 mr-2" />
//                     Visit Website
//                   </a>
//                 )}
//                 {contactEmail && (
//                   <a
//                     href={`mailto:${contactEmail}`}
//                     className="inline-flex items-center text-gray-600 hover:underline"
//                   >
//                     <EnvelopeIcon className="h-5 w-5 mr-2" />
//                     Contact Organizer
//                   </a>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HackathonDetailPage;



import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'; // assuming you use react-router
import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  MapPinIcon,
  UsersIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

const API_URL = import.meta.env.VITE_API_URL;

const HackathonDetail = () => {
  const { id } = useParams(); // get hackathon ID from URL params
  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchHackathon() {
      try {
        const response = await fetch(`${API_URL}/hackathons/${id}`); // replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch hackathon data');
        }
        const data = await response.json();
        setHackathon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchHackathon();
  }, [id]);

  const formatDateRange = (start, end) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const startDate = new Date(start).toLocaleDateString(undefined, options);
    const endDate = new Date(end).toLocaleDateString(undefined, options);
    return `${startDate} - ${endDate}`;
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (error) return <p className="text-center mt-20 text-red-600">{error}</p>;
  if (!hackathon) return <p className="text-center mt-20">No hackathon data found</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: `url(${hackathon.coverImgUrl || 'https://via.placeholder.com/1500x500?text=Hackathon+Banner'})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>

        <div className="absolute bottom-0 left-0 p-8 text-white z-10 w-full flex items-center space-x-4">
          <Link
            to="/explore"
            className="inline-flex items-center text-lg mb-4 hover:text-orange-300 transition duration-200"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" /> Back to all Hackathons
          </Link>
          {hackathon.profileImgUrl && (
            <img
              src={hackathon.profileImgUrl}
              alt={`${hackathon.name} profile`}
              className="w-24 h-24 rounded-full object-cover border-2 border-white shadow-lg"
            />
          )}
          <h1 className="text-5xl md:text-6xl font-extrabold mb-2 leading-tight drop-shadow-lg">
            {hackathon.name}
          </h1>
        </div>

        <div className="absolute bottom-12 left-8 text-white opacity-90 drop-shadow-lg text-xl">
          {hackathon.location || 'Online / TBD'}
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 flex-grow">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 -mt-20 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-1 flex flex-col items-start space-y-6">
              {hackathon.websiteUrl && (
                <a
                  href={hackathon.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow transition duration-300"
                >
                  Register Now
                </a>
              )}
            </div>

            <div className="md:col-span-2 space-y-6 text-gray-700">
              <p className="text-lg leading-relaxed">{hackathon.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg">
                <div className="flex items-center">
                  <CalendarDaysIcon className="h-6 w-6 mr-3 text-purple-600" />
                  <span>
                    Dates: {formatDateRange(hackathon.startDate, hackathon.endDate)}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="h-6 w-6 mr-3 text-orange-500" />
                  <span>Location: {hackathon.location}</span>
                </div>
                <div className="flex items-center">
                  <UsersIcon className="h-6 w-6 mr-3 text-green-600" />
                  <span>
                    Team Size: {hackathon.minMembersPerTeam} - {hackathon.maxMembersPerTeam}
                  </span>
                </div>
                <div className="flex items-center font-bold text-green-700 text-2xl">
                  <CurrencyDollarIcon className="h-8 w-8 mr-3 text-green-600" />
                  <span>Prize: ₹{hackathon.prize.toLocaleString()}</span>
                </div>
              </div>

              <div className="text-sm text-gray-400">
                <p>Hackathon ID: {hackathon._id.$oid}</p>
                <p>Created At: {new Date(hackathon.createdAt.$date).toLocaleString()}</p>
                <p>Updated At: {new Date(hackathon.updatedAt.$date).toLocaleString()}</p>
                <p>Status: {hackathon.isActive ? 'Active' : 'Inactive'}</p>
                <p>Number of Winners: {hackathon.noOfWinners}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackathonDetail;
