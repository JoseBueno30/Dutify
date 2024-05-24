import { createContext, useContext, useState,useEffect } from "react";

export const ThemeContext = createContext()

export const ThemeContextProvider = ({children}) =>{
    const initTheme = window.sessionStorage.getItem("theme");
    const [contextTheme, setContextTheme] = useState(initTheme || "dark")
    const values = {contextTheme, setContextTheme}

    useEffect(() => {
        window.sessionStorage.setItem("theme",contextTheme);
    }, [contextTheme])

    return (
        <ThemeContext.Provider value={values}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useThemeContext = () =>{
    const context = useContext(ThemeContext)
    return context
}