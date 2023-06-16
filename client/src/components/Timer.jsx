import React, { useState, useEffect } from "react";
import "../scss/components/timer.scss";
import Popup from "./Popup";

const Timer = () => {
    const [time, setTime] = useState(10); // 5 minutes in seconds
    const [selectedTime, setSelectedTime] = useState({ hours: "", minutes: "" });
    const [isActive, setIsActive] = useState(false);
    const [showPopup, setShowPopup] = useState(true);

    useEffect(() => {
        let interval = null;

        if (isActive) {
            interval = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime === 0) {
                        clearInterval(interval);
                        setShowPopup(true); // Show the popup when the timer reaches 0
                        return 0;
                    } else {
                        return prevTime - 1;
                    }
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isActive, time]); // Include 'time' as a dependency in the useEffect dependency array

    useEffect(() => {
        // Update the timer whenever the selectedTime changes
        const totalTimeInSeconds = selectedTime.hours * 3600 + selectedTime.minutes * 60;
        setTime(totalTimeInSeconds);
    }, [selectedTime]);

    const startTimer = () => {
        setIsActive(true);
    };

    const stopTimer = () => {
        setIsActive(false);
    };

    const resetTimer = () => {
        setIsActive(false);
        const totalTimeInSeconds = selectedTime.hours * 3600 + selectedTime.minutes * 60;
        setTime(totalTimeInSeconds);
    };

    const handleTimeChange = (event) => {
        const { name, value } = event.target;

        setSelectedTime((prevTime) => ({
            ...prevTime,
            [name]: parseInt(value),
        }));
    };

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    const hourOptions = Array.from({ length: 24 }, (_, i) => i); // Generate options for hours (0-23)
    const minuteOptions = Array.from({ length: 12 }, (_, i) => i * 5); // Generate options for minutes (0, 5, 10, 15, ..., 55)

    return (
        <div className="timer">
            <div className="timer-container container d-flex align-items-center justify-content-center">
                <div className="row justify-content-center">
                    <div className="col-12 d-flex justify-content-center">
                        <div className="circle">
                            <svg className="circle-svg">
                                <circle className="circle-background" cx="50%" cy="50%" r="45%" />
                                <circle
                                    className="circle-progress"
                                    cx="50%"
                                    cy="50%"
                                    r="45%"
                                    style={{
                                        strokeDasharray: `${
                                            (time / (selectedTime.hours * 3600 + selectedTime.minutes * 60)) * 283
                                        }% 283%`,
                                    }}
                                />
                            </svg>
                            <div className="time-wrapper">
                                <span className="time text-white">{formatTime(time)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 mt-4 d-flex justify-content-center">
                        {!isActive ? <a onClick={startTimer}>Start</a> : <a onClick={stopTimer}>Stop</a>}
                        <a onClick={resetTimer}>Reset</a>
                    </div>
                    <div className="col-12 mt-2 d-flex justify-content-center mt-4">
                        <div className="mx-1">
                            <select
                                className="form-select"
                                name="hours"
                                value={selectedTime.hours}
                                onChange={handleTimeChange}
                            >
                                <option value="" disabled selected>
                                    Hours
                                </option>
                                {hourOptions.map((hour) => (
                                    <option key={hour} value={hour}>
                                        {hour} h
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mx-1">
                            <select
                                className="form-select"
                                name="minutes" // Update the name to "minutes"
                                value={selectedTime.minutes} // Use selectedTime.minutes instead of selectedTime.hours
                                onChange={handleTimeChange}
                            >
                                <option value="" disabled selected>
                                    Minutes
                                </option>
                                {minuteOptions.map((minute) => (
                                    <option key={minute} value={minute}>
                                        {minute} min
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {showPopup && <Popup onClose={handlePopupClose} />}
            </div>
        </div>
    );
};

export default Timer;
