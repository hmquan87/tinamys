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
import { toast } from "react-toastify";

const TermsOfUse = () => {
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
                    <div className="title-term">
                        <h3>Chính sách về quyền riêng tư</h3>
                    </div>
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

export default TermsOfUse;