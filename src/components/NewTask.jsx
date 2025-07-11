import { useState } from 'react'
import './task.css'

export default function NewTask({ onAddTask }) {
    const [showForm, setShowForm] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [deadline, setDeadline] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!taskName.trim() || !deadline.trim()) return; // trim() removes whitespace => if empty, return

        const newTask = {
            id: crypto.randomUUID(), // randomly assigns an ID
            name: taskName,
            deadline: deadline,
            completed: false,
            completionDate: null
        };

        onAddTask(newTask);
        setTaskName(""); // resets text fields
        setDeadline("");
        setShowForm(false); // closes form
    }

    return (
        <div className="new-task">
            {!showForm ? (
                <button onClick={() => setShowForm(true)}>New Task</button>
            ) : (
                <form onSubmit={handleSubmit}>
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
                    <button type="submit">Add</button>
                    <button type="button" onClick={() => setShowForm(false)}>Cancel</button> {/* type="button" to avoid default: submitting */}
                </form>
            )}
        </div>
    )
}