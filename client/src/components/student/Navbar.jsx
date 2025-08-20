import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import {useClerk, UserButton ,useUser} from '@clerk/clerk-react'
import { AppContext } from '../../context/AppContext'
const Navbar = () => {
  const isCourseListPage = location.pathname.includes('/course-list');
  const {openSignIn} = useClerk();
  const {user} = useUser();
  const {navigate,isEducator} = useContext(AppContext);
  return (
    <div className={`flex justify-between items-center bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-3 shadow-md fixed top-0 left-0 right-0 z-50`}>
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-3">
          <img onClick={()=>navigate('/')} src={logo} alt="Logo" className='w-16 h-16 object-contain cursor-pointer hover:opacity-90 transition-opacity' />
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-blue-600">SkillForge</span>
            <span className="text-sm tezxt-gray-600">Learn. Grow. Succeed.</span>
          </div>
        </Link>
      </div>

      <div className='flex items-center gap-8 text-gray-700 font-medium'>
        <div className='flex items-center gap-6'>
          { user && <>
            <button className='hover:text-blue-600 hover:scale-105 transition-all duration-300' onClick={()=>{navigate('educator')}}>  {isEducator?'Educator Dashboard':'Become Educator'}</button>
            <Link to='/my-enrollment' className="hover:text-blue-600 hover:scale-105 transition-all duration-300">
              My Enrollment
            </Link>
          </>
          }
        </div>
        {user ? <UserButton /> : <button onClick={() => { openSignIn() }} className='bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-md hover:from-blue-700 hover:to-cyan-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300'>
          Create Account
        </button>}
      </div>
    </div>
  )
}

export default Navbar