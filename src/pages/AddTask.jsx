import { useMemo, useRef, useState, useContext } from "react"
import { GlobalContext } from "../context/GlobalContext";

const symbols = "!@#$%^&*()-_=+[]{}|;:'\\,.<>?/`~";

export default function AddTask() {

    const { addTask } = useContext(GlobalContext)
    // var per salvare input del form

    const [taskTitle, setTaskTitle] = useState('')
    const descriptionRef = useRef()
    const statusRef = useRef()

    // controllo che il nome non sia vuoto,non ci siano simboli

    const taskTitleErr = useMemo(() => {
        if (!taskTitle.trim())
            return ('il nome non può essere empty')
        if ([...taskTitle].some(carattere => symbols.includes(carattere)))
            return ('non puoi includere caratteri speciali')
        return ""
    }, [taskTitle])

    const handleSub = async e => {

        e.preventDefault()

        const newTask = {
            title: taskTitle.trim(),
            description: descriptionRef.current.value,
            status: statusRef.current.value
        }

        try {
            await addTask(newTask)
            alert('Task aggiunta con successo')
            setTaskTitle('')
            descriptionRef.current.value = ''
            statusRef.current.value = ''
        } catch (error) {
            alert(error.message)
        }

    }
    return (
        <div>
            <form onSubmit={handleSub}>
                <label>
                    Nome Task
                </label>
                <input
                    type="text"
                    value={taskTitle}
                    onChange={e => setTaskTitle(e.target.value)}
                />
                <label>
                    {taskTitleErr &&
                        <p style={{ color: "red" }}>{taskTitleErr}</p>}
                    Descrizione
                    <textarea ref={descriptionRef} />
                </label>
                <label>
                    Status
                    <select
                        ref={statusRef}
                        defaultValue='To do'>
                        <option value="To do">"To do"</option>
                        <option value="Doing">"Doing"</option>
                        <option value="Done">"Done"</option>
                    </select>
                </label>
                <button
                    type="submit">
                    Add Task
                </button>
            </form>
        </div>
    )
}