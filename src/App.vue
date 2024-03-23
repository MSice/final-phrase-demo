<!--
 * @Author: huangwensong
 * @Date: 2024-03-18 20:58:41
 * @LastEditors: suqi04
 * @LastEditTime: 2024-03-23 19:55:09
 * @FilePath: /final-phrase-demo/src/App.vue
 * @Description: 
-->
<template>
    <login-wide></login-wide>
    <router-view />
</template>

<script setup lang="ts">
import loginWide from '@/components/login/index.vue'
</script>


<style lang="less">
@import './style/index.less';
#app {
    font-family: 'SourceSansPro', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
    width: 100%;
    background-image: @AppBackgroundImageDefaultLogo;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background: @backGroundColor;
}
</style>
