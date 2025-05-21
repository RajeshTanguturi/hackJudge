import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'
import { useState } from 'react'

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  return (
    <div className="flex h-screen bg-hackjustice-background">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}

export default Layout