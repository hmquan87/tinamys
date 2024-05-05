import React, { useState } from "react";
import '../style/css/test.css'
import { HiChevronDown } from "react-icons/hi2";
const Question = () => {

    const [qt1, setQt1] = useState(true);
    const handleClick1 = () => {
        setQt1(!qt1)
    }
    const [qt2, setQt2] = useState(true);
    const handleClick2 = () => {
        setQt2(!qt2)
    }

    const [qt3, setQt3] = useState(true);
    const handleClick3 = () => {
        setQt3(!qt3)
    }

    const [qt4, setQt4] = useState(true);
    const handleClick4 = () => {
        setQt4(!qt4)
    }



    return (
        <>
            <div className="questions">
                <div className="question">
                    <div className="qt">
                        <div className="qt-title">
                            <div className="pd-qt-title">
                                <div className="text-qt-title">
                                    MYS có dễ sử dụng không?
                                </div>

                            </div>
                            <div className="qt-title-icon">
                                <HiChevronDown
                                    id="icon-qt"
                                    className={qt1 ? "rotate-icon" : "rotate-icon reversed"}
                                    onClick={handleClick1}
                                />
                            </div>

                        </div>
                        <div className="pd-qt-title">
                            <div className={`text-content ${qt1 ? 'show' : ''}`}>
                                Ứng dụng hoàn toàn thân thiện với người dùng, các tính năng được bố trí rõ ràng, logic giúp người dùng dễ dàng tương tác. Đội ngũ hỗ trợ 24/7 sẵn sàng giải đáp mọi thắc mắc của người dùng.
                            </div>
                        </div>

                    </div>
                    <div className="qt">
                        <div className="qt-title">
                            <div className="pd-qt-title">
                                <div className="text-qt-title">
                                    MYS có trên những nền tảng nào?
                                </div>

                            </div>
                            <div className="qt-title-icon">
                                <HiChevronDown
                                    id="icon-qt"
                                    className={!qt2 ? "rotate-icon" : "rotate-icon reversed"}
                                    onClick={handleClick2}
                                />
                            </div>

                        </div>
                        <div className="pd-qt-title">
                            <div className={`text-content ${!qt2 ? 'show' : ''}`}>
                                MYS đã sẵn sàng được sử dụng trên web và có mặt tại ứng dụng Android & IOS.
                            </div>
                        </div>

                    </div>
                </div>
                <div className="question">
                    <div className="qt">
                        <div className="qt-title">
                            <div className="pd-qt-title">
                                <div className="text-qt-title">
                                    Tính năng chính của MYS?
                                </div>

                            </div>
                            <div className="qt-title-icon">
                                <HiChevronDown
                                    id="icon-qt"
                                    className={!qt3 ? "rotate-icon" : "rotate-icon reversed"}
                                    onClick={handleClick3}
                                />
                            </div>

                        </div>
                        <div className="pd-qt-title">
                            <div className={`text-content ${!qt3 ? 'show' : ''}`}>
                                Xác lập, quản lý mục tiêu, người tham gia và dễ dàng theo dõi tiến độ, nhận thông báo mỗi khi có cập nhật, can thiệp kịp thời.
                            </div>
                        </div>

                    </div>
                    <div className="qt">
                        <div className="qt-title">
                            <div className="pd-qt-title">
                                <div className="text-qt-title">
                                    Những ưu điểm của MYS?
                                </div>

                            </div>
                            <div className="qt-title-icon">
                                <HiChevronDown
                                    id="icon-qt"
                                    className={qt4 ? "rotate-icon" : "rotate-icon reversed"}
                                    onClick={handleClick4}
                                />
                            </div>

                        </div>
                        <div className="pd-qt-title">
                            <div className={`text-content ${qt4 ? 'show' : ''}`}>
                                Dễ sử dụng và tiện lợi, hỗ trợ trên mọi nền tảng, chi phí thấp, hiệu quả sử dụng cao và được hỗ trợ công nghệ AI
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Question;