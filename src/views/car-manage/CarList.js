import React,{ useState, useEffect, useRef } from 'react'
import { Table, Button, Popconfirm, Modal } from "antd";
import axios from 'axios'
import {
    DeleteOutlined,
    EditOutlined
  } from '@ant-design/icons';
import CarForm from '../../components/car-manage/CarForm';
import dayjs from 'dayjs';
import axiosInstance from '../../utils/AxiosInstance';

export default function CarList() {
    const [dataSource, setDataSource] = useState([])
    const [open, setopen] = useState(false)
    const [updateOpen, setupdateOpen] = useState(false)
    const [selectedCar, setSelectedCar] = useState(null);
    const addForm = useRef(null)
    const updateForm =  useRef(null);
    const [currentUpdate, setcurrentUpdate] = useState(null)


    useEffect(() => {
        axios.get('https://carrentalsystem-backend.azurewebsites.net/api/Cars/all')
        .then((res) => {
            setDataSource(res.data);
        })
        .catch((error) => {
          console.error('Error fetching cars:', error);
        });      
      }, []);

    const handleDelete = (item)=>{
        axiosInstance.delete(`/api/Cars/${item.Id}`)
        .then((response) => {
        
         console.log('Delete successful:', response);
         const updatedDataSource = dataSource.filter(data => data.Id !== item.Id);
         setDataSource(updatedDataSource);

        })
        .catch((error) => {
        console.error('Error deleting:', error);
    
        });
    }

    const handleSave = ()=>{
        addForm.current.validateFields().then(value =>{

        const yearDate = dayjs(value.year).format('YYYY');

        const {Make, Model, Url , Mileage, Price_Per_Day, Available_Now } = value;

        const postData = {
            Make: Make,
            Model: Model,
            Url: Url,
            Mileage: Mileage,
            Year: yearDate,
            Available_Now: Available_Now,
            Price_Per_Day: Price_Per_Day,
          };
          
        axiosInstance.post('/api/Cars', postData)
        .then(response => {
            setDataSource([...dataSource, response]);
        })
        .catch(error => {
            console.error('Error:', error);
        });
        setopen(false)
        // 重置表单
        addForm.current.resetFields()

        }).catch(err=>{
           console.log(err)
        })
    }
    
    const handleUpdate =(item)=>{
        setTimeout(()=>{
          const updatedItem = { ...item };
          // 删除 year 属性
          delete updatedItem.Year;
          setupdateOpen(true);
          setSelectedCar(updatedItem);
          setcurrentUpdate(item)
        },0)
    }

      const updateCar =()=>{
        updateForm.current.validateFields().then(value =>{

            const yearDate = dayjs(value.year).format('YYYY');
    
            const { Make, Model, Url , Mileage, Price_Per_Day, Available_Now } = value;
    
            const updatedData = {
                Id: currentUpdate.Id,
                Make: Make,
                Model: Model,
                Url: Url,
                Mileage: Mileage,
                Year: yearDate,
                Available_Now: Available_Now,
                Price_Per_Day: Price_Per_Day,
              };
              
              axiosInstance.put(`/api/Cars/${currentUpdate.Id}`, updatedData)
              .then(response => {
                console.log('Update successful:', response);
                const updatedDataSource = dataSource.map(item => {
                    if (item.Id === currentUpdate.Id) {
                      return updatedData;
                    }
                    return item;
                  });

                setDataSource(updatedDataSource);
              })
              .catch(error => {
                console.error('Error updating:', error);
              });

            setupdateOpen(false)
            // 重置表单
            updateForm.current.resetFields()
    
            }).catch(err=>{
               console.log(err)
            })
      }

      const columns = [
        {
          title: 'ID|ID',
          dataIndex: 'Id',
          key: 'id',
        },
        {
          title: 'Make|Hanga',
          dataIndex: 'Make',
          key: 'make',
        },
        {
          title: 'Model|Tauira',
          dataIndex: 'Model',
          key: 'model',
        },
        {
          title: 'Year|Tau',
          dataIndex: 'Year',
          key: 'year',
        },
        {
          title: 'Mileage|Maero',
          dataIndex: 'Mileage',
          key: 'mileage',
        },
        {
          title: 'Available Now|Kei te waatea inaianei',
          dataIndex: 'Available_Now',
          key: 'available_Now',
          render: (availableNow) => (
            availableNow ? 'Yes' : 'No'
          ),
        },
        {
          title: 'Image|Whakaahua',
          dataIndex: 'Url',
          key: 'url',
        },
        {
          title: 'Price Per Day|Utu Ia Ra',
          dataIndex: 'Price_Per_Day',
          key: 'price_Per_Day',
        },
        {
            title: 'Options|Kōwhiringa',
            render:(item)=>{
              return <div>
                 <Popconfirm
                    title="Delete the car"
                    description="Are you sure to delete this car?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => handleDelete(item)}
                    >
                    <Button danger shape='circle' icon={<DeleteOutlined />}
                />
                </Popconfirm>
               
                <Button type='primary' shape='circle' icon={<EditOutlined />}
                onClick={()=>handleUpdate(item)}/>
        
              </div>
            }
          },
      ];
      
  return (
    <div>
    <Button type='primary' onClick={()=>{setopen(true)}}>Add Car</Button>

    <Table dataSource={dataSource} columns={columns} 
    pagination={{
        pageSize:10
     }}/>

    <Modal
        open={open}
        title="Add car"
        okText="Confirm"
        cancelText="Cancel"
        onOk={()=> handleSave()}
        onCancel={() => setopen(false)}
        destroyOnClose
      >
         <CarForm ref={addForm} />
    </Modal> 

    <Modal
        open={updateOpen}
        title="Edit car"
        okText="Edit"
        cancelText="Cancel"
        onOk={()=> updateCar()}
        onCancel={() => {
          setupdateOpen(false)
          // 更新updateModal框的是否可以编辑值
        //   setisUpdateDisabled(!isUpdateDisabled)
        }
        }
        destroyOnClose
      >
        {selectedCar && (<CarForm ref={updateForm} initialValues={selectedCar} />)}
    </Modal>

    </div>
  )

}
