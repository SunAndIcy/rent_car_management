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
    label: "Kainga|Home",
    icon: <HomeOutlined />
  },
  {
    key: "/user-manage",
    label: "Whakahaere Kaiwhakamahi|User Manage",
    icon: <UserOutlined />,
    items: [
      {
        key: "/user-manage/list",
        label: "Rarangi Kaiwhakamahi|User List",
      }
    ]
  },
  {
    key: "/car-manage",
    label: "Whakahaere Waka|Car Manage",
    icon: <CarOutlined />,
    items: [
      {
        key: "/car-manage/list",
        label: "Rarangi waka|Car List",
      }
    ]
  },
  {
    key: "/rent-manage",
    label: "Whakahaere Reti|Rent Manage",
    icon: <OrderedListOutlined />,
    items: [
      {
        key: "/rent-manage/list",
        label: "Rarangi Reti|Rent List",
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
    <Sider width={320} trigger={null} collapsible collapsed={collapsed}>
    <div style={{display:"flex",height:"100%","flexDirection":"column"}}>   
    <div style={{ marginBottom: '10px' }}>
        {/* <div className="logo" style={{ height: '40px', lineHeight: '40px', textAlign: 'center', color: 'white' }}>Pūnaha Whakahaere Reti Waka</div> */}
        <div className="logo" style={{ height: '40px', lineHeight: '40px', textAlign: 'center', color: 'white' }}>Car Rent Manage System</div>
    </div>

    <div style={{flex:1,"overflow":"auto"}}> 
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        {renderMenuItems(menuList)}
      </Menu>
    </div>
    </div>
  </Sider>
  );
}
