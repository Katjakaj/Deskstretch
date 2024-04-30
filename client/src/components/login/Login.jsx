import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../../utils/config";
import { Link } from "react-router-dom";
const apiUrl = config.API_BASE_URL;

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}auth/login/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
                credentials: "include",
            });

            if (response.status === 200) {
                navigate("/timer");
            } else {
                // Handle other status codes here
                setError("Wrong email/password or some other error occurred.");
            }
        } catch (error) {
            console.error(error);
            setError("Network error occurred. Please try again.");
        }
    };

    return (
        <div className="login d-flex justify-content-center align-items-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="px-5">
                            <h5 className="text-center mb-4">Log in</h5>
                            <input
                                className="input-field mb-2"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></input>
                            <input
                                className="input-field"
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></input>
                            {error && <p className="text-danger mt-4">{error}</p>}
                            {/* <Link
                                className="btn-password d-flex w-100 justify-content-end text-white mt-4"
                                to="/forgot-password"
                            >
                                Forgot password?
                            </Link> */}
                            <div className="mt-3 text-center py-3 w-100">
                                <button className="btn-login d-flex w-100 justify-content-center" onClick={fetchData}>
                                    Log in
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
