import { useState, useEffect } from 'react'
import '../../index.css'
import './hamburgerMenu.css'

function DarkMode({ isDarkMode, toggleDarkMode }) {
    return (
        <button className="theme-toggle-button" onClick={toggleDarkMode}>
            {isDarkMode ? <i className="fa-solid fa-sun"></i> : <i className="fa-solid fa-moon"></i>}
        </button>
    )
}

export default function HamburgerMenu() {
    const [open, setOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const stored = localStorage.getItem("isDarkMode");
        return stored ? JSON.parse(stored) : false;
    });

    useEffect(() => {
        document.body.className = isDarkMode ? "dark" : "light";
        localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
    }, [isDarkMode]); // changes body's class name, which is reflected in change in background-color and color

    return (
        <div className="hamburger-container">
            <button className="hamburger" onClick={() => setOpen(!open)}>
                ☰
            </button>

            {open && (
                <div className={`menu ${open ? 'menu-open' : ''}`}>
                    <DarkMode isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
                </div>
            )}
        </div>
    )
}