import { GlobalContext } from "../context/GlobalContext"
import { useParams, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import Modal from "../components/Modal"

export default function TaskDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { task, removeTask } = useContext(GlobalContext)


    // cerco la task se è quella giusta

    const currentTask = task.find(t => t.id === parseInt(id))

    const [showModal, setShowModal] = useState(false)

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
                <button onClick={() => setShowModal(true)}>Elimina Task</button>
                {/* modale per conferma eliminazione */}
                <Modal
                    title='conferma eliminazione'
                    content={<p>are u sure to delete?</p>}
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={deleteTask}
                    confirmText="elimina"
                />
            </div>
        </>
    )
}