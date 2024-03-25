<!--
 * @Author: huangwensong
 * @Date: 2024-03-18 20:58:41
 * @LastEditors: suqi04
 * @LastEditTime: 2024-03-24 23:37:14
 * @FilePath: /final-phrase-demo/src/App.vue
 * @Description: 
-->
<template>
    <Header v-if="showHeader"></Header>
    <div class="main-body">
        <router-view />
    </div>
    <div class="main-background"></div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Header from '@/components/Header/index.vue';
import useHeader from '@/components/Header/useHeader';

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
        height: calc(100% - 60px);
        width: 100%;
        z-index: 0;
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
