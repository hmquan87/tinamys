import React, { useState } from "react";
import '../../style/css/addtask.css'
import baner from '../../style/img/bannerModalAddNew.svg'
import { FaCamera } from "react-icons/fa";
import { Select, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const { Option } = Select;

const AddTask = ({ handleCancel }) => {
    const [workSpace, setWorkSpace] = useState('');
    const [focusWorkSpace, setFocusWorkSpace] = useState(false);
    const [outsiteWordSpace, setOutsiteWorkSpace] = useState(false);
    const [number, setNumber] = useState('');
    const [focusNumber, setFocusNumber] = useState(false);
    const [outsideNumber, setOutsiteNumber] = useState(false);
    const [website, setWebsite] = useState('');
    const [focusWebsite, setFocusWebsite] = useState(false);
    const [outsideWebsite, setOutsiteWebsite] = useState(false);
    const [selectedValue, setSelectedValue] = useState("Nhỏ hơn 50 nhân sự");
    const [selectedValue1, setSelectedValue1] = useState("Công ty");
    const [scale, setScale] = useState(true);
    const [email, setEmail] = useState('');
    const [focusEmail, setFocusEmail] = useState(false);
    const [outsideEmail, setOutsiteEmail] = useState(false);

    const navigate = useNavigate(); // Initialize useNavigate

    const handleFocusWorkSpace = () => {
        setFocusWorkSpace(true);
    }

    const handleBlurWorkSpace = () => {
        setFocusWorkSpace(false);
    }

    const handleOutsiteWorkSpace = () => {
        if (!workSpace) {
            setOutsiteWorkSpace(true);
        }
    }

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

    const handleFocusWebsite = () => {
        setFocusWebsite(true);
    }

    const handleBlurWebsite = () => {
        setFocusWebsite(false);        
    }

    const handleOutsiteWebsite = () => {
        if(!website) {
            setOutsiteWebsite(true);
        }
    }    

    const handleFocusEmail = () => {
        setFocusEmail(true);
    }

    const handleBlurEmail = () => {
        setFocusEmail(false);
    }

    const handleOutsiteEmail = () => {
        if(!email) {
            setOutsiteEmail(true);
        }
    } 

    const handleChange = (value) => {
        setSelectedValue(value);
    };

    const handleChange1 = (value) => {
        setSelectedValue1(value);
    };

    const handleBlur = () => {
        if (!selectedValue) {
            setScale(false);
        } else setScale(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newWorkspace = {
            nameWorkSpace: workSpace,
            tyeSpace: selectedValue1,
            phone: number,
            website: website,
            email: email,
            tyeSizePeople: selectedValue
        };

        try {
            const response = await fetch('http://localhost:3001/company-space/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newWorkspace),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Success:', data);
                navigate('/home-add'); // Navigate to home-add page on success
            } else {
                console.error('Error:', data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
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
                        <form onSubmit={handleSubmit}>
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
                                                <Option value="Công ty">Công ty</Option>
                                                <Option value="Tổ chức">Tổ chức</Option>
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
                                            <Input 
                                                className={`ant-input ${!website && outsideWebsite ? `${focusWebsite ? 'err-ant-input' : ''}` : ''}`}
                                                onFocus={handleFocusWebsite}
                                                onBlur={() => { handleBlurWebsite(); handleOutsiteWebsite() }}
                                                value={website}
                                                onChange={(e) => setWebsite(e.target.value)}
                                                type="text" 
                                                placeholder="Website" 
                                            />
                                        </div>
                                    </div>
                                    <div className="form-item-custom mb">
                                        <div className="title-custiom ">
                                            Email
                                        </div>
                                        <div className="input-custom">
                                            <Input 
                                                className={`ant-input ${!email && outsideEmail ? `${focusEmail ? 'err-ant-input' : ''}` : ''}`}
                                                onFocus={handleFocusEmail}
                                                onBlur={() => { handleBlurEmail(); handleOutsiteEmail() }}
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                type="text" 
                                                placeholder="Email" 
                                            />
                                        </div>
                                    </div>
                                    <div className="form-item-custom">
                                        <div className="title-custiom">
                                            Số lượng nhân sự    
                                            <b className="r">*</b>
                                        </div>
                                        <div className="input-custom-ant">
                                            <Select
                                                showSearch
                                                allowClear
                                                placeholder='Quy mô nhân sự'
                                                defaultValue={selectedValue}
                                                className={`ant-select ${!scale ? 'err-ant-select' : ''}`}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                <Option value="Nhỏ hơn 50 nhân sự">Nhỏ hơn 50 nhân sự</Option>
                                                <Option value="Từ 50 - 100 nhân sự">Từ 50 - 100 nhân sự</Option>
                                                <Option value="Từ 100 - 200 nhân sự">Từ 100 - 200 nhân sự</Option>
                                                <Option value="Trên 200 nhân sự">Trên 200 nhân sự</Option>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt30">
                                <div className="group-btn col-6 btn-task">
                                    <Button onClick={handleCancel}>Hủy</Button>
                                </div>
                                <div className="group-btn col-6 btn-task">
                                    <Button type="primary" htmlType="submit">Tạo không gian làm việc</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTask;
