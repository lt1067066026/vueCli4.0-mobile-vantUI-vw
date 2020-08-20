import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login/index'
Vue.use(Vuex)
export default new Vuex.Store({
    modules: { login },
    state: {
        direction: 'forward'
    },
    mutations: {
        updateDirection (state, direction) {
            state.direction = direction
        }
    },
    actions: {}
})
