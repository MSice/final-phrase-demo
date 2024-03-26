<!--
 * @Author: huangwensong
 * @Date: 2024-03-18 20:58:41
 * @LastEditors: huangwensong
 * @LastEditTime: 2024-03-26 14:06:00
 * @FilePath: /final-phrase-demo/src/App.vue
 * @Description: 
-->
<template>
    <Header v-if="showHeader"></Header>
    <div :class="['main-body', showHeader ? 'main-body-need-heder' : '']">
        <router-view />
    </div>
    <div class="main-background"></div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
const $route = useRoute();
import Header from '@/components/Header/index.vue';
import useHeader from '@/components/Header/useHeader';
watch(
    $route,
    val => {
        if (['/', '/home'].includes(val.path)) {
            showHeader.value = false;
        } else {
            showHeader.value = true;
        }
    },
    { deep: true }
);
const { showHeader } = useHeader();
</script>

<style lang="less">
@import './style/index.less';
#app {
    font-family: 'SourceSansPro', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
    width: 100%;
    min-width: 980px;
    background: @BackgroundColorImg;
    // background-image: @BackgroundImagePurpleLineImg;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    .main-body {
        height: 100vh;
        overflow-y: scroll;
        width: 100%;
        z-index: 0;
    }
    .main-body-need-heder {
        height: calc(100vh - @HeaderHeight);
    }
    .main-body::-webkit-scrollbar {
        display: none;
    }
    .main-background {
        position: absolute;
        width: 100%;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
        background-image: @BackgroundImagePurpleLineImg;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }
}
</style>
