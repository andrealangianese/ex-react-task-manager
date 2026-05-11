import { useRef, useState } from "react"
import Modal from "./Modal"

export default function EditTaskModal({ show, onClose, task, onSave }) {
    const [editedTask, setEditedTask] = useState(task)
    // var per salvare ref
    const editFormRef = useRef()

    const changeEditTask = (key, event) => {
        setEditedTask(p => ({ ...p, [key]: event.target.value }))
    }

    const submitRef = e => {
        e.preventDefault()
        onSave(editedTask)
    }

    return (
        <Modal
            title='modifica task'
            content={
                <form ref={editFormRef} onSubmit={submitRef}>
                    <label>
                        Nome Task
                        <input
                            type="text"
                            value={editedTask.title}
                            onChange={e => changeEditTask('title', e)}
                        />
                    </label>
                    <label>
                        Descrizione
                        <textarea
                            type="text"
                            value={editedTask.description}
                            onChange={e => changeEditTask('description', e)}
                        />
                    </label>
                    <label>
                        Stato
                        <select
                            value={editedTask.status}
                            onChange={e => changeEditTask('status', e)}
                        >
                            {['To Do', 'Doing', 'Done'].map((value, i) => (
                                <option
                                    key={i}
                                    value={value}>
                                    {value}
                                </option>
                            ))}

                        </select>
                    </label>
                </form>
            }
            confirmText="salva"
            show={show}
            onClose={onClose}
            onConfirm={() => editFormRef.current.requestSubmit()}
        />
    )
}