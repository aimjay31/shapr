import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
    const [time, setTime] = useState(1500); // 25 minutes
    const [isActive, setIsActive] = useState(false);
    const [isBreak, setIsBreak] = useState(false);

    useEffect(() => {
        let interval = null;

        if (isActive) {
            interval = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime <= 0) {
                        clearInterval(interval);
                        setIsBreak(!isBreak);
                        return isBreak ? 1500 : 300; // Switch to work or break time
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } else if (!isActive && time !== 1500) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive, time, isBreak]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const handleStartPause = () => {
        setIsActive(!isActive);
    };

    const handleReset = () => {
        setIsActive(false);
        setTime(1500);
        setIsBreak(false);
    };

    return (
        <div>
            <h1>{isBreak ? 'Break Time!' : 'Pomodoro Timer'}</h1>
            <div>{formatTime(time)}</div>
            <button onClick={handleStartPause}>{isActive ? 'Pause' : 'Start'}</button>
            <button onClick={handleReset}>Reset</button>
            <p>{isBreak ? 'Enjoy your break!' : 'Focus on your work!'}</p>
        </div>
    );
};

export default PomodoroTimer;