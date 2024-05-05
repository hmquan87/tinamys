import React, { useState } from "react";
import "../pages/style/css/contact.css";
import contact from '../pages/style/img/contact.png';
import { toast } from "react-toastify";
import { Button, Input } from "antd";
import TextArea from "antd/es/input/TextArea";

const ContactCoponent = () => {

    const [name, setName] = useState('');
    const [nameFocus, setNameFocus] = useState(false);
    const [nameClickOutside, setNameClickOutside] = useState(false)

    const handleNameFocus = () => {
        setNameFocus(true)
    }
    const handleNameBlur = () => {
        setNameFocus(false)
    }
    const handleNameClickOutside = () => {
        if (!name) setNameClickOutside(true)
    }

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

    const [phone, setPhone] = useState('');
    const [phonelFocus, setPhoneFocus] = useState(false);
    const [phoneClickOutside, setPhoneClickOutside] = useState(false);
    const handlePhoneFocus = () => {
        setPhoneFocus(true);
    }

    const hadnlePhoneBlur = () => {
        setPhoneFocus(false);
    }

    const handlePhoneClickOutside = () => {
        if (!phone)
            setPhoneClickOutside(true)
    }

    const [mess, setMess] = useState('')
    const [messFocus, setMessFocus] = useState(false)
    const [messClickOutside, setMessClickOutside] = useState(false)

    const handleMessFocus = () => {
        setMessFocus(true)
    }
    const handleMessBlur = () => {
        setMessFocus(false)
    }
    const handleMessClickOutside = () => {
        if (!mess) setMessClickOutside(true)
    }
    const handleSubmitContact = async (e) => {
        e.preventDefault();
        const contact = { name: name, email: email, phone: phone, mess: mess };
        console.log(contact);

        try {
            const res = await fetch("http://localhost:3001/contact", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(contact)
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Thông tin không hợp lệ');
            }
            else {
                console.log("Success");
                toast.success("Success")
            }
        } catch (error) {
            console.error(error.message);
            toast.error(error.message);
        }

    }



    return (
        <div className="con-full">
            <div className="ct-full">
                <div className="img-ct-full">
                    <img src={contact} alt="" />
                </div>
                <div className="contact-form">
                    <h1>Liên hệ với chúng tôi</h1>
                    <div className="ant-input-cont">
                        <div className="row">
                            <div className="col-4">
                                <div className="">
                                    <div className={`form-item-input1w ${nameClickOutside && !name ? 'focused-error' : ''}`}>
                                        <Input
                                            className="ant-input-cont-1 st"
                                            placeholder="Họ và tên*"
                                            onFocus={handleNameFocus}
                                            onBlur={() => { handleNameBlur(); handleNameClickOutside(); }}
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className={`form-item-input-error ${nameClickOutside && !name ? 'show' : ''}`}>
                                        Họ tên không dược để trống
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div>
                                    <div className={`form-item-input1w  ${phoneClickOutside && !phone ? 'focused-error' : ''}`}>
                                        <Input
                                            className="ant-input-cont-1 st"
                                            placeholder="Số điện thoại*"
                                            onFocus={handlePhoneFocus}
                                            onBlur={() => { hadnlePhoneBlur(); handlePhoneClickOutside(); }}
                                            value={phone}
                                            onChange={e => setPhone(e.target.value)}
                                        />
                                    </div>
                                    <div className={`form-item-input-error ${phoneClickOutside && !phone ? 'show' : ''}`}>
                                        Số điện thoại không hợp lệ
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className={`form-item-input1b cur ${emailClickOutside && !email ? 'focused-error' : ''}`}>
                                <Input
                                    className="ant-input-cont st"
                                    placeholder="Email*"
                                    onFocus={handleEmailFocus}
                                    onBlur={() => { handleNameBlur(); handleEmailClickOutside() }}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className={`form-item-input-error ${emailClickOutside && !email ? 'show' : ''}`}>
                                Email không được để trống
                            </div>
                        </div>
                        <div>
                            <div className={`form-item-input1b cur ${!mess && messClickOutside ? 'focused-error' : ''}`}>
                                <TextArea
                                    className="ant-textarea-cont st"
                                    placeholder="Lời nhắn*"
                                    onFocus={handleMessFocus}
                                    onBlur={() => { handleMessBlur(); handleMessClickOutside(); }}
                                    value={mess}
                                    onChange={e => setMess(e.target.value)}
                                />
                            </div>
                            <div className={`form-item-input-error ${!mess && messClickOutside ? 'show' : ''}`}>
                                Lời nhắn không được để trống
                            </div>
                        </div>
                        <div>
                            <Button
                                type="primary"
                                className="btn-ant-cont"
                                onClick={e => handleSubmitContact(e)}
                            >Gửi tin nhắn</Button>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )

};



export default ContactCoponent;