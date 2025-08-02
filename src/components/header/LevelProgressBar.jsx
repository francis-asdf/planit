import './header.css'

export default function LevelProgressBar({ currentPoints, level, levelPoints }) {
    const percentage = (currentPoints / levelPoints) * 100;
    const remainingPoints = levelPoints - currentPoints;

    return (
        <div className="level-progress-wrapper">
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