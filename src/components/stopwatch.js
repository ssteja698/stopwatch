import React, { useState, useEffect, useRef } from 'react';
import './stopwatch.css';

function Stopwatch() {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);

    const [isStarted, setIsStarted] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const timer = useRef(null);

    useEffect(() => {
        return () => {
            clearInterval(timer.current);
        }
    }, []);

    useEffect(() => {
        if (isStarted) {
            let currSeconds = 0;
            let currMinutes = 0;
            let currHours = 0;
            timer.current = setInterval(() => {
                currSeconds += 1;

                if (currSeconds === 60) {
                    currSeconds = 0;
                    currMinutes += 1;
                }

                if (currMinutes === 60) {
                    currMinutes = 0;
                    currHours += 1;
                }

                setSeconds(currSeconds);
                setMinutes(currMinutes);
                setHours(currHours);
            }, 1000);
        } else {
            setSeconds(0);
            setMinutes(0);
            setHours(0);
            clearInterval(timer.current);
        }
    }, [isStarted]);

    const formatTime = (seconds, minutes, hours) => {
        if (Number(seconds) < 10) {
            seconds = `0${seconds}`;
        }
        if (Number(minutes) < 10) {
            minutes = `0${minutes}`;
        }
        if (Number(hours) < 10) {
            hours = `0${hours}`;
        }
        return `${hours}:${minutes}:${seconds}`;
    }

    const onStartButtonClick = () => {
        if (isStarted) {
            setIsStarted(false);
        } else {
            setIsStarted(true);
            setIsPaused(false);
        }
    }

    const onPauseButtonClick = () => {
        if (isPaused) {
            let currSeconds = seconds;
            let currMinutes = minutes;
            let currHours = hours;
            timer.current = setInterval(() => {
                currSeconds += 1;

                if (currSeconds === 60) {
                    currSeconds = 0;
                    currMinutes += 1;
                }

                if (currMinutes === 60) {
                    currMinutes = 0;
                    currHours += 1;
                }

                setSeconds(currSeconds);
                setMinutes(currMinutes);
                setHours(currHours);
            }, 1000);
            setIsPaused(false);
        } else {
            clearInterval(timer.current);
            setIsPaused(true);
        }
    }

    return (
        <div className='stopWatch'>
            <div className='stopWatch__timer'>
                {formatTime(seconds, minutes, hours)}
            </div>
            <div className='stopWatch__buttons'>
                <button className='stopWatch__buttons__startButton' onClick={onStartButtonClick}>
                    {isStarted ? 'Stop' : 'Start'}
                </button>
                {isStarted && (
                    <button onClick={onPauseButtonClick}>
                        {isPaused ? 'Resume' : 'Pause'}
                    </button>
                )}
            </div>
        </div>
    );
}

export default Stopwatch;