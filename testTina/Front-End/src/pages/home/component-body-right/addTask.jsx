import React, { useState } from "react";
import "../../style/css/addtask.css";
import baner from "../../style/img/bannerModalAddNew.svg";
import { FaCamera } from "react-icons/fa";
import { Select, Input, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const AddTask = ({ handleCancel }) => {
    const [workSpace, setWorkSpace] = useState("");
    const [focusWorkSpace, setFocusWorkSpace] = useState(false);
    const [outsiteWorkSpace, setOutsiteWorkSpace] = useState(false);
    const [number, setNumber] = useState("");
    const [focusNumber, setFocusNumber] = useState(false);
    const [outsideNumber, setOutsideNumber] = useState(false);
    const [website, setWebsite] = useState("");
    const [focusWebsite, setFocusWebsite] = useState(false);
    const [outsideWebsite, setOutsideWebsite] = useState(false);
    const [selectedValue, setSelectedValue] = useState("Nhỏ hơn 50 nhân sự");
    const [selectedValue1, setSelectedValue1] = useState("Công ty");
    const [scale, setScale] = useState(true);
    const [email, setEmail] = useState("");
    const [focusEmail, setFocusEmail] = useState(false);
    const [outsideEmail, setOutsideEmail] = useState(false);

    const navigate = useNavigate();

    const handleFocusWorkSpace = () => setFocusWorkSpace(true);
    const handleBlurWorkSpace = () => setFocusWorkSpace(false);
    const handleOutsiteWorkSpace = () => !workSpace && setOutsiteWorkSpace(true);

    const handleFocusNumber = () => setFocusNumber(true);
    const handleBlurNumber = () => setFocusNumber(false);
    const handleOutsiteNumber = () => !number && setOutsideNumber(true);

    const handleFocusWebsite = () => setFocusWebsite(true);
    const handleBlurWebsite = () => setFocusWebsite(false);
    const handleOutsiteWebsite = () => !website && setOutsideWebsite(true);

    const handleFocusEmail = () => setFocusEmail(true);
    const handleBlurEmail = () => setFocusEmail(false);
    const handleOutsiteEmail = () => !email && setOutsideEmail(true);

    const handleChange = (value) => setSelectedValue(value);
    const handleChange1 = (value) => setSelectedValue1(value);
    const handleBlur = () => setScale(!!selectedValue);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newWorkspace = {
            nameWorkSpace: workSpace,
            tyeSpace: selectedValue1,
            phone: number,
            website: website,
            email: email,
            tyeSizePeople: selectedValue,
        };

        if (
            !workSpace ||
            !number ||
            !selectedValue1 ||
            !selectedValue ||
            !website ||
            !email
        ) {
            setOutsiteWorkSpace(!workSpace);
            setOutsideNumber(!number);
            setOutsideWebsite(!website);
            setOutsideEmail(!email);
            setScale(!!selectedValue);
            notification.error({
                message: "Tạo không gian làm việc không thành công",
                description: "Vui lòng điền đầy đủ các thông tin.",
            });
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/company-space/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newWorkspace),
            });

            const data = await response.json();
            if (response.ok) {
                console.log("Success:", data);
                navigate("/home-add");
            } else {
                console.error("Error:", data);
                notification.error({
                    message: "Tạo không gian làm việc không thành công",
                    description: "Đã xảy ra lỗi khi gửi dữ liệu lên máy chủ.",
                });
            }
        } catch (error) {
            console.error("Error:", error);
            notification.error({
                message: "Tạo không gian làm việc không thành công",
                description: "Đã xảy ra lỗi khi kết nối với máy chủ.",
            });
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
                            <p>
                                Tăng năng suất công việc một cách tối đa nhất giúp mọi người dễ
                                dàng truy cập cùng nhau.
                            </p>
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
                                                className={`ant-input ${!workSpace && outsiteWorkSpace ? "err-ant-input" : ""
                                                    }`}
                                                type="text"
                                                placeholder="Tên không gian làm việc"
                                                onFocus={handleFocusWorkSpace}
                                                onBlur={() => {
                                                    handleBlurWorkSpace();
                                                    handleOutsiteWorkSpace();
                                                }}
                                                value={workSpace}
                                                onChange={(e) => setWorkSpace(e.target.value)}
                                            />
                                        </div>
                                        <div
                                            className={`focus-error ${!workSpace && outsiteWorkSpace ? "show" : ""
                                                }`}
                                        >
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
                                                    option.children
                                                        .toLowerCase()
                                                        .indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                <Option value="Công ty">Công ty</Option>
                                                <Option value="Tổ chức">Tổ chức</Option>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="form-item-custom">
                                        <div className="title-custiom ">
                                            Số điện thoại
                                            <b className="r">*</b>
                                        </div>
                                        <div className="input-custom">
                                            <Input
                                                className={`ant-input ${!number && outsideNumber ? "err-ant-input" : ""
                                                    }`}
                                                onFocus={handleFocusNumber}
                                                onBlur={() => {
                                                    handleBlurNumber();
                                                    handleOutsiteNumber();
                                                }}
                                                value={number}
                                                onChange={(e) => setNumber(e.target.value)}
                                                type="text"
                                                placeholder="Số điện thoại"
                                            />
                                        </div>
                                        <div
                                            className={`focus-error ${!number && outsideNumber ? "show" : ""
                                                }`}
                                        >
                                            Số điện thoại không được để trống
                                        </div>
                                    </div>
                                </div>
                                <div className="gr-form-item-custom col-6">
                                    <div className="form-item-custom mb5">
                                        <div className="title-custiom ">
                                            Website
                                            <b className="r">*</b>
                                        </div>
                                        <div className="input-custom">
                                            <Input
                                                className={`ant-input ${!website && outsideWebsite ? "err-ant-input" : ""
                                                    }`}
                                                type="text"
                                                placeholder="Website"
                                                onFocus={handleFocusWebsite}
                                                onBlur={() => {
                                                    handleBlurWebsite();
                                                    handleOutsiteWebsite();
                                                }}
                                                value={website}
                                                onChange={(e) => setWebsite(e.target.value)}
                                            />
                                        </div>
                                        <div
                                            className={`focus-error ${!website && outsideWebsite ? "show" : ""
                                                }`}
                                        >
                                            Website không được để trống
                                        </div>
                                    </div>
                                    <div className="form-item-custom mb5">
                                        <div className="title-custiom ">
                                            Email
                                            <b className="r">*</b>
                                        </div>
                                        <div className="input-custom">
                                            <Input
                                                className={`ant-input ${!email && outsideEmail ? "err-ant-input" : ""
                                                    }`}
                                                type="text"
                                                placeholder="Email"
                                                onFocus={handleFocusEmail}
                                                onBlur={() => {
                                                    handleBlurEmail();
                                                    handleOutsiteEmail();
                                                }}
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div
                                            className={`focus-error ${!email && outsideEmail ? "show" : ""
                                                }`}
                                        >
                                            Email không được để trống
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
                                                placeholder="Quy mô nhân sự"
                                                defaultValue={selectedValue}
                                                className={`ant-select ${!scale ? "err-ant-select" : ""
                                                    }`}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                filterOption={(input, option) =>
                                                    option.children
                                                        .toLowerCase()
                                                        .indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                <Option value="Nhỏ hơn 50 nhân sự">
                                                    Nhỏ hơn 50 nhân sự
                                                </Option>
                                                <Option value="Từ 50 đến 100 nhân sự">
                                                    Từ 50 đến 100 nhân sự
                                                </Option>
                                                <Option value="Lớn hơn 100 nhân sự">
                                                    Lớn hơn 100 nhân sự
                                                </Option>
                                            </Select>
                                        </div>
                                        <div className={`focus-error ${!scale ? "show" : ""}`}>
                                            Số lượng nhân sự không được để trống
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    className="mr-4 h-[42px] w-[80px] text-[16px] font-medium"
                                    type="primary"
                                    danger
                                    onClick={handleCancel}>
                                    Hủy bỏ
                                </Button>
                                <Button
                                    className=" text-[16px] font-medium h-[42px]"
                                    type="primary"

                                    htmlType="submit"
                                >
                                    Tạo không gian làm việc
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTask;
