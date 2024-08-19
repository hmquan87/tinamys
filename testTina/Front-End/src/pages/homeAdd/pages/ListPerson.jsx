import React, { useState, useEffect } from "react";
import {
  Input,
  Table,
  Button,
  Modal,
  Form,
  Select,
} from "antd";
import { Option } from "antd/lib/mentions";
import "../../style/css/asset.css";
import { SearchOutlined } from "@ant-design/icons";
import { GrAdd } from "react-icons/gr";
import axios from "axios";

const columns = [
  {
    title: "STT",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Họ và tên",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Nhóm",
    dataIndex: "group",
    key: "group",
  },
  {
    title: "Chức vụ",
    dataIndex: "position",
    key: "position",
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone",
    key: "phone",
  },
];



const ListPerson = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addForm] = Form.useForm();
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [detailForm] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [dataGroup, setDataGroup] = useState([]);
  const [dataPosition, setDataPosition] = useState([]);

  
  const fetchDataFromServer = async () => {
    try {
      const response = await axios.get("http://localhost:3001/getDataPerson");
      const dataperson = response.data.person

      setData(response.data.person);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu từ máy chủ:", error);
    }
  };

  const fetchDataGroup = async () => {

    try {
      const res = await axios.get("http://localhost:3001/grDatatest");
      setDataGroup(res.data.dataGroup)
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu từ máy chủ:", error);
    }
  }
  const fetchDataPosition = async () => {
    try {
      const res = await axios.get('http://localhost:3001/getPosition')
      setDataPosition(res.data.position)
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu từ máy chủ:", error);
    }
  }
  const AddPerson = async (values) => {
    try {
      const res = await axios.post("http://localhost:3001/addPerson", values);

      if (res.data && res.data.success && Array.isArray(res.data.person)) {
        const newPersonData = res.data.person;
        localStorage.setItem("personData", JSON.stringify(newPersonData));
        setData(newPersonData);
        console.log("Nhân sự đã được thêm:", newPersonData);
      } else {
        console.error(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDataFromServer();
    fetchDataGroup();
    fetchDataPosition();
  }, []);

  const showModalAdd = () => {
    addForm.resetFields();
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await addForm.validateFields();
      addForm.resetFields();
      await AddPerson(values);
      setIsModalVisible(false);
      fetchDataFromServer();
    } catch (error) {
      console.error("Vui lòng nhập đủ thông tin!");
    }
  };

  const handleCancel = () => {
    addForm.resetFields();
    setIsModalVisible(false);
  };

  const showDetailModal = (record) => {
    setDetailData(record);
    setIsDetailModalVisible(true);
    setIsEditMode(false);
    detailForm.setFieldsValue(record);
  };

  const handleDetailModalCancel = () => {
    setIsDetailModalVisible(false);
    setDetailData(null);
    setIsEditMode(false);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleUpdate = async () => {
    try {
      const values = await detailForm.validateFields();
      const res = await axios.put(
        `http://localhost:3001/updatePerson/${detailData.id}`,
        values
      );

      if (res.data && res.data.success) {
        fetchDataFromServer();
        setIsDetailModalVisible(false);
        setDetailData(null);
        setIsEditMode(false);
        localStorage.setItem("personData", JSON.stringify(res.data.person));
        console.log("Cập nhật thành công");
      } else {
        console.error(res.data);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin nhân sự:", error);
    }
  };

  const deletePerson = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3001/deletePerson/${id}`
      );
      if (res.data && res.data.success) {
        fetchDataFromServer();
        setIsDetailModalVisible(false);
        setDetailData(null);
        localStorage.setItem("personData", JSON.stringify(res.data.person));
        console.log("Xóa nhân sự thành công");
      } else {
        console.error(res.data);
      }
    } catch (error) {
      console.error("Lỗi khi xóa nhân sự:", error);
    }
  };

  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = async (value) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/searchPerson?query=${value}`
      );
      setFilteredData(response.data.person);
      fetchDataFromServer();
    } catch (error) {
      console.error("Lỗi khi tìm kiếm:", error);
    }
  };
  console.log(dataGroup);
  return (

    <div>
      <div>
        <div className=" flex items-center pt-10 pl-6 pb-2">
          <div className="w-[3px] h-4 bg-green-400 mr-1"></div>
          <div className="text-[18px] font-semibold text-gray-700 tracking-wider">
            Danh sách nhân sự
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center pl-6">
          <div>
            <Input
              placeholder="Tìm kiếm"
              prefix={<SearchOutlined className="h-[26px]" />}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-row">
          <div className="basis-1/3">
            <Button
              className="flex items-center text-[14px] h-[40px] "
              type="primary"
              onClick={showModalAdd}
            >
              <div>
                <GrAdd />
              </div>
              <div className="ml-2">Thêm</div>
            </Button>
            <Modal
              title={
                <h2 style={{ margin: 0, textAlign: "center", fontSize: 24 }}>
                  Thêm nhân sự
                </h2>
              }
              visible={isModalVisible}
              width={430}
              centered
              style={{ background: "#ffffff", borderRadius: "8px" }}
            >
              <Form
                form={addForm}
                layout="vertical"
                onFinish={(values) => {
                  console.log(values);
                }}
                className="w-[380px]"
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: "Vui lòng nhập Email!" }]}
                >
                  <Input className="h-[40px]" placeholder="Nhập Email" />
                </Form.Item>
                <Form.Item
                  label="Họ và tên"
                  name="name"
                  rules={[
                    { required: true, message: "Vui lòng nhập họ và tên!" },
                  ]}
                >
                  <Input className="h-[40px]" placeholder="Nhập Họ và tên" />
                </Form.Item>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập Số điện thoại!",
                    },
                  ]}
                >
                  <Input
                    className="h-[40px]"
                    placeholder="Nhập Số điện thoại"
                  />
                </Form.Item>
                <Form.Item
                  label="Nhóm"
                  name="group"
                  rules={[{ required: true, message: "Vui lòng chọn Nhóm!" }]}
                >
                  <Select placeholder="Chọn Nhóm">
                    {dataGroup.map(item => (
                      <Select.Option key={item.valueNamegr} value={item.valueNamegr}>
                        {item.valueNamegr}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Chức vụ"
                  name="position"
                  rules={[
                    { required: true, message: "Vui lòng chọn Chức vụ!" },
                  ]}
                >
                  <Select placeholder="Chọn Chức vụ">
                    {dataPosition.map(item =>
                      <Select.Option key={item.name} value={item.name}>
                        {item.name}
                      </Select.Option>
                    )}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Trạng thái"
                  name="status"
                  initialValue="Hoạt động"
                >
                  <Input disabled className="h-[40px]" />
                </Form.Item>

                <div className="flex justify-end">
                  <Button key="cancel" onClick={handleCancel} className="mr-4">
                    Hủy
                  </Button>
                  <Button key="ok" type="primary" onClick={handleOk}>
                    Thêm
                  </Button>
                </div>
              </Form>
            </Modal>
          </div>

          <div className="basis-1/3 mx-4"></div>
        </div>
      </div>
      {/* Table data  */}
      <div className="p-4">
        <Table
          columns={columns}
          bordered
          size="middle"
          dataSource={filteredData.length > 0 ? filteredData : data}
          scroll={{
            x: "calc(700px + 50%)",
            y: 500,
          }}
          onRow={(record) => ({
            onClick: () => showDetailModal(record),
          })}
        />
      </div>

      {/* Modal xem chi tiết và sửa  */}
      <Modal
        title={
          <h2 style={{ margin: 0, textAlign: "center", fontSize: 24 }}>
            {isEditMode ? "Sửa nhân sự" : "Xem chi tiết nhân sự"}
          </h2>
        }
        visible={isDetailModalVisible}
        onCancel={handleDetailModalCancel}
        width={430}
        centered
        style={{ background: "#ffffff", borderRadius: "8px" }}
      >
        {detailData && (
          <Form
            form={detailForm}
            layout="vertical"
            initialValues={detailData}
            onFinish={handleUpdate}
            className="w-[380px]"
          >
            <Form.Item label="Họ và tên" name="name">
              <Input readOnly={!isEditMode} className="h-[40px]" />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input readOnly={!isEditMode} className="h-[40px]" />
            </Form.Item>
            <Form.Item label="Trạng thái" name="status">
              <Select disabled={!isEditMode} className="h-[40px]">
                <Option value="Hoạt động">Hoạt động</Option>
                <Option value="Ngưng hoạt động">Ngưng hoạt động</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Nhóm" name="group">
              <Select disabled={!isEditMode} placeholder="Chọn Nhóm">
                {dataGroup.map(item => (
                  <Select.Option key={item.valueNamegr} value={item.valueNamegr}>
                    {item.valueNamegr}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Chức vụ" name="position">
              <Select disabled={!isEditMode} className="h-[40px]">
                {dataPosition.map(item =>
                  <Select.Option key={item.name} value={item.name}>
                    {item.name}
                  </Select.Option>
                )}
              </Select>
            </Form.Item>
            <Form.Item label="Số điện thoại" name="phone">
              <Input readOnly={!isEditMode} className="h-[40px]" />
            </Form.Item>
            <div className="flex justify-end">
              {isEditMode ? (
                <>
                  <Button
                    key="cancel"
                    onClick={handleDetailModalCancel}
                    className="mr-4"
                  >
                    Hủy
                  </Button>
                  <Button
                    key="ok"
                    type="primary"
                    htmlType="submit"
                    onClick={handleUpdate}
                  >
                    Xác nhận
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    key="cancel"
                    onClick={handleDetailModalCancel}
                    className="mr-4"
                  >
                    Đóng
                  </Button>
                  <Button
                    type="danger"
                    onClick={() => setConfirmDeleteVisible(true)}
                    className="border bg-red-500 text-white mr-4 hover:opacity-80"
                  >
                    Xóa
                  </Button>

                  <Button type="primary" onClick={handleEdit}>
                    Sửa nhân sự
                  </Button>
                </>
              )}
            </div>
          </Form>
        )}
      </Modal>

      {/* Modal confirmDelete  */}
      <Modal
        title={
          <h2 style={{ margin: 0, textAlign: "center", fontSize: 24 }}>
            Xác nhận xóa
          </h2>
        }
        visible={confirmDeleteVisible}
        width={500}
        centered
        style={{ background: "#ffffff", borderRadius: "8px" }}
      >
        <div className="flex flex-col items-center justify-center ml-[3.5rem]">
          <p className="m-4 text-xl">Bạn chắc chắn muốn xóa không?</p>
          <div>
            <Button
              key="cancel"
              onClick={() => setConfirmDeleteVisible(false)}
              className="mr-4"
            >
              Hủy
            </Button>

            <Button
              key="delete"
              type="primary"
              danger
              onClick={() => {
                deletePerson(detailData.id);
                setConfirmDeleteVisible(false);
              }}
            >
              Xóa
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default ListPerson;
