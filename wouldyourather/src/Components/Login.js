import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/login.css';

const Login = () => {
    // authorisation

    // set cookies


    // return a decription and a login form
    return (
        <>
        <div className="container">
        <div className="d-flex justify-content-center h-100">
            <div className="card">
                <div className="card-header">
                    <h3>Sign In</h3>
                </div>
                <div className="card-body">
                    <form action="/" method="GET">
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    
                                    <i className="fas fa-user"></i>
                                </span>
                            </div>
                            <input type="text" className="form-control" placeholder="username" />
                        </div>
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="fas fa-key"></i>
                                </span>
                            </div>
                            <input type="password" className="form-control" placeholder="password" />
                        </div>
                        <div className="row align-items-center remember">
                            <input type="checkbox" />Remember Me
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Login" className="btn float-right login_btn" />
                        </div>
                    </form>
                </div>
                <div className="card-footer">
                    <div className="d-flex justify-content-center links">
                        Don't have an account?<Link to="/users/signup">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
        </>
    )
}

export default Login;