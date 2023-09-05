import * as React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Timer from "./components/Timer";
import Exercises from "./components/Exercises";
import Login from "./components/Login";
import Footer from "./components/Footer";

const App = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/timer" element={<Timer />}></Route>
                <Route path="/exercises" element={<Exercises />}></Route>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
        </>
    );
};

export default App;
