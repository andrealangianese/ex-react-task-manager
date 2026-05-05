import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom"
import TaskList from "./pages/TaskList"
import AddTask from "./pages/AddTask"
import '../src/App.css'
import { GlobalProvider } from "./context/GlobalContext"

export default function App() {

  return (
    <GlobalProvider>
      <BrowserRouter>

        <nav>
          <NavLink to="/add">aggiungi task</NavLink>
          <NavLink to="/">lista task</NavLink>
        </nav>

        <main className="container">
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/add" element={<AddTask />} />
          </Routes>
        </main>

      </BrowserRouter>
    </GlobalProvider>
  )
}