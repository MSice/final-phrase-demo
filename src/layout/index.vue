<!--
 * @Author: suqi04
 * @Date: 2024-03-23 17:38:51
 * @LastEditTime: 2024-03-23 19:43:46
 * @LastEditors: suqi04
 * @FilePath: /final-phrase-demo/src/layout/index.vue
 * @Description: 文件描述
-->
<template>
    <div class="dom-boy">
        <demo-header></demo-header>
        <app-main />
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import AppMain from './AppMain.vue';
import DemoHeader from '../components/header'
</script>

<style lang="less" scoped>
@import '../style/index.less';
.dom-boy {
    position: relative;
    width: 100%;
    height: calc(100% - @headerHeight);
}
</style>
