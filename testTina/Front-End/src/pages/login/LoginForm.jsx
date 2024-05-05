import { useState } from "react";
import face from "../style/img/face.png";
import google from "../style/img/google.png";
import SigninComponent from "../../components/SiginComponent";
import { IoMdArrowBack } from "react-icons/io";
import ForgotComponent from "../../components/ForgotComponent";
import { toast } from 'react-toastify';
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";




const LoginForm = () => {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showSigninForm, setShowSigninForm] = useState(false);
    const [showForgotForm, setShowForgotForm] = useState(false);

    const handleSigninForm = () => {
        setShowLoginForm(false);
        setShowForgotForm(false);
        setShowSigninForm(true);
    }

    const handleBackLoginForm = () => {
        setShowLoginForm(true);
        setShowForgotForm(false);
        setShowSigninForm(false);
    }

    const handleForgotForm = () => {
        setShowLoginForm(false);
        setShowForgotForm(true);
        setShowSigninForm(false);
    }


    const [username, setusername] = useState('');
    const [usernameClickedOutside, setusernameClickedOutside] = useState(false);
    const [usernameFocused, setusernameFocused] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordClickedOutside, setPasswordClickedOutside] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);

    const handleusernameFocus = () => {
        setusernameFocused(true);
    }

    const handleusernameBlur = () => {
        setusernameFocused(false);
    }

    const handlePasswordFocus = () => {
        setPasswordFocused(true);
    }

    const handlePasswordBlur = () => {
        setPasswordFocused(false);
    }
    const handleusernameClickOutside = () => {
        if (!username)
            setusernameClickedOutside(true);

    }
    const handlePasswordClickOutside = () => {
        if (!password)
            setPasswordClickedOutside(true);
    }


    const handleSigninSuccess = () => {
        setShowLoginForm(true);
        setShowForgotForm(false);
        setShowSigninForm(false);
    }

    const [checkPass, setCheckPass] = useState(false);
    const handlePassEye = () => {
        setCheckPass(!checkPass)
    }
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validate()) {
            try {
                // const response = await fetch("http://172.16.10.14:3000/api/v1/auth/login", {
                const response = await fetch("http://localhost:3001/login", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: username, password: password })
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'tài khoản mật khẩu không chính xác');
                }
                else {
                    toast.success("Success")
                    const userDataResponse = await response.json();
                    const userDataToSave = { username: userDataResponse.user.username, password: userDataResponse.user.password, email: userDataResponse.user.email, name: userDataResponse.user.name }; // Lấy chỉ các thuộc tính username và password để lưu vào localStorage
                    localStorage.setItem("user", JSON.stringify(userDataToSave));
                    navigate('/home')
                }
            } catch (error) {
                console.error(error.message);
                toast.error(error.message);
            }
        }
    };
    const validate = () => {
        let result = true;
        if ((username === '' || username === null) && (password === '' || password === null)) {
            result = false;
            toast.warning('Nhập tài khoản và mật khẩu!');
        } else {
            if (username === '' || username === null) {
                result = false;
                toast.warning('Nhập tài khoản!')
            }
            if (password === '' || password === null) {
                result = false;
                toast.warning('Nhập mật khẩu!')
            }
        }
        return result;
    }


    return (
        <>
            {!showForgotForm && !showSigninForm && (
                <>
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="login-form-text">
                            <div className="login-text">
                                Đăng nhập
                            </div>
                            <p className="login-description">
                                Hoàn thành các thông tin chi tiết dưới đây
                            </p>
                        </div>
                        <div className="gr-form-item">
                            <div className="title-login">
                                Email hoặc tên tài khoản
                            </div>
                            <div className={`form-item-input ${usernameClickedOutside && !username ? 'focused-error' : ''}`}>
                                <input
                                    id="email"
                                    type="text"
                                    placeholder="Email"
                                    onFocus={handleusernameFocus}
                                    onBlur={() => { handleusernameBlur(); handleusernameClickOutside(); }}
                                    value={username}
                                    onChange={e => setusername(e.target.value)}
                                />
                            </div>
                            <div className={`form-item-input-error ${usernameClickedOutside && !username ? 'show' : ''}`}>
                                Email không được để trống
                            </div>
                        </div>
                        <div className="gr-form-item">
                            <div className="title-login">
                                Mật khẩu
                            </div>
                            <div className={`form-item-input pass-eye ${passwordClickedOutside && !password ? 'focused-erro' : ''}`}>
                                <input
                                    id="password"
                                    type={`${!checkPass ? 'password' : 'text'}`}
                                    placeholder="Mật khẩu"
                                    onFocus={handlePasswordFocus}
                                    onBlur={() => { handlePasswordBlur(); handlePasswordClickOutside(); }}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                                <div onClick={handlePassEye}>{!checkPass ? <AiOutlineEyeInvisible id="eye" /> : <AiOutlineEye id="eye" />}</div>
                            </div>
                            <div className={`form-item-input-error ${passwordClickedOutside && !password ? 'show' : ''}`}>
                                Mật khẩu không được để trống
                            </div>
                        </div>
                        <div className="forgot-pass">
                            <button id="text-link" onClick={handleForgotForm}>Quên mật khẩu</button>
                        </div>
                        <div className="btn1">
                            <button id="btn-login" type="submit" >Đăng nhập</button>
                        </div>
                        <div className="btn2">
                            <button id="btn-gf" > <img src={google} id="img-gg" alt="" /> Đăng nhập vời Google</button>
                        </div>
                        <div className="btn2">

                            <button id="btn-gf1" > <img src={face} id="img-fb" alt="" />Đăng nhập vời Facebook</button>
                        </div>
                        <div className="signin-btn">
                            Bạn chưa có tài khoản?
                            <button id="text-signin" onClick={handleSigninForm}>Đăng ký ngay</button>
                        </div>
                    </form>

                </>

            )}
            {showSigninForm && (
                <>
                    <button id="backbtn" onClick={handleBackLoginForm}><IoMdArrowBack size={30} /></button>
                    <SigninComponent onSuccess={handleSigninSuccess} />
                </>
            )}
            {showForgotForm && (
                <>
                    <button id="backbtn" onClick={handleBackLoginForm}><IoMdArrowBack size={30} /></button>
                    <ForgotComponent />
                </>
            )}
        </>
    )

}

export default LoginForm;