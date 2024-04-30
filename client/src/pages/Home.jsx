import React, { useState } from 'react';
import Login from "../components/login/Login";
import SignUp from "../components/login/SignUp";
import logo from "../img/logo.png";

const Home = () => {
    const [showSignUp, setShowSignUp] = useState(false);


    return (
        <>
        <div className="home d-flex align-items-center">
            <div className="container d-flex justify-content-center flex-column align-items-center">
                <div className="text-center pb-4">
                    <img className="logo" src={logo} alt="Logo" />
                </div>

                <div className="login-container">
                
                    {showSignUp ? <SignUp /> : <Login />}
            
                    {/* Add a button or link to toggle between Login and SignUp */}
                    <div className="text-center mt-2">
                        <button className="btn d-flex w-100 justify-content-center text-white" onClick={() => setShowSignUp(!showSignUp)}>
                            {showSignUp ? 'Already a user?' : 'Sign up'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Home;
