import React from "react";
import '../../style/css/componentContact.css';
import phone from '../../style/img/phosphor-icons-user-switch.svg'
import tele from '../../style/img/phosphor-icons-telegram-logo.svg'
import briefcase from '../../style/img/phosphor-icons-briefcase.svg'
const Contact = () => {
    return (
        <div className="contact-component-full">
            <div className="title-contact-component">
                <div className="text-title-contact">
                    Liên hệ trợ giúp
                </div>
            </div>
            <div className="contact-components">
                <div className="phone-contact style">
                    <img src={phone} alt="" /> <p>Số điện thoại hỗ trợ</p>
                </div>
                <div className="phone-contact style">
                    <img src={tele} alt="" /> <p>Email</p>
                </div>
                <div className="phone-contact style">
                    <img src={briefcase} alt="" /> <p>Địa chỉ hỗ trợ</p>
                </div>
            </div>

        </div>
    )
}

export default Contact;