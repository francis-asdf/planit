import { useState, useEffect } from 'react'
import { ConfettiWrapper } from '../../utils.jsx'
import './header.css'

export default function LevelProgressBar({ currentPoints, level, levelPoints }) {
    const [prevLevel, setPrevLevel] = useState(level);
    const [confettiTrigger, setConfettiTrigger] = useState(false);
    const percentage = (currentPoints / levelPoints) * 100;
    const remainingPoints = levelPoints - currentPoints;

    useEffect(() => {
        if (level > prevLevel) {
            setConfettiTrigger(true);
            setTimeout(() => setConfettiTrigger(false), 100);
        }
        setPrevLevel(level);
    }, [level])

    return (
        <div className="level-progress-wrapper">
            <ConfettiWrapper trigger={confettiTrigger} />
            <div className="level-info">
                <span className="level-text">Level {level}</span>
                <span className="points-text">{remainingPoints} point{remainingPoints === 1 ? '' : 's'} until next level</span>
            </div>
            <div className="progress-container">
                <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    )
}