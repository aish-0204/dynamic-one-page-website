import React from 'react';
import './countdown.css';

const CountdownTimer = ({ time }) => {
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className="countdown-timer">
      <div className="countdown-number">{formatTime(time)}</div>
    </div>
  );
};

export default CountdownTimer;
