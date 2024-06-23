import React,{ useState, useEffect } from 'react'
import { Table, Button } from "antd";
import axios from 'axios'

export default function UserList() {
    const [dataSource, setdataSource] = useState([])
    const [open, setopen] = useState(false)

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await axios.get('https://carrentalsystem-backend.azurewebsites.net/api/Users/all');
            setdataSource(response.data);
          } catch (error) {
            console.error('Error fetching cars:', error);
          }
        };
    
        fetchUsers();
      }, []);


      const columns = [
        {
          title: 'ID',
          dataIndex: 'Id',
          key: 'id',
        },
        {
          title: 'Username',
          dataIndex: 'Username',
          key: 'username',
        },
        {
          title: 'Email',
          dataIndex: 'Email',
          key: 'email',
        },
        {
          title: 'Admin',
          dataIndex: 'IsAdmin',
          key: 'isAdmin',
          render: (isAdmin) => (
            isAdmin ? 'Yes' : 'No'
          ),
        },
      ];      
      
  return (
    <div>
    <Button type='primary' onClick={()=>{setopen(true)}}>Add User</Button>
    <Table dataSource={dataSource} columns={columns} 
    pagination={{
        pageSize:10
     }}/>

    </div>
  )
}
