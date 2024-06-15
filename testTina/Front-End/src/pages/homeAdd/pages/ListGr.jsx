import { Button, Input, Layout, Modal, Upload, Select, Checkbox, Dropdown, Space, Menu, Avatar, Transfer } from "antd"
import React, { useState, useEffect } from "react"
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'
import img1 from '../../style/img/imgListgr1.svg'
import { GrClose } from "react-icons/gr";
import '../../style/css/asset.css'
import axios from 'axios';
import { FaRegEdit } from "react-icons/fa";

const { TextArea } = Input;

const itemss = [
    {
        label: 'Xem chi tiết',
        key: '0',
    },
    {
        label: 'Sửa nhóm',
        key: '1',
    },
    {
        label: 'Xóa nhóm',
        key: '2',
    },
];

const data = [
    { lever: '1', key: 'lv1' },
    { lever: '2', key: 'lv2' },
    { lever: '3', key: 'lv3' },
]

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const ListGr = () => {


    const [valueInheritance, setValueInheritance] = useState('');

    const [leverGr, setLeverGr] = useState('')
    const [checkSearch, setCheckSearch] = useState(false)
    const [valueBtn, setValueBtn] = useState('1')
    // console.log(leverGr);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    // const [value, setValue] = useState('');
    const [checkBtn, setCheckBtn] = useState(false);
    const [valueRv, setValueRv] = useState('')
    const [valueNamegr, setValueNamegr] = useState('');
    const [focusValue, setFocusValue] = useState(false)
    const [outsiteValue, setOutsiteValue] = useState(false)
    // const [group1, setGroup1] = useState([]);

    const handleFocus = () => {
        setFocusValue(true)
    }
    const handleBlur = () => {
        setFocusValue(false)
    }
    const handleOutSite = () => {
        if (!valueNamegr) {
            setOutsiteValue(true)
        }
    }


    const [group1Data, setGroup1Data] = useState([]);
    const [checkID, setCheckID] = useState()
    const [member, setMember] = useState(1)
    const [personData, setPersonData] = useState([])
    const [targetKeys, setTargetKeys] = useState([]);
    const [mockData, setMockData] = useState([]);
    const [targetKeys1, setTargetKeys1] = useState([]);
    const [mockData1, setMockData1] = useState([]);
    useEffect(() => {
        const FetchDataPerson = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/getDataPerson`);
                const data = res.data;
                setPersonData(data.person)
            } catch (error) {

            }
        }
        FetchDataPerson();
    }, [])
    console.log('dataGROUP', group1Data);
    const AddPersonToTheGroup = async (target, level, keyIdGroup) => {
        try {
            const res = await axios.post(`http://localhost:3001/addPersonToTheGroup?id=${target}&levelGroup=${level}&keyIdGroup=${keyIdGroup}`)
            const datatransfer = res.data;
            setPersonData(datatransfer.persons)
            console.log('testAPI: ', datatransfer.persons);
        } catch (error) {

        }
    }

    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        const fetchDataPerson = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/getDataPerson`);
                const datatransfer = res.data.person;
                setPersonData(datatransfer);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDataPerson();
    }, []);

    useEffect(() => {
        const updatedDataSource = personData.map((person, index) => ({
            key: index + 1,
            title: `${person.name}`,
            description: `description of content${index + 1}`,
        }));
        setDataSource(updatedDataSource);
        setMockData(dataSource);
    }, [personData]);


    console.log('data:', personData);
    const handleAdd1 = async () => {
        if (leverGr === '1') setValueInheritance('');
        try {
            const res = await axios.post(`http://localhost:3001/addGrLv1`, {
                leverGr: leverGr,
                valueNamegr: valueNamegr,
                valueRv: valueRv,
                valueInheritance: valueInheritance
            });
            if (res.data && res.data.success && Array.isArray(res.data.group)) {
                const newGroupData = res.data.group;
                localStorage.setItem('group1', JSON.stringify(newGroupData));
                AddPersonToTheGroup(targetKeys, leverGr, newGroupData.length)
                setOpen(false);
                setGroup1Data(newGroupData)

            } else {
                console.error(res.data);
            }
        } catch (error) {
            console.error(error);
        }
    };
    const DeleteKeyIdGroup = async (keyIdGroup, groupKey) => {
        try {
            const res = await axios.post(`http://localhost:3001/deleteKeyIdGroup?keyIdGroup=${keyIdGroup}&groupKey=${groupKey}`);
            const dataNew = res.data;
            setPersonData(dataNew.person)
        } catch (error) {

        }
    }
    const handleDelete = async (id) => {
        try {
            const res = await axios.post('http://localhost:3001/deleteGrLv1', { id });
            if (res.data && res.data.success && Array.isArray(res.data.group)) {
                const updatedGroupData = res.data.group;
                DeleteKeyIdGroup(id, leverGr)
                localStorage.setItem('group1', JSON.stringify(updatedGroupData));
                setGroup1Data(updatedGroupData);
            } else {
                console.error(res.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = async (id, valueNamegr, valueRv, arrID) => {

        try {
            const res = await axios.post(`http://localhost:3001/editDataGr?id=${id}&valueNamegr=${valueNamegr}&valueRv=${valueRv}&memberId=${arrID}`)
            const updatedGroupData = res.data.group1;
            console.log('test32123123',updatedGroupData);
            localStorage.setItem('group1', JSON.stringify(updatedGroupData));
            setGroup1Data(updatedGroupData);
            setOpen2(false);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    const handleCheck = (value) => {
        setValueInheritance(value)

    }

    console.log(valueInheritance);

    const handleClick = (key, id) => {
        console.log('key: ', key);
        console.log('id: ', id);
        if (key === '0') {
            setOpen1(true);
            setCheckID(id);
        } else if (key === '1') {
            setOpen2(true);
            setCheckID(id);
        } else if (key === '2') {
            handleDelete(id);
            setCheckID(id);
        }
        const newTargetArray = [];
        const newDataSourceArray = [];
        personData.forEach(person => {
            if (Array.isArray(person.keyIdGroup) && person.keyIdGroup.includes(id)) {
                newTargetArray.push(person);
            } else { newDataSourceArray.push(person); };
        });
        const updatedDataSource = newDataSourceArray.map((person, index) => ({
            key: index + 1,
            title: `${person.name}`,
            description: `description of content${index + 1}`,
        }));
        const updatedTargetSource = newTargetArray.map((person, index) => ({
            key: index + 1,
            title: `${person.name}`,
            description: `description of content${index + 1}`,
        }));
        setMockData1(updatedDataSource)
        setTargetKeys1(updatedTargetSource)

    }

    console.log(checkID);

    useEffect(() => {

        const storedData = localStorage.getItem("group1");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setGroup1Data(parsedData);
        }
    }, []);

    const handleItemClick = (key) => {
        let newTargetKeys = [...targetKeys];
        if (newTargetKeys.includes(key)) {
            newTargetKeys = newTargetKeys.filter(targetKey => targetKey !== key);
        } else {
            newTargetKeys.push(key);
        }
        setTargetKeys(newTargetKeys);
        const sourceKeys = mockData.filter(item => !newTargetKeys.includes(item.key));
        console.log("Source Data:", sourceKeys);
        console.log("Target Data:", newTargetKeys);
    };
    console.log('test Target Data: ', targetKeys);
    const renderItem = (item) => {
        return {
            label: (
                <div className="custom-item" onClick={() => handleItemClick(item.key)}>
                    <div className='flex'>
                        <div className='h-[45px] w-[45px] bg-red-400 rounded-full flex justify-center items-center text-[16px] text-white'>
                            {item.title.slice(0, 2)}
                        </div>
                        <div className='flex items-center ml-5'>
                            {item.title}
                        </div>
                    </div>
                </div>
            ),
            value: item.title,
        };
    };
    const handleItemClick1 = (key) => {
        let newTargetKeys1 = [...targetKeys1];
        if (newTargetKeys1.includes(key)) {
            newTargetKeys1 = newTargetKeys1.filter(targetKey1 => targetKey1 !== key);
        } else {
            newTargetKeys1.push(key);
        }
        setTargetKeys1(newTargetKeys1);
        const sourceKeys1 = mockData1.filter(item => !newTargetKeys1.includes(item.key));
        console.log("Source Data:", sourceKeys1);
        console.log("Target Data:", newTargetKeys1);
    };
    console.log('test Target Data: ', targetKeys1);
    const renderItem1 = (item) => {
        return {
            label: (
                <div className="custom-item" onClick={() => handleItemClick1(item.key)}>
                    <div className='flex'>
                        <div className='h-[45px] w-[45px] bg-red-400 rounded-full flex justify-center items-center text-[16px] text-white'>
                            {item.title.slice(0, 2)}
                        </div>
                        <div className='flex items-center ml-5'>
                            {item.title}
                        </div>
                    </div>
                </div>
            ),
            value: item.title,
        };
    };
    const MAX_DISPLAY_PERSONS = 8;
    const displayData = personData.slice(0, MAX_DISPLAY_PERSONS);
    const remainingCount = personData.length - MAX_DISPLAY_PERSONS;
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };


    const countMembers = (groupId) => {
        console.log('groupId: ', groupId);
        var count = 0;
        // const newArray = [];
        // const newTarget = [];
        personData.forEach(person => {
            if (Array.isArray(person.keyIdGroup) && person.keyIdGroup.includes(groupId)) {
                count++;
                // newArray.push(person);
            }
            // else { newTarget.push(person); };
        });
        return count;
    };
    const arrID = [1, 3, 4];

    return (
        <>
            <div className="flex ">
                <Layout className="w-[80%] bg-white">
                    <div className="pl-[10px] mt-2 flex justify-between bg-white">
                        <div className="flex items-center p-[10px] ">
                            <div className="w-[3px] h-4 bg-green-400 mr-1">

                            </div>
                            <div className="text-[18px] font-semibold text-gray-700">
                                Danh sách nhóm
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="">
                                <Input
                                    className={`h-[36px]  border-none bg-inherit  ${checkSearch ? 'w-[190px]' : 'w-0'}`}

                                    placeholder="Tìm kiếm"
                                    prefix={<SearchOutlined className="text-[23px]" onClick={() => setCheckSearch(!checkSearch)} />}
                                />
                            </div>
                            <div className="flex items-center rounded-md ml-5 bg-blue-100 p-1 ">
                                <img src={img1} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row mt-3 bg-white">
                        {data.map(item => (
                            <div className="basis-1/3 justify-center flex ">
                                <div className="w-[100%] ">
                                    <div className="flex justify-center text-[16px] font-semibold text-gray-700">
                                        Cấp {item.lever}
                                    </div>
                                    <div className="py-3">
                                        {group1Data.map(items => (
                                            <div className=" w-[100%]">
                                                {items.leverGr === item.lever &&
                                                    <div className="flex justify-center w-[100%] mb-3">
                                                        <div className="w-[90%] flex flex-row p-2 border-zinc-500 border">
                                                            <div className="basis-1/3 mr-2">
                                                                <div className="h-[100px] w-[100px] bg-red-300 text-[50px] flex items-center justify-center text-white">
                                                                    {items.valueNamegr}
                                                                </div>
                                                            </div>
                                                            <div className="basis-2/3 flex justify-between">
                                                                <div>
                                                                    <div className="font-normal text-black text-[18px]">
                                                                        {items.valueNamegr}
                                                                    </div>
                                                                    <div className="mt-4 text-zinc-500">
                                                                        {countMembers(items.id)} thành viên
                                                                    </div>
                                                                </div>
                                                                <div className="">
                                                                    <Dropdown
                                                                        overlay={
                                                                            <Menu>
                                                                                {itemss.map(item =>
                                                                                    <Menu.Item
                                                                                        key={item.key}
                                                                                        onClick={e => handleClick(e.key, items.id)}
                                                                                    >
                                                                                        {item.label}
                                                                                    </Menu.Item>
                                                                                )}
                                                                            </Menu>}
                                                                        trigger={['click']}
                                                                        placement="bottomRight"
                                                                    >
                                                                        <Space>...</Space>
                                                                    </Dropdown>


                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        ))}

                                    </div>
                                    <div className="flex justify-center items-center">
                                        <Button
                                            className="w-[90%] flex justify-center items-center  border-blue-500 rounded-sm "
                                            type="link"
                                            onClick={() => { setValueBtn(item.key); setOpen(true); setLeverGr(item.lever) }}
                                        >
                                            <div className="mr-2  font-thin">
                                                <PlusOutlined />
                                            </div>
                                            <div className="text-[18px] font-normal">
                                                Thêm nhóm
                                            </div>
                                        </Button>
                                    </div>

                                </div>
                            </div>
                        ))}


                    </div>

                </Layout>
                <Layout className="mt-2 ml-[20px] p-[10px] bg-white">
                    <div className="text-[18px] font-semibold text-gray-700 ">
                        Danh sách nhân viên ({personData.length})

                    </div>
                    <div className="mt-3">
                        <Input
                            className="w-[100%]"
                            prefix={<SearchOutlined />}
                            placeholder="Tìm kiếm"
                        />
                    </div>
                    <div className="flex flex-col">
                        {displayData.map(person =>
                            <div className="flex flex-row mt-4" key={person.id}>
                                <div className="basis-1/6">
                                    <Avatar
                                        size={45}
                                        style={{ backgroundColor: getRandomColor() }}
                                    >
                                        {person.name.slice(0, 2)}
                                    </Avatar>
                                </div>
                                <div className="basis-3/4 flex flex-col">
                                    <div className="mt-1">
                                        {person.name}
                                    </div>
                                    <div>
                                        {person.position}
                                    </div>
                                </div>
                            </div>
                        )}
                        {remainingCount > 0 &&
                            <div className="flex flex-row mt-4">
                                <Avatar.Group
                                    maxCount={8}
                                    maxStyle={{
                                        color: '#f56a00',
                                        backgroundColor: '#fde3cf',
                                    }}
                                    size={45}
                                >
                                    {personData.map(item =>
                                        <Avatar

                                            style={{ backgroundColor: getRandomColor() }}
                                        >
                                            {item.name.slice(0, 2)}
                                        </Avatar>
                                    )}
                                </Avatar.Group>
                            </div>
                        }
                    </div>
                </Layout>

            </div>
            {/* model1 */}
            <Modal
                className="bg-white rounded-lg"
                title={
                    <div className=" flex items-center justify-between pb-2 border-b-2 border-[#dcdcdc]" >
                        <div className="w-[10px]">

                        </div>
                        <div>
                            Thêm nhóm
                        </div>
                        <div>
                            <GrClose onClick={() => setOpen(false)} />
                        </div>
                    </div>
                }
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={976}

            >
                <div className="flex flex-row w-[100%]">
                    <div className=" basis-2/5" >
                        <div className="flex justify-center">
                            <div >
                                <Upload
                                    className="test"
                                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                    listType="picture-card"
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                >
                                    {fileList.length >= 1 ? null :
                                        <button
                                            style={{
                                                border: 0,
                                                background: 'none',
                                                width: 300,
                                                height: 300,
                                            }}
                                            type="button"
                                        >

                                            Tải ảnh lên
                                            <br />
                                            Kích thước khuyến khích: 250 pixels
                                        </button>
                                    }
                                </Upload>
                            </div>
                        </div>
                        <div>
                            <div className="text-[16px] text-[#242424] font-semibold">
                                Tên nhóm <b className="text-red-600">*</b>
                            </div>
                            <div>
                                <Input
                                    className="h-[48px] py-[4px] px-[11px]"
                                    onFocus={handleFocus}
                                    onBlur={() => { handleBlur(); handleOutSite() }}
                                    value={valueNamegr}
                                    onChange={e => { setValueNamegr(e.target.value); setCheckBtn(true) }}
                                    allowClear
                                />
                            </div>
                            <div className={`text-[14px] text-red-400 ${outsiteValue && !valueNamegr ? '' : 'hidden'}`}>
                                Tên nhóm không được để trống
                            </div>
                        </div>
                        <div className="mt-2">
                            <div className="text-[16px] text-[#242424] font-semibold">
                                Nhóm quản lý
                            </div>
                            <div >
                                <Select
                                    className="h-[48px]"
                                    placeholder="Nhóm quản lý"
                                    disabled={leverGr !== '1' ? false : true}
                                    onChange={handleCheck}
                                    allowClear
                                >
                                    {leverGr === '2' ?
                                        <>
                                            {group1Data.map(item =>
                                                <>
                                                    {item.leverGr === '1' ?
                                                        <Select.Option value={item.valueNamegr}>

                                                            {item.valueNamegr}

                                                        </Select.Option>
                                                        : null
                                                    }
                                                </>
                                            )}
                                        </>
                                        :
                                        <>
                                            {group1Data.map(item =>
                                                <>
                                                    {item.leverGr === '2' ?
                                                        <Select.Option value={item.valueNamegr}>

                                                            {item.valueNamegr}

                                                        </Select.Option>
                                                        : null
                                                    }
                                                </>
                                            )}
                                        </>
                                    }
                                </Select>
                            </div>

                        </div>
                        <div className="mt-2">
                            <div className="text-[16px] text-[#242424] font-semibold">
                                Mô tả
                            </div>
                            <div>
                                <TextArea
                                    value={valueRv}
                                    onChange={(e) => { setValueRv(e.target.value); setCheckBtn(true) }}
                                    placeholder="Mô tả"
                                    autoSize={{
                                        minRows: 6,
                                        maxRows: 6,
                                    }}
                                />
                            </div>
                        </div>
                        <div className="mt-2 flex items-center">
                            <div className="text-[14px] mr-3">
                                Phòng bí mật:
                            </div>
                            <div>
                                <Checkbox />
                            </div>

                        </div>
                        <div className="mt-10">
                            <Button
                                className="text-[14px] w-[160px] h-[44px] p-2"
                                type="primary"
                                danger={!valueNamegr && !valueRv ? true : false}
                                onClick={() => checkBtn ? handleAdd1() : setOpen(false)}
                            >
                                {!valueNamegr && !valueRv ? 'Đóng' : 'Thêm nhóm'}
                            </Button>

                        </div>
                    </div>
                    <div className="basis-3/5 ">
                        <Transfer
                            showSearch
                            dataSource={mockData}
                            targetKeys={targetKeys}
                            render={renderItem}
                            showSelectAll={false}
                            listStyle={{ width: 300, height: 530 }}
                            className="custom-transfer"
                            titles={['Nhân sự thuộc công ty', 'Nhân sự thuộc nhóm']}
                        />
                    </div>
                </div>
            </Modal>
            {/* model2 */}
            <Modal
                className="bg-white rounded-lg w-[687px] modal2"
                title={
                    <div className=" flex items-center justify-between pb-2 border-b-2 border-[#dcdcdc]" >
                        <div className="w-[10px]">

                        </div>
                        <div>
                            Chi tiết nhóm
                        </div>
                        <div>
                            <GrClose onClick={() => setOpen1(false)} />
                        </div>
                    </div>
                }
                centered
                open={open1}
                onOk={() => setOpen1(false)}
                onCancel={() => setOpen1(false)}
                width={687}
            >
                {group1Data.map(item =>
                (
                    <>
                        {item.id === checkID ?
                            <div className="flex flex-row w-[100%]">
                                <div className=" basis-1/2" >
                                    <div className="flex justify-center mb-3">
                                        <div className="h-[150px] w-[150px] bg-red-300 rounded-md text-[50px] flex items-center justify-center text-white">
                                            {item.valueNamegr}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[16px] text-[#242424] font-semibold">
                                            Tên nhóm
                                        </div>
                                        <div>
                                            <Input
                                                className="h-[48px] py-[4px] px-[11px]"
                                                placeholder={`${item.valueNamegr}`}
                                                onFocus={handleFocus}
                                                onBlur={() => { handleBlur(); handleOutSite() }}
                                                value={valueNamegr}
                                                onChange={e => { setValueNamegr(e.target.value); setCheckBtn(true) }}
                                                allowClear
                                                disabled
                                            />
                                        </div>
                                        <div className={`text-[14px] text-red-400 ${outsiteValue && !valueNamegr ? '' : 'hidden'}`}>
                                            Tên nhóm không được để trống
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <div className="text-[16px] text-[#242424] font-semibold">
                                            Nhóm quản lý
                                        </div>
                                        <div >
                                            <Select
                                                showSearch
                                                className="h-[48px]"
                                                placeholder="Nhóm quản lý"
                                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                filterSort={(optionA, optionB) =>
                                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                }
                                                disabled
                                                options={[

                                                ]}
                                            />
                                        </div>

                                    </div>
                                    <div className="mt-2">
                                        <div className="text-[16px] text-[#242424] font-semibold">
                                            Mô tả
                                        </div>
                                        <div>
                                            <TextArea
                                                value={valueRv}
                                                onChange={(e) => { setValueRv(e.target.value); setCheckBtn(true) }}
                                                placeholder={`${item.valueRv}`}
                                                autoSize={{
                                                    minRows: 6,
                                                    maxRows: 6,
                                                }}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-2 flex items-center">
                                        <div className="text-[14px] mr-3">
                                            Phòng bí mật:
                                        </div>
                                        <div>
                                            <Checkbox disabled />
                                        </div>

                                    </div>
                                    <div className="mt-10">
                                        <Button
                                            className="text-[14px] w-[160px] h-[44px] p-2 flex items-center justify-center"
                                            type="primary"
                                            onClick={() => { setOpen2(true); setOpen1(false) }}
                                        >
                                            <div className="mr-2 text-[20px]">
                                                <FaRegEdit />
                                            </div>
                                            <div>
                                                Chỉnh sửa
                                            </div>
                                        </Button>

                                    </div>
                                </div>
                                <div className="basis-1/2 ml-3">
                                    <div className="text-[18px] text-[#242424] font-semibold ">
                                        Danh sách nhân viên ({countMembers(item.id)})
                                    </div>
                                    <div>
                                        {personData.map(person =>
                                            Array.isArray(person.keyIdGroup) && person.keyIdGroup.includes(checkID) && (
                                                <div key={person.id} className="mb-1 flex">
                                                    <div className="mr-3">
                                                        <Avatar
                                                            size={45}
                                                            style={{ backgroundColor: getRandomColor() }}
                                                        >
                                                            {person.name.slice(0, 2)}
                                                        </Avatar>
                                                    </div>
                                                    <div>
                                                        <div>
                                                            {person.name}
                                                        </div>
                                                        <div>
                                                            {person.group}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                            : null}
                    </>
                )
                )}
            </Modal>
            {/* model3 */}
            <Modal
                className="bg-white rounded-lg"
                title={
                    <div className=" flex items-center justify-between pb-2 border-b-2 border-[#dcdcdc]" >
                        <div className="w-[10px]">

                        </div>
                        <div>
                            Thông tin
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
                width={976}

            >
                {group1Data.map(item =>
                (
                    <>
                        {item.id === checkID ?
                            <div className="flex flex-row w-[100%]">
                                <div className=" basis-2/5" >
                                    <div className="flex justify-center mb-3">
                                        <div className="h-[150px] w-[150px] bg-red-300 rounded-md text-[50px] flex items-center justify-center text-white">
                                            {item.valueNamegr}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[16px] text-[#242424] font-semibold">
                                            Tên nhóm
                                        </div>
                                        <div>
                                            <Input
                                                className="h-[48px] py-[4px] px-[11px]"
                                                placeholder={`${item.valueNamegr}`}
                                                onFocus={handleFocus}
                                                onBlur={() => { handleBlur(); handleOutSite() }}
                                                value={valueNamegr}
                                                onChange={e => { setValueNamegr(e.target.value); setCheckBtn(true) }}
                                                allowClear
                                            />
                                        </div>
                                        <div className={`text-[14px] text-red-400 ${outsiteValue && !valueNamegr ? '' : 'hidden'}`}>
                                            Tên nhóm không được để trống
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <div className="text-[16px] text-[#242424] font-semibold">
                                            Nhóm quản lý
                                        </div>
                                        <div >
                                            <Select
                                                showSearch
                                                className="h-[48px]"
                                                placeholder="Nhóm quản lý"
                                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                filterSort={(optionA, optionB) =>
                                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                }
                                                disabled={item.leverGr !== '1' ? false : true}
                                                onChange={handleCheck}
                                            >
                                                {group1Data.map(item =>
                                                    <Select.Option value={item.valueNamegr}>

                                                        {item.valueNamegr}

                                                    </Select.Option>
                                                )}
                                            </Select>
                                        </div>

                                    </div>
                                    <div className="mt-2">
                                        <div className="text-[16px] text-[#242424] font-semibold">
                                            Mô tả
                                        </div>
                                        <div>
                                            <TextArea
                                                value={valueRv}
                                                onChange={(e) => { setValueRv(e.target.value); setCheckBtn(true) }}
                                                placeholder={`${item.valueRv}`}
                                                autoSize={{
                                                    minRows: 6,
                                                    maxRows: 6,
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-2 flex items-center">
                                        <div className="text-[14px] mr-3">
                                            Phòng bí mật:
                                        </div>
                                        <div>
                                            <Checkbox />
                                        </div>

                                    </div>
                                    <div className="mt-10">
                                        <Button
                                            className="text-[14px] w-[160px] h-[44px] p-2"
                                            type="primary"
                                            danger={!valueNamegr && !valueRv ? true : false}
                                            onClick={() => !valueNamegr && !valueRv ? setOpen2(false) : handleEdit(item.id, valueNamegr, valueRv, arrID)}
                                        >
                                            {!valueNamegr && !valueRv ? 'Đóng' : 'Lưu chỉnh sửa'}
                                        </Button>

                                    </div>
                                </div>
                                <div className="basis-3/5 flex flex-row ml-3">
                                    <Transfer
                                        showSearch
                                        dataSource={mockData1}
                                        targetKeys={targetKeys1}
                                        render={renderItem1}
                                        showSelectAll={false}
                                        listStyle={{ width: 300, height: 530 }}
                                        className="custom-transfer"
                                        titles={['Nhân sự thuộc công ty', 'Nhân sự thuộc nhóm']}
                                    />
                                </div>
                            </div>
                            : null}
                    </>
                )
                )}
            </Modal>
        </>
    )
}

export default ListGr