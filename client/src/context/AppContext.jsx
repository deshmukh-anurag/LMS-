import { createContext, useContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY;
    const navigate=useNavigate()
    const [allCourses, setAllCourses] = useState([]);
    const [isEducator, setIsEducator] = useState(true);

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
    useEffect(() => {
        fetchAllCourses();
    }, []);
    const value = {
        currency,
        allCourses,
        navigate,
        calculateRating,
        isEducator
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