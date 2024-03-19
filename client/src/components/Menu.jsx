import React, { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import timerIcon from "../img/timer-icon.svg";
import logout from "../img/logout.svg";
import exerciseIcon from "../img/exercise-icon.svg";

const handleLogout = () => {
    console.log("Logging out...");
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
};

function Menu() {
    return (
        
            <div className="menu">
                <Nav className="d-flex justify-content-around">
                    <Link className="nav-link d-flex flex-column justify-content-center" to="/exercises">
                        <img className="icon mx-auto mb-1" src={exerciseIcon} alt="Timer icon" />
                        Exercises
                    </Link>
                    <Link className="nav-link d-flex flex-column justify-content-center" to="/timer">
                        <img className="icon mx-auto mb-1" src={timerIcon} alt="Timer icon" />
                        Timer
                    </Link>
                    <Link className="nav-link d-flex flex-column justify-content-center" to="/" onClick={handleLogout}>
                        <img className="icon mx-auto mb-1" src={logout} alt="Timer icon" />
                        Log out
                    </Link>
                </Nav>
            </div>
        
    );
}

export default Menu;
