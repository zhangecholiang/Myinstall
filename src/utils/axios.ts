/*
 * @Date: 2022-07-20 19:27:40
 * @LastEditors: OBKoro1
 * @LastEditTime: 2022-07-21 17:43:25
 * @FilePath: \hfxc-screen\src\utils\axios.ts
 */
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
// 数据返回的接口
// 定义请求响应参数，不含data
interface Result {
    code: number;
    msg?: string
}

// 请求响应参数，包含data
interface ResultData<T = any> extends Result {
    data?: T;
    daily?: T;
    now?: T;
}
const URL: string = 'http://222.92.32.56:8002'
enum RequestEnums {
    TIMEOUT = 10000,
    SUCCESS = 200, // 请求成功
}
const config = {
    // 默认地址
    baseURL: URL,
    // 设置超时时间
    timeout: RequestEnums.TIMEOUT,
    // 跨域时候允许携带凭证
    // withCredentials: true
}

class RequestHttp {
    // 定义成员变量并指定类型
    service: AxiosInstance;
    public constructor(config: AxiosRequestConfig) {
        // 实例化axios
        this.service = axios.create(config);

        /**
         * 请求拦截器
         * 客户端发送请求 -> [请求拦截器] -> 服务器
         * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
         */
        // this.service.interceptors.request.use(
        //     (config: AxiosRequestConfig) => {
        //         const token = useStore().token || '';
        //         return {
        //             ...config,
        //             headers: {
        //                 'Authorization': token, // 请求头中携带token信息
        //             }
        //         }
        //     },
        //     (error: AxiosError) => {
        //         // 请求报错
        //         Promise.reject(error)
        //     }
        // )

        /**
         * 响应拦截器
         * 服务器返回信息 -> [响应拦截器] -> 客户端JS获取到信息
         */
        this.service.interceptors.response.use(
            (response: AxiosResponse) => {
                const { data } = response
                // 全局错误信息拦截
                if (data.code && data.code != RequestEnums.SUCCESS) {
                    ElMessage.error(data.msg || '请求出错')
                    // return Promise.reject(data.msg)
                }
                return data;
            },
            (error: AxiosError) => {
                const { response } = error;
                if (response && response.status !== RequestEnums.SUCCESS) {
                    ElMessage.error('请求失败')
                }
            }
        )
    }

    // 常用方法封装
    get<T>(url: string, params?: object): Promise<ResultData<T>> {
        return this.service.get(url, params);
    }
    post<T>(url: string, params?: object): Promise<ResultData<T>> {
        return this.service.post(url, params);
    }
    put<T>(url: string, params?: object): Promise<ResultData<T>> {
        return this.service.put(url, params);
    }
    delete<T>(url: string, params?: object): Promise<ResultData<T>> {
        return this.service.delete(url, { params });
    }
}

// 导出一个实例对象
export default new RequestHttp(config);
