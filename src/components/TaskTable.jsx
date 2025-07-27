import Task from './Task.jsx'
import NewTask from './NewTask.jsx'
import './task.css'

export default function TaskTable({ tasks, onAddTask, onToggleComplete }) {
    return (
        <div className="task-table">
            <div className="task-header">
                <h2>Active Tasks</h2>
                <NewTask onAddTask={onAddTask} />
            </div>
            {tasks
                .filter(task => !task.completed)
                .map(task => (
                    <Task
                        key={task.id}
                        task={task}
                        onToggle={() => onToggleComplete(task.id, true)}
                    />
                ))}
        </div>
    )
}