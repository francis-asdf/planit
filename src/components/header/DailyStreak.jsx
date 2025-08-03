import { useState, useEffect } from 'react'
import { ConfettiWrapper } from '../../utils.jsx';
import './header.css'

export default function DailyStreak({ streak }) {
    const [prevStreak, setPrevStreak] = useState(streak);
    const [confettiTrigger, setConfettiTrigger] = useState(false);

    useEffect(() => {
        if (streak > prevStreak) {
            setConfettiTrigger(true);
            setTimeout(() => setConfettiTrigger(false), 100);
        }
        setPrevStreak(streak);
    }, [streak])

    return (
        <div className="streak">
            <ConfettiWrapper trigger={confettiTrigger} />
            <h3>🔥 Daily Streak: {streak || 0} day{streak === 1 ? "" : "s"}.</h3>
        </div>
    )
}