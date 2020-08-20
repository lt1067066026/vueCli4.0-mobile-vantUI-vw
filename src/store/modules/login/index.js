import { login } from 'api/commonApi'
import { Toast } from 'vant';
export default {
    namespaced: true,
    state: {
        token: localStorage.getItem('token') || '',
        user: JSON.parse(localStorage.getItem('userDate')) || {}
    },
    mutations: {
        SET_LOGIN(state, data) {
            let userDate = data.data;
            state.token = userDate.token;
            state.user = userDate;
            localStorage.setItem('token', userDate.token)
            localStorage.setItem('userDate', JSON.stringify(userDate))
        }
    },
    getters: {
        token(state) {
            return state.token
        },
        user(state) {
            console.log('state', state);
            return state.user
        }
    },
    actions: {
        async login(state, data) {
            try {
                // let res = await login({
                //     username: data.username,
                //     password: data.password
                // })
                // state.commit(SET_LOGIN, res);
                Toast({
                    message: '登陆成功',
                    duration: 2000,
                    forbidClick: true
                });
                setTimeout(() => {
                    console.log(data.$router)
                    const redirect = data.$route.query.redirect || '/';
                    console.log(redirect)
                    data.$router.replace({
                        path: redirect
                    })
                }, 2000);
            } catch (error) {
            }
        }
    }

}
