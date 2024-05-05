import { Input } from "antd";
import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { SearchOutlined } from '@ant-design/icons'


const News = () => {
    return (
        <div className="pt-[30px] pl-[10px] pr-[10px]">
            <div className="flex justify-between px-4">
                <div className="bg-blue-500 text-white w-[50px] h-[50px] text-[28px]  flex items-center justify-center rounded-md ">
                    <AiOutlineHome />
                </div>
                <div>
                    <Input
                        placeholder="Tìm kiếm"
                        prefix={<SearchOutlined />}
                    />
                </div>
            </div>
            <div className="flex flex-row px-4">
                <div className="basis-3/4">

                </div>
                <div className="basis-1/4">
                    <div className="flex items-center p-[10px] ">
                        <div className="w-[4px] h-4 bg-red-500 mr-1">

                        </div>
                        <div className="text-[20px] font-normal text-gray-600">
                            Tin tức nổi bật
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default News;