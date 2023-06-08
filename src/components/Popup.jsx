import React from "react";
import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const Popup = ({ title, message, onClose }) => {
    const [showPopup, setShowPopup] = useState(true);

    useEffect(() => {
        setShowPopup(true);
    }, []);

    const handleClose = () => {
        setShowPopup(false);
        onClose(); // Call the onClose callback function passed from the Timer component
    };

    return (
        <Modal show={showPopup} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{message}</p>
            </Modal.Body>
            <Modal.Footer></Modal.Footer>
        </Modal>
    );
};

export default Popup;
