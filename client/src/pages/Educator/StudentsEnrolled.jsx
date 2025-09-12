import React, { use, useEffect, useState } from 'react'
import { dummyStudentEnrolled } from '../../assets/assets'
import Loading from '../../components/student/Loading'

const StudentsEnrolled = () => {
  const [enrolledStudents, setEnrolledStudents] = useState(null)
  const fetchEnrolledStudents = async () => {
    setEnrolledStudents(dummyStudentEnrolled)
  }

  useEffect(() => {
    fetchEnrolledStudents();
  }, []);

  return enrolledStudents ? (
    <div className="p-6 pt-24">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Students Enrolled</h2>
      <div className="bg-white rounded-xl shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gradient-to-r from-cyan-50 to-blue-50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">#</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Student Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Course Title</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {enrolledStudents.map((student, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img 
                        src={student.student.imageUrl} 
                        alt={student.student.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <span className="ml-3 text-sm font-medium text-gray-900">
                        {student.student.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.courseTitle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(student.purchaseDate).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : <Loading />
}

export default StudentsEnrolled