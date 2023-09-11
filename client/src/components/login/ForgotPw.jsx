import React from "react";
import { Link } from "react-router-dom";

function ForgotPw() {
    return (
        <div className="login d-flex justify-content-center align-items-center">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="login-container px-5">
                            <h5 className="text-center mb-4">Forgot password</h5>
                            <p>Enter your email and we'll send you a link to reset your password. </p>
                            <input className="input-field mb-2" placeholder="Email"></input>
                            <div className="d-flex w-100 justify-content-end text-white mt-4">
                                <Link className="btn-password text-white" to="/signup">
                                    Dont' have a user?
                                </Link>
                            </div>
                            <div className="mt-3 text-center py-3 w-100">
                                <a className="btn-login d-flex w-100 justify-content-center">Send</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPw;
