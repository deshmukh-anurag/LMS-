import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { AppContext} from '../../context/AppContext';
import { Link } from 'react-router-dom';

const CourseCard = ({course}) => {
  const {currency,calculateRating} = useContext(AppContext);
  return (
    <Link 
      to={'/course/' + course._id} 
      onClick={()=>scrollToTop()}
      className="block bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative">
        <img 
          src={course.courseThumbnail} 
          alt={course.courseTitle}
          className="w-full h-48 object-cover"
        />
        {course.discount > 0 && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
            {course.discount}% OFF
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {course.courseTitle}
        </h3>
        <p className="text-gray-600 text-sm mb-3">
          {course.educator.name}
        </p>
        <div className="flex items-center gap-2 mb-3">
          <p className="text-yellow-500 font-bold">{calculateRating(course)}</p>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <img 
                key={i} 
                src={i < Math.floor(calculateRating(course)) ? assets.star : assets.star_blank} 
                alt="rating" 
                className="w-4 h-4"
              />
            ))}
          </div>
          <p className="text-gray-500 text-sm">
            ({course.courseRatings?.length || 0})
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-blue-600">
            {currency}{(course.coursePrice-course.discount*course.coursePrice/100).toFixed(2)}
          </p>
          {course.discount > 0 && (
            <p className="text-gray-500 line-through text-sm">
              {currency}{course.coursePrice}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}

export default CourseCard