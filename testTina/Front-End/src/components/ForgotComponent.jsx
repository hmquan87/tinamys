import React, { useState } from "react";
import "../pages/style/css/login.css";
import ReCAPTCHA from "react-google-recaptcha";



const ForgotComponent = () => {
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

    const [capVal, setCapVal] = useState(null)


    
    return (

        <>
            <form action="" className="login-form">
                <div className="login-form-text">
                    <div className="login-text">
                        Quên mật khẩu
                    </div>
                    <p className="login-description" style={{ width: "406px" }}>
                        Nhập địa chỉ email bạn đã sử dụng khi tham gia và chúng tôi sẽ gửi cho bạn hướng dẫn đặt lại mật khẩu.
                    </p>
                </div>
                <div className="gr-form-item">
                    <div className="title-login" style={{ display: "flex", alignItems: "center", height: "24px" }}>
                        Email <p style={{ color: "red", margin: "0" }}>*</p>
                    </div>
                    <div className={`form-item-input ${!email && emailClickOutside ? 'focused-error' : ''}`}>
                        <input
                            id="email"
                            type="text"
                            placeholder="Email"
                            onFocus={handleEmailFocus}
                            onBlur={() => { hadnleEmailBlur(); handleEmailClickOutside(); }}
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </div>
                    <div className={`form-item-input-error ${!email && emailClickOutside ? 'show' : ''}`}>
                        Email không được để trống
                    </div>
                </div>
                <div className="recapt">
                    <ReCAPTCHA
                        sitekey="6Le9pYUpAAAAAMvcugPnE59Kxj5wnzZf3mNw4bfH"
                        onChange={(val) => setCapVal(val)}
                    />
                </div>
                <div className="btn1" style={{ marginTop: "-2px" }}>
                    <button id="btn-login" type="submit">Tiếp theo</button>
                </div>

            </form>
        </>
    )
}

export default ForgotComponent;