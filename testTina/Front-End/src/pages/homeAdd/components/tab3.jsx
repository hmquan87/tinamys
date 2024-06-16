import React, { useState, useEffect } from 'react';
import { Table, Dropdown, Button, Modal, Input, Form } from "antd";
import { IoFilter } from "react-icons/io5";
import { MdOutlineLock } from "react-icons/md";
import { GrAdd } from "react-icons/gr";
import axios from 'axios';

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
];

const Tab3 = () => {
    const [data, setData] = useState([]);
    const [checkBtn, setCheckBtn] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/newsCategories');
                setData(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        };

        fetchData();
    }, []);

    const handleAddCategory = async (values) => {
        try {
            const response = await axios.post('http://localhost:3001/newsCategories', values);
            setData([...data, response.data]);
            setIsModalOpen(false);
            form.resetFields();
        } catch (error) {
            console.error('Lỗi khi thêm danh mục:', error);
        }
    };

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setCheckBtn(selectedRowKeys.length > 0);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            name: record.name,
        }),
    };

    return (
        <div>
            <div className='mb-2 text-[20px] text-zinc-600'>
                Danh sách tin tức ({data.length})
            </div>
            <div className='flex justify-between'>
                <div>
                    <Dropdown
                        className="bg-[#F1F2F4] border-none h-[38px]"
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
                            onClick={() => setIsModalOpen(true)}
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
                            disabled={!checkBtn}
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

            <Modal
                title="Thêm danh mục"
                visible={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <Form form={form} onFinish={handleAddCategory}>

                    <Form.Item name="category" label="Tên danh mục" rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="color" label="Màu" rules={[{ required: true, message: 'Vui lòng nhập màu!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="newsQuantity" label="Số lượng tin tức" rules={[{ required: true, message: 'Vui lòng nhập số lượng tin tức!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="timeCreate" label="Thời gian tạo" rules={[{ required: true, message: 'Vui lòng nhập thời gian tạo!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="personCreate" label="Người tạo" rules={[{ required: true, message: 'Vui lòng nhập người tạo!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="display" label="Hiển thị" rules={[{ required: true, message: 'Vui lòng nhập hiển thị!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Thêm
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Tab3;
