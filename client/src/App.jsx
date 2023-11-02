import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Timer from "./components/Timer";
import Exercises from "./components/Exercises";
import Login from "./components/login/Login";
import Footer from "./components/Footer";
import SignUp from "./components/login/SignUp";
import ForgotPw from "./components/login/ForgotPw";
import { config } from "./utils/config";

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
            navigate("/");
          }
        } catch (err) {
          console.log(err);
        }
      };
  
      fetchData();
    }, [navigate]);
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Login />}></Route>
                {validate ? (
                    <>
                <Route path="/timer" element={<Timer />}></Route>
                <Route path="/exercises" element={<Exercises />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
                <Route path="/forgot-password" element={<ForgotPw />}></Route>
                </>
                ) : null}
            </Routes>
        </>
    );
};

export default App;
