import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"

export default function TaskList() {
    const { task } = useContext(GlobalContext)
    console.log(task);

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

                </tbody>
            </table>
        </>
    )
}