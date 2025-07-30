import { useState, useEffect } from 'react'
import { useWindowSize } from '@react-hook/window-size';
import ReactConfetti from 'react-confetti';

export default function DailyStreak({ streak }) {
    const [prevStreak, setPrevStreak] = useState(streak);
    const [showConfetti, setShowConfetti] = useState(false);
    const [recycleConfetti, setRecycleConfetti] = useState(true);
    const [width, height] = useWindowSize();

    useEffect(() => {
        if (streak > prevStreak) {
            setShowConfetti(true);
            setRecycleConfetti(true);
            console.log("WOOHOO!!");

            setTimeout(() => setRecycleConfetti(false), 2500);
            setTimeout(() => setShowConfetti(false), 7500);
        }
        setPrevStreak(streak);
    }, [streak])

    return (
        <div className="streak">
            {showConfetti && (
                <ReactConfetti
                    width={width}
                    height={height}
                    numberOfPieces={200}
                    recycle={recycleConfetti}
                    gravity={0.2}
                    wind={0.01}
                />
            )}
            <h3>🔥 Daily Streak: {streak || 0} day{streak === 1 ? "" : "s"}.</h3>
        </div>
    )
}