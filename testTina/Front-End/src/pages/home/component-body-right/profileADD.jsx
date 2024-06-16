import React, { useState, useEffect } from "react";
import '../../style/css/profile.css'
import avt from '../../style/img/avtDefault.png'
import { useNavigate } from "react-router-dom";
import { Modal } from 'antd'
import Review from "./review";
import Forgot from "./forgot";
import { notification, Avatar } from 'antd';
import axios from "axios";

const ProfileAdd = ({ setCheckPath }) => {
    const nav = useNavigate();
    const handleclickProfile = () => {
        setCheckPath('n6');
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

    const [company, setCompany] = useState('')
    const [companeName, setCompaneName] = useState('');

    const fetchData = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/getDataCompany?id=${1}`);
            const namecom = res.data.companySpace;
            setCompaneName(namecom.nameWorkSpace)
            setCompany(namecom)
        } catch (error) {

        }
    }
    useEffect(() => {
        fetchData();

    }, [])

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3001/logoutCompany');
            notification.success({
                message: 'Rời công ty thành công!',
            })
            localStorage.removeItem('personData');
            localStorage.removeItem('group1')
            nav('/home')
        } catch (error) {

        }
    }

    const handleLogout1 = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3001/logoutCompany", {
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
                localStorage.removeItem('personData');
                localStorage.removeItem('group1')
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
                        <Avatar style={{ background: '#9333EA' }} size={50}>
                            {companeName.slice(0, 2)}
                        </Avatar>
                    </div>
                    <div className="text-profile text-[16px] ml-2">
                        <p >{company.nameWorkSpace}</p>
                        <p className="text-gray-600">{company.email}</p>
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
                        <p>Rời khỏi công ty</p>
                    </div>
                    <div className="btnpf logout" onClick={handleLogout1}>
                        <p>Đăng xuất</p>
                    </div>
                </div>
            </div>
            <div className="">
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
export default ProfileAdd;