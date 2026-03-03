import { useState, useEffect } from 'react';

function usePomodoroTimer() {
    const [timerState, setTimerState] = useState({
        session: 'work',
        timeLeft: 25 * 60,
        isActive: false,
    });

    useEffect(() => {
        let interval;
        if (timerState.isActive && timerState.timeLeft > 0) {
            interval = setInterval(() => {
                setTimerState(prev => {
                    if (prev.timeLeft === 1) {
                        // Switch session when timer reaches 0
                        const nextSession = prev.session === 'work' ? 'break' : 'work';
                        return {
                            session: nextSession,
                            timeLeft: nextSession === 'work' ? 25 * 60 : 5 * 60,
                            isActive: prev.isActive,
                        };
                    }
                    return {
                        ...prev,
                        timeLeft: prev.timeLeft - 1,
                    };
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timerState.isActive, timerState.session, timerState.timeLeft]);

    const startTimer = () => setTimerState(prev => ({ ...prev, isActive: true }));
    const pauseTimer = () => setTimerState(prev => ({ ...prev, isActive: false }));
    const resetTimer = () => setTimerState({ session: 'work', timeLeft: 25 * 60, isActive: false });

    return {
        session: timerState.session,
        timeLeft: timerState.timeLeft,
        isActive: timerState.isActive,
        startTimer,
        pauseTimer,
        resetTimer
    };
}

export default usePomodoroTimer;