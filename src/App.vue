<!--
 * @Author: huangwensong
 * @Date: 2024-03-18 20:58:41
 * @LastEditors: suqi04
 * @LastEditTime: 2024-03-22 20:54:51
 * @FilePath: /final-phrase-demo/src/App.vue
 * @Description: 
-->
<template>
    <Header></Header>
    <router-view />
</template>

<script setup lang="ts">
import Header from "./components/header/index.vue";
</script>


<style lang="less">
#app {
    font-family: 'SourceSansPro', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
    width: 100%;
    background-image: url('./assets/homepage.png');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}
</style>
