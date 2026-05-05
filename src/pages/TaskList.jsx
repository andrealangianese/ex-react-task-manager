import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"
import TaskRow from "../components/TaskRow";

export default function TaskList() {
    const { task } = useContext(GlobalContext)

    return (
        <>
            <h3>lista task</h3>
            <table>
                <thead>
                    <tr>
                        <th>nome</th>
                        <th>stato</th>
                        <th>creato il:</th>
                    </tr>
                </thead>
                <tbody>
                    {task.map(t => (
                        <TaskRow key={t.id} task={t} />
                    ))}
                </tbody>
            </table>
        </>
    )
}