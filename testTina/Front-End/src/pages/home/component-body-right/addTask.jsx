import React, { useEffect, useRef, useState } from "react";
import '../../style/css/addtask.css'
import baner from '../../style/img/bannerModalAddNew.svg'
import { FaCamera } from "react-icons/fa";
import { Select, Input, Button } from 'antd';
const { Option } = Select;

const AddTask = ({ handleCancel }) => {

    const [workSpace, setWorkSpace] = useState('');
    const [focusWorkSpace, setFocusWorkSpace] = useState(false)
    const [outsiteWordSpace, setOutsiteWorkSpace] = useState(false);

    const handleFocusWorkSpace = () => {
        setFocusWorkSpace(true)
    }
    const handleBlurWorkSpace = () => {
        setFocusWorkSpace(false)
    }
    const handleOutsiteWorkSpace = () => {
        if (!workSpace) {
            setOutsiteWorkSpace(true)
        }
    }

    // number-phone
    const [number, setNumber] = useState('');
    const [focusNumber, setFocusNumber] = useState(false);
    const [outsideNumber, setOutsiteNumber] = useState(false);

    const handleFocusNumber = () => {
        setFocusNumber(true);
    }

    const handleBlurNumber = () => {
        setFocusNumber(false);
    }
    const handleOutsiteNumber = () => {
        if (!number) {
            setOutsiteNumber(true);
        }
    }

    const [selectedValue, setSelectedValue] = useState("Nhỏ hơn 50 nhân sự");
    const handleChange = (value) => {
        setSelectedValue(value);
        console.log(`selected: ${value}`);
        console.log(`setlectValue: ${selectedValue}`);
    };
    const [selectedValue1, setSelectedValue1] = useState("Công ty");
    const handleChange1 = (value) => {
        setSelectedValue1(value);
        console.log(`selected1: ${value}`);
        console.log(`setlectValue1: ${selectedValue1}`);
    };
    // const []

    const [scale, setScale] = useState(true)

    const handleBlur = () => {
        if (!selectedValue) {
            setScale(false)
        } else setScale(true)
    };

    return (
        <div className="wh-full">
            <div className="addtaskfull">
                <div className="img-baner">
                    <div className="img-wrapper">
                        <img src={baner} alt="" />
                        <div className="cam">
                            <FaCamera id="cam" />
                        </div>
                    </div>
                </div>
                <div className="form-add-task">
                    <div className="form-add">
                        <div className="title-add">
                            Hãy xây dựng một không gian làm việc mới
                        </div>
                        <div className="description-add">
                            <p>Tăng năng suất công việc một cách tối đa nhất giúp mọi người dễ dàng truy cập cùng nhau.</p>
                        </div>
                        <div className="row">
                            <div className="gr-form-item-custom col-6">
                                <div className="form-item-custom mb5">
                                    <div className="title-custiom ">
                                        Tên không gian làm việc
                                        <b className="r">*</b>
                                    </div>
                                    <div className="input-custom">
                                        <Input
                                            className={`ant-input ${!workSpace && outsiteWordSpace ? `${focusWorkSpace ? 'err-ant-input' : ''}` : ''}`}
                                            type="text"
                                            placeholder="Tên không gian làm việc"
                                            onFocus={handleFocusWorkSpace}
                                            onBlur={() => { handleBlurWorkSpace(); handleOutsiteWorkSpace() }}
                                            value={workSpace}
                                            onChange={(e) => setWorkSpace(e.target.value)}
                                        />
                                    </div>
                                    <div className={`focus-error ${!workSpace && outsiteWordSpace ? 'show' : ''}`}>
                                        Tên không gian làm việc không được để trống
                                    </div>
                                </div>
                                <div className="form-item-custom mb">
                                    <div className="title-custiom">
                                        Loại hình không gian làm việc
                                        <b className="r">*</b>
                                    </div>
                                    <div className="input-custom-ant">
                                        <Select

                                            showSearch
                                            defaultValue={selectedValue1}
                                            className="ant-select"
                                            onChange={handleChange1}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            <Option value="congty">Công ty</Option>
                                            <Option value="tochuc">Tổ chức</Option>
                                        </Select>
                                    </div>

                                </div>
                                <div className="form-item-custom ">
                                    <div className="title-custiom ">
                                        Số điện thoại
                                        <b className="r">*</b>
                                    </div>
                                    <div className="input-custom">
                                        <Input
                                            className={`ant-input ${!number && outsideNumber ? `${focusNumber ? 'err-ant-input' : ''}` : ''}`}
                                            onFocus={handleFocusNumber}
                                            onBlur={() => { handleBlurNumber(); handleOutsiteNumber() }}
                                            value={number}
                                            onChange={(e) => setNumber(e.target.value)}
                                            type="text"
                                            placeholder="Số điện thoại"
                                        />
                                    </div>
                                    <div className={`focus-error ${!number && outsideNumber ? 'show' : ''}`}>
                                        Số điện thoại không được để trống
                                    </div>
                                </div>
                            </div>
                            <div className="gr-form-item-custom col-6">
                                <div className="form-item-custom mb">
                                    <div className="title-custiom ">
                                        Website
                                    </div>
                                    <div className="input-custom">
                                        <Input className="ant-input" type="text" placeholder="Website" />
                                    </div>
                                </div>
                                <div className="form-item-custom mb">
                                    <div className="title-custiom ">
                                        Email
                                    </div>
                                    <div className="input-custom">
                                        <Input className="ant-input" type="text" placeholder="Email" />
                                    </div>
                                </div>
                                <div className="form-item-custom">
                                    <div className="title-custiom">
                                        Loại hình không gian làm việc
                                        <b className="r">*</b>
                                    </div>
                                    <div className="input-custom-ant">
                                        <Select

                                            showSearch
                                            allowClear
                                            placeholder='Quy mô nhân sự'
                                            defaultValue={selectedValue}
                                            className={`ant-select ${!scale ? 'err-ant-select' : ''}`}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            <Option value="max50">Nhỏ hơn 50 nhân sự</Option>
                                            <Option value="min50max100">Từ 50 đến 100 nhân sự</Option>
                                            <Option value="min100">Lớn hơn 100 nhân sự</Option>
                                        </Select>
                                    </div>
                                    <div className={`focus-error ${!scale ? 'show' : ''}`}>
                                        Quy mô nhân sự không được để trống
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="ant-btn-add">
                            <div className="ant-btn-r">
                                <div className="ant-btn">
                                    <Button className="ant-btn ant-btn-cancel" onClick={() => handleCancel(false)} type="primary" danger>
                                        Hủy
                                    </Button>
                                    <Button className="ant-btn ant-btn-accect" type="primary" >
                                        Tạo không gian làm việc
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AddTask;