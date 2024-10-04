import React, { useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react';

const TimerBar = forwardRef(({ duration, onTimeUp }, ref) => {
    const [timeLeft, setTimeLeft] = useState(duration);
    const intervalRef = useRef(null);
    const endTimeRef = useRef(null);

    useImperativeHandle(ref, () => ({
        getTimeLeft: () => Math.ceil(timeLeft),
    }));

    const startTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        setTimeLeft(duration);
        const endTime = Date.now() + duration * 1000;
        endTimeRef.current = endTime;

        intervalRef.current = setInterval(() => {
            const remainingTime = (endTimeRef.current - Date.now()) / 1000;
            if (remainingTime <= 0) {
                clearInterval(intervalRef.current);
                setTimeLeft(0);
                onTimeUp();
            } else {
                setTimeLeft(remainingTime);
            }
        }, 100);
    };

    useEffect(() => {
        startTimer();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [duration]);

    const progressPercentage = (timeLeft / duration) * 100;

    return (
        <div style={styles.container}>
            <div style={{ ...styles.filler, width: `${progressPercentage}%` }} />
        </div>
    );
});

TimerBar.displayName = 'TimerBar';

const styles = {
    container: {
        height: '30px',
        width: '90%',
        backgroundColor: '#e0e0df',
        borderRadius: '5px',
        overflow: 'hidden',
        marginTop: '20px',
    },
    filler: {
        height: '100%',
        backgroundColor: '#3b5998',
        transition: 'width 100ms linear',
    },
};

export default TimerBar;