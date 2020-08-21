<template>
    <div class="login-page">
        <van-form @submit="onSubmit">
            <van-field
                v-model="form.username"
                name="用户名"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="form.password"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            form: {
                username: "",
                password: ""
            }
        };
    },
    components: {},
    created() {},
    mounted() {},
    methods: {
        async onSubmit() {
            let data = {
                username: this.form.username,
                password: this.form.password
            };
            // var res = await this.$api.login(data)
            await this.$store
                .dispatch("login/login", data)
                .then(res => {
                    const redirect = this.$route.query.redirect || "/";                    
                    this.$router.replace({
                        path: redirect
                    });
                })
                .catch((error) => {
                    console.log(error)
                });
        }
    }
};
</script>
<style scoped lang="scss"></style>
