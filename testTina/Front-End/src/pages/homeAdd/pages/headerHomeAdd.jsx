import React, { useState } from 'react';
import logo from '../../style/img/logo.svg';
import icon1 from '../../style/img/home-icon-1.svg';
import icon2 from '../../style/img/home-icon-2.svg';
import icon3 from '../../style/img/home-icon-3.svg';
import avt from '../../style/img/avtDefault.png';
import { SearchOutlined, DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Input, Space, Dropdown, Button, Menu } from 'antd';
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const dataSelect = [
    { key: '1', label: 'test1' },
    { key: '2', label: 'test2' },
];

const dataItem1 = [
    {
        key: '1',
        label: (
            <Menu.Item key="1">
                <div className='w-[400px] flex justify-between items-center'>
                    <div>
                        Thông báo
                    </div>
                    <div className='flex items-center'>
                        Đánh dấu tất cả là đã đọc <IoCheckmarkCircleOutline className='ml-2'/>
                    </div>
                </div>
            </Menu.Item>
        )
    },
];

const HeaderHomeAdd = () => {
    const [search, setSearch] = useState(false);
    const hanldeSearch = () => {
        setSearch(!search);
    };

    const menuItems = dataSelect.map(item => (
        <Menu.Item key={item.key}>
            {item.label}
        </Menu.Item>
    ));

    menuItems.push(
        <Menu.Item key="addSpace">
            <Button className='h-[30px] w-[100%] border-blue-600' type='link'>
                <div className='flex items-center text-[14px]'>
                    <div className='text-[14px] mr-1'>
                        <PlusOutlined style={{ fontSize: '14px' }} />
                    </div>
                    <div>
                        Thêm không gian làm việc
                    </div>
                </div>
            </Button>
        </Menu.Item>
    );

    return (
        <>
            <div className='flex items-center ml-[-35px]'>
                <div>
                    <img src={logo} alt='' />
                </div>
                <div className='ml-5'>
                    <Dropdown
                        overlay={<Menu>{menuItems}</Menu>}
                        trigger={['click']}
                    >
                        <Space className='text-[14px]'>
                            Không gian làm việc
                            <DownOutlined style={{ fontSize: '10px' }} />
                        </Space>
                    </Dropdown>
                </div>
                <div>
                    <Button className='text-[14px] h-[30px] flex items-center justify-center ml-14' type='primary'>
                        Tạo nhanh
                    </Button>
                </div>
            </div>
            <div className='flex items-center justify-center'>
                <div className='flex items-center mr-[10px]'>
                    <Input
                        className={`${search ? 'w-[500px]' : 'w-0 border-none bg-inherit'}`}
                        placeholder="Search"
                        prefix={<SearchOutlined className='text-[20px]' onClick={hanldeSearch} />}
                    />
                </div>
                <div className='flex items-center mx-[10px]'>
                    <img src={icon1} width={30} alt='' />
                </div>
                <div className='flex items-center mr-[10px]'>
                    <Dropdown
                        overlay={<Menu>{dataItem1.map(item => item.label)}</Menu>}
                        trigger={['click']}
                    >
                        <Space className='text-[14px]'>
                            <img src={icon2} alt='' />
                        </Space>
                    </Dropdown>
                </div>
                <div className='flex items-center mr-[10px]'>
                    <img src={icon3} alt='' />
                </div>
                <div className='flex items-center'>
                    <img src={avt} width={30} alt='' />
                </div>
            </div>
        </>
    );
};

export default HeaderHomeAdd;