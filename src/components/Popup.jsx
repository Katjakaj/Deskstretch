import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import data from "../data/exercises";

const Popup = ({ onClose }) => {
    const [showPopup, setShowPopup] = useState(false);

    const exercises = data;
    const randomExerciseIndex = Math.floor(Math.random() * exercises.length);
    const randomExercise = exercises[randomExerciseIndex];

    const handleClose = () => {
        setShowPopup(false);
        onClose();
    };

    return (
        <Modal show={showPopup} centered>
            <div className="modal-content">
                <div className="modal-header">
                    <Modal.Title>{randomExercise.name}</Modal.Title>
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
