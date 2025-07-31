import Greeting from './Greeting.jsx'
import DailyStreak from './DailyStreak.jsx'
import LevelProgressBar from './LevelProgressBar.jsx'
import './header.css'

function Title() {
    return (
        <div>
            <h1>Welcome to Planit</h1>
        </div>
    )
}

export default function Header({ streak, currentPoints, level, pointsForNextLevel }) {
    return (
        <div className="header">
            <div className="title">
                <Title />
            </div>
            <div className="header-info">
                <div className="header-left">
                    <Greeting />
                    <DailyStreak streak={streak} />
                </div>
                <div className="header-right">
                    <LevelProgressBar currentPoints={currentPoints} level={level} levelPoints={pointsForNextLevel} />
                </div>
            </div>
        </div>
    )
}