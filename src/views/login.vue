<template>
    <section class="login">
        <div class="top">
            您好，请登录
        </div>
        <div class="list userNameBox">
            <i></i>
            <input
                type="text"
                placeholder="账号"
                v-model="username"
                autocomplete="off"
            />
        </div>
        <div class="list passwordBox">
            <i></i>
            <input
                type="password"
                placeholder="密码"
                v-model="password"
                autocomplete="off"
            />
        </div>
        <div class="btnBox">
            <button @click="loginBtn" class="loginBtn">登录</button>
        </div>
    </section>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            username: "",
            password: ""
        };
    },
    components: {},
    created() {},
    mounted() {},
    methods: {
        async loginBtn() {
            if (this.username === "" || this.password === "") {
            } else {
                let data = {
                    username: this.username,
                    password: this.password,
                }
                await this.$store
                    .dispatch("login/login", data)
                    .then(res => {
                        const redirect = this.$route.query.redirect || "/";
                        this.$router.replace({
                            path: redirect
                        });
                    })
                    .catch(() => {});
            }
        }
    }
};
</script>
<style scoped lang="scss"></style>
