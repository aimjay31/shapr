import { useState, useEffect } from 'react';

const usePomodoroTimer = () => {
    const [session, setSession] = useState('work'); // 'work' or 'break'
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setSession(prevSession => prevSession === 'work' ? 'break' : 'work');
            setTimeLeft(session === 'work' ? 5 * 60 : 25 * 60);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, session]);

    const startTimer = () => setIsActive(true);
    const pauseTimer = () => setIsActive(false);
    const resetTimer = () => {
        setIsActive(false);
        setSession('work');
        setTimeLeft(25 * 60);
    };

    return {
        session,
        timeLeft,
        isActive,
        startTimer,
        pauseTimer,
        resetTimer,
    };
};

export default usePomodoroTimer;