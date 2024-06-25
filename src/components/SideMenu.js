import React,{ useState } from 'react';
import { Menu } from 'antd';
import { UserOutlined, HomeOutlined, OrderedListOutlined,CarOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

export default function SideMenu({ collapsed }) {

const menuList = [
  {
    key: "/home",
    label: "Home",
    icon: <HomeOutlined />
  },
  {
    key: "/user-manage",
    label: "User Manage",
    icon: <UserOutlined />,
    items: [
      {
        key: "/user-manage/list",
        label: "User List",
      }
    ]
  },
  {
    key: "/car-manage",
    label: "Car Manage",
    icon: <CarOutlined />,
    items: [
      {
        key: "/car-manage/list",
        label: "Car List",
      }
    ]
  },
  {
    key: "/rent-manage",
    label: "Rent Manage",
    icon: <OrderedListOutlined />,
    items: [
      {
        key: "/rent-manage/list",
        label: "Rent List",
      }
    ]
  },
];

const renderMenuItems = (menuList) => {
  return menuList.map(menu => {
    if (menu.items) {
      return (
        <Menu.SubMenu key={menu.key} icon={menu.icon} title={menu.label}>
          {renderMenuItems(menu.items)}
        </Menu.SubMenu>
      );
    } else {
      return (
        <Menu.Item key={menu.key} icon={menu.icon}>
          <Link to={menu.key}>{menu.label}</Link> {/* 使用 Link 组件进行路由导航 */}
        </Menu.Item>
      );
    }
  });
};


  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
    <div style={{display:"flex",height:"100%","flexDirection":"column"}}>
    <div className="logo">Car Rent Manage System</div>
    <div style={{flex:1,"overflow":"auto"}}> 
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        {renderMenuItems(menuList)}
      </Menu>
    </div>
    </div>
  </Sider>
  );
}
