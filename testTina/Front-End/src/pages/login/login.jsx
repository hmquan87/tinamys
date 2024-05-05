import React from "react";
import '../style/css/login.css';
import logo from '../style/img/logo.svg';
import LoginForm from "./LoginForm";
import { ToastContainer } from "react-toastify";



const Login = () => {
    return (
        <div className="login-page">
            <ToastContainer theme='colored' position='top-right' style={{ color: '#ff0000' }}></ToastContainer>
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <div className="container-login">
                <div className="form-container">
                    <div className="form">
                        <LoginForm />
                        <div className="text-title">
                            Mapping Your<br />Success
                        </div>

                    </div>
                </div>
            </div>
            <div className="btnlink">
                <a href="https://tinasoft.vn/">Powered by Tinasoft</a>
                <a href="https://tinasoft.vn/">© 2023 TINASOFT VIỆT NAM</a>
            </div>
        </div>
    )
}

export default Login;