import './task.css'
import './modal.css'
import EditTaskModal from './EditTaskModal.jsx'
import { formatDate } from '../../utils.jsx'
import { useState } from 'react'

export default function CompletedTask({ task, onToggle, onUpdateTask, onDeleteTask }) {
    const [showModal, setShowModal] = useState(false);

    const handleTaskClick = (e) => {
        if (e.target.type !== 'checkbox') {
            setShowModal(true);
        }
    }

    return (
        <div
            className="task-container"
            onClick={handleTaskClick}
        >
            <div className="task-content completed">
                <div className="task-title">
                    <input type="checkbox" id={task.name} name={task.name} checked={task.completed} onChange={() => onToggle(task)} />
                    <label htmlFor={task.name}>{task.name}</label>
                </div>
                <div className="task-meta">
                    <p className="task-completion-date">Completed {formatDate(new Date(task.completionDate))}</p>
                    <p className="task-points">{task.points} point{task.points === 1 ? "" : "s"}</p>
                </div>
            </div>

            {showModal && (
                <EditTaskModal
                    task={task}
                    onClose={() => setShowModal(false)}
                    onUpdate={(updatedTask) => onUpdateTask(updatedTask)}
                    onDelete={(id) => onDeleteTask(id)}
                />
            )}
        </div>
    )
}