import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const { allCourses, navigate } = useContext(AppContext);

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const findCourse = allCourses.find(course => course._id === id);
      if (findCourse) {
        setCourseData(findCourse);
        setSelectedChapter(findCourse.courseContent[0]?.chapterId);
      }
    }
  }, [allCourses, id]);

  if (!allCourses || !courseData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate total duration
  const totalDuration = courseData.courseContent.reduce((total, chapter) => {
    const chapterDuration = chapter.chapterContent.reduce((sum, lecture) => 
      sum + lecture.lectureDuration, 0);
    return total + chapterDuration;
  }, 0);

  // Format duration to hours and minutes
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Calculate total lessons
  const totalLessons = courseData.courseContent.reduce((total, chapter) => 
    total + chapter.chapterContent.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 via-cyan-50 to-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <span 
            onClick={() => navigate('/course-list')} 
            className="text-cyan-600 hover:text-cyan-700 cursor-pointer"
          >
            Course List
          </span>
          <span className="text-gray-500">/</span>
          <span className="text-gray-600">{courseData.courseTitle}</span>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Course Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{courseData.courseTitle}</h1>
              <div dangerouslySetInnerHTML={{ __html: courseData.courseDescription }} 
                   className="text-gray-600 mb-6 prose max-w-none" />
              
              {/* Course Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <img src={assets.time_clock_icon} alt="Duration" className="w-5 h-5 opacity-60" />
                  <span className="text-sm text-gray-600">{formatDuration(totalDuration)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={assets.lesson_icon} alt="Lessons" className="w-5 h-5 opacity-60" />
                  <span className="text-sm text-gray-600">{totalLessons} Lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={assets.star} alt="Rating" className="w-5 h-5" />
                  <span className="text-sm text-gray-600">
                    {courseData.courseRatings.length > 0 
                      ? (courseData.courseRatings.reduce((acc, curr) => acc + curr.rating, 0) / courseData.courseRatings.length).toFixed(1) 
                      : 'No ratings'} ({courseData.courseRatings.length} ratings)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={assets.person_tick_icon} alt="Students" className="w-5 h-5 opacity-60" />
                  <span className="text-sm text-gray-600">{courseData.enrolledStudents.length} Students enrolled</span>
                </div>
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Content</h2>
              <div className="space-y-4">
                {courseData.courseContent.map((chapter) => (
                  <div key={chapter.chapterId} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setSelectedChapter(chapter.chapterId === selectedChapter ? null : chapter.chapterId)}
                      className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={assets.play_icon} 
                          alt="" 
                          className={`w-4 h-4 transform transition-transform ${
                            selectedChapter === chapter.chapterId ? 'rotate-90' : ''
                          }`}
                        />
                        <span className="font-medium text-gray-900">{chapter.chapterTitle}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {formatDuration(chapter.chapterContent.reduce((sum, lecture) => 
                          sum + lecture.lectureDuration, 0
                        ))}
                      </span>
                    </button>
                    {selectedChapter === chapter.chapterId && (
                      <div className="border-t border-gray-200">
                        {chapter.chapterContent.map((lecture) => (
                          <div 
                            key={lecture.lectureId}
                            className="flex items-start gap-3 p-3 hover:bg-gray-50"
                          >
                            <img src={assets.play_icon} alt="" className="w-4 h-4 mt-1 opacity-60" />
                            <div className="flex-grow">
                              <h3 className="font-medium text-gray-900">{lecture.lectureTitle}</h3>
                              <p className="text-sm text-gray-500">{formatDuration(lecture.lectureDuration)}</p>
                            </div>
                            {lecture.isPreviewFree && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                Preview
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Course Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img 
                  src={courseData.courseThumbnail || assets.course_1} 
                  alt={courseData.courseTitle}
                  className="rounded-lg object-cover w-full"
                />
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl font-bold text-gray-900">
                  ${(courseData.coursePrice - (courseData.coursePrice * courseData.discount / 100)).toFixed(2)}
                </div>
                {courseData.discount > 0 && (
                  <div className="text-lg text-gray-400 line-through">₹{courseData.coursePrice.toFixed(2)}</div>
                )}
              </div>
              <button 
                onClick={() => navigate(`/payment/${id}`)}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
              >
                Enroll Now
              </button>
              
              {/* Course Features */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <img src={assets.time_left_clock_icon} alt="Lifetime" className="w-5 h-5 opacity-60" />
                  <span className="text-sm text-gray-600">Full lifetime access</span>
                </div>
                <div className="flex items-center gap-3">
                  <img src={assets.file_upload_icon} alt="Resources" className="w-5 h-5 opacity-60" />
                  <span className="text-sm text-gray-600">Downloadable resources</span>
                </div>
                <div className="flex items-center gap-3">
                  <img src={assets.user_icon} alt="Certificate" className="w-5 h-5 opacity-60" />
                  <span className="text-sm text-gray-600">Certificate of completion</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails