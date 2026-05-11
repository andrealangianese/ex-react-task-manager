import { useContext, useMemo, useState } from "react"
import { GlobalContext } from "../context/GlobalContext"
import TaskRow from "../components/TaskRow";

export default function TaskList() {
    const { task } = useContext(GlobalContext)

    // state per ordinare
    const [sortBy, setSortBy] = useState('createdAt')
    const [sortOrder, setSortOrder] = useState(1)

    const sortIcon = sortOrder === 1 ? '+' : '-'
    // funzione per gestire l'ordine
    const handleSort = campoPresente => {
        if (sortBy === campoPresente) {
            setSortOrder(p => p * -1)
        } else {
            setSortBy(campoPresente)
            setSortOrder(1)
        }
    }

    const sortTask = useMemo(() => {
        return [...task].sort((x, y) => {
            let comparazione
            if (sortBy === 'title') {
                comparazione = x.title.localeCompare(y.title)
            } else if (sortBy === 'status') {
                const opzioni = ['To Do', 'Doing', 'Done']
                comparazione = opzioni.indexOf(x.status) - opzioni.indexOf(y.status)
            } else if (sortBy === 'createdAt') {
                const datax = new Date(x.createdAt).getTime()
                const datay = new Date(y.createdAt).getTime()
                comparazione = datax - datay
            }
            return comparazione * sortOrder
        })
    }, [task, sortBy, sortOrder])

    return (
        <>
            <h3>Lista task</h3>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('title')}
                        >
                            Nome{sortBy === 'title' && sortIcon}
                        </th>
                        <th onClick={() => handleSort('status')}>
                            Stato{sortBy === 'status' && sortIcon}
                        </th>
                        <th onClick={() => handleSort('createdAt')}>
                            Creato il: {sortBy === 'createdAt' && sortIcon}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortTask.map(t => (
                        <TaskRow key={t.id} task={t} />
                    ))}
                </tbody>
            </table>
        </>
    )
}