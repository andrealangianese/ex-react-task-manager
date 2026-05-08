import { GlobalContext } from "../context/GlobalContext"
import { useParams, useNavigate } from "react-router-dom"
import { useContext } from "react"

export default function TaskDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { task, removeTask } = useContext(GlobalContext)


    // cerco la task se è quella giusta

    const currentTask = task.find(t => t.id === parseInt(id))

    if (!currentTask) {
        return <h3 style={{ color: 'red' }}> La task che stai cercando non esiste!!</h3>

    }

    const deleteTask = async () => {
        try {
            await removeTask(currentTask.id)
            console.log('task eliminata con successo!');

        }
        catch (error) {
            console.error(error)
        }
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