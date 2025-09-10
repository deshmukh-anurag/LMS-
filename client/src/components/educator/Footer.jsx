import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-white border-t py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo and Copyright */}
          <div className="flex items-center space-x-2">
            <img src={assets.logo} alt="Logo" className="h-8 w-auto" />
            <span className="text-sm text-gray-600">
              © {currentYear} All rights reserved
            </span>
          </div>
          
          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <img src={assets.facebook_icon} alt="Facebook" className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <img src={assets.twitter_icon} alt="Twitter" className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800">
              <img src={assets.instagram_icon} alt="Instagram" className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer