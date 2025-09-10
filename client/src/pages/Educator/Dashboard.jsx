import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext';
import { assets, dummyDashboardData } from '../../assets/assets';
import Loading from '../../components/student/Loading';

const Dashboard = () => {
  const {currency}= useContext(AppContext)
  const [dashboardData, setDashboardData] = useState(null);
  const fetchDashboardData = async () => {
    // Fetch and set dashboard data here
    setDashboardData(dummyDashboardData);
  }
  useEffect(()=>(
    fetchDashboardData()
  ),[]);
  return dashboardData ? (
    <div className="p-6 pt-24">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-cyan-100 rounded-lg">
              <img src={assets.patients_icon} alt="patient_icon" className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{dashboardData.enrolledStudentsData.length}</p>
              <p className="text-xs text-gray-600">Total Enrollments</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <img src={assets.appointments_icon} alt="appointments_icon" className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{dashboardData.totalCourses}</p>
              <p className="text-xs text-gray-600">Total Courses</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <img src={assets.earning_icon} alt="earning_icon" className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{currency}{dashboardData.totalEarnings}</p>
              <p className="text-xs text-gray-600">Total Earnings</p>
            </div>
          </div>
        </div>
        <div className="col-span-full bg-white rounded-xl shadow-md p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Latest Enrollments</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-cyan-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Title</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dashboardData.enrolledStudentsData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index+1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img 
                          src={item.student.imageUrl} 
                          alt="Profile" 
                          className="h-8 w-8 rounded-full object-cover"
                        />
                        <span className="ml-3 text-sm font-medium text-gray-900">
                          {item.student.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.courseTitle}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : <Loading />
}

export default Dashboard