import './task.css'
import { formatDate } from '../utils.jsx'

export default function CompletedTask({ task, onToggle }) {
    return (
        <div className="task completed">
            <div className="task-title">
                <input type="checkbox" id={task.name} name={task.name} checked={task.completed} onChange={onToggle} />
                <label htmlFor={task.name}>{task.name}</label>
            </div>
            <div className="task-completion-date">
                <p>Completed {formatDate(new Date(task.completionDate))}</p>
            </div>
        </div>
    )
}