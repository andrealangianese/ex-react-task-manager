import { memo } from "react"

const TaskRow = memo(function TaskRow({ task }) {
    //    destrutturando task col provider ne ho sempre accesso

    // creo variabile in cui vale a prendere il valore e la faccio diventare uguale alla classe

    const statoClasse = task.status.replace(' ', '').toLowerCase()
    return (
        <tr>
            <td>{task.title}</td>
            <td className={statoClasse}>{task.status}</td>
            <td>{new Date(task.createdAt).toLocaleDateString()}</td>
        </tr>
    )
})

export default TaskRow;