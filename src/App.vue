<!--
 * @Author: huangwensong
 * @Date: 2024-03-18 20:58:41
 * @LastEditors: huangwensong
 * @LastEditTime: 2024-03-24 14:56:34
 * @FilePath: /final-phrase-demo/src/App.vue
 * @Description: 
-->
<template>
  <Header v-if="showHeader"></Header>
  <router-view />
</template>

<script lang="ts" setup>
import { reactive, toRefs, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Header from "./components/Header/index.vue";
import useHeader from "./components/Header/useHeader";

const { showHeader } = useHeader();
</script>

<style lang="less">
#app {
  font-family: "SourceSansPro", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  width: 100%;
  background-image: url("./assets/homepage.png");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
