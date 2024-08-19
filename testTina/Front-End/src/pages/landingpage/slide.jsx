import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import avt1 from "../style/img/avatarfeedback1.svg";
import avt2 from "../style/img/avatarfeedback2.svg";
import avt3 from "../style/img/avatarfeedback3.svg";
import "../style/css/slide.css";

const Slide = () => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 3,
    speed: 500
  };
  return (
    <div className="slide-container">
      <Slider {...settings}>

        <div>
          <div className="slide">
            <div className="style-slide">
              <div className="slide-item-top">
                <h2>Chị Phạm Khách Linh</h2>
                <h3>Nhân viên kinh doanh</h3>
                <p id="p1">“</p>
                <p id="p2">
                  Tôi không bỏ lỡ bất cứ deadline nào nhờ MYS, hệ thống sẽ nhắc việc
                  khi đến hạn hoặc quá hạn nhờ đó mà vị trí bận rộn như tôi không bị
                  lỡ mất bất cứ công việc quan trọng nào!
                </p>
              </div>
              <div className="slide-item-bottom">
                <img src={avt1} alt="" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="slide">
            <div className="style-slide">
              <div className="slide-item-top">
                <h2>Anh Lê Đắc Duy</h2>
                <h3>Trưởng phòng tài chính</h3>
                <p id="p1">“</p>
                <p id="p2">
                  Thực sự cảm ơn MYS, nhờ MYS tôi đã giảm thiểu tần suất họp báo cáo công việc hàng ngày và hàng tuần rất nhiều, do tiến độ được cập nhật theo thời gian thực, tôi chỉ cần truy cập vào ứng dụng là thấy được tất cả.
                </p>
              </div>
              <div className="slide-item-bottom">
                <img src={avt2} alt="" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="slide">
            <div className="style-slide">
              <div className="slide-item-top">
                <h2>Chị Nguyễn Thị Phương Thảo</h2>
                <h3>CEO</h3>
                <p id="p1">“</p>
                <p id="p2">
                  Ứng dụng có giao diện thoáng, đẹp, dễ sử dụng. Các phòng ban ở công ty tôi từ kế toán, văn thư đến kĩ thuật đều không gặp phải trở ngại gì trong cách dùng.
                </p>
              </div>
              <div className="slide-item-bottom">
                <img src={avt3} alt="" />
              </div>
            </div>
          </div>
        </div>

      </Slider>
    </div>
  );
}

export default Slide;
