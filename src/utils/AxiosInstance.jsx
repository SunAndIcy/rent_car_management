import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
    baseURL: 'https://carrentalsystem-backend.azurewebsites.net', 
    timeout: 10000, 
    // withCredentials: true, 
});

// 请求拦截器
axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get('adminToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // 请求错误处理
        return Promise.reject(error);
    }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
    (response) => {
        // 可以在这里统一处理返回结果
        return response.data;
    },
    (error) => {
        // 响应错误处理
        return Promise.reject(error);
    }
);

export default axiosInstance;