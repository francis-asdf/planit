import { useState, useEffect } from 'react'
import './index.css'
import Header from './components/header/Header.jsx'
import TaskTable from './components/content/TaskTable.jsx'
import CompletedTaskTable from './components/content/CompletedTaskTable.jsx'
import HamburgerMenu from './components/header/HamburgerMenu.jsx'

const initialTasks = [
  { id: 1, name: "Vacuum the house", deadline: "2025-07-06T19:00", description: "Vacuum stairs and upstairs", points: 5, completed: true, completionDate: "2025-07-06T17:27" },
  { id: 2, name: "Do the dishes", deadline: "2025-07-07T20:00", description: "", points: 5, completed: true, completionDate: "2025-07-07T19:58" },
  { id: 3, name: "Take out the trash", deadline: "2025-07-09T07:00", description: "Recycling", points: 3, completed: false, completionDate: null },
  { id: 4, name: "Do physics homework", deadline: "2025-07-10T08:00", description: "Finish Faraday's law questions", points: 10, completed: false, completionDate: null },
  { id: 5, name: "Organize university applications", deadline: "2025-07-27T20:00", description: "Record soft and hard deadlines for each university and detailed scheduling plans", points: 50, completed: false, completionDate: null }
];

export default function Planit() {
  // all tasks have {id, name, deadline, description, points, completed, completionDate}
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : initialTasks;
  });
  const [streak, setStreak] = useState(() => {
    return parseInt(localStorage.getItem("streak")) || 0;
  });
  const [lastCompletedDate, setLastCompletedDate] = useState(() => {
    return localStorage.getItem("lastCompletedDate") || null; // localStorage stores stuff between refreshes
  });

  const addTask = (task) => {
    // task.deadline = formatDate(new Date(task.deadline));
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
        // daily task already completed, do nothing
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

  const updateTask = (updatedTask) => {
    setTasks((originalTasks) =>
      originalTasks.map((task) => task.id === updatedTask.id ? updatedTask : task)
    )
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  useEffect(() => {
    localStorage.setItem("streak", JSON.stringify(streak));
  }, [streak]); // saves streak in localStorage

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    document.body.classList.remove("preload");
  }, []); // disables transitions only on preload to avoid flicker effects

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
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
          />
        </div>
        <div className="column">
          <CompletedTaskTable
            tasks={tasks}
            onToggleComplete={toggleTaskCompleted}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
          />
        </div>
      </main>
    </div>
  )
}
