import { useState, useEffect } from 'react'
import '../../index.css'
import './hamburgerMenu.css'

export default function DarkMode() {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const stored = localStorage.getItem("isDarkMode");
        return stored ? JSON.parse(stored) : false;
    });

    useEffect(() => {
        document.body.className = isDarkMode ? "dark" : "light";
        localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
    }, [isDarkMode]); // changes body's class name, which is reflected in change in background-color and color

    return (
        <div className="theme-toggle-container">
            <button className="theme-toggle-button" onClick={() => setIsDarkMode(!isDarkMode)}>
                {isDarkMode ? <i className="fa-solid fa-sun"></i> : <i className="fa-solid fa-moon"></i>}
            </button>
        </div>
    )
}