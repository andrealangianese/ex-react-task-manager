import { createContext } from "react";
import useTasks from "../hooks/useTasks";

export const GlobalContext = createContext()

export function GlobalProvider({ children }) {

    // salvo il valore di useTask in una variabile che passerò sotto coon lo spread

    const task = useTasks()

    return (
        <GlobalContext.Provider value={{ ...task }}>
            {children}
        </GlobalContext.Provider>
    )
}