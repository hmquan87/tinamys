import React from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import '../style/css/page1.css';

const Idea = () => {

    return (

        <div className="idea-full">
            <div className="idea">
                <IoCheckmarkCircle id='check' size={26} />
                <p>Quản lý mục tiêu của công ty, nhóm, nhân sự một cách dễ dàng và tiện lợi</p>
            </div>
            <div className="idea">
                <IoCheckmarkCircle id='check' size={26} />
                <p>Cho phép lập mục tiêu theo chu kì năm, quý, tháng, tuần</p>
            </div>
            <div className="idea">
                <IoCheckmarkCircle id='check' size={26} />
                <p>Quản lý checkin tiến độ mục tiêu, dự án của công ty, nhóm</p>
            </div>
            <div className="idea">
                <IoCheckmarkCircle id='check' size={26} />
                <p>Tự động nhắc việc và thông báo đến những người liên quan</p>
            </div>
        </div>
    )
}

export default Idea;