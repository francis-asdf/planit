import './task.css'
import { formatDate } from '../utils.jsx'

export default function CompletedTask({ name, completed, completionDate, onToggle }) {
    return (
        <div className="task completed">
            <input type="checkbox" id={name} name={name} checked={completed} onChange={onToggle} />
            <label htmlFor={name}>{name}</label>
            <div className="completion-date">
                <p>Completed {formatDate(new Date(completionDate))}</p>
            </div>
        </div>
    )
}