import React from "react";
import { Tabs } from 'antd';
import { FaCalendar } from "react-icons/fa";
import Tab1 from '../components/target/Tab1';
import Tab2 from '../components/target/Tab2';
import Tab3 from '../components/target/Tab3';
import Tab4 from '../components/target/Tab4';


const onChange = (key) => {
    console.log(key);
};
const items = [
    {
        key: '1',
        label:
            <div className="flex items-center text-[16px] font-medium px-4">
                <div className="mr-2 text-[14px]">
                    <FaCalendar />
                </div>
                <div >
                    Mục tiêu năm 2024
                </div>
            </div>,
        children: <Tab1/>,
    },
    {
        key: '2',
        label: 
            <div className="flex items-center text-[16px] font-medium px-4">
                <div className="mr-2 text-[14px]">
                    <FaCalendar />
                </div>
                <div>
                    Mục tiêu quý II
                </div>
            </div>,
        children: <Tab2/>,
    },
    {
        key: '3',
        label: 
            <div className="flex items-center text-[16px] font-medium px-4">
                <div className="mr-2 text-[14px]">
                    <FaCalendar />
                </div>
                <div>
                    Mục tiêu tháng 6
                </div>
            </div>,
        children: <Tab3 />,
    },
    {
        key: '4',
        label: 
            <div className="flex items-center text-[16px] font-medium px-4">
                <div className="mr-2 text-[14px]">
                    <FaCalendar />
                </div>
                <div>
                    Mục tiêu tuần 24
                </div>
            </div>,
        children: <Tab4 />,
    },
];
const TargetPerson = () => {
    return (
        <div className='px-4'>
            <Tabs
                defaultActiveKey="1"
                items={items}
                onChange={onChange}
            />
        </div>
    )
}

export default TargetPerson;