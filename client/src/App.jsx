import * as React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Timer from "./components/Timer";
import Exercises from "./components/Exercises";
import Login from "./components/login/Login";
import Footer from "./components/Footer";
import SignUp from "./components/login/SignUp";
import ForgotPw from "./components/login/ForgotPw";

const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/timer" element={<Timer />}></Route>
                <Route path="/exercises" element={<Exercises />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
                <Route path="/forgot-password" element={<ForgotPw />}></Route>
            </Routes>
        </>
    );
};

export default App;
