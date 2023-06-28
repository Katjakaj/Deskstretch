import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../img/logo.png";

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const closeMenu = () => {
        setShowMenu(false);
    };

    return (
        <>
            <div className="header w-100 mt-4">
                <Navbar bg="" expand="">
                    <Container className="justify-content-center">
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center pb-4">
                                <Link to="/">
                                    <img className="logo" src={logo} alt="Logo" />
                                </Link>
                            </div>
                            <div className="col-12 d-flex justify-content-center">
                                <Navbar.Toggle
                                    aria-controls="basic-navbar-nav"
                                    onClick={toggleMenu}
                                    className={showMenu ? "navbar-toggler white" : "navbar-toggler"}
                                >
                                    <div className="menu-container">
                                        <a className="text-white menu-text">Menu</a>
                                    </div>
                                </Navbar.Toggle>
                            </div>
                        </div>
                        <Offcanvas show={showMenu} onHide={closeMenu} placement="top">
                            <Offcanvas.Header className="mx-auto mt-3">
                                <Offcanvas.Title></Offcanvas.Title>
                                <div className="close-container">
                                    <a className="close" onClick={closeMenu}>
                                        Close
                                    </a>
                                </div>
                            </Offcanvas.Header>
                            <Offcanvas.Body className="d-flex flex-column align-items-center justify-content-start">
                                <Nav className="flex-column text-center">
                                    <Link className="nav-link" to="/timer" onClick={closeMenu}>
                                        Timer
                                    </Link>
                                    <Link className="nav-link" to="/exercises" onClick={closeMenu}>
                                        Exercises
                                    </Link>
                                    <Link className="nav-link" to="/exercises" onClick={closeMenu}>
                                        LOG OUT
                                    </Link>
                                </Nav>
                            </Offcanvas.Body>
                        </Offcanvas>
                    </Container>
                </Navbar>
            </div>
        </>
    );
};

export default Header;