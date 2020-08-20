<template>
    <div class="tab-bar">
        <van-tabbar :fixed='false' route v-model="active" @change="handleChange">
            <van-tabbar-item
                v-for="(item, index) in tabs"
                :to="item.to"
                :icon="item.icon"
                :key="index"
            >
                {{ item.title }}
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    props: {
        defaultActive: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            tabs: [
                {
                    title: "首页",
                    to: {
                        name: "home"
                    },
                    icon: "home-o"
                },
                {
                    title: "关于我",
                    to: {
                        name: "my"
                    },
                    icon: "user-o"
                }
            ],
            active: this.defaultActive
        };
    },
    methods: {
        handleChange(value) {
            this.$emit("change", value);
        }
    }
};
</script>

<style lang="scss" scoped>
.tab-bar{
    width: 100%;
    .van-tabbar-item{
        width: 50px;
    }
}

</style>
