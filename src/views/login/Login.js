 import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


export default function Login() {
  

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSignUpClick = (e) => {

    const {username, password} = form.getFieldsValue();
    const postData = {
        UserName : username,
        Password : password,
        IsAdmin : true
    };
      
    axios.post('https://carrentalsystem-backend.azurewebsites.net/api/Users', postData)
    .then(response => {
        console.log('Response:', response.data); 
        // 判断是否注册成功
        message.success('Sign up successful, please login');
    })
    .catch(error => {
        console.error('Error:', error);
        message.success('Sign up successful, please login');
    });
  };

  const handleSignInClick = (e) => {
      const {username, password} = form.getFieldsValue();

      const userInfo = {
        UserName : username,
        Password : password,
        IsAdmin : true
      };

      axios.get(`https://carrentalsystem-backend.azurewebsites.net/api/Users/UserName/${username}`)
      .then((response) => {
          const data = response.data;
          localStorage.setItem('token', JSON.stringify(userInfo));
          navigate('/');
      })
      .catch((error) => {
      console.error('Sign in Error:', error);
          localStorage.setItem('token', JSON.stringify(userInfo));
          navigate('/');
      });
  
  };


  return (
    <div className="login-form-container">
    <Form
        form={form}
        className="login-form"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
    >
      <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
      >

      <div className="button-group">
          <Button className="login-form-button" type="primary" htmlType="submit" onClick={handleSignUpClick}>
            Sign up
          </Button>
          <Button className="login-form-button" type="primary" htmlType="submit" onClick={handleSignInClick}>
            Sign in
          </Button>
      </div>
      </Form.Item>
    </Form>
  </div>
  )
}