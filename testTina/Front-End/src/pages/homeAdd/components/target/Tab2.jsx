import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { BsFilterLeft } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";



const Tab2 = () => {
    return (
        <div className="flex">
            <div className=" bg-gray-100 px-4 pt-3 pb-4 w-[350px] mr-4">
                <div className="flex justify-between items-center rounded-lg ">
                    <div className=" text-[14px] font-bold text-[#575757]">
                        Quý II
                    </div>
                    <div className="flex text-gray-400 text-[20px] items-center">
                        <div className="mr-2">
                            <FaCheckCircle />
                        </div>
                        <div className="text-[25px]">
                            <BsFilterLeft />
                        </div>
                    </div>

                </div>
                <div className='flex items-center ml-[-5px]'>
                    <div>
                        <IoAdd />
                    </div>
                    <div>
                        Thêm mục tiêu
                    </div>
                </div>
            </div>

            <div className=" bg-gray-100 px-4 pt-3 pb-4 w-[350px] mr-4">
                <div className="flex justify-between items-center rounded-lg ">
                    <div className=" text-[14px] font-bold text-[#575757]">
                        Tháng 4
                    </div>
                    <div className="flex text-gray-400 text-[20px] items-center">
                        <div className="mr-2">
                            <FaCheckCircle />
                        </div>
                        <div className="text-[25px]">
                            <BsFilterLeft />
                        </div>
                    </div>

                </div>
                <div className='flex items-center ml-[-5px]'>
                    <div>
                        <IoAdd />
                    </div>
                    <div>
                        Thêm mục tiêu
                    </div>
                </div>
            </div>

            <div className=" bg-gray-100 px-4 pt-3 pb-4 w-[350px] mr-4">
                <div className="flex justify-between items-center rounded-lg ">
                    <div className=" text-[14px] font-bold text-[#575757]">
                        Tháng 5
                    </div>
                    <div className="flex text-gray-400 text-[20px] items-center">
                        <div className="mr-2">
                            <FaCheckCircle />
                        </div>
                        <div className="text-[25px]">
                            <BsFilterLeft />
                        </div>
                    </div>

                </div>
                <div className='flex items-center ml-[-5px]'>
                    <div>
                        <IoAdd />
                    </div>
                    <div>
                        Thêm mục tiêu
                    </div>
                </div>
            </div>

            <div className=" bg-gray-100 px-4 pt-3 pb-4 w-[350px] mr-4">
                <div className="flex justify-between items-center rounded-lg ">
                    <div className=" text-[14px] font-bold text-[#575757]">
                        Tháng 6
                    </div>
                    <div className="flex text-gray-400 text-[20px] items-center">
                        <div className="mr-2">
                            <FaCheckCircle />
                        </div>
                        <div className="text-[25px]">
                            <BsFilterLeft />
                        </div>
                    </div>

                </div>
                <div className='flex items-center ml-[-5px]'>
                    <div>
                        <IoAdd />
                    </div>
                    <div>
                        Thêm mục tiêu
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Tab2;