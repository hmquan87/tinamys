import React from "react";
import { Table } from "antd";

const columns1 = [
    {
        title: "STT",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "Tên mục tiêu",
        dataIndex: "name",
        key: "name",
        width: 700
    },
    {
        title: "Nhân sự",
        dataIndex: "status",
        key: "status",
    },
    {
        title: "Thời gian",
        dataIndex: "email",
        key: "email",
    },
    {
        title: "Trạng thái",
        dataIndex: "group",
        key: "group",
    },

];
const columns2 = [
    {
        title: "STT",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "Tên mục tiêu",
        dataIndex: "name",
        key: "name",
        width: 700
    },
    {
        title: "Nhân sự",
        dataIndex: "status",
        key: "status",
    },
    {
        title: "Thời gian",
        dataIndex: "email",
        key: "email",
    },
    {
        title: "Tiến độ",
        dataIndex: "group",
        key: "group",
    },

];

const HomePage = () => {
    return (
        <div className="px-4 py-4">
            <div className="">
                <div className="mb-3 flex items-center">
                    <div className="w-[3px] h-4 bg-green-400 mr-1"></div>
                    <div className="text-[18px] font-semibold text-[#0A0E63]">
                        Nhiệm vụ ngày
                    </div>
                </div>
                <div>
                    <Table
                        columns={columns1}
                        bordered
                        size="middle"
                        scroll={{
                            x: "calc(700px + 50%)",
                            y: 500,
                        }}
                    />
                </div>
            </div>

            <div className="my-4">
                <div className="mb-3 flex items-center">
                    <div className="w-[3px] h-4 bg-green-400 mr-1"></div>
                    <div className="text-[18px] font-semibold text-[#0A0E63]">
                        Mục tiêu công ty
                    </div>
                </div>
                <div>
                    <Table
                        columns={columns2}
                        bordered
                        size="middle"
                        scroll={{
                            x: "calc(700px + 50%)",
                            y: 500,
                        }}
                    />
                </div>
            </div>


            <div className="">
                <div className="mb-3 flex items-center">
                    <div className="w-[3px] h-4 bg-green-400 mr-1"></div>
                    <div className="text-[18px] font-semibold text-[#0A0E63]">
                        Mục tiêu cá nhân
                    </div>
                </div>
                <div>
                    <Table
                        columns={columns2}
                        bordered
                        size="middle"
                        scroll={{
                            x: "calc(700px + 50%)",
                            y: 500,
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default HomePage;