import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../img/logo.png";

const Header = () => {
  return (
    <>
      <div className="header position-absolute w-100  d-flex justify-content-center mt-4">
        <Navbar bg="" expand="lg">
          <div className="container">
            <Link to="/">
            <img className="logo" src={logo}/>
            </Link>

            {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse
              className="justify-content-end"
              id="basic-navbar-nav"
            >
              <Nav className="">
                <Link className="nav-link" to="/">
                  Home
                </Link>
                <Link className="nav-link" to="/dummy">
                  DummyPage
                </Link>

                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <Link className="dropdown-item" to="/">
                    Home
                  </Link>
                  <Link className="dropdown-item" to="/dummy">
                    DummyPage
                  </Link>
                  <NavDropdown.Divider />
                  <Link className="dropdown-item" to="/">
                    Home
                  </Link>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse> */}
          </div>
        </Navbar>
      </div>
    </>
  );
};

export default Header;
