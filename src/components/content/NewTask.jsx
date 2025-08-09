import { useState } from 'react'
import './task.css'
import './modal.css'

export default function NewTask({ onAddTask }) {
    const [showForm, setShowForm] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [deadline, setDeadline] = useState("");
    const [description, setDescription] = useState("");
    const [isRecurring, setIsRecurring] = useState(false);
    const [recurringInterval, setRecurringInterval] = useState(1);
    const [recurringUnit, setRecurringUnit] = useState("day");
    const [points, setPoints] = useState(1);
    const [errorMessage, setErrorMessage] = useState("");

    const resetFields = () => {
        setTaskName("");
        setDeadline("");
        setDescription("");
        setIsRecurring(false);
        setRecurringInterval(1);
        setRecurringUnit("day");
        setPoints(1);
        setErrorMessage("");
    }

    const handleSubmit = (event) => {
        event.preventDefault(); // prevents page reload
        if (!taskName.trim() || !deadline.trim()) {
            setErrorMessage("Task name and deadline are required.");
            return;
        } // trim() removes whitespace => if empty, show error message

        const newTask = {
            id: crypto.randomUUID(), // randomly assigns an ID
            name: taskName,
            deadline,
            description,
            isRecurring,
            recurring: isRecurring ? { interval: recurringInterval, unit: recurringUnit } : { interval: 1, unit: "day" },
            points,
            completed: false,
            completionDate: null,
            completedOnce: false
        };

        onAddTask(newTask);
        resetFields();
        setShowForm(false);
    }

    return (
        <div className="new-task">
            {!showForm ? (
                <button className="new-task-button" onClick={() => setShowForm(true)}>New Task</button>
            ) : (
                <div className="modal-overlay" onClick={() => {
                    resetFields();
                    setShowForm(false);
                }}> {/* backdrop behind dialog box */}
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* stops clicks inside the form from closing the modal */}
                        <form onSubmit={handleSubmit}>
                            <h3>New Task</h3>
                            {errorMessage && <p className="error-message">{errorMessage}</p>}
                            <input
                                type="text"
                                name="name"
                                placeholder="Task name"
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
                            <button type="submit">Add</button>
                            <button type="button" onClick={() => {
                                resetFields();
                                setShowForm(false);
                            }}>Cancel</button> {/* type="button" to avoid default: submitting */}
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}