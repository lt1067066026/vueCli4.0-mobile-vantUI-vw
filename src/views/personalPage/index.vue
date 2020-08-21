<template>
    <div class="personal-page">
        <p>欢迎登录： {{ userInfo.realname }}</p>

        <van-button type="primary" @click="test">测试token刷新</van-button>
        <van-button type="danger" @click="handleLogOut">退出登录</van-button>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "Personal",
    computed: {
        ...mapGetters({
            userInfo: "login/userInfo"
        })
    },
    data() {
        return {};
    },
    created() {},
    mounted() {},
    methods: {
        test() {
            this.$api
                .getUserInfo()
                .then(res => {
                    console.log(res, "=====2020");
                })
                .catch(error => {
                    console.log(error);
                });
        },
        handleLogOut() {
            this.$dialog
                .confirm({
                    title: "退出登录",
                    message: "您确定要退出登录吗？"
                })
                .then(async () => {
                    await this.$store.dispatch("login/logout");
                    this.$router.replace({path:'/home'});
                    // if (recordRoute) {
                    //   const fullPath = this.$route.fullPath;
                    //   this.$router.push(`/login?redirect=${fullPath}`);
                    // } else {
                    //   this.$router.push("/login");
                    // }
                })
                .catch(() => {
                    // on cancel
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.personal-page {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
