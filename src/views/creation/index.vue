<!--
 * @Author: suqi04
 * @Date: 2024-03-23 17:41:41
 * @LastEditTime: 2024-03-23 19:41:08
 * @LastEditors: suqi04
 * @FilePath: /final-phrase-demo/src/views/creation/index.vue
 * @Description: 文件描述
-->
<template>
    <div class="creation">
        <div class="background-dom"></div>
        999777
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
</script>

<style lang="less" scoped>
@import '../../style/index.less';
.creation {
    position: relative;
    width: 100%;
    .background-dom {
        width: 100%;
        height: 100vh;
        background-image: @PagPenBackgroundImageDefaultLogo;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        opacity: 0.5;
    }
}
</style>
