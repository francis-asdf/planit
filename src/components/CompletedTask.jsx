import './task.css'
import { formatDate } from '../utils.jsx'

export default function CompletedTask({ name, completed, completionDate, onToggle }) {
    return (
        <div className="task completed">
            <div className="task-title">
                <input type="checkbox" id={name} name={name} checked={completed} onChange={onToggle} />
                <label htmlFor={name}>{name}</label>
            </div>
            <div className="task-completion-date">
                <p>Completed {formatDate(new Date(completionDate))}</p>
            </div>
        </div>
    )
}