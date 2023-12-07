import React from "react";
import Login from "../components/login/Login";
import logo from "../img/logo.png";

const Home = () => {
    return (
        <>
            <div className="home d-flex align-items-center">
                <div className="container">
                    <div className="text-center pb-4">
                        <img className="logo" src={logo} alt="Logo" />
                    </div>

                    <Login />
                </div>
            </div>
        </>
    );
};

export default Home;
