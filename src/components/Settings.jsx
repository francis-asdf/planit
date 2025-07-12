import { useState, useEffect } from 'react'
import '../index.css'

function DarkMode({ isDarkMode, toggleDarkMode }) {
    return (
        <button onClick={toggleDarkMode}>
            {isDarkMode ? "Light mode" : "Dark mode"}
        </button>
    )
}

export default function Settings() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        document.body.className = isDarkMode ? "dark" : "light";
    }, [isDarkMode]); // changes body's class name, which is reflected in change in background-color and color

    return (
        <div className={isDarkMode ? "dark" : "light"}>
            <h2>Settings</h2>
            <DarkMode isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
        </div>
    )
}