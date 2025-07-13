import { useState, useEffect } from 'react'

function Title() {
    return (
        <div className="title">
            <h1>Welcome to Planit</h1>
        </div>
    )
}

function Greeting() {
    const [timeOfDay, setTimeOfDay] = useState("");

    const updateTimeOfDay = () => {
        const hour = new Date().getHours();
        if (hour < 12) {
            setTimeOfDay("morning");
        } else if (hour < 18) {
            setTimeOfDay("afternoon");
        } else {
            setTimeOfDay("evening");
        }
    };

    useEffect(() => {
        updateTimeOfDay(); // run once immediately after component loads

        const now = new Date();
        const msUntilNextHour = (60 - now.getMinutes()) * 60 * 1000 - now.getSeconds() * 1000 - now.getMilliseconds();

        const timeout = setTimeout(() => {
            updateTimeOfDay();
            const interval = setInterval(updateTimeOfDay, 60 * 60 * 1000); // creates a new 1h timer until next update
        }, msUntilNextHour); // waits remaining time until next hour to run code inside

        return () => { // cleanup function
            clearTimeout(timeout); // setTimeout creates a timeout ID that should be cancelled after component disappears
            clearInterval(); // setInterval also creates an ID
        }
    }, []); // [] means to only run the effect once, on mount

    return (
        <div className="greeting">
            <h2>Good {timeOfDay}.</h2>
        </div>
    )
}

function DailyStreak({ streak }) {
    return (
        <div className="streak">
            <h3>🔥 Daily Streak: {streak || 0} days.</h3>
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