import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/student/Home'
import CourseList from './pages/student/Courselist'
import CourseDetails from './pages/student/CourseDetails'
import Educator from './pages/Educator/Educator'
import Dashboard from './pages/Educator/Dashboard'
import MyCourses from './pages/Educator/MyCourses'
import StudentsEnrolled from './pages/Educator/StudentsEnrolled'
import Addcourse from './pages/Educator/Addcourse'
import Player from './pages/student/Player'  
import MyEnrollment from './pages/student/MyEnrollment'
import Loading from './components/student/Loading'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/course-list' element={< CourseList/>} />
        <Route path='/course/:id' element={< CourseDetails />} />
        <Route path='/course-list/:input' element={< CourseList />} />
        <Route path='/my-enrollment' element={<MyEnrollment />}></Route>
        <Route path='/player/:courseId' element={< Player />} />
        <Route path='/loading/:path' element={< Loading/>} />
        <Route path='/educator' element={<Educator/>}>
              <Route path='educator' element={<Dashboard/>}/>
              <Route path='add-course' element={<Addcourse/>}/>
              <Route path='my-courses' element={<MyCourses/>}/>
              <Route path='student-enrolled' element={<StudentsEnrolled/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
