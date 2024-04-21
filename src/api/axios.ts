import { Message } from '@arco-design/web-vue';
import axios from 'axios';
import type { InternalAxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';
import UserTokenexpiredinterceptor from '@/interceptors/UserTokenexpiredinterceptor'
const axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://feiniao-api.xkaipro.com:7940/',
    timeout: 50000,
});

// 添加请求拦截器
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 在发送请求之前做些什么
        return config;
    },
    (error: any) => {
        // 处理请求错误
        return Promise.reject(error);
    },
);

// 添加响应拦截器
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // 对响应数据做点什么
        return response;
    },
    (error: any) => {
        // 处理响应错误
        UserTokenexpiredinterceptor(error.response)
        return Promise.reject(error);
    },
);

export default axiosInstance;

