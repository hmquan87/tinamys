import React, { useState } from 'react';
import '../style/css/imgnasion.css';
import imgcovn from '../style/img/covn.png';
const Imgnasion = () => {

const [isTaskbarVisible, setTaskbarVisible] = useState(false);

  const showTaskbar = () => {
    setTaskbarVisible(true);
  };

  const hideTaskbar = () => {
    setTaskbarVisible(false);
  };

  return (
    <div className="imgcovn" onMouseEnter={showTaskbar} onMouseLeave={hideTaskbar}>
      <img id="covn" src={imgcovn} alt="" height=''/>
      {isTaskbarVisible && 
        (
          <div className="taskbar">
            <div className="icon">
              <img src={imgcovn} alt="" />
              <p>Việt Nam</p>
            </div>
            <div className="icon">
              <img src={imgcovn} alt="" />
              <p>Việt Nam</p>
            </div>
            <div className="icon">
              <img src={imgcovn} alt="" />
              <p>Việt Nam</p>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Imgnasion;