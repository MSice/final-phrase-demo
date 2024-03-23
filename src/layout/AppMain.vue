<!--
 * @Author: suqi04
 * @Date: 2022-09-26 15:06:50
 * @LastEditTime: 2024-03-23 17:41:08
 * @LastEditors: suqi04
 * @FilePath: /final-phrase-demo/src/layout/AppMain.vue
 * @Description: 路由渲染
-->
<template>
    <section class="app-main">
        <transition
            name="fade-transform"
            mode="out-in"
        >
            <router-view :key="key" />
        </transition>
    </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const $route = useRoute()
const key = computed(() => {
    $route.path
})
</script>

<style scoped>
.app-main {
    height: 100%;
    width: 100%;
    position: relative;
    overflow: scroll;
}
.app-main::-webkit-scrollbar {
    display: none;
}
</style>
