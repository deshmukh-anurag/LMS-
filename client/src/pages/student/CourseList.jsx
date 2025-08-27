import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import SearchBar from '../../components/student/SearchBar';
import { useParams } from 'react-router-dom';
import CourseCard from '../../components/student/CourseCard';
import { assets } from '../../assets/assets';

const CourseList = () => {
  const {input}=useParams();
  const {navigate,allCourses}=useContext(AppContext);
  const [filteredCourse, setFilteredCourse] = useState([])
  // Initialize filtered courses when component mounts or when allCourses changes
  useEffect(() => {
    if (allCourses) {
      const tempCourses = allCourses.slice();
      console.log(tempCourses)
      if (input) {
        const searchTerm = input.toLowerCase();
        console.log(searchTerm);
        const filtered = tempCourses.filter(course => 
          course.courseTitle.toLowerCase().includes(searchTerm)
        );
        console.log(filtered);
        setFilteredCourse(filtered);
      } else {
        setFilteredCourse(tempCourses);
      }
    }
  }, [input, allCourses]);
  return (
    <>
    <div className="min-h-screen bg-gray-50">
      {/* Header section with breadcrumb */}
      <div className="bg-white shadow-sm pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Course List</h1>
          <p className="text-gray-600">
            <span 
              onClick={() => navigate('/')} 
              className="text-cyan-600 hover:text-cyan-700 cursor-pointer"
            >
              Home
            </span>{' '}
            /{' '}
            <span className="text-gray-600">Course List</span>
          </p>
        </div>
      </div>

      {/* Main content area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search Row */}
        <div className="flex justify-between items-center mb-8">
          <div className="w-120">
            <SearchBar data={input} />
          </div>
        </div>

        {
          input && 
          <div className="flex items-center gap-2 bg-blue-50 p-2 px-4 rounded-lg mb-6 w-fit">
            <p className="text-blue-600 font-medium">Search: {input}</p>
            <img 
              src={assets.cross_icon} 
              alt="clear search" 
              className="w-5 h-5 cursor-pointer hover:opacity-75 transition-opacity" 
              onClick={() => navigate('/course-list')} 
            />
          </div>
        }
        {!allCourses ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading courses...</p>
          </div>
        ) : filteredCourse.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">
              {input ? `No courses found for "${input}". Try a different search term.` : 'No courses available.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourse.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  )
}

export default CourseList