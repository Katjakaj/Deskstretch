import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const Popup = ({ title, message, onClose }) => {
    const [showPopup, setShowPopup] = useState(true);
    const [exercise, setExercise] = useState("");

    useEffect(() => {
        setShowPopup(true);

        const url = `https://wger.de/api/v2/exercise/?language=2&`;

        fetch(url, {
            headers: {},
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);

                setExercise(data);
            })
            .catch((error) => {
                console.error("Request failed:", error);
            });
    }, []);

    const handleClose = () => {
        setShowPopup(false);
        onClose(); // Call the onClose callback function passed from the Timer component
    };

    const getRandomExerciseData = () => {
        if (exercise.results && exercise.results.length > 0) {
            const randomIndex = Math.floor(Math.random() * exercise.results.length);
            const randomExercise = exercise.results[randomIndex];
            return {
                name: randomExercise.name,
                description: randomExercise.description,
            };
        }
        return { name: "", description: "" };
    };

    const randomExerciseData = getRandomExerciseData();

    return (
        <Modal show={showPopup} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{randomExerciseData.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body dangerouslySetInnerHTML={{ __html: randomExerciseData.description }}></Modal.Body>

            <Modal.Footer></Modal.Footer>
        </Modal>
    );
};

export default Popup;
