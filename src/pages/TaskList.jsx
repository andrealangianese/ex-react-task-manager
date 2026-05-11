import { useCallback, useContext, useMemo, useState } from "react"
import { GlobalContext } from "../context/GlobalContext"
import TaskRow from "../components/TaskRow";

// funzione debounce
function debounce(callback, delay) {
    let timer
    return (value) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            callback(value)
        }, delay)
    }
}
export default function TaskList() {
    const { task } = useContext(GlobalContext)

    // state per ricerca task

    const [searchQuery, setSearchQuery] = useState('')

    // var per gestire il debounce con callback
    const debaunceSearch = useCallback(debounce(setSearchQuery, 1000), [])

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

    const filteredSortedTask = useMemo(() => {
        return [...task]
            .filter(el => el.title.toLowerCase().includes(searchQuery.toLowerCase()))
            .sort((x, y) => {
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
    }, [task, sortBy, sortOrder, searchQuery])

    return (
        <>
            <h3>Lista task</h3>
            {/* ricercadelle task */}
            <input
                placeholder="cerca la task"
                type="text"
                onChange={e => debaunceSearch(e.target.value)}
            />
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
                    {filteredSortedTask.map(t => (
                        <TaskRow key={t.id} task={t} />
                    ))}
                </tbody>
            </table>
        </>
    )
}