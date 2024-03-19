import React, { useState, useEffect, useRef } from "react";
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

            } else {
                // Handle non-successful response
                console.log("Error in fetch exercises");
            }
        } catch (error) {
            // Log any unexpected errors
            console.error(error);
        }
    };

    const sound = useRef(null);
    const soundPlayed = useRef(false);

    const playSound = () => {
        sound.current = new Audio("/alarm.mp3");
        sound.current.volume = 0.1;
        sound.current.play();
    }

    const stopSound = () => {
        if (sound.current) {
            sound.current.pause();
            sound.current.currentTime = 0; // Optional: Reset the sound to the start
        }
    }

    useEffect(() => {
        if (showPopup && !soundPlayed.current) {
            playSound();
            soundPlayed.current = true;
        } else if (!showPopup) {
            stopSound();
            soundPlayed.current = false;
        }
    }, [showPopup]);

    useEffect(() => {
       
        handleDisplayExercises();
    }, []); 

    const handleClose = () => {
        stopSound();
        setShowPopup(false);
        onClose();
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
