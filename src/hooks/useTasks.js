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

    const addTask = async newTask => {
        //chiamata al server
        const res = await fetch(`${VITE_API_URL}/tasks`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask)
        });
        //risposta del server
        const { success, message, task } = await res.json()
        if (!success)
            throw new Error(message)
        //Aggiornamento dello Stato Locale
        setTask(prev => [...prev, task])
    }

    const removeTask = async taskId => {
        const res = await fetch(`${VITE_API_URL}/tasks/${taskId}`, {
            method: 'DELETE'
        });
        //risposta del server
        const { success, message } = await res.json()
        if (!success)
            throw new Error(message)
        //Aggiornamento dello Stato Locale
        setTask(prev => prev.filter(t => t.id !== taskId))
    }
    const updateTask = async updatedTask => {
        //chiamata al server
        const res = await fetch(`${VITE_API_URL}/tasks/${updatedTask.id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTask)
        });
        //risposta del server
        const { success, message, task } = await res.json()
        if (!success)
            throw new Error(message)
        setTask(p => p.map(t => t.id === task.id ? task : t))
    }

    return { task, addTask, removeTask, updateTask }
}

export default useTasks