import React, { useState, useEffect } from "react";
import "../scss/components/timer.scss";
import Popup from "./Popup";

const Timer = () => {
    const [time, setTime] = useState(10); // 5 minutes in seconds
    const [selectedTime, setSelectedTime] = useState({ hours: "", minutes: 1 });
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

    const startTimer = () => {
        setIsActive(true);
        setTime((selectedTime.hours * 60 + selectedTime.minutes) * 60);
    };

    const stopTimer = () => {
        setIsActive(false);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTime((selectedTime.hours * 60 + selectedTime.minutes) * 60);
    };

    const handleTimeChange = (event) => {
        const { name, value } = event.target;

        // Parse the input value as an integer, or set it to 0 if the input is empty
        const parsedValue = value !== "" ? parseInt(value) : 0;

        setSelectedTime((prevTime) => ({
            ...prevTime,
            [name]: parsedValue,
        }));

        setTime((parsedValue * 60 + selectedTime.minutes) * 60); // Update the current time immediately
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
                                            (time / ((selectedTime.hours * 60 + selectedTime.minutes) * 60)) * 283
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
                        <div className="mx-1 form-floating">
                            <input
                                className="form-control"
                                type="number"
                                min="0"
                                name="hours"
                                value={selectedTime.hours}
                                onChange={handleTimeChange}
                                placeholder="hours"
                            />
                            <label for="floatinginput">hours</label>
                        </div>
                        <div className="mx-1 form-floating">
                            <input
                                className="form-control"
                                type="number"
                                min="0"
                                name="minutes"
                                value={selectedTime.minutes}
                                onChange={handleTimeChange}
                                placeholder="minutes"
                            />
                            <label for="floatinginput">min</label>
                        </div>
                    </div>
                </div>

                {showPopup && <Popup onClose={handlePopupClose} />}
            </div>
        </div>
    );
};

export default Timer;
