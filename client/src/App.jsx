import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Timer from "./pages/Timer";
import Exercises from "./pages/Exercises";
import { config } from "./utils/config";
import Home from "./pages/Home";

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
          if (!response.status === 200) {
            setValidate(false);
            navigate("/");
          } else {
            setValidate(true);
          }
        } catch (err) {
          setValidate(false);
          navigate("/");
          console.log(err);
        }
      };
  
      fetchData();
    }, [navigate]);
    
    return (
        <>
          
            <Routes>
                {validate ? (
                    <>
                <Route path="/timer" element={<Timer />} />
                <Route path="/exercises" element={<Exercises />} />
                </>
                ) : <Route path="/" element={<Home />} />}
            </Routes>
        </>
    );
};

export default App;
