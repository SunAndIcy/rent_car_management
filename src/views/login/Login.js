import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Cookies from 'js-cookie';



export default function Login() {

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [token, setToken] = useState(Cookies.get('token') || '');

  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Received values:', values);

    const {email, password} = values;
    
    const postData = {
        Email : email,
        Password : password,
        // IsAdmin : true
    };

    axios.post('https://carrentalsystem-backend.azurewebsites.net/api/Auth/login', postData)
        .then(response => {
            console.log('Response:', response.data); 
            if (response.data.Message === 'Login successful') {  
                // 设置token                  
                const authToken = response.data.Token;
                Cookies.set('adminToken', authToken, { expires: 7, path: '/' }); 
                setToken(authToken); 
                
                // 保存user
                localStorage.setItem('admin',JSON.stringify(response.data.user));
                setLoggedInUser(response.data.user.Username); 

                message.success('Sign in successful');
                navigate('/');
            } else {
                message.error('Failed to sign in, the email or password not correct, please try again later');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            message.error('Failed to sign in, the email or password not correct, please try again later');
        });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Please check your input!');
  };

  return (
    <div className="login-form-container">
      <Form
        name="login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
            {
              type: 'email',
              message: 'Please enter a valid email address',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button" size="large">
            Sign in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
