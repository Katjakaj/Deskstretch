import React, { useState, useEffect } from "react";
import "../scss/components/timer.scss"

const Timer = () => {
  const [time, setTime] = useState(300); // 5 minutes in seconds
  const [selectedTime, setSelectedTime] = useState(300);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive]);

  const startTimer = () => {
    setIsActive(true);
    setTime(selectedTime);
  };

  const stopTimer = () => {
    setIsActive(false);
    //setTime(300); // Reset the timer to 5 minutes
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(selectedTime); // Reset the timer to the selected time
  };

  const handleTimeChange = (event) => {
    const newTime = parseInt(event.target.value);
    setSelectedTime(newTime);
    setTime(newTime); // Update the current time immediately
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="timer">
      <div className="timer-container container d-flex align-items-center justify-content-center">
        <div className="row justify-content-center">
          <div className="col-12 d-flex justify-content-center">
            <div className="circle">
              <svg className="circle-svg">
                <circle
                  className="circle-background"
                  cx="50%"
                  cy="50%"
                  r="45%"
                />
                <circle
                  className="circle-progress"
                  cx="50%"
                  cy="50%"
                  r="45%"
                  style={{
                    strokeDasharray: `${(time / selectedTime) * 283}% 283%`,
                  }}
                />
              </svg>
              <div className="time-wrapper">
                <span className="time text-white">{formatTime(time)}</span>
              </div>
            </div>
          </div>

          <div className="col-12 mt-4 d-flex justify-content-center">
            {!isActive ? (
              <a onClick={startTimer}>Start</a>
            ) : (
              <a onClick={stopTimer}>Stop</a>
            )}
            <a onClick={resetTimer}>Reset</a>
          </div>
          <div className="col-12 mt-4 d-flex justify-content-center">
            <select value={selectedTime} onChange={handleTimeChange}>
            <option value={10}>10 sec</option>
              <option value={300}>5 minutes</option>
              <option value={600}>10 minutes</option>
              <option value={900}>15 minutes</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
