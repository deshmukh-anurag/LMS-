import React from 'react'
import { assets } from '../../assets/assets'
import { Navigate, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'

const Footer = () => {
  const navigate=useNavigate();
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <img 
              onClick={()=>navigate('/')} 
              src={logo} 
              alt="Logo" 
              className="h-12 cursor-pointer hover:opacity-90 transition-opacity"
            />
            <p className="text-gray-400 text-sm max-w-xs">
              This is the Default Font in printing and typesetting 
              industry.This is standard dummy text.
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <img src={assets.facebook_icon} alt="Facebook" className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <img src={assets.twitter_icon} alt="Twitter" className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <img src={assets.instagram_icon} alt="Instagram" className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white">Company</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-white">Subscribe to our newsletter</h2>
            <div className="flex space-y-3">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Enter your Email" 
                  className="w-full bg-gray-800 text-white pl-4 pr-24 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-gray-700 text-sm"
                />
                <button className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:from-cyan-700 hover:to-cyan-800 transition-all duration-300 shadow-sm hover:shadow-md">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6">
          <p className="text-center text-gray-400 text-sm">
            Copyright 2025 © SkillForge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer