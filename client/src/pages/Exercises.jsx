import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { config } from "../utils/config";

const apiUrl = config.API_BASE_URL;

const Exercises = ({ onClose }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [exercises, setExercises] = useState([]);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

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

    const handleDisplayExercises = async (id) => {
        try {
            const response = await fetch(`${apiUrl}exercises/user/${id}`);

            if (response.ok) {
                const responseData = await response.json();
                const userExercises = responseData.exercises;
                const userId = responseData.userId;

                setExercises(userExercises);
            } else {
                const errorData = await response.json();
                console.error("Error:", errorData);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemoveExercise = async (id) => {
        try {
            const response = await fetch(`${apiUrl}exercises/user/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (response.status === 200) {
                // Exercise removed successfully, update the exercises state
                setExercises(exercises.filter((exercise) => exercise.id !== id));
            } else {
                console.log("error");
            }
        } catch (error) {
            console.error(error);
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

    console.log(exercises);

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
                                    <a className="btn-remove" onClick={() => handleRemoveExercise(exercise.id)}>
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
