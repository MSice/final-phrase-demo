<!--
 * @Author: huangwensong
 * @Date: 2024-03-25 16:26:33
 * @LastEditors: huangwensong
 * @LastEditTime: 2024-03-25 19:30:26
 * @FilePath: /final-phrase-demo/src/views/show-play/editBtn.vue
 * @Description: 
-->
<!--  -->
<template>
    <div class="edit-btn">
        <div class="btn" @click="goPage(1)">全文编辑</div>
        <div class="btn" @click="goPage(2)">场次编辑</div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goPage = (type: number) => {
    router.push({
        path: '/editPlay',
        query: {
            type
        }
    });
};
</script>
<style lang="less" scoped>
.edit-btn {
    position: fixed;
    right: 10px;
    top: 80px;
    display: flex;
    font-size: 14px;
    .btn {
        width: 100px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #b1c6a7;
        padding: 15px;
        cursor: pointer;
        border: 1px solid #fff;
        border-radius: 20px;
        margin-right: 10px;
        color: rgb(95, 94, 92);
        &:hover {
            background-color: #e9f1e9;
            color: rgb(174, 172, 167);
        }
    }
}
</style>
