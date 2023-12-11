import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { config } from "../utils/config";

const apiUrl = config.API_BASE_URL;

const Exercises = ({ onClose }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [exercises, setExercises] = useState([]);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [userId, setCurrentUserId] = useState(null); // Add this state
    const [userExercises, setUserExercises] = useState([]); // Add this state

    const handleAddExercise = async () => {
        try {
            const response = await fetch(`${apiUrl}exercises/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ title, desc }),
            });

            if (response.ok) {
                // Exercise added successfully, update the exercises state
                const newExercise = await response.json();
                setExercises([...exercises, newExercise]);
                setTitle("");
                setDesc("");
            } else {
                // Log the error details for debugging
                const errorData = await response.json();
                console.error("Error:", errorData);
            }
        } catch (error) {
            // Log any unexpected errors
            console.error(error);
        }
    };

    //Fetch users exercises from database and set state with the data
    const handleDisplayExercises = async () => {
        try {
            const response = await fetch(`${apiUrl}exercises/user`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Include cookies
            });

            if (response.ok) {
                const responseData = await response.json();
                const userExercises = responseData;

                setExercises(userExercises); // Set the state with the correct data
            } else {
                // Handle non-successful response
                const errorData = await response.json();
                console.error("Error:", errorData);
                // Set an error state or display an error message
            }
        } catch (error) {
            // Handle fetch or other errors
            console.error(error);
            // Set an error state or display an error message
        }
    };

    //remove user exercise from database and update state with exercise id
    const handleRemoveExercise = async (id) => {
        try {
            const response = await fetch(`${apiUrl}exercises/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Include cookies
            });

            if (response.ok) {
                // Exercise deleted successfully, update the exercises state
                const updatedExercises = exercises.filter((exercise) => exercise._id !== id);
                setExercises(updatedExercises);
            } else {
                // Log the entire response for debugging
                const errorText = await response.text();
                console.error("Error Response:", errorText);
            }
        } catch (error) {
            // Handle fetch or other errors
            console.error(error);
            // Set an error state or display an error message
        }
    };

    const handleClose = () => {
        setShowPopup(false);
        onClose();
    };

    useEffect(() => {
        // Fetch user exercises when the component mounts
        handleDisplayExercises();
    }, []); // The empty dependency array ensures this runs only once when the component mounts

    return (
        <>
            <Header />
            <div className="exercise-container">
                <div className="row justify-content-center">
                    <div className="col-12 col-xl-4 col-md-8">
                        <h1 className="text-center mt-3 mb-4">Exercises</h1>

                        <div className="add-exercise p-3">
                            <h6 className="py-2">Add exercise</h6>
                            <input
                                className="input-field"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Name"
                            />
                            <input
                                className="input-field input-desc"
                                type="textarea"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                placeholder="Description"
                            />
                            <div className="mt-3 text-center py-3 w-100">
                                <a className="btn-add d-flex w-100 justify-content-center" onClick={handleAddExercise}>
                                    Add
                                </a>
                            </div>
                        </div>
                        {exercises.map((exercise) => (
                            <div className="exercise-card my-3" key={exercise.id}>
                                <div>
                                    <h5>{exercise.title}</h5>
                                </div>
                                <div>{exercise.desc}</div>
                                <div className="text-end mt-3">
                                    <a
                                        className="btn-remove"
                                        onClick={() => {
                                            handleRemoveExercise(exercise._id);
                                        }}
                                    >
                                        Remove
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Exercises;
