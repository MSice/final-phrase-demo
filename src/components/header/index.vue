<!--
 * @Author: huangwensong
 * @Date: 2024-03-19 17:18:01
 * @LastEditors: huangwensong
 * @LastEditTime: 2024-03-24 19:27:53
 * @FilePath: /final-phrase-demo/src/components/header/index.vue
 * @Description: 
-->
<template>
    <div class="header">
        <div class="header-left">
            <img
                class="logo"
                src="../../assets/images/logo.png"
                alt=""
                srcset=""
            />
        </div>
        <div class="header-right">
            <span class="title">{{ name }}</span>
            <el-avatar shape="square" :size="40" :src="url" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getUserInfo } from '@/api/index';
const route = useRoute();
const state = reactive({
    url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    name: ''
});
const noLoginList = ['/home', '/register'];

onMounted(() => {
    console.log(route.path);
    if (route.path !== './register')
        getUserInfo().then(user => {
            state.name = `亲爱的${user.name}, 您好！`;
        });
});

const { url, name } = toRefs(state);
</script>
<style lang="less" scoped>
@import '../../style/index.less';

.header {
    background-color: transparent;
    border-bottom: 1px solid #dfdddd;
    height: @HeaderHeight;
    padding: 10px;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
    &-left {
        .logo {
            height: 36px;
            // width: 147px;
            margin-left: 10px;
        }
    }
    &-right {
        display: flex;
        align-items: center;
        .title {
            margin-right: 10px;
            font-size: 14px;
            font-weight: bold;
        }
    }
}
</style>
