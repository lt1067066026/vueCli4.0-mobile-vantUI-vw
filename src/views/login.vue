<template>
    <section class="login">
        <div class="top">
            您好，请登录
        </div>
        <div class="list userNameBox">
            <i></i>
            <input type="text" placeholder="账号" v-model="username" autocomplete='off'>
        </div>
        <div class="list passwordBox">
            <i></i>
            <input type="password" placeholder="密码" v-model="password" autocomplete='off'>
        </div>
        <div class="btnBox">
        <button @click="loginBtn" class="loginBtn">登录</button>

        </div>
    </section>
</template>

<script>
// @ is an alias to /src
import {
    mapActions
} from 'vuex';
export default {
    name: 'login',
    data() {
        return {
            username: '',
            password: ''
        };
    },
    components: {},
    created() {},
    mounted() {},
    methods: {
        ...mapActions('login', ['login']),
        loginBtn() {
            if (this.username === '' || this.password === '') {
                
            } else {
                this.login({
                    username: this.username,
                    password: this.password,
                    $router: this.$router,
                    $route: this.$route
                });
            }
        }
    }
};
</script>
<style scoped lang="scss">

</style>
