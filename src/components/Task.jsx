import './task.css'
import { formatDate } from '../utils.jsx'

export default function Task({ task, onToggle }) {
    return (
        <div className="task">
            <div className="task-title">
                <input type="checkbox" id={task.name} name={task.name} checked={task.completed} onChange={onToggle} />
                <label htmlFor={task.name}>{task.name}</label>
            </div>
            <div className="task-deadline">
                <p>Due {formatDate(new Date(task.deadline))}</p>
            </div>
        </div>
    )
}