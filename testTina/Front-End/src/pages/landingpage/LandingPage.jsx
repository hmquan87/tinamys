import React, { useRef } from "react";
import "../style/css/App.css";
import Page from "./page";
import Header from "./header";
import { FaRegStar } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoMdArrowUp } from "react-icons/io";
function App() {

  const sec1Ref = useRef(null);

  const handleScrollToSec1 = () => {
    sec1Ref.current.scrollIntoView({ behavior: "smooth" });
    console.log("CLicked");
  };
  const sec1Ref1 = useRef(null);

  const handleScrollToSec11 = () => {
    sec1Ref1.current.scrollIntoView({ behavior: "smooth" });
    console.log("CLicked");
  };
  const sec1Ref2 = useRef(null);

  const handleScrollToSec12 = () => {
    sec1Ref2.current.scrollIntoView({ behavior: "smooth" });
    console.log("CLicked");
  };


  return (
    <div>
      <div className="full" >
        <div className="headerapp">
          <Header />
          <div className="gr-btn">
            <div className="gr-item-btn" onClick={handleScrollToSec1}>
              <div className="text-item-btn" >
                Ưu điểm
              </div>
              <div className="img-icon">
                <FaRegStar size={20} />
              </div>
            </div>
            <div className="gr-item-btn2 mgb" onClick={handleScrollToSec11}>
              <div className="text-item-btn">
                Liên hệ
              </div>
              <div className="img-icon ">
                <MdOutlineEmail size={20} />
              </div>
            </div>
            <div className="gr-item-btn1 mgb" onClick={handleScrollToSec12}>
              <div className="text-item-btn">
                Trang đầu
              </div>
              <div className="img-icon">
                <IoMdArrowUp size={20} />
              </div>
            </div>
          </div>
        </div>
        <div className="botton">
          <div className="scrollable-container">
            <Page sec1Ref={sec1Ref} sec1Ref1={sec1Ref1} sec1Ref2={sec1Ref2 } />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


