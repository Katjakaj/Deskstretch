import React, { useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import logo from "../img/logo.png";

const Header = () => {
    return (
        <>
            <div className="header w-100">
                <div className="row">
                    <div className="col-12 d-flex justify-content-center pb-4">
                        <img className="logo mx-auto text-center" src={logo} alt="Logo" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
