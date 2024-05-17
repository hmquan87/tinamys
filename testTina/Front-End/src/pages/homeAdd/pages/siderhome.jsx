import React, { useState } from "react";
import iconHome from '../../style/img/iconHome.svg';
import iconMuctieu from '../../style/img/iconMuctieu.svg';
import iconMuctieu1 from '../../style/img/iconMuctieu1.svg';
import iconLich from '../../style/img/iconLich.svg'
import i1 from '../../style/img/i1.svg';
import i2 from '../../style/img/i2.svg';
import i3 from '../../style/img/i3.svg';
import i4 from '../../style/img/i4.svg';
import i5 from '../../style/img/i5.svg';
import i6 from '../../style/img/i6.svg';
import { Menu } from 'antd'
import { RightOutlined, LeftOutlined } from '@ant-design/icons'

const { SubMenu } = Menu;

const menuItems = [
    { key: 'n1', icon: i1, text: 'Danh sách nhóm' },
    { key: 'n2', icon: i2, text: 'Danh sách chức vụ' },
    { key: 'n3', icon: i3, text: 'Danh sách nhân sự' },
    { key: 'n4', icon: i4, text: 'Tin tức' },
    { key: 'n5', icon: i5, text: 'Quản lý tin tức' },
    { key: 'n6', icon: i6, text: 'Chỉnh sử công ty' }
];
const menuItems1 = [
    { key: 'nav1', icon: iconHome, text: 'Trang chủ' },
    { key: 'nav2', icon: iconMuctieu, text: 'Muc tiêu cá nhân' },
    { key: 'nav3', icon: iconMuctieu1, text: 'Muc tiêu cá nhân' },
    { key: 'nav4', icon: iconLich, text: 'Lịch làm việc' },
];

const SiderHome = ({ setCheckPath }) => {
    const [check, setCheck] = useState('');
    const [isMenu, setIsMenu] = useState(false)
    const toggleMenu = () => {
        setIsMenu(!isMenu);
    }
    // console.log(isMenu);
    // console.log(check);
    return (
        <div className="">
            <button
                className=" absolute shadow-md right-[-8%] top-[14%] h-[40px] w-[40px] z-40 bg-white rounded-full"
                onClick={toggleMenu}
            >
                {!isMenu ? <LeftOutlined /> : <RightOutlined />}
            </button>

            <Menu
                mode="inline"
                style={{ flex: '1', height: '100%' }}
                inlineCollapsed={isMenu}
                defaultOpenKeys='sub1'
            >
                <SubMenu        
                    
                    key="sub1"
                    className="border-b border-zinc-300"
                    title={
                        <div className="">
                            {!isMenu ?
                                <div className='flex items-center pt-[40px] '>
                                    <div className='flex items-center justify-center text-[24px] h-[60px] w-[60px] mx-2 bg-purple-600 text-white '>
                                        QH
                                    </div>

                                    <div className='leading-[20px] text-black'>
                                        <div className='text-[18px] '>name</div>
                                        <div className='text-[14px]'>nhân sự</div>
                                    </div>

                                </div>
                                :
                                <div className='flex items-center justify-center text-[24px] h-[60px] w-[60px] mx-2 bg-purple-600 text-white '>
                                    QH
                                </div>
                            }
                        </div>
                    }
                >
                    {menuItems.map(item => (
                        <Menu.Item
                            key={item.key}
                            onClick={() => { setCheck(item.key); setCheckPath(`${item.key}`) }}
                            
                            className={check === item.key ? 'border-r-2 border-blue-600' : ''}
                        >
                            <div className={`flex gap-2 items-center `}>
                                <div className=' items-center'>
                                    <img src={item.icon} alt='' width={19} />
                                </div>
                                {isMenu ? null : (
                                    <div className='items-center'>
                                        {item.text}
                                    </div>
                                )}
                            </div>

                        </Menu.Item>
                    ))}
                </SubMenu>                
                {menuItems1.map(item => (
                    <Menu.Item
                        key={item.key}
                        onClick={(e) => { setCheck(e.key); setCheckPath(`${item.key}`)}}
                        className={check === `${item.key}` ? 'border-r-2 border-blue-600' : ''}>
                        <div className={`flex gap-2 items-center`}>
                            <div className='items-center'>
                                <img src={item.icon} alt='' width={19} />
                            </div>
                            {isMenu ? null :
                                <div className='items-center'>
                                    {item.text}
                                </div>
                            }
                        </div>
                    </Menu.Item>
                ))}
            </Menu>
            
        </div>
    )
}

export default SiderHome;