import React from 'react';
import { Routes, Route } from 'react-router-dom';

// import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

import LandingPage from './pages/LandingPage';
import ExploreHackathonsPage from './pages/ExploreHackathonsPage';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import NotFound from './pages/NotFound';
import HackathonDetailPage from './pages/HackathonDetailPage';
import StudentDashboard from './pages/StudentDashboard';
import OrganizerDashboard from './pages/OrganizerDashboard';
import Footer from './components/Footer';
import JudegeDashboard from './pages/JudgeDashboard';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/explore" element={<ExploreHackathonsPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route
          path="/student"
          element={
            <ProtectedRoute roles={['STUDENT']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route 
            path="/organizer" 
            element={
              <ProtectedRoute   roles={['ORGANIZER']}>
                <OrganizerDashboard />
              </ProtectedRoute>
            } 
        />
        <Route path="/judge" element={<JudegeDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;