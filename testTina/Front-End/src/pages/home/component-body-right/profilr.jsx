import React, { useState } from "react";
import '../../style/css/profile.css'
import avt from '../../style/img/avtDefault.png'
import { useNavigate } from "react-router-dom";
import { Modal } from 'antd'
import Review from "./review";
import Forgot from "./forgot";
import { notification } from 'antd';
const Profile = () => {
    const nav = useNavigate();
    const handleclickProfile = () => {
        nav('/profile-account')
    }
    const handleClickTerm = () => {
        nav('/terms-of-use');

    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = (path) => {
        setIsModalOpen(path);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const [isModalOpenForgot, setIsModalOpenForgot] = useState(false);
    const showModalForgot = (path) => {
        setIsModalOpenForgot(path);
    };
    const handleCancelForgot = () => {
        setIsModalOpenForgot(false);
    };

    const userData = JSON.parse(localStorage.getItem("user"));

    const { name, email } = userData;

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3001/logout", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Đăng xuất thất bại');
            } else {
                notification.success({
                    message: 'Đăng xuất thành công!',
                })
                localStorage.removeItem('user')
                nav('/about')
            }

        } catch (err) {
            console.error(err.message);
            notification.error({
                message: err.message,
            });
        }
    }
    return (
        <>
            <div className="profile-component-full">
                <div className="title-profile-component">
                    <div className="img-profile">
                        <img src={avt} alt="" height={60} />
                    </div>
                    <div className="text-profile">
                        <p id="name">{name}</p>
                        <p id="email">{email}</p>
                    </div>
                </div>
                <div className="gr-btnpf">
                    <div className="btnpf" onClick={() => nav('/about')} >
                        <p>Giới thiệu</p>
                    </div>
                    <div className="btnpf" onClick={handleclickProfile}>
                        <p>Thông tin tài khoản</p>
                    </div>
                    <div className="btnpf" onClick={showModal}>
                        <p>Đánh giá</p>
                    </div>
                    <div className="btnpf" onClick={handleClickTerm}>
                        <p>Chính sách về quyền riêng tư</p>
                    </div>
                </div>
                <div className="gr-btnpf2">
                    <div className="btnpf">
                        <p>Language</p>
                    </div>
                    <div className="btnpf" onClick={showModalForgot}>
                        <p>Đổi mật khẩu</p>
                    </div>
                    <div className="btnpf logout" onClick={handleLogout}>
                        <p>Đăng xuất</p>
                    </div>
                </div>
            </div>
            <div className="danhgia">
                <Modal open={isModalOpen} onCancel={handleCancel}>
                    <Review handleCancel={handleCancel} />
                </Modal>
                <Modal open={isModalOpenForgot} onCancel={handleCancelForgot}>
                    <Forgot handleCancelForgot={handleCancelForgot} />
                </Modal>
            </div>
        </>
    )
}
export default Profile;