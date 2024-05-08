import { createContext, useContext, useState } from "react";

export const LocationContext = createContext()

export const LocationContextProvider = ({children}) =>{
    const [location, setLocation] = useState('1')
    const values = {location, setLocation}
    return (
        <LocationContext.Provider value={values}>
            {children}
        </LocationContext.Provider>
    )
}

export const useLocationContext = () =>{
    const context = useContext(LocationContext)
    return context
}