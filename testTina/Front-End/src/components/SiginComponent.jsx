import React, { useState } from "react";
import "../pages/style/css/login.css";
import { toast } from "react-toastify";
import { Input } from "antd";


const SigninComponent = ({ onSuccess }) => {
    // name
    const [name, setname] = useState('');
    const [nameFocus, setnameFocus] = useState(false);
    const [nameClickOutside, setnameClickOutside] = useState(false);
    const hanldeUserFocus = () => {
        setnameFocus(true);
    }
    const handleUserBlur = () => {
        setnameFocus(false);
    }
    const handleUserClickOutside = () => {
        if (!name)
            setnameClickOutside(true);
    }

    // email
    const [email, setEmail] = useState('');
    const [emailFocus, setEmailFocus] = useState(false);
    const [emailClickOutside, setEmailClickOutside] = useState(false);
    const handleEmailFocus = () => {
        setEmailFocus(true);
    }

    const hadnleEmailBlur = () => {
        setEmailFocus(false);
    }

    const handleEmailClickOutside = () => {
        if (!email)
            setEmailClickOutside(true)
    }

    const [username, setUsername] = useState('')

    // passwordword
    const [password, setpassword] = useState('');
    const [passwordFocus, setpasswordFocus] = useState(false)
    const [passwordClickOutside, setpasswordClickOutside] = useState(false)
    const handlepasswordFocus = () => {
        setpasswordFocus(true)
    }
    const handlepasswordBlur = () => {
        setpasswordFocus(false)
    }
    const handlepasswordClickOutside = () => {
        if (!password)
            setpasswordClickOutside(true)
    }
    // password-again
    const [again, setAgain] = useState('')
    const [againFocus, setAgainFocus] = useState(false)
    const [againClickOutside, setAgainClickOutside] = useState(false)
    const handleAgainFocus = () => {
        setAgainFocus(true)
    }
    const handleAgainBlue = () => {
        setAgainFocus(false)
    }
    const handleAgainClickOutside = () => {
        if (!again)
            setAgainClickOutside(true)
    }
    const ProceedLogin = (e) => {
        e.preventDefault();
        const register = { name, username, email, password, again };
        console.log(register);
        fetch("http://localhost:3001/register", {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(register)
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to add user');
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                toast.success("Đăng ký thành công!");
                onSuccess();
            })
            .catch((err) => {
                console.error(err);
                toast.error('Đăng ký thất bại: ' + err.message);
            });
    }



    return (
        <>
            <form
                onSubmit={ProceedLogin}
                className="login-form">
                <div className="login-form-text">
                    <div className="login-text">
                        ĐĂNG KÝ
                    </div>
                </div>
                <div className="gr-form-item">
                    <div className="title-login" style={{ display: "flex", alignItems: "center", height: "24px" }}>
                        Họ và tên <p style={{ color: "red", margin: "0" }}>*</p>
                    </div>
                    <div className={`form-item-input ${!name && nameClickOutside ? 'focused-error' : ''}`}>
                        <Input
                            className="ant-input-sigin"
                            type="text"
                            placeholder="Họ và tên"
                            onFocus={hanldeUserFocus}
                            onBlur={() => { handleUserBlur(); handleUserClickOutside(); }}
                            value={name}
                            onChange={e => setname(e.target.value)}
                        />
                    </div>
                    <div className={`form-item-input-error ${nameClickOutside && !name ? 'show' : ''}`}>
                        Họ và tên không được để trống
                    </div>

                </div>

                <div className="gr-form-item">
                    <div className="title-login" style={{ display: "flex", alignItems: "center", height: "24px" }}>
                        Tên tài khoản
                    </div>
                    <div className="form-item">
                        <div className="form-item-input">
                            <Input
                                className="ant-input-sigin"
                                type="text"
                                placeholder="Tên tài khoản"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="gr-form-item" >
                    <div className="title-login" style={{ display: "flex", alignItems: "center", height: "24px" }}>
                        Email <p style={{ color: "red", margin: "0" }}>*</p>
                    </div>
                    {/* <div className="form-item"> */}
                    <div className={`form-item-input ${!email && emailClickOutside ? 'focused-error' : ''}`}>
                        <Input
                            className="ant-input-sigin"
                            type="text"
                            placeholder="Email"
                            onFocus={handleEmailFocus}
                            onBlur={() => { hadnleEmailBlur(); handleEmailClickOutside(); }}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={`form-item-input-error ${!email && emailClickOutside ? 'show' : ''}`}>
                        Email không được để trống
                    </div>
                    {/* </div> */}
                </div>

                <div className="gr-form-item">
                    <div className="title-login" style={{ display: "flex", alignItems: "center", height: "24px" }}>
                        Mật khẩu <p style={{ color: "red", margin: "0" }}>*</p>
                    </div>
                    {/* <div className="form-item"> */}
                    <div className={`form-item-input ${!password && passwordClickOutside ? 'focused-error' : ''}`}>
                        <Input
                            className="ant-input-sigin"
                            type="passwordword"
                            placeholder="Mật khẩu"
                            onFocus={handlepasswordFocus}
                            onBlur={() => { handlepasswordBlur(); handlepasswordClickOutside(); }}
                            value={password}
                            onChange={e => setpassword(e.target.value)}
                        />
                    </div>
                    <div className={`form-item-input-error ${!password && passwordClickOutside ? 'show' : ''}`}>
                        Mật khẩu không được để trống
                    </div>
                    {/* </div> */}
                </div>

                <div className="gr-form-item">
                    <div className="title-login" style={{ display: "flex", alignItems: "center", height: "24px" }}>
                        Nhập lại mật khẩu <p style={{ color: "red", margin: "0" }}>*</p>
                    </div>
                    {/* <div className="form-item"> */}
                    <div className={`form-item-input ${!again && againClickOutside ? 'focused-error' : ''}`}>
                        <Input
                            className="ant-input-sigin"
                            type="passwordword"
                            placeholder="Nhập lại mật khẩu "
                            onFocus={handleAgainFocus}
                            onBlur={() => { handleAgainBlue(); handleAgainClickOutside(); }}
                            value={again}
                            onChange={e => setAgain(e.target.value)}
                        />
                    </div>
                    <div className={`form-item-input-error ${!again && againClickOutside ? 'show' : ''}`}>
                        Mật khẩu nhập lại không được để trống
                    </div>
                    {/* </div> */}
                </div>

                <div className="btn1" style={{ marginTop: "20px" }}>
                    <button id="btn-login" type="submit">Đăng ký</button>
                </div>

                <div className="signin-btn">
                    Bạn đã có tài khoản?
                    <button id="text-signin">Đăng nhập ngay</button>
                </div>
            </form>
        </>
    )
}

export default SigninComponent;