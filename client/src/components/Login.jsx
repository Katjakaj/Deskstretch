import React from "react";

const Login = () => {
    return (
        <div className="login d-flex justify-content-center align-items-center">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="login-container px-5">
                            <input className="input-field mb-2" placeholder="Username"></input>
                            <input className="input-field" placeholder="Password"></input>
                            <a className="btn-password d-flex w-100 justify-content-end text-white mt-4">
                                Forgot password?
                            </a>
                            <div className="mt-3 text-center py-3 w-100">
                                <a className="btn-login d-flex w-100 justify-content-center">Log in</a>
                            </div>
                            <a className="btn d-flex w-100 justify-content-center text-white">Sign up</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
