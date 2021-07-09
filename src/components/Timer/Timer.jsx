import './Timer.scss';

import React, { useEffect, useState } from 'react';

let Timer = (props) => {
    const [time, changeTime] = useState(props.time);
    let timeoutId;
    
    useEffect(() => {
        if (time !== 0) {
            timeoutId = setTimeout(() => {
                changeTime(time - 1000);
            }, 1000);
        }

        return () => clearTimeout(timeoutId);
    });

    return (
        <div className="timer">
            <TimerFormat time={time} />
        </div>
    );
};

function TimerFormat(props) {
    const time = props.time;
    const minutes = Math.floor(time / 60000);
    const seconds = (time - minutes * 60000) / 1000;

    return (
        <div className="timer-format">
            <div className="timer-format__minutes">
                {
                    minutes < 10 ? '0' + minutes : minutes
                }
            </div>
            <div className="timer-format__dots">:</div>
            <div className="timer-format__seconds">
                {
                    seconds < 10 ? '0' + seconds : seconds
                }
            </div>
        </div>
    );
}

export default React.memo(Timer);