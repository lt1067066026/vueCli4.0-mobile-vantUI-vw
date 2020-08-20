import axios from 'axios';
import store from '@/store'
import { baseApi } from '@/config'
import { Toast } from 'vant'


/**
 * 自定义Axios实例
 */
const service = axios.create({
    baseURL: baseApi,
    timeout: 5000,
    withCredentials: true
});

// 添加请求拦截器
service.interceptors.request.use(
    config => {
        // 不传递默认开启loading
        if (!config.hideloading) {
            // loading
            Toast.loading({
                forbidClick: true
            })
        }
        if (store.getters.login.accessToken) {
            config.headers['X-Token'] = ''
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
        if (res.status && res.status !== 200) {
            // 登录超时,重新登录
            if (res.status === 401) {
                store.dispatch('login/logout').then(() => {
                    location.reload()
                })
            }
            return Promise.reject(res || 'error')
        } else {
            return Promise.resolve(res)
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
    get(url, param = {}, headers = {}) {
        return AJAX.get(url, {
            params: param,
            headers,
        })
    },
    post(url, param = null, headers = {}) {
        return AJAX.post(url, param, {
            headers,
        })
    },
    put(url, param = null, headers = {}) {
        return AJAX.put(url, param, {
            headers,
        })
    },
    file(url, param = null, headers = {}) {
        return AJAX.post(url, param, {
            headers: Object.assign({
                'Content-Type': 'multipart/form-data'
            }, headers)
        })
    },
    delete(url, param = null, headers = {}) {
        return AJAX.delete(url, {
            param,
            headers: Object.assign({
                'Content-Type': 'multipart/form-data'
            }, headers)
        })
    }
}
