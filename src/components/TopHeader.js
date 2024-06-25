import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined} from '@ant-design/icons';
import { Button, Layout, theme, Dropdown, Space, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

export default function TopHeader({toggleCollapsed, collapsed}) {
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = ()=>{
    localStorage.removeItem("admin")
    navigate('/login');
  }

  const {Username} = JSON.parse(localStorage.getItem("admin"))

  const items = [
    {
      key: '1',
      label: (
        <span>Admin: {Username}</span>
      ),
    },
    {
      key: '4',
      danger: true,
      label: (
          <span onClick={handleLogout}>Login out</span>
      ),
    },
  ];

  return (
    <Header  
      style={{
      padding: 0,
      background: colorBgContainer,
      }}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={toggleCollapsed}
        style={{ fontSize: '16px', width: 64, height: 64 }}
      />
      <div style={{float:"right"}}>
        <span style={{"paddingRight":"10px"}}>Welcome <span style={{color:"#1890ff"}}>{Username}</span> Back</span>
        <Dropdown
              menu={{
                  items,
              }}
          >
              <a onClick={(e) => e.preventDefault()} style={{ paddingRight: '8px' }}>
                  <Space>
                      <Avatar size="large" icon={<UserOutlined />}/>
                  </Space>
              </a>
          </Dropdown>
     </div>
    </Header>
  );
}
