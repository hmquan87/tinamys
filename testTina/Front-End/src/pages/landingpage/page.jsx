import React from 'react';
import '../style/css/page1.css';
import { AiOutlineDownload } from "react-icons/ai";
import imgst1 from '../style/img/image-section-one.png';
import Item1 from './item1';
import Section2 from './section2';
import Idea from './idea';
import Footer from "./footer";


const Page1 = ({ sec1Ref, sec1Ref1, sec1Ref2 }) => {



    return (
        <div className="all" >
            <div className="page1">
                <div className="top">
                    <div className="page1-top" ref={sec1Ref2}>
                        <div className="title">
                            <h1 id='tt1' >Thay đổi cách quản lý công việc</h1>
                            <h1 id='tt2'>Mapping Your Success</h1>
                        </div>
                        <div className="list mb-3">
                            <Idea />
                        </div>
                        <div className="top-btn">
                            <button id='btn1'> <AiOutlineDownload id='download' size={20} /><p>Tải Profile</p> </button>
                            <button id='btn2'> <p>Trải nghiệm ngay!</p> </button>
                        </div>
                        <img id='imgp1' src={imgst1} alt="" />
                    </div>
                </div>

                <div className="bottom">
                    <div>
                        <Item1 />
                    </div>

                    <div ref={sec1Ref} style={{ paddingTop: "40px" }}>
                        <Section2 sec1Ref1={sec1Ref1} />
                    </div>

                </div>
                <Footer />
            </div>


        </div>
    );
}



export default Page1;