import React, { useState, useContext } from 'react';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const CreateHackathonForm = ({ onClose, onSuccess }) => {
  const { token } = useContext(AuthContext);
  const [imageFiles, setImageFiles] = useState({
    profile: null,
    cover: null
  });
  const [imagePreview, setImagePreview] = useState({
    profile: '',
    cover: ''
  });
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    websiteUrl: '',
    socialMediaUrls: [''],
    maxMembersPerTeam: 4,
    minMembersPerTeam: 1,
    noOfWinners: 3,
    prize: 0,
    startDate: '',
    endDate: '',
    profileImgUrl: '',
    coverImgUrl: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // New loading state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e, imageType) => {
    const file = e.target.files[0];
    if (file) {
      setImageFiles(prev => ({
        ...prev,
        [imageType === 'profileImgUrl' ? 'profile' : 'cover']: file
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(prev => ({
          ...prev,
          [imageType === 'profileImgUrl' ? 'profile' : 'cover']: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImagesToCloudinary = async () => {
    const uploads = [];
    
    if (imageFiles.profile) {
      const profileFormData = new FormData();
      profileFormData.append('file', imageFiles.profile);
      profileFormData.append('upload_preset', 'hackjudge');
      uploads.push(
        axios.post(
          `https://api.cloudinary.com/v1_1/ddoqyvgol/image/upload`,
          profileFormData,{ headers: { 'Content-Type': 'multipart/form-data' } } 
        ).then(response => ({ type: 'profileImgUrl', url: response.data.secure_url }))
      );
    }

    if (imageFiles.cover) {
      const coverFormData = new FormData();
      coverFormData.append('file', imageFiles.cover);
      coverFormData.append('upload_preset', 'hackjudge');
      uploads.push(
        axios.post(
          `https://api.cloudinary.com/v1_1/ddoqyvgol/image/upload`,
          coverFormData,{ headers: { 'Content-Type': 'multipart/form-data' } } 
        ).then(response => ({ type: 'coverImgUrl', url: response.data.secure_url }))
      );
    }

    const results = await Promise.all(uploads);
    const updatedFormData = { ...formData };
    results.forEach(result => {
      updatedFormData[result.type] = result.url;
    });
    return updatedFormData;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (formData.maxMembersPerTeam < formData.minMembersPerTeam) {
      newErrors.maxMembersPerTeam = 'Max members must be greater than min members';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true); // Set loading to true

    try {
      const dataWithImages = await uploadImagesToCloudinary();
      console.log('Form Data:', dataWithImages);
      console.log('Token:', token);
      await axios.post(`${API_URL}/hackathons`, dataWithImages,{
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json'
        }
      });
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error creating hackathon:', error);
    } finally {
      setIsLoading(false); // Set loading to false in finally block
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => onClose()}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            <h2 className="text-3xl font-bold text-purple-700 mb-8">Create New Hackathon</h2>
            <p className="text-gray-600 mb-6">Fields marked with an asterisk (*) are required.</p>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hackathon Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg border ${errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                      placeholder="Enter hackathon name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="4"
                      className={`w-full px-4 py-2 rounded-lg border ${errors.description ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                      placeholder="Describe your hackathon"
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="datetime-local"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 rounded-lg border ${errors.startDate ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                      />
                      {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="datetime-local"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 rounded-lg border ${errors.endDate ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                      />
                      {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Min Team Size <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="minMembersPerTeam"
                        value={formData.minMembersPerTeam}
                        onChange={handleInputChange}
                        min="1"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Max Team Size <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="maxMembersPerTeam"
                        value={formData.maxMembersPerTeam}
                        onChange={handleInputChange}
                        min="1"
                        className={`w-full px-4 py-2 rounded-lg border ${errors.maxMembersPerTeam ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                      />
                      {errors.maxMembersPerTeam && <p className="text-red-500 text-sm mt-1">{errors.maxMembersPerTeam}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Winners</label>
                      <input
                        type="number"
                        name="noOfWinners"
                        value={formData.noOfWinners}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Prize Pool</label>
                      <input
                        type="number"
                        name="prize"
                        value={formData.prize}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg border ${errors.location ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                      placeholder="City, Country or Online"
                    />
                    {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
                    <input
                      type="url"
                      name="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="https://"
                    />
                  </div>
                </div>
              </div>

              {/* Image Upload Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-purple-500 transition-colors">
                    <div className="space-y-1 text-center">
                      {imagePreview.profile ? (
                        <img
                          src={imagePreview.profile}
                          alt="Profile Preview"
                          className="mx-auto h-32 w-32 object-cover rounded-lg"
                        />
                      ) : (
                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                      )}
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500">
                          <span>Upload a file</span>
                          <input
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, 'profileImgUrl')}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-purple-500 transition-colors">
                    <div className="space-y-1 text-center">
                      {imagePreview.cover ? (
                        <img
                          src={imagePreview.cover}
                          alt="Cover Preview"
                          className="mx-auto h-32 w-full object-cover rounded-lg"
                        />
                      ) : (
                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                      )}
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500">
                          <span>Upload a file</span>
                          <input
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e, 'coverImgUrl')}
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-8">
                <button
                  type="button"
                  onClick={() => onClose()}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading} // Disable button when loading
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  {isLoading ? 'Creating...' : 'Create Hackathon'} {/* Change button text based on loading state */}
                </button>
              </div>
            </form>
          </div>
        </div>
  );
};

export default CreateHackathonForm;