import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined} from '@ant-design/icons';
import { Button, Layout, theme, Dropdown, Space, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

export default function TopHeader() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = ()=>{
    localStorage.removeItem("token")
    navigate('/login');
  }

  const {UserName} = JSON.parse(localStorage.getItem("token"))

  const items = [
    {
      key: '1',
      label: (
        <span>{UserName}</span>
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
        onClick={() => setCollapsed(!collapsed)}
        style={{ fontSize: '16px', width: 64, height: 64 }}
      />
      <div style={{float:"right"}}>
        <span style={{"paddingRight":"10px"}}>Welcome <span style={{color:"#1890ff"}}>{UserName}</span> Back</span>
        <Dropdown
            menu={{
            items,
            }}
        >
            <a onClick={(e) => e.preventDefault()}>
            <Space>
                <Avatar size="large" icon={<UserOutlined />} />
            </Space>
            </a>
        </Dropdown>
     </div>
    </Header>
  );
}
