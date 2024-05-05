import React, { useState } from 'react'
import { Button, Input } from "antd";
import { SearchOutlined, TableOutlined, PlusOutlined } from '@ant-design/icons'



const ListPs = () => {
    const [checkSearch, setCheckSearch] = useState(false)
    return (
        <div className="bg-white flex flex-row h-[100%]">
            <div className="basis-1/6 border-r border-zinc-300" >
                <div className=" flex items-center p-[10px]  ">
                    <div className="w-[3px] h-4 bg-green-400 mr-1">

                    </div>
                    <div className="text-[18px] font-semibold text-gray-700">
                        Danh sách nhóm
                    </div>
                </div>
            </div>
            <div className="basis-5/6 flex justify-between " >
                <div>
                    <div className=" flex items-center p-[10px]  ">
                        <div className="w-[3px] h-4 bg-green-400 mr-1">

                        </div>
                        <div className="text-[18px] font-semibold text-gray-700">
                            Danh sách chức vụ
                        </div>
                    </div>
                </div>
                <div className='mr-5'>
                    <div className="flex items-center p-[10px]">
                        <div className='mr-6'>
                            <Input
                                className={`h-[36px]  border-none bg-inherit  ${checkSearch ? 'w-[190px]' : 'w-0'}`}
                                placeholder="Tìm kiếm"
                                prefix={<SearchOutlined className="text-[23px]" onClick={() => setCheckSearch(!checkSearch)} />}
                            />
                        </div>
                        <div className='flex items-center font-semibold text-gray-500 bg-zinc-100 p-[5px] rounded-sm mr-3'>
                            <div className='text-[20px]'>
                                <TableOutlined />
                            </div>
                            <div className='text-[14px] ml-2 '>
                                Bảng
                             </div>
                        </div>
                        <div className=''>
                            <Button
                                className='h-[36px] w-[134px]'
                                type='primary'
                            >
                                <div className='flex items-center justify-center text-[14px]'>
                                    <div className=' mr-2'>
                                        <PlusOutlined />
                                    </div>
                                    <div className=''>
                                        Thêm chức vụ
                                    </div>
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListPs;  