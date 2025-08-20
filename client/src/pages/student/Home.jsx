import React from 'react'
import Hero from '../../components/student/Hero'
import CourseSection from '../../components/student/CourseSection'
import TestimonialsSection from '../../components/student/TestimonialsSection'

const Home = () => {
  return (
    <div>
      <Hero/>
      <CourseSection/>
      <TestimonialsSection/>
    </div>
  )
}

export default Home