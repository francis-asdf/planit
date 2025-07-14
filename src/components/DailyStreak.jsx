import { useState, useEffect } from 'react'
import { useWindowSize } from '@react-hook/window-size';

export default function DailyStreak({ streak }) {
    const [prevStreak, setPrevStreak] = useState(streak);
    const [showConfetti, setShowConfetti] = useState(false);
    const [width, height] = useWindowSize();

    useEffect(() => {
        if (streak > prevStreak) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
        }
        setPrevStreak(streak);
    }, [streak])

    return (
        <div className="streak">
            {showConfetti && <Confetti width={width} height={height} />}
            <h3>🔥 Daily Streak: {streak || 0} day{streak === 1 ? "" : "s"}.</h3>
        </div>
    )
}