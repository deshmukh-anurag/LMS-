import React from 'react'
import { assets } from '../../assets/assets'
import SearchBar from './SearchBar'

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 py-12 bg-gradient-to-b from-cyan-100 via-cyan-50 to-white mt-20">
      <div className="max-w-3xl mx-auto text-center relative">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4">
          Empower Your Learning Journey With Courses Designed by{' '}
          <span className="text-blue-600 relative inline-block">
            Expert Faculty at IIIT
          </span>
        </h1>
        <img 
          src={assets.sketch} 
          alt="sketch" 
          className="absolute -right-20 -top-16 w-32 h-40 opacity-90 transform rotate-12"
        />
        <p className="text-sm md:text-base text-gray-700 max-w-2xl mx-auto leading-relaxed mb-6">
          We are committed to providing high-quality education and resources to improve the quality of education in India. 
          Our platform offers a wide range of courses designed by expert faculty at IIIT, ensuring that you receive the best
          learning experience possible.
        </p>
        <SearchBar />
        
      </div>
    </div>
  )
}

export default Hero