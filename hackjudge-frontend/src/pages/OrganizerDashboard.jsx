import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PlusIcon } from '@heroicons/react/24/solid';
import HackathonCard from '../components/HackathonCard';
import CreateHackathonForm from '../components/CreateHackathonForm';
import { AuthContext } from '../context/AuthContext';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const OrganizerDashboard = () => {
  const [hackathons, setHackathons] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const navigate = useNavigate();
  const { userToken } = useContext(AuthContext);

  useEffect(() => {
    fetchHackathons();
  }, [userToken]);

  const fetchHackathons = async () => {
    try {
      const response = await axios.get(`${API_URL}/hackathons/my/myhackathons`, {
        headers: {
          'x-auth-token': userToken
        }
      });
      setHackathons(response.data || []);
    } catch (error) {
      console.error('Error fetching hackathons:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-purple-700">My Hackathons</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Create Hackathon
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(hackathons) && hackathons.map(hackathon => (
          <HackathonCard
            key={hackathon.id}
            hackathon={hackathon}
            onClick={() => navigate(`/hackathon/${hackathon.id}`)}
          />
        ))}
      </div>

      {showCreateForm && (
        <CreateHackathonForm
          onClose={() => setShowCreateForm(false)}
          onSuccess={fetchHackathons}
          token={userToken}
        />
      )}
    </div>
  );
};

export default OrganizerDashboard;