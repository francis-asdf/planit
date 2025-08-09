import { useState } from 'react'
import { createPortal } from 'react-dom'
import './task.css'
import './modal.css'

export default function EditTaskModal({ task, onClose, onUpdate, onDelete }) {
    const [taskName, setTaskName] = useState(task.name);
    const [deadline, setDeadline] = useState(task.deadline);
    const [description, setDescription] = useState(task.description);
    const [isRecurring, setIsRecurring] = useState(task.isRecurring);
    const [recurringInterval, setRecurringInterval] = useState(task.recurring.interval);
    const [recurringUnit, setRecurringUnit] = useState(task.recurring.unit);
    const [points, setPoints] = useState(task.points);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSave = (event) => {
        event.preventDefault();
        if (!taskName.trim() || !deadline.trim()) {
            setErrorMessage("Task name and deadline are required.");
            return;
        }
        const updatedTask = { ...task, name: taskName, deadline, description, isRecurring, recurring: isRecurring ? { interval: recurringInterval, unit: recurringUnit } : { interval: 0, unit: "day" }, points }
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
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <input
                        type="text"
                        name="name"
                        autoComplete="off"
                        value={taskName}
                        onChange={(e) => {
                            setTaskName(e.target.value);
                            setErrorMessage("");
                        }}
                    />
                    <input
                        type="datetime-local"
                        name="deadline"
                        value={deadline}
                        onChange={(e) => {
                            setDeadline(e.target.value);
                            setErrorMessage("");
                        }}
                    />
                    <textarea
                        placeholder="Description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <label htmlFor="recurring-check">
                        <input
                            type="checkbox"
                            id="recurring-check"
                            checked={isRecurring}
                            onChange={(e) => setIsRecurring(e.target.checked)}
                        />
                        Make this task recurring
                    </label>
                    {isRecurring && (
                        <div>
                            <label htmlFor="recurring-interval">Repeat every:</label>
                            <div className="recurring-info">
                                <input
                                    type="number"
                                    id="recurring-interval"
                                    name="recurring-interval"
                                    min="1"
                                    value={recurringInterval}
                                    onChange={(e) => setRecurringInterval(parseInt(e.target.value) || 1)}
                                />
                                <select
                                    value={recurringUnit}
                                    onChange={(e) => setRecurringUnit(e.target.value)}
                                >
                                    <option value="day">day(s)</option>
                                    <option value="week">week(s)</option>
                                </select>
                            </div>
                        </div>
                    )}
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