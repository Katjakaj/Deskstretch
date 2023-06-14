import React, { useState, useEffect } from "react";
import data from "../data/exercises";

const Exercises = ({ onClose }) => {
    const [showPopup, setShowPopup] = useState(false);

    const exercises = data;

    const handleClose = () => {
        setShowPopup(false);
        onClose();
    };

    return (
        <div className="exercise-container">
            <h1 className="text-center mt-3 mb-4">Exercises</h1>
            {exercises.map((exercise, index) => (
                <div className="exercise-card my-3">
                    <div key={index}>
                        <div className="">
                            <h5>{exercise.name}</h5>
                        </div>
                        <div className="">{exercise.desc}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Exercises;
