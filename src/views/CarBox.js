import React, { useState } from 'react';
import { Layout, theme  } from 'antd';
import TopHeader from '../components/TopHeader';
import './CarBox.css'
import SideMenu from '../components/SideMenu';
import { Content } from 'antd/es/layout/layout'
import {Outlet, Routes, Route, Navigate } from 'react-router-dom';
import UserList from './user-manage/UserList';
import CarList from './car-manage/CarList';
import RentList from './rent-manage/RentList';
import Nopermission from './nopermission/Nopermission';
import Home from './home/Home';

export default function CarBox() {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();

    return (
      <Layout>
       <SideMenu></SideMenu>
        <Layout>
          <TopHeader collapsed={collapsed} setCollapsed={setCollapsed} />
          <Content
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                    overflow: "auto"
                }}
                >
                    
               <Routes>
                    <Route path="/" element={<Outlet />}>
                        <Route path="/home" element={<Home />}/>
                        <Route path="/user-manage/list" element={<UserList />} />
                        <Route path="/rent-manage/list" element={<RentList />} />
                        <Route path="/car-manage/list" element={<CarList />} />

                        <Route path="/" element={<Navigate to="/home" replace />} />
                        <Route path="*" element={<Nopermission />} />
                    </Route>
               </Routes>
            
            </Content>    
        </Layout>
      </Layout>
    );
}
