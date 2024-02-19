import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { config } from "../utils/config";
import Menu from "../components/Menu";
import plusIcon from "../img/plus.svg";

const apiUrl = config.API_BASE_URL;

const Exercises = ({ onClose }) => {
    const [showPopup, setShowPopup] = useState(true);
    const [exercises, setExercises] = useState([]);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [defaultExercises, setDefaultExercises] = useState([]);
    const [selectedDefaultExercise, setSelectedDefaultExercise] = useState();

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
    const handleAddDefaultExercise = async () => {
        try {
            if (selectedDefaultExercise) {
                // Add selected default exercise to user exercises
                setExercises([...exercises, selectedDefaultExercise]);

                // Reset selected default exercise
                setSelectedDefaultExercise(null);
            } else {
                console.error("No default exercise selected.");
            }
        } catch (error) {
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

    //Fetch Default exercises
    const handleDisplayDefaultExercises = async () => {
        try {
            const response = await fetch(`${apiUrl}exercises/default`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                setDefaultExercises(responseData);
            } else {
                const errorData = await response.json();
                console.error("Error:", errorData);
            }
        } catch (error) {
            console.error(error);
        }
    };

    console.log(defaultExercises);

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

    const handleSelectDefaultExercise = async (event) => {
        const selectedId = event.target.value;
        console.log("Selected ID:", selectedId);

        const selectedExercise = defaultExercises.find((exercise) => exercise._id === selectedId);

        console.log("Selected Exercise:", selectedExercise);

        if (selectedExercise) {
            try {
                const response = await fetch(`${apiUrl}exercises/create`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ title: selectedExercise.title, desc: selectedExercise.desc }),
                });

                if (response.ok) {
                    // Exercise added successfully, update the exercises state
                    const newExercise = await response.json();
                    setExercises([...exercises, newExercise]);
                } else {
                    // Log the error details for debugging
                    const errorData = await response.json();
                    console.error("Error:", errorData);
                }
            } catch (error) {
                // Handle errors...
                console.error(error);
            }
        } else {
            console.error("No default exercise selected.");
        }
    };

    console.log(selectedDefaultExercise);

    useEffect(() => {
        // Reset selected default exercise when component mounts
        setSelectedDefaultExercise(null);
        // Fetch user exercises and default exercises
        handleDisplayExercises();
        handleDisplayDefaultExercises();
    }, []);

    console.log(defaultExercises);

    return (
        <>
            <div className="exercise-container">
                <Header />
                <div className="row justify-content-center">
                    <div className="col-12 col-xl-4 col-md-8">
                        <h1 className="text-center mt-3 mb-4">Exercises</h1>
                        <div className="add-exercise p-3">
                            <h6 className="py-2">Add your own exercises</h6>
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
                        <div className="">
                            <div className="exercise-card my-3">
                                <h6>Add default exercise</h6>
                                <div className="text-center mt-3">
                                    <select
                                        className="exercise-dropdown"
                                        onChange={handleSelectDefaultExercise}
                                        multiple
                                    >
                                        {defaultExercises.map((exercise) => (
                                            <option
                                                key={exercise._id}
                                                value={exercise._id}
                                                style={{ display: "flex", justifyContent: "space-between" }}
                                            >
                                                <span>{exercise.title}</span>
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {selectedDefaultExercise && (
                                    <div className="selected-exercise-details mt-3">
                                        <div>
                                            <h5>{selectedDefaultExercise.title}</h5>
                                        </div>
                                        <div>{selectedDefaultExercise.desc}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mt-5">
                            <h5 className="text-center">My exercises </h5>
                            {exercises
                                .slice()
                                .reverse()
                                .map((exercise) => (
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
            </div>
            <Menu />
        </>
    );
};

export default Exercises;
