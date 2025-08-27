import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({data}) => {
  const navigate=useNavigate();
  const [input,setInput]=useState(data?data:"");
  const onSearchHandler=(e)=>{
    e.preventDefault();
    if (input.trim()) {
      navigate('/course-list/'+ input.trim());
    }
  }
  return (

      <div className="max-w-2xl mx-auto w-full px-4">
        <form onSubmit={onSearchHandler} className="relative flex items-center">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <img 
              src={assets.search_icon} 
              alt="search-icon" 
              className="w-5 h-5 opacity-60"
            />
          </div>
          <input  
          onChange={(e)=>setInput(e.target.value)}
          value={input}
            type="text" 
            placeholder="Search for any course..." 
            className="w-full py-3 pl-12 pr-24 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white text-gray-700 placeholder-gray-400 text-sm transition-all duration-300" 
          />
          <button 
            type="submit" 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-1.5 rounded-full text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Search
          </button>
        </form>
      </div>

  )
}

export default SearchBar