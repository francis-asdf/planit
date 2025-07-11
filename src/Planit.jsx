import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header.jsx'
import TaskTable from './components/TaskTable.jsx'
import CompletedTaskTable from './components/CompletedTaskTable.jsx'
import Settings from './components/Settings.jsx'
import { formatDate } from './utils.jsx'

function Planit() {
  // all tasks have {id, name, deadline, completed, completionDate}
  const [tasks, setTasks] = useState([
    { id: 1, name: "Vacuum the house", deadline: "2025-07-06T19:00", completed: true, completionDate: "2025-07-06T17:27" },
    { id: 2, name: "Do the dishes", deadline: "2025-07-07T20:00", completed: true, completionDate: "2025-07-07T19:58" },
    { id: 3, name: "Take out the trash", deadline: "2025-07-09T07:00", completed: false, completionDate: null },
    { id: 4, name: "Do physics homework", deadline: "2025-07-10T08:00", completed: false, completionDate: null },
    { id: 5, name: "Organize university applications", deadline: "2025-07-27T20:00", completed: false, completionDate: null }
  ]);

  const addTask = (task) => {
    task.deadline = formatDate(new Date(task.deadline));
    setTasks([...tasks, task]); // adds the newest task to the list of tasks
  }

  const toggleTaskCompleted = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        const isCompleted = !task.completed; // allows for toggling from complete to incomplete
        const currentDate = formatDate(new Date());

        return {
          ...task,
          completed: isCompleted,
          completionDate: isCompleted ? currentDate : null
        };
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);
  }

  return (
    <div className="planit">
      <div>
        <Header />
      </div>
      <div className="all-tasks">
        <div>
          <TaskTable
            tasks={tasks} // task filtering done in TaskTable
            onAddTask={addTask}
            onToggleComplete={toggleTaskCompleted}
          />
        </div>
        <div>
          <CompletedTaskTable
            tasks={tasks}
            onToggleComplete={toggleTaskCompleted}
          />
        </div>
      </div>
      <div className="settings">
        <Settings />
      </div>
    </div>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default Planit
