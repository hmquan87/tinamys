import React, { useState, useEffect } from 'react';
import { Transfer } from 'antd';
import '../../style/css/asset.css';
import axios from 'axios';

const Tab4 = () => {
  const [targetKeys, setTargetKeys] = useState([]);
  const [mockData, setMockData] = useState([]);
  const [data, setData] = useState([])
  // useEffect(() => {
  //   const data = [];
  //   for (let i = 0; i < 20; i++) {
  //     data.push({
  //       key: i.toString(),
  //       title: `content${i + 1}`,
  //       description: `description of content${i + 1}`,
  //     });
  //   }
  //   setMockData(data);
  // }, []);
  
  useEffect(() => {
    const dataSource = [];
    const fetchDataPerson = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/getDataPerson`);
        const dataPerson = res.data.person;
        setData(dataPerson)
      } catch (error) {
        console.error(error);
      }
    }
    for (let i = 0; i < data.length; i++) {
      dataSource.push({
        key: i.toString(),
        title: data[i].name,
        description: `description of content${i + 1}`,
      });
    }
    fetchDataPerson();
    setMockData(dataSource);
  }, []);

  console.log('data: ', data);
  const handleItemClick = (key) => {
    let newTargetKeys = [...targetKeys];
    if (newTargetKeys.includes(key)) {
      // If the key is already in targetKeys, remove it
      newTargetKeys = newTargetKeys.filter(targetKey => targetKey !== key);
    } else {
      // If the key is not in targetKeys, add it
      newTargetKeys.push(key);
    }
    setTargetKeys(newTargetKeys);

    // Log the current state of source and target arrays
    const sourceKeys = mockData.filter(item => !newTargetKeys.includes(item.key));
    console.log("Source Data:", sourceKeys);
    console.log("Target Data:", newTargetKeys);
  };

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

  return (
    <div className=''>
      <Transfer
        showSearch
        dataSource={mockData}
        targetKeys={targetKeys}
        render={renderItem}
        showSelectAll={false} // Disable select all if needed
        listStyle={{ width: 300, height: 578 }}
        className="custom-transfer" // Add a custom class
        titles={['Nhân sự thuộc công ty', 'Nhân sự thuộc nhóm']}
      />
    </div>
  );
};

export default Tab4;
