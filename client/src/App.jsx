import React, { useState, useEffect, Suspense } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Timer from "./pages/Timer";
import Exercises from "./pages/Exercises";
import { config } from "./utils/config";
import Home from "./pages/Home";
import SignUp from "./components/login/SignUp";

const apiUrl = config.API_BASE_URL;

const App = () => {
    const [validate, setValidate] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}auth/validate`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });
                if (response.status === 200) {
                    setValidate(true);
                } else {
                    setValidate(false);
                }
            } catch (err) {
                setValidate(false);
                console.log(err);
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    {validate ? (
                        <>
                            <Route path="/exercises" element={<Exercises />} />
                            <Route path="/timer" element={<Timer />} />
                        </>
                    ) : (
                        <></>
                    )}
                </Routes>
            </Suspense>
        </>
    );
};

export default App;
