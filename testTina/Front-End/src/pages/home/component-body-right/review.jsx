import React from "react";
import '../../style/css/review.css'
import cancel from '../../style/img/cancel.svg'
import { Button } from "antd";

const Review = ({ handleCancel }) => {
    return (
        <div className="review-ant">
            <div className="form-review">
                <div className="title-reiview">
                    <div className="title-css">
                        <div className="text-title-review">
                            Đánh giá
                        </div>
                        <div className="icon-cancel" onClick={handleCancel}>
                            <svg fillRule="evenodd" viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path></svg>
                        </div>
                    </div>
                </div>
                <div className="body-review">
                    <div className="item-body">
                        <div className="item-body-review">
                            <div className="item-center">
                                <div className="text-body">
                                    Bạn có hài lòng với TinaMYS không?
                                </div>
                                <div className="star-body">
                                    <svg style={{ marginRight: '12px' }} width="34" height="31" viewBox="0 0 34 31" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.8" d="M15.1862 2.40717C15.9806 1.24803 17.6913 1.24803 18.4857 2.40717L22.4293 8.16138C22.6893 8.54084 23.0723 8.81905 23.5135 8.94912L30.2047 10.9216C31.5526 11.3189 32.0813 12.9458 31.2243 14.0596L26.9704 19.5883C26.6899 19.9529 26.5436 20.4031 26.5563 20.8629L26.748 27.8361C26.7867 29.2409 25.4027 30.2464 24.0787 29.7755L17.506 27.4383C17.0726 27.2842 16.5993 27.2842 16.1658 27.4383L9.59315 29.7755C8.26913 30.2464 6.88518 29.2409 6.92381 27.8362L7.1156 20.8629C7.12825 20.4031 6.98198 19.9529 6.70146 19.5883L2.44753 14.0596C1.5906 12.9458 2.11923 11.3189 3.46712 10.9216L10.1583 8.94912C10.5996 8.81905 10.9825 8.54084 11.2426 8.16138L15.1862 2.40717Z" fill="#FFB802"></path></svg>
                                    <svg style={{ marginRight: '12px' }} width="34" height="31" viewBox="0 0 34 31" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.8" d="M15.1862 2.40717C15.9806 1.24803 17.6913 1.24803 18.4857 2.40717L22.4293 8.16138C22.6893 8.54084 23.0723 8.81905 23.5135 8.94912L30.2047 10.9216C31.5526 11.3189 32.0813 12.9458 31.2243 14.0596L26.9704 19.5883C26.6899 19.9529 26.5436 20.4031 26.5563 20.8629L26.748 27.8361C26.7867 29.2409 25.4027 30.2464 24.0787 29.7755L17.506 27.4383C17.0726 27.2842 16.5993 27.2842 16.1658 27.4383L9.59315 29.7755C8.26913 30.2464 6.88518 29.2409 6.92381 27.8362L7.1156 20.8629C7.12825 20.4031 6.98198 19.9529 6.70146 19.5883L2.44753 14.0596C1.5906 12.9458 2.11923 11.3189 3.46712 10.9216L10.1583 8.94912C10.5996 8.81905 10.9825 8.54084 11.2426 8.16138L15.1862 2.40717Z" fill="#FFB802"></path></svg>
                                    <svg style={{ marginRight: '12px' }} width="34" height="31" viewBox="0 0 34 31" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.8" d="M15.1862 2.40717C15.9806 1.24803 17.6913 1.24803 18.4857 2.40717L22.4293 8.16138C22.6893 8.54084 23.0723 8.81905 23.5135 8.94912L30.2047 10.9216C31.5526 11.3189 32.0813 12.9458 31.2243 14.0596L26.9704 19.5883C26.6899 19.9529 26.5436 20.4031 26.5563 20.8629L26.748 27.8361C26.7867 29.2409 25.4027 30.2464 24.0787 29.7755L17.506 27.4383C17.0726 27.2842 16.5993 27.2842 16.1658 27.4383L9.59315 29.7755C8.26913 30.2464 6.88518 29.2409 6.92381 27.8362L7.1156 20.8629C7.12825 20.4031 6.98198 19.9529 6.70146 19.5883L2.44753 14.0596C1.5906 12.9458 2.11923 11.3189 3.46712 10.9216L10.1583 8.94912C10.5996 8.81905 10.9825 8.54084 11.2426 8.16138L15.1862 2.40717Z" fill="#FFB802"></path></svg>
                                    <svg style={{ marginRight: '12px' }} width="34" height="31" viewBox="0 0 34 31" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.8" d="M15.1862 2.40717C15.9806 1.24803 17.6913 1.24803 18.4857 2.40717L22.4293 8.16138C22.6893 8.54084 23.0723 8.81905 23.5135 8.94912L30.2047 10.9216C31.5526 11.3189 32.0813 12.9458 31.2243 14.0596L26.9704 19.5883C26.6899 19.9529 26.5436 20.4031 26.5563 20.8629L26.748 27.8361C26.7867 29.2409 25.4027 30.2464 24.0787 29.7755L17.506 27.4383C17.0726 27.2842 16.5993 27.2842 16.1658 27.4383L9.59315 29.7755C8.26913 30.2464 6.88518 29.2409 6.92381 27.8362L7.1156 20.8629C7.12825 20.4031 6.98198 19.9529 6.70146 19.5883L2.44753 14.0596C1.5906 12.9458 2.11923 11.3189 3.46712 10.9216L10.1583 8.94912C10.5996 8.81905 10.9825 8.54084 11.2426 8.16138L15.1862 2.40717Z" fill="#FFB802"></path></svg>
                                    <svg width="34" height="31" viewBox="0 0 34 31" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.8" d="M15.1862 2.40717C15.9806 1.24803 17.6913 1.24803 18.4857 2.40717L22.4293 8.16138C22.6893 8.54084 23.0723 8.81905 23.5135 8.94912L30.2047 10.9216C31.5526 11.3189 32.0813 12.9458 31.2243 14.0596L26.9704 19.5883C26.6899 19.9529 26.5436 20.4031 26.5563 20.8629L26.748 27.8361C26.7867 29.2409 25.4027 30.2464 24.0787 29.7755L17.506 27.4383C17.0726 27.2842 16.5993 27.2842 16.1658 27.4383L9.59315 29.7755C8.26913 30.2464 6.88518 29.2409 6.92381 27.8362L7.1156 20.8629C7.12825 20.4031 6.98198 19.9529 6.70146 19.5883L2.44753 14.0596C1.5906 12.9458 2.11923 11.3189 3.46712 10.9216L10.1583 8.94912C10.5996 8.81905 10.9825 8.54084 11.2426 8.16138L15.1862 2.40717Z" fill="#FFB802"></path></svg>
                                </div>
                            </div>
                        </div>
                        <div className="btn-rv">
                            <div className="item-btn">
                                <button> Tốt </button>
                                <button> Rất hài lòng </button>
                                <button> Sử dụng tốt </button>
                                <button> Hiệu quả </button>
                                <button> Giá thành hợp lý </button>
                            </div>

                            <div className="form-rp">
                                <div className="label">
                                    Đánh giá
                                </div>
                                <div className="text-input-area">
                                    <textarea />
                                </div>
                            </div>

                            <div className="btn-sub">
                                <div className="row">
                                    <div className="col-6">
                                        <Button className="ant-btn-sub cancel-ant" onClick={handleCancel}>Hủy</Button>
                                    </div>
                                    <div className="col-6">
                                        <Button className="ant-btn-sub" type="primary">Đánh giá</Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Review;