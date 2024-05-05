import React from "react";
import "../style/css/footer.css";
import logo from '../style/img/logo.svg';
import { FaApple } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import shape1 from '../style/img/footer-shape-1.fcf37f00.svg'
import shape2 from '../style/img/footer-shape-2.e79c086e.svg'
import shape3 from '../style/img/footer-shape-3.6a2740c0.svg'


const Footer = () => {
    return (
        <>
            <div className="footer">
                <svg width="100%" height="100%" className="absolute-circle top-[-48%] right-[-5%] md:left-[-4%] z-0 w-[24%]"
                    viewBox="0 0 338 338" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="168.891" cy="168.685" r="168.574" fill="#ffffff1a"></circle>
                </svg>

                <div className="footer-container">
                    <div className="footer-content">
                        <img className="shape1" src={shape1} alt="" />
                        <img className="shape2" src={shape2} alt="" />
                        <img className="shape3" src={shape3} alt="" />
                        <div className="footer-info">
                            <a href="https://tinasoft.vn/vi/">
                                <img className="logoft" src={logo} alt="" />
                            </a><br />
                            <a className="atext" href="https://mail.google.com/mail/u/0/?fs=1&to=contact@tinasoft.vn&tf=cm">
                                Email: contact@tinasoft.vn
                            </a><br />
                            <a className="atext" href="*">
                                Số điện thoại: +(84) 246 329 5589
                            </a>
                            <p className="ptext">
                                Địa chỉ văn phòng: Tầng 4, Tòa nhà Ellipse Tower, 110 Trần Phú, Hà Đông, Hà Nội
                            </p>
                        </div>

                        <div className="footer-about">
                            <div className="colum1">
                                <h3 className="h3product">About MYS</h3>
                                <p className="pproduct">Giới thiệu</p>
                                <p className="pproduct">Tính năng</p>
                            </div>

                            <div className="colum2">
                                <h3 className="h3product">Solution</h3>
                                <p className="pproduct">Đăng kí dùng thử</p>
                                <p className="pproduct">Faqs</p>
                                <p className="pproduct">Help center</p>
                            </div>
                        </div>

                        <div className="footer-download">
                            <h3 className="h3down">Trải ngiệm ứng dụng!</h3>
                            <button className="downf appstore"><FaApple className="icon"/> App Store</button>
                            <button className="downf playstore"><FaGooglePlay className="icon" />Play Store</button>
                        </div>
                    </div>

                    <div className="end">
                        <a className="aend" href="https://tinasoft.vn/vi/">© 2023 TINASOFT VIỆT NAM</a>
                        <div className="flexitem">
                            <p className="pend">Privacy policy</p>
                            <GoDotFill className="iconend" />
                            <p className="pend">Refund Policy</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Footer;

