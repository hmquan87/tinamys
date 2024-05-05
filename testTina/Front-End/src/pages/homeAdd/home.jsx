import React, { useState } from 'react'
import { Layout } from 'antd'
import '../style/css/asset.css'
import HeaderHomeAdd from './pages/headerHomeAdd';
import HomePage from './pages/ListPs';
import SiderHome from './pages/siderhome';
import ListGr from './pages/ListGr';
import ListPs from './pages/ListPs';
import ListPerson from './pages/ListPerson';
import News from './pages/news';

const { Header,  Content } = Layout;

const data = [
    { key: 'n1', component: <ListGr /> },
    { key: 'n2', component: <ListPs /> },
    { key: 'n3', component: <ListPerson /> },
    { key: 'n4', component: <News/> },
    { key: 'n5', component: <></> },
    { key: 'n6', component: <></> },
    { key: 'nav1', component: <></> },
    { key: 'nav2', component: <></> },
    { key: 'nav3', component: <></> },
    { key: 'nav4', component: <></> },
]

const HomeAdd = () => {


    const [checkPath, setCheckPath] = useState('')
    console.log(checkPath);



    return (
        <>
            <Layout className="relative bg-transparent min-h-[100%] min-w-[100%]">
                <Header className='relative bg-inherit flex items-center justify-between border-b border-zinc-300'>
                    <HeaderHomeAdd />
                </Header>

                <Layout className='min-h-[100%] min-w-[100%]'>
                    <Content className='flex'>
                        <div className='relative w-[15%] min-h-[93vh] border-r border-zinc-300 bg-white'>
                            <SiderHome
                                className="min-h-[100%] w-[100%] "
                                setCheckPath={setCheckPath}
                            />
                        </div>
                        <div className='w-[85%] min-h-[100%] bg-white'>
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

