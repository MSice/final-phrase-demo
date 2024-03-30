<!--
 * @Author: huangwensong
 * @Date: 2024-03-18 20:58:41
 * @LastEditors: suqi04
 * @LastEditTime: 2024-03-30 16:31:26
 * @FilePath: /final-phrase-demo/src/App.vue
 * @Description: 
-->
<template>
    <Header v-if="showHeader"></Header>
    <div :class="['main-body', showHeader ? 'main-body-need-heder' : '']">
        <router-view />
    </div>
    <div class="main-background">
        <div class="main-background-page-name">
            <span>Final</span>
            <span>Phrase</span>
        </div>
    </div>
    <robot v-show="showAirobot"></robot>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
const $route = useRoute();
import robot from '@/components/bot/index.vue';
import Header from '@/components/Header/index.vue';
import useHeader from '@/components/Header/useHeader';
const showAirobot = ref(false);
watch(
    $route,
    val => {
        if (['/', '/home', '/introduction'].includes(val.path)) {
            showHeader.value = false;
            showAirobot.value = false;
        } else {
            showHeader.value = true;
            showAirobot.value = true;
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
        // background-image: @BackgroundImagePurpleLineImg;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }
}
</style>
<style scoped>
.main-background-page-name {
    font-size: min(175px, max(18vw, 150px));
    font-weight: 600;
    height: 100%;
    min-height: 210px;
    line-height: 40vh;
    text-align: center;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

.main-background-page-name span {
    display: block;
    transform: scale(0.8, 1.4);
    text-shadow: 0px 18px 16px #00000040;
}
</style>
