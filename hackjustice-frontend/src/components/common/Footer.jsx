import React from 'react'

function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-white border-t border-gray-200 py-3">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
        <div>
          &copy; {currentYear} HackJustice. All rights reserved.
        </div>
        <div className="mt-2 sm:mt-0">
          <a href="#" className="hover:text-hackjustice-primary">Privacy Policy</a>
          <span className="mx-2">•</span>
          <a href="#" className="hover:text-hackjustice-primary">Terms of Service</a>
          <span className="mx-2">•</span>
          <a href="#" className="hover:text-hackjustice-primary">Contact</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer