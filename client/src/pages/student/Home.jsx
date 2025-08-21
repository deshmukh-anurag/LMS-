import React from 'react'
import Hero from '../../components/student/Hero'
import CourseSection from '../../components/student/CourseSection'
import TestimonialsSection from '../../components/student/TestimonialsSection'
import CallToAction from '../../components/student/CallToAction'

const Home = () => {
  return (
    <div>
      <Hero/>
      <CourseSection/>
      <TestimonialsSection/>
      <CallToAction/>
    </div>
  )
}

export default Home