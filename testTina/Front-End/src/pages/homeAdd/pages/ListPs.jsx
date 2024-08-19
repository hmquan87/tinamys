import React, { useEffect, useState } from 'react'
import { Button, Input, Modal, Tree, Form, Select, Checkbox, Avatar, Dropdown, Menu, Tag } from "antd";
import { SearchOutlined, TableOutlined, PlusOutlined } from '@ant-design/icons'
import axios from 'axios';
import '../../style/css/asset.css'
import { GrClose } from "react-icons/gr";

const plainOptions = ['Quản lý nhóm', 'Quản lý chức vụ', 'Quản lý nhân sự', 'Quản lý tin tức', 'Quản lý công ty'];
const defaultCheckedList = ['Quản lý nhóm', 'Quản lý chức vụ', 'Quản lý nhân sự', 'Quản lý tin tức'];
const items = [
    {
        label: 'Xem chi tiết',
        key: '0',
    },
    {
        label: 'Sửa chức vụ',
        key: '1',
    },
    {
        label: 'Xóa chức vụ',
        key: '2',
    },
];
const ListPs = () => {
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [checkedList, setCheckedList] = useState([]);
    const [personData, setPersonData] = useState([]);
    const [checkedMembers, setCheckedMembers] = useState([]);
    const [checkAllMembers, setCheckAllMembers] = useState(false);
    const [addForm] = Form.useForm();
    const [idPerson, setIdPerson] = useState([]);
    console.log('idPerson: ', idPerson);
    console.log('checkList: ', checkedList)

    const onChange = (option) => {
        const currentIndex = checkedList.indexOf(option);
        const newCheckedList = [...checkedList];

        if (currentIndex === -1) {
            newCheckedList.push(option);
        } else {
            newCheckedList.splice(currentIndex, 1);
        }

        setCheckedList(newCheckedList);
    };
    const onChangeMember = (memberId) => {
        const currentIndex = checkedMembers.indexOf(memberId);
        const newCheckedMembers = [...checkedMembers];
        const newidPerson = [...idPerson];

        if (currentIndex === -1) {
            newCheckedMembers.push(memberId);
            newidPerson.push(memberId);
        } else {
            newCheckedMembers.splice(currentIndex, 1);
            const indexInidPerson = newidPerson.indexOf(memberId);
            if (indexInidPerson !== -1) {
                newidPerson.splice(indexInidPerson, 1);
            }
        }

        setCheckedMembers(newCheckedMembers);
        setIdPerson(newidPerson);
        setCheckAllMembers(newCheckedMembers.length === personData.length);
    };

    const onCheckAllMembersChange = () => {
        if (checkAllMembers) {
            setCheckedMembers([]);
            setIdPerson([]);
        } else {
            const allMemberIds = personData.map(member => member.id);
            setCheckedMembers(allMemberIds);
            setIdPerson(allMemberIds);
        }
        setCheckAllMembers(!checkAllMembers);
    };

    const [dataGroup1, setDataGroup1] = useState([]);
    const [dataGroup2, setDataGroup2] = useState([]);
    const [dataGroup3, setDataGroup3] = useState([]);
    const [treeData, setTreeData] = useState([]);

    const [dataPosition, setDataPosition] = useState([]);
    const fetchDataPosition = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/getPosition`);
            const data = res.data;
            setDataPosition(data.position)
        } catch (error) {
            console.error('Đã xảy ra lỗi lấy dataPerson khi gọi API:', error);
        }
    }
    const [groupData, setGroupData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getDataGr');
                const data = response.data;
                setGroupData(data.group);
                if (data.success) {
                    localStorage.setItem('group1', JSON.stringify(data.group));
                    const newData1 = [];
                    const newData2 = [];
                    const newData3 = [];

                    for (var i = 0; i < data.group.length; i++) {
                        if (data.group[i].leverGr === '1') {
                            newData1.push(data.group[i])
                        } else if (data.group[i].leverGr === '2') {
                            newData2.push(data.group[i])
                        } else newData3.push(data.group[i])
                    }

                    setDataGroup1(newData1);
                    setDataGroup2(newData2);
                    setDataGroup3(newData3);
                } else {
                    console.error('Đã xảy ra lỗi khi lấy dữ liệu từ server:', data.error);
                }
            } catch (error) {
                console.error('Đã xảy ra lỗi khi gọi API:', error);
            }
        }
        const fetchDataPerson = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/getDataPerson`);
                const data = res.data.person;
                setPersonData(data);
                setCheckAllMembers(false);
            } catch (error) {
                console.error('Đã xảy ra lỗi lấy dataPerson khi gọi API:', error);
            }
        }

        fetchData();
        fetchDataPerson();
        fetchDataPosition();
    }, []);

    useEffect(() => {
        const newTree = dataGroup1.map(item => ({
            title: item.valueNamegr,
            key: item.id,
            children: dataGroup2.filter(item1 => item1.valueInheritance === item.valueNamegr).map(items => ({
                title: items.valueNamegr,
                key: items.id,
                children: dataGroup3.filter(item2 => item2.valueInheritance === items.valueNamegr).map(itemss => ({
                    title: itemss.valueNamegr,
                    key: itemss.id,
                }))
            }))
        }));
        setTreeData(newTree);
    }, [dataGroup1, dataGroup2]);

    const handleOpenModal = () => {

        setCheckedList(defaultCheckedList)
        setCheckAllMembers(false);
        addForm.setFieldsValue({
            position: '',
            group: '',
            option: checkedList,
            idPerson: idPerson,
        });
        setOpen(true);
    };

    const handleAddPosition = async (value) => {
        try {
            value.idPersion = idPerson;
            const response = await axios.post(`http://localhost:3001/addPosition?name=${value.position}&group=${value.group}&permissions=${value.option}&idPersion=${value.idPersion}`);
            setOpen(false)
            await fetchDataPosition();
            console.log('return: ', value);
            console.log('testDataPS: ', response);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleEditPosition = async (value) => {

    }
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    const [checkSearch, setCheckSearch] = useState(false);
    const [checkID, setCheckID] = useState();


    const handleDelete = async (id) => {
        try {
            const res = await axios.post(`http://localhost:3001/deletePosition?id=${id}`)
            fetchDataPosition();
        } catch (error) {

        }
    }


    const handleClick = (key, id) => {
        console.log('key: ', key);
        console.log('id: ', id);
        if (key === '0') {
            setOpen1(true);
            setCheckID(id);
        } else if (key === '1') {
            setOpen2(true);
            setCheckID(id);
            const position = dataPosition.find(position => position.id === id);
            if (position) {
                setCheckedList(position.permissions);
                console.log("trummafia: ", position.permissions);
            }
        } else if (key === '2') {
            handleDelete(id);
            setCheckID(id);
        }


    }

    console.log('tesstneww: ', checkedList);


    return (
        <div className='listPs h-[100%] relative'>
            <div className="bg-white flex flex-row h-[100%]">
                <div className="basis-1/6 border-r border-zinc-300">
                    <div className="flex items-center p-[10px]">
                        <div className="w-[3px] h-4 bg-green-400 mr-1"></div>
                        <div className="text-[18px] font-semibold text-gray-700">Danh sách nhóm</div>
                    </div>
                    <div className='ml-5'>
                        <Tree
                            treeData={treeData}
                            showLine
                        />
                    </div>
                </div>
                <div className="basis-5/6 p-[10px]">
                    <div className='flex justify-between'>
                        <div className='w-[100%]'>
                            <div className="flex items-center ">
                                <div className="w-[3px] h-4 bg-green-400 mr-1"></div>
                                <div className="text-[18px] font-semibold text-gray-700">Danh sách chức vụ</div>
                            </div>
                        </div>
                        <div className='mr-5'>
                            <div className="flex items-center ">
                                <div className='mr-6'>
                                    <Input
                                        className={`h-[36px] border-none bg-inherit ${checkSearch ? 'w-[190px]' : 'w-0'}`}
                                        placeholder="Tìm kiếm"
                                        prefix={<SearchOutlined className="text-[23px]" onClick={() => setCheckSearch(!checkSearch)} />}
                                    />
                                </div>
                                <div className='flex items-center font-semibold text-gray-500 bg-zinc-100 p-[5px] rounded-sm mr-3'>
                                    <div className='text-[20px]'>
                                        <TableOutlined />
                                    </div>
                                    <div className='text-[14px] ml-2'>Bảng</div>
                                </div>
                                <div className=''>
                                    <Button
                                        className='h-[36px] w-[134px]'
                                        type='primary'
                                        onClick={handleOpenModal}
                                    >
                                        <div className='flex items-center justify-center text-[14px]'>
                                            <div className='mr-2'>
                                                <PlusOutlined />
                                            </div>
                                            <div>Thêm chức vụ</div>
                                        </div>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-3 gap-4 relative w-[98.5%] mt-4'>
                        {dataPosition.map(data =>

                            <div className='border rounded-sm px-3 pb-3'>
                                <div className='flex justify-end'>
                                    <Dropdown
                                        overlay={
                                            <Menu>
                                                {items.map(item =>
                                                    <Menu.Item
                                                        key={item.key}
                                                        onClick={e => handleClick(e.key, data.id)}
                                                    >
                                                        {item.label}
                                                    </Menu.Item>
                                                )}
                                            </Menu>}
                                        trigger={['click']}
                                        placement="bottomRight"
                                    >
                                        <div className='text-[24px] flex items-center'>...</div>
                                    </Dropdown>
                                </div>
                                <div>
                                    {data.name}
                                </div>
                                <div className='flex'>
                                    <span className='mr-2'>Quyền:</span>
                                    <div className=''>
                                        {data.permissions.map(item =>
                                            <Tag bordered={false} className='mb-2' color="processing">
                                                {item}
                                            </Tag>
                                        )}
                                    </div>
                                </div>
                                <div className='flex'>
                                    <span className='mr-2'>Thành viên:</span>
                                    <Avatar.Group
                                        maxCount={5}
                                        maxStyle={{
                                            color: '#f56a00',
                                            backgroundColor: '#fde3cf',
                                        }}
                                    >
                                        {data.idPersion.map(id => {
                                            const person = personData.find(person => person.id === id);
                                            return person ? (

                                                <Avatar key={id} className='mb-2' style={{ backgroundColor: getRandomColor() }}>
                                                    {person.name.slice(0, 2)}
                                                </Avatar >

                                            ) : 0;
                                        })}
                                    </Avatar.Group>
                                </div>
                            </div>

                        )}
                    </div>
                </div>
            </div>

            {/* modal add position */}
            <Modal
                className='bg-white rounded-lg'
                title={
                    <div className="flex items-center justify-between pb-2 border-b-2 border-[#dcdcdc]">
                        <div className="w-[10px]"></div>
                        <div>Thêm chức vụ</div>
                        <div>
                            <GrClose onClick={() => setOpen(false)} />
                        </div>
                    </div>
                }
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={650}
            >
                <div className='mt-[-30px] w-[600px]'>
                    <Form
                        form={addForm}
                        layout='vertical'
                        name='form'
                        onFinish={handleAddPosition}
                    >

                        <div className='flex flex-row'>
                            <div className='basis-1/2'>
                                <Form.Item
                                    label="Tên chức vụ"
                                    name="position"
                                    className='custom-label-class'
                                    rules={[
                                        {
                                            required: true
                                        }
                                    ]}
                                >
                                    <Input className='h-[48px]' />
                                </Form.Item>
                                <Form.Item
                                    label="Nhóm"
                                    name="group"
                                    className='custom-label-class'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn chức vụ!'
                                        }
                                    ]}
                                >
                                    <Select placeholder="Chọn Chức vụ" className='h-[48px]'>
                                        {groupData.map(gr =>
                                            <Select.Option value={gr.valueNamegr}>{gr.valueNamegr}</Select.Option>
                                        )}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Quyền"
                                    name='option'
                                    className='custom-label-class'
                                >

                                    <Checkbox.Group>
                                        <div className='flex flex-col'>
                                            {plainOptions.map((option) => (
                                                <Checkbox
                                                    key={option}
                                                    value={option}
                                                    checked={checkedList.includes(option)}
                                                    onChange={() => onChange(option)}
                                                >
                                                    {option}
                                                </Checkbox>
                                            ))}
                                        </div>

                                    </Checkbox.Group>
                                </Form.Item>
                                <Form.Item className='mt-[180px]'>
                                    <div className='flex'>
                                        <Button
                                            type='primary'
                                            danger
                                            className='w-[136px] h-[44px] text-[14px]'
                                            onClick={() => setOpen(false)}
                                        >
                                            Hủy
                                        </Button>
                                        <Button
                                            type='primary'
                                            className='w-[160px] h-[44px] ml-5 text-[14px]'
                                            htmlType='submit'
                                        >
                                            Thêm chức vụ
                                        </Button>
                                    </div>
                                </Form.Item>
                            </div>
                            <div className='basis-1/2 ml-3'>
                                <Form.Item>
                                    <div className='flex justify-between'>
                                        <div className='text-[16px] font-semibold text-gray-700'>
                                            Danh sách thành viên ({personData.length})
                                        </div>
                                        <div className='mb-2'>
                                            <Checkbox
                                                checked={checkAllMembers}
                                                onChange={onCheckAllMembersChange}
                                            >
                                            </Checkbox>
                                        </div>
                                    </div>
                                    <div className='flex flex-col max-h-[450px] overflow-y-auto'>
                                        {personData.map(item =>
                                            <div key={item.id} className='mb-3 flex justify-between items-center'>

                                                <div className='flex items-center'>
                                                    <div>
                                                        <Avatar
                                                            size={42}
                                                            style={{ backgroundColor: getRandomColor() }}
                                                        >
                                                            {item.name.slice(0, 2)}
                                                        </Avatar>
                                                    </div>
                                                    <div className='ml-2'>{item.name}</div>
                                                </div>
                                                <div>
                                                    <Checkbox
                                                        checked={checkedMembers.includes(item.id)}
                                                        onChange={() => onChangeMember(item.id)}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Form.Item>
                            </div>
                        </div>


                    </Form>
                </div>
            </Modal>

            {/* modal view position */}
            <Modal
                className='bg-white rounded-lg'
                title={
                    <div className="flex items-center justify-between pb-2 border-b-2 border-[#dcdcdc]">
                        <div className="w-[10px]"></div>
                        <div>Xem chi tiết</div>
                        <div>
                            <GrClose onClick={() => setOpen1(false)} />
                        </div>
                    </div>
                }
                centered
                open={open1}
                onOk={() => setOpen1(false)}
                onCancel={() => setOpen1(false)}
                width={650}
            >
                {dataPosition.map(item =>
                (item.id === checkID &&
                    <div className='mt-[-30px] w-[600px]'>
                        <Form
                            layout='vertical'
                            name='form'
                        >

                            <div className='flex flex-row'>
                                <div className='basis-1/2'>
                                    <Form.Item
                                        label="Tên chức vụ"
                                        name="position"
                                        className='custom-label-class'

                                    >
                                        <Input className='h-[48px]' placeholder={item.name} disabled />
                                    </Form.Item>
                                    <Form.Item
                                        label="Nhóm"
                                        name="group"
                                        className='custom-label-class'

                                    >
                                        <Select placeholder={item.group} className='h-[48px]' disabled>

                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        label="Quyền"
                                        name='option'
                                        className='custom-label-class'
                                    >
                                        <div className='flex flex-col'>
                                            {item.permissions.map(item =>
                                                <div>
                                                    {item}
                                                </div>
                                            )}
                                        </div>
                                    </Form.Item>
                                    <Form.Item className='mt-[180px]'>

                                        <Button
                                            type='primary'
                                            className='w-[160px] h-[44px] ml-5 text-[14px]'
                                            htmlType='submit'
                                        >
                                            Chỉnh sửa
                                        </Button>

                                    </Form.Item>
                                </div>
                                <div className='basis-1/2 ml-10'>
                                    <Form.Item>
                                        <div className=''>
                                            <div className='text-[16px] font-semibold text-gray-700'>
                                                Danh sách thành viên ({item.idPersion.length})
                                            </div>

                                        </div>
                                        <div className='flex flex-col max-h-[450px] overflow-y-auto mt-2'>
                                            {item.idPersion.map(id => {
                                                const person = personData.find(person => person.id === id);
                                                return person ?
                                                    <div className='mb-2 flex'>
                                                        <div>
                                                            <Avatar
                                                                size={45}
                                                                style={{ backgroundColor: getRandomColor() }}
                                                            >
                                                                {person.name.slice(0, 2)}
                                                            </Avatar>
                                                        </div>
                                                        <div className='ml-3'>
                                                            <div>
                                                                {person.name}
                                                            </div>
                                                            <div>
                                                                {person.position}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    : null
                                            }
                                            )}
                                        </div>
                                    </Form.Item>
                                </div>
                            </div>


                        </Form>
                    </div>)

                )}
            </Modal>

            {/* Modal EditPosition */}
            <Modal
                className="bg-white rounded-lg"
                title={
                    <div className=" flex items-center justify-between pb-2 border-b-2 border-[#dcdcdc]" >
                        <div className="w-[10px]">

                        </div>
                        <div>
                            Sửa chức vụ
                        </div>
                        <div>
                            <GrClose onClick={() => setOpen2(false)} />
                        </div>
                    </div>
                }
                centered
                open={open2}
                onOk={() => setOpen2(false)}
                onCancel={() => setOpen2(false)}
                width={650}

            >
                {dataPosition.map(position =>
                    <>
                        {position.id === checkID &&
                            <div className='mt-[-30px] w-[600px]'>
                                <Form
                                    form={addForm}
                                    layout='vertical'
                                    name='form'
                                    onFinish={handleEditPosition}
                                >
                                    <div className='flex flex-row'>
                                        <div className='basis-1/2'>
                                            <Form.Item
                                                label='Tên chức vụ'
                                                name="position"
                                                className='custom-label-class'
                                                rules={[
                                                    {
                                                        required: true
                                                    }
                                                ]}
                                            >
                                                <Input className='h-[48px]' defaultValue={position.name} />
                                            </Form.Item>
                                            <Form.Item
                                                label="Nhóm"
                                                name="group"
                                                className='custom-label-class'
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Vui lòng chọn chức vụ!'
                                                    }
                                                ]}
                                            >
                                                <Select placeholder={position.group} className='h-[48px]' disabled>

                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                                label="Quyền"
                                                name='option'
                                                className='custom-label-class'
                                            >

                                                <Checkbox.Group>
                                                    <div className='flex flex-col'>
                                                        {plainOptions.map((option) => (
                                                            <Checkbox
                                                                key={option}
                                                                value={option}
                                                                checked={checkedList.includes(option)}
                                                                onChange={() => onChange(option)}
                                                            >
                                                                {option}
                                                            </Checkbox>
                                                        ))}
                                                    </div>
                                                </Checkbox.Group>
                                            </Form.Item>
                                            <Form.Item className='mt-[180px]'>
                                                <div className='flex'>

                                                    <Button
                                                        type='primary'
                                                        className='w-[160px] h-[44px] ml-5 text-[14px]'
                                                        htmlType='submit'
                                                    >
                                                        Lưu chỉnh sửa
                                                    </Button>
                                                </div>
                                            </Form.Item>
                                        </div>
                                        <div className='basis-1/2 ml-3'>
                                            <Form.Item>
                                                <div className='flex justify-between'>
                                                    <div className='text-[16px] font-semibold text-gray-700'>
                                                        Danh sách thành viên ({personData.length})
                                                    </div>
                                                    <div className='mb-2'>
                                                        <Checkbox
                                                            checked={checkAllMembers}
                                                            onChange={onCheckAllMembersChange}
                                                        >
                                                        </Checkbox>
                                                    </div>
                                                </div>
                                                <div className='flex flex-col max-h-[450px] overflow-y-auto'>
                                                    {personData.map(item =>
                                                        <div key={item.id} className='mb-3 flex justify-between items-center'>

                                                            <div className='flex items-center'>
                                                                <div>
                                                                    <Avatar
                                                                        size={42}
                                                                        style={{ backgroundColor: getRandomColor() }}
                                                                    >
                                                                        {item.name.slice(0, 2)}
                                                                    </Avatar>
                                                                </div>
                                                                <div className='ml-2'>{item.name}</div>
                                                            </div>
                                                            <div>
                                                                <Checkbox
                                                                    checked={checkedMembers.includes(item.id)}
                                                                    onChange={() => onChangeMember(item.id)}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </Form.Item>
                                        </div>
                                    </div>


                                </Form>
                            </div>
                        }
                    </>
                )}

            </Modal>
        </div>
    );
}

export default ListPs;
