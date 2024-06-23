import React,{ useState, useEffect } from 'react'
import { Table } from "antd";
import axios from 'axios'
import Status from './StatusEnum';


export default function RentList() {
    const [dataSource, setDataSource] = useState([])

    useEffect(() => {
        axios.get(`https://carrentalsystem-backend.azurewebsites.net/api/Rentals/all`)
        .then(response => {
          console.log(2222,response.data);
          setDataSource(response.data);
        })
        .catch(error => {
          console.error('Error updating:', error);
        });
      }, []);

    
// CarId
// : 
// 1
// CarMake
// : 
// "abc"
// CarModel
// : 
// "004"
// EndDate
// : 
// "2024-06-18T03:12:54"
// Fee
// : 
// 360
// Id
// : 
// 2
// StartDate
// : 
// "2024-06-12T03:12:54"
// UserId
// : 
// 1
// UserName
// : 
// "pppp"  

    const columns = [
        {
          title: 'Id',
          dataIndex: 'Id',
          key: 'id',
        },
        {
          title: 'UserId',
          dataIndex: 'UserId',
          key: 'userId',
        },
        {
          title: 'User name',
          dataIndex: 'UserName',
          key: 'username',
        },
        {
          title: 'Car id',
          dataIndex: 'CarId',
          key: 'id',
        },
        {
          title: 'Car make',
          dataIndex: 'CarMake',
          key: 'carMake',
        },
        {
          title: 'Car model',
          dataIndex: 'CarModel',
          key: 'carModel',
        },
        {
          title: 'Start date',
          dataIndex: 'StartDate',
          key: 'startDate',
        },
        {
          title: 'End date',
          dataIndex: 'EndDate',
          key: 'endDate',
        },
        {
          title: 'Fee',
          dataIndex: 'Fee',
          key: 'fee',
        },
        {
          title: 'Status',
          dataIndex: 'Status',
          key: 'status',
          render: (status) => {
            switch (status) {
              case Status.Pending:
                return 'Pending';
              case Status.Confirmed:
                return 'Confirmed';
              case Status.Completed:
                return 'Completed';
              case Status.Canceled:
                return 'Canceled';
              default:
                return '';
            }
          },
        },
    ];
      
  return (
    <Table dataSource={dataSource} columns={columns} 
    pagination={{
        pageSize:10
     }}/>
  )
}
