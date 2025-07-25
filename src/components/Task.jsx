import './task.css'
import { formatDate } from '../utils.jsx'

export default function Task({ name, deadline, completed, onToggle }) {
    return (
        <div className="task">
            <div className="task-title">
                <input type="checkbox" id={name} name={name} checked={completed} onChange={onToggle} />
                <label htmlFor={name}>{name}</label>
            </div>
            <div className="task-deadline">
                <p>Due {formatDate(new Date(deadline))}</p>
            </div>
        </div>
    )
}