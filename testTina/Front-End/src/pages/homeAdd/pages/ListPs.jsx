import React, { Children, useEffect, useState } from 'react'
import { Button, Input, Tree } from "antd";
import { SearchOutlined, TableOutlined, PlusOutlined, CarryOutOutlined, CheckOutlined, FormOutlined } from '@ant-design/icons'
import axios from 'axios';
import '../../style/css/asset.css'
import { TreeNode } from 'antd/es/tree-select';

// const data1 = [];
// const data2 = [];
// const data3 = [];


// const dataTree = data1.map(item => ({
//     title: item.valueNamegr,
//     key: item.id,
//     Children: data2.filter(item1 => item1.valueInheritance === item.leverGr).map(item => ({
//         title: item.valueNamegr,
//         key: item.id,
//     }))
// }));

// const treeData = [
//     {
//         title: 'parent 1',
//         key: '0-0',
//         children: [
//             {
//                 title: 'parent 1-0',
//                 key: '0-0-0',
//                 children: [
//                     {
//                         title: 'leaf',
//                         key: '0-0-0-0',
//                     },
//                     {
//                         title: 'leaf',
//                         key: '0-0-0-1',
//                     },
//                     {
//                         title: 'leaf',
//                         key: '0-0-0-2',
//                     },
//                 ],
//             },
//             {
//                 title: 'parent 1-1',
//                 key: '0-0-1',
//                 children: [
//                     {
//                         title: 'leaf',
//                         key: '0-0-1-0',
//                     },
//                 ],
//             },
//             {
//                 title: 'parent 1-2',
//                 key: '0-0-2',
//                 children: [
//                     {
//                         title: 'leaf',
//                         key: '0-0-2-0',
//                     },
//                     {
//                         title: 'leaf',
//                         key: '0-0-2-1',
//                     },
//                 ],
//             },
//         ],
//     },
// ];
// const newTree = [
//     {
//         title: 'Parent 1',
//         key: 'parent-1',
//         children: [
//             {
//                 title: 'Child 1',
//                 key: 'child-1',
//             },
//             {
//                 title: 'Child 2',
//                 key: 'child-2',
//             },
//         ],
//     },
// ];

const ListPs = () => {


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
                    console.log('Dữ liệu đã được lưu vào localStorage:', data.group);
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

        fetchData();
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

    console.log('dataTree1:', treeData);
    // console.log('dataTree2:', newTree);
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
                <div className='ml-5'>
                    <Tree
                        treeData={treeData}
                        showLine
                        // defaultExpandedKeys={['1']}
                    />

                </div>
            </div>
            <div className="basis-5/6 flex justify-between " >
                <div className='w-[100%]'>
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
                                onClick={() => test()}
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