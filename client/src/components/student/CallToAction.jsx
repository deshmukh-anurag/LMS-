import React from 'react'
import { assets } from '../../assets/assets'

const CallToAction = () => {
  return (
    <div className="py-12 bg-gradient-to-r from-cyan-50 to-blue-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
          Learn anytime, anywhere from Expert Faculty
        </h1>
        <p className="text-base text-gray-600 mb-6 max-w-xl mx-auto">
          Join our online courses and take your skills to the next level 
          with guidance from IIIT expert faculty.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button className="w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:from-cyan-700 hover:to-blue-700 transform hover:-translate-y-0.5 transition-all duration-300 shadow-md text-sm">
            Get Started
          </button>
          <button className="w-full sm:w-auto bg-white text-gray-800 border border-gray-200 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-300 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group text-sm">
            Learn More 
            <img 
              src={assets.arrow_icon} 
              alt="arrow_icon" 
              className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CallToAction