import { useState, useEffect } from 'react'
import './index.css'
import StartPage from './components/startpage/StartPage.jsx'
import DarkMode from './components/header/DarkMode.jsx'
import Header from './components/header/Header.jsx'
import TaskTable from './components/content/TaskTable.jsx'
import CompletedTaskTable from './components/content/CompletedTaskTable.jsx'
import HamburgerMenu from './components/header/HamburgerMenu.jsx'

// all tasks have {id, name, deadline, description, isRecurring, recurringInterval, recurringUnit, points, completed, completionDate, completedOnce}
const initialTasks = [
  {
    id: 1,
    name: "Vacuum the house",
    deadline: "2025-07-06T19:00",
    description: "Vacuum stairs and upstairs",
    isRecurring: false,
    recurring: { interval: 1, unit: "day" },
    points: 5,
    completed: true,
    completionDate: "2025-07-06T17:27",
    completedOnce: true
  },
  {
    id: 2,
    name: "Do the dishes",
    deadline: "2025-07-07T20:00",
    description: "",
    isRecurring: true,
    recurring: { interval: 1, unit: "day" },
    points: 5,
    completed: true,
    completionDate: "2025-07-07T19:58",
    completedOnce: true
  },
  {
    id: 3,
    name: "Take out the trash",
    deadline: "2025-07-09T07:00",
    description: "Recycling",
    isRecurring: true,
    recurring: { interval: 1, unit: "week" },
    points: 3,
    completed: false,
    completionDate: null,
    completedOnce: false
  },
  {
    id: 4,
    name: "Do physics homework",
    deadline: "2025-07-10T08:00",
    description: "Finish Faraday's law questions",
    isRecurring: false,
    recurring: { interval: 1, unit: "day" },
    points: 10,
    completed: false,
    completionDate: null,
    completedOnce: false
  },
  {
    id: 5,
    name: "Organize university applications",
    deadline: "2025-07-27T20:00",
    description: "Record soft and hard deadlines for each university and detailed scheduling plans",
    isRecurring: false,
    recurring: { interval: 1, unit: "day" },
    points: 50,
    completed: false,
    completionDate: null,
    completedOnce: false
  }
];

export default function Planit() {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  }); // stores user data
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || initialTasks;
  });
  const [streak, setStreak] = useState(() => {
    return parseInt(localStorage.getItem("streak")) || 0;
  });
  const [lastCompletedDate, setLastCompletedDate] = useState(() => {
    return localStorage.getItem("lastCompletedDate") || null;
  });
  const [level, setLevel] = useState(() => {
    return parseInt(localStorage.getItem("level")) || 1;
  });
  const [currentPoints, setCurrentPoints] = useState(() => {
    return parseInt(localStorage.getItem("currentPoints")) || 0;
  });
  const [pageLoaded, setPageLoaded] = useState(false); // needed to fix margins on start page

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }

  const pointsNeeded = (level) => {
    return 40 + (level - 2) * 10;
  }

  const updatePoints = (newPoints) => {
    // cannot directly change state variables immediately; update them at the end
    let updatedPoints = currentPoints + newPoints;
    let updatedLevel = level;
    while (updatedPoints >= pointsNeeded(updatedLevel + 1)) {
      updatedPoints -= pointsNeeded(updatedLevel + 1);
      updatedLevel += 1;
    }
    setCurrentPoints(updatedPoints);
    setLevel(updatedLevel);
  }

  const addTask = (task) => {
    // setTasks([...tasks, task]); // adds the newest task to the list of tasks
    setTasks(prev => [...prev, task]);
  }

  const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // splits the string into substrings at the "T" and takes the date part
  }

  const updateStreak = (completed) => { // completed parameter for whether to increment streak or not (this is called on mount)
    const today = getTodayString();
    if (lastCompletedDate === today || (new Date(today) - new Date(lastCompletedDate) === 86400000 && !completed)) {
      // daily task already completed or last task completed was yesterday, do nothing
    } else if (
      (lastCompletedDate === null || new Date(today) - new Date(lastCompletedDate) === 86400000) // one day after last streak set
      && completed
    ) {
      setStreak(prev => prev + 1);
    } else if (completed) {
      setStreak(1);
    } else {
      setStreak(0);
    }
    if (completed) {
      setLastCompletedDate(today);
      localStorage.setItem("lastCompletedDate", today);
    }
  }

  const toggleTaskCompleted = (updatedTask) => {
    if (!updatedTask.completed) { // not toggled yet
      updateStreak(true);
    }

    if (!updatedTask.completedOnce) { // ensures points for tasks are only awarded once
      updatePoints(updatedTask.points);
    }

    setTasks(prevTasks => {
      let recurringTask = null; // if applicable, will be added after looping through tasks

      const updatedTasks = prevTasks.map((task) => {
        if (task.id === updatedTask.id) {
          const isCompleted = !task.completed; // allows for toggling from complete to incomplete
          const currentDate = new Date();

          if (isCompleted && task.isRecurring) {
            const newDeadline = new Date(task.deadline).getTime() + task.recurring.interval * 1000 * (task.recurring.unit === "day" ? 86400 : 604800);
            recurringTask = { ...task, id: crypto.randomUUID(), deadline: newDeadline, completed: false, completionDate: null };
          }

          return {
            ...task,
            completed: isCompleted,
            completionDate: isCompleted ? currentDate : null,
            completedOnce: true
          };
        }
        return task;
      });

      if (recurringTask) {
        return [...updatedTasks, recurringTask];
      } else {
        return updatedTasks;
      }
    });
  }

  const updateTask = (updatedTask) => {
    setTasks((originalTasks) =>
      originalTasks.map((task) => task.id === updatedTask.id ? updatedTask : task)
    )
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const resetProgress = () => {
    setCurrentPoints(0);
    setLevel(1);
  }

  useEffect(() => { // on mount
    setPageLoaded(true);
    updateStreak(false);

    const loadedTasks = JSON.parse(localStorage.getItem("tasks")) || initialTasks;
    const defaultedTasks = loadedTasks.map(task => ({
      ...task,
      isRecurring: task.isRecurring ?? false, // evaluates right side when left is null or undefined
      recurring: task.recurring || { interval: 1, unit: "day" }
    }));
    setTasks(defaultedTasks);
  }, [])

  useEffect(() => {
    localStorage.setItem("streak", JSON.stringify(streak));
  }, [streak]); // saves streak in localStorage

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("level", JSON.stringify(level));
  }, [level]);

  useEffect(() => {
    localStorage.setItem("currentPoints", JSON.stringify(currentPoints));
  }, [currentPoints]);

  // used for adding and removing CSS to the body and html depending on if the start page is open
  useEffect(() => {
    if (!user) {
      document.body.classList.add("start-page-active");
    } else {
      document.body.classList.remove("start-page-active");
    }
  }, [user, pageLoaded]);

  useEffect(() => {
    document.body.classList.remove("preload");
  }, []); // disables transitions only on preload to avoid flicker effects

  return (
    !user ? (
      <StartPage onLogin={handleLogin} />
    ) : (
      <div className="app-container">
        <header>
          <DarkMode />
          <Header
            streak={streak}
            currentPoints={currentPoints}
            level={level}
            pointsForNextLevel={pointsNeeded(level + 1)}
          />
          <HamburgerMenu resetProgress={resetProgress} />
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
  )
}
