import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from "antd";
import HomeAdd from './pages/homeAdd/home';
import TermsOfUse from './pages/home/termOfUse';
import ProfileAccount from './pages/home/profileAccount';
import Home from './pages/home/home';
import LandingPage from './pages/landingpage/LandingPage';
import Login from './pages/login/login';

const { Header, Content } = Layout;

const App = () => {
    return (
        <Router>
            {/* <Layout className=''>
                <Header className='bg-transparent '>

                </Header>
                <Content className=''> */}
                    <Routes>
                        <Route exact path="/" element={<LandingPage />} />
                        <Route path="/about" element={<LandingPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/home" element={<Home />} />
                        <Route path='/profile-account' element={<ProfileAccount />} />
                        <Route path='/terms-of-use' element={<TermsOfUse />} />
                        <Route path='/home-add' element={<HomeAdd />} />
                    </Routes>
                {/* </Content>
            </Layout> */}
        </Router>
    )
}
export default App;