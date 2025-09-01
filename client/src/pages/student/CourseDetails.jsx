import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import Footer from "../../components/student/Footer";
import YouTube from "react-youtube";
import { toast } from "react-toastify";

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  const {
    allCourses,
    currency,
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoOfLectures,
    userData,
    navigate
  } = useContext(AppContext);
  // load course from local allCourses (dummyCourses) provided by AppContext
  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const findCourse = allCourses.find((course) => course._id === id);
      if (findCourse) {
        setCourseData(findCourse);
      }
    }
  }, [allCourses, id]);

  const enrollCourse = () => {
    if (!userData) {
      return toast.warn("Login to Enroll!");
    }
    if (isAlreadyEnrolled) {
      return toast.warn("Already Enrolled");
    }

    const finalPrice =
      courseData.coursePrice - (courseData.discount * courseData.coursePrice) / 100;

    if (finalPrice === 0) {
      // no backend to record enrollment here - navigate to enrollments or show message
      toast.success("You have access to this free course.");
      navigate("/my-enrollments");
      return;
    }

    // for paid courses, navigate to payment page (backend removed)
    navigate(`/payment/${id}`);
  };

  useEffect(() => {
    if (userData && courseData) {
      setIsAlreadyEnrolled(userData.enrolledCourses.includes(courseData._id));
    }
  }, [userData, courseData]);

  if (!allCourses || !courseData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-cyan-100 via-cyan-50 to-white pt-24">
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

  return courseData ? (
    <>
      <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between max-w-[1440px] mx-auto md:px-8 lg:px-16 xl:px-24 px-4 pt-28 pb-12 text-left">
        <div className="absolute top-0 left-0 w-full h-full -z-1 bg-gradient-to-b from-cyan-100 via-cyan-50 to-white"></div>

  {/* left column */}
  <div className="flex-1 max-w-3xl z-10 text-gray-500">
          <h1 className="md:text-course-details-heading-large text-course-details-heading-small font-semibold text-gray-800">
            {courseData.courseTitle}
          </h1>
          <p
            className="pt-4 md:text-base text-sm"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200),
            }}
          ></p>

          {/* review and rating  */}
          <div className="flex items-center space-x-2 pt-3 pb-1 text-sm">
            <p>{calculateRating(courseData)}</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <img
                  className="w-3.5 h-3.5"
                  key={i}
                  src={
                    i < Math.floor(calculateRating(courseData))
                      ? assets.star
                      : assets.star_blank
                  }
                  alt="star"
                />
              ))}
            </div>
            <p className="text-blue-600">
              ({courseData.courseRatings.length}{" "}
              {courseData.courseRatings.length > 1 ? "ratings" : "rating"})
            </p>

            <p>
              {courseData.enrolledStudents.length}{" "}
              {courseData.enrolledStudents.length > 1 ? "students" : "student"}
            </p>
          </div>
          <p className="text-sm">
            Course by{" "}
            <span className="text-blue-600 underline">
              {courseData.educator.name}
            </span>
          </p>

          <div className="pt-8 text-gray-800">
            <h2 className="text-xl font-semibold">Course Structure</h2>
            <div className="pt-5">
              {courseData.courseContent.map((chapter, index) => (
                <div
                  className="border border-gray-300 bg-white mb-2 rounded"
                  key={index}
                >
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                    onClick={() => setOpenSections(prev => ({ ...prev, [index]: !prev[index] }))}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        className={`transform transition-transform ${
                          openSections[index] ? "rotate-180" : ""
                        }`}
                        src={assets.down_arrow_icon}
                        alt="down_arrow_icon"
                      />
                      <p className="font-medium md:text-base text-sm">
                        {chapter.chapterTitle}
                      </p>
                    </div>
                    <p className="text-sm md:text-default">
                      {chapter.chapterContent.length} lectures -{" "}
                      {calculateChapterTime(chapter)}{" "}
                    </p>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSections[index] ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li key={i} className="flex items-start gap-2 py-1">
                          {lecture.isPreviewFree ? (
                            <img
                              onClick={() =>
                                setPlayerData({
                                  videoId: lecture.lectureUrl.split("/").pop(),
                                })
                              }
                              className="w-4 h-4 mt-1 cursor-pointer"
                              src={assets.play_icon}
                              alt="play_icon"
                            />
                          ) : (
                            <img
                              className="w-4 h-4 mt-1"
                              src={assets.play_icon}
                              alt="play_icon"
                            />
                          )}

                          <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                            <p>{lecture.lectureTitle}</p>
                            <div className="flex gap-2">
                              {lecture.isPreviewFree && (
                                <p
                                  onClick={() =>
                                    setPlayerData({
                                      videoId: lecture.lectureUrl
                                        .split("/")
                                        .pop(),
                                    })
                                  }
                                  className="text-blue-500 cursor-pointer"
                                >
                                  Preview
                                </p>
                              )}
                              <p>
                                {humanizeDuration(
                                  lecture.lectureDuration * 60 * 1000,
                                  { units: ["h", "m"] }
                                )}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="py-20 text-sm md:text-default">
            <h3 className="text-xl font-semibold text-gray-800">
              Course Description
            </h3>
            <p
              className="pt-3 rich-text"
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription,
              }}
            ></p>
          </div>
        </div>

  {/* right column */}
  <div className="flex-none w-full md:w-[420px] max-w-course-card z-10 shadow-custom-card rounded-lg overflow-hidden bg-white sticky top-24">
          {playerData ? (
            <YouTube
              videoId={playerData.videoId}
              opts={{ 
                playerVars: { autoplay: 1 },
                width: '100%',
                height: '100%'
              }}
              iframeClassName="w-full aspect-video rounded-t-lg"
            />
          ) : (
            <div className="aspect-video w-full">
              <img 
                src={courseData.courseThumbnail} 
                alt={courseData.courseTitle}
                className="w-full h-full object-cover rounded-t-lg"
              />
            </div>
          )}

          <div className="p-6">
            <div className="flex items-center gap-2">
              <img
                className="w-3.5"
                src={assets.time_left_clock_icon}
                alt="time_left_clock_icon"
              />
              <p className="text-red-500">
                <span className="font-medium">5 days</span> left at this price!
              </p>
            </div>

            <div className="flex gap-3 items-center pt-2">
              <p className="text-gray-800 md:text-4xl text-2xl font-semibold">
                {currency}{" "}
                {(
                  courseData.coursePrice -
                  (courseData.discount * courseData.coursePrice) / 100
                ).toFixed(2)}
              </p>
              <p className="md:text-lg text-gray-500 line-through">
                {currency} {courseData.coursePrice}
              </p>
              <p className="md:text-lg text-gray-500">
                {courseData.discount}% off
              </p>
            </div>

            <div className="flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4 text-gray-500">
              <div className="flex items-center gap-1">
                <img src={assets.star} alt="star icon" />
                <p>{calculateRating(courseData)}</p>
              </div>

              <div className="h-4 w-px bg-gray-500/40"></div>

              <div className="flex items-center gap-1">
                <img src={assets.time_clock_icon} alt="time_clock_icon" />
                <p>{calculateCourseDuration(courseData)}</p>
              </div>

              <div className="h-4 w-px bg-gray-500/40"></div>

              <div className="flex items-center gap-1">
                <img src={assets.lesson_icon} alt="lesson_icon" />
                <p>{calculateNoOfLectures(courseData)} lessons</p>
              </div>
            </div>

            <div>
              {isAlreadyEnrolled
                ? <p className="md:mt-6 mt-4 w-full py-3 rounded text-center bg-blue-600 text-white font-medium">
                    Already Enrolled
                  </p>
                : courseData.coursePrice -
                    (courseData.discount * courseData.coursePrice) / 100 ===
                  0.00
                ? <p className="md:mt-6 mt-4 w-full py-3 rounded text-center bg-blue-600 text-white font-medium">
                    Free
                  </p>
                : <button
                    onClick={enrollCourse}
                    className="md:mt-6 mt-4 w-full py-3 rounded text-center bg-blue-600 text-white font-medium"
                  >
                    Enroll Now
                  </button>}
            </div>

            <div>
              {courseData.coursePrice -
                (courseData.discount * courseData.coursePrice) / 100 ===
              0.00 ? (
                <p className="md:mt-6 mt-4 w-full text-center py-3 rounded bg-blue-600 text-white font-medium">
                  Click on Course structure
                </p>
              ) : isAlreadyEnrolled ? (
                <Link to="/my-enrollments">
                  <p className="md:mt-6 mt-4 w-full text-center py-3 rounded bg-blue-600 text-white font-medium">
                    My Enrollments
                  </p>
                </Link>
              ) : null}
            </div>

            <div className="pt-6">
              <p className="md:text-xl text-lg font-medium text-gray-800">
                What's in the course?
              </p>
              <ul className="ml-4 pt-2 text-sm md:text-default list-disc text-gray-500">
                <li>Lifetime access with free updates.</li>
                <li>Step-by-step, hands-on project guidance.</li>
                <li>Downloadable resources and source code.</li>
                <li>Quizzes to test your knowledge.</li>
                <li>Certificate of completion.</li>
                <li>Quizzes to test your knowledge.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  ) : (
    <Loading />
  );
}

export default CourseDetails