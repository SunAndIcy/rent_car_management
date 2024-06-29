import React, { useState, useEffect } from 'react';
import { Table, Tag, Dropdown, Menu, message } from 'antd';
import axios from 'axios';
import axiosInstance from '../../utils/AxiosInstance';

// 枚举定义
const Status = {
  0: 'Pending',
  1: 'Confirmed',
  2: 'Completed',
  3: 'Canceled'
};

export default function RentList() {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {

    fetchRentals();
  }, []);

  const fetchRentals = () => {
    axios.get(`https://carrentalsystem-backend.azurewebsites.net/api/Rentals/all`)
      .then(response => {
        // 数据加载后对状态字段进行处理
        console.log(11111, response.data );
        const dataWithMappedStatus = response.data.map(item => ({
          ...item,
          Status: Status[item.Status] || 'Pending' // 根据枚举值映射状态文本
        }));
        setDataSource(dataWithMappedStatus);
      })
      .catch(error => {
        console.error('Error fetching rentals:', error);
      });
  };

  const handleStatusChange = (record, newStatus) => {
      // record.Status = newStatus;
      const Status = newStatus;
      axiosInstance.put(`/api/Rentals/status/${record.Id}`, {Status})
      .then(response => {
        message.success('Status updated successfully.');
        fetchRentals(); // 更新成功后重新加载数据
      })
      .catch(error => {
        console.error('Error updating status:', error);
        message.error('Failed to update status.');
      });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'blue';
      case 'Confirmed':
        return 'green';
      case 'Completed':
        return 'cyan';
      case 'Canceled':
        return 'red';
      default:
        return 'default';
    }
  };

  const renderStatusAction = (record) => (
    <Dropdown
      overlay={renderStatusMenu(record)}
      placement="bottomRight"
      trigger={record.Status !== 'Canceled' ? ['click'] : []}
    >
      <Tag color={getStatusColor(record.Status)}>{record.Status}</Tag>
    </Dropdown>
  );

  const renderStatusMenu = (record) => {
    if (record.Status === 'Canceled') {
      return null; // 当 Status 等于 3 时返回 null，即不渲染菜单
    }
  
    return (
      <Menu onClick={({ key }) => handleStatusChange(record, parseInt(key))}>
        <Menu.Item key="1" disabled={record.Status >= 1}>
          {Status[1]}
        </Menu.Item>
        <Menu.Item key="2" disabled={record.Status >= 2}>
          {Status[2]}
        </Menu.Item>
        <Menu.Item key="3" disabled={record.Status >= 3}>
          {Status[3]}
        </Menu.Item>
      </Menu>
    );
  };

  const columns = [
    {
      title: 'ID|ID',
      dataIndex: 'Id',
      key: 'id',
    },
    {
      title: 'UserId|KaiwhakamahiId',
      dataIndex: 'UserId',
      key: 'userId',
    },
    {
      title: 'User name|Ingoa Kaiwhakamahi',
      dataIndex: 'UserName',
      key: 'username',
    },
    {
      title: 'CarId|Waka Id',
      dataIndex: 'CarId',
      key: 'carId',
    },
    {
      title: 'Car make|Hanga waka',
      dataIndex: 'CarMake',
      key: 'carMake',
    },
    {
      title: 'Car model|Tauira waka',
      dataIndex: 'CarModel',
      key: 'carModel',
    },
    {
      title: 'Start date|Te ra timata',
      dataIndex: 'StartDate',
      key: 'startDate',
    },
    {
      title: 'End date|Te ra mutunga',
      dataIndex: 'EndDate',
      key: 'endDate',
    },
    {
      title: 'Fee|Utu',
      dataIndex: 'Fee',
      key: 'fee',
    },
    {
      title: 'Status|Tūnga',
      dataIndex: 'Status',
      key: 'status',
      render: (status, record) => renderStatusAction(record),
    },
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={{
        pageSize: 10
      }}
    />
  );
}
