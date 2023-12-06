import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../../utils/config";
import { Link } from "react-router-dom";
const apiUrl = config.API_BASE_URL;

const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}auth/signup/`, {
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
            const data = await response;
            console.log(data);
            if (data.status === 201) {
                navigate("/");
            } else {
                setError("Email/username is already registered");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="login d-flex justify-content-center align-items-center">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="login-container px-5">
                            <h5 className="text-center mb-4">Sign up</h5>
                            <input
                                className="input-field mb-2"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                className="input-field"
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {error && <p className="text-danger mt-4">{error}</p>}
                            <div className="d-flex w-100 justify-content-end text-white mt-4">
                                <Link className="btn-password text-white" to="/">
                                    Already a user?
                                </Link>
                            </div>
                            <div className="mt-3 text-center py-3 w-100">
                                <button className="btn-login d-flex w-100 justify-content-center" onClick={fetchData}>
                                    Sign up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
