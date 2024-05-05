import React from 'react';
import { createRoot } from 'react-dom/client'
import LandingPage from './pages/landingpage/LandingPage';
import Login from './pages/login/login';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/home/home';
// import Home from './pages/homeTw/home';
import ProfileAccount from './pages/home/profileAccount';
import TermsOfUse from './pages/home/termOfUse';
import './index.css'
import HomeAdd from './pages/homeAdd/home';
import { Layout } from 'antd';
import App from './App'


createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   <Router>
  //     <Layout>

  //       <Routes>
  //         <Route exact path="/" element={<LandingPage />} />
  //         <Route path="/about" element={<LandingPage />} />
  //         <Route path="/login" element={<Login />} />
  //         <Route path="/home" element={<Home />} />
  //         <Route path='/profile-account' element={<ProfileAccount />} />
  //         <Route path='/terms-of-use' element={<TermsOfUse />} />
  //         <Route path='/home-add' element={<HomeAdd />} />
  //       </Routes>
        

  //     </Layout>


  //   </Router>
  // </React.StrictMode>
  <React.StrictMode>
    <App />
  </React.StrictMode>

);
reportWebVitals();
