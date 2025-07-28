import { useState } from 'react'
import './task.css'
import './modal.css'

export default function EditTaskModal({ task, onClose, onUpdate, onDelete }) {
    const [taskName, setTaskName] = useState(task.name);
    const [deadline, setDeadline] = useState(task.deadline);

    const handleSave = () => {
        if (!taskName.trim() || !deadline.trim()) return;
        const updatedTask = { ...task, name: taskName, deadline }
        onUpdate(updatedTask);
        onClose();
    }

    const handleDelete = () => {
        onDelete(task.id);
        onClose();
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <form onSubmit={handleSave}>
                    <h3>Edit Task</h3>
                    <input
                        type="text"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                    <input
                        type="datetime-local"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                    />
                    <div className="edit-task-buttons">
                        <button type="submit">Save</button>
                        <button onClick={handleDelete} className="edit-task-delete-button">Delete</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}