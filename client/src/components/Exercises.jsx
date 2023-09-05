import React, { useState, useEffect } from "react";
import data from "../data/exercises";

const Exercises = ({ onClose }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [exercises, setExercises] = useState(data);
    const [newExercise, setNewExercise] = useState({ name: "", desc: "" });

    const handleClose = () => {
        setShowPopup(false);
        onClose();
    };

    const addExercise = () => {
        // Check if both name and desc are provided
        if (newExercise.name && newExercise.desc) {
            // Create a copy of the newExercise object
            const exerciseToAdd = { ...newExercise };

            // Add the exercise to the exercises array
            setExercises([exerciseToAdd, ...exercises]);

            // Clear the input fields after adding the exercise
            setNewExercise({ name: "", desc: "" });
        }
    };

    const removeExercise = (indexToRemove) => {
        const updatedExercises = exercises.filter((_, index) => index !== indexToRemove);
        setExercises(updatedExercises);
    };

    return (
        <div className="exercise-container">
            <h1 className="text-center mt-3 mb-4">Exercises</h1>

            <div className="add-exercise p-3">
                <h6 className="py-2">Add exercise</h6>
                <input
                    className="input-field"
                    type="text"
                    value={newExercise.name}
                    onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                    placeholder="Name"
                />
                <input
                    className="input-field input-desc"
                    type="textarea"
                    value={newExercise.desc}
                    onChange={(e) => setNewExercise({ ...newExercise, desc: e.target.value })}
                    placeholder="Description"
                />
                <div className="mt-3 text-center py-3 w-100">
                    <a className="btn-add d-flex w-100 justify-content-center" onClick={addExercise}>
                        Add
                    </a>
                </div>
            </div>
            {exercises.map((exercise, index) => (
                <div className="exercise-card my-3" key={index}>
                    <div>
                        <h5>{exercise.name}</h5>
                    </div>
                    <div>{exercise.desc}</div>
                    <div className="text-end mt-3">
                        <a className="btn-remove" onClick={() => removeExercise(index)}>
                            Remove
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Exercises;
