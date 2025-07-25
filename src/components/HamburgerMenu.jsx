import { useState, useEffect } from 'react'
import '../index.css'
import './hamburgerMenu.css'

function DarkMode({ isDarkMode, toggleDarkMode }) {
    return (
        <button className="theme-toggle-button" onClick={toggleDarkMode}>
            {isDarkMode ? "Light mode" : "Dark mode"}
        </button>
    )
}

export default function HamburgerMenu() {
    const [open, setOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        document.body.className = isDarkMode ? "dark" : "light";
    }, [isDarkMode]); // changes body's class name, which is reflected in change in background-color and color

    return (
        <div className="hamburger-container">
            <button className="hamburger" onClick={() => setOpen(!open)}>
                ☰
            </button>

            {open && (
                <div className="menu-dropdown">
                    <DarkMode isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
                </div>
            )}
        </div>
    )
}