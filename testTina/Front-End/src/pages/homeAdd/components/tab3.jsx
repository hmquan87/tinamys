import React, { useState } from 'react'
import { Table, Dropdown, Button, ConfigProvider } from "antd";
import { IoFilter } from "react-icons/io5";
import { MdOutlineLock } from "react-icons/md";
import { GrAdd } from "react-icons/gr";

const columns = [
    {
        title: 'STT',
        dataIndex: 'stt',
        key: 'stt'
    },
    {
        title: 'Tên danh mục',
        dataIndex: 'category',
        key: 'category',
    },
    {
        title: 'Màu',
        dataIndex: 'color',
        key: 'color'
    },
    {
        title: 'Số lượng tin tức',
        dataIndex: 'newsQuantity',
        key: 'newsQuantity'
    },
    {
        title: 'Thời gian tạo',
        dataIndex: 'timeCreate',
        key: 'timeCreate',

    },
    {
        title: 'Người tạo',
        dataIndex: 'personCreate',
        key: 'personCreate'
    },
    {
        title: 'Hiển thị',
        dataIndex: 'display',
        key: 'display'
    },
]

const data = [];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
    }),
};

const Tab3 = () => {
    const [checkBtn, setCheckBtn] = useState(false)
    return (
        <div>
            <div className='mb-2 text-[20px] text-zinc-600'>
                Danh sách tin tức (0)
            </div>
            <div className='flex justify-between'>
                <div>
                    <Dropdown
                        className="bg-[#F1F2F4] border-none h-[38px]"
                        // menu={{
                        //     items,
                        // }}
                        placement="bottomRight"
                        arrow

                    >
                        <Button
                            className="text-[14px] font-normal text-[#6A6A6A] flex items-center"
                        >
                            <div className="text-[19px] mr-2">
                                <IoFilter />
                            </div>
                            <div>
                                Lọc
                            </div>
                        </Button>
                    </Dropdown>
                </div>
                <div className='flex'>
                    <div className='mr-6'>
                        <Button
                            className='h-[36px] text-[14px] flex items-center'
                            type='primary'
                            
                        >
                            <span className='mr-1 text-[16px]'> <GrAdd /> </span>
                            Thêm danh mục
                        </Button>
                    </div>
                    <div>
                        <Button
                            className={`${checkBtn ? null : 'opacity-40'} h-[36px] text-[14px] flex items-center justify-center`}
                            type='primary'
                            danger
                            disabled={checkBtn ? false : true}
                        >
                            <span className='mr-1 text-[16px]'> <MdOutlineLock /> </span>
                            Xóa
                        </Button>
                    </div>
                </div>
            </div>
            <div className='mt-4'>
                <Table
                    columns={columns}
                    bordered
                    size="middle"
                    rowSelection={{
                        ...rowSelection,
                    }}
                    dataSource={data}
                    scroll={{
                        x: 'calc(700px + 50%)',
                        y: 300,
                    }}
                />
            </div>
        </div>
  )
}

export default Tab3;