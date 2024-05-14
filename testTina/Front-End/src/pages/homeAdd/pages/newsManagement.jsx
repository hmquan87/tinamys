import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { Button, Checkbox, Form, Input } from 'antd';
import 'react-quill/dist/quill.snow.css';

import { Tabs } from 'antd';
import Tab1 from '../components/tab1';
import Tab2 from '../components/tab2';
import Tab3 from '../components/tab3';
import Tab4 from '../components/Tab4';



const onChange = (key) => {
    console.log(key);
};
const items = [
    {
        key: '1',
        label: 'Tạo bài viết',
        children: <Tab1 />,
    },
    {
        key: '2',
        label: 'Danh sách tin tức',
        children: <Tab2/>,
    },
    {
        key: '3',
        label: 'Danh sách danh mục',
        children: <Tab3/>,
    },
    {
        key: '4',
        label: 'Thư viện ảnh',
        children: <Tab4/>,
    },
];

const NewsManagement = () => {

    return (
        <div className='px-4'>
            <Tabs
                defaultActiveKey="1"
                items={items}
                onChange={onChange}
            />
        </div>
    );
}

export default NewsManagement;
