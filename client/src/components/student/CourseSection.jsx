import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';
import CourseCard from './CourseCard';

const CourseSection = () => {
  const { allCourses } = useContext(AppContext);
  return (
    <div className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Learn from the best</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our top courses and enhance your skills under IIIT Faculty guidance.
            From programming to data science and artificial intelligence, we have it all.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {allCourses.slice(0, 4).map((course,index) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
        <div className="text-center">
          <Link 
            to={"/course-list"} 
            onClick={()=>scrollToTop()} 
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-cyan-700 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
          >
            Show all Courses
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CourseSection