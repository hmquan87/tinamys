import React from 'react'
import { Form, Input, Select, Button } from 'antd'
import { FaCamera } from "react-icons/fa";

const EditCompany = () => {
    return (
        <div className='w-[100%] flex justify-center'>
            <div className='w-[45%] mt-8 absolute'>
                <div className='relative text-[24px] font-semibold mb-3'>
                    Thông tin công ty
                </div>
                <div className='relative border rounded-xl'>
                    <div className=' relative py-6 px-5 '>
                        <div className='relative flex justify-center'>
                            <div className='relative w-[180px] h-[180px] bg-purple-700 rounded-full mt-4' >
                                <div className=' absolute bottom-1 right-2 text-[20px] bg-slate-200 p-2 rounded-full '>
                                    <FaCamera />

                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row pt-20'>
                            <div className='basis-1/2 mr-4'>
                                <Form
                                    layout='vertical'
                                    name='form-left'
                                >
                                    <Form.Item
                                        name='company'
                                        label='Tên công ty'
                                        className='custom-label-class'
                                        rules={[
                                            {
                                                required: true,
                                                message: ''
                                            }
                                        ]}
                                    >
                                        <Input
                                            className='h-[42px]'
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name='workSpace'
                                        label='Loại không gian làm việc'
                                        className='custom-label-class'
                                        rules={[
                                            {
                                                required: true,
                                                message: ''
                                            }
                                        ]}
                                    >
                                        <Select
                                            showSearch
                                            className='h-[42px]'
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name='phone'
                                        label='Số điện thoại'
                                        className='custom-label-class'
                                        rules={[
                                            {
                                                required: true,
                                                message: ''
                                            }
                                        ]}
                                    >
                                        <Select
                                            showSearch
                                            className='h-[42px]'
                                        />
                                    </Form.Item>
                                </Form>
                            </div>
                            <div className='basis-1/2'>
                                <Form
                                    name='form-right'
                                    layout='vertical'
                                >
                                    <Form.Item
                                        className='custom-label-class'
                                        name='website'
                                        label='Website'
                                    >   
                                        <Input
                                            className='h-[42px]'
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        className='custom-label-class'
                                        name='email'
                                        label='Email'
                                    >
                                        <Input
                                            className='h-[42px]'
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name='person'
                                        label='Số lượng nhân sự'
                                        className='custom-label-class'
                                        rules={[
                                            {
                                                required: true,
                                                message: ''
                                            }
                                        ]}
                                    >
                                        <Select
                                            showSearch
                                            className='h-[42px]'
                                        />
                                    </Form.Item>
                                </Form>

                            </div>
                        </div>
                        <div className='relative flex justify-end'>
                                <Button
                                    type='primary'
                                    className='text-[14px]'
                                >
                                    Lưu thông tin
                                </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditCompany