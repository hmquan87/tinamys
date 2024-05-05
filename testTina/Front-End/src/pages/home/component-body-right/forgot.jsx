import React, { useState } from "react";
import '../../style/css/forgot.css'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input } from "antd";
import { notification } from 'antd';
import axios from 'axios';


const Forgot = ({ handleCancelForgot }) => {

    const [newPass, setNewPass] = useState('');
    const [newPassFocus, setNerPassFocus] = useState(false);
    const [newPassOutsite, setNewPassOutsite] = useState(false);
    const handleFocusNewPass = () => {
        setNerPassFocus(true);
    }
    const handleBlurNewPass = () => {
        setNerPassFocus(false);
    }
    const handleOutsiteNewPass = () => {
        if (!newPass) setNewPassOutsite(true);
    }

    const [againPass, setAgainPass] = useState('')
    const [againPassFocus, setAgainPassFocus] = useState(false)
    const [againPassOutsite, setAgainPassOutsite] = useState(false)
    const handleFocusAgainPass = () => {
        setAgainPassFocus(true)
    }
    const handleBlurAgainPass = () => {
        setAgainPassFocus(false)
    }
    const handleOutsiteAgainPass = () => {
        if (!againPass) setAgainPassOutsite(true)
    }
    const ProcessForgot = async (e) => {
        e.preventDefault();

        try {
            const userData = JSON.parse(localStorage.getItem('user'));
            const { username } = userData;
            const forget = { username, newPass, againPass };

            const response = await axios.post('http://localhost:3001/forgot', forget, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.status !== 200) {
                throw new Error(response.data.error || 'mật khẩu không khớp');
            } else {
                notification.success({
                    message: 'Đổi mật khẩu thành công!',
                });
            }
        } catch (err) {
            console.error(err.message);
            notification.error({
                message: err.message,
            });
        }
    };

    return (
        <div className="forgot-ant">
            <div className="form-forgot">
                <div className="title-forgot">
                    <div className="title-css">
                        <div className="text-title-forgot">
                            Đổi mật khẩu
                        </div>
                        <div className="icon-cancel" onClick={handleCancelForgot}>
                            <svg fillRule="evenodd" viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path></svg>
                        </div>
                    </div>
                </div>
                <div className="body-forgot">
                    <div className="forgot-input">
                        <label>Mật khẩu mới<b id="star">*</b></label>
                        <Input.Password
                            className={`input-forgot`}
                            placeholder="Mật khẩu mới"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            value={newPass}
                            onFocus={handleFocusNewPass}
                            onBlur={() => { handleBlurNewPass(); handleOutsiteNewPass() }}
                            onChange={e => setNewPass(e.target.value)}
                        />
                        <div className={`err-input1 ${!newPass && newPassOutsite ? 'show' : ''}`}>
                            Mật khẩu không được để trống
                        </div>
                    </div>
                    <div className="forgot-input">
                        <label>Mật khẩu nhập lại<b id="star">*</b></label>
                        <Input.Password
                            className={`input-forgot`}
                            placeholder="Mật khẩu mới"
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            value={againPass}
                            onFocus={handleFocusAgainPass}
                            onBlur={() => { handleBlurAgainPass(); handleOutsiteAgainPass() }}
                            onChange={e => setAgainPass(e.target.value)}
                        />
                        <div className={`err-input2 ${!againPass && againPassOutsite ? 'show' : ''}`}>
                            Mật khẩu nhập lại không được để trống
                        </div>
                    </div>
                    <Button className="btn-forgot" type="primary" onClick={ProcessForgot}>
                        Đổi mật khẩu
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Forgot;