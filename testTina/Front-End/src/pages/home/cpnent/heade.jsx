import React, { useState, useEffect } from "react";
import logo from '../../style/img/logo.svg'
import avt from '../../style/img/avtDefault.png'
import { IoIosSearch } from "react-icons/io";
import icon1 from '../../style/img/home-icon-1.svg'
import icon2 from '../../style/img/home-icon-2.svg'
import icon3 from '../../style/img/home-icon-3.svg'
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const Headers = ({
    handleDirect,
    handleCheckClick,
    handleCheckClickContact,
    bodyRef,
    setCheckClickContact,
    setCheckClickNoti,
    handleClickProfile,
    setProfile,
    setIsModalOpen,
}) => {

    const nav = useNavigate();
    const handleClickLogo = () => {
        nav('/home');
        setIsModalOpen(false)
    }


    const [searchClick, setSearchClick] = useState(false);
    const [text, setText] = useState()
    const handleClickSearch = () => {
        setSearchClick(!searchClick);
        setText('')
    };
    const [test, setTest] = useState(true);
    const [test1, setTest1] = useState(true);
    const [test2, setTest2] = useState(true);


    const handleTest = () => {
        console.log('test: ', test);
        handleCheckClick(test);
        setTest(!test);
    };

    const handleTest1 = () => {
        console.log('test1: ', test1);
        handleCheckClickContact(test1);
        setTest1(!test1);
    };

    const handleTest2 = () => {
        console.log('test2: ', test2);
        handleClickProfile(test2);
        setTest2(!test2);
    };


    useEffect(() => {


        const handleClickOutside = (event) => {
            if ((bodyRef.current && !bodyRef.current.contains(event.target))
                && (!event.target.classList.contains("input-search")
                    || !event.target.classList.contains("noti")
                    || !event.target.classList.contains("contact")
                    || !event.target.classList.contains("profile")
                )
            ) {
                setSearchClick(false);
                handleCheckClick(false);
                handleCheckClickContact(false);
                handleClickProfile(false);

            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);



    const tooltip = {
        "direct": "Hướng dẫn"
    };



    return (
        <>
            <div className="logo-home" onClick={handleClickLogo} >
                <img src={logo} alt="" />
            </div>
            <div className="gr-btn-home">
                <div className={`icon-search ${searchClick ? 'showbd' : ''}`}>
                    <div ref={bodyRef} className="btn-gr-search">
                        <div className="icon-search-btn">
                            <IoIosSearch
                                size={22}
                                onClick={handleClickSearch}
                            />
                        </div>
                        <div className={`input-search ${searchClick ? 'show' : ''}`}>
                            <input
                                id={`${searchClick ? 'show-text' : 'none-text'}`}
                                onClick={() => setSearchClick(true)}
                                type="text"
                                placeholder={searchClick ? "Tìm kiếm" : ""}
                                value={text}
                                onChange={e => setText(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <OverlayTrigger
                    placement="bottom"
                    overlay={
                        <Tooltip>
                            {tooltip['direct']}
                        </Tooltip>
                    }
                >
                    <div className="home-icon" onClick={() => handleDirect('/direct-page')}>
                        <img src={icon1} alt="" />
                    </div>
                </OverlayTrigger>

                <div className="home-icon items-center">
                    <div className="noti ml10" onClick={() => { handleTest(); setTest(!test) }}>

                        <img src={icon2} alt="" />
                    </div>
                    <div className="contact ml10" onClick={() => { handleTest1(); setTest1(!test1) }}>
                        <img src={icon3} alt="" />
                    </div>
                    <div className="profile ml10" onClick={() => { handleTest2(); setTest2(!test2) }}>
                        <img src={avt} alt="" className="h-10" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Headers;
