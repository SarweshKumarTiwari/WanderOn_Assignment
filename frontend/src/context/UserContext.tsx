import React, { createContext } from "react";


export type contextType = {
    isLogged: boolean
    setisLogged: React.Dispatch<React.SetStateAction<boolean>>
}

export const UserContext = createContext<contextType>(
    {
        isLogged: false,
        setisLogged:()=>{},
    }
)