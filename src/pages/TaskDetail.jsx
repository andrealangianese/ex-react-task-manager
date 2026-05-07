import { GlobalContext } from "../context/GlobalContext"
import { useParams } from "react-router-dom"
import { useContext } from "react"

export default function TaskDetail() {
    const { id } = useParams()
    const { task } = useContext(GlobalContext)

    // cerco la task se è quella giusta

    const currentTask = task.find(t => t.id === parseInt(id))

    if (!currentTask) {
        return <h3 style={{ color: 'red' }}> La task che stai cercando non esiste!!</h3>

    }

    function deleteTask() {
        console.log('task eliminata ', currentTask.id);

    }
    return (
        <>
            <div>
                <p>Dettaglio della task</p>
                <p>Nome: {currentTask.title}</p>
                <p>Descrione: {currentTask.description}</p>
                <p>Fatto?: {currentTask.status}</p>
                <p>Creato il: {new Date(currentTask.createdAt).toLocaleDateString()}</p>
                <button onClick={deleteTask}>Elimina Task</button>
            </div>
        </>
    )
}