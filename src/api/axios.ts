import axios from 'axios'
import type { InternalAxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios'
import UserTokenexpiredinterceptor from '../interceptors/UserTokenexpiredinterceptor'
import { ApiAddress } from '@/setting/setting'
const axiosInstance: AxiosInstance = axios.create({
    baseURL: ApiAddress,
    timeout: 5000,
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

