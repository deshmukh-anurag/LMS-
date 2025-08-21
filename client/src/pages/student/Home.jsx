import React from 'react'
import Hero from '../../components/student/Hero'
import CourseSection from '../../components/student/CourseSection'
import TestimonialsSection from '../../components/student/TestimonialsSection'
import CallToAction from '../../components/student/CallToAction'
import Footer from '../../components/student/Footer'

const Home = () => {
  return (
    <div>
      <Hero/>
      <CourseSection/>
      <TestimonialsSection/>
      <CallToAction/>
      <Footer/>
    </div>
  )
}

export default Home