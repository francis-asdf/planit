import Task from './Task.jsx'
import NewTask from './NewTask.jsx'

export default function TaskTable({ tasks, onAddTask, onToggleComplete }) {
    return (
        <div className="task-table">
            <h2>Active Tasks</h2>
            {tasks
                .filter(task => !task.completed)
                .map(task => (
                    <Task
                        key={task.id}
                        name={task.name}
                        deadline={task.deadline}
                        completed={task.completed}
                        onToggle={() => onToggleComplete(task.id)}
                    />
                ))}
            <NewTask onAddTask={onAddTask} />
        </div>
    )
}