import axios from 'axios';
import store from '@/store'
import { baseApi } from '@/config'
import { Toast } from 'vant'
import router from "@/router";
import qs from "qs";


/**
 * 自定义Axios实例
 */
const service = axios.create({
    baseURL: baseApi,
    timeout: 5000,
    headers: {
        "Content-Type": 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    withCredentials: false
});

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
    router.replace({
        path: '/login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    });
}

/**
 * 刷新token并请求上一接口
 */
async function doRequest(response) {
    await store.dispatch("login/refreshToken", response.data.data)
    let config = response.config
    config.headers.Authorization = "Bearer" + response.data.data
    let res = await axios.request(config)
    return res.data
}

// 添加请求拦截器
service.interceptors.request.use(
    config => {
        if (store.getters["login/accessToken"]) {
            config.headers['Authorization'] = "Bearer" + store.getters["login/accessToken"]
        }
        if (config.data) {
            config.data = qs.stringify(config.data);
        }
        // 不传递默认开启loading
        if (!config.hideloading) {
            // loading
            Toast.loading({
                forbidClick: true
            })
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// 添加响应拦截器
service.interceptors.response.use(
    response => {
        Toast.clear()
        const res = response.data

        if (res.code == 401) {
            // 未认证或token已失效需要重新登录
            if (res.code === 401) {
                Toast.fail(res.msg);
                store.dispatch("login/resetAccessToken");
                toLogin()
            }
            return Promise.reject(res || 'error')
        } else if (res.code === 403) {
            // token过期，无感刷新token
            // console.log(response)
            
            return doRequest(response)
        } else if (res.code === 0) {
            // 正常请求返回
            return Promise.resolve(res)
        } else {
            // 其他状态码
            Toast.fail(res.msg);
            return Promise.reject(res || 'error')
        }

    },
    error => {
        Toast.clear()
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)
// 定义对外Get、Post、File请求
export default {
    get(url, param = {}, hideloading = {}, headers = {}) {
        return service.get(url, {
            params: param,
            headers,
            hideloading: false
        })
    },
    post(url, param = null, hideloading = {}, headers = {}) {
        return service.post(url, param, {
            headers,
            hideloading: false
        })
    },
    put(url, param = null, hideloading = {}, headers = {}) {
        return service.put(url, param, {
            headers,
            hideloading: false
        })
    },
    file(url, param = null, headers = {}) {
        return service.post(url, param, {
            headers: Object.assign({
                'Content-Type': 'multipart/form-data'
            }, headers)
        })
    },
    delete(url, param = null, headers = {}) {
        return service.delete(url, {
            param,
            headers: Object.assign({
                'Content-Type': 'multipart/form-data'
            }, headers)
        })
    }
}
