import { useState } from 'react';
import './startPage.css';
import DarkMode from '../header/DarkMode';

export default function StartPage({ onLogin }) {
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");

    const handleSubmit = () => {
        if (name.trim()) {
            localStorage.setItem("userName", name);
            const userData = {
                name
            }; // primarily used for API calls in the future
            onLogin(userData);
        }
    }

    return (
        <div className="start-page">
            <DarkMode />
            <h1 className="start-title">Welcome to Planit</h1>
            <p className="start-subtitle">Where time meets intention</p>
            <div className="sign-up">
                {!showForm ? (
                    <button className="get-started-button" onClick={() => setShowForm(true)}>Get started</button>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="user-name"
                            className="name-input"
                            placeholder="Enter your name"
                            autoComplete="off"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <button className="login-button" onClick={handleSubmit}>Continue</button>
                    </form>
                )}
            </div>
        </div>
    )
}