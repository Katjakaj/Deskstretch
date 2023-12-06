import React from "react";
import Login from "../components/login/Login";
import Header from "../components/Header";

const Home = () => {
    return (
        <>
            <div className="section">
                <div className="container">
                    <Header />
                    <Login />
                </div>
            </div>
        </>
    );
};

export default Home;
