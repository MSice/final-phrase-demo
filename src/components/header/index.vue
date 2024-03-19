<!--
 * @Author: huangwensong
 * @Date: 2024-03-19 17:18:01
 * @LastEditors: huangwensong
 * @LastEditTime: 2024-03-19 21:14:18
 * @FilePath: /final-phrase-demo/src/components/header/index.vue
 * @Description: 
-->
<template>
  <div class="header">
    <div class="header-left">
      <img class="logo" src="../../assets/logo.jpg" alt="" srcset="" />
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
  background-color: #fff;
  height: 78px;
  padding: 10px;
  display: flex;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
  &-left {
    .logo {
      height: 44px;
      width: 147px;
      margin-left: 10px;
    }
  }
}
</style>
