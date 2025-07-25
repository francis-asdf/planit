import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'
import Header from './components/Header.jsx'
import TaskTable from './components/TaskTable.jsx'
import CompletedTaskTable from './components/CompletedTaskTable.jsx'
import HamburgerMenu from './components/HamburgerMenu.jsx'
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
  const [streak, setStreak] = useState(() => {
    return parseInt(localStorage.getItem("streak")) || 0;
  });
  const [lastCompletedDate, setLastCompletedDate] = useState(() => {
    return localStorage.getItem("lastCompletedDate") || null; // localStorage stores stuff between refreshes
  });

  const addTask = (task) => {
    task.deadline = formatDate(new Date(task.deadline));
    setTasks([...tasks, task]); // adds the newest task to the list of tasks
  }

  const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // splits the string into substrings at the "T" and takes the date part
  }

  const toggleTaskCompleted = (id, complete) => {
    if (complete) {
      // set streak
      const today = getTodayString();
      if (lastCompletedDate === today) {
        // task already completed, do nothing
      } else if (
        lastCompletedDate === null || new Date(today) - new Date(lastCompletedDate) === 86400000 // one day after last streak set
      ) {
        setStreak(prev => prev + 1);
      } else {
        setStreak(1);
      }
      setLastCompletedDate(today);
      localStorage.setItem("lastCompletedDate", today);
    }

    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        const isCompleted = !task.completed; // allows for toggling from complete to incomplete
        const currentDate = new Date();

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

  useEffect(() => {
    localStorage.setItem("streak", streak);
  }, [streak]); // saves streak in localStorage

  return (
    <div className="app-container">
      <header>
        <Header streak={streak} />
        <HamburgerMenu />
      </header>
      <main className="task-columns">
        <div className="column">
          <TaskTable
            tasks={tasks} // task filtering done in TaskTable
            onAddTask={addTask}
            onToggleComplete={toggleTaskCompleted}
          />
        </div>
        <div className="column">
          <CompletedTaskTable
            tasks={tasks}
            onToggleComplete={toggleTaskCompleted}
          />
        </div>
      </main>
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
