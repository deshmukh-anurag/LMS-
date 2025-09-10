import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Sidebar = () => {

  const {isEducator}=useContext(AppContext);
  const menuItems = [
  { name: 'Dashboard', path: '/educator', icon: assets.home_icon },
  { name: 'Add Course', path: '/educator/add-course', icon: assets.add_icon },
  { name: 'My Courses', path: '/educator/my-courses', icon: assets.my_course_icon },
  { name: 'Student Enrolled', path: '/educator/student-enrolled', icon: assets.person_tick_icon },
];

  return (
    <div className="min-h-screen w-64 bg-gradient-to-b from-cyan-100 via-cyan-50 to-white p-4 shadow-lg pt-20">
      <div className="space-y-2 relative">
        {menuItems.map((item) => (
          <NavLink
            to={item.path} 
            key={item.name}
            end={item.path==='/educator'}
            className={({ isActive }) => 
              `flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'hover:bg-cyan-100 text-gray-700'
              }`
            }
          >
            <img src={item.icon} alt="" className="w-5 h-5" />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Sidebar