<!--
 * @Author: huangwensong
 * @Date: 2024-03-25 16:26:33
 * @LastEditors: huangwensong
 * @LastEditTime: 2024-04-06 15:55:01
 * @FilePath: /final-phrase-demo/src/views/show-play/editBtn.vue
 * @Description: 
-->
<!--  -->
<template>
    <div class="edit-btn">
        <div
            class="btn"
            @click="goPage(1)"
        >全文编辑</div>
        <div
            class="btn"
            @click="goPage(2)"
        >场次编辑</div>
        <div
            class="btn"
            @click="downLoadAll"
        >下载剧本</div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { downLoadWordDoc } from '@/utils';
import PlayInfo from '@/store/palyInfo';
const { state, Prequel } = PlayInfo();

const router = useRouter();
const $route = useRoute();
async function downLoadAll() {

    const dom = state.content.map(item => {
        return `<h3>${item.sessionTitle}</h3>${item.text}`
    }).join('')
    downLoadWordDoc(dom, state.title)
    if ($route.query.showScript !== 'read') {
        const dom2 = Prequel.content.map(item => {
            return `<h3>${item.sessionTitle}</h3>${item.text}`
        }).join('')
        downLoadWordDoc(dom2, Prequel.title)
    }
}
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
