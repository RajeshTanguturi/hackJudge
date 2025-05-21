import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'

// Import pages
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import JudgingPanel from './pages/JudgingPanel'
import ProjectSubmission from './pages/ProjectSubmission'
import EventManagement from './pages/EventManagement'
import SponsorPortal from './pages/SponsorPortal'
import VolunteerHub from './pages/VolunteerHub'

// Import common components
import Layout from './components/common/Layout'

function App() {
  const [user, setUser] = useState(null)

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/register" element={<Register setUser={setUser} />} />
      
      {/* Protected routes with Layout */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/judging" element={<JudgingPanel />} />
        <Route path="/submit-project" element={<ProjectSubmission />} />
        <Route path="/manage-event" element={<EventManagement />} />
        <Route path="/sponsor-portal" element={<SponsorPortal />} />
        <Route path="/volunteer" element={<VolunteerHub />} />
      </Route>
    </Routes>
  )
}

export default App