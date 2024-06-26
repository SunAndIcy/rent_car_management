import { Modal, Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useState } from 'react';

export default function UserForm({ visible, onClose }) {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        setLoading(true);
  
        const { email, password, username } = values;

        const postData = {
            UserName: username,
            Password: password,
            Email: email,
            IsAdmin: true
        };

        axios.post('https://carrentalsystem-backend.azurewebsites.net/api/Auth/register', postData)
            .then(response => {
                console.log('Response:', response.data); 
                message.success('Admin user added successfully.');
                setLoading(false);
                onClose(); 
                window.location.reload();
            })
            .catch(error => {
                console.error('Error adding admin user:', error);
                message.error('Failed to add admin user. Please try again.');
                setLoading(false);
            });
    };

    const handleCancel = () => {
        onClose();
    };

    const validatePassword = (_, value) => {
        if (value && value.length < 8) {
            return Promise.reject('Password must be at least 8 characters long.');
        }
        return Promise.resolve();
    };

    return (
        <Modal
            title="Add Admin User"
            visible={visible}
            onCancel={handleCancel}
            footer={null} 
        >
            <Form
                name="addAdminForm"
                onFinish={handleSubmit}
                layout="vertical" 
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        { required: true, message: 'Please input the username!' }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Please input the email!' },
                        { type: 'email', message: 'Please enter a valid email!' }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: 'Please input the password!' },
                        { validator: validatePassword }
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Submit
                    </Button>
                    <Button onClick={handleCancel} style={{ marginLeft: 10 }}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}
