import { createContext } from "react";
const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {

    return(
        <AppContext.Provider value={{}}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext);
}