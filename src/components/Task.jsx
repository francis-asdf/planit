import { formatDate } from '../utils.jsx'

export default function Task({ name, deadline, completed, onToggle }) {
    return (
        <div className="task">
            <input type="checkbox" id={name} name={name} checked={completed} onChange={onToggle} />
            <label htmlFor={name}>{name}</label>
            <div className="deadline">
                <p>Due {formatDate(new Date(deadline))}</p>
            </div>
        </div>
    )
}