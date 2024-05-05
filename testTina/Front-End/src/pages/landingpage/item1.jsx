import React from "react";
import '../style/css/page1.css'
import img9 from '../style/img/image9.png';
import img8 from '../style/img/image8.png';
import img5 from '../style/img/image5.png';
import img6 from '../style/img/image6.png';
import { IoCheckmark } from "react-icons/io5";

const Item1 = () => {
    return (
        <div className="itemcard">
            <div className="itembd">
                <div className="item1">
                    <img src={img9} alt="" />
                    <div className="text" style={{marginLeft:'50px'}}>
                        <h1>Lập mục tiêu theo chu kì năm, quý, tháng, tuần</h1>
                        <div id="text-item">
                            <IoCheckmark size={25} id='check1'/>
                            <p>Lập mục tiêu chi tiết theo năm, quý, tháng, tuần</p>
                        </div>
                        <div id="text-item">
                            <IoCheckmark size={25} id='check1'/>
                            <p>Tổ chức các hạng mục công việc, phân bổ nhân lực liên nhóm để thực hiện mục tiêu và quản lý tiến độ trên một nền tảng hợp nhất</p>
                        </div>
                        <div id="text-item">
                            <IoCheckmark size={25} id='check1'/>
                            <p>Tổ chức công việc theo dự án, báo cáo độc lập, theo dõi đầu việc đa chiều, cảnh báo tiến độ thông minh</p>
                        </div>                            
                    </div>
                </div>
            </div>

            <div className="itemvd">
                <div className="item1" style={{marginTop:'50px'}}>
                    <div className="text">
                        <h1>Quản lý mục tiêu theo cấp bậc công ty, nhóm, nhân viên</h1>
                        <div id="text-item">
                            <IoCheckmark size={25} id='check1'/>
                            <p>Chia nhỏ mục tiêu theo cấp bậc từ công ty, nhóm đến từng nhân viên</p>
                        </div>
                        <div id="text-item">
                            <IoCheckmark size={25} id='check1'/>
                            <p>Giám sát tiến độ thực hiện mục tiêu, đánh giá hiệu quả, giúp cấp trên đưa ra quyết định chính xác và nhanh chóng</p>
                        </div>
                        <div id="text-item">
                            <IoCheckmark size={25} id='check1'/>
                            <p>Giao tiếp và trao đổi nội bộ trên từng công việc. Thông tin đồng bộ, kịp thời và dễ dàng phối hợp</p>
                        </div> 
                        <div id="text-item">
                            <IoCheckmark size={25} id='check1'/>
                            <p>Quản lý mục tiêu, tiến độ hoàn thành của nhân viên cấp dưới trên một bảng chung</p>
                        </div>                            
                    </div>
                    <img src={img8} alt="" style={{marginLeft:'20px'}} />
                </div>
            </div>

            <div className="itembd">
                <div className="item1" style={{marginTop:'50px'}} >
                    <img src={img6} alt="" />
                    <div className="text" style={{marginLeft:'50px'}}>
                        <h1>Kế hoạch công việc hàng ngày</h1>
                        <div id="text-item">
                            <IoCheckmark size={25} id='check1'/>
                            <p>Chia nhỏ mục tiêu thành các công việc hàng ngày</p>
                        </div>
                        <div id="text-item">
                            <IoCheckmark size={25} id='check1'/>
                            <p>Cho phép lên kế hoạch công việc một cách chi tiết và rõ ràng hơn</p>
                        </div>
                        <div id="text-item">
                            <IoCheckmark size={25} id='check1'/>
                            <p>Định hướng mục tiêu của mỗi công việc đang được thực hiện hàng ngày</p>
                        </div>                            
                    </div>
                </div>
            </div>

            <div className="itembd">
                <div className="item1" style={{marginTop:'50px'}}>
                    <div className="text">
                        <h1>Checkin tiến độ công việc, mục tiêu</h1>
                        <div id="text-item">
                            <IoCheckmark size={25} id='check1'/>
                            <p>Checkin tiến độ công việc định kỳ để giúp quản lý đưa ra quyết định chính xác</p>
                        </div>
                        <div id="text-item">
                            <IoCheckmark size={25} id='check1'/>
                            <p>Hệ thống tự động nhắc tiến độ công việc đến những người liên quan</p>
                        </div>
                        <div id="text-item">
                            <IoCheckmark size={25} id='check1'/>
                            <p>Hệ thống tự động cảnh báo công việc sắp đến hạn, quá hạn</p>
                        </div>                                                        
                    </div>
                    <img src={img5} alt="" style={{marginLeft:'20px'}} />
                </div>
            </div>
        </div>
    )

}

export default Item1;