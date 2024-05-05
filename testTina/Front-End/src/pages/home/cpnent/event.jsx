
import React, { useState, useEffect } from "react";
import icon4 from '../../style/img/home-icon-4.svg'
import icon5 from '../../style/img/home-icon-5.svg'
import icon6 from '../../style/img/home-icon-6.svg'
import icon7 from '../../style/img/home-icon-7.svg'
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';


function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('Navigation One', 'sub1', <MailOutlined />, [
        getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')]),
        getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')]),
    ])
];
const { SubMenu } = Menu;
const Event = ({ handleClick, isButtonClicked }) => {



    const [click, setClick] = useState(null);

    const Check = (path) => {
        setClick(path);
    }


    const tooltips = {
        'page': 'Trang chủ',
        'company-goal': 'Mục tiêu công ty',
        'my-goal': 'Mục tiêu cá nhân',
        'daily-task': 'Lịch làm việc',
    };

    // const onClick = ({ key }) => {
    //     // key là giá trị của option được click
    //     handleClick(`/${key}`); // Chuyển đến trang tương ứng
    //     Check(`${key}`); // Đánh dấu option được click
    //     console.log('key', click);
    // };
    return (
        <>
            {/* <Menu
                onClick={onClick}
                style={{
                    width: 256,
                }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
            /> */}
            {/* <Menu
                onClick={onClick}
                style={{ width: 256 }}
                defaultSelectedKeys={['page']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
            /> */}
            {/* <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
                    <Menu.Item key="about">Option 1</Menu.Item>
                    <Menu.Item key="2">Option 2</Menu.Item>
                    <Menu.Item key="3">Option 3</Menu.Item>
                    <Menu.Item key="4">Option 4</Menu.Item>
                </SubMenu> */}
            {/* </Menu> */}
            <div className={`home-page ${(click === 'page' || click === null) ? 'bd' : 'hover'}`} onClick={() => { handleClick('/page'); Check('page') }}>
                {isButtonClicked ?
                    <OverlayTrigger
                        placement="right"
                        overlay={
                            <Tooltip className="custom-tooltip-overlay">
                                {tooltips['page']}
                            </Tooltip>
                        }
                    >
                        <div className="icon-home-page">
                            <img src={icon4} alt="" />
                        </div>
                    </OverlayTrigger>
                    :
                    <div className="icon-home-page">
                        <img src={icon4} alt="" />
                    </div>
                }

                <div className={`text-home-page ${!isButtonClicked ? 'show-text' : ''}`}>
                    Trang chủ
                </div>
            </div>

            <div className={`home-page ${click === 'company-goal' ? 'bd' : 'hover'}`} onClick={() => { handleClick('/company-goal'); Check('company-goal') }}>

                {isButtonClicked ?
                    <OverlayTrigger
                        placement="right"
                        overlay={<Tooltip>{tooltips['company-goal']}</Tooltip>}
                    >
                        <div className="icon-home-page">
                            <img src={icon5} alt="" />
                        </div>
                    </OverlayTrigger>
                    :
                    <div className="icon-home-page">
                        <img src={icon5} alt="" />
                    </div>
                }
                <div className={`text-home-page ${!isButtonClicked ? 'show-text' : ''}`}>
                    Mục tiêu công ty
                </div>
            </div>
            <div className={`home-page ${click === 'my-goal' ? 'bd' : 'hover'}`} onClick={() => { handleClick('/my-goal'); Check('my-goal') }}>

                {isButtonClicked ?
                    <OverlayTrigger
                        placement="right"
                        overlay={<Tooltip>{tooltips['my-goal']}</Tooltip>}
                    >
                        <div className="icon-home-page">
                            <img src={icon6} alt="" />
                        </div>
                    </OverlayTrigger>
                    :
                    <div className="icon-home-page">
                        <img src={icon6} alt="" />
                    </div>
                }
                <div className={`text-home-page ${!isButtonClicked ? 'show-text' : ''}`}>
                    Mục tiêu cá nhân
                </div>
            </div>
            <div className={`home-page ${click === 'daily-task' ? 'bd' : 'hover'}`} onClick={() => { handleClick('/daily-task'); Check('daily-task') }}>

                {isButtonClicked ?
                    <OverlayTrigger
                        placement="right"
                        overlay={<Tooltip>{tooltips['daily-task']}</Tooltip>}
                    >
                        <div className="icon-home-page">
                            <img src={icon7} alt="" />
                        </div>
                    </OverlayTrigger>
                    :
                    <div className="icon-home-page">
                        <img src={icon7} alt="" />
                    </div>
                }
                <div className={`text-home-page ${!isButtonClicked ? 'show-text' : ''}`}>
                    Lịch làm việc
                </div>
            </div>

        </>
    )
}

export default Event;
