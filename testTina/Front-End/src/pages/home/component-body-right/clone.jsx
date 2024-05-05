import React from 'react'
import notifi from '../../style/img/robot-mys.png';
import '../../style/css/task.css'

function Clone() {
  return (
    <div className='notifi-full'>
      <div className="notifi">
        <div className="img-notifi">
          <img src={notifi} alt="" />
        </div>
        <div className="text-notifi">
          <div className="text-notifi-top">
            Trang chủ của bạn đang được theo dõi và cập nhật
          </div>
          <div className="text-notifi-bottom">
            Khi các thành viên ở các không gian làm việc để lại bình luận hay thả cảm xúc vào bảng công việc, tiến độ dự án hay các hoạt động quan trọng trọng khác sẽ được hiện thị ở đây.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Clone