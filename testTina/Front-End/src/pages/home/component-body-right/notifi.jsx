import React, { useState } from 'react'
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import '../../style/css/notifi.css'
import nodata from '../../style/img/NoData.svg'
import { Tabs } from 'antd';




const Notifi = () => {
    const [check, setCheck] = useState(true);
    const handleClick = () => {
        setCheck(!check);
    }

    const onChange = (key) => {
        console.log(key);
    };
    const items = [
        {
            key: '1',
            label: 'Cá nhân',
        },
        {
            key: '2',
            label: 'Nhóm',
        },
        {
            key: '3',
            label: 'Công ty',
        },
        {
            key: '4',
            label: 'Hệ thống',
        },
    ];

    return (

        <div className="full-notifi">
            <div className="notifi-title">
                <div className="text-notifi-left">
                    Thông báo
                </div>
                <div className="text-notifi-right">
                    Đánh dấu tất cả là đã đọc <IoIosCheckmarkCircleOutline />
                </div>
            </div>
            <div className="btn-title">

                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </div>
            <div className="nodata">
                <div className="img-nodata css">
                    <img src={nodata} alt="" height="127px" width="120px" />
                </div>
                <div className="text-nodata css">
                    Không có dữ liệu
                </div>
            </div>
        </div>
    )
}

export default Notifi;