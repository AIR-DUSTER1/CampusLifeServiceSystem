// 导入已配置的axios实例
import axiosInstance from './axios';

// 定义API响应接口，泛型T表示数据部分的具体类型
export interface ApiResult<T> {
    code: number; // API状态码
    message: string; // API消息提示
    data: T; // API实际返回的数据
    headers?: any;
}

// 异步GET请求函数，根据url（请求路径）和可选的params（查询参数）获取数据，返回Promise包装的ApiResult<T>
export async function get<T>(url: string, headers?: any, params?: any): Promise<ApiResult<T>> {
    const response = await axiosInstance.get<ApiResult<T>>(url, { params, headers }); // 发送GET请求
    return response.data; // 返回请求结果中的数据部分
}

// 异步POST请求函数，根据url（请求路径）和可选的data（请求体）发送数据并获取响应，返回Promise包装的ApiResult<T>
export async function post<T>(url: string, data?: any, headers?: any): Promise<ApiResult<T>> {
    const response = await axiosInstance.post<ApiResult<T>>(url, data, headers); // 发送POST请求
    return response.data; // 返回请求结果中的数据部分
}

// 异步PUT请求函数，根据url（请求路径）和可选的data（请求体）发送数据并获取响应，返回Promise包装的ApiResult<T>
export async function put<T>(url: string, data?: any, headers?: any): Promise<ApiResult<T>> {
    const response = await axiosInstance.put<ApiResult<T>>(url, data, headers); // 发送PUT请求
    return response.data; // 返回请求结果中的数据部分
}

// 异步DELETE请求函数，根据url（请求路径）和可选的params（查询参数）删除资源并获取响应，返回Promise包装的ApiResult<T>
export async function del<T>(url: string, headers?: any, params?: any): Promise<ApiResult<T>> {
    const response = await axiosInstance.delete<ApiResult<T>>(url, { params, headers }); // 发送DELETE请求
    return response.data; // 返回请求结果中的数据部分
}