import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, notification } from "antd";
import { FaCamera } from "react-icons/fa";
import axios from "axios";
const { Option } = Select;

const EditCompany = () => {
  // Sử dụng id mặc định là 1
  const [loading, setLoading] = useState(false);
  const [workSpace, setWorkSpace] = useState("");
  const [number, setNumber] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [selectedValue1, setSelectedValue1] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:3001/getDataCompany');
      setData(res.data.companySpace)
    } catch (error) {

    }
  }
  useEffect(() => {
    fetchData();
  }, [])
  const handleEdit = async () => {
    const requestData = {
      nameWorkSpace: workSpace,
      tyeSpace: selectedValue1,
      phone: number,
      website: website,
      email: email,
      tyeSizePeople: selectedValue,
    };

    try {
      const response = await fetch(
        `http://localhost:3001/company-space/edit?id=${1}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        console.log("Thành công:", result);
        notification.success({
          message: "Thành công",
          description: "Đã lưu thông tin thành công",
        });
      } else {
        console.error("Lỗi:", result);
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
    }
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="w-[100%] flex justify-center">
      <div className="w-[45%] mt-8 absolute">
        <div className="relative text-[24px] font-semibold mb-3">
          Thông tin công ty
        </div>
        <div className="relative border rounded-xl">
          <div className="relative py-6 px-5">
            <div className="relative flex justify-center">
              <div className="relative w-[180px] h-[180px] bg-purple-700 rounded-full mt-4">
                <div className="absolute bottom-1 right-2 text-[20px] bg-slate-200 p-2 rounded-full">
                  <FaCamera />
                </div>
              </div>
            </div>
            <div className="flex flex-row pt-20">
              <div className="basis-1/2 mr-4">
                <Form layout="vertical" name="form-left">
                  <Form.Item
                    name="company"
                    label="Tên không gian làm việc"
                    className="custom-label-class"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên không gian làm việc",
                      },
                    ]}
                  >
                    <Input
                      className={`h-[42px]`}
                      type="text"
                      placeholder="Tên không gian làm việc"
                      value={workSpace}
                      onChange={(e) => setWorkSpace(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    name="workSpace"
                    label="Loại hình không gian làm việc"
                    className="custom-label-class"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn loại hình không gian làm việc",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      className="h-[42px]"
                      value={selectedValue1}
                      onChange={setSelectedValue1}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option value="Công ty">Công ty</Option>
                      <Option value="Tổ chức">Tổ chức</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="phone"
                    label="Số điện thoại"
                    className="custom-label-class"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại",
                      },
                    ]}
                  >
                    <Input
                      className={`h-[42px]`}
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      type="text"
                      placeholder="Số điện thoại"
                    />
                  </Form.Item>
                </Form>
              </div>
              <div className="basis-1/2">
                <Form name="form-right" layout="vertical">
                  <Form.Item
                    className="custom-label-class"
                    name="website"
                    label="Website"
                  >
                    <Input
                      className="h-[42px]"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      type="text"
                      placeholder="Website"
                    />
                  </Form.Item>
                  <Form.Item
                    className="custom-label-class"
                    name="email"
                    label="Email"
                  >
                    <Input
                      className="h-[42px]"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="text"
                      placeholder="Email"
                    />
                  </Form.Item>
                  <Form.Item
                    name="person"
                    label="Số lượng nhân sự"
                    className="custom-label-class"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn quy mô nhân sự",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      className="h-[42px]"
                      value={selectedValue}
                      onChange={setSelectedValue}
                      allowClear
                      placeholder="Quy mô nhân sự"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option value="max50">Nhỏ hơn 50 nhân sự</Option>
                      <Option value="min50max100">Từ 50 đến 100 nhân sự</Option>
                      <Option value="min100">Lớn hơn 100 nhân sự</Option>
                      <Option value="Trên 200 nhân sự">Trên 200 nhân sự</Option>
                    </Select>
                  </Form.Item>
                </Form>
              </div>
            </div>
            <div className="relative flex justify-end">
              <Button
                type="primary"
                className="text-[14px]"
                onClick={handleEdit}
              >
                Lưu thông tin
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCompany;
