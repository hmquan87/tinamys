import React, { useState, useEffect } from "react";
import {
  Input,
  Table,
  Dropdown,
  Button,
  ConfigProvider,
  Modal,
  Form,
  Select,
} from "antd";
import { Option } from "antd/lib/mentions";
import "../../style/css/asset.css";
import { SearchOutlined } from "@ant-design/icons";
import { IoFilter } from "react-icons/io5";
import { GrAdd } from "react-icons/gr";
import axios from "axios";

// Khai báo các cột của bảng dữ liệu
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
    sorter: (a, b) => a.name - b.name,
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

// Component chính
const ListPerson = () => {
  const [data, setData] = useState([]); // Dữ liệu nhân sự
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị modal thêm nhân sự
  const [addForm] = Form.useForm(); // Form dùng để thêm nhân sự
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false); // Trạng thái hiển thị modal chi tiết nhân sự
  const [detailData, setDetailData] = useState(null); // Dữ liệu chi tiết nhân sự
  const [detailForm] = Form.useForm(); // Form dùng để chỉnh sửa thông tin
  const [isEditMode, setIsEditMode] = useState(false); // Trạng thái chỉnh sửa
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false); // Trạng thái hiển thị modal xác nhận xóa

  // Hook useEffect được sử dụng để gửi yêu cầu HTTP khi component được render
  useEffect(() => {
    fetchDataFromServer();
  }, []);

  // Hàm gửi yêu cầu HTTP để lấy dữ liệu từ máy chủ
  const fetchDataFromServer = async () => {
    try {
      const response = await axios.get("http://localhost:3001/getDataPerson");
      setData(response.data.person);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu từ máy chủ:", error);
    }
  };

  // Hàm gửi yêu cầu HTTP để thêm một nhân sự mới
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

  // Hàm hiển thị modal thêm nhân sự   test push
  const showModalAdd = () => {
    addForm.resetFields();
    setIsModalVisible(true);
  };

  // Hàm xử lý khi click nút "Xác nhận" trên modal thêm nhân sự
  const handleOk = async () => {
    try {
      const values = await addForm.validateFields();
      addForm.resetFields();
      await AddPerson(values); // Thêm nhân sự
      setIsModalVisible(false);
      // Sau khi thêm thành công, cập nhật lại dữ liệu hiển thị trên bảng
      fetchDataFromServer();
    } catch (error) {
      console.error("Vui lòng nhập đủ thông tin!");
    }
  };

  // Hàm xử lý khi nhấn nút "Hủy" trên modal thêm nhân sự
  const handleCancel = () => {
    addForm.resetFields();
    setIsModalVisible(false);
  };

  // Hàm hiển thị modal chi tiết nhân sự
  const showDetailModal = (record) => {
    setDetailData(record);
    setIsDetailModalVisible(true);
    setIsEditMode(false);
    detailForm.setFieldsValue(record);
  };

  // Hàm xử lý khi nhấn nút "Hủy" trên modal chi tiết nhân sự
  const handleDetailModalCancel = () => {
    setIsDetailModalVisible(false);
    setDetailData(null);
    setIsEditMode(false);
  };

  // Hàm xử lý khi nhấn nút "Sửa" trên modal chi tiết nhân sự
  const handleEdit = () => {
    setIsEditMode(true);
  };

  // Hàm xử lý khi nhấn nút "Xác nhận" sau khi sửa thông tin nhân sự
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
        console.log("Cập nhật thành công");
      } else {
        console.error(res.data);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin nhân sự:", error);
    }
  };

  // Hàm gửi yêu cầu HTTP để xóa một nhân sự
  const deletePerson = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3001/deletePerson/${id}`
      );
      if (res.data && res.data.success) {
        fetchDataFromServer();
        setIsDetailModalVisible(false);
        setDetailData(null);
        console.log("Xóa nhân sự thành công");
      } else {
        console.error(res.data);
      }
    } catch (error) {
      console.error("Lỗi khi xóa nhân sự:", error);
    }
  };

  //Search
  const [filteredData, setFilteredData] = useState([]);

  // Xử lý sự kiện onChange của thanh tìm kiếm
  const handleSearch = async (value) => {
    try {
      // Gửi yêu cầu tìm kiếm tới server
      const response = await axios.get(
        `http://localhost:3001/searchPerson?query=${value}`
      );
      // Cập nhật dữ liệu hiển thị trên bảng
      setFilteredData(response.data.person);
      // Sau khi cập nhật dữ liệu từ máy chủ, bạn có thể gọi lại fetchDataFromServer() để đảm bảo cập nhật dữ liệu mới nhất từ máy chủ
      fetchDataFromServer();
    } catch (error) {
      console.error("Lỗi khi tìm kiếm:", error);
    }
  };

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
            //   Gọi hàm handleSearch
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
                  console.log(values); // Lưu trữ giá trị nhập liệu vào đây
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
                    <Option value="Nhóm A">Nhóm A</Option>
                    <Option value="Nhóm B">Nhóm B</Option>
                    <Option value="Nhóm C">Nhóm C</Option>
                    <Option value="Nhóm D">Nhóm D</Option>
                    {/* Thêm các tùy chọn khác tương tự */}
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
                    <Option value="Quản lý">Quản lý</Option>
                    <Option value="Nhân viên">Nhân viên</Option>
                    {/* Thêm các tùy chọn khác tương tự */}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Trạng thái"
                  name="status"
                  initialValue="Hoạt động" // Giá trị mặc định
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
              <Select disabled={!isEditMode} className="h-[40px]">
                <Option value="Nhóm A">Nhóm A</Option>
                <Option value="Nhóm B">Nhóm B</Option>
                <Option value="Nhóm C">Nhóm C</Option>
                <Option value="Nhóm D">Nhóm D</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Chức vụ" name="position">
              <Select disabled={!isEditMode} className="h-[40px]">
                <Option value="Quản lý">Quản lý</Option>
                <Option value="Nhân viên">Nhân viên</Option>
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
