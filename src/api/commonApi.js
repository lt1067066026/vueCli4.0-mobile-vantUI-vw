/**
 * 请求统一管理
 */
import Request from '../common/request';

/* Common Api */
export const login = data => Request.post('/api/login', data); //登录
export const logout = data => Request.get('/api/logout', data,{hideloading:true}); //退出登录
export const getUserInfo = data => Request.get('/api/user', data,{hideloading:true}); //个人信息


export default {
    login,
    getUserInfo,
    logout
};