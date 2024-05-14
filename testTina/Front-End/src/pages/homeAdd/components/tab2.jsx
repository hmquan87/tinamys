import React, { useState } from 'react'
import { Table, Dropdown, Button, ConfigProvider } from "antd";
import { IoFilter } from "react-icons/io5";
import { MdOutlineLock } from "react-icons/md";


const columns = [
    {
        title: 'STT',
        dataIndex: 'stt',
        key: 'stt'
    },
    {
        title: 'Tiêu đề',
        dataIndex: 'title',
        key: 'title',
        // sorter: (a, b) => a.name - b.name,
    },
    {
        title: 'Tên danh mục',
        dataIndex: 'category',
        key: 'category'
    },
    {
        title: 'Thời gian tạo',
        dataIndex: 'timeCreate',
        key: 'timeCreate'
    },
    {
        title: 'Người tạo',
        dataIndex: 'personCreate',
        key: 'personCreate',

    },
    {
        title: 'Tin nổi bật',
        dataIndex: 'news',
        key: 'news'
    },
    {
        title: 'Công bố',
        dataIndex: 'publish',
        key: 'publish'
    },
]

const data = [];

// for (let i = 0; i < 100; i++) {
//     data.push(
//         { key: i + 1, stt: i + 1, name: `test ${i + 1}`, status: 'Hoạt động', email: `email${i + 1}@gmail.com`, group: '', position: '', phone: '' },
//     )
// }

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

const Tab2 = () => {
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

export default Tab2;