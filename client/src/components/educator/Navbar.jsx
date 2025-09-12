import React from 'react'
import { assets, dummyEducatorData } from '../../assets/assets'
import {useClerk, UserButton ,useUser} from '@clerk/clerk-react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const educatorData=dummyEducatorData;
  const {user}=useUser();
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to='/' className="flex items-center">
              <img src={assets.logo} alt="Logo" className="h-8 w-auto" />
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <p className="text-gray-700 font-medium">
              Hi, {user ? user.fullName : 'Developers'}
            </p>
            {user ? 
              <UserButton afterSignOutUrl="/"/> : 
              <img 
                src={assets.profile_img} 
                alt="Profile" 
                className="h-8 w-8 rounded-full object-cover"
              />
            }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar