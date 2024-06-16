import React, { useState } from 'react'
import { Layout } from 'antd'
import '../style/css/asset.css'
import HeaderHomeAdd from './pages/headerHomeAdd';
import HomePage from './pages/homePage';
import SiderHome from './pages/siderhome';
import ListGr from './pages/ListGr';
import ListPs from './pages/ListPs';
import ListPerson from './pages/ListPerson';
import News from './pages/news';
import NewsManagement from './pages/newsManagement';
import EditCompany from './pages/EditCompany';
import TargetPerson from './pages/targetPerson';
import TargetCompany from './pages/targetCompany';
import DailyTask from './pages/DailyTask';
const { Header, Content } = Layout;

const data = [
    { key: 'n1', component: <ListGr /> },
    { key: 'n2', component: <ListPs /> },
    { key: 'n3', component: <ListPerson /> },
    { key: 'n4', component: <News /> },
    { key: 'n5', component: <NewsManagement /> },
    { key: 'n6', component: <EditCompany /> },
    { key: 'nav1', component: <HomePage/> },
    { key: 'nav2', component: <TargetPerson /> },
    { key: 'nav3', component: <TargetCompany/> },
    { key: 'nav4', component: <DailyTask/> },
]

const HomeAdd = () => {
    const [checkPath, setCheckPath] = useState('nav1')
    console.log(checkPath);
    return (
        <>
            <Layout className="relative bg-transparent min-h-[100%] min-w-[100%]">
                <Header className='relative bg-inherit flex items-center justify-between border-b border-zinc-300'>
                    <HeaderHomeAdd setCheckPath={setCheckPath} />
                </Header>

                <Layout className='min-h-[100%] min-w-[100%]'>
                    <Content className='flex'>
                        <div className='relative w-[13%] min-h-[93vh] border-r border-zinc-300 bg-white'>
                            <SiderHome
                                className="min-h-[100%] w-[100%] "
                                setCheckPath={setCheckPath} 
                            />
                        </div>
                        <div className='w-[87%] min-h-[100%] bg-white'>
                            {data.map(item => (
                                item.key === checkPath ? <>{item.component}</> : null
                            ))}
                        </div>

                    </Content>
                </Layout>

            </Layout>
        </>
    )
}

export default HomeAdd;

