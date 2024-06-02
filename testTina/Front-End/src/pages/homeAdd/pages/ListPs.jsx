// import React, { Children, useEffect, useState } from 'react'
// import { Button, Input, Modal, Tree, Form, Select, Checkbox } from "antd";
// import { SearchOutlined, TableOutlined, PlusOutlined, CarryOutOutlined, CheckOutlined, FormOutlined } from '@ant-design/icons'
// import axios from 'axios';
// import '../../style/css/asset.css'
// import { GrClose } from "react-icons/gr";


// const plainOptions = ['Quản lý nhóm', 'Quản lý chức vụ', 'Quản lý nhân sự', 'Quản lý tin tức', 'Quản lý công ty'];
// const defaultCheckedList = ['Quản lý nhóm', 'Quản lý chức vụ', 'Quản lý nhân sự', 'Quản lý tin tức'];
// const ListPs = () => {
//     // modal
//     const [open, setOpen] = useState(false);
//     const [checkedList, setCheckedList] = useState(defaultCheckedList);
//     const [addForm] = Form.useForm()
//     const [personData, setPersonData] = useState([])

//     // const checkAll = plainOptions.length === checkedList.length;
//     console.log('asdasdads: ',checkedList);
//     const onChange = (option) => {
//         const currentIndex = checkedList.indexOf(option);
//         const newCheckedList = [...checkedList];

//         if (currentIndex === -1) {
//             newCheckedList.push(option);
//         } else {
//             newCheckedList.splice(currentIndex, 1);
//         }

//         setCheckedList(newCheckedList);
//     };
//     //tree
//     const [dataGroup1, setDataGroup1] = useState([]);
//     const [dataGroup2, setDataGroup2] = useState([]);
//     const [dataGroup3, setDataGroup3] = useState([]);
//     const [treeData, setTreeData] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3001/getDataGr');
//                 const data = response.data;
//                 if (data.success) {
//                     localStorage.setItem('group1', JSON.stringify(data.group));
//                     console.log('Dữ liệu đã được lưu vào localStorage:', data.group);
//                     const newData1 = [];
//                     const newData2 = [];
//                     const newData3 = [];

//                     for (var i = 0; i < data.group.length; i++) {
//                         if (data.group[i].leverGr === '1') {
//                             newData1.push(data.group[i])
//                         } else if (data.group[i].leverGr === '2') {
//                             newData2.push(data.group[i])
//                         } else newData3.push(data.group[i])
//                     }

//                     setDataGroup1(newData1);
//                     setDataGroup2(newData2);
//                     setDataGroup3(newData3);
//                 } else {
//                     console.error('Đã xảy ra lỗi khi lấy dữ liệu từ server:', data.error);
//                 }
//             } catch (error) {
//                 console.error('Đã xảy ra lỗi khi gọi API:', error);
//             }
//         }
//         const fetchDataPerson = async () => {
//             try {
//                 const res = await axios.get(`http://localhost:3001/getDataPerson`);
//                 const data = res.data.person;
//                 setPersonData(data)
//                 console.log('testtttAPI: ', personData);
//             } catch (error) {
//                 console.error('Đã xảy ra lỗi lấy dataPerson khi gọi API:', error);
//             }
//         }
//         fetchData();
//         fetchDataPerson();
//     }, []);

//     useEffect(() => {
//         const newTree = dataGroup1.map(item => ({
//             title: item.valueNamegr,
//             key: item.id,
//             children: dataGroup2.filter(item1 => item1.valueInheritance === item.valueNamegr).map(items => ({
//                 title: items.valueNamegr,
//                 key: items.id,
//                 children: dataGroup3.filter(item2 => item2.valueInheritance === items.valueNamegr).map(itemss => ({
//                     title: itemss.valueNamegr,
//                     key: itemss.id,
//                 }))
//             }))
//         }));
//         setTreeData(newTree);
//     }, [dataGroup1, dataGroup2]);

//     const handleOpenModal = () => {
//         setOpen(true);
//         addForm.setFieldsValue({
//             position: '',
//             group: '',
//             option: checkedList,
//         });
//     };

//     const [checkSearch, setCheckSearch] = useState(false)
//     return (
//         <div className='listPs h-[100%]'>
//             <div className="bg-white flex flex-row h-[100%]">
//                 <div className="basis-1/6 border-r border-zinc-300" >
//                     <div className=" flex items-center p-[10px]  ">
//                         <div className="w-[3px] h-4 bg-green-400 mr-1">

//                         </div>
//                         <div className="text-[18px] font-semibold text-gray-700">
//                             Danh sách nhóm
//                         </div>
//                     </div>
//                     <div className='ml-5'>
//                         <Tree
//                             treeData={treeData}
//                             showLine
//                         // defaultExpandedKeys={['1']}
//                         />

//                     </div>
//                 </div>
//                 <div className="basis-5/6 flex justify-between " >
//                     <div className='w-[100%]'>
//                         <div className=" flex items-center p-[10px]  ">
//                             <div className="w-[3px] h-4 bg-green-400 mr-1">

//                             </div>
//                             <div className="text-[18px] font-semibold text-gray-700">
//                                 Danh sách chức vụ
//                             </div>
//                         </div>

//                     </div>
//                     <div className='mr-5'>
//                         <div className="flex items-center p-[10px]">
//                             <div className='mr-6'>
//                                 <Input
//                                     className={`h-[36px]  border-none bg-inherit  ${checkSearch ? 'w-[190px]' : 'w-0'}`}
//                                     placeholder="Tìm kiếm"
//                                     prefix={<SearchOutlined className="text-[23px]" onClick={() => setCheckSearch(!checkSearch)} />}
//                                 />
//                             </div>
//                             <div className='flex items-center font-semibold text-gray-500 bg-zinc-100 p-[5px] rounded-sm mr-3'>
//                                 <div className='text-[20px]'>
//                                     <TableOutlined />
//                                 </div>
//                                 <div className='text-[14px] ml-2 '>
//                                     Bảng
//                                 </div>
//                             </div>
//                             <div className=''>
//                                 <Button
//                                     className='h-[36px] w-[134px]'
//                                     type='primary'
//                                     // onClick={() => { setOpen(true) }}
//                                     onClick={handleOpenModal}
//                                 >
//                                     <div className='flex items-center justify-center text-[14px]'>
//                                         <div className=' mr-2'>
//                                             <PlusOutlined />
//                                         </div>
//                                         <div className=''>
//                                             Thêm chức vụ
//                                         </div>
//                                     </div>
//                                 </Button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* modal add positon */}
//             <Modal
//                 className='bg-white rounded-lg '
//                 title={
//                     <div className=" flex items-center justify-between pb-2 border-b-2 border-[#dcdcdc]" >
//                         <div className="w-[10px]">

//                         </div>
//                         <div>
//                             Thêm chức vụ
//                         </div>
//                         <div>
//                             <GrClose onClick={() => setOpen(false)} />
//                         </div>
//                     </div>
//                 }
//                 centered
//                 open={open}
//                 onOk={() => setOpen(false)}
//                 onCancel={() => setOpen(false)}
//                 width={650}
//             >
//                 <div className='mt-[-30px] w-[600px]'>
//                     <Form
//                         form={addForm}
//                         layout='vertical'
//                         name='form'
//                         onFinish={value => console.log(value)}
//                     >
//                         <div className='flex flex-row'>
//                             <div className='basis-1/2'>
//                                 <Form.Item
//                                     label="Tên chức vụ"
//                                     name="position"
//                                     className='custom-label-class'
//                                     rules={[
//                                         {
//                                             required: true
//                                         }
//                                     ]}
//                                 >
//                                     <Input
//                                         className='h-[48px]'
//                                     />
//                                 </Form.Item>
//                                 <Form.Item
//                                     label="Nhóm"
//                                     name="group"
//                                     className='custom-label-class'
//                                     rules={[
//                                         {
//                                             required: true,
//                                             message: 'Vui lòng chọn chức vụ!'
//                                         }
//                                     ]}
//                                 >
//                                     <Select
//                                         placeholder="Chọn Chức vụ"
//                                         className='h-[48px]'
//                                     >
//                                         <Select.Option value="quanly">Quản lý</Select.Option>
//                                         <Select.Option value="nhanvien">Nhân viên</Select.Option>
//                                     </Select>
//                                 </Form.Item>

//                                 <Form.Item
//                                     label="Quyền"
//                                     name='option'
//                                     className='custom-label-class'
//                                 >

//                                     <Checkbox.Group>
//                                         <div className='flex flex-col'>
//                                             {plainOptions.map((option) => (
//                                                 <Checkbox
//                                                     key={option}
//                                                     value={option}
//                                                     checked={checkedList.includes(option)}
//                                                     onChange={() => onChange(option)}
//                                                 >
//                                                     {option}
//                                                 </Checkbox>
//                                             ))}
//                                         </div>

//                                     </Checkbox.Group>
//                                 </Form.Item>
//                                 <Form.Item
//                                     className='mt-[180px]'
//                                 >
//                                     <div className='flex'>
//                                         <Button
//                                             type='primary'
//                                             danger
//                                             className='w-[136px] h-[44px] text-[14px]'
//                                         >
//                                             Hủy
//                                         </Button>
//                                         <Button
//                                             type='primary'
//                                             className='w-[160px] h-[44px] ml-5 text-[14px]'
//                                             htmlType='submit'
//                                         >
//                                             Thêm chức vụ
//                                         </Button>
//                                     </div>
//                                 </Form.Item>
//                             </div>
//                             <div className='basis-1/2 ml-3'>
//                                 <Form.Item>
//                                     <div className='text-[16px] font-semibold text-gray-700'>
//                                         Danh sách thành viên ({personData.length})
//                                     </div>
//                                     <div className='flex flex-col'>
//                                         {personData.map(item =>
//                                             <div className=''>
//                                                 <div>

//                                                 </div>
//                                                 <div>
//                                                     <Checkbox></Checkbox>
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </div>
//                                </Form.Item>
//                             </div>
//                         </div>
//                     </Form>


//                 </div>
//             </Modal>
//         </div>
//     );
// }

// export default ListPs;


import React, { useEffect, useState } from 'react'
import { Button, Input, Modal, Tree, Form, Select, Checkbox, Avatar } from "antd";
import { SearchOutlined, TableOutlined, PlusOutlined } from '@ant-design/icons'
import axios from 'axios';
import '../../style/css/asset.css'
import { GrClose } from "react-icons/gr";

const plainOptions = ['Quản lý nhóm', 'Quản lý chức vụ', 'Quản lý nhân sự', 'Quản lý tin tức', 'Quản lý công ty'];
const defaultCheckedList = ['Quản lý nhóm', 'Quản lý chức vụ', 'Quản lý nhân sự', 'Quản lý tin tức'];

const ListPs = () => {
    const [open, setOpen] = useState(false);
    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    // const [checkAllOptions, setCheckAllOptions] = useState(defaultCheckedList.length === plainOptions.length);
    const [personData, setPersonData] = useState([]);
    const [checkedMembers, setCheckedMembers] = useState([]);
    const [checkAllMembers, setCheckAllMembers] = useState(false);
    const [addForm] = Form.useForm();
    const [idPerson, setIdPerson] = useState([]);
    console.log('idPerson: ', idPerson);
    console.log('checkList: ', checkedList)
    // const onChangeOption = (option) => {
    //     const currentIndex = checkedList.indexOf(option);
    //     const newCheckedList = [...checkedList];

    //     if (currentIndex === -1) {
    //         newCheckedList.push(option);
    //     } else {
    //         newCheckedList.splice(currentIndex, 1);
    //     }

    //     setCheckedList(newCheckedList);
    //     setCheckAllOptions(newCheckedList.length === plainOptions.length);
    // };

    // const onCheckAllOptionsChange = () => {
    //     if (checkAllOptions) {
    //         setCheckedList([]);
    //     } else {
    //         setCheckedList(plainOptions);
    //     }
    //     setCheckAllOptions(!checkAllOptions);
    // };
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getDataGr');
                const data = response.data;
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
                // setCheckedMembers(data.map(member => member.id));
                setCheckAllMembers(false);
                // setIdPerson(data.map(member => member.id)); 
            } catch (error) {
                console.error('Đã xảy ra lỗi lấy dataPerson khi gọi API:', error);
            }
        }
        fetchData();
        fetchDataPerson();
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
        setOpen(true);
        addForm.setFieldsValue({
            position: '',
            group: '',
            option: checkedList,
            idPerson: idPerson,
        });
    };

    const handleAddPosition = async (value) => {
        try {
            // Thêm giá trị của idPersion vào values trước khi gửi đi
            value.idPersion = idPerson;
            // Gửi request tới server với values chứa idPersion
            const response = await axios.post(`http://localhost:3001/addPosition?name=${value.position}&group=${value.group}&permissions=${value.option}&idPersion=${value.idPersion}`);
            setOpen(false)
            console.log('return: ', value);
            // Xử lý response nếu cần
        } catch (error) {
            console.error('Error:', error);
        }
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
    return (
        <div className='listPs h-[100%]'>
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
                <div className="basis-5/6 flex justify-between">
                    <div className='w-[100%]'>
                        <div className="flex items-center p-[10px]">
                            <div className="w-[3px] h-4 bg-green-400 mr-1"></div>
                            <div className="text-[18px] font-semibold text-gray-700">Danh sách chức vụ</div>
                        </div>
                    </div>
                    <div className='mr-5'>
                        <div className="flex items-center p-[10px]">
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
                                        <Select.Option value="quanly">Quản lý</Select.Option>
                                        <Select.Option value="nhanvien">Nhân viên</Select.Option>
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
        </div>
    );
}

export default ListPs;
