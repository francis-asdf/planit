import Greeting from './Greeting.jsx'
import DailyStreak from './DailyStreak.jsx'

function Title() {
    return (
        <div className="title">
            <h1>Welcome to Planit</h1>
        </div>
    )
}

export default function Header({ streak }) {
    return (
        <div className="header">
            <Title />
            <Greeting />
            <DailyStreak streak={streak} />
        </div>
    )
}