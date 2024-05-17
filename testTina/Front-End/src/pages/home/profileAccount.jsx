import React, { useEffect, useRef, useState } from "react";
import Header from "./cpnent/heade";
import '../style/css/home.css'
import '../style/css/profileAccount.css'
import Event from "./cpnent/event";
import icon8 from '../style/img/home-icon-8.svg';
import addmini from '../style/img/add-mini.svg';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import btnBar from "../style/img/btn-bar.svg";
import Notifi from "./component-body-right/notifi";
import Contact from "./component-body-right/contact";
import Profile from "./component-body-right/profilr";
import AddTask from "./component-body-right/addTask";
import { Button, Input, Modal, Select } from 'antd';
import avt from '../style/img/avtDefault.png'
import { notification } from 'antd';
import axios from 'axios';


const ProfileAccount = () => {
    const [isButtonClicked, setIsButtonClicked] = useState(true);
    const [check, setCheck] = useState(false)
    const handleClick1 = () => {
        setCheck(!check)
        setIsButtonClicked(!isButtonClicked);
    }
    const [click, setClick] = useState();
    const handleClick = (path) => {
        setClick(path);
        setDirect('none');
    }
    const [direct, setDirect] = useState();
    const handleDirect = (path) => {
        setDirect(path);
        setClick('none');
    }
    const tooltip = {
        'add-task': 'Tạo không gian làm việc'
    }
    const bodyRef = useRef(null);

    const [checkClickNoti, setCheckClickNoti] = useState(false);
    const handleCheckClick = (path) => {
        setCheckClickNoti(path);
    }

    const [checkClickContact, setCheckClickContact] = useState(false);
    const handleCheckClickContact = (path) => {
        setCheckClickContact(path);
    }
    const [profile, setProfile] = useState(false);
    const handleClickProfile = (path) => {
        setProfile(path);
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = (path) => {
        setIsModalOpen(path);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [numberPhone, setNumber] = useState('');

    const userData = JSON.parse(localStorage.getItem("user"));
    const { name, email, username } = userData;

    const handleEdit = async (id, phone) => {
        try {

            const res = await axios.post(`http://localhost:3001/editProfileAccount?id=${id}&phone=${phone}`);

            if (res.data) {
                const newGroupData = res.data.personnel;
                localStorage.setItem('personnel', JSON.stringify(newGroupData));

            } else {
                console.error(res.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const ProceedLogin = async (e) => {
        e.preventDefault();
        try {
            const register = { username, numberPhone };
            const res = await fetch("http://localhost:3001/addProfile", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(register)
            })
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Lưu không thành công');
            }
            else {
                handleEdit(1, numberPhone);
                notification.success({
                    message: 'Lưu thông tin thành công!',
                })
            }
        } catch (err) {
            console.error(err.message);
            notification.error({
                message: err.message,
            });
        }
    }





    return (
        <div className="home">
            <div className="header-form">
                <Header
                    handleDirect={handleDirect}
                    handleCheckClick={handleCheckClick}
                    handleCheckClickContact={handleCheckClickContact}
                    bodyRef={bodyRef}
                    setIsModalOpen={setIsModalOpen}
                    setCheckClickContact={setCheckClickContact}
                    setCheckClickNoti={setCheckClickNoti}
                    handleClickProfile={handleClickProfile}
                    setProfile={setProfile}
                />

            </div>
            <div className="body-home">
                <div className={`body-home-left ${check ? '' : 'summary'}`}>
                    <div className="btn-body-home-left">
                        <button onClick={handleClick1}>
                            <img src={btnBar} className={`btn-scale ${check ? 'default' : 'rotate'}`} alt="" />
                        </button>
                    </div>
                    <div className="evevt-body-home-leftt">
                        <Event handleClick={handleClick} isButtonClicked={isButtonClicked} />
                    </div>
                    <div className="add-daily-task">
                        {check ?
                            <div className="border-add-task">
                                <div className="add-task">
                                    <div className="img-add-task">
                                        <img src={icon8} alt="" />
                                    </div>
                                    <div className="daily-task">
                                        Bạn không có không gian làm việc
                                    </div>
                                    <div className="btn-add-task">

                                        <Button
                                            type="primary"
                                            className="btn-add"
                                            variant="primary"
                                            onClick={showModal}
                                        >
                                            Tạo ngay nào
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            :
                            <OverlayTrigger
                                placement="right"
                                overlay={
                                    <Tooltip id="tooltip">
                                        {tooltip['add-task']}
                                    </Tooltip>
                                }
                            >
                                <div className="btn-add-mini">
                                    <div className="img-btn-add-mini" >
                                        <img src={addmini} onClick={showModal} alt="" />
                                    </div>
                                </div>
                            </OverlayTrigger>
                        }
                    </div>
                </div>
                <div className="body-home-right-form">
                    <form >
                        <div className="profile-account-full">
                            <div className="form-profile-account">
                                <div className="title-profile-account">
                                    <h4>Thông tin tài khoản</h4>
                                </div>
                                <div className="form-account">
                                    <div className="bg-gradient-form">
                                        <img id="img-account" src={avt} alt="" />
                                    </div>
                                    <div className="form-profile">
                                        <div className="ant-input-profile">
                                            <label>Họ và tên<b>*</b></label>
                                            <Input placeholder='Họ và tên' className="ant-input-form" value={name} />
                                        </div>
                                        <div className="ant-input-profile">
                                            <label>Tên tài khoản</label>
                                            <Input placeholder="tai khoan" className="ant-input-form" disabled value={username} />
                                        </div>
                                        <div className="ant-input-profile">
                                            <label>Email</label>
                                            <Input placeholder='email' className="ant-input-form" disabled value={email} />
                                        </div>
                                        <div className="ant-input-profile">
                                            <label>Số điện thoại</label>

                                            <Input placeholder="Số điện thoại" className="ant-input-form" value={numberPhone} onChange={e => setNumber(e.target.value)} />
                                        </div>
                                        <div className="ant-input-profile">
                                            <label>Nhóm</label>
                                            <Select
                                                mode="multiple"
                                                defaultValue={['Chưa có nhóm']}
                                                disabled
                                            />

                                        </div>
                                        <div className="ant-input-profile">
                                            <label>Chức vụ</label>
                                            <Select
                                                mode="multiple"
                                                defaultValue={['Chưa có chức vụ']}
                                                disabled
                                            />
                                        </div>
                                        <div className="ant-btn-save">
                                            <Button
                                                type="primary"
                                                onClick={ProceedLogin}
                                            >
                                                Lưu thông tin
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div ref={bodyRef} className="tab" >
                    <div className={`notifi-component ${checkClickNoti ? 'show-notifi-component' : ''}`} >
                        <Notifi />
                    </div>
                    <div className={`contact-component ${checkClickContact ? 'show-contact-component' : ''}`}>
                        <Contact />
                    </div>
                    <div className={`profile-component ${profile ? 'show-profile' : ''}`}>
                        <Profile />
                    </div>

                </div>
            </div>
            <div className={`addtaskcomponent`}>
                <Modal open={isModalOpen} onCancel={handleCancel}>
                    < AddTask />
                </Modal>
            </div>



        </div>
    )
}

export default ProfileAccount;