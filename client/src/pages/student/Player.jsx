import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import YouTube from "react-youtube";
import humanizeDuration from "humanize-duration";
import Rating from "../../components/student/Rating";

const Player = () => {
    const { enrolledCourses, calculateChapterTime } = useContext(AppContext);
    const { courseId } = useParams();
    const [courseData, setCourseData] = useState(null);
    const [openSections, setOpenSections] = useState({});
    const [playerData, setPlayerData] = useState(null);
    const getCourseData = () => {
        const course = enrolledCourses.find(course => course._id === courseId);
        if (course) {
            setCourseData(course);
            console.log("Found course:", course); // Debug log
        } else {
            console.log("No course found for ID:", courseId); // Debug log
        }
    }
    const toggleSection = (index) => {
        setOpenSections((prev) => ({
            ...prev,
            [index]: !prev[index]
        }));
    };
    useEffect(() => {
        console.log("Enrolled courses:", enrolledCourses); // Debug log
        console.log("Course ID:", courseId); // Debug log
        getCourseData();
    }, [enrolledCourses, courseId]);
    console.log("Current course data:", courseData); // Debug log

    if (!courseData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading... (No course data available)</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-cyan-100 via-cyan-50 to-white pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Left Column - Course Content */}
                    <div className="w-full lg:w-5/12">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900">Course Structure</h2>
                        <div className="bg-white rounded-lg shadow-lg p-6 max-h-[calc(100vh-180px)] overflow-y-auto sticky top-24">
                        {courseData && courseData.courseContent.map((chapter, index) => (
                            <div
                                className="border border-gray-300 bg-white mb-2 rounded"
                                key={index}
                            >
                                <div
                                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                                    onClick={() => toggleSection(index)}
                                >
                                    <div className="flex items-center gap-2">
                                        <img
                                            className={`transform transition-transform ${openSections[index] ? "rotate-180" : ""
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
                                    className={`overflow-hidden transition-all duration-300 ${openSections[index] ? "max-h-96" : "max-h-0"
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
                                                        src={false ? assets.blue_tick_icon : assets.play_icon}
                                                        alt="play_icon"
                                                    />
                                                )}

                                                <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                                                    <p>{lecture.lectureTitle}</p>
                                                    <div className="flex gap-2">
                                                        {lecture.lectureUrl && (
                                                            <p
                                                                onClick={() =>
                                                                    setPlayerData({
                                                                        ...lecture, chapter: index + 1, lecture: i + 1
                                                                    })
                                                                }
                                                                className="text-blue-500 cursor-pointer"
                                                            >
                                                                Watch
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
                    <h1>Rate This Course: </h1>
                <Rating/>
                </div>
                    </div>
                    {/* Right Column - Video Player */}
                    <div className="w-full lg:w-7/12">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden sticky top-24 lg:min-h-[600px]">
                            {playerData ? (
                                <div>
                                    <YouTube
                                        videoId={playerData.videoId ? playerData.videoId : playerData.lectureUrl?.split("/").pop()}
                                        opts={{
                                            playerVars: { autoplay: 1 }
                                        }}
                                        className="aspect-video w-full"
                                    />
                                    <div className="p-6">
                                        <p className="text-lg font-semibold mb-4">
                                            {playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}
                                        </p>
                                        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                                            Mark Complete
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                                    <img 
                                        src={courseData ? courseData.courseThumbnail : ""} 
                                        alt="Course Thumbnail" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

    )
}

export default Player