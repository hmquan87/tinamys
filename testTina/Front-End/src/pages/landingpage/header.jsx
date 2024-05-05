import React from 'react';
import '../style/css/header.css';
import logo from '../style/img/logo.svg';
import appstore from '../style/img/App-Store.svg';
import chplay from '../style/img/Play-Store.svg';
import { FiPhoneCall } from "react-icons/fi";
import Imgnasion from './imgnasion';
import {Link} from 'react-router-dom'


const Header = () => {
    return (
        <div className="header">
            <div className="header-left">
                <img id='logo' src={logo} alt="" />
            </div>
            <div className="header-right">
                <img id='img1' src={appstore} alt="" />
                <img id='img1' src={chplay} alt="" />
                <Link to="/login">
                    <button>Trải nghiệm</button>
                </Link>
                <div className="phones">
                    <FiPhoneCall  size={16} id='iconreact'/>
                    <p id="txtphone">Liên hệ với chúng tôi <br/>+(84) 246 329 5589</p>
                </div>
                <Imgnasion/>
            </div>
        </div>
    );
};

export default Header;