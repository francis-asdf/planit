import './task.css'
import './modal.css'
import EditTaskModal from './EditTaskModal'
import { formatDate } from '../../utils.jsx'
import { useState } from 'react'

export default function Task({ task, onToggle, onUpdateTask, onDeleteTask }) {
    const [showModal, setShowModal] = useState(false);

    const isOverdue = new Date(task.deadline) < new Date();

    return (
        <div
            className="task-container"
            onMouseEnter={() => setShowModal(true)}
            onMouseLeave={() => setShowModal(false)}
        >
            <div className={`task-content ${isOverdue ? "overdue" : ""}`}>
                <div className="task-title">
                    <input type="checkbox" id={task.name} name={task.name} checked={task.completed} onChange={onToggle} />
                    <label htmlFor={task.name}>{task.name}</label>
                </div>
                <div className="task-meta">
                    <p className="task-deadline">Due {formatDate(new Date(task.deadline))}</p>
                    <p className="task-points">{task.points} point{task.points === 1 ? "" : "s"}</p>
                </div>
            </div>

            {showModal && (
                <button
                    className="edit-button"
                    onClick={() => setShowModal('edit')}
                >
                    ...
                </button>
            )}

            {showModal === 'edit' && (
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