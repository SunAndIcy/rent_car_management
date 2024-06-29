import React,{ useState, useEffect } from 'react'
import { Table, Button } from "antd";
import axios from 'axios'
import UserForm from '../../components/user-manage/UserForm';

export default function UserList() {
    const [dataSource, setdataSource] = useState([])
    const [formVisible, setFormVisible] = useState(false);

    const handleButtonClick = () => {
        setFormVisible(true);
    };

    const handleCloseForm = () => {
        setFormVisible(false);
    };

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
          title: 'ID|ID',
          dataIndex: 'Id',
          key: 'id',
        },
        {
          title: 'Username|Ingoa Kaiwhakamahi',
          dataIndex: 'Username',
          key: 'username',
        },
        {
          title: 'Email|Īmēra',
          dataIndex: 'Email',
          key: 'email',
        },
        {
          title: 'Admin|Kaiwhakahaere',
          dataIndex: 'IsAdmin',
          key: 'isAdmin',
          render: (isAdmin) => (
            isAdmin ? 'Yes' : 'No'
          ),
        },
      ];      
      
  return (
    <div>
    <Button type="primary" onClick={handleButtonClick}>
                Add admin user
    </Button>
    <UserForm visible={formVisible} onClose={handleCloseForm} />
    <Table dataSource={dataSource} columns={columns} 
    pagination={{
        pageSize:10
     }}/>

    </div>
  )
}
