import { useState } from 'react'
import './task.css'
import './modal.css'

export default function NewTask({ onAddTask }) {
    const [showForm, setShowForm] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [deadline, setDeadline] = useState("");
    const [description, setDescription] = useState("");
    const [points, setPoints] = useState(1);

    const resetFields = () => {
        setTaskName("");
        setDeadline("");
        setDescription("");
        setPoints(1);
    }

    const handleSubmit = (event) => {
        event.preventDefault(); // prevents page reload
        if (!taskName.trim() || !deadline.trim()) return; // trim() removes whitespace => if empty, return

        const newTask = {
            id: crypto.randomUUID(), // randomly assigns an ID
            name: taskName,
            deadline: deadline,
            description: description,
            points: points,
            completed: false,
            completionDate: null
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
                <div className="modal-overlay" onClick={() => setShowForm(false)}> {/* backdrop behind dialog box */}
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* stops clicks inside the form from closing the modal */}
                        <form onSubmit={handleSubmit}>
                            <h3>New Task</h3>
                            <input
                                type="text"
                                placeholder="Task name"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                            />
                            <input
                                type="datetime-local"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                            />
                            <textarea
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <label htmlFor="points-slider">Points: {points}</label>
                            <input
                                type="range"
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