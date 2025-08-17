import React from 'react'
import { Link } from 'react-router-dom'

const CourseSection = () => {
  return (
    <div>
      <h2>Learn from the best</h2>
      <p>Discover our top courses and enhance your skills under IIIT Faculty guidance.
        From programming to data science and artificial intelligence, we have it all.
      </p>
     <Link to={"/course-list"} onClick={()=>scrollToTop()}>Show all Courses</Link>
    </div>
  )
}

export default CourseSection