import React, { useState } from "react";
import { Input, Table, Dropdown, Button, ConfigProvider } from "antd";
import '../../style/css/asset.css'
import { SearchOutlined } from '@ant-design/icons'
import { IoFilter } from "react-icons/io5";
import { GrAdd } from "react-icons/gr";

const items = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                3rd menu item
            </a>
        ),
    },
];

const columns = [
    {
        title: 'STT',
        dataIndex: 'stt',
        key: 'id'
    },
    {
        title: 'Họ và tên',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name - b.name,
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status'
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email'
    },
    {
        title: 'Nhóm',
        dataIndex: 'group',
        key: 'group',

    },
    {
        title: 'Chức vụ',
        dataIndex: 'position',
        key: 'position'
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phone',
        key: 'phone'
    },
]

const data = [];

for (let i = 0; i < 100; i++) {
    data.push(
        { key: i + 1, stt: i + 1, name: `test ${i + 1}`, status: 'Hoạt động', email: `email${i + 1}@gmail.com`, group: '', position: '', phone: '' },
    )
}

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

const ListPerson = () => {
    const [checkBlock, setCheckBlock] = useState(true);
    return (
        <div>
            <div>
                <div className=" flex items-center pt-10 pl-6 pb-2">
                    <div className="w-[3px] h-4 bg-green-400 mr-1">

                    </div>
                    <div className="text-[18px] font-semibold text-gray-700 tracking-wider">
                        Danh sách nhân sự
                    </div>
                </div>
            </div>
            <div className="flex justify-between">
                <div className="flex items-center pl-6">
                    <div>
                        <Input
                            placeholder="Tìm kiếm"
                            prefix={<SearchOutlined className="h-[26px]" />}
                        />
                    </div>
                    <div>
                        <Dropdown
                            className="bg-[#F1F2F4] border-none h-[38px] ml-5"
                            menu={{
                                items,
                            }}
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
                </div>
                <div className="flex flex-row">
                    <div
                        className="basis-1/3">
                        <Button
                            className="flex items-center text-[14px] h-[36px] "
                            type="primary"
                        >
                            <div>
                                <GrAdd />
                            </div>
                            <div>
                                Thêm
                            </div>
                        </Button>
                    </div>
                    <div className="basis-1/3 mx-4">
                        <ConfigProvider
                            theme={{
                                components: {
                                    Button: {
                                        colorPrimary: `green`,
                                        colorPrimaryHover: `#29a329`
                                    },
                                },
                            }}
                        >
                            <Button
                                className="flex items-center text-[14px] h-[36px] "
                                type="primary"
                            >
                                <div>
                                    <svg class="mr-1" width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.6001 18H3.6001C3.33488 18 3.08053 17.8946 2.89299 17.7071C2.70545 17.5196 2.6001 17.2652 2.6001 17V3C2.6001 2.73478 2.70545 2.48043 2.89299 2.29289C3.08053 2.10536 3.33488 2 3.6001 2H8.6001V5C8.6001 5.79565 8.91617 6.55871 9.47878 7.12132C10.0414 7.68393 10.8044 8 11.6001 8H14.6001V10C14.6001 10.2652 14.7055 10.5196 14.893 10.7071C15.0805 10.8946 15.3349 11 15.6001 11C15.8653 11 16.1197 10.8946 16.3072 10.7071C16.4947 10.5196 16.6001 10.2652 16.6001 10V6.94C16.5897 6.84813 16.5696 6.75763 16.5401 6.67V6.58C16.492 6.47718 16.4279 6.38267 16.3501 6.3L10.3501 0.3C10.2674 0.222216 10.1729 0.158081 10.0701 0.11C10.0402 0.10576 10.0099 0.10576 9.9801 0.11C9.87851 0.0517412 9.76632 0.0143442 9.6501 0H3.6001C2.80445 0 2.04139 0.316071 1.47878 0.87868C0.916168 1.44129 0.600098 2.20435 0.600098 3V17C0.600098 17.7956 0.916168 18.5587 1.47878 19.1213C2.04139 19.6839 2.80445 20 3.6001 20H10.6001C10.8653 20 11.1197 19.8946 11.3072 19.7071C11.4947 19.5196 11.6001 19.2652 11.6001 19C11.6001 18.7348 11.4947 18.4804 11.3072 18.2929C11.1197 18.1054 10.8653 18 10.6001 18ZM10.6001 3.41L13.1901 6H11.6001C11.3349 6 11.0805 5.89464 10.893 5.70711C10.7055 5.51957 10.6001 5.26522 10.6001 5V3.41ZM5.6001 6C5.33488 6 5.08053 6.10536 4.89299 6.29289C4.70545 6.48043 4.6001 6.73478 4.6001 7C4.6001 7.26522 4.70545 7.51957 4.89299 7.70711C5.08053 7.89464 5.33488 8 5.6001 8H6.6001C6.86531 8 7.11967 7.89464 7.3072 7.70711C7.49474 7.51957 7.6001 7.26522 7.6001 7C7.6001 6.73478 7.49474 6.48043 7.3072 6.29289C7.11967 6.10536 6.86531 6 6.6001 6H5.6001ZM11.6001 10H5.6001C5.33488 10 5.08053 10.1054 4.89299 10.2929C4.70545 10.4804 4.6001 10.7348 4.6001 11C4.6001 11.2652 4.70545 11.5196 4.89299 11.7071C5.08053 11.8946 5.33488 12 5.6001 12H11.6001C11.8653 12 12.1197 11.8946 12.3072 11.7071C12.4947 11.5196 12.6001 11.2652 12.6001 11C12.6001 10.7348 12.4947 10.4804 12.3072 10.2929C12.1197 10.1054 11.8653 10 11.6001 10ZM18.3101 15.29L16.3101 13.29C16.215 13.199 16.1028 13.1276 15.9801 13.08C15.7366 12.98 15.4636 12.98 15.2201 13.08C15.0973 13.1276 14.9852 13.199 14.8901 13.29L12.8901 15.29C12.7018 15.4783 12.596 15.7337 12.596 16C12.596 16.2663 12.7018 16.5217 12.8901 16.71C13.0784 16.8983 13.3338 17.0041 13.6001 17.0041C13.8664 17.0041 14.1218 16.8983 14.3101 16.71L14.6001 16.41V19C14.6001 19.2652 14.7055 19.5196 14.893 19.7071C15.0805 19.8946 15.3349 20 15.6001 20C15.8653 20 16.1197 19.8946 16.3072 19.7071C16.4947 19.5196 16.6001 19.2652 16.6001 19V16.41L16.8901 16.71C16.9831 16.8037 17.0937 16.8781 17.2155 16.9289C17.3374 16.9797 17.4681 17.0058 17.6001 17.0058C17.7321 17.0058 17.8628 16.9797 17.9847 16.9289C18.1065 16.8781 18.2171 16.8037 18.3101 16.71C18.4038 16.617 18.4782 16.5064 18.529 16.3846C18.5798 16.2627 18.6059 16.132 18.6059 16C18.6059 15.868 18.5798 15.7373 18.529 15.6154C18.4782 15.4936 18.4038 15.383 18.3101 15.29ZM9.6001 16C9.86531 16 10.1197 15.8946 10.3072 15.7071C10.4947 15.5196 10.6001 15.2652 10.6001 15C10.6001 14.7348 10.4947 14.4804 10.3072 14.2929C10.1197 14.1054 9.86531 14 9.6001 14H5.6001C5.33488 14 5.08053 14.1054 4.89299 14.2929C4.70545 14.4804 4.6001 14.7348 4.6001 15C4.6001 15.2652 4.70545 15.5196 4.89299 15.7071C5.08053 15.8946 5.33488 16 5.6001 16H9.6001Z" fill="#fff"></path></svg>
                                </div>
                                <div>
                                    Nhập Excel
                                </div>
                            </Button>
                        </ConfigProvider>
                        
                    </div>
                    <div className="basis-1/3 mr-6">
                        <ConfigProvider
                            theme={{
                                components: {
                                    Button: {
                                        colorBgContainerDisabled: '#ff9999',
                                        colorTextDisabled:'white'
                                }
                            }
                        }}
                        >
                            <Button
                                className="flex items-center text-[14px] h-[36px] "
                                type="primary"
                                danger
                                disabled={checkBlock ? true : false}
                            >
                                <div>
                                    <svg viewBox="64 64 896 896" focusable="false" data-icon="lock" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M832 464h-68V240c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32zM332 240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v224H332V240zm460 600H232V536h560v304zM484 701v53c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-53a48.01 48.01 0 10-56 0z"></path></svg>
                                </div>
                                <div className="ml-2">
                                    Khóa
                                </div>
                            </Button>                            
                       </ConfigProvider>
                    </div>
                </div>
            </div>
            <div className="p-4">
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
export default ListPerson;