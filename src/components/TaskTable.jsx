import Task from './Task.jsx'
import NewTask from './NewTask.jsx'
import './task.css'

export default function TaskTable({ tasks, onAddTask, onToggleComplete, onUpdateTask, onDeleteTask }) {
    const getScore = (task) => {
        const now = new Date();
        const deadline = new Date(task.deadline);
        const urgency = (deadline - now) / (1000 * 3600); // number of remaining hours
        const urgencyWeight = 1;
        const importance = task.points;
        const importanceWeight = 2;

        // lower score means higher priority
        return urgency * urgencyWeight - importance * importanceWeight;
    }

    return (
        <div className="task-table">
            <div className="task-header">
                <h2>Active Tasks</h2>
                <NewTask onAddTask={onAddTask} />
            </div>
            {tasks
                .filter(task => !task.completed)
                .sort((a, b) => getScore(a) - getScore(b)) // ascending order sorting
                .map(task => (
                    <Task
                        key={task.id}
                        task={task}
                        onToggle={() => onToggleComplete(task.id, true)}
                        onUpdateTask={(updatedTask) => onUpdateTask(updatedTask)}
                        onDeleteTask={(id) => onDeleteTask(id)}
                    />
                ))}
        </div>
    )
}