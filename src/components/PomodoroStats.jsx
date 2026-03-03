import React from 'react';

const PomodoroStats = ({ completedSessions, totalFocusTime, streak }) => {
    return (
        <div>
            <h2>Pomodoro Session Statistics</h2>
            <p><strong>Completed Sessions:</strong> {completedSessions}</p>
            <p><strong>Total Focus Time:</strong> {totalFocusTime} minutes</p>
            <p><strong>Current Streak:</strong> {streak} sessions</p>
        </div>
    );
};

export default PomodoroStats;
