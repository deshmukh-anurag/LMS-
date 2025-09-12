import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading';
import { assets, dummyCourses } from '../../assets/assets';

const MyCourses = () => {
  const { currency } = useContext(AppContext);
  const [courses, setCourses] = useState(null);
  
  useEffect(() => {
    const loadCourses = async () => {
      console.log("Loading courses...");
      setCourses(dummyCourses);
    };
    loadCourses();
  }, []);
  console.log("Current courses state:", courses);

  if (!courses) return <Loading />;
  
  if (courses.length === 0) {
    console.log("No courses found");
  }

  return (
    <div className="p-6 pt-24">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Courses</h2>
        <button 
          onClick={() => console.log("Add course clicked")}
          className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors duration-200"
        >
          Add New Course
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md">
        {courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12">
            <img src={assets.my_course_icon} alt="No courses" className="w-20 h-20 mb-4 opacity-50" />
            <p className="text-gray-500 text-lg mb-4">No courses created yet</p>
            <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors duration-200">
              Create Your First Course
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gradient-to-r from-cyan-50 to-blue-50">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Course Title</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Earnings</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Students</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Published On</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courses.map((course) => (
                  <tr key={course._id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-12 w-20 flex-shrink-0">
                          <img 
                            src={course.courseThumbnail || assets.course_1} 
                            alt={course.courseTitle} 
                            className="h-12 w-20 object-cover rounded-md shadow-sm"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{course.courseTitle}</div>
                          <div className="text-sm text-gray-500">{course.isPublished ? 'Published' : 'Draft'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-green-600">
                        {currency}
                        {Math.floor(
                          course.enrolledStudents.length *
                          (course.coursePrice - (course.discount * course.coursePrice / 100))
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{course.enrolledStudents.length}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(course.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyCourses