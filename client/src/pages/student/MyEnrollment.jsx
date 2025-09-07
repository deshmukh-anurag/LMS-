import React, { useContext, useState } from 'react'
import {Line} from 'rc-progress'
import { AppContext} from '../../context/AppContext';

const MyEnrollment = () => {
  const { enrolledCourses,calculateCourseDuration,navigate} = useContext(AppContext);
  const [progressArray,setProgressArray] = useState([
    {lectureCompleted:2 , totalLectures:4},
    {lectureCompleted:2 , totalLectures:4},
    {lectureCompleted:1 , totalLectures:4},
    {lectureCompleted:4 , totalLectures:4},
    {lectureCompleted:0 , totalLectures:4},
    {lectureCompleted:2 , totalLectures:4},
    {lectureCompleted:2 , totalLectures:4},
    {lectureCompleted:3 , totalLectures:7},
    {lectureCompleted:21 , totalLectures:30},
    {lectureCompleted:2 , totalLectures:4},
    {lectureCompleted:2 , totalLectures:4},
    {lectureCompleted:1 , totalLectures:2},
    {lectureCompleted:2 , totalLectures:4},
    {lectureCompleted:2 , totalLectures:4}
  ]);
  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 via-cyan-50 to-white">
      {/* Container with padding to avoid navbar overlap */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Enrollments</h1>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/5">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {enrolledCourses.map((course, index) => {
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={course.courseThumbnail} 
                          alt="" 
                          className="h-16 w-24 object-cover rounded"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{course.courseTitle}</p>
                        </div>
                        <Line strokeWidth={4} percent={progressArray[index]?.lectureCompleted / progressArray[index]?.totalLectures * 100} />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {calculateCourseDuration(course)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-900">
                          {progressArray[index] && `${progressArray[index].lectureCompleted} / ${progressArray[index].totalLectures} `}
                        </span>
                        <span className="ml-2 text-xs text-gray-500">Lectures</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => navigate('/player/'+ course._id)}
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          progressArray[index] && progressArray[index].lectureCompleted === progressArray[index].totalLectures
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {progressArray[index] && progressArray[index].lectureCompleted === progressArray[index].totalLectures 
                          ? 'Completed' 
                          : 'On Going'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  )
}

export default MyEnrollment