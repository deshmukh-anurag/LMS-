import { createContext, useContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY;
    const navigate=useNavigate()
    const [allCourses, setAllCourses] = useState([]);
    const [isEducator, setIsEducator] = useState(true);
    const [userData, setUserData] = useState(null);
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    const fetchAllCourses = async () => {
        setAllCourses(dummyCourses)
    }
    const calculateRating=(course)=>{
        try {
            if(!course || !course.courseRatings || course.courseRatings.length === 0){
                return 0;
            }
            const totalRating = course.courseRatings.reduce((sum, rating) => sum + rating.rating, 0);
            return Number((totalRating / course.courseRatings.length).toFixed(1));
        } catch (error) {
            console.error('Error calculating rating:', error);
            return 0;
        }
    }
    const fetchEnrolledCourses = async () => {
        // dummyCourses.filter(course => course.enrolledUsers.includes(userData.id));
        setEnrolledCourses(dummyCourses);
    }
    const formatMinutes = (minutes) => {
        const hrs = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hrs > 0) return `${hrs}h ${mins}m`;
        return `${mins}m`;
    }

    const calculateChapterTime = (chapter) => {
        if (!chapter || !Array.isArray(chapter.chapterContent)) return '0m';
        const total = chapter.chapterContent.reduce((sum, lec) => sum + (lec.lectureDuration || 0), 0);
        return formatMinutes(total);
    }

    const calculateCourseDuration = (course) => {
        if (!course || !Array.isArray(course.courseContent)) return '0m';
        const total = course.courseContent.reduce((cSum, ch) => cSum + (ch.chapterContent?.reduce((lSum, lec) => lSum + (lec.lectureDuration || 0), 0) || 0), 0);
        return formatMinutes(total);
    }

    const calculateNoOfLectures = (course) => {
        if (!course || !Array.isArray(course.courseContent)) return 0;
        return course.courseContent.reduce((sum, ch) => sum + (ch.chapterContent?.length || 0), 0);
    }
    useEffect(() => {
        fetchAllCourses();
        fetchEnrolledCourses();
    }, []);
    const value = {
        currency,
        allCourses,
        navigate,
        calculateRating,
        calculateChapterTime,
        calculateCourseDuration,
        calculateNoOfLectures,
        isEducator,
        userData,
        setUserData,
        enrolledCourses,
        fetchEnrolledCourses
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext);
}