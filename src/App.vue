<template>
    <div id="app">
        <transition-group :name="transitionName">
            <div key="keep-alive" v-if="$route.meta.keepAlive">
                <keep-alive>
                    <Layout>
                        <router-view />
                    </Layout>
                </keep-alive>
            </div>
            <Layout v-if="!$route.meta.keepAlive" key="not-keep-alive">
                <router-view />
            </Layout>
        </transition-group>
    </div>
</template>

<script>
import Layout from "@/layouts";
export default {
    name: "App",
    computed: {
        transitionName() {
            return this.$store.state.app.direction;
        }
    },
    components: {
        Layout
    },
};
</script>

<style lang="scss">
@import "./style/normalize.scss";
@import "./style/reset.scss";
@import "./style/common.scss";
@import "~@/assets/iconfont/iconfont.css";
#app {
    font-size: $font-size-base;
    color: $color-common;
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "SF UI Text",
        "Helvetica Neue", STHeiti, "Microsoft Yahei", Tahoma, Simsun, sans-serif;
}
.router {
    width: 100%;
    height: 100%;
    height: 100vh;
    overflow: scroll;
    position: fixed;
    overflow: hidden !important;
    overflow-y: auto !important;
    -webkit-overflow-scrolling: touch;
    background: #f0f0f0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #f2f2f2;
}
</style>
