import { useState, useEffect, useCallback } from 'react'
import { useWindowSize } from '@react-hook/window-size';
import ReactConfetti from 'react-confetti';

export function formatDate(date) {
    let dateOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: "America/Vancouver"
    };
    return new Intl.DateTimeFormat("en-US", dateOptions).format(date);
}

export function ConfettiWrapper({ trigger }) {
    const [show, setShow] = useState(false);
    const [recycle, setRecycle] = useState(true);
    const [width, height] = useWindowSize();

    const fireConfetti = useCallback(() => { // useCallback prevents unnecessary re-rendering and can be used inside useEffect
        setShow(true);
        setRecycle(true);
        setTimeout(() => setRecycle(false), 2500);
        setTimeout(() => setShow(false), 7500);
    }, []);

    useEffect(() => {
        if (trigger) {
            fireConfetti();
        }
    }, [trigger, fireConfetti]);

    return (
        <div>
            {show && (
                <ReactConfetti
                    width={width}
                    height={height}
                    numberOfPieces={200}
                    recycle={recycle}
                    gravity={0.2}
                    wind={0.01}
                />
            )}
        </div>
    )
}