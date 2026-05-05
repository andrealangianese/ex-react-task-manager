import { createContext, useEffect, useState } from "react";
// importare dati da file .env
const { VITE_API_URL } = import.meta.env

function useTasks() {
    const [task, setTask] = useState([])

    useEffect(() => {
        fetch(`${VITE_API_URL}/tasks`)
            .then(res => res.json())
            .then(data => setTask(data))
            .catch(err => console.error(err))
    }, [])

    const addTask = () => {

    }
    const removeTask = () => {

    }
    const updateTask = () => {

    }

    return { task, addTask, removeTask, updateTask }
}

export default useTasks