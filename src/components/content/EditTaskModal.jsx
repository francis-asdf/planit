import { useState } from 'react'
import { createPortal } from 'react-dom'
import './task.css'
import './modal.css'

export default function EditTaskModal({ task, onClose, onUpdate, onDelete }) {
    const [taskName, setTaskName] = useState(task.name);
    const [deadline, setDeadline] = useState(task.deadline);
    const [description, setDescription] = useState(task.description);
    const [points, setPoints] = useState(task.points);

    const handleSave = (event) => {
        event.preventDefault();
        if (!taskName.trim() || !deadline.trim()) return;
        const updatedTask = { ...task, name: taskName, deadline: deadline, description: description, points: points }
        onUpdate(updatedTask);
        onClose();
    }

    const handleDelete = () => {
        onDelete(task.id);
        onClose();
    }

    const modalContent = ( // with createPortal, all of this will be rendered in document.body rather than inside the task container
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSave}>
                    <h3>Edit Task</h3>
                    <input
                        type="text"
                        name="name"
                        autoComplete="off"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                    <input
                        type="datetime-local"
                        name="deadline"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                    />
                    <textarea
                        placeholder="Description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <label htmlFor="points-slider">Points: {points}</label>
                    <input
                        type="range"
                        id="points-slider"
                        name="points-slider"
                        min="1"
                        max="50"
                        step="1"
                        value={points}
                        onChange={(e) => setPoints(parseInt(e.target.value))}
                    />
                    <div className="edit-task-buttons">
                        <button type="submit">Save</button>
                        <button type="button" onClick={handleDelete} className="edit-task-delete-button">Delete</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}