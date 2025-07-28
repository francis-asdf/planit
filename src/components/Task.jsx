import './task.css'
import './modal.css'
import EditTaskModal from './EditTaskModal'
import { formatDate } from '../utils.jsx'
import { useState } from 'react'

export default function Task({ task, onToggle, onUpdateTask, onDeleteTask }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div
            className="task-container"
            onMouseEnter={() => setShowModal(true)}
            onMouseLeave={() => setShowModal(false)}
        >
            <div className="task-content">
                <div className="task-title">
                    <input type="checkbox" id={task.name} name={task.name} checked={task.completed} onChange={onToggle} />
                    <label htmlFor={task.name}>{task.name}</label>
                </div>
                <div className="task-deadline">
                    <p>Due {formatDate(new Date(task.deadline))}</p>
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
                    onUpdate={onUpdateTask}
                    onDelete={onDeleteTask}
                />
            )}
        </div>
    )
}