import Vue from 'vue'
import Router from 'vue-router'
import { sessionSetItem } from '../common/util'
import store from '../store/index'
Vue.use(Router)

// 按需（懒）加载
const Home = () => import('../views/homePage/index')
const My = () => import('../views/personalPage/index')
const Login = () => import('../views/loginPage/index')



let base = `${process.env.BASE_URL}` // 动态获取二级目录
export const constantRouterMap = [
    {
        path: '/',
        redirect: 'home',
        meta: {
            auth: false, // 是否需要登录
            keepAlive: false, // 是否缓存组件
            transition: false
        }
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
            auth: false,
            keepAlive: true,
            transition: false
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            auth: false,
            keepAlive: false,
            transition: true
        }
    },
    {
        path: '/my',
        name: 'my',
        component: My,
        meta: {
            auth: true,
            keepAlive: true,
            transition: false
        }
    },
    {
        path: '*',
        redirect: '/'
    }
]
const router = new Router({
    // mode: 'history',
    base: base,
    routes: constantRouterMap,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
});

// 记录页面跳转历史，以此判断页面左滑跳转还是右滑跳转
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

// 全局路由钩子函数 对全局有效
router.beforeEach(async (to, from, next) => {
    let auth = to.meta.auth
    let hasToken = store.getters['login/accessToken'];
    // 页面跳转时候需要切换动画
    if (to.meta.transition) {
        // 当跳转时携带指定方向参数则优先使用指定参数
        if (to.params.direction) {
            store.commit('app/updateDirection', to.params.direction)
        } else {
            const toIndex = history.getItem(to.path)
            const fromIndex = history.getItem(from.path)
            // 判断并记录跳转页面是否访问过，以此判断跳转过渡方式
            if (toIndex) {
                if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
                    store.commit('app/updateDirection', 'forward')
                } else {
                    store.commit('app/updateDirection', 'back')
                }
            } else {
                ++historyCount
                history.setItem('count', historyCount)
                to.path !== '/' && history.setItem(to.path, historyCount)
                store.commit('app/updateDirection', 'forward')
            }
        }
    } else {
        store.commit('app/updateDirection', '')
    }
    if (auth) { // 需要登录
        if (hasToken) {
            if (to.path === '/login') {
                next({ path: "/" });
            } else {
                const hasUserInfo = store.getters["login/userInfo"]
                if (JSON.stringify(hasUserInfo) !== "{}") {
                    next();
                } else {
                    try {
                        await store.dispatch("login/getInfo");
                        next();
                    } catch {
                        await store.dispatch("login/resetAccessToken");
                    }
                }
            }
            next()
        } else {
            router.push({
                path: '/login',
                query: {
                    redirect: to.fullPath
                }
            })
        }
    } else {
        next()
    }
})

export default router;
