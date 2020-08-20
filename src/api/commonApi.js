/**
 * 请求统一管理
 */
import Request from '../common/request';

/* Common Api */
export const login = data => Request.post('/h5Login', data); //登录

export default {
    login
};