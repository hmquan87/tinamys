import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { Button, Form, Input, Switch, ConfigProvider, Select, Upload, message } from 'antd';
import 'react-quill/dist/quill.snow.css';
import { InboxOutlined } from '@ant-design/icons';
import imgUpload from '../../style/img/GallerySend.png';
import axios from 'axios';

const { Dragger } = Upload;
const { TextArea } = Input;

const props = {
    name: 'file',
    multiple: true,
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

const Tab1 = () => {
    const [content, setContent] = useState('');
    const [checkBtn, setCheckBtn] = useState(false);
    const [form] = Form.useForm();
    const [coverImageList, setCoverImageList] = useState([]);
    const [highlightImageList, setHighlightImageList] = useState([]);

    const handlePostNews = async () => {
        try {
            const formValues = form.getFieldsValue();
            const response = await axios.post('http://localhost:3001/tintuc', {
                title: formValues.title,
                description: formValues.description,
                content: content,
                highlight: formValues.highlight,
                category: formValues.category,
                coverImage: coverImageList.map(file => file.originFileObj),
                highlightImage: highlightImageList.map(file => file.originFileObj)
            });
            if (response.status === 201) {
                message.success('Đăng tin tức thành công!');
            }
        } catch (error) {
            message.error('Đăng tin tức thất bại!');
            console.error('Error posting news:', error);
        }
    };

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ 'size': [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['clean']
        ]
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
    ];

    const handleCoverImageChange = ({ fileList }) => setCoverImageList(fileList);
    const handleHighlightImageChange = ({ fileList }) => setHighlightImageList(fileList);

    return (
        <div className='absolute w-[100%]'>
            <div className='relative flex flex-row'>
                <div className='basis-2/3'>
                    <Form
                        form={form}
                        name="form-left"
                        layout="vertical"
                    >
                        <Form.Item
                            name="title"
                            label="Tiêu đề tin tức"
                            rules={[
                                {
                                    required: true,
                                    message: 'Tiêu đề không được để trống'
                                }
                            ]}
                        >
                            <Input
                                placeholder='Tin tức tiêu đề'
                                className='h-[42px]'
                            />
                        </Form.Item>

                        <Form.Item
                            name='description'
                            label="Mô tả ngắn"
                        >
                            <TextArea
                                placeholder="Mô tả ngắn"
                                autoSize={{ minRows: 2, maxRows: 4 }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="content"
                            label="Nội dung tin tức"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nội dung không được để trống',
                                },
                            ]}
                        >
                            <ReactQuill
                                className='border border-[#ccc] rounded-lg'
                                theme="snow"
                                value={content}
                                onChange={setContent}
                                modules={modules}
                                formats={formats}
                                placeholder='Nội dung tin tức'
                            />
                        </Form.Item>
                    </Form>
                </div>
                <div className='relative basis-1/3 '>
                    <div className='px-8'>
                        <Form
                            layout='vertical'
                            name='form-right'
                        >
                            <Form.Item
                                name='highlight'
                                label="Đánh dấu tin nổi bật"
                            >
                                <ConfigProvider
                                    theme={{ token: { colorPrimary: '#FF6838' } }}
                                >
                                    <Switch
                                        primary
                                        defaultChecked
                                    />
                                </ConfigProvider>
                            </Form.Item>
                            <Form.Item
                                name='category'
                                label='Category'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Category không được để trống'
                                    }
                                ]}
                            >
                                <Select
                                    placeholder="Chọn thể loại"
                                />
                            </Form.Item>
                            <Form.Item
                                name='coverImage'
                                label='Ảnh bìa tin tức'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Ảnh bìa không được để trống'
                                    }
                                ]}
                            >
                                <Dragger
                                    {...props}
                                    fileList={coverImageList}
                                    onChange={handleCoverImageChange}
                                >
                                    <div>
                                        <div className='flex justify-center'>
                                            <img src={imgUpload} alt="" width={50} />
                                        </div>
                                        <div className='flex justify-center mt-2'>
                                            Tải file hoặc kéo và thả
                                        </div>
                                        <div className='flex justify-center text-zinc-400 text-[12px]'>
                                            Kích thước khuyến nghị: 250 x 250 pixels
                                        </div>
                                    </div>
                                </Dragger>
                            </Form.Item>
                            <Form.Item
                                name='highlightImage'
                                label='Ảnh nổi bật'
                            >
                                <Dragger
                                    {...props}
                                    fileList={highlightImageList}
                                    onChange={handleHighlightImageChange}
                                >
                                    <div>
                                        <div className='flex justify-center'>
                                            <img src={imgUpload} alt="" width={50} />
                                        </div>
                                        <div className='flex justify-center mt-2'>
                                            Tải file hoặc kéo và thả
                                        </div>
                                        <div className='flex justify-center text-zinc-400 text-[12px]'>
                                            Kích thước khuyến nghị: 800 x 100 pixels
                                        </div>
                                    </div>
                                </Dragger>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className=' absolute bottom-6 flex justify-center w-[100%] px-3 '>
                        <Button
                            type='primary'
                            className={`w-[100%] ${checkBtn ? null : 'opacity-50'}`}
                            onClick={handlePostNews}
                        >
                            Đăng tin tức
                        </Button>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Tab1;
