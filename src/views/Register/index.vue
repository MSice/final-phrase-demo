<!--
 * @Author: huangwensong
 * @Date: 2024-03-19 17:12:59
 * @LastEditors: huangwensong
 * @LastEditTime: 2024-03-25 15:36:09
 * @FilePath: /final-phrase-demo/src/views/Register/index.vue
 * @Description: 
-->
<template>
    <div>
        <div @click="goHome">hoone</div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
    router.push('/');
};
</script>
<style lang="less" scoped></style>
