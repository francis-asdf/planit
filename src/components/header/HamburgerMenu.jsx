import { useState } from 'react'
import ResetButton from './ResetButton.jsx'
import './hamburgerMenu.css'

export default function HamburgerMenu({ resetProgress }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="hamburger-container">
            <button className="hamburger" onClick={() => setOpen(!open)}>
                ☰
            </button>

            {open && (
                <div className={`menu ${open ? 'menu-open' : ''}`}>
                    <ResetButton resetProgress={() => resetProgress()} />
                </div>
            )}
        </div>
    )
}