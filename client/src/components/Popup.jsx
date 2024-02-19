import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { config } from "../utils/config";

const apiUrl = config.API_BASE_URL;

const Popup = ({ onClose }) => {
    const [showPopup, setShowPopup] = useState(true);
    const [randomExercise, setRandomExercise] = useState({});
    const [exercises, setExercises] = useState([]);

    // Fetch user exercises from the database and set state with the data
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
                setExercises(responseData); // Set the state with the correct data

                // Select a random exercise from the fetched data
                const randomIndex = Math.floor(Math.random() * responseData.length);
                setRandomExercise(responseData[randomIndex]);

                // Play sound
                playSound();
            } else {
                // Handle non-successful response
                console.log("Error in fetch exercises");
            }
        } catch (error) {
            // Log any unexpected errors
            console.error(error);
        }
    };

    useEffect(() => {
        // Fetch user exercises when the component mounts
        handleDisplayExercises();
    }, []); // The empty dependency array ensures this runs only once when the component mounts

    const handleClose = () => {
        setShowPopup(false);
        onClose();
    };

    const playSound = () => {
        const sound = new Audio("/alarm.mp3"); // Assuming the sound file is directly inside the "public" directory
        sound.play();
    };

    return (
        <Modal show={showPopup} centered>
            <div className="modal-content">
                <div className="modal-header">
                    <Modal.Title>{randomExercise.title}</Modal.Title>
                    <span className="close red-close-button" onClick={handleClose}>
                        <span>&times;</span>
                    </span>
                </div>
                <div className="modal-body">{randomExercise.desc}</div>
            </div>
        </Modal>
    );
};

export default Popup;
