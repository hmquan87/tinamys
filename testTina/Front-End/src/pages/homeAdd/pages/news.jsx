import { Input } from "antd";
import React, { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import "../../style/css/news.css";
const News = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/tintuc')
            .then(response => {
                if (response.data.success) {
                    setNews(response.data.news);
                }
            })
            .catch(error => {
                console.error('Error fetching news:', error);
            });
    }, []);

    return (
        <div className="pt-[30px] pl-[10px] pr-[10px]">
            <div className="flex justify-between px-4">
                <div className="bg-blue-500 text-white w-[50px] h-[50px] text-[28px] flex items-center justify-center rounded-md">
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
                    {/* Main news section */}
                </div>
                <div className="basis-1/4">
                    <div className="flex items-center p-[10px]">
                        <div className="w-[4px] h-4 bg-red-500 mr-1"></div>
                        <div className="text-[20px] font-normal text-gray-600">
                            Tin tức nổi bật
                        </div>
                    </div>
                    <div>
                        {news.filter(item => item.highlight).map((item, index) => (
                            <div key={index} className="mb-4">
                                <img src={item.highlightImage} alt="" />
                                <h2 className="text-xl font-semibold">{item.title}</h2>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="px-4">
                {news.map((item, index) => (
                    <div key={index} className="mb-4">
                        <div className="new">
                            <div className="title">
                                <img src={item.coverImage} alt="" />
                                <h3 className="text-[15px] font-normal text-gray-600">{item.title}</h3>
                                <h2 className="text-[25px] font-normal text-gray-600">{item.description}</h2>
                            </div>
                            <div className="content">
                                <span className="text-[17px] font-normal text-gray-600">{item.content}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default News;
