import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, notification, Row, Col } from "antd";
import { FaCamera } from "react-icons/fa";
import axios from "axios";

const { Option } = Select;

const EditCompany = () => {
  const [detailData, setDetailData] = useState(null); // Dữ liệu chi tiết nhân sự
  const [detailForm] = Form.useForm(); // Form dùng để chỉnh sửa thông tin
  const [isEditMode, setIsEditMode] = useState(false); // Trạng thái chỉnh sửa

  // Hook useEffect được sử dụng để gửi yêu cầu HTTP khi component được render
  useEffect(() => {
    fetchDataFromServer();
  }, []);

  // Hàm gửi yêu cầu HTTP để lấy dữ liệu từ máy chủ
  const fetchDataFromServer = async () => {
    try {
      const response = await axios.get("http://localhost:3001/getDataCompany");
      if (response.data.companySpace && response.data.companySpace.length > 0) {
        setDetailData(response.data.companySpace[0]);
        detailForm.setFieldsValue(response.data.companySpace[0]);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu từ máy chủ:", error);
    }
  };

  // Hàm xử lý khi nhấn nút "Sửa"
  const handleEdit = () => {
    setIsEditMode(true);
  };

  // Hàm kiểm tra dữ liệu
  const validateFields = (values) => {
    const requiredFields = [
      "nameWorkSpace",
      "tyeSpace",
      "phone",
      "website",
      "email",
      "tyeSizePeople",
    ];

    for (const field of requiredFields) {
      if (!values[field]) {
        return false;
      }
    }
    return true;
  };

  // Hàm xử lý khi nhấn nút "Xác nhận" sau khi sửa thông tin nhân sự
  const handleUpdate = async () => {
    try {
      const values = await detailForm.validateFields();

      // Kiểm tra các trường dữ liệu
      if (!validateFields(values)) {
        notification.error({
          message: "Lỗi",
          description:
            "Lưu thông tin công ty không thành công, vui lòng điền đầy đủ thông tin.",
        });
        return;
      }

      const res = await axios.put(
        `http://localhost:3001/company-space/edit?id=${1}`,
        values
      );

      if (res.data && res.data.success) {
        fetchDataFromServer();
        setIsEditMode(false);
        notification.success({
          message: "Thành công",
          description: "Đã lưu thông tin thành công",
        });
      } else {
        notification.error({
          message: "Lỗi",
          description: "Lưu thông tin công ty không thành công",
        });
        console.error(res.data);
      }
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Lưu thông tin công ty không thành công",
      });
      console.error("Lỗi khi cập nhật thông tin công ty:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", fontSize: "24px" }}>
        {isEditMode ? "Chỉnh sửa thông tin công ty" : "Thông tin công ty"}
      </h2>
      <div className="relative flex justify-center">
        <div className="relative w-[180px] h-[180px] bg-purple-700 rounded-full mt-8">
          <div className="absolute bottom-1 right-2 text-[20px] bg-slate-200 p-2 rounded-full">
            <FaCamera />
          </div>
        </div>
      </div>
      {detailData ? (
        <div className="flex justify-center pt-20 mt-8 gap-8">
          <Form
            form={detailForm}
            layout="vertical"
            initialValues={detailData}
            onFinish={handleUpdate}
            className="w-[80%]"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Tên công ty" name="nameWorkSpace">
                  <Input readOnly={!isEditMode} className="h-[40px]" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Website" name="website">
                  <Input readOnly={!isEditMode} className="h-[40px]" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Loại hình không gian làm việc"
                  name="tyeSpace"
                >
                  <Select disabled={!isEditMode} className="h-[40px]">
                    <Option value="Công ty">Công ty</Option>
                    <Option value="Tổ chức">Tổ chức</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email" name="email">
                  <Input readOnly={!isEditMode} className="h-[40px]" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Số điện thoại" name="phone">
                  <Input readOnly={!isEditMode} className="h-[40px]" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Số lượng nhân sự" name="tyeSizePeople">
                  <Select disabled={!isEditMode} className="h-[40px]">
                    <Option value="Nhỏ hơn 50 nhân sự">
                      Nhỏ hơn 50 nhân sự
                    </Option>
                    <Option value="Từ 50 đến 100 nhân sự">
                      Từ 50 đến 100 nhân sự
                    </Option>
                    <Option value="Lớn hơn 100 nhân sự">
                      Lớn hơn 100 nhân sự
                    </Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <div className="flex justify-end">
              {isEditMode ? (
                <>
                  <Button
                    key="cancel"
                    onClick={() => setIsEditMode(false)}
                    className="mr-4"
                  >
                    Hủy
                  </Button>
                  <Button key="ok" type="primary" htmlType="submit">
                    Xác nhận
                  </Button>
                </>
              ) : (
                <Button type="primary" onClick={handleEdit}>
                  Sửa nhân sự
                </Button>
              )}
            </div>
          </Form>
        </div>
      ) : (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Không có dữ liệu công ty để hiển thị.
        </p>
      )}
    </div>
  );
};

export default EditCompany;
