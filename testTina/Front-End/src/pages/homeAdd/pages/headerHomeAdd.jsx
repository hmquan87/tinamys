import React, { useState, useEffect } from 'react';
import logo from '../../style/img/logo.svg';
import icon1 from '../../style/img/home-icon-1.svg';
import icon2 from '../../style/img/home-icon-2.svg';
import icon3 from '../../style/img/home-icon-3.svg';
import { SearchOutlined, DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Input, Space, Dropdown, Button, Menu, Avatar } from 'antd';
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { Tabs } from 'antd';
import { MdSupportAgent } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa6";
import { SiMinutemailer } from "react-icons/si";
import axios from 'axios';
import Profile from '../../home/component-body-right/profileADD';


const onChange = (key) => {
    console.log(key);
};
const items = [
    {
        key: '1',
        label: 'Tất cả'

    },
    {
        key: '2',
        label: 'Cá nhân'

    },
    {
        key: '3',
        label: 'Nhóm'
    },
    {
        key: '4',
        label: 'Công ty'
    },
    {
        key: '5',
        label: 'Hệ thống'
    },
];


const dataSelect = [
    {
        key: '1', label: (
            <div className='ml-3'>test1</div>
    ) },
    {
        key: '3', label: (
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
    )},
];

const dataItem1 = [
    {
        key: '1',
        label: (
            <Menu.Item key="1">
                <div className='w-[400px] flex justify-between items-center'>
                    <div className='text-[16px]'>
                        Thông báo
                    </div>
                    <div className='flex items-center text-blue-500'>
                        Đánh dấu tất cả là đã đọc <IoCheckmarkCircleOutline className='ml-2 text-[16px]' />
                    </div>
                </div>
            </Menu.Item>
        )
    },
    {
        key: '2',
        label: (
            <div className='flex justify-center '>
                <Menu.Item key='1'>
                    <Tabs  defaultActiveKey="1" items={items} onChange={onChange} />
                </Menu.Item>
            </div>
        )
    }
];

const dataItem2 = [
    {
        key: '1',
        label: (
            <div className='flex justify-center w-[400px] border-b border-gray-300'>
                <Menu.Item key='1'>
                    <div className='text-[18px]'>
                        Liên hệ trợ giúp
                    </div>
                </Menu.Item>
            </div>
        )
    },
    {
        key: '2',
        label: (
            <div className='mt-2 mx-2'>
                <Menu.Item key='1'>
                    <div className='flex items-center py-4 pl-4'>
                        <div className='text-[20px] text-blue-500 mr-6'>
                            <MdSupportAgent />
                        </div>
                        <div className='text-[14px]'>
                            Số điện thoại hỗ trợ
                        </div>
                    </div>
                </Menu.Item>
            </div>
        )
    },
    {
        key: '3',
        label: (
            <div className='my-2 mx-2'>
                <Menu.Item key='1'>
                    <div className='flex items-center py-4 pl-4'>
                        <div className='text-[20px] text-blue-500 mr-6'>
                            <SiMinutemailer />
                        </div>
                        <div className='text-[14px]'>
                            Email
                        </div>
                    </div>
                </Menu.Item>
            </div>
        )
    },
    {
        key: '4',
        label: (
            <div className='mb-2 mx-2'>
                <Menu.Item key='1'>
                    <div className='flex items-center py-4 pl-4'>
                        <div className='text-[20px] text-blue-500 mr-6'>
                            <FaAddressCard />
                        </div>
                        <div className='text-[14px]'>
                            Địa chỉ hỗ trợ
                        </div>
                    </div>
                </Menu.Item>
            </div>
        )
    },

]
// const dataItem3 = [
//     {
//         key: '1',
//         label: (
//             <Profile/>
//         )
//     },
    
// ]

const HeaderHomeAdd = ({ setCheckPath }) => {
    const [search, setSearch] = useState(false);
    const [company, setCompany] = useState('')
    // const [data, setData] = useState([]);
    const hanldeSearch = () => {
        setSearch(!search);
    };
    const fetchData = async () => {
        try {
            const res = await axios.get('http://localhost:3001/getDataCompany');
            const namecom = res.data.companySpace;
            // setData(namecom)
            setCompany(namecom.nameWorkSpace)
        } catch (error) {

        }
    }
    useEffect(() => {
        fetchData();

    }, [])

    return (
        <>
            <div className='flex items-center ml-[-35px]'>
                <div>
                    <img src={logo} alt='' />
                </div>
                <div className='ml-5'>
                    <Dropdown
                        overlay={<Menu>{dataSelect.map(item => item.label)}</Menu>}
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
            <div className='flex items-center justify-center mr-[-35px]'>
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
                    <Dropdown
                        overlay={<Menu>{dataItem2.map(item => item.label)}</Menu>}
                        trigger={['click']}
                    >
                        <Space className='text-[14px]'>
                            <img src={icon3} alt='' />
                        </Space>
                    </Dropdown>
                </div>
                <div className='flex items-center'>
                    <Dropdown
                        overlay={<Menu><Profile setCheckPath={setCheckPath} /></Menu>}
                        trigger={['click']}
                    >
                        <Space className='text-[14px]'>
                            <Avatar style={{background: '#9333EA'}}>
                                {company.slice(0,2)}
                            </Avatar>
                        </Space>
                    </Dropdown>
                </div>
            </div>
        </>
    );
};

export default HeaderHomeAdd;
