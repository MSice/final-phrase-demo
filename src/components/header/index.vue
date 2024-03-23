<!--
 * @Author: huangwensong
 * @Date: 2024-03-19 17:18:01
 * @LastEditors: suqi04
 * @LastEditTime: 2024-03-23 17:58:56
 * @FilePath: /final-phrase-demo/src/components/header/index.vue
 * @Description: 
-->
<template>
  <div class="header">
    <div class="header-left">
      <img class="logo" src="../../assets/images/logo.png" alt="" srcset="" />
    </div>
    <div class="header-right"></div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getUserInfo } from "@/api/index";
const route = useRoute();
const state = reactive({});
const noLoginList = ["/home", "/register"];

onMounted(() => {
  console.log(route.path);
  if (route.path !== "./register") getUserInfo();
});
</script>
<style lang="less" scoped>
.header {
  background-color: transparent;
  height: 60px;
  padding: 10px;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  &-left {
    .logo {
      height: 44px;
      width: 147px;
      margin-left: 10px;
    }
  }
}
</style>
